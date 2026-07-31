"use client";

import { gameScaleBarUnits, type GameViewport } from "@/lib/map-viewport";
import { formatNumber } from "@/lib/format";

type MapScaleBarProps = {
  viewport: GameViewport | null;
};

export function MapScaleBar({ viewport }: MapScaleBarProps) {
  if (!viewport) return null;

  const units = gameScaleBarUnits(viewport);

  return (
    <div
      className="pointer-events-none flex flex-col items-start gap-1"
      aria-label={`Scale: ${formatNumber(units)} game units`}
    >
      <div className="h-0.5 w-16 rounded-full bg-white/80" />
      <span className="text-[10px] font-medium text-white/70">
        {formatNumber(units)} units
      </span>
    </div>
  );
}
