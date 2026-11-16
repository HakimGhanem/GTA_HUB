import type { MetadataRoute } from "next";
import { COLLECTIBLE_TYPES } from "@/data/collectibles";
import { GUIDES } from "@/data/guides";
import { MAP_CONTENT_UPDATED_AT } from "@/data/map-faq";
import { getAllLocations } from "@/data/all-locations";
import {
  guideHreflangLocales,
  hasGuideTranslation,
} from "@/data/guides-i18n";
import { ATTRIBUTIONS_LOCALES } from "@/data/attributions-i18n";
import { trailerHreflangLocales } from "@/data/trailer-i18n";
import {
  filterIndexableLocales,
  INDEXABLE_LOCALES,
} from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import { isIndexableNewsArticle } from "@/lib/content/news-canonical";
import { listArticles } from "@/lib/content/repository";
import { getIndexableLocations } from "@/lib/location-indexing";
import {
  REAL_LIFE_UPDATED_AT,
  getLocalityPages,
  getSubtypePages,
  localitySlug,
  subtypeSlug,
} from "@/lib/real-world-matches";

/**
 * Cloud Run has no shared ISR cache. A static sitemap is baked into the
 * image at build, so cron-published news never appears until the next
 * deploy. Render on each request and read Firestore.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

type SitemapOptions = Omit<MetadataRoute.Sitemap[number], "url" | "alternates">;

/** Last real content change for pages that are not news/guides. */
const SITE_UPDATED = new Date("2026-10-26T14:00:00.000Z");
const MAP_UPDATED = new Date(MAP_CONTENT_UPDATED_AT);
const PRO_UPDATED = new Date("2026-10-19T12:00:00.000Z");
const PRIVACY_UPDATED = new Date("2026-08-02T00:00:00.000Z");
const REAL_LIFE_UPDATED = new Date(REAL_LIFE_UPDATED_AT);
const LAUNCH_GUIDE_SLUGS = new Set([
  "gta-6-release-time",
  "gta-6-preload",
  "gta-6-file-size",
]);
const LAUNCH_GUIDE_UPDATED = new Date("2026-10-19T12:00:00.000Z");

const NOINDEX_PATH = [
  /\/database(?:\/|$)/,
  /\/overlay(?:\/|$)/,
  /\/live(?:\/|$)/,
  /\/pro\/(?:success|restore)/,
  /\/locations\/gtadb-/,
];

function stamp(value: string): Date {
  return new Date(value.includes("T") ? value : `${value}T00:00:00.000Z`);
}

function isSitemapUrl(url: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  const locale = parsed.pathname.split("/")[1] ?? "";
  if (!(INDEXABLE_LOCALES as readonly string[]).includes(locale)) return false;
  if (NOINDEX_PATH.some((re) => re.test(parsed.pathname))) return false;
  if (parsed.pathname.split("/").some((part) => part.startsWith("gtadb-"))) {
    return false;
  }
  return true;
}

function hreflangAlternates(
  path: string,
  localeList: readonly string[] = INDEXABLE_LOCALES,
) {
  const suffix = path === "/" ? "" : path;
  const languages = Object.fromEntries(
    localeList.map((locale) => [locale, `${SITE.url}/${locale}${suffix}`]),
  ) as Record<string, string>;
  const defaultLocale = localeList.includes("en") ? "en" : localeList[0];
  if (defaultLocale) {
    languages["x-default"] = `${SITE.url}/${defaultLocale}${suffix}`;
  }
  return { languages };
}

