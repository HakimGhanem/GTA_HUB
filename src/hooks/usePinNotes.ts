"use client";

import { useCallback, useEffect, useState } from "react";
import type { GameId } from "@/lib/games";

export const NOTES_PREFIX = "map6-notes:";
export const PIN_NOTE_MAX = 280;

type NotesMap = Record<string, string>;

function readNotes(gameId: GameId): NotesMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(`${NOTES_PREFIX}${gameId}`);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    const out: NotesMap = {};
    for (const [slug, value] of Object.entries(parsed)) {
      if (typeof value === "string" && value.trim()) {
        out[slug] = value.slice(0, PIN_NOTE_MAX);
      }
    }
    return out;
  } catch {
    return {};
  }
}

function writeNotes(gameId: GameId, notes: NotesMap) {
  try {
    localStorage.setItem(`${NOTES_PREFIX}${gameId}`, JSON.stringify(notes));
  } catch {
    /* quota / private mode */
  }
}

/** Local pin notes — MapGenie parity, no account, no cap. */
export function usePinNote(gameId: GameId, slug: string) {
  const [note, setNoteState] = useState("");

  useEffect(() => {
    setNoteState(readNotes(gameId)[slug] ?? "");
  }, [gameId, slug]);

  const setNote = useCallback(
    (value: string) => {
      const next = value.slice(0, PIN_NOTE_MAX);
      setNoteState(next);
      const all = readNotes(gameId);
      const trimmed = next.trim();
      if (trimmed) all[slug] = trimmed;
      else delete all[slug];
      writeNotes(gameId, all);
    },
    [gameId, slug],
  );

  return { note, setNote, maxLength: PIN_NOTE_MAX };
}
