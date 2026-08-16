"use client";

import { useCallback } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GameMap } from "@/components/map/GameMap";
import { getGameConfig, parseGameId, type GameId } from "@/lib/games";
import { mapLocationHref } from "@/lib/map-links";

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
      const params = new URLSearchParams();
      if (nextGame !== "gta6") params.set("game", nextGame);
      replaceQuery(params);
    },
    [replaceQuery],
  );

  const onDeepLinkChange = useCallback(
    (opts: { slug?: string; x: number; y: number }) => {
      const href = mapLocationHref({ ...opts, game: gameId });
      const qs = href.split("?")[1] ?? "";
      const params = new URLSearchParams(qs);
      replaceQuery(params);
    },
    [gameId, replaceQuery],
  );

  return (
    <GameMap
      key={`${gameId}-${loc ?? ""}-${focus?.x ?? ""}-${focus?.y ?? ""}`}
      gameId={gameId}
      focus={focus}
      initialActiveSlug={fromSlug?.slug}
      showSidebar
      className="h-full"
      locale={locale}
      onSelectGame={onSelectGame}
      onDeepLinkChange={onDeepLinkChange}
    />
  );
}
