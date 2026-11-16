import gtadbLocationsJson from "@/data/gtadb-locations.json";
import type { Location } from "@/data/locations";

const UPSTREAM =
  "https://raw.githubusercontent.com/rolux/gtadb.org/main/map/data/6/landmarks.json";

/** Launch-week cadence: how stale the "checked" stamp is allowed to get. */
export const UPSTREAM_CHECK_SECONDS = 3600;

export type UpstreamStatus = {
  checkedAt: string;
  upstreamTotal: number;
  /** Upstream ids we do not ship yet */
  pendingAdded: number;
  /** Upstream ids edited after the day we imported them */
  pendingUpdated: number;
};

type UpstreamItem = unknown[];

function bundledUpdatedById(): Map<string, string | undefined> {
  const byId = new Map<string, string | undefined>();
  for (const loc of gtadbLocationsJson as Location[]) {
    const id = /^gtadb-(l\d+)-/.exec(loc.slug)?.[1];
    if (id) byId.set(id.toUpperCase(), loc.updatedAt);
  }
  return byId;
}

/**
 * Compares the GTADB landmarks on GitHub with the pins baked into this build.
 * Cached for an hour, so at most one upstream request per instance per hour.
 * Returns null when GitHub is unreachable — callers show the last sync only.
 */
export async function getUpstreamStatus(): Promise<UpstreamStatus | null> {
  try {
    const res = await fetch(UPSTREAM, {
      next: { revalidate: UPSTREAM_CHECK_SECONDS, tags: ["gtadb-upstream"] },
    });
    if (!res.ok) return null;
    const upstream = (await res.json()) as Record<string, UpstreamItem>;
    const fetchedAt = res.headers.get("date");
    const bundled = bundledUpdatedById();

    let pendingAdded = 0;
    let pendingUpdated = 0;
    for (const [id, item] of Object.entries(upstream)) {
      const coords = item?.[1];
      if (!Array.isArray(coords) || coords.length < 2) continue;
      if (!bundled.has(id)) {
        pendingAdded += 1;
        continue;
      }
      const edited: unknown[] = Array.isArray(item[8]) ? item[8] : [];
      const stamps = edited.filter((n): n is number => typeof n === "number");
      if (stamps.length === 0) continue;
      const upstreamDay = new Date(Math.max(...stamps) * 1000).toISOString().slice(0, 10);
      const ours = bundled.get(id);
      if (!ours || upstreamDay > ours) pendingUpdated += 1;
    }

    return {
      checkedAt: new Date(fetchedAt ?? Date.now()).toISOString(),
      upstreamTotal: Object.keys(upstream).length,
      pendingAdded,
      pendingUpdated,
    };
  } catch {
    return null;
  }
}
