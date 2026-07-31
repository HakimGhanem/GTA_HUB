"use client";

import clsx from "clsx";
import { formatNumber } from "@/lib/format";
import { POI_DETAIL_MIN_ZOOM, type GameViewport } from "@/lib/map-viewport";

type MapStatusBarProps = {
  viewport: GameViewport | null;
  visibleCount: number;
  totalCount: number;
  measureActive?: boolean;
};

export function MapStatusBar({
  viewport,
  visibleCount,
  totalCount,
  measureActive,
}: MapStatusBarProps) {
  const zoom = viewport?.zoom;
  const showZoomHint =
    zoom != null && zoom < POI_DETAIL_MIN_ZOOM && !measureActive;

  return (
    <div
      className={clsx(
        "pointer-events-none flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/60",
      )}
    >
      {viewport && (
        <span>
          Zoom {zoom!.toFixed(1)} · {formatNumber(visibleCount)}/
          {formatNumber(totalCount)} in view
        </span>
      )}
      {showZoomHint && (
        <span className="text-amber-300/90">Zoom in for individual markers</span>
      )}
      {measureActive && (
        <span className="text-pink-300">Click map to add measure points · Esc to cancel</span>
      )}
    </div>
  );
}
