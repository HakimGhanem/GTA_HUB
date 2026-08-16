#!/usr/bin/env npx tsx
/**
 * Analyze GSC CSV export → flag CTR / position opportunities → keyword refresh briefs.
 *
 *   npm run content:analyze -- --csv path/to/Pages.csv
 *
 * Expected columns (GSC Pages export): Top pages / URL | Clicks | Impressions | CTR | Position
 */
import { promises as fs } from "fs";
import { parse } from "csv-parse/sync";
import { randomUUID } from "crypto";
import { KEYWORDS } from "../../src/data/keywords.ts";
import { listPublishedArticles, saveKeywordMetrics } from "../../src/lib/content/repository.ts";
import type { KeywordMetric } from "../../src/lib/content/schema.ts";
import { argValue } from "./_shared.mts";

type Row = {
  url?: string;
  page?: string;
  clicks?: string;
  impressions?: string;
  ctr?: string;
  position?: string;
};

function normHeader(h: string) {
  return h.trim().toLowerCase().replace(/\s+/g, " ");
}

async function main() {
  const csvPath = argValue("--csv");
  if (!csvPath) {
    console.log(`No --csv provided. Printing published news inventory + keyword refresh candidates from heuristics.

Usage:
  npm run content:analyze -- --csv ~/Downloads/Pages.csv
`);
    const published = await listPublishedArticles("en");
    console.log(`Published articles: ${published.length}`);
    for (const a of published) {
      console.log(`- /${a.locale}/news/${a.slug}  kw=${a.primaryKeyword} seo=${a.seoScore}`);
    }
    const refresh = KEYWORDS.filter((k) => k.status === "refresh" || k.priority === "P0");
    console.log(`\nP0 / refresh keywords: ${refresh.length}`);
    for (const k of refresh.slice(0, 20)) {
      console.log(`- [${k.priority}] ${k.phrase} → ${k.targetSlugHint}`);
    }
    return;
  }

  const raw = await fs.readFile(csvPath, "utf8");
  const records = parse(raw, {
    columns: (hdrs: string[]) => hdrs.map(normHeader),
    skip_empty_lines: true,
    relax_column_count: true,
  }) as Record<string, string>[];

  const metrics: KeywordMetric[] = [];
  const opportunities: {
    path: string;
    impressions: number;
    clicks: number;
    ctr: number;
    position: number;
    reason: string;
  }[] = [];

  for (const r of records) {
    const path =
      r["top pages"] || r["page"] || r["url"] || r["landing page"] || "";
    if (!path || !path.includes("/news/")) continue;

    const clicks = Number(String(r.clicks || "0").replace(/[^0-9.-]/g, "")) || 0;
    const impressions =
      Number(String(r.impressions || "0").replace(/[^0-9.-]/g, "")) || 0;
    let ctr = Number(String(r.ctr || "0").replace(/%/g, "")) || 0;
    if (ctr > 1) ctr = ctr / 100;
    const position =
      Number(String(r.position || "0").replace(/[^0-9.-]/g, "")) || 0;

    metrics.push({
      id: randomUUID(),
      keywordId: path,
      pagePath: path,
      impressions,
      clicks,
      ctr,
      position,
      importedAt: new Date().toISOString(),
    });

    if (impressions >= 500 && ctr < 0.02) {
      opportunities.push({
        path,
        impressions,
        clicks,
        ctr,
        position,
        reason: "High impressions, CTR < 2%",
      });
    } else if (position >= 8 && position <= 20 && impressions >= 100) {
      opportunities.push({
        path,
        impressions,
        clicks,
        ctr,
        position,
        reason: "Position 8–20 — title/meta refresh candidate",
      });
    }
  }

  if (metrics.length) await saveKeywordMetrics(metrics);

  opportunities.sort((a, b) => b.impressions - a.impressions);
  console.log(`Imported ${metrics.length} /news rows`);
  console.log(`Opportunities: ${opportunities.length}`);
  for (const o of opportunities.slice(0, 15)) {
    console.log(
      `- ${o.path}\n  impr=${o.impressions} clicks=${o.clicks} ctr=${(o.ctr * 100).toFixed(2)}% pos=${o.position.toFixed(1)}\n  → ${o.reason}\n  Next: npm run content:improve -- --path ${o.path}`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
