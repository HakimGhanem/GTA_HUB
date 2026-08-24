import type { Location } from "@/data/locations";
import type { LocationConfidence } from "@/lib/location-confidence";

export type LocationTranslate = (
  key: string,
  values?: Record<string, string | number>,
) => string;

/** Bulk-import / auto-generated descriptions — hide from players. */
const TECHNICAL_DESC =
  /main\.scm|gtamods|durtyfree|kong78|community-mapped|gtadb|object dumps|apache-2\.0|pleb masters|documented on/i;

const NUMBERED_NAMES: Array<{ re: RegExp; key: string }> = [
  { re: /^Hidden Package #(\d+)$/i, key: "hidden-package" },
  { re: /^Horseshoe #(\d+)$/i, key: "horseshoe" },
  { re: /^Oyster #(\d+)$/i, key: "oyster" },
  { re: /^Snapshot #(\d+)$/i, key: "snapshot" },
  { re: /^Unique Stunt Jump #(\d+)$/i, key: "stunt-jump" },
  { re: /^Rampage #(\d+)$/i, key: "rampage" },
  { re: /^ATM #(\d+)$/i, key: "atm" },
  { re: /^Gas Pump #(\d+)$/i, key: "gas-pump" },
  { re: /^Telescope #(\d+)$/i, key: "lookout" },
  { re: /^Vending Machine #(\d+)$/i, key: "vending" },
  { re: /^Payphone #(\d+)$/i, key: "payphone" },
  { re: /^Dartboard #(\d+)$/i, key: "dartboard" },
  { re: /^Jukebox #(\d+)$/i, key: "jukebox" },
  { re: /^Bench #(\d+)$/i, key: "bench" },
  { re: /^Parking Meter #(\d+)$/i, key: "parking-meter" },
  { re: /^Gang Tag #(\d+)$/i, key: "tag" },
  { re: /^Letter Scrap #(\d+)$/i, key: "letter-scrap" },
  { re: /^Spaceship Part #(\d+)$/i, key: "spaceship-part" },
];

export function usesFriendlyCopy(loc: Location): boolean {
  if (loc.subtype) return true;
  const src = (loc.source ?? "").toLowerCase();
  if (["gtadb", "durtyfree", "kong78", "gtamods-main.scm"].includes(src)) return true;
  if (TECHNICAL_DESC.test(loc.description)) return true;
  if (/^gta5-/i.test(loc.slug) || /^gtadb-/i.test(loc.slug)) return true;
  if (/^(vc|sa)-(pkg|horseshoe|oyster|snapshot|usj)-/i.test(loc.slug)) return true;
  return false;
}

export function getLocationDisplayName(loc: Location, t: LocationTranslate): string {
  for (const { re, key } of NUMBERED_NAMES) {
    const m = loc.name.match(re);
    if (m) return t(`map.names.${key}`, { n: m[1] });
  }
  if (/\(robbery\)/i.test(loc.name)) {
    const base = loc.name.replace(/\s*\(robbery\)\s*/i, "").trim();
    return t("map.names.robbery-store", { name: base });
  }
  return loc.name;
}

export function getLocationDisplayDescription(
  loc: Location,
  t: LocationTranslate,
): string {
  if (!usesFriendlyCopy(loc) && loc.description.trim()) {
    return loc.description;
  }

  const region = loc.region?.trim() || t("map.regions.unknown");

  const hintKey = loc.subtype
    ? `map.hints.${loc.subtype}`
    : `map.hints.${loc.category}`;

  return t(hintKey, { region });
}

export function getCategoryLabel(
  category: Location["category"],
  t: LocationTranslate,
): string {
  return t(`map.categories.${category}`);
}

export function getSubtypeLabel(subtype: string, t: LocationTranslate): string {
  return t(`map.subtypes.${subtype}`);
}

export function getConfidenceLabel(
  confidence: LocationConfidence,
  t: LocationTranslate,
): string {
  return t(`map.confidence.${confidence}`);
}
