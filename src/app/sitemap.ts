import type { MetadataRoute } from "next";
import { COLLECTIBLE_TYPES } from "@/data/collectibles";
import { GUIDES } from "@/data/guides";
import { getAllLocations } from "@/data/all-locations";
import {
  guideHreflangLocales,
  hasGuideTranslation,
} from "@/data/guides-i18n";
import { ATTRIBUTIONS_LOCALES } from "@/data/attributions-i18n";
import { trailerHreflangLocales } from "@/data/trailer-i18n";
import { locales } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import { evergreenPathForNews } from "@/lib/content/news-canonical";
import { listArticles } from "@/lib/content/repository";
import { getIndexableLocations } from "@/lib/location-indexing";
import {
  HUB_KIND_PARAMS,
  getEntitiesByParam,
} from "@/data/hub";
import {
  hubKindLocales,
  isIndexableKind,
} from "@/data/hub/kind-content";

type SitemapOptions = Omit<MetadataRoute.Sitemap[number], "url" | "alternates">;

function hreflangAlternates(path: string, localeList: readonly string[] = locales) {
  const suffix = path === "/" ? "" : path;
  const languages = Object.fromEntries(
    localeList.map((locale) => [locale, `${SITE.url}/${locale}${suffix}`]),
  ) as Record<string, string>;
  languages["x-default"] = `${SITE.url}/en${suffix}`;
  return { languages };
}

function localizedEntries(
  path: string,
  options: SitemapOptions,
  localeList: readonly string[] = locales,
): MetadataRoute.Sitemap {
  const suffix = path === "/" ? "" : path;
  return localeList.map((locale) => ({
    url: `${SITE.url}/${locale}${suffix}`,
    alternates: hreflangAlternates(path, localeList),
    ...options,
  }));
}

async function newsSitemapEntries(
  now: Date,
): Promise<MetadataRoute.Sitemap> {
  const published = await listArticles({ status: "published" });
  const indexable = published.filter(
    (article) => !evergreenPathForNews(article.slug),
  );

  const localesBySlug = new Map<string, string[]>();
  for (const article of indexable) {
    const list = localesBySlug.get(article.slug) ?? [];
    list.push(article.locale);
    localesBySlug.set(article.slug, list);
  }

  return indexable.map((article) => {
    const localeList = localesBySlug.get(article.slug) ?? [article.locale];
    return {
      url: `${SITE.url}/${article.locale}/news/${article.slug}`,
      lastModified: new Date(
        article.updatedAt || article.publishedAt || now,
      ),
      changeFrequency: "daily" as const,
      priority: 0.85,
      alternates: hreflangAlternates(`/news/${article.slug}`, localeList),
    };
  });
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
    "/about",
    "/privacy",
  ];

  /**
   * Shipped with English copy only. Listing the six locale variants would put
   * five duplicates of the same text in the index, so they stay out of the
   * sitemap and canonicalise to `/en` until the copy is translated.
   */
  const englishOnlyPaths = ["/database", "/maps/gta5", "/creators", "/pro"];

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

  const englishOnlyPages = englishOnlyPaths.flatMap((path) =>
    localizedEntries(
      path,
      { lastModified: now, changeFrequency: "daily", priority: 0.85 },
      ["en"],
    ),
  );

  // Trailer scrub page: only the locales with dedicated copy — the rest are
  // noindex fallbacks to EN.
  const trailerPages = localizedEntries(
    "/trailer",
    { lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    trailerHreflangLocales(),
  );

  const attributionPages = localizedEntries(
    "/attributions",
    { lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    ATTRIBUTIONS_LOCALES,
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

  const guidePages = GUIDES.flatMap((g) => {
    const localeList = guideHreflangLocales(g.slug);
    return localeList
      .filter((locale) => hasGuideTranslation(g.slug, locale))
      .map((locale) => ({
        url: `${SITE.url}/${locale}/guides/${g.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: hreflangAlternates(`/guides/${g.slug}`, localeList),
      }));
  });

  // Only locales with real copy, and only categories worth indexing
  const databaseKindPages = HUB_KIND_PARAMS.filter((kind) =>
    isIndexableKind(kind, getEntitiesByParam(kind).length),
  ).flatMap((kind) => {
    const localeList = hubKindLocales(kind);
    return localeList.map((locale) => ({
      url: `${SITE.url}/${locale}/database/${kind}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: hreflangAlternates(`/database/${kind}`, localeList),
    }));
  });

  const databaseEntityPages = HUB_KIND_PARAMS.flatMap((kind) => {
    const localeList = hubKindLocales(kind);
    return getEntitiesByParam(kind).flatMap((entity) =>
      localeList.map((locale) => ({
        url: `${SITE.url}/${locale}/database/${kind}/${entity.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.65,
        alternates: hreflangAlternates(`/database/${kind}/${entity.slug}`, localeList),
      })),
    );
  });

  // News: published only; lastModified from article.updatedAt
  // EN primary in MVP — still emit locale variants for hreflang consistency
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    newsPages = await newsSitemapEntries(now);
  } catch {
    newsPages = [];
  }

  return [
    ...staticPages,
    ...englishOnlyPages,
    ...trailerPages,
    ...attributionPages,
    ...locationPages,
    ...collectiblePages,
    ...guidePages,
    ...databaseKindPages,
    ...databaseEntityPages,
    ...newsPages,
  ];
}
