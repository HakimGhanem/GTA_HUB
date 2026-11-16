#!/usr/bin/env node
/**
 * Pull the latest GTADB landmarks (CC BY 4.0) and re-run the POI import, which
 * diffs against the previous import and appends to the public changelog.
 *
 * Tiles are not touched — `npm run tiles:fetch-gtadb` handles those.
 */

import { execFileSync } from "child_process";
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(root, "data/gtadb/landmarks.json");
const UPSTREAM =
  "https://raw.githubusercontent.com/rolux/gtadb.org/main/map/data/6/landmarks.json";

const res = await fetch(UPSTREAM);
if (!res.ok) {
  console.error(`   GTADB fetch failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const body = await res.text();
const count = Object.keys(JSON.parse(body)).length;

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, body);
console.log(`   ${count} upstream landmarks → data/gtadb/landmarks.json`);

execFileSync(process.execPath, [join(root, "scripts/import-gtadb-poi.mjs")], {
  stdio: "inherit",
});
