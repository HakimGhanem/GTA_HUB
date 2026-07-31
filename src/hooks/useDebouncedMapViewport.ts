"use client";

import { useEffect, useState } from "react";
import type { MapRef } from "react-map-gl/maplibre";
import { viewportFromMap, type GameViewport } from "@/lib/map-viewport";

export function useDebouncedMapViewport(
  mapRef: React.RefObject<MapRef | null>,
  mapLoaded: boolean,
  delayMs = 300,
): GameViewport | null {
  const [viewport, setViewport] = useState<GameViewport | null>(null);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapLoaded) return;

    let timeout: ReturnType<typeof setTimeout>;

    const update = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const b = map.getBounds();
        setViewport(
          viewportFromMap(
            b.getWest(),
            b.getSouth(),
            b.getEast(),
            b.getNorth(),
            map.getZoom(),
          ),
        );
      }, delayMs);
    };

    map.on("moveend", update);
    map.on("zoomend", update);
    update();

    return () => {
      clearTimeout(timeout);
      map.off("moveend", update);
      map.off("zoomend", update);
    };
  }, [mapRef, mapLoaded, delayMs]);

  return viewport;
}
