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
