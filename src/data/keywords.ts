import type { KeywordRecord } from "@/lib/content/schema";

/**
 * Revenue-oriented keyword strategy for Map-6.
 * 1 article = 1 primary keyword + 2–4 secondaries from the same cluster.
 */
export const KEYWORDS: KeywordRecord[] = [
  // ── Trailer (timely news) ──────────────────────────────────────
  {
    id: "kw-trailer-3",
    phrase: "gta 6 trailer 3",
    cluster: "trailer",
    priority: "P0",
    locale: "en",
    targetSlugHint: "gta-6-trailer-3-what-we-know",
    relatedInternalPaths: ["/map", "/guides/gta-6-map-guide", "/guides/gta-6-preorder-guide"],
    competitorNotes: "Compete on date rumors + map location clues from trailer frames",
    status: "todo",
    monetization: "mixed",
  },
  {
    id: "kw-trailer-date",
    phrase: "gta 6 trailer date",
    cluster: "trailer",
    priority: "P0",
    locale: "en",
    targetSlugHint: "gta-6-trailer-release-date-rumors",
    relatedInternalPaths: ["/map", "/guides/gta-6-preorder-guide"],
    status: "todo",
    monetization: "adsense",
  },
  {
    id: "kw-trailer-leak",
    phrase: "gta vi trailer leak",
    cluster: "trailer",
    priority: "P1",
    locale: "en",
    targetSlugHint: "gta-6-trailer-leaks-verified",
    relatedInternalPaths: ["/map", "/locations"],
    competitorNotes: "Label unverified claims clearly — AdSense safety",
    status: "todo",
    monetization: "adsense",
  },
  // ── Map (core product) ─────────────────────────────────────────
  {
    id: "kw-interactive-map",
    phrase: "gta 6 interactive map",
    cluster: "map",
    priority: "P0",
    locale: "en",
    targetSlugHint: "gta-6-interactive-map-guide",
    relatedInternalPaths: ["/map", "/guides/gta-6-map-guide", "/locations"],
    status: "todo",
    monetization: "map",
  },
  {
    id: "kw-vice-city-map",
    phrase: "gta 6 map vice city",
    cluster: "map",
    priority: "P0",
    locale: "en",
    targetSlugHint: "vice-city-map-gta-6",
    relatedInternalPaths: ["/map", "/locations/vice-city", "/guides/vice-city-locations"],
    status: "todo",
    monetization: "map",
  },
  // ── Preorder (affiliate) ───────────────────────────────────────
  {
    id: "kw-preorder-ps5",
    phrase: "gta 6 preorder ps5",
    cluster: "preorder",
    priority: "P0",
    locale: "en",
    targetSlugHint: "gta-6-preorder-ps5-guide",
    relatedInternalPaths: ["/guides/gta-6-preorder-guide"],
    status: "todo",
    monetization: "affiliate",
  },
  {
    id: "kw-collector",
    phrase: "gta 6 collector edition",
    cluster: "preorder",
    priority: "P1",
    locale: "en",
    targetSlugHint: "gta-6-collectors-edition",
    relatedInternalPaths: ["/guides/gta-6-preorder-guide"],
    status: "todo",
    monetization: "affiliate",
  },
  // ── Locations ──────────────────────────────────────────────────
  {
    id: "kw-vice-locations",
    phrase: "vice city locations gta 6",
    cluster: "locations",
    priority: "P1",
    locale: "en",
    targetSlugHint: "vice-city-locations-list",
    relatedInternalPaths: ["/locations/vice-city", "/guides/vice-city-locations", "/map"],
    status: "todo",
    monetization: "mixed",
  },
  {
    id: "kw-ocean-drive",
    phrase: "ocean drive gta 6",
    cluster: "locations",
    priority: "P1",
    locale: "en",
    targetSlugHint: "ocean-drive-gta-6",
    relatedInternalPaths: ["/locations/ocean-drive", "/map"],
    status: "todo",
    monetization: "adsense",
  },
  // ── Collectibles ───────────────────────────────────────────────
  {
    id: "kw-hidden-packages",
    phrase: "gta 6 hidden packages",
    cluster: "collectibles",
    priority: "P1",
    locale: "en",
    targetSlugHint: "gta-6-hidden-packages",
    relatedInternalPaths: [
      "/collectibles",
      "/guides/hidden-packages-gta-6",
      "/map",
    ],
    status: "todo",
    monetization: "mixed",
  },
  {
    id: "kw-collectibles-map",
    phrase: "gta 6 collectibles map",
    cluster: "collectibles",
    priority: "P0",
    locale: "en",
    targetSlugHint: "gta-6-collectibles-map",
    relatedInternalPaths: ["/collectibles", "/map"],
    status: "todo",
    monetization: "map",
  },
  // ── Release ────────────────────────────────────────────────────
  {
    id: "kw-release-date",
    phrase: "gta 6 release date",
    cluster: "release",
    priority: "P0",
    locale: "en",
    targetSlugHint: "gta-6-release-date",
    relatedInternalPaths: ["/guides/gta-6-preorder-guide", "/map"],
    status: "todo",
    monetization: "mixed",
  },
  {
    id: "kw-platforms",
    phrase: "gta 6 platforms",
    cluster: "release",
    priority: "P2",
    locale: "en",
    targetSlugHint: "gta-6-platforms-ps5-xbox",
    relatedInternalPaths: ["/guides/gta-6-preorder-guide"],
    status: "todo",
    monetization: "affiliate",
  },
  // ── Setup / clip funnels (purchase + creator volume) ───────────
  {
    id: "kw-best-setup",
    phrase: "best setup for gta 6",
    cluster: "setup",
    priority: "P0",
    locale: "en",
    targetSlugHint: "best-setup-gta-6-ps5-xbox",
    relatedInternalPaths: ["/guides/gta-6-preorder-guide", "/map"],
    competitorNotes: "High EPC: console + headset + SSD bundle intent",
    status: "todo",
    monetization: "affiliate",
  },
  {
    id: "kw-headset",
    phrase: "best headset for gta 6",
    cluster: "setup",
    priority: "P1",
    locale: "en",
    targetSlugHint: "best-headset-gta-6",
    relatedInternalPaths: ["/guides/gta-6-preorder-guide"],
    status: "todo",
    monetization: "affiliate",
  },
  {
    id: "kw-map-clip",
    phrase: "gta 6 map tiktok",
    cluster: "clip",
    priority: "P1",
    locale: "en",
    targetSlugHint: "gta-6-map-clip-kit",
    relatedInternalPaths: ["/map", "/guides/gta-6-map-guide"],
    competitorNotes: "Clip kit pages → share deep links → retention",
    status: "todo",
    monetization: "map",
  },
];

export function getKeywordsByCluster(cluster: KeywordRecord["cluster"]) {
  return KEYWORDS.filter((k) => k.cluster === cluster);
}

export function getKeywordById(id: string) {
  return KEYWORDS.find((k) => k.id === id);
}

export function getP0Keywords() {
  return KEYWORDS.filter((k) => k.priority === "P0");
}
