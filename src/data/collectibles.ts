import expandedJson from "./collectibles-expanded.json";
import type { Location } from "./locations";

export type CollectibleType = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  /** Official Rockstar total when published. Omit until then — never invent. */
  total?: number;
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
      "Classic GTA-style collectibles — sample pins in Vice City, Port Gellhorn, and the Everglades. Official totals pending Rockstar.",
    icon: "📦",
  },
  {
    slug: "stunt-jumps",
    name: "Stunt Jumps",
    description:
      "Sample stunt-jump ramps to watch in GTA 6. A complete ramp list and official totals are pending Rockstar.",
    icon: "🚀",
  },
  {
    slug: "street-art",
    name: "Street Art",
    description:
      "Sample mural and graffiti pins to photograph across GTA 6. Official street-art totals are unconfirmed.",
    icon: "🎨",
  },
  {
    slug: "wildlife",
    name: "Wildlife Photography",
    description:
      "Sample wildlife photo spots in the Grassrivers and Leonida Keys. A Social Club challenge is unconfirmed.",
    icon: "📸",
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

/** Honest sample-count copy — never pair with an invented Rockstar total. */
export function formatCollectibleSampleCount(count: number): string {
  const unit = count === 1 ? "sample pin" : "sample pins";
  return `${count} ${unit} · totals unconfirmed`;
}

export const COLLECTIBLES_TOTALS_NOTE =
  "Sample pins only. Official category totals are pending Rockstar.";