function localizedEntries(
  path: string,
  options: SitemapOptions,
  localeList: readonly string[] = INDEXABLE_LOCALES,
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
  const indexable = published.filter(isIndexableNewsArticle);

  const localesBySlug = new Map<string, string[]>();
  for (const article of indexable) {
    const list = localesBySlug.get(article.slug) ?? [];
    list.push(article.locale);
    localesBySlug.set(article.slug, list);
  }

  return indexable.map((article) => {
    const localeList = filterIndexableLocales(
      localesBySlug.get(article.slug) ?? [article.locale],
    );
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
    "/gta-6-real-life-locations",
    "/collectibles",
    "/guides",
    "/news",
    "/about",
    "/press",
    "/updates",
    "/contact",
    "/privacy",
  ];

  /**
   * Shipped with English copy only. Listing the six locale variants would put
   * five duplicates of the same text in the index, so they stay out of the
   * sitemap and canonicalise to `/en` until the copy is translated.
   * /database stays noindex (thin). /pro is English-only checkout copy.
   */
  const englishOnlyPaths = ["/maps/gta5", "/creators", "/pro"];

  const staticPages = staticPaths.flatMap((path) =>
    localizedEntries(path, {
      lastModified:
        path === "/map"
          ? MAP_UPDATED
          : path === "/guides"
            ? LAUNCH_GUIDE_UPDATED
            : path === "/gta-6-real-life-locations" || path === "/updates"
              ? REAL_LIFE_UPDATED
              : path === "/privacy"
                ? PRIVACY_UPDATED
                : SITE_UPDATED,
      changeFrequency:
        path === "" || path === "/map" || path === "/news"
          ? "daily"
          : path === "/privacy" ||
              path === "/about" ||
              path === "/press" ||
              path === "/contact"
            ? "monthly"
            : path === "/collectibles" || path === "/guides"
              ? "weekly"
              : "daily",
      priority:
        path === ""
          ? 1
          : path === "/map"
            ? 0.95
            : path === "/privacy" || path === "/about" || path === "/contact"
              ? 0.35
              : path === "/press"
                ? 0.55
                : 0.85,
    }),
  );

  const englishOnlyPages = englishOnlyPaths.flatMap((path) =>
    localizedEntries(
      path,
      {
        lastModified: path === "/pro" ? PRO_UPDATED : SITE_UPDATED,
        changeFrequency: "daily",
        priority: path === "/pro" ? 0.8 : 0.85,
      },
      ["en"],
    ),
  );

  // Trailer scrub page: only the locales with dedicated copy — the rest are
  // noindex fallbacks to EN.
  const trailerPages = localizedEntries(
    "/trailer",
    { lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    filterIndexableLocales(trailerHreflangLocales()),
  );

  const attributionPages = localizedEntries(
    "/attributions",
    { lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.4 },
    ATTRIBUTIONS_LOCALES,
  );

  const locationPages = getIndexableLocations(getAllLocations())
    .filter((loc) => !loc.slug.startsWith("gtadb-"))
    .flatMap((loc) =>
      localizedEntries(`/locations/${loc.slug}`, {
        lastModified: SITE_UPDATED,
        changeFrequency: "weekly",
        priority: 0.7,
      }),
    );

  const realWorldLocalityPages = getLocalityPages().flatMap((group) =>
    localizedEntries(`/gta-6-real-life-locations/${localitySlug(group.region)}`, {
      lastModified: REAL_LIFE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const realWorldSubtypePages = getSubtypePages().flatMap((group) =>
    localizedEntries(
      `/gta-6-real-life-locations/type/${subtypeSlug(group.subtype)}`,
      {
        lastModified: REAL_LIFE_UPDATED,
        changeFrequency: "monthly",
        priority: 0.7,
      },
    ),
  );

  const collectiblePages = COLLECTIBLE_TYPES.flatMap((t) =>
    localizedEntries(`/collectibles/${t.slug}`, {
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.75,
    }),
  );

  const guidePages = GUIDES.flatMap((g) => {
    const localeList = filterIndexableLocales(guideHreflangLocales(g.slug));
    const lastModified = g.updatedAt
      ? stamp(g.updatedAt)
      : LAUNCH_GUIDE_SLUGS.has(g.slug)
        ? LAUNCH_GUIDE_UPDATED
        : stamp(g.publishedAt);
    return localeList
      .filter((locale) => hasGuideTranslation(g.slug, locale))
      .map((locale) => ({
        url: `${SITE.url}/${locale}/guides/${g.slug}`,
        lastModified,
        changeFrequency: LAUNCH_GUIDE_SLUGS.has(g.slug)
          ? ("weekly" as const)
          : ("monthly" as const),
        priority: LAUNCH_GUIDE_SLUGS.has(g.slug) ? 0.9 : 0.8,
        alternates: hreflangAlternates(`/guides/${g.slug}`, localeList),
      }));
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
    ...realWorldLocalityPages,
    ...realWorldSubtypePages,
    ...collectiblePages,
    ...guidePages,
    ...newsPages,
  ].filter((entry) => isSitemapUrl(entry.url));
}
