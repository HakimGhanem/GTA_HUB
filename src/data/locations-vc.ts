import vcCollectiblesJson from "./vc-collectibles.json";
import type { Location } from "./locations";

/**
 * Seed landmarks + kong78 Apache-2.0 USJs / robbery stores.
 */
const editorial: Location[] = [
  {
    slug: "vc-ocean-drive",
    name: "Ocean Drive",
    description:
      "Art-deco beachfront strip — the postcard view of Vice City and a natural hub for exploration clips.",
    category: "landmark",
    x: 200,
    y: -1800,
    region: "Vice Beach",
    source: "seed",
  },
  {
    slug: "vc-starfish-island",
    name: "Starfish Island",
    description:
      "Private island mansions between the mainland and the Keys-style bridges — high-value landmark pin.",
    category: "landmark",
    x: -100,
    y: -400,
    region: "Starfish Island",
    source: "seed",
  },
  {
    slug: "vc-downtown",
    name: "Downtown",
    description:
      "Skyscraper core north of the beach — missions, rooftops, and skyline establishing shots.",
    category: "landmark",
    x: -400,
    y: 200,
    region: "Downtown",
    source: "seed",
  },
  {
    slug: "vc-little-haiti",
    name: "Little Haiti",
    description:
      "Northern residential / industrial flavor district — classic VC route and mission density.",
    category: "landmark",
    x: -800,
    y: 900,
    region: "Little Haiti",
    source: "seed",
  },
  {
    slug: "vc-airport",
    name: "Escobar International",
    description:
      "Airport and hangars — flight school adjacent content and long taxiway stunt lines.",
    category: "landmark",
    x: -1400,
    y: -200,
    region: "Escobar International",
    source: "seed",
  },
  {
    slug: "vc-malibu-club",
    name: "The Malibu Club",
    description:
      "Iconic nightclub landmark — strong nostalgia SEO and streamer thumbnail bait.",
    category: "landmark",
    x: 150,
    y: -1600,
    region: "Vice Point",
    source: "seed",
  },
];

const imported = vcCollectiblesJson as Location[];

export const VC_LOCATIONS: Location[] = (() => {
  const slugs = new Set(editorial.map((l) => l.slug));
  const merged = [...editorial];
  for (const loc of imported) {
    if (!slugs.has(loc.slug)) merged.push(loc);
  }
  return merged;
})();
