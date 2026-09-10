export type GuideHubId = "map" | "buy" | "world" | "prep";

export const GUIDE_HUBS: { id: GuideHubId; slugs: string[] }[] = [
  {
    id: "map",
    slugs: [
      "gta-6-map-guide",
      "gta-6-map-size",
      "vice-city-locations",
      "ocean-drive-gta-6",
      "gta-6-collectibles-map",
      "hidden-packages-gta-6",
      "gta-6-map-cities-skylines-2",
      "gta-6-map-clip-kit",
    ],
  },
  {
    id: "buy",
    slugs: [
      "gta-6-preorder-guide",
      "gta-6-best-price",
      "gta-6-ultimate-edition-vs-standard",
      "gta-6-preorder-price-editions",
      "gta-6-preorder-ps5-guide",
      "gta-6-ps5-vs-xbox",
      "gta-6-platforms-ps5-xbox",
      "gta-6-collectors-edition",
    ],
  },
  {
    id: "world",
    slugs: [
      "gta-6-characters-lucia-jason",
      "gta-6-story",
      "leonida-lore-overview",
      "gta-6-vehicles",
      "gta-6-trailer-3-what-we-know",
    ],
  },
  {
    id: "prep",
    slugs: [
      "best-setup-gta-6-ps5-xbox",
      "gta-6-release-date",
      "gta-6-pc-requirements",
      "gta-6-scam-watch",
    ],
  },
];
