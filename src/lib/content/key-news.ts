/** Discover / backlink candidates — EN+FR editorial, ≥600 words, in-body images. */
export const KEY_NEWS_SLUGS = [
  "gta-6-ultimate-edition-preorder-leads",
  "gta-6-preorder-ps5-details",
  "gta-6-trailer-frames-leonida-hubs",
  "gta-6-extended-look-live-notes",
  "gta-6-trailer-watch-map-checklist",
  "gta-6-official-facts-roundup",
  "gta-6-leaks-timeline-verified",
  "gta-6-gameplay-systems-2026",
  "gta-series-history-to-leonida",
  "gta-online-wallet-cards-before-vi",
  "gta-6-six-weeks-out-launch-calendar",
  "ttwo-q1-fy27-gta-6-preorders-zelnick",
  "gta-6-vice-city-collection-399-no-game",
  "gta-6-pc-still-unannounced-october-2026",
  "gta-6-preload-november-12-code-in-box",
  "gta-6-dualsense-limited-edition-where-to-buy",
  "gta-6-vintage-vice-city-pack-gta-plus",
  "gta-6-leonida-named-hubs-october-2026",
  "gta-6-why-we-ignore-leak-maps",
  "gta-6-extended-look-what-still-unknown",
] as const;

export type KeyNewsSlug = (typeof KEY_NEWS_SLUGS)[number];

export function isKeyNewsSlug(slug: string): slug is KeyNewsSlug {
  return (KEY_NEWS_SLUGS as readonly string[]).includes(slug);
}

/** Map-6 basemap crop used as an in-article figure (1200×630). */
export function locationFigure(
  slug: string,
  alt: string,
  caption: string,
): string {
  return `\n\n![${alt}](/api/og/location/${slug} "${caption}")\n\n`;
}
