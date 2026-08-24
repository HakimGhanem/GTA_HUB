"use client";

import { Suspense, useEffect } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { GameMap } from "@/components/map/GameMap";
import { getGameConfig, parseGameId } from "@/lib/games";
import {
  parseMapTheme,
  rememberCreatorRef,
} from "@/lib/map-links";

function OverlayInner() {
  const searchParams = useSearchParams();
  const locale = useLocale();

  const gameId = parseGameId(searchParams.get("game"));
  const game = getGameConfig(gameId);
  const loc = searchParams.get("loc");
  const x = searchParams.get("x");
  const y = searchParams.get("y");
  const zRaw = searchParams.get("z");
  const z = zRaw != null && zRaw !== "" ? Number(zRaw) : undefined;
  const theme = parseMapTheme(searchParams.get("theme") ?? "streamer");
  const ref = searchParams.get("ref") ?? undefined;

  useEffect(() => {
    rememberCreatorRef(ref);
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.background;
    const prevBody = body.style.background;
    html.style.background = "transparent";
    body.style.background = "transparent";
    body.classList.add("overlay-mode");
    return () => {
      html.style.background = prevHtml;
      body.style.background = prevBody;
      body.classList.remove("overlay-mode");
    };
  }, [ref]);

  const fromSlug = loc
    ? game.getLocations().find((l) => l.slug === loc)
    : undefined;

  const focus = fromSlug
    ? { x: fromSlug.x, y: fromSlug.y }
    : x && y
      ? { x: Number(x), y: Number(y) }
      : undefined;

  return (
    <GameMap
      key={`${gameId}-${theme}-overlay`}
      gameId={gameId}
      focus={focus}
      initialZoom={z}
      initialActiveSlug={fromSlug?.slug}
      theme={theme}
      creatorRef={ref}
      overlayMode
      showSidebar={false}
      className="h-full w-full"
      locale={locale}
    />
  );
}

export function OverlayPageClient() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center text-sm text-white/40">
          Loading overlay…
        </div>
      }
    >
      <OverlayInner />
    </Suspense>
  );
}
