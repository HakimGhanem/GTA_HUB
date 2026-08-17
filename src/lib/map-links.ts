import { DEFAULT_GAME_ID, type GameId } from "@/lib/games";
import { SITE } from "@/lib/constants";

/** Visual / streamer themes for shareable map URLs */
export const MAP_THEMES = ["default", "streamer", "neon"] as const;
export type MapTheme = (typeof MAP_THEMES)[number];

export function parseMapTheme(raw: string | null | undefined): MapTheme {
  if (raw === "streamer" || raw === "neon") return raw;
  return "default";
}

export type MapLinkOpts = {
  slug?: string;
  x: number;
  y: number;
  game?: GameId;
  /** MapLibre zoom (optional) */
  z?: number;
  theme?: MapTheme;
  /** Creator attribution — Kick / Twitch / TikTok handle */
  ref?: string;
};

function sanitizeRef(ref: string | undefined): string | undefined {
  if (!ref) return undefined;
  const cleaned = ref.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 32);
  return cleaned || undefined;
}

/** Build locale-agnostic map deep-link (next-intl Link adds locale prefix). */
export function mapLocationHref(opts: MapLinkOpts): string {
  const params = new URLSearchParams();
  const game = opts.game ?? DEFAULT_GAME_ID;
  if (game !== DEFAULT_GAME_ID) params.set("game", game);
  if (opts.slug) params.set("loc", opts.slug);
  params.set("x", String(Math.round(opts.x)));
  params.set("y", String(Math.round(opts.y)));
  if (opts.z != null && Number.isFinite(opts.z)) {
    params.set("z", String(Math.round(opts.z * 10) / 10));
  }
  if (opts.theme && opts.theme !== "default") params.set("theme", opts.theme);
  const ref = sanitizeRef(opts.ref);
  if (ref) params.set("ref", ref);
  return `/map?${params.toString()}`;
}

/** Absolute share URL for clip / Discord / TikTok captions. */
export function mapShareUrl(
  opts: MapLinkOpts & { locale?: string },
): string {
  const path = mapLocationHref(opts);
  const locale = opts.locale ?? "en";
  return `${SITE.url}/${locale}${path}`;
}

/** OBS Browser Source — transparent chrome-free map. */
export function mapOverlayHref(opts: Omit<MapLinkOpts, "x" | "y"> & {
  x?: number;
  y?: number;
}): string {
  const params = new URLSearchParams();
  const game = opts.game ?? DEFAULT_GAME_ID;
  if (game !== DEFAULT_GAME_ID) params.set("game", game);
  if (opts.slug) params.set("loc", opts.slug);
  if (opts.x != null) params.set("x", String(Math.round(opts.x)));
  if (opts.y != null) params.set("y", String(Math.round(opts.y)));
  if (opts.z != null && Number.isFinite(opts.z)) {
    params.set("z", String(Math.round(opts.z * 10) / 10));
  }
  const theme = opts.theme && opts.theme !== "default" ? opts.theme : "streamer";
  params.set("theme", theme);
  const ref = sanitizeRef(opts.ref);
  if (ref) params.set("ref", ref);
  return `/overlay?${params.toString()}`;
}

export function mapOverlayShareUrl(
  opts: Omit<MapLinkOpts, "x" | "y"> & {
    x?: number;
    y?: number;
    locale?: string;
  },
): string {
  const path = mapOverlayHref(opts);
  const locale = opts.locale ?? "en";
  return `${SITE.url}/${locale}${path}`;
}

export function mapGameHref(game: GameId): string {
  if (game === DEFAULT_GAME_ID) return "/map";
  return `/map?game=${game}`;
}

/** Persist creator ref from URL for later share links (session). */
export function rememberCreatorRef(ref: string | null | undefined): void {
  if (typeof window === "undefined") return;
  const cleaned = sanitizeRef(ref ?? undefined);
  if (!cleaned) return;
  try {
    sessionStorage.setItem("map6_ref", cleaned);
  } catch {
    /* private mode */
  }
}

export function readCreatorRef(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return sanitizeRef(sessionStorage.getItem("map6_ref") ?? undefined);
  } catch {
    return undefined;
  }
}
