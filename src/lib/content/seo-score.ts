import type { Article, SeoChecklist } from "./schema";

const INTERNAL_PATH_RE =
  /\]\((\/(?:en|fr|es|pt|de|it)?\/?(?:map|locations|collectibles|guides|news|privacy)[^)]*)\)/gi;

export function scoreArticleSeo(article: Article): SeoChecklist {
  const issues: string[] = [];
  const titleLen = article.title.length;
  const descLen = article.description.length;
  const titleLengthOk = titleLen >= 30 && titleLen <= 60;
  const descriptionLengthOk = descLen >= 120 && descLen <= 160;

  if (!titleLengthOk) {
    issues.push(`Title length ${titleLen} (target 30–60)`);
  }
  if (!descriptionLengthOk) {
    issues.push(`Meta description length ${descLen} (target 120–160)`);
  }

  const sourcesCount = article.sources.length;
  if (sourcesCount < 2) {
    issues.push(`Sources ${sourcesCount} (need ≥ 2)`);
  }

  const internalLinks = [
    ...article.bodyMarkdown.matchAll(INTERNAL_PATH_RE),
  ].map((m) => m[1]);
  const uniqueInternal = new Set(internalLinks);
  // Also count explicit related paths as intended internal links
  const relatedCount =
    article.relatedLocationSlugs.length + article.relatedGuideSlugs.length;
  const internalLinkCount = Math.max(uniqueInternal.size, relatedCount > 0 ? relatedCount : uniqueInternal.size);

  if (uniqueInternal.size < 3 && relatedCount < 3) {
    issues.push(
      `Internal links in body ${uniqueInternal.size} (need ≥ 3 markdown links to /map, locations, guides)`,
    );
  }

  if (!article.primaryKeyword) {
    issues.push("Missing primary keyword");
  } else if (
    !article.title.toLowerCase().includes(
      article.primaryKeyword.split(" ").slice(0, 2).join(" ").toLowerCase(),
    ) &&
    !article.bodyMarkdown.toLowerCase().includes(article.primaryKeyword.toLowerCase())
  ) {
    issues.push("Primary keyword not visible in title or body");
  }

  let score = 100;
  if (!titleLengthOk) score -= 15;
  if (!descriptionLengthOk) score -= 15;
  if (sourcesCount < 2) score -= 20;
  if (uniqueInternal.size < 3) score -= 20;
  if (!article.primaryKeyword) score -= 10;
  score = Math.max(0, score);

  return {
    titleLengthOk,
    descriptionLengthOk,
    sourcesCount,
    internalLinkCount: uniqueInternal.size,
    score,
    issues,
  };
}
