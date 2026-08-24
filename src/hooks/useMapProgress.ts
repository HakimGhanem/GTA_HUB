"use client";

import { useCallback, useEffect, useState } from "react";
import type { GameId } from "@/lib/games";

const STORAGE_PREFIX = "map6-progress:";

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
    },
    [found, persist],
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
