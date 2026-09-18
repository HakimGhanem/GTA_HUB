export type LocationCategory =
  | "landmark"
  | "collectible"
  | "shop"
  | "mission"
  | "secret";

export type LocationConfidence =
  | "confirmed"
  | "trailer"
  | "community"
  | "rumor"
  | "seed";

export type LocationEdition = "ultimate";

export type Location = {
  slug: string;
  name: string;
  description: string;
  category: LocationCategory;
  x: number;
  y: number;
  region: string;
  source?: string;
  /** Public citation — official Rockstar / Newswire / store page */
  sourceUrl?: string;
  /** Explicit trust label; otherwise derived from source */
  confidence?: LocationConfidence;
  /** Fine-grained type — e.g. atm, letter-scrap, stunt-jump */
  subtype?: string;
  /** Premium-edition destination named by Rockstar */
  edition?: LocationEdition;
};

const ROCKSTAR_VI = "https://www.rockstargames.com/VI";
const ROCKSTAR_EDITIONS = "https://www.rockstargames.com/VI/editions";

export const LOCATIONS: Location[] = [
  {
    slug: "vice-city",
    name: "Vice City",
    description:
      "Leonida’s neon metro. Rockstar shows the downtown skyline in Trailer 1 (~1:10) and Trailer 2 (~1:24) — glass towers and coastal freeways, not Keys causeways or Grassrivers mangroves.",
    category: "landmark",
    x: 0,
    y: 120,
    region: "Leonida Keys",
    source: "official",
    sourceUrl: ROCKSTAR_VI,
    confidence: "confirmed",
  },
  {
    slug: "ocean-drive",
    name: "Ocean Drive",
    description:
      "Vice City’s postcard strip. Trailer 1 opens on the beach at ~0:06; Trailer 2 returns after dark at ~1:01 — art deco hotels and wet asphalt, not downtown towers.",
    category: "landmark",
    x: 420,
    y: 280,
    region: "Vice City",
    source: "official",
    sourceUrl: ROCKSTAR_VI,
    confidence: "confirmed",
  },
  {
    slug: "hidden-package-01",
    name: "Hidden Package #1",
    description:
      "Classic GTA collectible hidden near the docks. Hidden packages are expected to return in GTA 6 — mark this spot on your map.",
    category: "collectible",
    x: -890,
    y: -340,
    region: "Port Gellhorn",
  },
  {
    slug: "grassrivers",
    name: "Grassrivers",
    description:
      "Everglades-flat wetlands. Trailer 1’s alligator store (~0:31) and Trailer 2’s mangroves (~1:42) are the official tells — airboats and sawgrass, not Vice City neon.",
    category: "landmark",
    x: -1500,
    y: 900,
    region: "Grassrivers",
    source: "official",
    sourceUrl: ROCKSTAR_VI,
    confidence: "confirmed",
  },
  {
    slug: "leonida-keys",
    name: "Leonida Keys",
    description:
      "Island chain south of the metro. Trailer 1’s causeway (~0:47) and Trailer 2’s stilt house (~0:08) are the frames to pause — count the spans before guessing a Key.",
    category: "landmark",
    x: 1200,
    y: -500,
    region: "Leonida Keys",
    source: "official",
    sourceUrl: ROCKSTAR_VI,
    confidence: "confirmed",
  },
  {
    slug: "port-gellhorn",
    name: "Port Gellhorn",
    description:
      "Working-coast freight city. Trailer 1’s cranes (~0:58) and Trailer 2’s port yard (~2:13) show containers and gantries — the opposite economy from Ocean Drive.",
    category: "landmark",
    x: -1200,
    y: -500,
    region: "Port Gellhorn",
    source: "official",
    sourceUrl: ROCKSTAR_VI,
    confidence: "confirmed",
  },
  {
    slug: "ambrosia-island",
    name: "Ambrosia Island",
    description:
      "Gated wealth island. Trailer 2 (~1:58) shows walled mansions and private moorings — public Keys motels this is not. Borders stay estimated until Rockstar draws them.",
    category: "landmark",
    x: 1100,
    y: -620,
    region: "Leonida Keys",
    source: "official",
    sourceUrl: ROCKSTAR_VI,
    confidence: "confirmed",
  },
  {
    slug: "mount-kalaga",
    name: "Mount Kalaga",
    description:
      "Named northern wilderness. Trailer 2 (~2:29) is the elevation frame: tree cover and ridgelines, not mangrove flatness. Pin is orientation, not a summit GPS.",
    category: "landmark",
    x: -2000,
    y: 3500,
    region: "Mount Kalaga",
    source: "official",
    sourceUrl: ROCKSTAR_VI,
    confidence: "confirmed",
  },
  {
    slug: "grassroots-weapons",
    name: "Grassroots Weapons",
    description:
      "Local gun shop serving the Vice City area. Track all weapon pickups and shop locations before launch day.",
    category: "shop",
    x: -210,
    y: 540,
    region: "Vice City",
  },
  {
    slug: "everglades-lookout",
    name: "Everglades Lookout",
    description:
      "Remote wetland viewpoint in the Leonida wilderness. Perfect for off-road exploration and wildlife encounters.",
    category: "secret",
    x: -1800,
    y: 900,
    region: "Grassrivers",
  },
  {
    slug: "rideout-customs",
    name: "Rideout Customs",
    description:
      "Official Ultimate Edition vehicle mod shop named on rockstargames.com/VI/editions. Pin is a Vice City regional marker — Rockstar has not published a street address.",
    category: "shop",
    x: 90,
    y: 210,
    region: "Vice City",
    source: "official",
    sourceUrl: ROCKSTAR_EDITIONS,
    confidence: "confirmed",
    subtype: "mod-shop",
    edition: "ultimate",
  },
  {
    slug: "saras-unisex-salon",
    name: "Sara's Unisex Salon",
    description:
      "Official Ultimate Edition salon (hair, makeup, nails) listed on Rockstar’s editions page. Pin is regional in Vice City until a storefront address ships.",
    category: "shop",
    x: 140,
    y: 250,
    region: "Vice City",
    source: "official",
    sourceUrl: ROCKSTAR_EDITIONS,
    confidence: "confirmed",
    subtype: "salon",
    edition: "ultimate",
  },
  {
    slug: "stock-305",
    name: "Stock 305",
    description:
      "Official Ultimate Edition streetwear store. Rockstar places it in Vice City’s Stockyard; this pin sits on that district hub, not a verified door.",
    category: "shop",
    x: -700,
    y: 1240,
    region: "Vice City",
    source: "official",
    sourceUrl: ROCKSTAR_EDITIONS,
    confidence: "confirmed",
    subtype: "clothing",
    edition: "ultimate",
  },
  {
    slug: "electric-fang-tattoo",
    name: "Electric Fang Tattoo",
    description:
      "Official Ultimate Edition tattoo parlor in Stockyard (FAILE designs per Rockstar). Pin marks the district, not a street address.",
    category: "shop",
    x: -650,
    y: 1195,
    region: "Vice City",
    source: "official",
    sourceUrl: ROCKSTAR_EDITIONS,
    confidence: "confirmed",
    subtype: "tattoo",
    edition: "ultimate",
  },
  {
    slug: "one-eyed-willies",
    name: "One-Eyed Willie's",
    description:
      "Official Ultimate Edition off-road mod shop. Rockstar names Lake Leonida; the pin is a northern regional marker near Mount Kalaga, not a shoreline address.",
    category: "shop",
    x: -1880,
    y: 3280,
    region: "Mount Kalaga",
    source: "official",
    sourceUrl: ROCKSTAR_EDITIONS,
    confidence: "confirmed",
    subtype: "mod-shop",
    edition: "ultimate",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getLocationsByCategory(category: LocationCategory): Location[] {
  return LOCATIONS.filter((l) => l.category === category);
}
