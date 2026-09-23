"use client";

import { Suspense, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GameMap } from "@/components/map/GameMap";
import { ConversionStrip } from "@/components/newsletter/ConversionStrip";

type HomeMapHeroProps = {
  locale: string;
  brand: string;
  ctaFullscreen: string;
  ctaGuides: string;
};

function MapCanvas({ locale }: { locale: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      return () => win.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) {
    return (
      <div
        className="h-full w-full bg-background"
        aria-hidden
      />
    );
  }

  return (
    <GameMap
      locale={locale}
      showSidebar={false}
      className="h-full w-full"
      theme="default"
    />
  );
}

function HomeMapInner({ locale, brand, ctaFullscreen, ctaGuides }: HomeMapHeroProps) {
  const t = useTranslations("home");

  return (
    <section className="relative h-[calc(100dvh-3.5rem)] min-h-[28rem] w-full overflow-hidden">
      <MapCanvas locale={locale} />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-black/70 via-black/25 to-transparent px-4 pb-24 pt-6 sm:px-6 sm:pt-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/90">
            {t("badge")}
          </p>
          <h1 className="max-w-xl text-3xl font-bold tracking-tight text-foreground drop-shadow sm:text-4xl">
            {brand}
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-foreground/80 sm:text-base">
            {t("heroLine")}
          </p>
          <ul className="flex flex-wrap gap-1.5 text-[11px] font-medium text-foreground/70">
            <li className="rounded-full border border-foreground/20 bg-black/40 px-2.5 py-0.5">
              {t("trustPoi")}
            </li>
            <li className="rounded-full border border-foreground/20 bg-black/40 px-2.5 py-0.5">
              {t("trustOfficial")}
            </li>
            <li className="rounded-full border border-foreground/20 bg-black/40 px-2.5 py-0.5">
              {t("trustNoLeak")}
            </li>
          </ul>
          <div className="pointer-events-auto flex flex-wrap gap-3 pt-1">
            <Link
              href="/map"
              className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-accent-foreground shadow-lg shadow-pink-500/25 transition-colors hover:bg-pink-400"
            >
              {ctaFullscreen}
            </Link>
            <Link
              href="/guides/gta-6-map-guide"
              className="rounded-full border border-foreground/25 bg-black/40 px-5 py-2 text-sm font-semibold text-foreground/90 backdrop-blur-md transition-colors hover:border-foreground/45 hover:text-foreground"
            >
              {ctaGuides}
            </Link>
          </div>
          <ConversionStrip variant="hero" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/80 to-transparent pb-4 pt-16">
        <span className="animate-bounce text-[10px] uppercase tracking-widest text-foreground/40">
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
        <div className="flex h-[calc(100dvh-3.5rem)] min-h-[28rem] items-center justify-center bg-background text-foreground/40">
          Loading map…
        </div>
      }
    >
      <HomeMapInner {...props} />
    </Suspense>
  );
}
