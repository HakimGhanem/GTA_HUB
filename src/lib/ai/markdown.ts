/**
 * Markdown mirrors of editorial pages, served at `<page-url>.md`.
 *
 * Answer engines and agents that follow a link get the prose without paying
 * for the React shell (the interactive map in particular is useless to them).
 */
import { getAllLocations, getLocationBySlug } from "@/data/all-locations";
import { COLLECTIBLE_TYPES, getCollectibleType } from "@/data/collectibles";
import { COLLECTIBLES_HUB_SEO, COLLECTIBLE_TYPE_SEO } from "@/data/collectibles-seo";
import { getGuideBySlug } from "@/data/guides";
import { getLocalizedGuide } from "@/data/guides-i18n";
import { getRegionalLocationSeo } from "@/data/location-seo-content";
import { getLocationDescription } from "@/data/locations-i18n";
import { SITE } from "@/lib/constants";
import { evergreenPathForNews } from "@/lib/content/news-canonical";
import { getArticleBySlug } from "@/lib/content/repository";
import { getIndexableLocations } from "@/lib/location-indexing";
import {
  aiPageUrl,
  collectibleEntries,
  guideCanonicalLocale,
  guideSections,
  locationEntries,
} from "./inventory";

type FrontMatter = {
  title: string;
  description: string;
  canonical: string;
  updated?: string;
};

/** YAML front matter — quotes escaped so a title with `"` cannot break parsing. */
function frontMatter({ title, description, canonical, updated }: FrontMatter): string {
  const quote = (value: string) => `"${value.replace(/"/g, '\\"')}"`;
  const lines = [
    "---",
    `title: ${quote(title)}`,
    `description: ${quote(description)}`,
    `canonical: ${quote(canonical)}`,
    `source: ${quote(SITE.name)}`,
  ];
  if (updated) lines.push(`updated: ${quote(updated)}`);
  lines.push("---", "");
  return lines.join("\n");
}

function faqBlock(faq: { question: string; answer: string }[]): string[] {
  if (!faq.length) return [];
  return [
    "## FAQ",
    "",
    ...faq.flatMap(({ question, answer }) => [`### ${question}`, "", answer, ""]),
  ];
}

function guideMarkdown(locale: string, slug: string): string | null {
  const guide = getGuideBySlug(slug);
  const localized = getLocalizedGuide(slug, locale);
  if (!guide || !localized) return null;

  const canonical = aiPageUrl(
    guideCanonicalLocale(slug, locale),
    `/guides/${slug}`,
  );

  const body: string[] = [
    `# ${localized.title}`,
    "",
    localized.description,
    "",
    `*${localized.readTime} min read · published ${guide.publishedAt}*`,
    "",
    ...(localized.answer ? [`> ${localized.answer}`, ""] : []),
    ...localized.content.flatMap((paragraph) => [paragraph, ""]),
  ];

  if (guide.comparison) {
    body.push(`## ${guide.comparison.caption ?? "Comparison"}`, "");
    body.push(`| ${guide.comparison.headers.join(" | ")} |`);
    body.push(`| ${guide.comparison.headers.map(() => "---").join(" | ")} |`);
    for (const row of guide.comparison.rows) body.push(`| ${row.join(" | ")} |`);
    body.push("");
  }

  body.push(...faqBlock(guide.faq ?? []));
  body.push(`Interactive map: ${aiPageUrl(locale, "/map")}`, "");

  return (
    frontMatter({
      title: localized.title,
      description: localized.description,
      canonical,
      updated: guide.publishedAt,
    }) + body.join("\n")
  );
}

function locationMarkdown(locale: string, slug: string): string | null {
  const location = getLocationBySlug(slug);
  if (!location) return null;

  const seo = getRegionalLocationSeo(slug, locale);
  const description = seo?.metaDescription ?? getLocationDescription(location, locale);
  const body: string[] = [
    `# ${location.name} — GTA 6`,
    "",
    description,
    "",
    `In-game coordinates: X ${location.x}, Y ${location.y}`,
    "",
  ];

  if (seo?.about.length) {
    body.push("## About", "", ...seo.about.flatMap((p) => [p, ""]));
  }
  if (seo?.poiTypes.length) {
    body.push("## What you find here", "", ...seo.poiTypes.map((p) => `- ${p}`), "");
  }
  body.push(...faqBlock(seo?.faq ?? []));
  body.push(`Open on the interactive map: ${aiPageUrl(locale, "/map")}`, "");

  return (
    frontMatter({
      title: `${location.name} — GTA 6`,
      description,
      canonical: aiPageUrl(locale, `/locations/${slug}`),
    }) + body.join("\n")
  );
}

function collectibleMarkdown(locale: string, slug: string): string | null {
  const type = getCollectibleType(slug);
  if (!type) return null;

  const seo = COLLECTIBLE_TYPE_SEO[slug];
  const description = seo?.metaDescription ?? type.description;
  const body: string[] = [
    `# ${type.name} — GTA 6`,
    "",
    description,
    "",
    `Expected total: ${type.total} (pre-launch estimate, not confirmed by Rockstar).`,
    "",
  ];
  if (seo?.about.length) {
    body.push("## About", "", ...seo.about.flatMap((p) => [p, ""]));
  }
  if (seo?.howToTrack.length) {
    body.push("## How to track", "", ...seo.howToTrack.map((s) => `- ${s}`), "");
  }
  body.push(...faqBlock(seo?.faq ?? []));

  return (
    frontMatter({
      title: `${type.name} — GTA 6`,
      description,
      canonical: aiPageUrl(locale, `/collectibles/${slug}`),
    }) + body.join("\n")
  );
}

