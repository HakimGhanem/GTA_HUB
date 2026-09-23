"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics/track";
import {
  MAP_THEMES,
  mapOverlayShareUrl,
  mapShareUrl,
  type MapTheme,
} from "@/lib/map-links";

export type BuilderLocation = {
  slug: string;
  name: string;
  x: number;
  y: number;
};

type Props = {
  locale: string;
  locations: BuilderLocation[];
};

const THEME_HINTS: Record<MapTheme, string> = {
  default: "Calmer labels — talking-head scenes",
  streamer: "Bigger labels — readable on camera",
  neon: "High contrast — shorts and TikTok",
};

function CopyRow({
  label,
  value,
  hint,
  event,
  primary = false,
}: {
  label: string;
  value: string;
  hint?: string;
  event: string;
  primary?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      trackEvent("creator_kit_copy", { share_type: event });
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — the value stays selectable in the field */
    }
  }

  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/45">
          {label}
        </label>
        {hint ? <span className="text-xs text-foreground/35">{hint}</span> : null}
      </div>
      <div className="mt-1.5 flex gap-2">
        <input
          readOnly
          value={value}
          onFocus={(e) => e.currentTarget.select()}
          className="min-w-0 flex-1 rounded-lg border border-foreground/10 bg-black/40 px-3 py-2 font-mono text-xs text-foreground/80"
        />
        <button
          type="button"
          onClick={copy}
          className={
            primary
              ? "shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/85"
              : "shrink-0 rounded-lg border border-foreground/15 px-4 py-2 text-sm font-semibold text-foreground/85 hover:border-foreground/30 hover:text-foreground"
          }
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

/**
 * Assembles the overlay / share / credit strings a streamer needs, instead of
 * documenting the query-string shape and hoping they hand-write it correctly.
 */
export function CreatorLinkBuilder({ locale, locations }: Props) {
  const [slug, setSlug] = useState(locations[0]?.slug ?? "");
  const [theme, setTheme] = useState<MapTheme>("streamer");
  const [handle, setHandle] = useState("");

  const location = useMemo(
    () => locations.find((l) => l.slug === slug) ?? locations[0],
    [locations, slug],
  );

  const urls = useMemo(() => {
    if (!location) return null;
    const opts = {
      slug: location.slug,
      x: location.x,
      y: location.y,
      theme,
      ref: handle || undefined,
      locale,
    };
    return {
      overlay: mapOverlayShareUrl(opts),
      share: mapShareUrl(opts),
    };
  }, [handle, locale, location, theme]);

  if (!location || !urls) return null;

  const credit = `Map: Map-6 — ${urls.share} · fan-made GTA 6 map, basemap GTADB (CC BY 4.0)`;

  return (
    <section className="not-prose my-8 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5">
      <h2 className="text-lg font-semibold text-foreground">Build your links</h2>
      <p className="mt-1 text-sm text-foreground/55">
        Pick a region, a theme, and your handle. Everything below updates as you
        type — no login, nothing stored on our side.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="creator-region"
            className="text-xs font-semibold uppercase tracking-wider text-foreground/45"
          >
            Region
          </label>
          <select
            id="creator-region"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-foreground/10 bg-black/40 px-3 py-2 text-sm text-foreground"
          >
            {locations.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="creator-theme"
            className="text-xs font-semibold uppercase tracking-wider text-foreground/45"
          >
            Theme
          </label>
          <select
            id="creator-theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value as MapTheme)}
            className="mt-1.5 w-full rounded-lg border border-foreground/10 bg-black/40 px-3 py-2 text-sm text-foreground"
          >
            {MAP_THEMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-foreground/35">{THEME_HINTS[theme]}</p>
        </div>

        <div>
          <label
            htmlFor="creator-handle"
            className="text-xs font-semibold uppercase tracking-wider text-foreground/45"
          >
            Your handle
          </label>
          <input
            id="creator-handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="yourhandle"
            spellCheck={false}
            className="mt-1.5 w-full rounded-lg border border-foreground/10 bg-black/40 px-3 py-2 text-sm text-foreground placeholder:text-foreground/25"
          />
          <p className="mt-1 text-xs text-foreground/35">
            Becomes <code>ref=</code>; letters, numbers, - and _ only.
          </p>
        </div>
      </div>

      <CopyRow
        label="OBS / Kick browser source"
        hint="1920×1080, transparent"
        value={urls.overlay}
        event="overlay"
        primary
      />
      <CopyRow
        label="Share link"
        hint="captions, Discord, description"
        value={urls.share}
        event="link"
      />
      <CopyRow
        label="Credit line"
        hint="paste under your clip"
        value={credit}
        event="credit"
      />
    </section>
  );
}
