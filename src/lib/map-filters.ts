import type { Location, LocationCategory } from "@/data/locations";

export const CATEGORY_LABELS: Record<LocationCategory, string> = {
  landmark: "Landmarks",
  collectible: "Collectibles",
  shop: "Shops",
  mission: "Missions",
  secret: "Secrets",
};

export const CATEGORY_COLORS: Record<LocationCategory, string> = {
  landmark: "#f472b6",
  collectible: "#fbbf24",
  shop: "#34d399",
  mission: "#60a5fa",
  secret: "#a78bfa",
};

export const ALL_CATEGORIES: LocationCategory[] = [
  "landmark",
  "collectible",
  "shop",
  "mission",
  "secret",
];

export const SUBTYPE_LABELS: Record<string, string> = {
  atm: "ATM",
  "gas-pump": "Gas pump",
  lookout: "Lookout",
  "stunt-jump": "Stunt jump",
  store: "Store",
  "letter-scrap": "Letter scrap",
  "spaceship-part": "Spaceship part",
  "hidden-package": "Hidden package",
  oyster: "Oyster",
  tag: "Gang tag",
  snapshot: "Snapshot",
  horseshoe: "Horseshoe",
  vending: "Vending machine",
  payphone: "Payphone",
  dartboard: "Dartboard",
  jukebox: "Jukebox",
  bench: "Bench",
  "parking-meter": "Parking meter",
  rampage: "Rampage",
};

export type FoundFilter = "all" | "hide_found" | "found_only";

export type MapFilters = {
  query: string;
  categories: Set<LocationCategory>;
  foundFilter: FoundFilter;
  /** Empty = all subtypes */
  subtypes: Set<string>;
};

export function countByCategory(
  locations: Location[],
): Record<LocationCategory, number> {
  const counts = Object.fromEntries(
    ALL_CATEGORIES.map((c) => [c, 0]),
  ) as Record<LocationCategory, number>;
  for (const loc of locations) {
    counts[loc.category] = (counts[loc.category] ?? 0) + 1;
  }
  return counts;
}

export function listSubtypes(locations: Location[]): string[] {
  const set = new Set<string>();
  for (const loc of locations) {
    if (loc.subtype) set.add(loc.subtype);
  }
  return [...set].sort();
}

export function filterLocations(
  locations: Location[],
  filters: MapFilters,
  isFound?: (slug: string) => boolean,
): Location[] {
  const q = filters.query.trim().toLowerCase();
  const subtypeActive = filters.subtypes.size > 0;

  return locations.filter((loc) => {
    if (!filters.categories.has(loc.category)) return false;
    if (subtypeActive) {
      if (!loc.subtype || !filters.subtypes.has(loc.subtype)) return false;
    }
    if (isFound) {
      const found = isFound(loc.slug);
      if (filters.foundFilter === "hide_found" && found) return false;
      if (filters.foundFilter === "found_only" && !found) return false;
    }
    if (!q) return true;
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.region.toLowerCase().includes(q) ||
      loc.description.toLowerCase().includes(q) ||
      (loc.subtype?.toLowerCase().includes(q) ?? false)
    );
  });
}

export function defaultMapFilters(): MapFilters {
  return {
    query: "",
    categories: new Set(ALL_CATEGORIES),
    foundFilter: "all",
    subtypes: new Set(),
  };
}
