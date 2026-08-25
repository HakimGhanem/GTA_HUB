"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Location } from "@/data/locations";
import {
  getConfidenceBadgeStyle,
  resolveConfidence,
} from "@/lib/location-confidence";
import { getConfidenceLabel } from "@/lib/location-display";

const CATEGORY_LABELS: Record<Location["category"], string> = {
  landmark: "Landmark",
  collectible: "Collectible",
  shop: "Shop",
  mission: "Mission",
  secret: "Secret",
};

type LocationCardProps = {
  location: Location;
};

export function LocationCard({ location }: LocationCardProps) {
  const t = useTranslations();
  const confidence = resolveConfidence(location);

  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group block rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-pink-400/40 hover:bg-white/10"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-white group-hover:text-pink-300">
          {location.name}
        </h3>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
            {CATEGORY_LABELS[location.category]}
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-white/15"
            style={getConfidenceBadgeStyle(confidence)}
          >
            {getConfidenceLabel(confidence, t)}
          </span>
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-white/60">{location.description}</p>
      <p className="mt-3 font-mono text-xs text-white/40">
        {location.region} · X: {location.x}, Y: {location.y}
      </p>
    </Link>
  );
}
