"use client";

import clsx from "clsx";
import { formatCoords, type GameCoords } from "@/lib/coordinates";
import { listGames, type GameId } from "@/lib/games";
import type { MapTheme } from "@/lib/map-links";

type MapToolbarProps = {
  coords: GameCoords;
  gameId: GameId;
  theme: MapTheme;
  showSidebarToggle?: boolean;
  sidebarOpen: boolean;
  measureActive: boolean;
  shareHint?: string;
  onToggleSidebar: () => void;
  onToggleMeasure: () => void;
  onFitBounds: () => void;
  onShare: () => void;
  onCopyOverlay: () => void;
  onThemeChange: (theme: MapTheme) => void;
  onSelectGame: (game: GameId) => void;
};

const THEMES: { id: MapTheme; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "streamer", label: "Streamer" },
  { id: "neon", label: "Neon" },
];

export function MapToolbar({
  coords,
  gameId,
  theme,
  showSidebarToggle = false,
  sidebarOpen,
  measureActive,
  shareHint,
  onToggleSidebar,
  onToggleMeasure,
  onFitBounds,
  onShare,
  onCopyOverlay,
  onThemeChange,
  onSelectGame,
}: MapToolbarProps) {
  const games = listGames();

  async function copyCoords() {
    try {
      await navigator.clipboard.writeText(formatCoords(coords));
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="pointer-events-none absolute right-3 top-3 z-20 flex flex-col items-end gap-2 sm:right-4 sm:top-4">
      <div
        className="pointer-events-auto flex items-center gap-0.5 rounded-lg border border-white/10 bg-black/55 p-0.5 backdrop-blur-md"
        role="group"
        aria-label="Game map"
      >
        {games.map((g) => {
          const active = g.id === gameId;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onSelectGame(g.id)}
              title={g.label}
              className={clsx(
                "rounded-md px-2 py-1 text-[10px] font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/50",
                active
                  ? g.primary
                    ? "bg-pink-500/25 text-pink-100"
                    : "bg-white/12 text-white"
                  : "text-white/45 hover:text-white/75",
              )}
              aria-pressed={active}
            >
              {g.shortLabel}
            </button>
          );
        })}
      </div>

      <div
        className="pointer-events-auto flex items-center gap-0.5 rounded-lg border border-white/10 bg-black/55 p-0.5 backdrop-blur-md"
        role="group"
        aria-label="Map theme"
      >
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onThemeChange(t.id)}
            className={clsx(
              "rounded-md px-2 py-1 text-[10px] font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/50",
              theme === t.id
                ? "bg-pink-500/25 text-pink-100"
                : "text-white/45 hover:text-white/75",
            )}
            aria-pressed={theme === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>

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
          onClick={onShare}
          className="rounded-lg border border-white/15 bg-black/70 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
          aria-label="Copy share link"
          title={shareHint ?? "Copy map link"}
        >
          Share
        </button>
        <button
          type="button"
          onClick={onCopyOverlay}
          className="rounded-lg border border-white/15 bg-black/70 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
          aria-label="Copy OBS overlay URL"
          title="Copy OBS / Kick browser source URL"
        >
          Overlay
        </button>
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

      {shareHint && (
        <p className="pointer-events-none max-w-[14rem] truncate rounded-md border border-pink-400/30 bg-pink-500/20 px-2 py-1 text-[10px] text-pink-100">
          {shareHint}
        </p>
      )}

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
