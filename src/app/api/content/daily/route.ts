import { NextResponse } from "next/server";
import { assertContentSecret } from "@/lib/content/auth";
import { detectNewsTopics } from "@/lib/content/detect-news";
import { getFirestore } from "@/lib/content/firestore";
import { enrichTopicFunnel, rankTopicsForDaily } from "@/lib/content/funnel";
import {
  generateDraftFromTopic,
  isGoodDailyTopic,
} from "@/lib/content/generate-draft";
import { publishArticleLocal } from "@/lib/content/publish";
import {
  listArticles,
  listTopics,
  upsertTopic,
} from "@/lib/content/repository";
import { articlePath } from "@/lib/content/schema";
import { SITE } from "@/lib/constants";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * HTTP target for Cloud Scheduler (17:00 Europe/Paris).
 *
 * POST /api/content/daily
 * Authorization: Bearer CONTENT_API_SECRET
 *
 * Body / query (Scheduler message-body JSON):
 *   {
 *     "limit"?: 1|2,          // drafts/publishes per run (default 2, max 2)
 *     "detect"?: boolean,     // RSS → topics (default false; cron should pass true)
 *     "draft"?: boolean,      // draft good ranked topics (default false; cron: true)
 *     "publish"?: boolean,    // publish drafted queue seo≥60 (or CONTENT_DAILY_AUTO_PUBLISH)
 *     "enrichOnly"?: boolean  // stamp funnel fields only; skips detect/draft/publish
 *   }
 *
 * Production cron (map6-content-daily):
 *   {"limit":2,"detect":true,"draft":true,"publish":true}
 *
 * Guardrails: CONTENT_API_SECRET required; Firestore required when
 * FIRESTORE_ENABLED=true; never invent ASINs/dates; skip draft if no good topic.
 */
export async function POST(request: Request) {
  const denied = assertContentSecret(request);
  if (denied) return denied;

  if (process.env.FIRESTORE_ENABLED === "true") {
    const fs = await getFirestore();
    if (!fs) {
      return NextResponse.json(
        { error: "Firestore required but unavailable" },
        { status: 503 },
      );
    }
  }

  const url = new URL(request.url);
  const body = (await request.json().catch(() => ({}))) as {
    limit?: number;
    publish?: boolean;
    detect?: boolean;
    draft?: boolean;
    enrichOnly?: boolean;
  };

  const q = (key: string) => url.searchParams.get(key);
  const flag = (bodyVal: boolean | undefined, queryKey: string) => {
    if (bodyVal === true || bodyVal === false) return bodyVal;
    const v = q(queryKey);
    if (v === "true" || v === "1") return true;
    if (v === "false" || v === "0") return false;
    return false;
  };

  const limit = Math.min(2, Math.max(1, Number(body.limit ?? q("limit") ?? 2)));
  const wantDetect = flag(body.detect, "detect");
  const wantDraft = flag(body.draft, "draft");
  const wantPublish =
    flag(body.publish, "publish") ||
    process.env.CONTENT_DAILY_AUTO_PUBLISH === "true";
  const enrichOnly =
    body.enrichOnly === true || q("enrichOnly") === "true";

  let detectResult: Awaited<ReturnType<typeof detectNewsTopics>> | null = null;
  if (wantDetect && !enrichOnly) {
    detectResult = await detectNewsTopics();
  }

  const topics = await listTopics();
  const enriched = topics.map(enrichTopicFunnel);

  for (const t of enriched) {
    if (t.status !== "new" && t.status !== "scored") continue;
    await upsertTopic({
      ...t,
      score: t.funnelScore ?? t.score,
    });
  }

  const ranked = rankTopicsForDaily(enriched, limit);
  const picks = ranked.filter(isGoodDailyTopic);

  const drafted: { id: string; slug: string; seoScore: number }[] = [];
  const skippedDraft: { id: string; reason: string }[] = [];

  if (wantDraft && !enrichOnly) {
    if (!picks.length) {
      skippedDraft.push({
        id: "-",
        reason: ranked.length
          ? "no topic met MIN_DAILY_FUNNEL_SCORE / quality bar"
          : "no scored topics to draft",
      });
    }
    for (const t of picks) {
      try {
        const result = await generateDraftFromTopic(t);
        drafted.push({
          id: result.article.id,
          slug: result.article.slug,
          seoScore: result.seoScore,
        });
      } catch (err) {
        skippedDraft.push({
          id: t.id,
          reason: err instanceof Error ? err.message : String(err),
        });
      }
    }
  } else if (!wantDraft && ranked.length && !picks.length) {
    skippedDraft.push({
      id: "-",
      reason: "ranked topics failed quality bar (draft not requested)",
    });
  }

  const published: string[] = [];
  const publishSkipped: string[] = [];

  if (wantPublish && !enrichOnly) {
    const articles = await listArticles();
    const draftedIds = new Set(drafted.map((d) => d.id));
    const pickKeys = new Set(picks.map((t) => t.eventKey));

    // Prefer articles just drafted this run, then rest of drafted queue (seo≥60)
    const queue = articles
      .filter((a) => a.status === "drafted" && (a.seoScore ?? 0) >= 60)
      .sort((a, b) => {
        const aPri = draftedIds.has(a.id) || pickKeys.has(a.eventKey) ? 1 : 0;
        const bPri = draftedIds.has(b.id) || pickKeys.has(b.eventKey) ? 1 : 0;
        if (bPri !== aPri) return bPri - aPri;
        return b.updatedAt.localeCompare(a.updatedAt);
      })
      .slice(0, limit);

    for (const article of queue) {
      try {
        const updated = await publishArticleLocal(
          article.id,
          "scheduler-daily",
        );
        const path = articlePath(updated);
        published.push(path);
        revalidatePath(path);
        revalidatePath(`/${updated.locale}/news`);
        revalidatePath("/sitemap.xml");
        revalidateTag("news", "max");
      } catch (err) {
        publishSkipped.push(
          `${article.slug}: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
    }

    for (const a of articles.filter((x) => x.status === "drafted")) {
      if ((a.seoScore ?? 0) < 60 && !queue.some((q) => q.id === a.id)) {
        publishSkipped.push(`${a.slug}: seoScore=${a.seoScore ?? "n/a"} < 60`);
      }
    }
  }

  let indexNow: unknown = null;
  if (published.length && process.env.INDEXNOW_KEY) {
    const urlList = published.map((p) => `${SITE.url}${p}`);
    const payload = {
      host: new URL(SITE.url).host,
      key: process.env.INDEXNOW_KEY,
      keyLocation: `${SITE.url}/${process.env.INDEXNOW_KEY}.txt`,
      urlList,
    };
    const results = await Promise.allSettled(
      [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow",
      ].map((endpoint) =>
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      ),
    );
    indexNow = results.map((r) =>
      r.status === "fulfilled" ? r.value.status : "error",
    );
  }

  return NextResponse.json({
    ok: true,
    limit,
    detect: wantDetect && !enrichOnly,
    draft: wantDraft && !enrichOnly,
    publish: wantPublish && !enrichOnly,
    detectResult,
    picks: picks.map((t) => ({
      id: t.id,
      headline: t.headline,
      funnelKind: t.funnelKind,
      funnelScore: t.funnelScore,
      affiliateIntents: t.affiliateIntents,
      clipHook: t.clipHook,
    })),
    drafted,
    skippedDraft,
    published,
    publishSkipped: publishSkipped.slice(0, 10),
    indexNow,
  });
}
