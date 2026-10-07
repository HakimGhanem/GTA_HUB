import { NextResponse } from "next/server";
import { assertContentSecret } from "@/lib/content/auth";
import { detectNewsTopics } from "@/lib/content/detect-news";
import { getFirestore } from "@/lib/content/firestore";
import { enrichTopicFunnel, rankTopicsForDaily } from "@/lib/content/funnel";
import {
  autoPublishBlockReason,
  generateDraftFromTopic,
  isGoodDailyTopic,
} from "@/lib/content/generate-draft";
import { storyFamily } from "@/lib/content/ids";
import {
  CANONICAL_STORY_SLUG,
  siteEvergreenPathForNews,
} from "@/lib/content/news-canonical";
import { publishArticleLocal } from "@/lib/content/publish";
import {
  bulkUpsertTopics,
  listArticles,
  listTopics,
} from "@/lib/content/repository";
import { articlePath } from "@/lib/content/schema";
import { SITE } from "@/lib/constants";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * HTTP target for Cloud Scheduler (07:00 and 17:00 Europe/Paris).
 *
 * POST /api/content/daily
 * Authorization: Bearer CONTENT_API_SECRET
 *
 * Body / query (Scheduler message-body JSON):
 *   {
 *     "limit"?: 1|2,          // drafts/publishes per run (default 1, max 2)
 *     "detect"?: boolean,     // RSS + YouTube metadata → topics (default false; cron: true)
 *     "draft"?: boolean,      // draft good ranked topics (default false; cron: true)
 *     "publish"?: boolean,    // publish drafted queue if quality bar passes
 *     "enrichOnly"?: boolean  // stamp funnel fields only; skips detect/draft/publish
 *   }
 *
 * Production cron (map6-content-daily):
 *   {"limit":1,"detect":true,"draft":true,"publish":true}
 *
 * Quality: skip a story family that already has a canonical desk URL;
 * auto-publish needs ≥900 words, SEO ≥80, grounded LLM, ≥2 non-VI sources.
 * Guardrails: CONTENT_API_SECRET; Firestore when FIRESTORE_ENABLED=true;
 * never invent ASINs/dates.
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

  const limit = Math.min(2, Math.max(1, Number(body.limit ?? q("limit") ?? 1)));
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
  const liveEn = await listArticles({ status: "published", locale: "en" });
  const occupiedFamilies = new Set(
    liveEn
      .map((a) => storyFamily(`${a.slug} ${a.title}`))
      .filter((family) => family !== "other" && CANONICAL_STORY_SLUG[family]),
  );
  const ranked = rankTopicsForDaily(topics, limit, occupiedFamilies);
  const picks = ranked.filter(isGoodDailyTopic);

  // Only the topics this run acts on get their funnel fields persisted.
  // Sweeping the whole collection cost one sequential Firestore round-trip per
  // topic and never finished inside the Cloud Run request timeout. `enrichOnly`
  // still sweeps everything, batched.
  const enrichTargets = enrichOnly
    ? topics
        .map(enrichTopicFunnel)
        .filter((t) => t.status === "new" || t.status === "scored")
    : ranked;
  const enrichedCount = await bulkUpsertTopics(
    enrichTargets.map((t) => ({ ...t, score: t.funnelScore ?? t.score })),
  );

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

    const cannibalises = (slug: string) => siteEvergreenPathForNews(slug);

    // Prefer articles just drafted this run, then rest of drafted queue
    const queue = articles
      .filter(
        (a) =>
          a.status === "drafted" &&
          !autoPublishBlockReason(a, a.seoScore ?? 0) &&
          !cannibalises(a.slug),
      )
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
      if (queue.some((q) => q.id === a.id)) continue;

      const collision = cannibalises(a.slug);
      if (collision) {
        publishSkipped.push(`${a.slug}: duplicates evergreen ${collision}`);
      } else {
        const blocked = autoPublishBlockReason(a, a.seoScore ?? 0);
        if (blocked) publishSkipped.push(`${a.slug}: ${blocked}`);
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
    enrichedCount,
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
