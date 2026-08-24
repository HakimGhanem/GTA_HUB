import { GTADB, GTA5_GTADB, MAP_BOUNDS, MAP_DEFAULTS } from "@/lib/constants";
import type { Location } from "@/data/locations";
import { getAllLocations as getGta6Locations } from "@/data/all-locations";
import { GTA5_LOCATIONS } from "@/data/locations-gta5";
import { SA_LOCATIONS } from "@/data/locations-sa";
import { VC_LOCATIONS } from "@/data/locations-vc";
import type { MapBounds } from "@/lib/coordinates";

export type { MapBounds };

export const GAME_IDS = ["gta6", "gta5", "vc", "sa"] as const;
export type GameId = (typeof GAME_IDS)[number];

export type GameTileSource =
  | { kind: "gtadb" }
  | { kind: "raster"; url: string }
  | { kind: "image"; url: string }
  | { kind: "pmtiles"; url: string; sourceLayer?: string }
  | { kind: "grid" };

export type GameConfig = {
  id: GameId;
  /** Short HUD label */
  shortLabel: string;
  label: string;
  /** Shown under switcher — keep subtle */
  era: string;
  primary: boolean;
  bounds: MapBounds;
  center: [number, number];
  zoom: number;
  minZoom: number;
  maxZoom: number;
  tile: GameTileSource;
  attribution?: string;
  attributionUrl?: string;
  /** Community / open tile sources for ops docs */
  tileSourceNotes: string[];
  getLocations: () => Location[];
};

