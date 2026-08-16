import { Link } from "@/i18n/navigation";
import type { Location } from "@/data/all-locations";
import { CATEGORY_COLORS } from "@/lib/map-filters";

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
};

export function LocationPopup({ location, onClose }: LocationPopupProps) {
  return (
    <div className="min-w-[200px] max-w-[260px] p-1">
      <div className="mb-1 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: CATEGORY_COLORS[location.category] }}
        />
        <span className="text-xs font-medium text-pink-400">
          {CATEGORY_LABELS[location.category]}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900">{location.name}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-gray-600">{location.description}</p>
      <p className="mt-2 font-mono text-[10px] text-gray-400">
        {location.region} · X: {location.x}, Y: {location.y}
      </p>
      <div className="mt-3 flex gap-2">
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
