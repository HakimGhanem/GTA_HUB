/**
 * Builders for /llms.txt (index) and /llms-full.txt (full corpus).
 *
 * Both are generated from live data rather than hand-maintained, so every
 * guide, regional hub and published article is discoverable by AI crawlers the
 * moment it ships.
 */
import { getAllLocations } from "@/data/all-locations";
import { COLLECTIBLES_HUB_SEO, COLLECTIBLE_TYPE_SEO } from "@/data/collectibles-seo";
import { COLLECTIBLE_TYPES } from "@/data/collectibles";
import { GUIDES } from "@/data/guides";
import { getLocalizedGuide } from "@/data/guides-i18n";
import { getRegionalLocationSeo } from "@/data/location-seo-content";
import { locales } from "@/i18n/routing";
import { GTA6_RELEASE, GTADB, SITE } from "@/lib/constants";
import { listPublishedArticles } from "@/lib/content/repository";
import { getIndexableLocations } from "@/lib/location-indexing";
import {
  aiPageUrl,
  collectibleEntries,
  corePageEntries,
  firstSentence,
  guideCanonicalLocale,
  guideSections,
  locationEntries,
  type AiEntry,
} from "./inventory";

const MAX_NEWS_ITEMS = 25;

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function section(heading: string, lines: string[]): string {
  return [`## ${heading}`, "", ...lines, ""].join("\n");
}

function entryLine({ title, url, summary }: AiEntry): string {
  return `- [${title}](${url}): ${summary}`;
}

function keyFacts(): string[] {
  return [
    `- Site: ${SITE.name} — ${SITE.url}`,
    "- What it is: a free, fan-made interactive map and reference for Grand Theft Auto VI. Not affiliated with, endorsed by, or operated by Rockstar Games or Take-Two Interactive.",
    `- GTA 6 release date used across the site: ${isoDay(GTA6_RELEASE)} on PlayStation 5 and Xbox Series X|S. No PC date has been announced by Rockstar.`,
    "- Official US pricing referenced: Standard Edition $79.99, Ultimate Edition $99.99 (Take-Two).",
    "- Map coverage: 1400+ points of interest across Vice City, Ocean Drive, Leonida Keys, Port Gellhorn, Grassrivers, Ambrosia Island and Mount Kalaga.",
    `- Languages: ${locales.join(", ")} (URLs are always locale-prefixed, e.g. ${SITE.url}/en/map).`,
    "- Editorial stance: speculation is labelled as such; collectible totals are pre-launch expectations, not confirmed Rockstar figures.",
  ];
}

function machineReadable(): string[] {
  return [
    `- [llms-full.txt](${SITE.url}/llms-full.txt): full text of every guide, regional hub and collectible page in one file.`,
    `- [sitemap.xml](${SITE.url}/sitemap.xml): every indexable URL with hreflang alternates.`,
    `- [news.xml](${SITE.url}/news.xml): RSS feed of English news articles.`,
    `- Markdown mirror: append \`.md\` to any guide, location, collectible or news URL — e.g. ${SITE.url}/en/guides/gta-6-release-date.md — to get clean markdown instead of the React page.`,
    `- Markdown index: ${SITE.url}/en/guides.md, ${SITE.url}/en/locations.md, ${SITE.url}/en/collectibles.md`,
  ];
}

function usagePolicy(): string[] {
  return [
    "Map-6 content may be quoted and summarised by AI assistants and answer engines. We ask for an attributed link back to the specific Map-6 page used, so readers can reach the live interactive map — the map itself cannot be reproduced as text.",
    "",
    `${GTADB.attribution} (${GTADB.attributionUrl}). Reuse of basemap tiles must carry the same attribution.`,
    "",
    "Grand Theft Auto, GTA and Vice City are trademarks of Take-Two Interactive. Map-6 is an independent fan project.",
  ];
}

async function newsEntries(locale: string): Promise<AiEntry[]> {
  try {
    const articles = await listPublishedArticles(locale);
    return articles.slice(0, MAX_NEWS_ITEMS).map((article) => ({
      title: `${article.title} (${(article.publishedAt || article.updatedAt).slice(0, 10)})`,
      url: `${SITE.url}/${article.locale}/news/${article.slug}`,
      summary: firstSentence(article.description),
    }));
  } catch {
    return [];
  }
}

