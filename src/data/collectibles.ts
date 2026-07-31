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
      "Classic GTA collectibles scattered across the map. Track all hidden packages in Vice City, Port Gellhorn, and the Everglades.",
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

export const COLLECTIBLES: Collectible[] = [
  {
    slug: "hidden-package-01",
    name: "Hidden Package #1",
    description: "Dockside crate near Port Gellhorn shipping containers.",
    type: "hidden-packages",
    x: -890,
    y: -340,
    region: "Port Gellhorn",
  },
  {
    slug: "hidden-package-02",
    name: "Hidden Package #2",
    description: "Rooftop cache overlooking Ocean Drive neon.",
    type: "hidden-packages",
    x: 380,
    y: 310,
    region: "Vice City",
  },
  {
    slug: "stunt-jump-01",
    name: "Stunt Jump — Ocean Drive",
    description: "Launch off the art deco hotel ramp into the beach parking lot.",
    type: "stunt-jumps",
    x: 520,
    y: 190,
    region: "Vice City",
  },
  {
    slug: "street-art-01",
    name: "Vice City Mural",
    description: "Large alligator mural on a warehouse wall in Little Vice.",
    type: "street-art",
    x: -120,
    y: 480,
    region: "Vice City",
  },
  {
    slug: "wildlife-01",
    name: "American Alligator",
    description: "Spot this apex predator in the Grassrivers at dawn.",
    type: "wildlife",
    x: -1600,
    y: 820,
    region: "Grassrivers",
  },
];

export function getCollectibleType(slug: string) {
  return COLLECTIBLE_TYPES.find((t) => t.slug === slug);
}

export function getCollectiblesByType(type: string) {
  return COLLECTIBLES.filter((c) => c.type === type);
}

export function getCollectibleBySlug(slug: string) {
  return COLLECTIBLES.find((c) => c.slug === slug);
}
