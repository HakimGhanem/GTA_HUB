#!/usr/bin/env npx tsx
/**
 * Human review CLI for drafts.
 *
 *   npm run content:review
 *   npm run content:review -- --approve <articleId> --reviewer hakim
 *   npm run content:review -- --reject <articleId> --notes "fix sources"
 *   npm run content:review -- --changes <articleId> --notes "shorten title"
 */
import {
  getArticleById,
  listArticles,
  updateArticleStatus,
} from "../../src/lib/content/repository.ts";
import { scoreArticleSeo } from "../../src/lib/content/seo-score.ts";
import { publishArticleRemote } from "../../src/lib/content/publish.ts";
import { argValue, hasFlag } from "./_shared.mts";

async function listQueue() {
  const drafts = await listArticles({
    status: ["drafted", "in_review"],
  });
  if (!drafts.length) {
    console.log("No drafts in queue.");
    return;
  }
  for (const a of drafts) {
    const c = scoreArticleSeo(a);
    console.log(
      `${a.id}  [${a.status}] seo=${c.score}  ${a.slug}\n  ${a.title}\n  kw=${a.primaryKeyword} cluster=${a.cluster}`,
    );
    if (c.issues.length) console.log(`  issues: ${c.issues.join("; ")}`);
    console.log("");
  }
}

async function main() {
  const approveId = argValue("--approve");
  const rejectId = argValue("--reject");
  const changesId = argValue("--changes");
  const reviewer = argValue("--reviewer") || process.env.USER || "editor";
  const notes = argValue("--notes");
  const remote = hasFlag("--remote");

  if (!approveId && !rejectId && !changesId) {
    await listQueue();
    console.log(
      "Usage:\n  --approve <id> [--remote] [--reviewer name]\n  --reject <id> [--notes ...]\n  --changes <id> [--notes ...]",
    );
    return;
  }

  if (approveId) {
    const article = await getArticleById(approveId);
    if (!article) throw new Error("Article not found");
    const checklist = scoreArticleSeo(article);
    if (checklist.score < 60) {
      console.warn(
        `Warning: SEO score ${checklist.score} < 60. Approving anyway (human override).`,
      );
    }

    if (remote || process.env.CONTENT_API_SECRET) {
      // Remote path: Cloud Run SA writes Firestore — never touch local ADC.
      process.env.FIRESTORE_ENABLED = "false";
      const result = await publishArticleRemote(approveId, reviewer);
      console.log("Published remotely:", result.path);
      console.log(JSON.stringify(result.indexNow, null, 2));
    } else {
      const published = await updateArticleStatus(approveId, "published", {
        reviewer,
        ...(notes ? { notes } : {}),
        publishedAt: new Date().toISOString(),
      });
      console.log(
        `Published locally (file store): /${published.locale}/news/${published.slug}`,
      );
      console.log(
        "Tip: set CONTENT_API_SECRET + SITE_INTERNAL_URL and pass --remote to hit the API.",
      );
    }
    return;
  }

  if (rejectId) {
    await updateArticleStatus(rejectId, "archived", {
      reviewer,
      notes: notes || "rejected",
    });
    console.log(`Archived ${rejectId}`);
    return;
  }

  if (changesId) {
    await updateArticleStatus(changesId, "in_review", {
      reviewer,
      notes: notes || "changes requested",
    });
    console.log(`Marked in_review ${changesId}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
