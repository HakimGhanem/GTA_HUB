import { Link } from "@/i18n/navigation";
import type { Location } from "@/data/locations";

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
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group block rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-pink-400/40 hover:bg-white/10"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-white group-hover:text-pink-300">
          {location.name}
        </h3>
        <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
          {CATEGORY_LABELS[location.category]}
        </span>
      </div>
      <p className="line-clamp-2 text-sm text-white/60">{location.description}</p>
      <p className="mt-3 font-mono text-xs text-white/40">
        {location.region} · X: {location.x}, Y: {location.y}
      </p>
    </Link>
  );
}
