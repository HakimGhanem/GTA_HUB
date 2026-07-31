"use client";

import { useMemo } from "react";
import { Layer, Marker, Source } from "react-map-gl/maplibre";
import type { GameCoords } from "@/lib/coordinates";
import { toMapLibreCoords } from "@/lib/coordinates";
import { formatGameDistance, pathDistance } from "@/lib/measure";

type MapMeasureLayerProps = {
  points: GameCoords[];
  onClear: () => void;
  onClose: () => void;
};

export function MapMeasureLayer({ points, onClear, onClose }: MapMeasureLayerProps) {
  const lineGeoJson = useMemo(() => {
    if (points.length < 2) return null;
    return {
      type: "Feature" as const,
      geometry: {
        type: "LineString" as const,
        coordinates: points.map((p) => {
          const { lng, lat } = toMapLibreCoords(p.x, p.y);
          return [lng, lat] as [number, number];
        }),
      },
      properties: {},
    };
  }, [points]);

  const total = pathDistance(points);

  return (
    <>
      {lineGeoJson && (
        <Source id="measure-line" type="geojson" data={lineGeoJson}>
          <Layer
            id="measure-line-layer"
            type="line"
            paint={{
              "line-color": "#ec4899",
              "line-width": 3,
              "line-dasharray": [2, 1],
            }}
          />
        </Source>
      )}

      {points.map((p, i) => {
        const { lng, lat } = toMapLibreCoords(p.x, p.y);
        return (
          <Marker key={`${p.x}-${p.y}-${i}`} longitude={lng} latitude={lat} anchor="center">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white ring-2 ring-white">
              {i + 1}
            </span>
          </Marker>
        );
      })}

      {points.length > 0 && (
        <div className="pointer-events-auto absolute bottom-16 left-3 z-20 rounded-lg border border-pink-400/30 bg-black/85 px-3 py-2.5 backdrop-blur-md sm:left-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-pink-400">
                Distance
              </p>
              <p className="mt-0.5 font-mono text-sm text-white">
                {formatGameDistance(total)}
              </p>
              <p className="mt-0.5 text-[10px] text-white/50">
                {points.length} point{points.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={onClear}
                className="rounded-md px-2 py-1 text-[10px] text-white/60 hover:bg-white/10 hover:text-white"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md px-2 py-1 text-[10px] text-white/60 hover:bg-white/10 hover:text-white"
                aria-label="Close measure tool"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
