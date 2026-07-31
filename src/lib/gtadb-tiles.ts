import { GTADB } from "./constants";

/** GTADB map constants — from rolux/gtadb.org maps/maps.js */
export const GTADB_MAP = {
  mapW: 32768,
  mapH: 32768,
  zeroX: 16384,
  zeroY: 16384,
  tileSize: 256,
  maxZ: 6,
} as const;

/** Tile index ranges per zoom — yanis,13 */
export const GTADB_TILE_RANGES: Record<string, Record<number, [[number, number], [number, number]]>> = {
  "yanis,13": {
    0: [[0, 0], [2, 2]],
    1: [[0, 1], [4, 5]],
    2: [[0, 2], [9, 11]],
    3: [[0, 4], [19, 23]],
    4: [[0, 8], [38, 47]],
    5: [[0, 17], [77, 95]],
    6: [[0, 34], [155, 190]],
  },
  "dupzor,51": {
    0: [[0, 0], [2, 2]],
    1: [[0, 1], [4, 5]],
    2: [[0, 2], [9, 11]],
    3: [[0, 4], [19, 23]],
    4: [[0, 8], [38, 47]],
    5: [[0, 17], [77, 94]],
    6: [[1, 34], [155, 188]],
  },
};

export function mapZoomToGtadbZ(mapZoom: number): number {
  return Math.max(0, Math.min(GTADB_MAP.maxZ, Math.round(mapZoom + 1.5)));
}

export function tileGameBounds(zInt: number, tx: number, ty: number) {
  const mapSize = 1024 * 2 ** zInt;
  const mppx = mapSize / GTADB_MAP.mapW;
  const px = GTADB_MAP.tileSize;
  return {
    minX: (tx * px) / mppx - GTADB_MAP.zeroX,
    maxX: ((tx + 1) * px) / mppx - GTADB_MAP.zeroX,
    maxY: GTADB_MAP.zeroY - (ty * px) / mppx,
    minY: GTADB_MAP.zeroY - ((ty + 1) * px) / mppx,
  };
}

export function gtadbTileUrl(zInt: number, tx: number, ty: number): string {
  const tileSet = GTADB.tileSet;
  return `/tiles/gtadb/6/${tileSet}/${zInt}/${zInt},${ty},${tx}.jpg`;
}

export function getTileRange(tileSet: string, zInt: number): [[number, number], [number, number]] {
  return GTADB_TILE_RANGES[tileSet]?.[zInt] ?? GTADB_TILE_RANGES["yanis,13"][zInt];
}

export function boxesOverlap(
  a: { minX: number; maxX: number; minY: number; maxY: number },
  b: { minX: number; maxX: number; minY: number; maxY: number },
): boolean {
  return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
}
