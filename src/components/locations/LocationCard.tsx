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
import {
  formatTrailerStamp,
  getLocationTrailerEvidence,
} from "@/lib/location-evidence";

type LocationCardProps = {
  location: Location;
};

export function LocationCard({ location }: LocationCardProps) {
  const locale = useLocale();
  const t = useTranslations();
  const tLoc = useTranslations("locations");
  const tCategory = useTranslations("map.categories");
  const confidence = resolveConfidence(location);
  const firstHit = getLocationTrailerEvidence(location.slug, locale)[0];

  return (
    <article className="rounded-xl border border-foreground/10 bg-foreground/5 p-5 transition-colors hover:border-pink-400/40 hover:bg-foreground/10">
      <Link href={`/locations/${location.slug}`} className="group block">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground group-hover:text-accent">
            {location.name}
          </h3>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
            <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs text-foreground/60">
              {tCategory(location.category)}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-foreground/15"
              style={getConfidenceBadgeStyle(confidence)}
            >
              {getConfidenceLabel(confidence, t)}
            </span>
            {location.edition === "ultimate" && (
              <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold text-amber-200 ring-1 ring-amber-300/25">
                {t("map.popup.ultimate")}
              </span>
            )}
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-foreground/60">
          {getLocationDescription(location, locale)}
        </p>
        <p className="mt-3 font-mono text-xs text-foreground/40">
          {location.region} · X: {location.x}, Y: {location.y}
          {firstHit ? ` · ${formatTrailerStamp(firstHit)}` : ""}
        </p>
      </Link>
      <Link
        href={`/map?loc=${location.slug}&x=${location.x}&y=${location.y}`}
        className="mt-3 inline-block text-sm font-medium text-accent underline hover:text-accent/80"
      >
        {tLoc("viewOnMap")}
      </Link>
    </article>
  );
}
