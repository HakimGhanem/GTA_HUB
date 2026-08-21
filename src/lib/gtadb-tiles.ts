import { GTADB } from "./constants";

export type GtadbVersion = 5 | 6;

/** GTADB map constants — from rolux/gtadb.org maps/maps.js */
export const GTADB_MAP = {
  mapW: 32768,
  mapH: 32768,
  zeroX: 16384,
  zeroY: 16384,
  tileSize: 256,
  maxZ: 6,
} as const;

/** Tile index ranges per zoom — maps.js tileSetRanges */
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
  satellite: {
    0: [[1, 0], [2, 2]],
    1: [[2, 1], [5, 5]],
    2: [[5, 3], [10, 10]],
    3: [[11, 7], [20, 20]],
    4: [[23, 15], [41, 41]],
    5: [[47, 31], [83, 83]],
    6: [[95, 62], [166, 167]],
  },
  hybrid: {
    0: [[1, 0], [2, 2]],
    1: [[2, 1], [5, 4]],
    2: [[5, 3], [11, 9]],
    3: [[10, 7], [22, 19]],
    4: [[20, 15], [45, 39]],
    5: [[41, 31], [90, 79]],
    6: [[83, 62], [180, 159]],
  },
  terrain: {
    0: [[1, 0], [2, 2]],
    1: [[2, 1], [5, 5]],
    2: [[5, 3], [10, 10]],
    3: [[11, 7], [20, 20]],
    4: [[23, 15], [41, 41]],
    5: [[47, 31], [83, 83]],
    6: [[95, 62], [166, 167]],
  },
  roadmap: {
    0: [[1, 0], [2, 2]],
    1: [[2, 1], [5, 4]],
    2: [[5, 3], [11, 9]],
    3: [[10, 7], [22, 19]],
    4: [[20, 15], [45, 39]],
    5: [[41, 31], [90, 79]],
    6: [[83, 62], [180, 159]],
  },
  radar: {
    0: [[1, 0], [2, 2]],
    1: [[2, 1], [5, 5]],
    2: [[5, 3], [10, 10]],
    3: [[11, 7], [20, 20]],
    4: [[23, 15], [41, 41]],
    5: [[47, 31], [83, 83]],
    6: [[95, 62], [166, 167]],
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

export function gtadbTileUrl(
  zInt: number,
  tx: number,
  ty: number,
  version: GtadbVersion = 6,
  tileSet: string = GTADB.tileSet,
): string {
  return `/tiles/gtadb/${version}/${tileSet}/${zInt}/${zInt},${ty},${tx}.jpg`;
}

export function getTileRange(
  tileSet: string,
  zInt: number,
): [[number, number], [number, number]] {
  const fallback = tileSet === "satellite" || tileSet === "hybrid" || tileSet === "terrain" || tileSet === "roadmap" || tileSet === "radar"
    ? GTADB_TILE_RANGES.satellite
    : GTADB_TILE_RANGES["yanis,13"];
  return GTADB_TILE_RANGES[tileSet]?.[zInt] ?? fallback[zInt];
}

export function boxesOverlap(
  a: { minX: number; maxX: number; minY: number; maxY: number },
  b: { minX: number; maxX: number; minY: number; maxY: number },
): boolean {
  return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
}
