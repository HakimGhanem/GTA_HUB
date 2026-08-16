import type { Location } from "./locations";

/**
 * Seed POIs for GTA: San Andreas — approximate classic world coords.
 * Wave-1 cities + icons; expand with collectibles once tiles are hosted.
 */
export const SA_LOCATIONS: Location[] = [
  {
    slug: "sa-los-santos",
    name: "Los Santos",
    description:
      "Southern city hub — Grove Street energy, beaches, and the classic SA starting region.",
    category: "landmark",
    x: 2495,
    y: -1680,
    region: "Los Santos",
    source: "seed",
  },
  {
    slug: "sa-grove-street",
    name: "Grove Street",
    description:
      "Ganton home turf — the most shared landmark in SA nostalgia clips and TikTok edits.",
    category: "landmark",
    x: 2495,
    y: -1687,
    region: "Ganton",
    source: "seed",
  },
  {
    slug: "sa-san-fierro",
    name: "San Fierro",
    description:
      "West-coast city with the Gant Bridge skyline — strong explore / tourism map intent.",
    category: "landmark",
    x: -1990,
    y: 450,
    region: "San Fierro",
    source: "seed",
  },
  {
    slug: "sa-las-venturas",
    name: "Las Venturas",
    description:
      "Desert casino strip — Four Dragons, Caligula's, and high-roller content angles.",
    category: "landmark",
    x: 2020,
    y: 1450,
    region: "Las Venturas",
    source: "seed",
  },
  {
    slug: "sa-area-69",
    name: "Area 69",
    description:
      "Restricted desert base — classic stealth mission and conspiracy-clip bait.",
    category: "secret",
    x: 215,
    y: 1865,
    region: "Bone County",
    source: "seed",
  },
  {
    slug: "sa-mount-chiliad",
    name: "Mount Chiliad (SA)",
    description:
      "Tallest peak in San Andreas — parachute runs and conspiracy mural lore.",
    category: "landmark",
    x: -2329,
    y: -1607,
    region: "Whetstone",
    source: "seed",
  },
  {
    slug: "sa-ammu-nation-ls",
    name: "Ammu-Nation (LS)",
    description:
      "Central weapons shop — useful shop pin for guide + affiliate hardware adjacency.",
    category: "shop",
    x: 1368,
    y: -1279,
    region: "Downtown LS",
    source: "seed",
  },
  {
    slug: "sa-oyster-01",
    name: "Oyster (sample)",
    description:
      "Placeholder oyster collectible — expand with full GTASnP-style dataset later.",
    category: "collectible",
    x: 479,
    y: -2690,
    region: "Los Santos Coast",
    source: "seed",
  },
];
