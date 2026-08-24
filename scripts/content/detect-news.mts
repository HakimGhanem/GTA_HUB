#!/usr/bin/env npx tsx
/**
 * Detect GTA 6 news + purchase/setup trends from public RSS → topics queue.
 * Enriches funnel scores (buy / map / clip). Does NOT publish articles.
 *
 *   npm run content:detect
 */
import { detectNewsTopics } from "../../src/lib/content/detect-news.ts";
import "./_shared.mts";

async function main() {
  const result = await detectNewsTopics();
  console.log(
    `\nDone. created=${result.created} skipped=${result.skipped}`,
  );
  if (result.feedErrors.length) {
    console.warn("Feed errors:", result.feedErrors);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
