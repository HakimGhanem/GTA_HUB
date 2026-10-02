#!/usr/bin/env node
/**
 * Import GTADB landmarks → src/data/gtadb-locations.json
 *
 * Upstream shape: { "L1": [igAddress, igCoords, igPhotoSize, rlAddress, rlCoords, ...], ... }
 * @see https://github.com/rolux/gtadb.org/blob/main/map/index.js parseLandmark
 *
 * The upstream value of this set is the real-world correspondence: each in-game
 * spot is matched to the South Florida building it was modelled on, with tags and
 * upstream reliability flags. Keep all of it — an earlier version of this script
 * kept only the in-game locality, which collapsed 1,000+ distinct places into 31
 * repeated names.
 *
 * Rockstar has not named these buildings in-game. The real-world name is recorded
 * as a counterpart, never asserted as the in-game name.
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

/** Upstream tag → Map-6 subtype. Tags absent here are metadata, not a nature. */
const SUBTYPE_BY_TAG = {
  hotel: "hotel",
  residential: "residential",
  transportation: "transport",
  retail: "retail",
  restaurant: "restaurant",
  office: "office",
  industrial: "industrial",
  infrastructure: "infrastructure",
  government: "government",
  public: "public",
  leisure: "leisure",
  events: "venue",
  natural: "natural",
  agriculture: "agriculture",
  construction: "construction",
  safehouse: "safehouse",
  landmark: "monument",
};

/** Subtypes that read as a business rather than a place. */
const COMMERCIAL_SUBTYPES = new Set(["hotel", "retail", "restaurant", "office"]);

/** Upstream flags saying the match itself is not settled. */
const UNCERTAIN_TAGS = new Set([
  "unconfirmed",
  "uncomfirmed",
  "may-not-exist",
  "address-ambiguous",
  "make-more-specific-later",
]);

/** Real-world status worth stating, since the model may no longer stand. */
const STATUS_TAGS = {
  demolished: "The real-world building has since been demolished.",
  reused: "The real-world building has since been repurposed.",
  construction: "The real-world site was under construction when mapped.",
};

const SUBTYPE_PHRASE = {
  hotel: "Hotel",
  residential: "Residential building",
  transport: "Transport infrastructure",
  retail: "Retail premises",
  restaurant: "Restaurant",
  office: "Office building",
  industrial: "Industrial site",
  infrastructure: "Public infrastructure",
  government: "Government building",
  public: "Public building",
  leisure: "Leisure venue",
  venue: "Event venue",
  natural: "Natural feature",
  agriculture: "Agricultural site",
  construction: "Construction site",
  safehouse: "Residence",
  monument: "Landmark",
};

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

/** In-game locality, e.g. "?, Stockyard, Vice City" → "Stockyard, Vice City". */
function parseRegion(igAddress) {
  if (typeof igAddress !== "string" || !igAddress.trim()) return "Leonida";
  const parts = igAddress.split(", ");
  return parts.length > 1 ? parts.slice(1).join(", ") : igAddress.replace(/^\?,?\s*/, "");
}

/** "Name, 123 Foo Ave, Miami, FL 33137, USA" → name + display address. */
function parseRealWorld(rlAddress) {
  if (typeof rlAddress !== "string" || !rlAddress.trim()) return null;
  const address = rlAddress.replace(/,\s*USA\s*$/i, "").trim();
  const name = address.split(",")[0].trim();
  if (!name) return null;
  return { name, address };
}

function pickSubtype(tags) {
  for (const tag of tags) {
    const subtype = SUBTYPE_BY_TAG[tag];
    if (subtype) return subtype;
  }
  return undefined;
}

function buildDescription({ realWorld, region, subtype, tags }) {
  const lead = subtype ? SUBTYPE_PHRASE[subtype] : "Building";
  const sentences = [
    // realWorld.address already opens with realWorld.name — do not repeat it.
    `${lead} in ${region} matched by community mapping to ${realWorld.address}.`,
    "Rockstar has not named this building in-game.",
  ];
  for (const tag of tags) {
    if (STATUS_TAGS[tag]) sentences.push(STATUS_TAGS[tag]);
  }
  if (tags.some((tag) => UNCERTAIN_TAGS.has(tag))) {
    sentences.push("GTADB flags the match as not yet confirmed.");
  }
  return sentences.join(" ");
}

const raw = JSON.parse(readFileSync(input, "utf8"));
const locations = [];
const stats = { identified: 0, survey: 0, skipped: 0 };

for (const [groupId, item] of Object.entries(raw)) {
  if (!Array.isArray(item) || item.length < 2) {
    stats.skipped += 1;
    continue;
  }

  const igCoordinates = item[1];
  if (!Array.isArray(igCoordinates) || igCoordinates.length < 2) {
    stats.skipped += 1;
    continue;
  }
  const [x, y] = igCoordinates;
  if (typeof x !== "number" || typeof y !== "number") {
    stats.skipped += 1;
    continue;
  }

  const region = parseRegion(item[0]);
  const realWorld = parseRealWorld(item[3]);
  const rlCoordinates = Array.isArray(item[4]) ? item[4] : [];
  const tags = (Array.isArray(item[6]) ? item[6] : []).map((tag) =>
    String(tag).toLowerCase(),
  );

  const round = (n) => Math.round(n * 1000) / 1000;

  if (!realWorld) {
    // No identified counterpart: a surveyed position, nothing more. Named so it
    // never reads as a claim about a specific place.
    stats.survey += 1;
    locations.push({
      slug: `gtadb-${groupId.toLowerCase()}-survey-${slugify(region)}`,
      name: `${region} survey point`,
      description: `Position surveyed by the GTADB community in ${region}. The building here has not been identified.`,
      category: "landmark",
      subtype: "survey-point",
      x: round(x),
      y: round(y),
      region,
      source: "gtadb",
      confidence: "seed",
    });
    continue;
  }

  const subtype = pickSubtype(tags);
  stats.identified += 1;
  locations.push({
    slug: `gtadb-${groupId.toLowerCase()}-${slugify(realWorld.name)}`,
    name: realWorld.name,
    description: buildDescription({ realWorld, region, subtype, tags }),
    category: COMMERCIAL_SUBTYPES.has(subtype) ? "shop" : "landmark",
    ...(subtype ? { subtype } : {}),
    x: round(x),
    y: round(y),
    region,
    source: "gtadb",
    confidence: tags.some((tag) => UNCERTAIN_TAGS.has(tag)) ? "rumor" : "community",
    realWorld: {
      name: realWorld.name,
      address: realWorld.address,
      ...(typeof rlCoordinates[0] === "number" && typeof rlCoordinates[1] === "number"
        ? { lat: rlCoordinates[0], lng: rlCoordinates[1] }
        : {}),
    },
  });
}

const slugs = new Set();
for (const location of locations) {
  if (slugs.has(location.slug)) throw new Error(`Duplicate slug: ${location.slug}`);
  slugs.add(location.slug);
}

writeFileSync(output, JSON.stringify(locations, null, 2) + "\n");
console.log(
  `   Imported ${locations.length} GTADB POIs → src/data/gtadb-locations.json\n` +
    `     ${stats.identified} with a real-world counterpart, ${stats.survey} unidentified survey points, ${stats.skipped} skipped`,
);
