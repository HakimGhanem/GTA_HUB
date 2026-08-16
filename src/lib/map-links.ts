import { DEFAULT_GAME_ID, type GameId } from "@/lib/games";
import { SITE } from "@/lib/constants";

/** Build locale-agnostic map deep-link (next-intl Link adds locale prefix). */
export function mapLocationHref(opts: {
  slug?: string;
  x: number;
  y: number;
  game?: GameId;
}): string {
  const params = new URLSearchParams();
  const game = opts.game ?? DEFAULT_GAME_ID;
  if (game !== DEFAULT_GAME_ID) params.set("game", game);
  if (opts.slug) params.set("loc", opts.slug);
  params.set("x", String(opts.x));
  params.set("y", String(opts.y));
  return `/map?${params.toString()}`;
}

/** Absolute share URL for clip / Discord / TikTok captions. */
export function mapShareUrl(opts: {
  slug?: string;
  x: number;
  y: number;
  game?: GameId;
  locale?: string;
}): string {
  const path = mapLocationHref(opts);
  const locale = opts.locale ?? "en";
  return `${SITE.url}/${locale}${path}`;
}

export function mapGameHref(game: GameId): string {
  if (game === DEFAULT_GAME_ID) return "/map";
  return `/map?game=${game}`;
}