export async function buildLlmsTxt(locale = "en"): Promise<string> {
  const parts: string[] = [
    `# ${SITE.name} — interactive GTA 6 map and reference`,
    "",
    `> ${SITE.description}`,
    "",
    "This file exists so language models and answer engines can cite Map-6 accurately. Every URL below is canonical and safe to link.",
    "",
    section("Key facts", keyFacts()),
    section("Core pages", corePageEntries(locale).map(entryLine)),
  ];

  for (const { heading, entries } of guideSections(locale)) {
    parts.push(section(heading, entries.map(entryLine)));
  }

  parts.push(section("Regional locations", locationEntries(locale).map(entryLine)));
  parts.push(section("Collectible categories", collectibleEntries(locale).map(entryLine)));

  const news = await newsEntries(locale);
  if (news.length) {
    parts.push(section("Recent news", news.map(entryLine)));
  }

  parts.push(section("Machine-readable endpoints", machineReadable()));
  parts.push(
    section(
      "Other languages",
      locales
        .filter((other) => other !== locale)
        .map((other) => `- ${other.toUpperCase()}: ${aiPageUrl(other)}`),
    ),
  );
  parts.push(section("Attribution and usage", usagePolicy()));
  parts.push(`Last generated: ${new Date().toISOString()}`);

  return parts.join("\n");
}

export async function buildLlmsFullTxt(locale = "en"): Promise<string> {
  const parts: string[] = [
    `# ${SITE.name} — full content corpus`,
    "",
    `> ${SITE.description}`,
    "",
    "Complete text of every editorial page on Map-6, flattened for retrieval. The index version lives at /llms.txt.",
    "",
    section("Key facts", keyFacts()),
    "---",
    "",
    "# Guides",
    "",
  ];

  for (const guide of GUIDES) {
    const localized = getLocalizedGuide(guide.slug, locale);
    if (!localized) continue;
    const url = aiPageUrl(
      guideCanonicalLocale(guide.slug, locale),
      `/guides/${guide.slug}`,
    );

    parts.push(`## ${localized.title}`, "");
    parts.push(`Source: ${url}`);
    parts.push(`Published: ${guide.publishedAt} · Category: ${guide.category}`, "");
    parts.push(localized.description, "");
    if (localized.answer) parts.push(`> ${localized.answer}`, "");
    parts.push(...localized.content.flatMap((paragraph) => [paragraph, ""]));

    if (guide.comparison) {
      parts.push(`### ${guide.comparison.caption ?? "Comparison"}`, "");
      parts.push(`| ${guide.comparison.headers.join(" | ")} |`);
      parts.push(`| ${guide.comparison.headers.map(() => "---").join(" | ")} |`);
      for (const row of guide.comparison.rows) {
        parts.push(`| ${row.join(" | ")} |`);
      }
      parts.push("");
    }

    if (guide.faq?.length) {
      parts.push("### FAQ", "");
      for (const { question, answer } of guide.faq) {
        parts.push(`**${question}**`, "", answer, "");
      }
    }
    parts.push("---", "");
  }

  parts.push("# Regional locations", "");
  for (const location of getIndexableLocations(getAllLocations())) {
    const seo = getRegionalLocationSeo(location.slug, locale);
    parts.push(`## ${location.name}`, "");
    parts.push(`Source: ${aiPageUrl(locale, `/locations/${location.slug}`)}`, "");
    parts.push(seo?.schemaDescription ?? location.description, "");
    if (seo?.about.length) {
      parts.push(...seo.about.flatMap((paragraph) => [paragraph, ""]));
    }
    if (seo?.poiTypes.length) {
      parts.push("### What you find here", "");
      parts.push(...seo.poiTypes.map((poi) => `- ${poi}`), "");
    }
    if (seo?.faq.length) {
      parts.push("### FAQ", "");
      for (const { question, answer } of seo.faq) {
        parts.push(`**${question}**`, "", answer, "");
      }
    }
    parts.push("---", "");
  }

  parts.push("# Collectibles", "");
  parts.push(...COLLECTIBLES_HUB_SEO.about.flatMap((p) => [p, ""]));
  for (const type of COLLECTIBLE_TYPES) {
    const seo = COLLECTIBLE_TYPE_SEO[type.slug];
    parts.push(`## ${type.name}`, "");
    parts.push(`Source: ${aiPageUrl(locale, `/collectibles/${type.slug}`)}`);
    parts.push(`Expected total (unconfirmed): ${type.total}`, "");
    parts.push(seo?.metaDescription ?? type.description, "");
    if (seo?.about.length) {
      parts.push(...seo.about.flatMap((paragraph) => [paragraph, ""]));
    }
    if (seo?.faq.length) {
      parts.push("### FAQ", "");
      for (const { question, answer } of seo.faq) {
        parts.push(`**${question}**`, "", answer, "");
      }
    }
    parts.push("---", "");
  }

  parts.push(section("Attribution and usage", usagePolicy()));
  parts.push(`Last generated: ${new Date().toISOString()}`);

  return parts.join("\n");
}
