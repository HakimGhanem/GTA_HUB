/**
 * Official Rockstar trailer uploads used by the /trailer scrub page.
 *
 * `videoId` must point at the Rockstar Games channel upload — never a reupload
 * from a games-media channel. Map-6 only frames the official player: we do not
 * mirror, download, or rehost any frame of the videos.
 */

export type TrailerBeat = {
  /** Stable key — localized copy lives in `trailer-i18n`. */
  id: string;
  /** Offset in seconds inside the official upload. */
  at: number;
  /** Map-6 hub this frame can be cross-referenced with, when it maps to one. */
  locationSlug?: string;
};

export type Trailer = {
  slug: string;
  /** Rockstar Games channel upload. */
  videoId: string;
  publishedAt: string;
  /** ISO 8601 duration, verified against the official upload. */
  duration: string;
  durationSeconds: number;
  /**
   * Flip to `true` once every `at` below has been checked frame by frame
   * against the official upload. Until then the UI prefixes each timecode with
   * `~` and shows a notice, so no estimate reads as a citable frame.
   */
  timestampsVerified: boolean;
  /**
   * YouTube age-restriction blocks third-party embeds. When true the scrub
   * list opens the official watch URL at that offset instead of an iframe.
   */
  embedBlocked?: boolean;
  beats: TrailerBeat[];
};

export const TRAILERS: Trailer[] = [
  {
    slug: "extended-look",
    videoId: "tJbzMqJGH4k",
    publishedAt: "2026-08-27",
    duration: "PT26M49S",
    durationSeconds: 1609,
    timestampsVerified: false,
    embedBlocked: true,
    beats: [
      { id: "el-lockpick", at: 367 },
      { id: "el-3d-map", at: 480 },
      { id: "el-one-hand-shotgun", at: 561 },
      { id: "el-binoculars", at: 648 },
      { id: "el-dialogue-bar", at: 650, locationSlug: "vice-city" },
      { id: "el-six-star", at: 921 },
      { id: "el-masks", at: 1070 },
      { id: "el-holster", at: 1077 },
      { id: "el-lifeinvader", at: 1084 },
      { id: "el-instant-swap", at: 1111 },
      { id: "el-character-swap", at: 1121 },
      { id: "el-weapon-pickup", at: 1500 },
      { id: "el-fishing", at: 1552 },
    ],
  },
  {
    slug: "trailer-2",
    videoId: "VQRLujxTm3c",
    publishedAt: "2025-05-06",
    duration: "PT2M47S",
    durationSeconds: 167,
    timestampsVerified: false,
    beats: [
      { id: "t2-stilt-house", at: 8, locationSlug: "leonida-keys" },
      { id: "t2-prison-release", at: 33 },
      { id: "t2-ocean-drive-night", at: 61, locationSlug: "ocean-drive" },
      { id: "t2-downtown-skyline", at: 84, locationSlug: "vice-city" },
      { id: "t2-wetlands", at: 102, locationSlug: "grassrivers" },
      { id: "t2-gated-money", at: 118, locationSlug: "ambrosia-island" },
      { id: "t2-port-yard", at: 133, locationSlug: "port-gellhorn" },
      { id: "t2-backcountry", at: 149, locationSlug: "mount-kalaga" },
    ],
  },
  {
    slug: "trailer-1",
    videoId: "QdBZY2fkU-0",
    publishedAt: "2023-12-04",
    duration: "PT1M31S",
    durationSeconds: 91,
    timestampsVerified: false,
    beats: [
      { id: "t1-beach-sunrise", at: 6, locationSlug: "ocean-drive" },
      { id: "t1-lucia-interview", at: 14 },
      { id: "t1-store-gator", at: 31, locationSlug: "grassrivers" },
      { id: "t1-causeway", at: 47, locationSlug: "leonida-keys" },
      { id: "t1-industrial-edge", at: 58, locationSlug: "port-gellhorn" },
      { id: "t1-downtown-dusk", at: 70, locationSlug: "vice-city" },
    ],
  },
];

export function getTrailer(slug: string): Trailer | undefined {
  return TRAILERS.find((trailer) => trailer.slug === slug);
}

export function trailerWatchUrl(trailer: Trailer, at?: number): string {
  const base = `https://www.youtube.com/watch?v=${trailer.videoId}`;
  return at ? `${base}&t=${at}s` : base;
}

/** Cookie-free player origin — the iframe is only mounted after a click. */
export function trailerPlayerUrl(trailer: Trailer): string {
  return `https://www.youtube-nocookie.com/embed/${trailer.videoId}`;
}

export function trailerEmbedUrl(trailer: Trailer, at?: number): string {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
  });
  if (at) params.set("start", String(at));
  return `${trailerPlayerUrl(trailer)}?${params}`;
}

/** Referenced in structured data only — never fetched by the browser. */
export function trailerThumbnailUrl(trailer: Trailer): string {
  return `https://i.ytimg.com/vi/${trailer.videoId}/maxresdefault.jpg`;
}

export function formatTimecode(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}
