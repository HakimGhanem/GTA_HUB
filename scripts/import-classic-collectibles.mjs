#!/usr/bin/env node
/**
 * Import classic-era collectibles from GTAMods Wiki script coords
 * (documented main.scm pickup positions — attribute GTAMods / Rockstar game data).
 *
 * Sources: https://gtamods.com/wiki/Collectibles
 * - VC: 100 hidden packages
 * - SA: 50 horseshoes, 50 oysters, 50 snapshots
 *
 * Usage: node scripts/import-classic-collectibles.mjs
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cacheWiki = join(root, ".cache/gtamods-collectibles.wiki");

const VC_PACKAGES = [
  [479.6, -1718.5], [708.4, -498.2], [-213.0, -1647.1], [-368.4, -1733.2], [-104.3, -1600.3],
  [-234.7, -1082.6], [88.0, -991.7], [205.4, -888.9], [183.1, -652.9], [370.9, -469.5],
  [298.8, -278.5], [321.8, -774.3], [491.8, -45.3], [472.8, 116.0], [379.6, 212.9],
  [290.1, 295.4], [470.9, 1123.6], [407.6, 1018.2], [561.6, 1157.1], [891.8, 873.8],
  [353.7, -564.3], [306.9, 1177.5], [271.3, 932.9], [328.7, 717.2], [473.3, 16.4],
  [352.5, 282.2], [70.1, -479.6], [53.6, -446.5], [266.3, -249.9], [413.9, 1217.4],
  [-172.4, -1341.3], [-233.1, -931.2], [69.7, -796.6], [107.5, -551.9], [233.9, -132.2],
  [424.5, 89.3], [401.6, 431.1], [193.9, 678.8], [589.4, 36.0], [519.9, -135.4],
  [-41.8, 922.4], [-16.1, 991.7], [60.7, 916.5], [-68.9, 1124.0], [82.7, 1113.8],
  [70.5, 599.3], [162.4, 246.4], [43.1, -150.9], [-46.6, 257.7], [43.4, -15.0],
  [-236.9, -588.1], [-519.0, -599.3], [-580.5, -422.6], [-310.4, -415.5], [-245.4, -323.8],
  [-246.9, 1219.5], [-451.0, 1286.6], [-764.3, 1266.0], [-1550.1, 1403.1], [-790.8, 1119.4],
  [-451.5, 1119.7], [-567.4, 776.1], [-898.7, 430.4], [-979.2, 266.7], [-856.3, 228.5],
  [-1072.5, 351.7], [-1161.6, 431.1], [-975.1, 191.9], [-1033.4, 44.0], [-994.0, -250.3],
  [-1104.9, -120.9], [-1131.6, -355.4], [-1195.2, -317.7], [-1093.7, -600.1], [-1179.9, -576.3],
  [-1018.2, -874.1], [-855.3, -631.8], [-1179.2, -718.8], [-802.9, -1184.6], [-620.8, -1342.4],
  [-1024.6, -1494.6], [-1090.2, -1199.2], [-829.2, -1461.0], [-1160.6, -1333.8], [-1369.3, -1255.7],
  [-1280.9, -1146.5], [-1773.8, -1053.2], [-1187.3, -1041.4], [-1477.3, -881.0], [-1561.8, -1059.5],
  [-1349.1, -1090.4], [-1567.3, -1055.5], [-1366.4, -928.0], [-1523.5, -819.1], [-1829.1, -887.6],
  [-1726.5, -419.2], [-1737.2, -299.2], [-1328.0, -537.1], [-1063.5, -965.5], [-1265.8, -1346.9],
];

const SA_HORSESHOES = [
  [1224, 2617], [2323, 1284], [2035, 2305], [2491, 2263], [1433, 2796],
  [2071, 712], [2239, 1839], [2583, 2387], [2864, 857], [2612, 2200],
  [2274, 1507], [2184, 2529], [1863, 2314], [2054, 2434], [1603, 1435],
  [1362.92, 1015.24], [2058.7, 2159.1], [2003, 1672], [2238, 1135], [1934.06, 988.79],
  [1768, 2847], [1084, 1076], [2879, 2522], [2371, 2009], [1521, 1690],
  [2417, 1281], [1376, 2304], [1393, 1832], [984, 2563], [1767, 601],
  [2108, 1003], [2705.98, 1862.52], [2493, 922], [1881, 2846], [2020, 2352],
  [1680.3, 2226.86], [1462, 936], [2125.5, 789.23], [2588, 1902], [919, 2070],
  [2173, 2465], [2031.25, 2207.33], [2509, 1144], [2215, 1968], [2626, 2841],
  [2440.08, 2161.07], [1582, 2401], [2077, 1912], [970, 1787], [1526.22, 751],
];

const SA_OYSTERS = [
  [979, -2210], [2750, -2584], [1279, -806], [2945.13, -2051.93], [67, -1018],
  [2327, -2662], [2621, -2506], [1249, -2687], [725, -1849], [723, -1586],
  [155, -1975], [1968, -1203], [-2657, 1564], [-1252, 501], [-1625, 4],
  [-1484, 1489], [-2505.406, 1543.724], [-2727, -469], [-1266, 966], [-1013, 478],
  [-1364, 390], [2578, 2382], [2090, 1898], [2130, 1152], [2013, 1670],
  [2531, 1569], [2998, 2998], [-832, 925], [486, -253], [-90, -910],
  [26.43, -1320.94], [-207, -1682], [-1672, -1641], [-1175, -2639], [-1097, -2858],
  [-2889, -1042], [-659, 874], [-955, 2628], [-1066, 2197], [40, -531],
  [-765, 247], [2098, -108], [2767, 470], [-783, 2116], [-821, 1374],
  [-2110.5, 2329.72], [-1538, 1708], [-2685, 2153], [796, 2939], [2179, 235],
];

const SA_SNAPSHOTS = [
  [-2511.28, -672.99], [-2723.63, -314.72], [-1737.71, -579.55], [-1486.08, 920.04],
  [-1269.82, 963.63], [-1650.01, 422.0], [-1851.72, -96.73], [-2732.0, -244.0],
  [-2802.75, 375.47], [-2773.04, 783.45], [-2680.07, 1590.8], [-2476.75, 1543.44],
  [-1879.04, 1456.52], [-1561.55, 655.19], [-1325.15, 494.19], [-1941.41, 137.72],
  [-2153.23, 462.25], [-2243.96, 577.76], [-2051.0, 456.0], [-1951.0, 659.0],
  [-2064.0, 926.0], [-2357.33, 1017.01], [-2072.0, 1066.0], [-1744.0, 972.46],
  [-1941.0, 883.0], [-1839.51, 1086.88], [-1704.8, 1338.0], [-2346.62, 536.85],
  [-2443.0, 755.0], [-2765.0, 375.0], [-2880.31, -935.83], [-2083.0, -808.0],
  [-1954.0, -760.0], [-964.53, -331.59], [-1689.0, 51.0], [-2080.0, 256.05],
  [-2413.0, 331.0], [-2244.42, 731.32], [-2462.0, 369.0], [-1124.44, -153.15],
  [-1275.78, 53.68], [-2430.0, 38.0], [-2591.0, 162.0], [-2591.0, -16.0],
  [-2648.0, -5.0], [-2593.0, 56.0], [-1619.31, 1341.39], [-2307.0, 207.0],
  [-2343.0, -79.0], [-1906.66, 518.58],
];

function slugify(parts) {
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function makeList(coords, { prefix, name, subtype, region, description }) {
  return coords.map(([x, y], i) => {
    const n = i + 1;
    return {
      slug: slugify([prefix, n, Math.round(x), Math.round(y)]),
      name: `${name} #${n}`,
      description,
      category: "collectible",
      subtype,
      x: Number(Number(x).toFixed(3)),
      y: Number(Number(y).toFixed(3)),
      region,
      source: "gtamods-main.scm",
      confidence: "community",
    };
  });
}

const vcExtra = makeList(VC_PACKAGES, {
  prefix: "vc-pkg",
  name: "Hidden Package",
  subtype: "hidden-package",
  region: "Vice City",
  description:
    "Hidden Package from Vice City main.scm coords (documented on GTAMods Wiki Collectibles).",
});

const saExtra = [
  ...makeList(SA_HORSESHOES, {
    prefix: "sa-horseshoe",
    name: "Horseshoe",
    subtype: "horseshoe",
    region: "Las Venturas",
    description:
      "Horseshoe collectible — SA main.scm coords via GTAMods Wiki. All 50 in/near Las Venturas.",
  }),
  ...makeList(SA_OYSTERS, {
    prefix: "sa-oyster",
    name: "Oyster",
    subtype: "oyster",
    region: "San Andreas",
    description:
      "Underwater oyster — SA main.scm coords via GTAMods Wiki.",
  }),
  ...makeList(SA_SNAPSHOTS, {
    prefix: "sa-snapshot",
    name: "Snapshot",
    subtype: "snapshot",
    region: "San Fierro",
    description:
      "Tourist snapshot point — SA main.scm coords via GTAMods Wiki (mostly San Fierro).",
  }),
];

function mergeInto(path, extras, keep) {
  let existing = [];
  if (existsSync(path)) {
    existing = JSON.parse(readFileSync(path, "utf8"));
  }
  const filtered = existing.filter((l) => keep(l));
  const slugs = new Set(filtered.map((l) => l.slug));
  const merged = [...filtered];
  for (const loc of extras) {
    if (!slugs.has(loc.slug)) {
      merged.push(loc);
      slugs.add(loc.slug);
    }
  }
  writeFileSync(path, JSON.stringify(merged, null, 2) + "\n");
  return merged.length;
}

mkdirSync(dirname(cacheWiki), { recursive: true });

const vcPath = join(root, "src/data/vc-collectibles.json");
const saPath = join(root, "src/data/sa-collectibles.json");

const vcCount = mergeInto(
  vcPath,
  vcExtra,
  (l) => l.subtype !== "hidden-package" || !String(l.slug).startsWith("vc-pkg-"),
);

// SA: write dedicated file (locations-sa will merge)
writeFileSync(saPath, JSON.stringify(saExtra, null, 2) + "\n");

console.log(`VC collectibles file → ${vcCount} total (incl. ${vcExtra.length} packages)`);
console.log(`SA collectibles → ${saExtra.length} (horseshoes+oysters+snapshots) → ${saPath}`);
