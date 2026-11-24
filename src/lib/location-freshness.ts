import changelogJson from "@/data/location-changelog.json";
import type { Location } from "@/data/locations";
import { MAP_CONTENT_UPDATED_AT } from "@/data/map-faq";

export type ChangelogSample = { slug: string; name: string; region: string };

export type ChangelogEntry = {
  date: string;
  source: "gtadb";
  total: number;
  identified: number;
  survey: number;
  added?: number;
  updated?: number;
  removed?: number;
  samples?: { added: ChangelogSample[]; updated: ChangelogSample[] };
};

const CHANGELOG = (changelogJson as { entries: ChangelogEntry[] }).entries;

/** Newest first, as written by `npm run pois:sync-gtadb`. */
export function getLocationChangelog(): ChangelogEntry[] {
  return CHANGELOG;
}

/** Day the bundled GTADB pins were last reconciled with upstream. */
export const GTADB_SYNCED_AT = CHANGELOG[0]?.date ?? MAP_CONTENT_UPDATED_AT.slice(0, 10);

/** Bump when the hand-placed editorial pins and hubs are re-checked. */
export const EDITORIAL_PINS_REVIEWED_AT = "2026-10-26";

/** When this pin's data was last confirmed against its source. */
export function locationVerifiedAt(location: Pick<Location, "source">): string {
  return location.source === "gtadb" ? GTADB_SYNCED_AT : EDITORIAL_PINS_REVIEWED_AT;
}

/** Most recent upstream edit among these pins, if any carries one. */
export function latestLocationUpdate(
  locations: Array<Pick<Location, "updatedAt">>,
): string | undefined {
  let latest: string | undefined;
  for (const { updatedAt } of locations) {
    if (updatedAt && (!latest || updatedAt > latest)) latest = updatedAt;
  }
  return latest;
}
