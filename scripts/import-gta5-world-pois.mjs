#!/usr/bin/env node
/**
 * Import GTA V world object locations from DurtyFree/gta-v-data-dumps
 * (community game data extracts — attribute DurtyFree / Pleb Masters).
 *
 * Writes src/data/gta5-world-pois.json
 *
 * Usage: node scripts/import-gta5-world-pois.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "src/data/gta5-world-pois.json");

const SOURCES = [
  {
    file: "worldAtms.json",
    subtype: "atm",
    category: "shop",
    name: "ATM",
    region: "Los Santos",
    limit: 120,
  },
  {
    file: "worldGasPumps.json",
    subtype: "gas-pump",
    category: "shop",
    name: "Gas Pump",
    region: "San Andreas",
    limit: 100,
  },
  {
    file: "worldTelescopes.json",
    subtype: "lookout",
    category: "landmark",
    name: "Telescope",
    region: "San Andreas",
    limit: 50,
  },
  {
    file: "worldVendingMachines.json",
    subtype: "vending",
    category: "shop",
    name: "Vending Machine",
    region: "San Andreas",
    limit: 80,
  },
  {
    file: "worldPublicPhones.json",
    subtype: "payphone",
    category: "landmark",
    name: "Payphone",
    region: "San Andreas",
    limit: 60,
  },
  {
    file: "worldDartDiscs.json",
    subtype: "dartboard",
    category: "landmark",
    name: "Dartboard",
    region: "San Andreas",
    limit: 40,
  },
  {
    file: "worldJukeboxes.json",
    subtype: "jukebox",
    category: "landmark",
    name: "Jukebox",
    region: "San Andreas",
    limit: 40,
  },
  {
    file: "worldSeats.json",
    subtype: "bench",
    category: "landmark",
    name: "Bench",
    region: "San Andreas",
    limit: 50,
  },
  {
    file: "worldParknmeters.json",
    subtype: "parking-meter",
    category: "landmark",
    name: "Parking Meter",
    region: "Los Santos",
    limit: 40,
  },
];

const BASE =
  "https://raw.githubusercontent.com/DurtyFree/gta-v-data-dumps/master/objectslocations/";

function slugify(parts) {
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json();
}

const locations = [];

for (const src of SOURCES) {
  const url = BASE + src.file;
  console.log(`Fetching ${src.file}…`);
  const rows = await fetchJson(url);
  const slice = rows.slice(0, src.limit);
  let i = 0;
  for (const row of slice) {
    i += 1;
    const x = Number(row.Position?.X);
    const y = Number(row.Position?.Y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    locations.push({
      slug: slugify(["gta5", src.subtype, i, Math.round(x), Math.round(y)]),
      name: `${src.name} #${i}`,
      description: `${src.name} from DurtyFree GTA V object dumps (in-game X/Y).`,
      category: src.category,
      subtype: src.subtype,
      x: Number(x.toFixed(3)),
      y: Number(y.toFixed(3)),
      region: src.region,
      source: "durtyfree",
      confidence: "community",
    });
  }
  console.log(`  +${slice.length} ${src.subtype}`);
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(locations, null, 2) + "\n");
console.log(`Wrote ${locations.length} POIs → ${out}`);
