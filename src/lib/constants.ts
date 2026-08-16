export const SITE = {
  name: "Map-6",
  title: "Free Interactive GTA 6 Map | Map-6",
  description:
    "Free GTA 6 interactive map with 1400+ POIs — Vice City, collectibles, landmarks & secrets. Filter, measure, share pins. Updated for Nov 2026 launch.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://map-6.com",
  locale: "en_US",
} as const;

/** GTA 6 release — update when Rockstar confirms final date */
export const GTA6_RELEASE = new Date("2026-11-19T00:00:00Z");

/** Game map bounds — overridden by GTADB env vars after fetch */
export const MAP_BOUNDS = {
  minX: Number(process.env.NEXT_PUBLIC_MAP_MIN_X ?? -4500),
  maxX: Number(process.env.NEXT_PUBLIC_MAP_MAX_X ?? 4500),
  minY: Number(process.env.NEXT_PUBLIC_MAP_MIN_Y ?? -4500),
  maxY: Number(process.env.NEXT_PUBLIC_MAP_MAX_Y ?? 4500),
} as const;

export const GTADB = {
  enabled: process.env.NEXT_PUBLIC_GTADB_ENABLED === "true",
  /** Native XYZ tiles (/tiles/gtadb). Set false in prod to use stitched image. */
  native: process.env.NEXT_PUBLIC_GTADB_NATIVE !== "false",
  tileSet: process.env.NEXT_PUBLIC_GTADB_TILE_SET ?? "yanis,13",
  mapImage: process.env.NEXT_PUBLIC_GTADB_MAP_IMAGE ?? null,
  attribution:
    "Map tiles © GTADB / GTA VI Mapping Community — CC BY 4.0",
  attributionUrl: "https://gtadb.org",
} as const;

export const MAP_DEFAULTS = {
  center: [
    Number(process.env.NEXT_PUBLIC_MAP_CENTER_X ?? 0),
    Number(process.env.NEXT_PUBLIC_MAP_CENTER_Y ?? 0),
  ] as [number, number],
  zoom: GTADB.enabled ? -0.5 : 2,
  minZoom: GTADB.enabled ? -2 : 0,
  maxZoom: Number(process.env.NEXT_PUBLIC_MAP_MAX_ZOOM ?? 8),
} as const;
