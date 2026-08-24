"use client";

import clsx from "clsx";
import type { LocationCategory } from "@/data/locations";
import {
  ALL_CATEGORIES,
  CATEGORY_COLORS,
} from "@/lib/map-filters";
import { getCategoryLabel } from "@/lib/location-display";
import { useTranslations } from "next-intl";

type MapLegendProps = {
  activeCategories: Set<LocationCategory>;
  className?: string;
};

export function MapLegend({ activeCategories, className }: MapLegendProps) {
  const t = useTranslations();
  const visible = ALL_CATEGORIES.filter((cat) => activeCategories.has(cat));
  if (visible.length === 0) return null;

  return (
    <div
      className={clsx(
        "pointer-events-auto rounded-lg border border-white/10 bg-black/75 px-3 py-2.5 backdrop-blur-md",
        className,
      )}
      aria-label={t("map.legend")}
    >
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/50">
        {t("map.legend")}
      </p>
      <ul className="space-y-1.5">
        {visible.map((cat) => (
          <li key={cat} className="flex items-center gap-2 text-xs text-white/90">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-white/30"
              style={{ backgroundColor: CATEGORY_COLORS[cat] }}
            />
            {getCategoryLabel(cat, t)}
          </li>
        ))}
      </ul>
    </div>
  );
}
