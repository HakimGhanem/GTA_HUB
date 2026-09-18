"use client";

import { Link } from "@/i18n/navigation";
import type { Location } from "@/data/all-locations";
import { CATEGORY_COLORS } from "@/lib/map-filters";
import {
  CONFIDENCE_COLORS,
  resolveConfidence,
} from "@/lib/location-confidence";
import {
  formatTrailerEvidenceLine,
  getLocationTrailerEvidence,
} from "@/lib/location-evidence";
import {
  getCategoryLabel,
  getConfidenceLabel,
  getLocationDisplayDescription,
  getLocationDisplayName,
  getSubtypeLabel,
} from "@/lib/location-display";
import { useLocale, useTranslations } from "next-intl";

type LocationPopupProps = {
  location: Location;
  onClose: () => void;
  found?: boolean;
  onToggleFound?: () => void;
};

export function LocationPopup({
  location,
  onClose,
  found = false,
  onToggleFound,
}: LocationPopupProps) {
  const locale = useLocale();
  const t = useTranslations();
  const confidence = resolveConfidence(location);
  const name = getLocationDisplayName(location, t);
  const description = getLocationDisplayDescription(location, t);
  const categoryLabel = getCategoryLabel(location.category, t);
  const subtypeLabel = location.subtype
    ? getSubtypeLabel(location.subtype, t)
    : null;
  const trailerHits = getLocationTrailerEvidence(location.slug, locale);

  return (
    <div className="min-w-[220px] max-w-[280px] p-1">
      <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: CATEGORY_COLORS[location.category] }}
        />
        <span className="text-xs font-medium text-pink-400">
          {categoryLabel}
          {subtypeLabel ? ` · ${subtypeLabel}` : ""}
        </span>
        <span
          className="rounded px-1.5 py-0.5 text-[10px] font-medium text-gray-800"
          style={{ backgroundColor: `${CONFIDENCE_COLORS[confidence]}55` }}
        >
          {getConfidenceLabel(confidence, t)}
        </span>
        {location.edition === "ultimate" && (
          <span className="rounded bg-amber-200 px-1.5 py-0.5 text-[10px] font-semibold text-amber-900">
            {t("map.popup.ultimate")}
          </span>
        )}
      </div>
      <h3 className="text-[15px] font-semibold leading-snug text-gray-900">{name}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{description}</p>
      <p className="mt-2 font-mono text-[10px] text-gray-400">
        {t("map.popup.coords", {
          region: location.region,
          x: location.x,
          y: location.y,
        })}
      </p>
      {(trailerHits.length > 0 || location.sourceUrl) && (
        <ul className="mt-2 space-y-1">
          {trailerHits.map((hit) => (
            <li key={`${hit.trailerSlug}-${hit.at}`}>
              <a
                href={hit.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-pink-600 hover:text-pink-500"
              >
                {t("map.popup.watchTrailer", {
                  stamp: formatTrailerEvidenceLine(hit),
                })}
              </a>
            </li>
          ))}
          {location.sourceUrl && (
            <li>
              <a
                href={location.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-gray-500 underline hover:text-gray-700"
              >
                {t("map.popup.officialSource")}
              </a>
            </li>
          )}
        </ul>
      )}
      {location.edition === "ultimate" && (
        <p className="mt-1.5 text-[10px] leading-snug text-gray-500">
          {t("map.popup.regionalPin")}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {onToggleFound && (
          <button
            type="button"
            onClick={onToggleFound}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              found
                ? "bg-emerald-500 text-white hover:bg-emerald-400"
                : "border border-gray-300 text-gray-800 hover:bg-gray-50"
            }`}
          >
            {found ? t("map.popup.found") : t("map.popup.markFound")}
          </button>
        )}
        <Link
          href={`/locations/${location.slug}`}
          className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white hover:bg-pink-400"
          onClick={onClose}
        >
          {t("map.popup.details")}
        </Link>
        <Link
          href={`/map?loc=${location.slug}&x=${location.x}&y=${location.y}`}
          className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          {t("map.popup.center")}
        </Link>
      </div>
    </div>
  );
}
