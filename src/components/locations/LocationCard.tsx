"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Location } from "@/data/locations";
import { getLocationDescription } from "@/data/locations-i18n";
import {
  getConfidenceBadgeStyle,
  resolveConfidence,
} from "@/lib/location-confidence";
import { getConfidenceLabel } from "@/lib/location-display";

type LocationCardProps = {
  location: Location;
};

export function LocationCard({ location }: LocationCardProps) {
  const locale = useLocale();
  const t = useTranslations();
  const tLoc = useTranslations("locations");
  const tCategory = useTranslations("map.categories");
  const confidence = resolveConfidence(location);

  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-pink-400/40 hover:bg-white/10">
      <Link href={`/locations/${location.slug}`} className="group block">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="font-semibold text-white group-hover:text-pink-300">
            {location.name}
          </h3>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
              {tCategory(location.category)}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-white/15"
              style={getConfidenceBadgeStyle(confidence)}
            >
              {getConfidenceLabel(confidence, t)}
            </span>
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-white/60">
          {getLocationDescription(location, locale)}
        </p>
        <p className="mt-3 font-mono text-xs text-white/40">
          {location.region} · X: {location.x}, Y: {location.y}
        </p>
      </Link>
      <Link
        href={`/map?loc=${location.slug}&x=${location.x}&y=${location.y}`}
        className="mt-3 inline-block text-sm font-medium text-pink-300 underline hover:text-pink-200"
      >
        {tLoc("viewOnMap")}
      </Link>
    </article>
  );
}
