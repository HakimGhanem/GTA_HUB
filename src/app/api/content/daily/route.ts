import { NextResponse } from "next/server";
import { assertContentSecret } from "@/lib/content/auth";
import { enrichTopicFunnel, rankTopicsForDaily } from "@/lib/content/funnel";
import {
  listArticles,
  listTopics,
  upsertTopic,
} from "@/lib/content/repository";
import { publishArticleLocal } from "@/lib/content/publish";
import { articlePath } from "@/lib/content/schema";
import { SITE } from "@/lib/constants";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * HTTP target for Cloud Scheduler (17:00 Europe/Paris).
 *
 * POST /api/content/daily
 * Authorization: Bearer CONTENT_API_SECRET
 * Body: { "limit"?: number, "publish"?: boolean, "detect"?: boolean }
 *
 * Note: RSS detect still runs best from the CLI job (Node fetch + feeds).
 * This route ranks existing topics, can stamp funnel fields, and optionally
 * publish high-scoring drafted articles + IndexNow.
 */
export async function POST(request: Request) {
  const denied = assertContentSecret(request);
  if (denied) return denied;

  const body = (await request.json().catch(() => ({}))) as {
    limit?: number;
    publish?: boolean;
    enrichOnly?: boolean;
  };

  const limit = Math.min(5, Math.max(1, body.limit ?? 2));
  const wantPublish =
    body.publish === true || process.env.CONTENT_DAILY_AUTO_PUBLISH === "true";

  const topics = await listTopics();
  const enriched = topics.map(enrichTopicFunnel);

  // Persist funnel fields on scored topics
  for (const t of enriched) {
    if (t.status !== "new" && t.status !== "scored") continue;
    await upsertTopic({
      ...t,
      score: t.funnelScore ?? t.score,
    });
  }

  const picks = rankTopicsForDaily(enriched, limit);
  const articles = await listArticles();
  const published: string[] = [];

  if (wantPublish && !body.enrichOnly) {
    for (const t of picks) {
      const article = articles
        .filter((a) => a.eventKey === t.eventKey && a.status === "drafted")
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
      if (!article) continue;
      if ((article.seoScore ?? 0) < 60) continue;

      const updated = await publishArticleLocal(article.id, "scheduler-daily");
      const path = articlePath(updated);
      published.push(path);
      revalidatePath(path);
      revalidatePath(`/${updated.locale}/news`);
      revalidatePath("/sitemap.xml");
      revalidateTag("news", "max");
    }
  }

  // IndexNow for newly published paths
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
    picks: picks.map((t) => ({
      id: t.id,
      headline: t.headline,
      funnelKind: t.funnelKind,
      funnelScore: t.funnelScore,
      affiliateIntents: t.affiliateIntents,
      clipHook: t.clipHook,
    })),
    published,
    indexNow,
    tip: "Run CLI `npm run content:daily` for detect→draft→publish. This endpoint enriches + publishes drafted queue.",
  });
}
