"use client";

import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import type { Location, LocationCategory } from "@/data/locations";
import { formatNumber } from "@/lib/format";
import {
  ALL_CATEGORIES,
  CATEGORY_COLORS,
  countByCategory,
  listSubtypes,
  type FoundFilter,
  type MapFilters,
} from "@/lib/map-filters";
import {
  getCategoryLabel,
  getLocationDisplayName,
  getSubtypeLabel,
} from "@/lib/location-display";
import { useTranslations } from "next-intl";

export const SIDEBAR_LIST_LIMIT = 80;

type MapSidebarProps = {
  locations: Location[];
  /** Unfiltered game locations — for category counts */
  allLocations: Location[];
  totalCount: number;
  filters: MapFilters;
  onFiltersChange: (filters: MapFilters) => void;
  onFocus: (loc: Location) => void;
  onClose?: () => void;
  activeSlug?: string;
  className?: string;
  viewportMode?: boolean;
  foundCount?: number;
  isFound?: (slug: string) => boolean;
  onToggleFound?: (slug: string) => void;
  onClearProgress?: () => void;
};

export function MapSidebar({
  locations,
  allLocations,
  totalCount,
  filters,
  onFiltersChange,
  onFocus,
  onClose,
  activeSlug,
  className,
  viewportMode = false,
  foundCount = 0,
  isFound,
  onToggleFound,
  onClearProgress,
}: MapSidebarProps) {
  const t = useTranslations();
  const visible = locations.slice(0, SIDEBAR_LIST_LIMIT);
  const isTruncated = locations.length > SIDEBAR_LIST_LIMIT;
  const hasQuery = filters.query.trim().length > 0;
  const categoryCounts = countByCategory(allLocations);
  const subtypes = listSubtypes(allLocations);
  const progressPct =
    totalCount > 0 ? Math.min(100, Math.round((foundCount / totalCount) * 100)) : 0;

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

  function setFoundFilter(foundFilter: FoundFilter) {
    onFiltersChange({ ...filters, foundFilter });
  }

  function toggleSubtype(sub: string) {
    const next = new Set(filters.subtypes);
    if (next.has(sub)) next.delete(sub);
    else next.add(sub);
    onFiltersChange({ ...filters, subtypes: next });
  }

  function clearSubtypes() {
    onFiltersChange({ ...filters, subtypes: new Set() });
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

      <div className="border-b border-white/10 px-4 py-3">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-white/50">Progress</span>
          <span className="font-mono text-white/70">
            {formatNumber(foundCount)}/{formatNumber(totalCount)} · {progressPct}%
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-400 transition-[width]"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(
            [
              ["all", t("map.sidebar.foundFilterAll")],
              ["hide_found", t("map.sidebar.foundFilterHide")],
              ["found_only", t("map.sidebar.foundFilterOnly")],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFoundFilter(id)}
              className={clsx(
                "rounded-full px-2 py-0.5 text-[10px] font-medium",
                filters.foundFilter === id
                  ? "bg-emerald-500/30 text-emerald-200"
                  : "bg-white/5 text-white/40 hover:text-white/70",
              )}
            >
              {label}
            </button>
          ))}
          {foundCount > 0 && onClearProgress && (
            <button
              type="button"
              onClick={onClearProgress}
              className="rounded-full px-2 py-0.5 text-[10px] text-white/30 hover:text-red-300"
            >
              Reset
            </button>
          )}
        </div>
        <p className="mt-1.5 text-[10px] text-white/30">
          Saved in this browser · unlimited (no PRO cap)
        </p>
      </div>

      <div className="border-b border-white/10 p-4">
        <label htmlFor="map-search" className="sr-only">
          Search locations
        </label>
        <input
          id="map-search"
          type="search"
          placeholder={t("map.sidebar.searchPlaceholder")}
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
        <div className="flex flex-col gap-1">
          {ALL_CATEGORIES.map((cat) => {
            const active = filters.categories.has(cat);
            const count = categoryCounts[cat] ?? 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                aria-pressed={active}
                className={clsx(
                  "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/50",
                  active
                    ? "bg-white/15 text-white"
                    : "bg-white/5 text-white/40",
                )}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                  />
                  {getCategoryLabel(cat, t)}
                </span>
                <span className="font-mono text-white/40">{formatNumber(count)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {subtypes.length > 0 && (
        <div className="border-b border-white/10 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-white/50">
              Subtypes
            </p>
            <button
              type="button"
              onClick={clearSubtypes}
              className="text-[10px] text-white/40 hover:text-white/70"
            >
              Any
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {subtypes.map((sub) => {
              const active = filters.subtypes.has(sub);
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => toggleSubtype(sub)}
                  className={clsx(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium",
                    active
                      ? "bg-amber-500/30 text-amber-100"
                      : "bg-white/5 text-white/40 hover:text-white/70",
                  )}
                >
                  {getSubtypeLabel(sub, t)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-2">
        <p className="px-2 py-1 text-xs text-white/40">
          {viewportMode && !hasQuery ? "In view · " : ""}
          {formatNumber(locations.length)} match
          {locations.length !== 1 ? "es" : ""}
          {isTruncated && ` · showing ${SIDEBAR_LIST_LIMIT}`}
        </p>

        {locations.length === 0 ? (
          <div className="mx-2 mt-4 rounded-xl border border-dashed border-white/15 p-6 text-center">
            <p className="text-sm text-white/60">{t("map.sidebar.noResults")}</p>
            <button
              type="button"
              onClick={() =>
                onFiltersChange({
                  query: "",
                  categories: new Set(ALL_CATEGORIES),
                  foundFilter: "all",
                  subtypes: new Set(),
                })
              }
              className="mt-3 text-xs text-pink-400 hover:text-pink-300"
            >
              {t("map.sidebar.resetFilters")}
            </button>
          </div>
        ) : (
          <ul className="space-y-0.5" role="listbox" aria-label="Matching locations">
            {visible.map((loc) => {
              const found = isFound?.(loc.slug) ?? false;
              return (
                <li key={loc.slug}>
                  <div
                    className={clsx(
                      "flex items-stretch gap-0.5 rounded-lg",
                      activeSlug === loc.slug && "bg-pink-500/20",
                    )}
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={activeSlug === loc.slug}
                      onClick={() => {
                        onFocus(loc);
                        onClose?.();
                      }}
                      className="min-w-0 flex-1 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{
                            backgroundColor: CATEGORY_COLORS[loc.category],
                            opacity: found ? 0.35 : 1,
                          }}
                        />
                        <span
                          className={clsx(
                            "truncate font-medium",
                            found ? "text-white/40 line-through" : "text-white",
                          )}
                        >
                          {getLocationDisplayName(loc, t)}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate pl-4 text-xs text-white/40">
                        {loc.region}
                      </span>
                    </button>
                    {onToggleFound && (
                      <button
                        type="button"
                        title={found ? t("map.sidebar.unmarkFound") : t("map.sidebar.markFound")}
                        onClick={() => onToggleFound(loc.slug)}
                        className={clsx(
                          "shrink-0 px-2 text-xs",
                          found ? "text-emerald-400" : "text-white/25 hover:text-white/60",
                        )}
                      >
                        {found ? "✓" : "○"}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {!hasQuery && isTruncated && (
          <p className="mx-2 mt-3 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/50">
            {viewportMode
              ? t("map.sidebar.panHint")
              : t("map.sidebar.searchHint", { count: formatNumber(totalCount) })}
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
