"use client";

import { formatNumber } from "@/lib/format";
import type { LiveStream } from "@/lib/twitch/directory";
import { channelUrl, thumbnailUrl } from "@/lib/twitch/embed";

function uptime(startedAt: string): string {
  const minutes = Math.max(
    0,
    Math.floor((Date.now() - new Date(startedAt).getTime()) / 60000),
  );
  if (minutes < 60) return `${minutes}m`;
  return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, "0")}`;
}

type Props = {
  stream: LiveStream;
  bust: string;
  active: boolean;
  /** Mobile browsers cannot run the Twitch iframe, so they link out instead. */
  deepLink: boolean;
  onSelect: (stream: LiveStream) => void;
};

export function LiveCard({ stream, bust, active, deepLink, onSelect }: Props) {
  const body = (
    <>
      <span className="relative block aspect-video overflow-hidden rounded-lg bg-foreground/10">
        {/* eslint-disable-next-line @next/next/no-img-element -- Twitch previews rotate every few minutes; running them through the optimizer would cache a stale frame and bill transforms for nothing */}
        <img
          src={thumbnailUrl(stream.thumbnailTemplate, 440, 248, bust)}
          alt=""
          loading="lazy"
          width={440}
          height={248}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          Live
        </span>
        {/* Uptime is derived from the clock, so server and client can land a
            minute apart on the same payload. */}
        <span
          suppressHydrationWarning
          className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white"
        >
          {formatNumber(stream.viewers)} · {uptime(stream.startedAt)}
        </span>
      </span>

      <span className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className="text-sm font-semibold text-foreground">
          {stream.displayName}
        </span>
        {stream.featured ? (
          <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-pink-300">
            Map-6 partner
          </span>
        ) : null}
        {stream.isMature ? (
          <span
            className="rounded-full border border-foreground/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/50"
            title="The broadcaster flagged this stream as intended for mature audiences."
          >
            18+
          </span>
        ) : null}
      </span>

      <span className="mt-1 line-clamp-2 block text-xs text-foreground/60">
        {stream.title}
      </span>
      <span className="mt-1 block text-[11px] uppercase tracking-wide text-foreground/40">
        {stream.game} · {stream.language}
      </span>
    </>
  );

  const className = [
    "block rounded-xl border p-2 text-left transition",
    active
      ? "border-pink-400/60 bg-pink-500/10"
      : "border-foreground/10 hover:border-foreground/25 hover:bg-foreground/5",
  ].join(" ");

  if (deepLink) {
    return (
      <a
        href={channelUrl(stream.login)}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {body}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => onSelect(stream)} className={className}>
      {body}
    </button>
  );
}
