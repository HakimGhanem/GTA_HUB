"use client";

import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import type { Location, LocationCategory } from "@/data/locations";
import { formatNumber } from "@/lib/format";
import {
  ALL_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type MapFilters,
} from "@/lib/map-filters";

export const SIDEBAR_LIST_LIMIT = 80;

type MapSidebarProps = {
  locations: Location[];
  totalCount: number;
  filters: MapFilters;
  onFiltersChange: (filters: MapFilters) => void;
  onFocus: (loc: Location) => void;
  onClose?: () => void;
  activeSlug?: string;
  className?: string;
  /** When true, list is scoped to current map viewport */
  viewportMode?: boolean;
};

export function MapSidebar({
  locations,
  totalCount,
  filters,
  onFiltersChange,
  onFocus,
  onClose,
  activeSlug,
  className,
  viewportMode = false,
}: MapSidebarProps) {
  const visible = locations.slice(0, SIDEBAR_LIST_LIMIT);
  const isTruncated = locations.length > SIDEBAR_LIST_LIMIT;
  const hasQuery = filters.query.trim().length > 0;

  function toggleCategory(cat: LocationCategory) {
    const next = new Set(filters.categories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    onFiltersChange({ ...filters, categories: next });
  }

  function selectAllCategories() {
    onFiltersChange({ ...filters, categories: new Set(ALL_CATEGORIES) });
  }

  function clearCategories() {
    onFiltersChange({ ...filters, categories: new Set() });
  }

  return (
    <aside
      className={clsx(
        "flex h-full w-full max-w-sm shrink-0 flex-col border-r border-white/10 bg-[#0d1220]/98 backdrop-blur-md md:w-80",
        className,
      )}
      aria-label="Location database"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-pink-400">
            Database
          </h2>
          <p className="text-xs text-white/40">{formatNumber(totalCount)} total POIs</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-white/50 hover:text-white md:hidden"
            aria-label="Close panel"
          >
            ✕
          </button>
        )}
      </div>

      <div className="border-b border-white/10 p-4">
        <label htmlFor="map-search" className="sr-only">
          Search locations
        </label>
        <input
          id="map-search"
          type="search"
          placeholder="Search by name or region…"
          value={filters.query}
          onChange={(e) => onFiltersChange({ ...filters, query: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-400/20"
          autoComplete="off"
        />
      </div>

      <div className="border-b border-white/10 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-white/50">
            Categories
          </p>
          <div className="flex gap-2 text-[10px]">
            <button
              type="button"
              onClick={selectAllCategories}
              className="text-pink-400 hover:text-pink-300"
            >
              All
            </button>
            <button
              type="button"
              onClick={clearCategories}
              className="text-white/40 hover:text-white/70"
            >
              None
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => {
            const active = filters.categories.has(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                aria-pressed={active}
                className={clsx(
                  "rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/50",
                  active
                    ? "bg-white/15 text-white"
                    : "bg-white/5 text-white/40",
                )}
              >
                <span
                  className="mr-1 inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                />
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <p className="px-2 py-1 text-xs text-white/40">
          {viewportMode && !hasQuery ? "In view · " : ""}
          {formatNumber(locations.length)} match
          {locations.length !== 1 ? "es" : ""}
          {isTruncated && ` · showing ${SIDEBAR_LIST_LIMIT}`}
        </p>

        {locations.length === 0 ? (
          <div className="mx-2 mt-4 rounded-xl border border-dashed border-white/15 p-6 text-center">
            <p className="text-sm text-white/60">No locations match your filters.</p>
            <button
              type="button"
              onClick={() =>
                onFiltersChange({
                  query: "",
                  categories: new Set(ALL_CATEGORIES),
                })
              }
              className="mt-3 text-xs text-pink-400 hover:text-pink-300"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <ul className="space-y-0.5" role="listbox" aria-label="Matching locations">
            {visible.map((loc) => (
              <li key={loc.slug}>
                <button
                  type="button"
                  role="option"
                  aria-selected={activeSlug === loc.slug}
                  onClick={() => {
                    onFocus(loc);
                    onClose?.();
                  }}
                  className={clsx(
                    "w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40",
                    activeSlug === loc.slug && "bg-pink-500/20",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[loc.category] }}
                    />
                    <span className="truncate font-medium text-white">{loc.name}</span>
                  </span>
                  <span className="mt-0.5 block truncate pl-4 text-xs text-white/40">
                    {loc.region}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {!hasQuery && isTruncated && (
          <p className="mx-2 mt-3 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/50">
            {viewportMode
              ? "Pan or zoom the map, or search to find specific locations."
              : `Search to browse all ${formatNumber(totalCount)} locations.`}
          </p>
        )}
      </div>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/locations"
          className="block text-center text-xs text-pink-400 hover:text-pink-300"
        >
          Browse all locations →
        </Link>
      </div>
    </aside>
  );
}
