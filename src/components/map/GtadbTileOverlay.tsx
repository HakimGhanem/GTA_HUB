"use client";

import { useEffect, useRef } from "react";
import type { MapRef } from "react-map-gl/maplibre";
import type { Map as MapLibreMap } from "maplibre-gl";
import {
  fromMapLibreCoords,
  toMapLibreCoords,
  type MapBounds,
} from "@/lib/coordinates";
import {
  boxesOverlap,
  getTileRange,
  gtadbTileUrl,
  mapZoomToGtadbZ,
  tileGameBounds,
  type GtadbVersion,
} from "@/lib/gtadb-tiles";

type GtadbTileOverlayProps = {
  mapRef: React.RefObject<MapRef | null>;
  bounds: MapBounds;
  version: GtadbVersion;
  tileSet: string;
  enabled?: boolean;
};

const tileCache = new Map<string, HTMLImageElement>();

function loadTile(url: string): Promise<HTMLImageElement> {
  const cached = tileCache.get(url);
  if (cached?.complete) return Promise.resolve(cached);

  return new Promise((resolve, reject) => {
    let img = tileCache.get(url);
    if (!img) {
      img = new Image();
      tileCache.set(url, img);
    }
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function renderTiles(
  map: MapLibreMap,
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  gameBounds: MapBounds,
  version: GtadbVersion,
  tileSet: string,
) {
  const bounds = map.getBounds();
  const sw = fromMapLibreCoords(bounds.getWest(), bounds.getSouth(), gameBounds);
  const ne = fromMapLibreCoords(bounds.getEast(), bounds.getNorth(), gameBounds);
  const viewBox = {
    minX: sw.x,
    maxX: ne.x,
    minY: sw.y,
    maxY: ne.y,
  };

  const zInt = mapZoomToGtadbZ(map.getZoom());
  const [[x0, y0], [x1, y1]] = getTileRange(tileSet, zInt);

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#0a0e17";
  ctx.fillRect(0, 0, w, h);

  for (let ty = y0; ty <= y1; ty++) {
    for (let tx = x0; tx <= x1; tx++) {
      const tb = tileGameBounds(zInt, tx, ty);
      if (!boxesOverlap(tb, viewBox)) continue;

      const nw = toMapLibreCoords(tb.minX, tb.maxY, gameBounds);
      const se = toMapLibreCoords(tb.maxX, tb.minY, gameBounds);
      const tl = map.project([nw.lng, nw.lat]);
      const br = map.project([se.lng, se.lat]);

      const dw = br.x - tl.x;
      const dh = br.y - tl.y;
      if (dw < 1 || dh < 1) continue;

      const url = gtadbTileUrl(zInt, tx, ty, version, tileSet);
      const img = tileCache.get(url);
      if (img?.complete && img.naturalWidth > 0) {
        try {
          ctx.drawImage(img, tl.x, tl.y, dw, dh);
        } catch {
          tileCache.delete(url);
        }
      } else {
        loadTile(url)
          .then(() => map.triggerRepaint())
          .catch(() => tileCache.delete(url));
      }
    }
  }
}

export function GtadbTileOverlay({
  mapRef,
  bounds,
  version,
  tileSet,
  enabled = true,
}: GtadbTileOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const map = mapRef.current?.getMap();
    const canvas = canvasRef.current;
    if (!map || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const container = map.getContainer();
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const draw = () => {
      resize();
      renderTiles(map, ctx, canvas.width, canvas.height, bounds, version, tileSet);
    };

    map.on("move", draw);
    map.on("zoom", draw);
    map.on("resize", draw);
    map.on("load", draw);
    draw();

    return () => {
      map.off("move", draw);
      map.off("zoom", draw);
      map.off("resize", draw);
      map.off("load", draw);
    };
  }, [bounds, enabled, mapRef, tileSet, version]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden
    />
  );
}
