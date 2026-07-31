"use client";

import clsx from "clsx";
import { formatCoords, type GameCoords } from "@/lib/coordinates";

type MapToolbarProps = {
  coords: GameCoords;
  showSidebarToggle?: boolean;
  sidebarOpen: boolean;
  measureActive: boolean;
  onToggleSidebar: () => void;
  onToggleMeasure: () => void;
  onFitBounds: () => void;
};

export function MapToolbar({
  coords,
  showSidebarToggle = false,
  sidebarOpen,
  measureActive,
  onToggleSidebar,
  onToggleMeasure,
  onFitBounds,
}: MapToolbarProps) {
  async function copyCoords() {
    try {
      await navigator.clipboard.writeText(formatCoords(coords));
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="pointer-events-none absolute right-3 top-3 z-20 flex flex-col items-end gap-2 sm:right-4 sm:top-4">
      <div className="pointer-events-auto flex flex-wrap justify-end gap-2">
        {showSidebarToggle && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className={clsx(
              "rounded-lg border px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60",
              sidebarOpen
                ? "border-pink-400/40 bg-pink-500/20 text-pink-200"
                : "border-white/15 bg-black/70 text-white/90 hover:bg-black/85",
            )}
            aria-pressed={sidebarOpen}
            aria-label={sidebarOpen ? "Hide location panel" : "Show location panel"}
          >
            {sidebarOpen ? "Hide panel" : "Locations"}
          </button>
        )}
        <button
          type="button"
          onClick={onToggleMeasure}
          className={clsx(
            "rounded-lg border px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60",
            measureActive
              ? "border-pink-400/40 bg-pink-500/20 text-pink-200"
              : "border-white/15 bg-black/70 text-white/90 hover:bg-black/85",
          )}
          aria-pressed={measureActive}
          aria-label={measureActive ? "Stop measuring distance" : "Measure distance"}
        >
          {measureActive ? "Measuring…" : "Measure"}
        </button>
        <button
          type="button"
          onClick={onFitBounds}
          className="rounded-lg border border-white/15 bg-black/70 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
        >
          Reset view
        </button>
      </div>

      <button
        type="button"
        onClick={copyCoords}
        className="pointer-events-auto rounded-lg border border-white/10 bg-black/70 px-3 py-1.5 font-mono text-xs text-white/90 backdrop-blur-md hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
        title="Copy coordinates"
        aria-label={`Copy coordinates: ${formatCoords(coords)}`}
      >
        {formatCoords(coords)}
      </button>
    </div>
  );
}
