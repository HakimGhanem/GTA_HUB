"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { LiveDirectory, LiveStream } from "@/lib/twitch/directory";
import { LiveCard } from "./LiveCard";
import { TwitchPlayer } from "./TwitchPlayer";

const REFRESH_MS = 60_000;

export function LiveGrid({ initial }: { initial: LiveDirectory }) {
  const locale = useLocale();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [directory, setDirectory] = useState(initial);
  const [active, setActive] = useState<LiveStream | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A failed refresh keeps the previous list on screen — stale thumbnails
    // beat an error panel over a directory that was fine a minute ago.
    const refresh = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const res = await fetch("/api/live");
        if (!res.ok) return;
        setDirectory((await res.json()) as LiveDirectory);
      } catch {
        /* keep showing what we have */
      }
    };

    const onVisible = () => void refresh();

    // Polling a hidden tab burns the visitor's battery and our invocations.
    const timer = window.setInterval(refresh, REFRESH_MS);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const streams = useMemo(() => {
    const language = locale.toLowerCase();
    return [...directory.streams].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      const aLang = a.language.toLowerCase() === language;
      const bLang = b.language.toLowerCase() === language;
      if (aLang !== bLang) return aLang ? -1 : 1;
      return b.viewers - a.viewers;
    });
  }, [directory, locale]);

  const select = useCallback((stream: LiveStream) => {
    setActive(stream);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!directory.configured) {
    return (
      <p className="rounded-xl border border-foreground/10 bg-foreground/5 px-5 py-4 text-sm text-foreground/60">
        The live directory is not connected yet.
      </p>
    );
  }

  if (streams.length === 0) {
    return (
      <p className="rounded-xl border border-foreground/10 bg-foreground/5 px-5 py-4 text-sm text-foreground/60">
        {directory.error
          ? "Twitch is not answering right now. The list comes back on its own within a minute."
          : "Nobody is live in the GTA categories right now."}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div ref={playerRef} className="scroll-mt-20">
        {active ? (
          <TwitchPlayer
            login={active.login}
            displayName={active.displayName}
            onClose={() => setActive(null)}
          />
        ) : null}
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-wide text-foreground/40">
          {streams.length} live now{isDesktop ? "" : " · opens on Twitch"}
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {streams.map((stream) => (
            <LiveCard
              key={stream.id}
              stream={stream}
              bust={directory.fetchedAt}
              active={active?.login === stream.login}
              deepLink={!isDesktop}
              onSelect={select}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
