import { GUIDES } from "@/data/guides";
import { KEY_NEWS_SLUGS } from "@/lib/content/key-news";
import { REGIONAL_LOCATION_SLUGS } from "@/data/location-seo-types";
import { isIndexableLocale } from "@/i18n/routing";
import { storyFamily, type StoryFamily } from "@/lib/content/ids";
import { countMarkdownWords, MIN_ARTICLE_WORDS } from "@/lib/content/word-count";

/**
 * Factory RSS used to republish these stories daily. Only the desk slug stays
 * indexable; the rest stay in Firestore as history but drop out of Discover.
 */
export const CANONICAL_STORY_SLUG: Partial<Record<StoryFamily, string>> = {
  "vice-city-collection": "gta-6-vice-city-collection-399-no-game",
  "ttwo-preorder-mix": "ttwo-q1-fy27-gta-6-preorders-zelnick",
  "ultimate-mix": "gta-6-ultimate-edition-preorder-leads",
  "dualsense-gta6": "gta-6-dualsense-limited-edition-where-to-buy",
  "gta6-pc": "gta-6-pc-still-unannounced-october-2026",
  "preload-physical": "gta-6-preload-november-12-code-in-box",
  "vintage-pack": "gta-6-vintage-vice-city-pack-gta-plus",
  "launch-calendar": "gta-6-six-weeks-out-launch-calendar",
  "preorder-generic": "gta-6-preorder-ps5-details",
};

/** News slugs that duplicate an evergreen guide/location — noindex news, keep follow. */
export const NEWS_EVERGREEN_PATH: Record<string, string> = {
  "gta-6-trailer-3-what-we-know": "/guides/gta-6-trailer-3-what-we-know",
  "how-to-use-gta-6-interactive-map": "/guides/gta-6-map-guide",
  "gta-6-release-date-platforms": "/guides/gta-6-release-date",
  "ocean-drive-gta-6-map-clues": "/guides/ocean-drive-gta-6",
  "gta-6-map-cities-skylines-2-news": "/guides/gta-6-map-cities-skylines-2",
  "leonida-regions-explained-gta-6": "/guides/leonida-lore-overview",
  "mount-kalaga-gta-6-region": "/locations/mount-kalaga",
  "gta-6-preorder-checklist-ps5-xbox": "/guides/gta-6-preorder-guide",
  "gta-6-extended-look-watch-times": "/guides/gta-6-extended-look-how-to-watch",
  "gta-6-extended-look-map-watch-for": "/guides/gta-6-extended-look-how-to-watch",
  "89-of-gta-6-pre-orders-are-for-the-ultimate-edition-rockstarintel":
    "/guides/gta-6-ultimate-edition-vs-standard",
};

export function evergreenPathForNews(slug: string): string | undefined {
  return NEWS_EVERGREEN_PATH[slug];
}

const SITE_EVERGREEN = {
  guides: GUIDES.map((guide) => guide.slug),
  locations: [...REGIONAL_LOCATION_SLUGS],
};

/** Curated map first, then topic-containment against live guides and hubs. */
export function siteEvergreenPathForNews(slug: string): string | undefined {
  return collidingEvergreenPath(slug, SITE_EVERGREEN);
}

/**
 * Slug words that carry no topical meaning here — every page is about GTA 6,
 * so keeping them would make everything look like a duplicate of everything.
 */
const NOISE_WORDS = new Set([
  "gta",
  "gta6",
  "gtavi",
  "vi",
  "6",
  "the",
  "a",
  "an",
  "and",
  "for",
  "to",
  "of",
  "in",
  "on",
  "your",
  "you",
  "how",
  "what",
  "news",
]);

/** `gta-6-preorder-price-editions` → `{preorder, price, edition}` */
function topicTokens(slug: string): Set<string> {
  const tokens = slug
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word && !NOISE_WORDS.has(word))
    // Crude singular form so `prices` and `price` collapse together.
    .map((word) => (word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word));

  return new Set(tokens);
}

/** Tokens of `small` missing from `large`, or null when it is not contained. */
function extraTokens(small: Set<string>, large: Set<string>): number | null {
  for (const token of small) {
    if (!large.has(token)) return null;
  }
  return large.size - small.size;
}

/**
 * Widest gap that still counts as the same topic. One extra word is a rewording
 * (`preorder-price-editions` vs `preorder-ps5-editions-prices`); more than that
 * is a genuinely narrower angle, and bare containment alone would flag every
 * news item that merely names a region — `vice-city` sits inside
 * `trailer-2-breakdown-vice-city-landmarks` without competing with it.
 */
const MAX_EXTRA_TOKENS = 1;

function topicsCollide(a: string, b: string): boolean {
  const left = topicTokens(a);
  const right = topicTokens(b);
  // A one-word topic is too generic to judge containment on.
  if (left.size < 2 || right.size < 2) return false;

  const extra =
    left.size <= right.size
      ? extraTokens(left, right)
      : extraTokens(right, left);

  return extra !== null && extra <= MAX_EXTRA_TOKENS;
}

/**
 * Evergreen page a news slug would cannibalise, if any. Checks the curated map
 * first, then falls back to topic containment against every guide and regional
 * hub, so a freshly generated draft cannot silently compete with a page that
 * already ranks.
 */
export function collidingEvergreenPath(
  slug: string,
  evergreen: { guides: readonly string[]; locations: readonly string[] },
): string | undefined {
  const curated = evergreenPathForNews(slug);
  if (curated) return curated;

  const guide = evergreen.guides.find((candidate) => topicsCollide(slug, candidate));
  if (guide) return `/guides/${guide}`;

  const location = evergreen.locations.find((candidate) =>
    topicsCollide(slug, candidate),
  );
  return location ? `/locations/${location}` : undefined;
}

/** Same bar as sitemap / article robots — listing must not surface thin or duplicate news. */
export function isIndexableNewsArticle(article: {
  slug: string;
  title?: string;
  locale: string;
  bodyMarkdown: string;
  status?: string;
}): boolean {
  if (article.status && article.status !== "published") return false;
  if (!isIndexableLocale(article.locale)) return false;
  if (siteEvergreenPathForNews(article.slug)) return false;
  if (countMarkdownWords(article.bodyMarkdown) < MIN_ARTICLE_WORDS) return false;

  const keyNews = (KEY_NEWS_SLUGS as readonly string[]).includes(article.slug);
  if (keyNews) return true;

  const family = storyFamily(`${article.slug} ${article.title ?? ""}`);
  const canonical = CANONICAL_STORY_SLUG[family];
  if (canonical && article.slug !== canonical) return false;
  return true;
}
