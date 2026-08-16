export type LocationCategory =
  | "landmark"
  | "collectible"
  | "shop"
  | "mission"
  | "secret";

export type Location = {
  slug: string;
  name: string;
  description: string;
  category: LocationCategory;
  x: number;
  y: number;
  region: string;
  source?: string;
};

export const LOCATIONS: Location[] = [
  {
    slug: "vice-city",
    name: "Vice City",
    description:
      "The neon-lit heart of GTA 6. Vice City returns as the central hub, blending Miami-inspired architecture with Rockstar's signature satire.",
    category: "landmark",
    x: 0,
    y: 120,
    region: "Leonida Keys",
  },
  {
    slug: "ocean-drive",
    name: "Ocean Drive",
    description:
      "Iconic beachfront strip lined with art deco hotels, nightlife, and high-end storefronts — a prime spot for exploration and collectibles.",
    category: "landmark",
    x: 420,
    y: 280,
    region: "Vice City",
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
      "Vast Everglades-inspired wetlands with airboats, alligators, and remote swamp settlements — GTA 6's untamed wilderness.",
    category: "landmark",
    x: -1500,
    y: 900,
    region: "Grassrivers",
  },
  {
    slug: "leonida-keys",
    name: "Leonida Keys",
    description:
      "Tropical island archipelago linked to Vice City by causeway bridges — inspired by the Florida Keys.",
    category: "landmark",
    x: 1200,
    y: -500,
    region: "Leonida Keys",
  },
  {
    slug: "port-gellhorn",
    name: "Port Gellhorn",
    description:
      "Northern industrial port city with shipping yards, warehouses, and Gulf Coast smuggling routes.",
    category: "landmark",
    x: -1200,
    y: -500,
    region: "Port Gellhorn",
  },
  {
    slug: "ambrosia-island",
    name: "Ambrosia Island",
    description:
      "Luxury island getaway off the Leonida coast. Rumored to host exclusive properties, yachts, and high-stakes missions.",
    category: "landmark",
    x: 1100,
    y: -620,
    region: "Leonida Keys",
  },
  {
    slug: "mount-kalaga",
    name: "Mount Kalaga",
    description:
      "Leonida’s northern wilderness frontier — forests, rivers, and canyons with a hunting-country feel. Named by Rockstar; exact borders still estimated.",
    category: "landmark",
    x: -2000,
    y: 3500,
    region: "Mount Kalaga",
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
];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getLocationsByCategory(category: LocationCategory): Location[] {
  return LOCATIONS.filter((l) => l.category === category);
}
