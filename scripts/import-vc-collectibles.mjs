#!/usr/bin/env node
/**
 * Import GTA Vice City stunt jumps + robbery stores from kong78/collectibles-on-radar-gta-vc
 * (Apache-2.0). Hidden packages / rampages require live game memory — not included.
 *
 * Writes src/data/vc-collectibles.json
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "src/data/vc-collectibles.json");

/** From Util.cpp DEFAULT_USJ_LOCATIONS (Apache-2.0, kong78) — Z adjusted in source; we use X/Y */
const USJ = [
  [-1487.781, -1044.546],
  [-1352.695, -755.212],
  [-1216.49, -911.833],
  [-1252.139, -1054.685],
  [-1551.685, -1075.674],
  [-1595.712, -1272.881],
  [-1553.337, -1230.952],
  [-1340.022, -998.257],
  [24.721, 897.801],
  [317.2051, -223.2012],
  [-674.345, 1162.422],
  [-529.84, 830.062],
  [-839.022, 1153.526],
  [-312.447, 1109.196],
  [-1011.583, -30.098],
  [-942.702, -114.506],
  [-900.789, 260.804],
  [-1041.895, -569.323],
  [208.993, -963.672],
  [46.115, -964.415],
  [435.8542, -334.3212],
  [110.481, -1230.6],
  [7.435, -1245.895],
  [9.103, -1326.505],
  [-321.028, -1379.498],
  [-321.028, -1276.589],
  [218.05, -1152.0],
  [259.056, -945.833],
  [444.5, -118.4],
  [284.4732, -494.1143],
  [370.79, -709.863],
  [461.589, -522.23],
  [454.105, -504.736],
  [460.91, -383.362],
  [259.041, -480.608],
  [-346.818, -290.741],
];

const STORES = [
  [-858.8, -632.66, "Deli", "Havana"],
  [-854.3, 850.0, "Jewellers", "Downtown"],
  [-830.4, 741.9, "Chemist", "Downtown"],
  [-846.6, -72.6, "Chemist", "Haiti"],
  [379.9, 210.2, "Jewellers", "Vice Point"],
  [383.2, 759.7, "Chemist", "Vice Point"],
  [450.0, 782.5, "7-11", "Vice Point"],
  [352.7, 1111.3, "Music store", "Mall"],
  [423.5, 1039.4, "Gash", "Mall"],
  [468.7, 1206.6, "Jewellers", "Mall"],
  [-1167.1, -615.8, "Cuban Cafe", "Havana"],
  [-1192.2, -323.7, "Laundrette", "Havana"],
  [202.4, -471.1, "Hardware", "Washington Beach"],
  [364.5, 1074.3, "Hardware", "Mall"],
  [-963.8, -692.3, "Hardware", "Little Havana"],
];

function slugify(parts) {
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

const locations = [];

USJ.forEach(([x, y], i) => {
  const n = i + 1;
  locations.push({
    slug: slugify(["vc-usj", n, Math.round(x), Math.round(y)]),
    name: `Unique Stunt Jump #${n}`,
    description:
      "Unique Stunt Jump from VC USJ.SC coords (kong78/collectibles-on-radar-gta-vc, Apache-2.0).",
    category: "collectible",
    subtype: "stunt-jump",
    x: Number(x.toFixed(3)),
    y: Number(y.toFixed(3)),
    region: "Vice City",
    source: "kong78",
    confidence: "community",
  });
});

STORES.forEach(([x, y, name, region], i) => {
  const n = i + 1;
  locations.push({
    slug: slugify(["vc-store", n, name]),
    name: `${name} (robbery)`,
    description: `Robbery store pin from ROBBING.SC / AMMU.SC coords (kong78, Apache-2.0).`,
    category: "shop",
    subtype: "store",
    x: Number(x.toFixed(3)),
    y: Number(y.toFixed(3)),
    region,
    source: "kong78",
    confidence: "community",
  });
});

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(locations, null, 2) + "\n");
console.log(`Wrote ${locations.length} VC POIs → ${out}`);
