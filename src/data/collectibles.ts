import expandedJson from "./collectibles-expanded.json";
import type { Location } from "./locations";

export type CollectibleType = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  total: number;
};

export type Collectible = {
  slug: string;
  name: string;
  description: string;
  type: string;
  x: number;
  y: number;
  region: string;
};

export const COLLECTIBLE_TYPES: CollectibleType[] = [
  {
    slug: "hidden-packages",
    name: "Hidden Packages",
    description:
      "Classic GTA collectibles scattered across the map. Track hidden packages in Vice City, Port Gellhorn, and the Everglades.",
    icon: "📦",
    total: 100,
  },
  {
    slug: "stunt-jumps",
    name: "Stunt Jumps",
    description:
      "Every stunt jump ramp in GTA 6. Complete them all for 100% completion and bragging rights.",
    icon: "🚀",
    total: 50,
  },
  {
    slug: "street-art",
    name: "Street Art",
    description:
      "Spray-can murals and graffiti spots to photograph across GTA 6.",
    icon: "🎨",
    total: 80,
  },
  {
    slug: "wildlife",
    name: "Wildlife Photography",
    description:
      "Rare animals to snap in the Grassrivers and Leonida Keys for the Social Club challenge.",
    icon: "📸",
    total: 20,
  },
];

export const COLLECTIBLES = expandedJson as Collectible[];

/** Map pins for collectible samples (noindex — see location-indexing). */
export function collectiblesAsMapLocations(): Location[] {
  return COLLECTIBLES.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    category: "collectible" as const,
    x: c.x,
    y: c.y,
    region: c.region,
    source: "seed",
    confidence: "seed" as const,
  }));
}

export function getCollectibleType(slug: string) {
  return COLLECTIBLE_TYPES.find((t) => t.slug === slug);
}

export function getCollectiblesByType(type: string) {
  return COLLECTIBLES.filter((c) => c.type === type);
}

export function getCollectibleBySlug(slug: string) {
  return COLLECTIBLES.find((c) => c.slug === slug);
}
