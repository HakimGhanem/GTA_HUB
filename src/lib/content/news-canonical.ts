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
};

export function evergreenPathForNews(slug: string): string | undefined {
  return NEWS_EVERGREEN_PATH[slug];
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
