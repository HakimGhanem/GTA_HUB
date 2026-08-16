#!/usr/bin/env npx tsx
/**
 * Publish an approved / drafted article via API (or local file store).
 *
 *   npm run content:publish -- --id <articleId> [--remote]
 */
import {
  getArticleById,
  updateArticleStatus,
} from "../../src/lib/content/repository.ts";
import { publishArticleRemote } from "../../src/lib/content/publish.ts";
import { argValue, hasFlag } from "./_shared.mts";

async function main() {
  const id = argValue("--id");
  if (!id) throw new Error("--id <articleId> required");
  const reviewer = argValue("--reviewer") || process.env.USER || "editor";
  const remote = hasFlag("--remote");

  const article = await getArticleById(id);
  if (!article) throw new Error(`Not found: ${id}`);

  if (remote || process.env.CONTENT_API_SECRET) {
    await updateArticleStatus(id, "in_review", { reviewer });
    const result = await publishArticleRemote(id, reviewer);
    console.log("OK", result.path);
    return;
  }

  const published = await updateArticleStatus(id, "published", {
    reviewer,
    publishedAt: new Date().toISOString(),
  });
  console.log(`Published locally /${published.locale}/news/${published.slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
