import { MAP_BOUNDS } from "./constants";

export type GameCoords = {
  x: number;
  y: number;
};

/** MapLibre-safe projection scale (game coords → geographic range) */
const GEO_MAX = 85;

export function toMapLibreCoords(x: number, y: number): { lng: number; lat: number } {
  const lng = Math.max(-GEO_MAX, Math.min(GEO_MAX, (x / MAP_BOUNDS.maxX) * GEO_MAX));
  const lat = Math.max(-GEO_MAX, Math.min(GEO_MAX, (y / MAP_BOUNDS.maxY) * GEO_MAX));
  return { lng, lat };
}

export function fromMapLibreCoords(lng: number, lat: number): GameCoords {
  const safeLng = Math.max(-GEO_MAX, Math.min(GEO_MAX, lng));
  const safeLat = Math.max(-GEO_MAX, Math.min(GEO_MAX, lat));
  return {
    x: Number(((safeLng / GEO_MAX) * MAP_BOUNDS.maxX).toFixed(3)),
    y: Number(((safeLat / GEO_MAX) * MAP_BOUNDS.maxY).toFixed(3)),
  };
}

/** @deprecated use fromMapLibreCoords */
export function toGameCoords(lng: number, lat: number): GameCoords {
  return fromMapLibreCoords(lng, lat);
}

export function formatCoords({ x, y }: GameCoords): string {
  return `X: ${x.toFixed(3)}, Y: ${y.toFixed(3)}`;
}

export function isInBounds({ x, y }: GameCoords): boolean {
  return (
    x >= MAP_BOUNDS.minX &&
    x <= MAP_BOUNDS.maxX &&
    y >= MAP_BOUNDS.minY &&
    y <= MAP_BOUNDS.maxY
  );
}

export function mapLibreBounds(): [[number, number], [number, number]] {
  const sw = toMapLibreCoords(MAP_BOUNDS.minX, MAP_BOUNDS.minY);
  const ne = toMapLibreCoords(MAP_BOUNDS.maxX, MAP_BOUNDS.maxY);
  return [
    [sw.lng, sw.lat],
    [ne.lng, ne.lat],
  ];
}
