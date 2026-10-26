#!/usr/bin/env npx tsx
/**
 * Refresh up to N indexable news articles against content/facts.json.
 *
 *   npm run refresh:batch -- --limit 15
 */
import { refreshBatch } from "../../src/lib/content/refresh-article.ts";
import { argValue } from "./_shared.mts";

async function main() {
  const limit = Math.max(1, Number(argValue("--limit") ?? 15));
  console.log(`refresh:batch limit=${limit}`);
  const rows = await refreshBatch(limit);
  for (const row of rows) {
    const mark = row.pass ? "ok" : "fail";
    console.log(
      `[${mark}] ${row.locale}/${row.slug} ${row.action}${row.reasons.length ? ` — ${row.reasons.join("; ")}` : ""}`,
    );
  }
  console.log(`\nWrote content/refresh-report.md (${rows.length} rows)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
