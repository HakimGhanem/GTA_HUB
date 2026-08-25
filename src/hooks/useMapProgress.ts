"use client";

import { useCallback, useEffect, useState } from "react";
import type { GameId } from "@/lib/games";
import { trackEvent } from "@/lib/analytics/track";

export const STORAGE_PREFIX = "map6-progress:";

export type MapProgressBackup = {
  v: 1;
  app: "map-6";
  gameId: GameId;
  exportedAt: string;
  found: string[];
};

export type MapProgress = {
  found: Set<string>;
  foundCount: number;
  isFound: (slug: string) => boolean;
  toggleFound: (slug: string) => void;
  markFound: (slug: string, found?: boolean) => void;
  clearAll: () => void;
};

function readSlugs(gameId: GameId): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${gameId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s): s is string => typeof s === "string");
  } catch {
    return [];
  }
}

function writeSlugs(gameId: GameId, slugs: string[]) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${gameId}`, JSON.stringify(slugs));
  } catch {
    /* quota / private mode */
  }
}

function parseFoundSlugs(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((s): s is string => typeof s === "string" && s.length > 0);
  }
  if (raw && typeof raw === "object") {
    const rec = raw as Record<string, unknown>;
    const list = rec.found ?? rec.slugs;
    if (Array.isArray(list)) {
      return list.filter((s): s is string => typeof s === "string" && s.length > 0);
    }
  }
  return [];
}

/** JSON backup for one game’s unlimited local found set. */
export function exportProgress(gameId: GameId): string {
  const payload: MapProgressBackup = {
    v: 1,
    app: "map-6",
    gameId,
    exportedAt: new Date().toISOString(),
    found: readSlugs(gameId),
  };
  return JSON.stringify(payload, null, 2);
}

/** Restore a backup into `map6-progress:{gameId}` (replaces that game’s set). */
export function importProgress(gameId: GameId, json: string): void {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch {
    throw new Error("Invalid progress JSON");
  }
  if (Array.isArray(parsed)) {
    writeSlugs(gameId, [...new Set(parseFoundSlugs(parsed))]);
    return;
  }
  if (parsed && typeof parsed === "object") {
    if (!("found" in parsed) && !("slugs" in parsed)) {
      throw new Error("Progress JSON has no found list");
    }
    writeSlugs(gameId, [...new Set(parseFoundSlugs(parsed))]);
    return;
  }
  throw new Error("Invalid progress JSON");
}

/** Per-game “found” checklist — unlimited local (MapGenie free cap is 100). */
export function useMapProgress(gameId: GameId): MapProgress {
  const [found, setFound] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setFound(new Set(readSlugs(gameId)));
  }, [gameId]);

  const persist = useCallback(
    (next: Set<string>) => {
      setFound(next);
      writeSlugs(gameId, [...next]);
    },
    [gameId],
  );

  const markFound = useCallback(
    (slug: string, value = true) => {
      const next = new Set(found);
      if (value) next.add(slug);
      else next.delete(slug);
      persist(next);
      trackEvent(value ? "map_mark_found" : "map_unmark_found", {
        game_id: gameId,
        location_slug: slug,
      });
    },
    [found, gameId, persist],
  );

  const toggleFound = useCallback(
    (slug: string) => {
      markFound(slug, !found.has(slug));
    },
    [found, markFound],
  );

  const clearAll = useCallback(() => {
    persist(new Set());
  }, [persist]);

  const isFound = useCallback((slug: string) => found.has(slug), [found]);

  return {
    found,
    foundCount: found.size,
    isFound,
    toggleFound,
    markFound,
    clearAll,
  };
}
