#!/usr/bin/env npx tsx
/**
 * Create an improvement draft for a published article (never auto-publishes).
 *
 *   npm run content:improve -- --slug gta-6-trailer-3-what-we-know
 *   npm run content:improve -- --path /en/news/gta-6-trailer-3-what-we-know
 */
import {
  getArticleBySlug,
  listPublishedArticles,
  upsertArticle,
} from "../../src/lib/content/repository.ts";
import { scoreArticleSeo } from "../../src/lib/content/seo-score.ts";
import { argValue } from "./_shared.mts";

async function main() {
  let slug = argValue("--slug");
  const path = argValue("--path");
  if (!slug && path) {
    const m = path.match(/\/news\/([^/?#]+)/);
    slug = m?.[1];
  }
  if (!slug) {
    const published = await listPublishedArticles("en");
    if (!published.length) throw new Error("No published articles to improve");
    slug = published[0].slug;
    console.log(`No --slug; using ${slug}`);
  }

  const article = await getArticleBySlug(slug, "en");
  if (!article || article.status !== "published") {
    throw new Error(`Published article not found: ${slug}`);
  }

  const improvedTitle = article.title.includes("|")
    ? article.title
    : `${article.title.replace(/\s*\|\s*Map-6$/i, "").slice(0, 45)} | Map-6`.slice(
        0,
        60,
      );

  let description = article.description;
  if (description.length < 120 || description.length > 160) {
    description = (
      `${article.primaryKeyword}: latest verified updates, map clues, and what to watch next on Map-6.`
    ).slice(0, 160);
    if (description.length < 120) {
      description = `${description} Explore Vice City locations on our interactive map.`;
      description = description.slice(0, 160);
    }
  }

  const introBoost = `> **Refresh brief**: Improve CTR for \`${article.primaryKeyword}\`. Lead with the outcome readers want (date rumors status, watch links, map clues).\n\n`;

  const bodyMarkdown = article.bodyMarkdown.startsWith("> **Refresh brief**")
    ? article.bodyMarkdown
    : introBoost + article.bodyMarkdown;

  const draft = await upsertArticle({
    ...article,
    id: undefined, // new draft revision
    slug: `${article.slug}-refresh`,
    title: improvedTitle,
    description,
    bodyMarkdown,
    status: "in_review",
    eventKey: `${article.eventKey}-refresh-${Date.now().toString(36)}`,
    notes: `Improve pass from published ${article.id}. Review then publish (may replace slug manually).`,
    publishedAt: undefined,
  });

  const checklist = scoreArticleSeo(draft);
  console.log(`Improvement draft id=${draft.id} slug=${draft.slug}`);
  console.log(`SEO score=${checklist.score}`);
  console.log(checklist.issues.length ? checklist.issues : "No SEO issues");
  console.log("\nNext: npm run content:review -- --approve", draft.id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
