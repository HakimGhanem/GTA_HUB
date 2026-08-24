import { Link } from "@/i18n/navigation";
import type { Location } from "@/data/all-locations";
import { CATEGORY_COLORS } from "@/lib/map-filters";
import {
  CONFIDENCE_COLORS,
  CONFIDENCE_LABELS,
  resolveConfidence,
} from "@/lib/location-confidence";

const CATEGORY_LABELS: Record<Location["category"], string> = {
  landmark: "Landmark",
  collectible: "Collectible",
  shop: "Shop",
  mission: "Mission",
  secret: "Secret",
};

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
  const confidence = resolveConfidence(location);

  return (
    <div className="min-w-[200px] max-w-[260px] p-1">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: CATEGORY_COLORS[location.category] }}
        />
        <span className="text-xs font-medium text-pink-400">
          {CATEGORY_LABELS[location.category]}
          {location.subtype ? ` · ${location.subtype}` : ""}
        </span>
        <span
          className="rounded px-1.5 py-0.5 text-[10px] font-medium text-gray-800"
          style={{ backgroundColor: `${CONFIDENCE_COLORS[confidence]}55` }}
        >
          {CONFIDENCE_LABELS[confidence]}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900">{location.name}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-gray-600">{location.description}</p>
      <p className="mt-2 font-mono text-[10px] text-gray-400">
        {location.region} · X: {location.x}, Y: {location.y}
      </p>
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
            {found ? "Found ✓" : "Mark found"}
          </button>
        )}
        <Link
          href={`/locations/${location.slug}`}
          className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white hover:bg-pink-400"
          onClick={onClose}
        >
          Details
        </Link>
        <Link
          href={`/map?loc=${location.slug}&x=${location.x}&y=${location.y}`}
          className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          Center
        </Link>
      </div>
    </div>
  );
}
