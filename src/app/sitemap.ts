import type { MetadataRoute } from "next";
import { COLLECTIBLE_TYPES } from "@/data/collectibles";
import { GUIDES } from "@/data/guides";
import { getAllLocations } from "@/data/all-locations";
import { locales } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import { listPublishedArticles } from "@/lib/content/repository";
import { getIndexableLocations } from "@/lib/location-indexing";
import {
  HUB_KIND_PARAMS,
  getEntitiesByParam,
} from "@/data/hub";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPaths = [
    "",
    "/map",
    "/locations",
    "/collectibles",
    "/guides",
    "/news",
    "/database",
    "/maps/gta5",
    "/creators",
    "/pro",
    "/about",
    "/privacy",
  ];
  const staticPages = staticPaths.flatMap((path) =>
    localizedEntries(path, {
      lastModified: now,
      changeFrequency:
        path === "" || path === "/map" || path === "/news"
          ? "daily"
          : path === "/privacy" || path === "/about"
            ? "monthly"
            : path === "/collectibles" || path === "/guides"
              ? "weekly"
              : "daily",
      priority:
        path === ""
          ? 1
          : path === "/map"
            ? 0.95
            : path === "/privacy" || path === "/about"
              ? 0.35
              : 0.85,
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

  const databaseKindPages = HUB_KIND_PARAMS.flatMap((kind) =>
    localizedEntries(`/database/${kind}`, {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const databaseEntityPages = HUB_KIND_PARAMS.flatMap((kind) =>
    getEntitiesByParam(kind).flatMap((entity) =>
      localizedEntries(`/database/${kind}/${entity.slug}`, {
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.65,
      }),
    ),
  );

  // News: published only; lastModified from article.updatedAt
  // EN primary in MVP — still emit locale variants for hreflang consistency
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const published = await listPublishedArticles("en");
    newsPages = published.flatMap((article) =>
      locales.map((locale) => ({
        url: `${SITE.url}/${locale}/news/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.publishedAt || now),
        changeFrequency: "daily" as const,
        priority: 0.85,
        alternates: hreflangAlternates(`/news/${article.slug}`),
      })),
    );
  } catch {
    newsPages = [];
  }

  return [
    ...staticPages,
    ...locationPages,
    ...collectiblePages,
    ...guidePages,
    ...databaseKindPages,
    ...databaseEntityPages,
    ...newsPages,
  ];
}
