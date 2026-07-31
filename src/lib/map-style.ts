import type { StyleSpecification } from "maplibre-gl";
import { GTADB, MAP_BOUNDS } from "./constants";
import { mapLibreBounds, toMapLibreCoords } from "./coordinates";
import { getPmtilesUrl, getRasterTilesUrl } from "./pmtiles";

function buildGridFeatures() {
  const features = [];
  const rangeX = MAP_BOUNDS.maxX - MAP_BOUNDS.minX;
  const stepX = Math.max(500, Math.round(rangeX / 20));
  const stepY = Math.max(500, Math.round((MAP_BOUNDS.maxY - MAP_BOUNDS.minY) / 20));

  for (let x = MAP_BOUNDS.minX; x <= MAP_BOUNDS.maxX; x += stepX) {
    const bottom = toMapLibreCoords(x, MAP_BOUNDS.minY);
    const top = toMapLibreCoords(x, MAP_BOUNDS.maxY);
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

  for (let y = MAP_BOUNDS.minY; y <= MAP_BOUNDS.maxY; y += stepY) {
    const left = toMapLibreCoords(MAP_BOUNDS.minX, y);
    const right = toMapLibreCoords(MAP_BOUNDS.maxX, y);
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

function buildGtadbImageStyle(imageUrl: string): StyleSpecification {
  const nw = toMapLibreCoords(MAP_BOUNDS.minX, MAP_BOUNDS.maxY);
  const ne = toMapLibreCoords(MAP_BOUNDS.maxX, MAP_BOUNDS.maxY);
  const se = toMapLibreCoords(MAP_BOUNDS.maxX, MAP_BOUNDS.minY);
  const sw = toMapLibreCoords(MAP_BOUNDS.minX, MAP_BOUNDS.minY);

  return {
    version: 8,
    sources: {
      "leonida-image": {
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
        id: "leonida-image",
        type: "raster",
        source: "leonida-image",
      },
    ],
  };
}

export function buildMapStyle(): StyleSpecification {
  const gtadbNative = GTADB.enabled && GTADB.native;
  const gtadbImage =
    GTADB.enabled && !GTADB.native && GTADB.mapImage ? GTADB.mapImage : null;
  const pmtilesUrl = getPmtilesUrl();
  const rasterUrl = getRasterTilesUrl();
  const bounds = mapLibreBounds();
  const rasterBounds: [number, number, number, number] = [
    bounds[0][0],
    bounds[0][1],
    bounds[1][0],
    bounds[1][1],
  ];

  if (gtadbNative) {
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

  if (gtadbImage) {
    return buildGtadbImageStyle(gtadbImage);
  }

  if (rasterUrl) {
    return {
      version: 8 as const,
      sources: {
        "leonida-raster": {
          type: "raster" as const,
          tiles: [rasterUrl],
          tileSize: 256,
          bounds: rasterBounds,
        },
      },
      layers: [
        {
          id: "leonida-raster",
          type: "raster" as const,
          source: "leonida-raster",
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    };
  }

  if (pmtilesUrl) {
    return {
      version: 8 as const,
      sources: {
        leonida: {
          type: "vector" as const,
          url: `pmtiles://${pmtilesUrl}`,
        },
      },
      layers: [
        {
          id: "background",
          type: "background" as const,
          paint: { "background-color": "#0a0e17" },
        },
        {
          id: "leonida-fill",
          type: "fill" as const,
          source: "leonida",
          "source-layer": "regions",
          paint: {
            "fill-color": "#1e293b",
            "fill-opacity": 0.8,
          },
        },
        {
          id: "leonida-line",
          type: "line" as const,
          source: "leonida",
          "source-layer": "regions",
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
          features: buildGridFeatures(),
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
