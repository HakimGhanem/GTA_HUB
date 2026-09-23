"use client";

import { useId, useState } from "react";
import {
  exportProgress,
  importProgress,
} from "@/hooks/useMapProgress";

const GAME_IDS = ["gta6", "gta5", "vc", "sa"] as const;
type GameId = (typeof GAME_IDS)[number];

const GAME_LABELS: Record<GameId, string> = {
  gta6: "GTA 6",
  gta5: "GTA 5",
  vc: "Vice City",
  sa: "San Andreas",
};

function parseGameId(value: string): GameId {
  return (GAME_IDS as readonly string[]).includes(value)
    ? (value as GameId)
    : "gta5";
}

type ProgressBackupProps = {
  defaultGame?: GameId;
  className?: string;
};

export function ProgressBackup({
  defaultGame = "gta5",
  className,
}: ProgressBackupProps) {
  const inputId = useId();
  const [gameId, setGameId] = useState<GameId>(defaultGame);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function downloadBackup() {
    const json = exportProgress(gameId as "gta6" | "gta5" | "vc" | "sa");
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `map6-progress-${gameId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setError(null);
    setMessage(`Exported ${gameId} found pins.`);
  }

  function onFile(file: File | undefined) {
    if (!file) return;
    void file.text().then((text) => {
      try {
        importProgress(gameId as "gta6" | "gta5" | "vc" | "sa", text);
        setError(null);
        setMessage(`Imported into ${gameId}. Reload the map to see marks.`);
      } catch (e) {
        setMessage(null);
        setError(e instanceof Error ? e.message : "Import failed");
      }
    });
  }

  return (
    <div
      className={
        className ??
        "rounded-xl border border-foreground/10 bg-foreground/5 p-5 text-sm text-foreground/70"
      }
    >
      <p className="font-semibold text-foreground">Local progress backup</p>
      <p className="mt-1 text-xs text-foreground/50">
        Same <code className="text-foreground/70">map6-progress:</code> keys as the
        live map. Unlimited local marks — no account, no server.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="text-xs text-foreground/50" htmlFor={inputId}>
          Game
        </label>
        <select
          id={inputId}
          value={gameId}
          onChange={(e) => setGameId(parseGameId(e.target.value))}
          className="rounded-md border border-foreground/15 bg-surface px-2 py-1 text-foreground"
        >
          {GAME_IDS.map((id) => (
            <option key={id} value={id}>
              {GAME_LABELS[id]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={downloadBackup}
          className="rounded-full bg-pink-500 px-4 py-1.5 text-xs font-semibold text-accent-foreground hover:bg-pink-400"
        >
          Export JSON
        </button>
        <label className="cursor-pointer rounded-full border border-foreground/20 px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-foreground/10">
          Import JSON
          <input
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
      </div>
      {message ? <p className="mt-3 text-xs text-emerald-300">{message}</p> : null}
      {error ? <p className="mt-3 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
