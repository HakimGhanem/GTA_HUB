import { GTADB, MAP_BOUNDS, MAP_DEFAULTS } from "@/lib/constants";
import type { Location } from "@/data/locations";
import { getAllLocations as getGta6Locations } from "@/data/all-locations";
import { GTA5_LOCATIONS } from "@/data/locations-gta5";
import { SA_LOCATIONS } from "@/data/locations-sa";
import type { MapBounds } from "@/lib/coordinates";

export type { MapBounds };

export const GAME_IDS = ["gta6", "gta5", "sa"] as const;
export type GameId = (typeof GAME_IDS)[number];

export type GameTileSource =
  | { kind: "gtadb" }
  | { kind: "raster"; url: string }
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

function envStr(key: string): string | null {
  const v = process.env[key]?.trim();
  return v || null;
}

function gta6Config(): GameConfig {
  const raster = envStr("NEXT_PUBLIC_RASTER_TILES_URL");
  const pmtiles = envStr("NEXT_PUBLIC_PMTILES_URL");
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
    maxZoom: MAP_DEFAULTS.maxZoom,
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
  const raster =
    envStr("NEXT_PUBLIC_GTA5_RASTER_TILES_URL") ||
    envStr("NEXT_PUBLIC_GTA5_TILES_URL");
  const pmtiles = envStr("NEXT_PUBLIC_GTA5_PMTILES_URL");

  let tile: GameTileSource = { kind: "grid" };
  if (raster) tile = { kind: "raster", url: raster };
  else if (pmtiles) tile = { kind: "pmtiles", url: pmtiles, sourceLayer: "regions" };

  return {
    id: "gta5",
    shortLabel: "V",
    label: "GTA 5",
    era: "Los Santos",
    primary: false,
    bounds: {
      minX: envNum("NEXT_PUBLIC_GTA5_MAP_MIN_X", -4000),
      maxX: envNum("NEXT_PUBLIC_GTA5_MAP_MAX_X", 4500),
      minY: envNum("NEXT_PUBLIC_GTA5_MAP_MIN_Y", -4000),
      maxY: envNum("NEXT_PUBLIC_GTA5_MAP_MAX_Y", 8000),
    },
    center: [
      envNum("NEXT_PUBLIC_GTA5_MAP_CENTER_X", -250),
      envNum("NEXT_PUBLIC_GTA5_MAP_CENTER_Y", -800),
    ],
    zoom: 2,
    minZoom: 0,
    maxZoom: envNum("NEXT_PUBLIC_GTA5_MAP_MAX_ZOOM", 7),
    tile,
    attribution: "GTA V community map tiles — configure NEXT_PUBLIC_GTA5_RASTER_TILES_URL",
    tileSourceNotes: [
      "RiceaRaul/gta-v-map-leaflet (MIT) — Atlas/Satellite/Grid XYZ tiles",
      "Flamm64/GTA-V-World-Map — calibration reference",
      "oyuh/w3w-map — Next.js + Leaflet tile hosting pattern",
      "Host as XYZ → NEXT_PUBLIC_GTA5_RASTER_TILES_URL=/tiles/gta5/{z}/{x}/{y}.png",
    ],
    getLocations: () => GTA5_LOCATIONS,
  };
}

function saConfig(): GameConfig {
  const raster =
    envStr("NEXT_PUBLIC_SA_RASTER_TILES_URL") ||
    envStr("NEXT_PUBLIC_SA_TILES_URL");
  const pmtiles = envStr("NEXT_PUBLIC_SA_PMTILES_URL");

  let tile: GameTileSource = { kind: "grid" };
  if (raster) tile = { kind: "raster", url: raster };
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
    zoom: 2,
    minZoom: 0,
    maxZoom: envNum("NEXT_PUBLIC_SA_MAP_MAX_ZOOM", 6),
    tile,
    attribution: "GTA SA community map tiles — configure NEXT_PUBLIC_SA_RASTER_TILES_URL",
    tileSourceNotes: [
      "ikkentim/SanMap (Unlicense) — TileCutter + projection",
      "DeAardbolMan/SAMAP — Leaflet + in-game coords",
      "interactive-game-maps/grand_theft_auto_san_andreas",
      "Host as XYZ → NEXT_PUBLIC_SA_RASTER_TILES_URL=/tiles/sa/{z}/{x}/{y}.png",
    ],
    getLocations: () => SA_LOCATIONS,
  };
}

const REGISTRY: Record<GameId, () => GameConfig> = {
  gta6: gta6Config,
  gta5: gta5Config,
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
