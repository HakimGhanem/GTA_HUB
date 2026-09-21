#!/usr/bin/env npx tsx
/**
 * Detect GTA 6 news from public RSS + YouTube Data API metadata → topics.
 * Enriches funnel scores (buy / map / clip). Does NOT publish articles.
 * YouTube is skipped unless YOUTUBE_API_KEY is set (quota ~301/run).
 *
 *   npm run content:detect
 */
import { detectNewsTopics } from "../../src/lib/content/detect-news.ts";
import "./_shared.mts";

async function main() {
  const result = await detectNewsTopics();
  const yt = result.youtube;
  console.log(
    `\nDone. created=${result.created} skipped=${result.skipped} youtube=${yt.status} ytCreated=${yt.created} ytFetched=${yt.fetched} quota=${yt.quotaUsed}`,
  );
  if (result.feedErrors.length) {
    console.warn("Feed errors:", result.feedErrors);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
