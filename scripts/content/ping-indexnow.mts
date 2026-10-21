#!/usr/bin/env npx tsx
/**
 * Ping IndexNow for every indexable news + guide URL.
 *   npm run content:indexnow
 */
import { GUIDES } from "../../src/data/guides.ts";
import { guideHreflangLocales, hasGuideTranslation } from "../../src/data/guides-i18n.ts";
import { filterIndexableLocales } from "../../src/i18n/routing.ts";
import { isIndexableNewsArticle } from "../../src/lib/content/news-canonical.ts";
import { listArticles } from "../../src/lib/content/repository.ts";
import { submitIndexNow } from "../../src/lib/seo/indexnow.ts";

async function main() {
  const paths: string[] = [];
  for (const g of GUIDES) {
    for (const locale of filterIndexableLocales(guideHreflangLocales(g.slug))) {
      if (hasGuideTranslation(g.slug, locale)) {
        paths.push(`/${locale}/guides/${g.slug}`);
      }
    }
  }
  const news = (await listArticles({ status: "published" })).filter(
    isIndexableNewsArticle,
  );
  for (const a of news) paths.push(`/${a.locale}/news/${a.slug}`);

  const result = await submitIndexNow(paths);
  console.log(`IndexNow: ${result.submitted} URLs`);
  for (const r of result.results) console.log(`  ${r.endpoint} ${r.ok ? "ok" : "fail"}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
