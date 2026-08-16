/** Content engine schemas — Map-6 editorial + funnel pipeline */

export const CONTENT_CLUSTERS = [
  "trailer",
  "map",
  "preorder",
  "locations",
  "collectibles",
  "release",
  "setup",
  "clip",
] as const;

export type ContentCluster = (typeof CONTENT_CLUSTERS)[number];

/** Page job: buy / explore map / short-form clip — not generic news */
export const FUNNEL_KINDS = [
  "purchase",
  "map_deep_link",
  "clip_kit",
  "mixed",
] as const;

export type FunnelKind = (typeof FUNNEL_KINDS)[number];

export type KeywordPriority = "P0" | "P1" | "P2";

export type KeywordStatus = "todo" | "drafted" | "published" | "refresh";

export type ArticleStatus =
  | "detected"
  | "drafted"
  | "in_review"
  | "published"
  | "noindex"
  | "archived";

export type TopicStatus =
  | "new"
  | "scored"
  | "drafted"
  | "skipped"
  | "archived";

export type ArticleSource = {
  url: string;
  title: string;
  publishedAt?: string;
};

export type Article = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  description: string;
  bodyMarkdown: string;
  cluster: ContentCluster;
  primaryKeyword: string;
  secondaryKeywords: string[];
  sources: ArticleSource[];
  status: ArticleStatus;
  heroImage?: string;
  author: string;
  reviewer?: string;
  publishedAt?: string;
  updatedAt: string;
  createdAt: string;
  relatedLocationSlugs: string[];
  relatedGuideSlugs: string[];
  seoScore?: number;
  notes?: string;
  /** Dedup key e.g. trailer-3-2026 */
  eventKey: string;
  /** Funnel job — purchase / map / clip */
  funnelKind?: FunnelKind;
  /** Affiliate intent ids from src/lib/affiliate/intents */
  affiliateIntents?: string[];
  /** One-line TikTok/Kick hook */
  clipHook?: string;
  /** Suggested map deep-link path */
  mapCtaPath?: string;
};

export type Topic = {
  id: string;
  headline: string;
  summary: string;
  sourceUrls: string[];
  cluster: ContentCluster;
  score: number;
  eventKey: string;
  status: TopicStatus;
  primaryKeywordHint?: string;
  createdAt: string;
  updatedAt: string;
  funnelKind?: FunnelKind;
  affiliateIntents?: string[];
  clipHook?: string;
  /** Higher = better daily pick for volume funnel */
  funnelScore?: number;
};

export type KeywordRecord = {
  id: string;
  phrase: string;
  cluster: ContentCluster;
  priority: KeywordPriority;
  locale: string;
  targetSlugHint: string;
  relatedInternalPaths: string[];
  competitorNotes?: string;
  status: KeywordStatus;
  monetization: "adsense" | "affiliate" | "map" | "mixed";
};

export type KeywordMetric = {
  id: string;
  keywordId: string;
  pagePath?: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  importedAt: string;
};

export type SeoChecklist = {
  titleLengthOk: boolean;
  descriptionLengthOk: boolean;
  sourcesCount: number;
  internalLinkCount: number;
  score: number;
  issues: string[];
};

export function isPublishable(article: Article): boolean {
  return article.status === "published";
}

export function articlePath(article: Pick<Article, "locale" | "slug">): string {
  return `/${article.locale}/news/${article.slug}`;
}
