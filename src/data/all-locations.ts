import gtadbLocationsJson from "./gtadb-locations.json";
import { LOCATIONS, type Location } from "./locations";

const gtadbLocations = gtadbLocationsJson as Location[];

export function getAllLocations(): Location[] {
  if (gtadbLocations.length === 0) return LOCATIONS;

  const slugs = new Set(LOCATIONS.map((l) => l.slug));
  const merged = [...LOCATIONS];
  for (const loc of gtadbLocations) {
    if (!slugs.has(loc.slug)) merged.push(loc);
  }
  return merged;
}

export { LOCATIONS, type Location };
export type { LocationCategory } from "./locations";
export { getLocationsByCategory } from "./locations";

export function getLocationBySlug(slug: string): Location | undefined {
  return getAllLocations().find((l) => l.slug === slug);
}
