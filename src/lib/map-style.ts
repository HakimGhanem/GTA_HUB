import type { StyleSpecification } from "maplibre-gl";
import { GTADB, GTA5_GTADB } from "./constants";
import {
  mapLibreBounds,
  toMapLibreCoords,
  type MapBounds,
} from "./coordinates";
import { DEFAULT_GAME_ID, getGameConfig, type GameConfig } from "./games";

function buildGridFeatures(bounds: MapBounds) {
  const features = [];
  const rangeX = bounds.maxX - bounds.minX;
  const stepX = Math.max(500, Math.round(rangeX / 20));
  const stepY = Math.max(500, Math.round((bounds.maxY - bounds.minY) / 20));

  for (let x = bounds.minX; x <= bounds.maxX; x += stepX) {
    const bottom = toMapLibreCoords(x, bounds.minY, bounds);
    const top = toMapLibreCoords(x, bounds.maxY, bounds);
    features.push({
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "LineString" as const,
        coordinates: [
          [bottom.lng, bottom.lat],
          [top.lng, top.lat],
        ],
      },
    });
  }

  for (let y = bounds.minY; y <= bounds.maxY; y += stepY) {
    const left = toMapLibreCoords(bounds.minX, y, bounds);
    const right = toMapLibreCoords(bounds.maxX, y, bounds);
    features.push({
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "LineString" as const,
        coordinates: [
          [left.lng, left.lat],
          [right.lng, right.lat],
        ],
      },
    });
  }

  return features;
}

function buildImageStyle(imageUrl: string, bounds: MapBounds, sourceId: string): StyleSpecification {
  const nw = toMapLibreCoords(bounds.minX, bounds.maxY, bounds);
  const ne = toMapLibreCoords(bounds.maxX, bounds.maxY, bounds);
  const se = toMapLibreCoords(bounds.maxX, bounds.minY, bounds);
  const sw = toMapLibreCoords(bounds.minX, bounds.minY, bounds);

  return {
    version: 8,
    sources: {
      [sourceId]: {
        type: "image",
        url: imageUrl,
        coordinates: [
          [nw.lng, nw.lat],
          [ne.lng, ne.lat],
          [se.lng, se.lat],
          [sw.lng, sw.lat],
        ],
      },
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": "#0a0e17" },
      },
      {
        id: sourceId,
        type: "raster",
        source: sourceId,
      },
    ],
  };
}

export function buildMapStyle(game: GameConfig = getGameConfig(DEFAULT_GAME_ID)): StyleSpecification {
  const bounds = game.bounds;
  const mlBounds = mapLibreBounds(bounds);
  const rasterBounds: [number, number, number, number] = [
    mlBounds[0][0],
    mlBounds[0][1],
    mlBounds[1][0],
    mlBounds[1][1],
  ];
  const sourceId = `${game.id}-base`;

  if (game.tile.kind === "gtadb") {
    const cfg = game.id === "gta5" ? GTA5_GTADB : GTADB;
    if (!cfg.native && cfg.mapImage) {
      return buildImageStyle(cfg.mapImage, bounds, sourceId);
    }
    return {
      version: 8 as const,
      sources: {},
      layers: [
        {
          id: "background",
          type: "background" as const,
          paint: { "background-color": "rgba(0,0,0,0)" },
        },
      ],
    };
  }

  if (game.tile.kind === "raster") {
    return {
      version: 8 as const,
      sources: {
        [sourceId]: {
          type: "raster" as const,
          tiles: [game.tile.url],
          tileSize: 256,
          bounds: rasterBounds,
        },
      },
      layers: [
        {
          id: sourceId,
          type: "raster" as const,
          source: sourceId,
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    };
  }

  if (game.tile.kind === "pmtiles") {
    const layer = game.tile.sourceLayer ?? "regions";
    return {
      version: 8 as const,
      sources: {
        [sourceId]: {
          type: "vector" as const,
          url: `pmtiles://${game.tile.url}`,
        },
      },
      layers: [
        {
          id: "background",
          type: "background" as const,
          paint: { "background-color": "#0a0e17" },
        },
        {
          id: `${sourceId}-fill`,
          type: "fill" as const,
          source: sourceId,
          "source-layer": layer,
          paint: {
            "fill-color": "#1e293b",
            "fill-opacity": 0.8,
          },
        },
        {
          id: `${sourceId}-line`,
          type: "line" as const,
          source: sourceId,
          "source-layer": layer,
          paint: {
            "line-color": "#334155",
            "line-width": 1,
          },
        },
      ],
    };
  }

  return {
    version: 8 as const,
    sources: {
      grid: {
        type: "geojson" as const,
        data: {
          type: "FeatureCollection" as const,
          features: buildGridFeatures(bounds),
        },
      },
    },
    layers: [
      {
        id: "background",
        type: "background" as const,
        paint: { "background-color": "#0a0e17" },
      },
      {
        id: "grid-lines",
        type: "line" as const,
        source: "grid",
        paint: {
          "line-color": "#1e293b",
          "line-width": 1,
          "line-opacity": 0.6,
        },
      },
    ],
  };
}
