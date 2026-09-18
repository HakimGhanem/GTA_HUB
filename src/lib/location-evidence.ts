import { getTrailerCopy } from "@/data/trailer-i18n";
import {
  TRAILERS,
  formatTimecode,
  trailerWatchUrl,
} from "@/data/trailers";

export type LocationTrailerHit = {
  trailerSlug: string;
  trailerName: string;
  beatId: string;
  at: number;
  timecode: string;
  watchUrl: string;
  verified: boolean;
};

export type LocationTrailerEvidence = LocationTrailerHit & {
  trailerLabel: string;
  title: string;
  look: string;
};

const TRAILER_NAMES: Record<string, string> = {
  "trailer-1": "Trailer 1",
  "trailer-2": "Trailer 2",
};

function buildHitsBySlug(): Map<string, LocationTrailerHit[]> {
  const map = new Map<string, LocationTrailerHit[]>();
  for (const trailer of TRAILERS) {
    const name = TRAILER_NAMES[trailer.slug] ?? trailer.slug;
    for (const beat of trailer.beats) {
      if (!beat.locationSlug) continue;
      const hit: LocationTrailerHit = {
        trailerSlug: trailer.slug,
        trailerName: name,
        beatId: beat.id,
        at: beat.at,
        timecode: formatTimecode(beat.at),
        watchUrl: trailerWatchUrl(trailer, beat.at),
        verified: trailer.timestampsVerified,
      };
      const list = map.get(beat.locationSlug) ?? [];
      list.push(hit);
      map.set(beat.locationSlug, list);
    }
  }
  return map;
}

const HITS_BY_SLUG = buildHitsBySlug();

export function getLocationTrailerHits(slug: string): LocationTrailerHit[] {
  return HITS_BY_SLUG.get(slug) ?? [];
}

export function getLocationTrailerEvidence(
  slug: string,
  locale: string,
): LocationTrailerEvidence[] {
  const copy = getTrailerCopy(locale);
  return getLocationTrailerHits(slug).map((hit) => {
    const beat = copy.beats[hit.beatId];
    return {
      ...hit,
      trailerName: copy.trailers[hit.trailerSlug]?.name ?? hit.trailerName,
      trailerLabel: copy.trailers[hit.trailerSlug]?.name ?? hit.trailerName,
      title: beat?.title ?? hit.beatId,
      look: beat?.look ?? "",
    };
  });
}

export function formatTrailerStamp(hit: LocationTrailerHit): string {
  const prefix = hit.verified ? "" : "~";
  return `${hit.trailerName} · ${prefix}${hit.timecode}`;
}

export function formatTrailerEvidenceLine(hit: LocationTrailerEvidence): string {
  return `${formatTrailerStamp(hit)} — ${hit.title}`;
}
