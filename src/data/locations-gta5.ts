import gtadbGta5Json from "./gtadb-gta5-locations.json";
import gta5WorldPoisJson from "./gta5-world-pois.json";
import type { Location } from "./locations";

const editorial: Location[] = [
  {
    slug: "gta5-maze-bank",
    name: "Maze Bank Tower",
    description:
      "Downtown Los Santos landmark — the tallest tower on the skyline and a classic freeroam meet point.",
    category: "landmark",
    x: -75,
    y: -818,
    region: "Downtown LS",
    source: "seed",
  },
  {
    slug: "gta5-vinewood-sign",
    name: "Vinewood Sign",
    description:
      "Iconic hillside letters overlooking Vinewood. High traffic for photos, races, and streamer meetups.",
    category: "landmark",
    x: 725,
    y: 1195,
    region: "Vinewood Hills",
    source: "seed",
  },
  {
    slug: "gta5-mount-chiliad",
    name: "Mount Chiliad",
    description:
      "Highest peak in Blaine County — cable car, parachute runs, and mystery lore routes.",
    category: "landmark",
    x: 450,
    y: 5566,
    region: "Blaine County",
    source: "seed",
  },
  {
    slug: "gta5-fort-zancudo",
    name: "Fort Zancudo",
    description:
      "Military base on the west coast. High-risk airfield runs and classic heist routing.",
    category: "secret",
    x: -2360,
    y: 3245,
    region: "Zancudo",
    source: "seed",
  },
  {
    slug: "gta5-del-perro-pier",
    name: "Del Perro Pier",
    description:
      "Beach pier with the Ferris wheel — nightlife, races, and sunset content clips.",
    category: "landmark",
    x: -1850,
    y: -1230,
    region: "Del Perro",
    source: "seed",
  },
  {
    slug: "gta5-los-santos-customs",
    name: "Los Santos Customs (Burton)",
    description:
      "Central LS Customs bay — vehicle upgrades and a natural affiliate hook for racing wheels / headsets.",
    category: "shop",
    x: -362,
    y: -132,
    region: "Burton",
    source: "seed",
  },
  {
    slug: "gta5-lester-house",
    name: "Lester's House",
    description:
      "El Burro Heights hideout tied to heist planning — strong clip / mission-intent content angle.",
    category: "mission",
    x: 1274,
    y: -1710,
    region: "El Burro Heights",
    source: "seed",
  },
];

const gtadb = gtadbGta5Json as Location[];
const worldPois = gta5WorldPoisJson as Location[];

/** Editorial → world POIs (DurtyFree) → GTADB landmarks (CC BY 4.0). */
export const GTA5_LOCATIONS: Location[] = (() => {
  const slugs = new Set<string>();
  const merged: Location[] = [];
  for (const loc of [...editorial, ...worldPois, ...gtadb]) {
    if (slugs.has(loc.slug)) continue;
    slugs.add(loc.slug);
    merged.push(loc);
  }
  return merged;
})();
