"use client";

import { useCallback, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GameMap } from "@/components/map/GameMap";
import { trackEvent, trackPageView } from "@/lib/analytics/track";
import { getGameConfig, parseGameId, type GameId } from "@/lib/games";
import {
  mapLocationHref,
  parseMapTheme,
  rememberCreatorRef,
  type MapTheme,
} from "@/lib/map-links";

export function MapPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const gameId = parseGameId(searchParams.get("game"));
  const game = getGameConfig(gameId);
  const loc = searchParams.get("loc");
  const x = searchParams.get("x");
  const y = searchParams.get("y");
  const zRaw = searchParams.get("z");
  const z = zRaw != null && zRaw !== "" ? Number(zRaw) : undefined;
  const theme = parseMapTheme(searchParams.get("theme"));
  const ref = searchParams.get("ref") ?? undefined;

  useEffect(() => {
    rememberCreatorRef(ref);
  }, [ref]);

  useEffect(() => {
    const qs = searchParams.toString();
    trackPageView(qs ? `${pathname}?${qs}` : pathname);
  }, [pathname, searchParams]);

  const fromSlug = loc
    ? game.getLocations().find((l) => l.slug === loc)
    : undefined;

  const focus = fromSlug
    ? { x: fromSlug.x, y: fromSlug.y }
    : x && y
      ? { x: Number(x), y: Number(y) }
      : undefined;

  const replaceQuery = useCallback(
    (next: URLSearchParams) => {
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const onSelectGame = useCallback(
    (nextGame: GameId) => {
      trackEvent("map_game_switch", {
        game_id: nextGame,
        from_game_id: gameId,
      });
      const params = new URLSearchParams();
      if (nextGame !== "gta6") params.set("game", nextGame);
      if (theme !== "default") params.set("theme", theme);
      if (ref) params.set("ref", ref);
      replaceQuery(params);
    },
    [gameId, ref, replaceQuery, theme],
  );

  const onDeepLinkChange = useCallback(
    (opts: {
      slug?: string;
      x: number;
      y: number;
      z?: number;
      theme?: MapTheme;
    }) => {
      const href = mapLocationHref({
        ...opts,
        game: gameId,
        theme: opts.theme ?? theme,
        ref,
      });
      const qs = href.split("?")[1] ?? "";
      replaceQuery(new URLSearchParams(qs));
    },
    [gameId, ref, replaceQuery, theme],
  );

  return (
    <GameMap
      key={`${gameId}-${theme}`}
      gameId={gameId}
      focus={focus}
      initialZoom={z}
      initialActiveSlug={fromSlug?.slug}
      theme={theme}
      creatorRef={ref}
      showSidebar
      className="h-full"
      locale={locale}
      onSelectGame={onSelectGame}
      onDeepLinkChange={onDeepLinkChange}
    />
  );
}
