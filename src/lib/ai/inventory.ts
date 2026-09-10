/**
 * Citable-page inventory for AI surfaces (llms.txt, llms-full.txt, markdown
 * mirrors). Reads the same sources as `sitemap.ts` so a new guide, hub or
 * collectible type shows up for AI crawlers without a second edit.
 */
import { getAllLocations } from "@/data/all-locations";
import { COLLECTIBLE_TYPES } from "@/data/collectibles";
import { COLLECTIBLE_TYPE_SEO } from "@/data/collectibles-seo";
import { GUIDE_HUBS, type GuideHubId } from "@/data/guide-hubs";
import { GUIDES } from "@/data/guides";
import { getLocalizedGuide, hasGuideTranslation } from "@/data/guides-i18n";
import { getRegionalLocationSeo } from "@/data/location-seo-content";
import { getLocationDescription } from "@/data/locations-i18n";
import { SITE } from "@/lib/constants";
import { getIndexableLocations } from "@/lib/location-indexing";

export type AiEntry = {
  title: string;
  /** Absolute canonical URL. */
  url: string;
  summary: string;
};

export type AiSection = {
  heading: string;
  entries: AiEntry[];
};

const HUB_HEADINGS: Record<GuideHubId, string> = {
  map: "Guides — map & exploration",
  buy: "Guides — buying, editions & pricing",
  world: "Guides — world, story & characters",
  prep: "Guides — setup, release & safety",
};

export function aiPageUrl(locale: string, path = ""): string {
  const suffix = path === "/" ? "" : path;
  return `${SITE.url}/${locale}${suffix}`;
}

/** Collapse a paragraph to a single citable sentence, capped for readability. */
export function firstSentence(text: string, maxLength = 240): string {
  const flat = text.replace(/\s+/g, " ").trim();
  const stop = flat.search(/\.\s|\.$/);
  const sentence = stop > 40 ? flat.slice(0, stop + 1) : flat;
  if (sentence.length <= maxLength) return sentence;
  return `${sentence.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Locale a guide should be cited in: its own when it has unique copy, English
 * otherwise — mirrors the canonical chosen in `generateMetadata`.
 */
export function guideCanonicalLocale(slug: string, locale: string): string {
  return hasGuideTranslation(slug, locale) ? locale : "en";
}

export function guideSections(locale: string): AiSection[] {
  const grouped = new Map<string, AiEntry[]>();
  const hubBySlug = new Map<string, GuideHubId>();
  for (const hub of GUIDE_HUBS) {
    for (const slug of hub.slugs) hubBySlug.set(slug, hub.id);
  }

  for (const guide of GUIDES) {
    const localized = getLocalizedGuide(guide.slug, locale);
    if (!localized) continue;

    const hubId = hubBySlug.get(guide.slug);
    const heading = hubId ? HUB_HEADINGS[hubId] : "Guides — other";
    const entries = grouped.get(heading) ?? [];
    entries.push({
      title: localized.title,
      url: aiPageUrl(
        guideCanonicalLocale(guide.slug, locale),
        `/guides/${guide.slug}`,
      ),
      summary: firstSentence(localized.answer ?? localized.description),
    });
    grouped.set(heading, entries);
  }

  const order = [...GUIDE_HUBS.map((h) => HUB_HEADINGS[h.id]), "Guides — other"];
  return order
    .filter((heading) => grouped.has(heading))
    .map((heading) => ({ heading, entries: grouped.get(heading)! }));
}

export function locationEntries(locale: string): AiEntry[] {
  return getIndexableLocations(getAllLocations()).map((location) => {
    const seo = getRegionalLocationSeo(location.slug, locale);
    return {
      title: location.name,
      url: aiPageUrl(locale, `/locations/${location.slug}`),
      summary: firstSentence(
        seo?.schemaDescription ?? getLocationDescription(location, locale),
      ),
    };
  });
}

export function collectibleEntries(locale: string): AiEntry[] {
  return COLLECTIBLE_TYPES.map((type) => ({
    title: `${type.name} (~${type.total} expected)`,
    url: aiPageUrl(locale, `/collectibles/${type.slug}`),
    summary: firstSentence(
      COLLECTIBLE_TYPE_SEO[type.slug]?.metaDescription ?? type.description,
    ),
  }));
}

export function corePageEntries(locale: string): AiEntry[] {
  return [
    {
      title: "Interactive GTA 6 map",
      url: aiPageUrl(locale, "/map"),
      summary:
        "1400+ community-mapped points of interest across Leonida with category filters, in-game coordinate readout, distance measurement and shareable deep links. Also serves GTA 5 (?game=gta5) and San Andreas (?game=sa).",
    },
    {
      title: "Locations index",
      url: aiPageUrl(locale, "/locations"),
      summary:
        "Regional hubs for Vice City, Ocean Drive, Leonida Keys, Port Gellhorn, Grassrivers, Ambrosia Island and Mount Kalaga.",
    },
    {
      title: "Collectibles index",
      url: aiPageUrl(locale, "/collectibles"),
      summary:
        "Hidden packages, stunt jumps, street art and wildlife photography — expected loops and tracking method, counts unconfirmed until launch.",
    },
    {
      title: "Guides index",
      url: aiPageUrl(locale, "/guides"),
      summary:
        "Editorial guides on the map, pre-ordering, editions, hardware, story and release timing.",
    },
    {
      title: "News",
      url: aiPageUrl(locale, "/news"),
      summary:
        "GTA 6 trailer, map and pre-order news, sourced and dated.",
    },
    {
      title: "About Map-6",
      url: aiPageUrl(locale, "/about"),
      summary:
        "Who runs Map-6, editorial standards, and the fan-project disclosure.",
    },
  ];
}