function envNum(key: string, fallback: number): number {
  const raw = process.env[key];
  if (raw == null || raw === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Next.js only inlines `process.env.NEXT_PUBLIC_*` with static property access.
 * Dynamic `process.env[key]` is undefined in the browser → maps fell back to grid.
 */
function publicEnv(value: string | undefined): string | null {
  const v = value?.trim();
  return v || null;
}

const PUBLIC_TILE_ENV = {
  raster: publicEnv(process.env.NEXT_PUBLIC_RASTER_TILES_URL),
  pmtiles: publicEnv(process.env.NEXT_PUBLIC_PMTILES_URL),
  gta5Raster:
    publicEnv(process.env.NEXT_PUBLIC_GTA5_RASTER_TILES_URL) ||
    publicEnv(process.env.NEXT_PUBLIC_GTA5_TILES_URL),
  gta5Pmtiles: publicEnv(process.env.NEXT_PUBLIC_GTA5_PMTILES_URL),
  vcImage: publicEnv(process.env.NEXT_PUBLIC_VC_MAP_IMAGE),
  vcRaster:
    publicEnv(process.env.NEXT_PUBLIC_VC_RASTER_TILES_URL) ||
    publicEnv(process.env.NEXT_PUBLIC_VC_TILES_URL),
  vcPmtiles: publicEnv(process.env.NEXT_PUBLIC_VC_PMTILES_URL),
  saImage: publicEnv(process.env.NEXT_PUBLIC_SA_MAP_IMAGE),
  saRaster:
    publicEnv(process.env.NEXT_PUBLIC_SA_RASTER_TILES_URL) ||
    publicEnv(process.env.NEXT_PUBLIC_SA_TILES_URL),
  saPmtiles: publicEnv(process.env.NEXT_PUBLIC_SA_PMTILES_URL),
} as const;

function gta6Config(): GameConfig {
  const raster = PUBLIC_TILE_ENV.raster;
  const pmtiles = PUBLIC_TILE_ENV.pmtiles;
  const imageBasemap = GTADB.enabled && !GTADB.native && !!GTADB.mapImage;

  let tile: GameTileSource = { kind: "grid" };
  if (GTADB.enabled) tile = { kind: "gtadb" };
  else if (raster) tile = { kind: "raster", url: raster };
  else if (pmtiles) tile = { kind: "pmtiles", url: pmtiles, sourceLayer: "regions" };

  return {
    id: "gta6",
    shortLabel: "VI",
    label: "GTA 6",
    era: "Leonida",
    primary: true,
    bounds: { ...MAP_BOUNDS },
    center: MAP_DEFAULTS.center,
    zoom: MAP_DEFAULTS.zoom,
    minZoom: MAP_DEFAULTS.minZoom,
    maxZoom: envNum(
      "NEXT_PUBLIC_MAP_MAX_ZOOM",
      imageBasemap ? 5.5 : MAP_DEFAULTS.maxZoom,
    ),
    tile,
    attribution: GTADB.enabled ? GTADB.attribution : undefined,
    attributionUrl: GTADB.enabled ? GTADB.attributionUrl : undefined,
    tileSourceNotes: [
      "GTADB / GTA VI Mapping Community — https://gtadb.org (CC BY 4.0)",
      "npm run tiles:fetch-gtadb",
    ],
    getLocations: getGta6Locations,
  };
}

function gta5Config(): GameConfig {
  const raster = PUBLIC_TILE_ENV.gta5Raster;
  const pmtiles = PUBLIC_TILE_ENV.gta5Pmtiles;
  const imageBasemap =
    GTA5_GTADB.enabled && !GTA5_GTADB.native && !!GTA5_GTADB.mapImage;

  let tile: GameTileSource = { kind: "grid" };
  if (GTA5_GTADB.enabled) tile = { kind: "gtadb" };
  else if (raster) tile = { kind: "raster", url: raster };
  else if (pmtiles) tile = { kind: "pmtiles", url: pmtiles, sourceLayer: "regions" };

  return {
    id: "gta5",
    shortLabel: "V",
    label: "GTA 5",
    era: "Los Santos",
    primary: false,
    bounds: {
      minX: envNum("NEXT_PUBLIC_GTA5_MAP_MIN_X", -4224),
      maxX: envNum("NEXT_PUBLIC_GTA5_MAP_MAX_X", 4992),
      minY: envNum("NEXT_PUBLIC_GTA5_MAP_MIN_Y", -5120),
      maxY: envNum("NEXT_PUBLIC_GTA5_MAP_MAX_Y", 8448),
    },
    center: [
      envNum("NEXT_PUBLIC_GTA5_MAP_CENTER_X", -75),
      envNum("NEXT_PUBLIC_GTA5_MAP_CENTER_Y", -818),
    ],
    zoom: GTA5_GTADB.enabled ? -0.5 : 2,
    minZoom: GTA5_GTADB.enabled ? -2 : 0,
    maxZoom: envNum(
      "NEXT_PUBLIC_GTA5_MAP_MAX_ZOOM",
      imageBasemap ? 5.5 : 7,
    ),
    tile,
    attribution: GTA5_GTADB.enabled
      ? GTA5_GTADB.attribution
      : "GTA V community map tiles — configure NEXT_PUBLIC_GTA5_GTADB_ENABLED or NEXT_PUBLIC_GTA5_RASTER_TILES_URL",
    attributionUrl: GTA5_GTADB.enabled ? GTA5_GTADB.attributionUrl : undefined,
    tileSourceNotes: [
      "GTADB GTA V satellite — https://gtadb.org (CC BY 4.0)",
      "npm run tiles:fetch-gtadb-gta5",
      "RiceaRaul/gta-v-map-leaflet (MIT) — Atlas/Satellite/Grid XYZ tiles",
      "Host as XYZ → NEXT_PUBLIC_GTA5_RASTER_TILES_URL=/tiles/gta5/{z}/{x}/{y}.png",
    ],
    getLocations: () => GTA5_LOCATIONS,
  };
}

function vcConfig(): GameConfig {
  const image = PUBLIC_TILE_ENV.vcImage;
  const raster = PUBLIC_TILE_ENV.vcRaster;
  const pmtiles = PUBLIC_TILE_ENV.vcPmtiles;

  let tile: GameTileSource = { kind: "grid" };
  if (image) tile = { kind: "image", url: image };
  else if (raster) tile = { kind: "raster", url: raster };
  else if (pmtiles) tile = { kind: "pmtiles", url: pmtiles, sourceLayer: "regions" };

  return {
    id: "vc",
    shortLabel: "VC",
    label: "Vice City",
    era: "1980s VC",
    primary: false,
    bounds: {
      minX: envNum("NEXT_PUBLIC_VC_MAP_MIN_X", -2200),
      maxX: envNum("NEXT_PUBLIC_VC_MAP_MAX_X", 2200),
      minY: envNum("NEXT_PUBLIC_VC_MAP_MIN_Y", -2200),
      maxY: envNum("NEXT_PUBLIC_VC_MAP_MAX_Y", 2200),
    },
    center: [
      envNum("NEXT_PUBLIC_VC_MAP_CENTER_X", -200),
      envNum("NEXT_PUBLIC_VC_MAP_CENTER_Y", -400),
    ],
    zoom: image ? 1 : 2,
    minZoom: 0,
    maxZoom: envNum("NEXT_PUBLIC_VC_MAP_MAX_ZOOM", image ? 3.5 : 6),
    tile,
    attribution: image
      ? "Vice City map — huncrys/vcmp-livemap (MIT)"
      : "GTA Vice City — configure NEXT_PUBLIC_VC_MAP_IMAGE (npm run tiles:fetch-classic)",
    attributionUrl: image
      ? "https://github.com/huncrys/vcmp-livemap"
      : undefined,
    tileSourceNotes: [
      "npm run tiles:fetch-classic → NEXT_PUBLIC_VC_MAP_IMAGE=/tiles/vc-map.png",
      "USJ + stores: node scripts/import-vc-collectibles.mjs (kong78 Apache-2.0)",
    ],
    getLocations: () => VC_LOCATIONS,
  };
}

function saConfig(): GameConfig {
  const image = PUBLIC_TILE_ENV.saImage;
  const raster = PUBLIC_TILE_ENV.saRaster;
  const pmtiles = PUBLIC_TILE_ENV.saPmtiles;

  let tile: GameTileSource = { kind: "grid" };
  if (image) tile = { kind: "image", url: image };
  else if (raster) tile = { kind: "raster", url: raster };
  else if (pmtiles) tile = { kind: "pmtiles", url: pmtiles, sourceLayer: "regions" };

  return {
    id: "sa",
    shortLabel: "SA",
    label: "San Andreas",
    era: "State of SA",
    primary: false,
    bounds: {
      minX: envNum("NEXT_PUBLIC_SA_MAP_MIN_X", -3000),
      maxX: envNum("NEXT_PUBLIC_SA_MAP_MAX_X", 3000),
      minY: envNum("NEXT_PUBLIC_SA_MAP_MIN_Y", -3000),
      maxY: envNum("NEXT_PUBLIC_SA_MAP_MAX_Y", 3000),
    },
    center: [
      envNum("NEXT_PUBLIC_SA_MAP_CENTER_X", 0),
      envNum("NEXT_PUBLIC_SA_MAP_CENTER_Y", 0),
    ],
    zoom: image ? 1 : 2,
    minZoom: 0,
    maxZoom: envNum("NEXT_PUBLIC_SA_MAP_MAX_ZOOM", image ? 5.5 : 6),
    tile,
    attribution: image
      ? "San Andreas map — SAMAP / Charles Blackwood"
      : "GTA SA community map tiles — configure NEXT_PUBLIC_SA_MAP_IMAGE",
    attributionUrl: image
      ? "https://github.com/DeAardbolMan/SAMAP"
      : undefined,
    tileSourceNotes: [
      "npm run tiles:fetch-classic → NEXT_PUBLIC_SA_MAP_IMAGE=/tiles/sa-map.png",
      "ikkentim/SanMap (Unlicense) for XYZ TileCutter pipeline",
    ],
    getLocations: () => SA_LOCATIONS,
  };
}

const REGISTRY: Record<GameId, () => GameConfig> = {
  gta6: gta6Config,
  gta5: gta5Config,
  vc: vcConfig,
  sa: saConfig,
};

export const DEFAULT_GAME_ID: GameId = "gta6";

export function isGameId(value: string | null | undefined): value is GameId {
  return !!value && (GAME_IDS as readonly string[]).includes(value);
}

export function parseGameId(value: string | null | undefined): GameId {
  return isGameId(value) ? value : DEFAULT_GAME_ID;
}

export function getGameConfig(id: GameId = DEFAULT_GAME_ID): GameConfig {
  return REGISTRY[id]();
}

/** GTA 6 first, then classics — for subtle switcher order */
export function listGames(): GameConfig[] {
  return GAME_IDS.map((id) => getGameConfig(id));
}
