/** Discover / backlink candidates — EN+FR editorial, ≥600 words, in-body images. */
export const KEY_NEWS_SLUGS = [
  "gta-6-ultimate-edition-preorder-leads",
  "gta-6-preorder-ps5-details",
  "gta-6-trailer-frames-leonida-hubs",
  "gta-6-extended-look-live-notes",
  "gta-6-trailer-watch-map-checklist",
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
