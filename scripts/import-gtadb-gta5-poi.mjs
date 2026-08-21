#!/usr/bin/env node
/**
 * Import GTADB GTA V landmarks → src/data/gtadb-gta5-locations.json
 * Format: { "L1": [igAddress, igCoordinates, ...], ... }
 * Coords are in-game (FiveM) X/Y — same space as locations-gta5.ts seeds.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = process.argv[2]
  ? join(root, process.argv[2])
  : join(root, "data/gtadb-gta5/landmarks.json");
const output = join(root, "src/data/gtadb-gta5-locations.json");

if (!existsSync(input)) {
  console.log("   No GTA 5 landmarks.json found — skipping POI import");
  process.exit(0);
}

const raw = JSON.parse(readFileSync(input, "utf8"));
const locations = [];

const TAG_CATEGORY = {
  hotel: "landmark",
  building: "landmark",
  landmark: "landmark",
  landscape: "landmark",
  natural: "landmark",
  residential: "landmark",
  office: "landmark",
  government: "landmark",
  public: "landmark",
  industrial: "landmark",
  transportation: "landmark",
  entertainment: "landmark",
  trailer: "mission",
  screenshot: "landmark",
  leak: "secret",
  business: "shop",
  shop: "shop",
  retail: "shop",
  restaurant: "shop",
  collectible: "collectible",
};

function slugify(parts) {
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseAddress(igAddress) {
  if (!igAddress || typeof igAddress !== "string") {
    return { name: "Unknown", region: "Los Santos" };
  }
  const parts = igAddress.split(", ").map((p) => p.trim()).filter(Boolean);
  if (parts.length === 1) return { name: parts[0], region: parts[0] };
  return { name: parts.slice(0, -1).join(", "), region: parts[parts.length - 1] };
}

function inferCategory(tags) {
  if (!Array.isArray(tags)) return "landmark";
  for (const tag of tags) {
    const key = String(tag).toLowerCase();
    if (TAG_CATEGORY[key]) return TAG_CATEGORY[key];
  }
  return "landmark";
}

for (const [groupId, item] of Object.entries(raw)) {
  if (!Array.isArray(item) || item.length < 2) continue;

  const igAddress = item[0];
  const igCoordinates = item[1];
  const tags = item[6] ?? [];

  if (!Array.isArray(igCoordinates) || igCoordinates.length < 2) continue;

  const [x, y] = igCoordinates;
  if (typeof x !== "number" || typeof y !== "number") continue;

  const { name, region } = parseAddress(igAddress);
  const category = inferCategory(tags);
  const slug = `gtadb-${slugify([groupId, name, Math.round(x), Math.round(y)])}`;

  locations.push({
    slug,
    name,
    description: `${name} — community-mapped GTA V location (${groupId}, GTADB).`,
    category,
    x: Math.round(x * 1000) / 1000,
    y: Math.round(y * 1000) / 1000,
    region,
    source: "gtadb",
  });
}

writeFileSync(output, JSON.stringify(locations, null, 2) + "\n");
console.log(`   Imported ${locations.length} GTA V POIs → src/data/gtadb-gta5-locations.json`);
