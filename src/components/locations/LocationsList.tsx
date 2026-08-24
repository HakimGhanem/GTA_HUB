"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { LocationCard } from "@/components/locations/LocationCard";
import { getAllLocations } from "@/data/all-locations";
import { getIndexableLocations } from "@/lib/location-indexing";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const PAGE_SIZE = 24;

export function LocationsList() {
  const t = useTranslations("locations");
  const all = useMemo(
    () => getIndexableLocations(getAllLocations()),
    [],
  );
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.region.toLowerCase().includes(q) ||
        loc.description.toLowerCase().includes(q),
    );
  }, [all, debouncedQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const slice = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
      <div className="mb-6">
        <label htmlFor="locations-search" className="sr-only">
          {t("searchLabel")}
        </label>
        <input
          id="locations-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder={t("searchPlaceholder")}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-pink-400/50 focus:outline-none focus:ring-1 focus:ring-pink-400/50"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {slice.map((loc) => (
          <LocationCard key={loc.slug} location={loc} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm disabled:opacity-30"
          >
            ←
          </button>
          <span className="text-sm text-white/50">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm disabled:opacity-30"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
