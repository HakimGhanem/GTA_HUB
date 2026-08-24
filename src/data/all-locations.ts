import gtadbLocationsJson from "./gtadb-locations.json";
import { collectiblesAsMapLocations } from "./collectibles";
import { GTA6_EDITORIAL_POIS } from "./gta6-editorial-pois";
import { LOCATIONS, type Location } from "./locations";

const gtadbLocations = gtadbLocationsJson as Location[];

export function getAllLocations(): Location[] {
  const slugs = new Set<string>();
  const merged: Location[] = [];
  for (const loc of [
    ...LOCATIONS,
    ...GTA6_EDITORIAL_POIS,
    ...collectiblesAsMapLocations(),
    ...gtadbLocations,
  ]) {
    if (slugs.has(loc.slug)) continue;
    slugs.add(loc.slug);
    merged.push(loc);
  }
  return merged;
}

export { LOCATIONS, type Location };
export type { LocationCategory } from "./locations";
export { getLocationsByCategory } from "./locations";

export function getLocationBySlug(slug: string): Location | undefined {
  return getAllLocations().find((l) => l.slug === slug);
}
