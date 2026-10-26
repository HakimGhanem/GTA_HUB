/**
 * Launch trailer (Rockstar, 15 October 2026) — frame matches checked by a
 * human against the official upload. This file is the only place a trailer
 * timecode may come from: pages render it as-is and `validateArticle` rejects
 * any generated article quoting a timecode that is not listed here.
 *
 * Add a row only after scrubbing the official YouTube/rockstargames.com encode
 * yourself. Leave `locationSlug` empty when the place is not on Map-6.
 */
export type TrailerShot = {
  /** Start of the shot in the official upload, `m:ss` */
  t: string;
  /** Map-6 location slug (`/locations/<slug>`), or "" when unmatched */
  locationSlug: string;
  en: string;
  fr: string;
  /** ISO date the frame was checked */
  verifiedAt: string;
};

export const LAUNCH_TRAILER = {
  publishedAt: "2026-10-15",
  url: "https://www.rockstargames.com/VI/launch-trailer",
  durationLabel: "about 90 seconds",
} as const;

export const LAUNCH_TRAILER_SHOTS: TrailerShot[] = [];

const TIMECODE = /^\d{1,2}:\d{2}$/;

export function verifiedTrailerTimecodes(): Set<string> {
  return new Set(
    LAUNCH_TRAILER_SHOTS.filter((s) => TIMECODE.test(s.t)).map((s) =>
      s.t.replace(/^0(\d:)/, "$1"),
    ),
  );
}

export function launchTrailerShotRows(locale: "en" | "fr"): string[][] {
  return LAUNCH_TRAILER_SHOTS.map((s) => [
    s.t,
    locale === "fr" ? s.fr : s.en,
    s.locationSlug ? `/${locale}/locations/${s.locationSlug}` : "—",
  ]);
}
