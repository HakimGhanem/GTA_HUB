"use client";

import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  formatTimecode,
  trailerEmbedUrl,
  trailerWatchUrl,
  type Trailer,
} from "@/data/trailers";
import type { TrailerCopy } from "@/data/trailer-i18n";

export type TrailerBeatRow = {
  id: string;
  at: number;
  title: string;
  look: string;
  /** Locale-agnostic map deep link — omitted when the beat has no geography. */
  mapHref?: string;
  regionName?: string;
};

type Props = {
  trailer: Trailer;
  name: string;
  summary: string;
  rows: TrailerBeatRow[];
  copy: TrailerCopy;
};

/**
 * Click-to-load facade around the official YouTube player.
 *
 * The iframe is only mounted after an explicit click, so the page issues no
 * request to YouTube — and drops no third-party cookie — for readers who never
 * press play. Seeking remounts the iframe with a new `start` offset, which is
 * cheaper than pulling in the player JS API for a handful of jumps.
 */
export function TrailerScrub({ trailer, name, summary, rows, copy }: Props) {
  const [startAt, setStartAt] = useState<number | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  function play(at: number) {
    if (trailer.embedBlocked) {
      window.open(trailerWatchUrl(trailer, at), "_blank", "noopener,noreferrer");
      return;
    }
    setStartAt(at);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section aria-labelledby={`${trailer.slug}-heading`} className="mt-12">
      <h2
        id={`${trailer.slug}-heading`}
        className="text-2xl font-bold text-foreground"
      >
        {name}
      </h2>
      <p className="mt-2 text-foreground/60">{summary}</p>

      <div
        ref={playerRef}
        className="mt-5 aspect-video overflow-hidden rounded-xl border border-foreground/10 bg-background"
      >
        {trailer.embedBlocked ? (
          <a
            href={trailerWatchUrl(trailer)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.playLabel.replace("{name}", name)}
            className="group flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.22),transparent_65%)] px-6 text-center transition-colors hover:bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.32),transparent_65%)]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 transition-transform group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="ml-1 h-7 w-7 fill-white"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-foreground">
              {name} · {formatTimecode(trailer.durationSeconds)}
            </span>
            <span className="max-w-md text-xs text-foreground/55">
              {copy.embedBlockedNote}
            </span>
          </a>
        ) : startAt === null ? (
          <button
            type="button"
            onClick={() => play(0)}
            aria-label={copy.playLabel.replace("{name}", name)}
            className="group flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.22),transparent_65%)] transition-colors hover:bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.32),transparent_65%)]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 transition-transform group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="ml-1 h-7 w-7 fill-white"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-foreground">
              {name} · {formatTimecode(trailer.durationSeconds)}
            </span>
          </button>
        ) : (
          <iframe
            key={startAt}
            src={trailerEmbedUrl(trailer, startAt)}
            title={name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        )}
      </div>

      <p className="mt-2 flex flex-wrap items-center gap-x-3 text-xs text-foreground/40">
        <span>{copy.privacyNote}</span>
        <a
          href={trailerWatchUrl(trailer)}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground/70"
        >
          {copy.watchOnYouTube}
        </a>
      </p>

      <ul className="mt-6 space-y-3">
        {rows.map((row) => (
          <li
            key={row.id}
            className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4 sm:flex sm:gap-4"
          >
            <button
              type="button"
              onClick={() => play(row.at)}
              aria-label={copy.seekLabel.replace(
                "{time}",
                formatTimecode(row.at),
              )}
              className="mb-2 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-foreground/10 px-3 py-1 font-mono text-sm text-cyan-300 transition-colors hover:bg-pink-500 hover:text-foreground sm:mb-0 sm:self-start"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-3 w-3 fill-current"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              {trailer.timestampsVerified ? "" : "~"}
              {formatTimecode(row.at)}
            </button>

            <div className="min-w-0">
              <p className="font-semibold text-foreground">{row.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/60">
                {row.look}
              </p>
              {row.mapHref && row.regionName ? (
                <Link
                  href={row.mapHref}
                  className="mt-2 inline-block text-sm text-accent underline hover:text-accent/80"
                >
                  {row.regionName} — {copy.mapLinkLabel}
                </Link>
              ) : (
                <p className="mt-2 text-xs uppercase tracking-wide text-foreground/30">
                  {copy.noHubLabel}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