async function newsMarkdown(locale: string, slug: string): Promise<string | null> {
  const article = await getArticleBySlug(slug, locale);
  if (!article || article.status !== "published") return null;

  const evergreen = evergreenPathForNews(slug);
  const body: string[] = [
    `# ${article.title}`,
    "",
    article.description,
    "",
    `*Published ${(article.publishedAt || article.updatedAt).slice(0, 10)} by ${article.author}*`,
    "",
    article.bodyMarkdown,
    "",
  ];

  if (article.sources.length) {
    body.push("## Sources", "");
    body.push(...article.sources.map((s) => `- [${s.title}](${s.url})`), "");
  }
  if (evergreen) {
    body.push(
      `Canonical evergreen page: ${aiPageUrl(article.locale, evergreen)}`,
      "",
    );
  }

  return (
    frontMatter({
      title: article.title,
      description: article.description,
      canonical: `${SITE.url}/${article.locale}/news/${article.slug}`,
      updated: article.updatedAt,
    }) + body.join("\n")
  );
}

function guidesIndexMarkdown(locale: string): string {
  const body: string[] = ["# GTA 6 guides — Map-6", ""];
  for (const { heading, entries } of guideSections(locale)) {
    body.push(`## ${heading}`, "");
    body.push(
      ...entries.map((e) => `- [${e.title}](${e.url}.md): ${e.summary}`),
      "",
    );
  }
  return (
    frontMatter({
      title: "GTA 6 guides — Map-6",
      description:
        "Every Map-6 guide: interactive map usage, pre-orders and editions, world and story, setup and release prep.",
      canonical: aiPageUrl(locale, "/guides"),
    }) + body.join("\n")
  );
}

function locationsIndexMarkdown(locale: string): string {
  const entries = locationEntries(locale);
  const body = [
    "# GTA 6 locations — Map-6",
    "",
    `${getIndexableLocations(getAllLocations()).length} regional hubs across the state of Leonida.`,
    "",
    ...entries.map((e) => `- [${e.title}](${e.url}.md): ${e.summary}`),
    "",
  ];
  return (
    frontMatter({
      title: "GTA 6 locations — Map-6",
      description:
        "Regional hubs for Vice City, Ocean Drive, Leonida Keys, Port Gellhorn, Grassrivers, Ambrosia Island and Mount Kalaga.",
      canonical: aiPageUrl(locale, "/locations"),
    }) + body.join("\n")
  );
}

function collectiblesIndexMarkdown(locale: string): string {
  const body = [
    "# GTA 6 collectibles — Map-6",
    "",
    COLLECTIBLES_HUB_SEO.metaDescription,
    "",
    ...collectibleEntries(locale).map((e) => `- [${e.title}](${e.url}.md): ${e.summary}`),
    "",
    "## How to track",
    "",
    ...COLLECTIBLES_HUB_SEO.howToTrack.map((s) => `- ${s}`),
    "",
    ...faqBlock([...COLLECTIBLES_HUB_SEO.faq]),
  ];
  return (
    frontMatter({
      title: "GTA 6 collectibles — Map-6",
      description: COLLECTIBLES_HUB_SEO.metaDescription,
      canonical: aiPageUrl(locale, "/collectibles"),
    }) + body.join("\n")
  );
}

function siteIndexMarkdown(locale: string): string {
  const body = [
    `# ${SITE.name}`,
    "",
    SITE.description,
    "",
    `- Interactive map: ${aiPageUrl(locale, "/map")}`,
    `- Guides: ${aiPageUrl(locale, "/guides")}.md`,
    `- Locations: ${aiPageUrl(locale, "/locations")}.md`,
    `- Collectibles: ${aiPageUrl(locale, "/collectibles")}.md`,
    `- Full corpus: ${SITE.url}/llms-full.txt`,
    "",
    `${COLLECTIBLE_TYPES.length} collectible categories · ${getIndexableLocations(getAllLocations()).length} regional hubs.`,
    "",
  ];
  return (
    frontMatter({
      title: SITE.title,
      description: SITE.description,
      canonical: aiPageUrl(locale),
    }) + body.join("\n")
  );
}

/**
 * Resolve `/<locale>/<section>/<slug>` to markdown. Returns null for anything
 * without an editorial body (the map, legal pages, unknown slugs).
 */
export async function renderMarkdownPage(
  locale: string,
  segments: string[],
): Promise<string | null> {
  const [section, slug] = segments;

  if (!section) return siteIndexMarkdown(locale);

  if (!slug) {
    if (section === "guides") return guidesIndexMarkdown(locale);
    if (section === "locations") return locationsIndexMarkdown(locale);
    if (section === "collectibles") return collectiblesIndexMarkdown(locale);
    return null;
  }

  if (segments.length > 2) return null;
  if (section === "guides") return guideMarkdown(locale, slug);
  if (section === "locations") return locationMarkdown(locale, slug);
  if (section === "collectibles") return collectibleMarkdown(locale, slug);
  if (section === "news") return newsMarkdown(locale, slug);
  return null;
}
