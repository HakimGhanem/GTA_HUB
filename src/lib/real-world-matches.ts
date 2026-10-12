import { getAllLocations, type Location } from "@/data/all-locations";

export type RealWorldMatch = Location & {
  realWorld: NonNullable<Location["realWorld"]>;
};

export type RealWorldLocalityGroup = {
  region: string;
  matches: RealWorldMatch[];
};

function hasRealWorld(location: Location): location is RealWorldMatch {
  return Boolean(location.realWorld);
}

/** Every pin whose real-world counterpart the GTADB community has identified. */
export function getRealWorldMatches(): RealWorldMatch[] {
  return getAllLocations().filter(hasRealWorld);
}

/** Localities ordered by how much of them has been identified. */
export function groupMatchesByLocality(
  matches: RealWorldMatch[],
): RealWorldLocalityGroup[] {
  const byRegion = new Map<string, RealWorldMatch[]>();
  for (const match of matches) {
    const region = match.region?.trim() || "Leonida";
    const list = byRegion.get(region);
    if (list) list.push(match);
    else byRegion.set(region, [match]);
  }

  return [...byRegion.entries()]
    .map(([region, group]) => ({
      region,
      matches: group.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort(
      (a, b) =>
        b.matches.length - a.matches.length || a.region.localeCompare(b.region),
    );
}

/** Nature of the identified buildings, most represented first. */
export function countMatchesBySubtype(
  matches: RealWorldMatch[],
): Array<{ subtype: string; count: number }> {
  const counts = new Map<string, number>();
  for (const match of matches) {
    if (!match.subtype) continue;
    counts.set(match.subtype, (counts.get(match.subtype) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([subtype, count]) => ({ subtype, count }))
    .sort((a, b) => b.count - a.count || a.subtype.localeCompare(b.subtype));
}

export function countUnconfirmedMatches(matches: RealWorldMatch[]): number {
  return matches.filter((match) => match.confidence === "rumor").length;
}

/**
 * A locality earns its own page above this many identified buildings. Below it,
 * the entries stay on the index rather than becoming a page with four rows.
 */
export const LOCALITY_PAGE_MIN = 20;

export function localitySlug(region: string): string {
  return region
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getLocalityPages(): RealWorldLocalityGroup[] {
  return groupMatchesByLocality(getRealWorldMatches()).filter(
    (group) => group.matches.length >= LOCALITY_PAGE_MIN,
  );
}

export function getLocalitiesOnIndex(): RealWorldLocalityGroup[] {
  return groupMatchesByLocality(getRealWorldMatches()).filter(
    (group) => group.matches.length < LOCALITY_PAGE_MIN,
  );
}

export function getLocalityBySlug(
  slug: string,
): RealWorldLocalityGroup | undefined {
  return groupMatchesByLocality(getRealWorldMatches()).find(
    (group) => localitySlug(group.region) === slug,
  );
}

export type RealWorldSubtypeGroup = {
  subtype: string;
  matches: RealWorldMatch[];
};

/**
 * A searcher types "gta 6 hotels", not "gta 6 hotel", so the URL carries the
 * plural the query uses while the data keeps its singular key.
 */
const SUBTYPE_URL: Record<string, string> = {
  residential: "residential-buildings",
  transport: "transport",
  retail: "shops",
  hotel: "hotels",
  leisure: "leisure",
  industrial: "industrial-sites",
  infrastructure: "infrastructure",
  public: "public-buildings",
  government: "government-buildings",
  natural: "natural-features",
  restaurant: "restaurants",
  monument: "landmarks",
  venue: "venues",
  office: "offices",
  construction: "construction-sites",
  agriculture: "agriculture",
};

/**
 * Below this many identified buildings a facet is a list of three rows with a
 * paragraph on top — the thin page Google and AdSense both penalise.
 */
export const SUBTYPE_PAGE_MIN = 13;

export function subtypeSlug(subtype: string): string {
  return SUBTYPE_URL[subtype] ?? subtype;
}

function groupMatchesBySubtype(
  matches: RealWorldMatch[],
): RealWorldSubtypeGroup[] {
  const bySubtype = new Map<string, RealWorldMatch[]>();
  for (const match of matches) {
    const subtype = match.subtype?.trim();
    if (!subtype || !SUBTYPE_URL[subtype]) continue;
    const list = bySubtype.get(subtype);
    if (list) list.push(match);
    else bySubtype.set(subtype, [match]);
  }

  return [...bySubtype.entries()]
    .map(([subtype, group]) => ({
      subtype,
      matches: group.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort(
      (a, b) =>
        b.matches.length - a.matches.length || a.subtype.localeCompare(b.subtype),
    );
}

/** Statewide facets dense enough to stand as their own page. */
export function getSubtypePages(): RealWorldSubtypeGroup[] {
  return groupMatchesBySubtype(getRealWorldMatches()).filter(
    (group) => group.matches.length >= SUBTYPE_PAGE_MIN,
  );
}

export function getSubtypeBySlug(
  slug: string,
): RealWorldSubtypeGroup | undefined {
  return getSubtypePages().find((group) => subtypeSlug(group.subtype) === slug);
}

/** Where a facet's buildings sit, most represented locality first. */
export function countMatchesByLocality(
  matches: RealWorldMatch[],
): Array<{ region: string; count: number }> {
  return groupMatchesByLocality(matches).map((group) => ({
    region: group.region,
    count: group.matches.length,
  }));
}
