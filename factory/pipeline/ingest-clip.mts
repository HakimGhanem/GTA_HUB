#!/usr/bin/env npx tsx
/**
 * Add your own gameplay (or a licensed bed) to the asset bank.
 *
 *   npm run factory:ingest -- --file ./chase.mp4 --tags gta5,chase,ls
 *   npm run factory:ingest -- --file ./bed.mp3 --kind audio --licence licensed-music --tags night
 */
import { spawnSync } from "child_process";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import type { AssetKind, AssetLicence, MediaAsset } from "../src/schema/asset.ts";
import {
  argValue,
  ensureDirs,
  loadManifest,
  paths,
  saveManifest,
  slugify,
} from "./_shared.mts";

function probeDuration(file: string): number | undefined {
  const result = spawnSync(
    "ffprobe",
    ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file],
    { encoding: "utf8" },
  );
  if (result.status !== 0) return undefined;
  const n = Number(result.stdout.trim());
  return Number.isFinite(n) ? n : undefined;
}

function main() {
  const file = argValue("--file");
  if (!file) throw new Error("Usage: factory:ingest -- --file <path> --tags gta5,chase");
  if (!existsSync(file)) throw new Error(`File not found: ${file}`);

  const kind = (argValue("--kind") ?? (file.endsWith(".mp3") ? "audio" : "clip")) as AssetKind;
  const licence = (argValue("--licence") ?? (kind === "audio" ? "licensed-music" : "own")) as AssetLicence;
  if (kind === "audio" && licence !== "licensed-music") {
    throw new Error("Audio must be --licence licensed-music (no radio GTA, no trending hits).");
  }
  if (kind === "clip" && licence !== "own" && licence !== "rockstar-trailer") {
    throw new Error("Clips must be your capture (--licence own) or an official trailer.");
  }

  ensureDirs();
  const id = argValue("--id") ?? slugify(path.parse(file).name);
  const destRel = `${kind === "audio" ? "audio" : "clips"}/${id}${path.extname(file)}`;
  const dest = path.join(paths.assets, destRel);
  mkdirSync(path.dirname(dest), { recursive: true });
  copyFileSync(file, dest);

  const asset: MediaAsset = {
    id,
    kind,
    path: destRel,
    durationSec: probeDuration(dest),
    tags: (argValue("--tags") ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    licence,
    notes: argValue("--notes"),
  };

  const manifest = loadManifest();
  const bucket = kind === "audio" ? "audio" : "clips";
  manifest[bucket] = manifest[bucket].filter((a) => a.id !== id);
  manifest[bucket].push(asset);
  saveManifest(manifest);

  console.log(`Ingested ${id} → ${destRel} (${licence})`);
  if (kind === "clip") {
    console.log(`Next: npm run factory:brief -- --template gameplay --prompt "${asset.tags.join(" ") || id}"`);
  }
}

main();
