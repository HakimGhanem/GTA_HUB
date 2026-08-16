#!/usr/bin/env npx tsx
/**
 * Daily funnel factory — Europe/Paris 17:00 target.
 *
 * 1) detect RSS → topics (funnel-scored)
 * 2) draft top N purchase/clip-intent topics
 * 3) optional auto-publish when CONTENT_DAILY_AUTO_PUBLISH=true
 * 4) IndexNow / revalidate via publish API when remote
 *
 *   npm run content:daily
 *   npm run content:daily -- --limit 3 --publish
 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { rankTopicsForDaily } from "../../src/lib/content/funnel.ts";
import {
  listArticles,
  listTopics,
  upsertTopic,
} from "../../src/lib/content/repository.ts";
import { publishArticleRemote } from "../../src/lib/content/publish.ts";
import { articlePath } from "../../src/lib/content/schema.ts";
import { SITE } from "../../src/lib/constants.ts";
import { argValue, hasFlag } from "./_shared.mts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");

function runScript(script: string, args: string[] = []) {
  const result = spawnSync(
    "npx",
    ["tsx", path.join(root, "scripts/content", script), ...args],
    { cwd: root, encoding: "utf8", env: process.env, stdio: "inherit" },
  );
  if (result.status !== 0) {
    throw new Error(`${script} failed with status ${result.status}`);
  }
}

async function pingIndexNow(paths: string[]) {
  const secret = process.env.CONTENT_API_SECRET;
  const key = process.env.INDEXNOW_KEY;
  if (!secret || !key || paths.length === 0) return null;

  const base =
    process.env.SITE_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    SITE.url;

  const res = await fetch(`${base.replace(/\/$/, "")}/api/indexnow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({ urls: paths }),
  });
  return { status: res.status, body: await res.json().catch(() => null) };
}

async function submitSitemapPing() {
  // Lightweight discoverability boost — Google/Bing sitemap ping is soft-deprecated
  // but still useful as a volume signal alongside IndexNow.
  const sitemap = `${SITE.url}/sitemap.xml`;
  const targets = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemap)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemap)}`,
  ];
  const results = await Promise.allSettled(
    targets.map((url) => fetch(url, { method: "GET" })),
  );
  return results.map((r, i) => ({
    url: targets[i],
    ok: r.status === "fulfilled" && r.value.ok,
  }));
}

async function main() {
  const limit = Number(argValue("--limit") ?? process.env.CONTENT_DAILY_LIMIT ?? 2);
  const wantPublish =
    hasFlag("--publish") || process.env.CONTENT_DAILY_AUTO_PUBLISH === "true";
  const skipDetect = hasFlag("--skip-detect");

  console.log(`\n=== Map-6 daily funnel (${new Date().toISOString()}) ===`);
  console.log(`limit=${limit} publish=${wantPublish}`);

  if (!skipDetect) {
    console.log("\n— detect —");
    runScript("detect-news.mts");
  }

  const topics = await listTopics();
  const picks = rankTopicsForDaily(topics, limit);
  if (!picks.length) {
    console.log("No scored topics to draft. Done.");
    await submitSitemapPing();
    return;
  }

  console.log("\n— draft picks —");
  for (const t of picks) {
    console.log(
      `→ [f${t.funnelScore}] ${t.funnelKind} ${t.id} — ${t.headline.slice(0, 70)}`,
    );
    runScript("generate-draft.mts", ["--topic", t.id]);
  }

  const publishedPaths: string[] = [];

  if (wantPublish) {
    console.log("\n— publish —");
    const articles = await listArticles();
    for (const t of picks) {
      const article = articles
        .filter((a) => a.eventKey === t.eventKey)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
      if (!article) continue;
      if (article.status === "published") {
        publishedPaths.push(articlePath(article));
        continue;
      }

      // Safety: only auto-publish purchase/map/clip funnels with SEO score ≥ 60
      if ((article.seoScore ?? 0) < 60 && !hasFlag("--force")) {
        console.log(
          `skip publish ${article.slug} (seoScore=${article.seoScore ?? "n/a"} < 60)`,
        );
        continue;
      }

      try {
        if (process.env.CONTENT_API_SECRET && process.env.SITE_INTERNAL_URL) {
          const result = await publishArticleRemote(article.id, "daily-funnel");
          publishedPaths.push(result.path);
          console.log(`published remote ${result.path}`);
        } else {
          // Local: mark via review-equivalent — call publish script
          runScript("publish.mts", ["--id", article.id, "--reviewer", "daily-funnel"]);
          publishedPaths.push(articlePath(article));
        }
        await upsertTopic({ ...t, status: "drafted" });
      } catch (err) {
        console.warn(`publish failed for ${article.slug}:`, err);
      }
    }
  }

  console.log("\n— discoverability —");
  const indexNow = await pingIndexNow(publishedPaths);
  if (indexNow) console.log("IndexNow:", indexNow);
  const sitemap = await submitSitemapPing();
  console.log("Sitemap ping:", sitemap);

  console.log("\nDaily funnel complete.");
  console.log(
    "Tip: schedule with Cloud Scheduler TZ=Europe/Paris → 0 17 * * * (see scripts/setup-content-scheduler.sh)",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
