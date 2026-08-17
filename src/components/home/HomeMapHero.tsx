"use client";

import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import { GameMap } from "@/components/map/GameMap";

type HomeMapHeroProps = {
  locale: string;
  brand: string;
  ctaFullscreen: string;
  ctaGuides: string;
};

function HomeMapInner({ locale, brand, ctaFullscreen, ctaGuides }: HomeMapHeroProps) {
  return (
    <section className="relative h-[calc(100dvh-3.5rem)] min-h-[28rem] w-full overflow-hidden">
      <GameMap
        locale={locale}
        showSidebar={false}
        className="h-full w-full"
        theme="default"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-black/70 via-black/25 to-transparent px-4 pb-24 pt-6 sm:px-6 sm:pt-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300/90">
            Map-6
          </p>
          <h1 className="max-w-xl text-3xl font-bold tracking-tight text-white drop-shadow sm:text-4xl">
            {brand}
          </h1>
          <div className="pointer-events-auto flex flex-wrap gap-3 pt-1">
            <Link
              href="/map"
              className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition-colors hover:bg-pink-400"
            >
              {ctaFullscreen}
            </Link>
            <Link
              href="/guides/best-setup-gta-6-ps5-xbox"
              className="rounded-full border border-white/25 bg-black/40 px-5 py-2 text-sm font-semibold text-white/90 backdrop-blur-md transition-colors hover:border-white/45 hover:text-white"
            >
              {ctaGuides}
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/80 to-transparent pb-4 pt-16">
        <span className="animate-bounce text-[10px] uppercase tracking-widest text-white/40">
          Scroll
        </span>
      </div>
    </section>
  );
}

export function HomeMapHero(props: HomeMapHeroProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100dvh-3.5rem)] min-h-[28rem] items-center justify-center bg-[#0a0e17] text-white/40">
          Loading map…
        </div>
      }
    >
      <HomeMapInner {...props} />
    </Suspense>
  );
}
