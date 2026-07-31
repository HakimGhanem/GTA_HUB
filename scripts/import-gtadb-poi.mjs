#!/usr/bin/env node
/**
 * Import GTADB landmarks → src/data/gtadb-locations.json
 * Format: { "L1": [igAddress, igCoordinates, igPhotoSize, rlAddress, ...], ... }
 * @see https://github.com/rolux/gtadb.org/blob/main/map/index.js parseLandmark
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = join(root, "data/gtadb/landmarks.json");
const output = join(root, "src/data/gtadb-locations.json");

if (!existsSync(input)) {
  console.log("   No landmarks.json found — skipping POI import");
  process.exit(0);
}

const raw = JSON.parse(readFileSync(input, "utf8"));
const locations = [];

const TAG_CATEGORY = {
  hotel: "landmark",
  building: "landmark",
  landmark: "landmark",
  landscape: "landmark",
  trailer: "mission",
  screenshot: "landmark",
  leak: "secret",
  business: "shop",
  shop: "shop",
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

function parseName(igAddress) {
  if (!igAddress || typeof igAddress !== "string") return "Unknown";
  const parts = igAddress.split(", ");
  return parts.length > 1 ? parts.slice(1).join(", ") : igAddress.replace(/^\?\,\s*/, "");
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

  const name = parseName(igAddress);
  const category = inferCategory(tags);
  const slug = `gtadb-${slugify([groupId, name, Math.round(x), Math.round(y)])}`;

  locations.push({
    slug,
    name,
    description: `${name} — community-mapped location (${groupId}, GTADB).`,
    category,
    x: Math.round(x * 1000) / 1000,
    y: Math.round(y * 1000) / 1000,
    region: groupId,
    source: "gtadb",
  });
}

writeFileSync(output, JSON.stringify(locations, null, 2) + "\n");
console.log(`   Imported ${locations.length} POIs → src/data/gtadb-locations.json`);
