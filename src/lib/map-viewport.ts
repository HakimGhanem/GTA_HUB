import { fromMapLibreCoords } from "./coordinates";
import type { Location } from "@/data/locations";

export type GameViewport = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  zoom: number;
  /** MapLibre bounds [west, south, east, north] */
  bounds: [number, number, number, number];
};

export const POI_DETAIL_MIN_ZOOM = 3;

export function viewportFromMap(
  west: number,
  south: number,
  east: number,
  north: number,
  zoom: number,
): GameViewport {
  const sw = fromMapLibreCoords(west, south);
  const ne = fromMapLibreCoords(east, north);
  return {
    minX: Math.min(sw.x, ne.x),
    maxX: Math.max(sw.x, ne.x),
    minY: Math.min(sw.y, ne.y),
    maxY: Math.max(sw.y, ne.y),
    zoom,
    bounds: [west, south, east, north],
  };
}

export function filterLocationsInViewport(
  locations: Location[],
  viewport: GameViewport,
): Location[] {
  return locations.filter(
    (loc) =>
      loc.x >= viewport.minX &&
      loc.x <= viewport.maxX &&
      loc.y >= viewport.minY &&
      loc.y <= viewport.maxY,
  );
}

/** Pick a round scale bar width (~25% of visible map width). */
export function gameScaleBarUnits(viewport: GameViewport): number {
  const width = viewport.maxX - viewport.minX;
  const target = width * 0.25;
  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.max(target, 1))));
  return Math.max(magnitude, Math.round(target / magnitude) * magnitude);
}
