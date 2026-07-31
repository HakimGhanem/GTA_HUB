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

export type MapFilters = {
  query: string;
  categories: Set<LocationCategory>;
};

export function filterLocations(
  locations: Location[],
  filters: MapFilters,
): Location[] {
  const q = filters.query.trim().toLowerCase();

  return locations.filter((loc) => {
    if (!filters.categories.has(loc.category)) return false;
    if (!q) return true;
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.region.toLowerCase().includes(q) ||
      loc.description.toLowerCase().includes(q)
    );
  });
}

export function defaultMapFilters(): MapFilters {
  return {
    query: "",
    categories: new Set(ALL_CATEGORIES),
  };
}
