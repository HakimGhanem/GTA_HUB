import { MAP_BOUNDS } from "./constants";

export type MapBounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export type GameCoords = {
  x: number;
  y: number;
};

/** MapLibre-safe projection scale (game coords → geographic range) */
const GEO_MAX = 85;

function resolveBounds(bounds?: MapBounds): MapBounds {
  return bounds ?? MAP_BOUNDS;
}

export function toMapLibreCoords(
  x: number,
  y: number,
  bounds?: MapBounds,
): { lng: number; lat: number } {
  const b = resolveBounds(bounds);
  const scaleX = b.maxX || 1;
  const scaleY = b.maxY || 1;
  const lng = Math.max(-GEO_MAX, Math.min(GEO_MAX, (x / scaleX) * GEO_MAX));
  const lat = Math.max(-GEO_MAX, Math.min(GEO_MAX, (y / scaleY) * GEO_MAX));
  return { lng, lat };
}

export function fromMapLibreCoords(
  lng: number,
  lat: number,
  bounds?: MapBounds,
): GameCoords {
  const b = resolveBounds(bounds);
  const scaleX = b.maxX || 1;
  const scaleY = b.maxY || 1;
  const safeLng = Math.max(-GEO_MAX, Math.min(GEO_MAX, lng));
  const safeLat = Math.max(-GEO_MAX, Math.min(GEO_MAX, lat));
  return {
    x: Number(((safeLng / GEO_MAX) * scaleX).toFixed(3)),
    y: Number(((safeLat / GEO_MAX) * scaleY).toFixed(3)),
  };
}

/** @deprecated use fromMapLibreCoords */
export function toGameCoords(lng: number, lat: number, bounds?: MapBounds): GameCoords {
  return fromMapLibreCoords(lng, lat, bounds);
}

export function formatCoords({ x, y }: GameCoords): string {
  return `X: ${x.toFixed(3)}, Y: ${y.toFixed(3)}`;
}

export function isInBounds({ x, y }: GameCoords, bounds?: MapBounds): boolean {
  const b = resolveBounds(bounds);
  return x >= b.minX && x <= b.maxX && y >= b.minY && y <= b.maxY;
}

export function mapLibreBounds(
  bounds?: MapBounds,
): [[number, number], [number, number]] {
  const b = resolveBounds(bounds);
  const sw = toMapLibreCoords(b.minX, b.minY, b);
  const ne = toMapLibreCoords(b.maxX, b.maxY, b);
  return [
    [sw.lng, sw.lat],
    [ne.lng, ne.lat],
  ];
}
