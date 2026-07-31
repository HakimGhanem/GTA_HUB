import type { MetadataRoute } from "next";
import { COLLECTIBLE_TYPES } from "@/data/collectibles";
import { GUIDES } from "@/data/guides";
import { getAllLocations } from "@/data/all-locations";
import { locales } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import { getIndexableLocations } from "@/lib/location-indexing";

type SitemapOptions = Omit<MetadataRoute.Sitemap[number], "url" | "alternates">;

function hreflangAlternates(path: string) {
  const suffix = path === "/" ? "" : path;
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${SITE.url}/${locale}${suffix}`]),
  ) as Record<string, string>;
  languages["x-default"] = `${SITE.url}/en${suffix}`;
  return { languages };
}

function localizedEntries(
  path: string,
  options: SitemapOptions,
): MetadataRoute.Sitemap {
  const suffix = path === "/" ? "" : path;
  return locales.map((locale) => ({
    url: `${SITE.url}/${locale}${suffix}`,
    alternates: hreflangAlternates(path),
    ...options,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = ["", "/map", "/locations", "/collectibles", "/guides", "/privacy"];
  const staticPages = staticPaths.flatMap((path) =>
    localizedEntries(path, {
      lastModified: now,
      changeFrequency: path === "" || path === "/map" ? "daily" : path === "/privacy" ? "monthly" : path === "/collectibles" || path === "/guides" ? "weekly" : "daily",
      priority: path === "" ? 1 : path === "/map" ? 0.95 : path === "/privacy" ? 0.3 : 0.85,
    }),
  );

  const locationPages = getIndexableLocations(getAllLocations()).flatMap((loc) =>
    localizedEntries(`/locations/${loc.slug}`, {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const collectiblePages = COLLECTIBLE_TYPES.flatMap((t) =>
    localizedEntries(`/collectibles/${t.slug}`, {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    }),
  );

  const guidePages = GUIDES.flatMap((g) =>
    localizedEntries(`/guides/${g.slug}`, {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [...staticPages, ...locationPages, ...collectiblePages, ...guidePages];
}
