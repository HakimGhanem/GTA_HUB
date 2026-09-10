import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { SITE, SITE_PROFILES } from "./constants";

const LOCALE_OG: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  pt: "pt_BR",
  de: "de_DE",
  it: "it_IT",
};

const LOCALE_BCP47: Record<string, string> = {
  en: "en-US",
  fr: "fr-FR",
  es: "es-ES",
  pt: "pt-BR",
  de: "de-DE",
  it: "it-IT",
};

function inLanguage(locale: string) {
  return LOCALE_BCP47[locale] ?? "en-US";
}

type PageMeta = {
  locale?: string;
  title: string;
  description: string;
  path?: string;
  image?: string;
  openGraphType?: "website" | "article";
  robots?: Metadata["robots"];
  /** When set, canonical + og:url use this locale instead of `locale`. */
  canonicalLocale?: string;
  /** Limit hreflang to these locales. Defaults to all site locales. */
  hreflangLocales?: readonly string[];
  /** Advertise the `<url>.md` markdown mirror to agents and answer engines. */
  markdownAlternate?: boolean;
};

function localizedPath(locale: string, path: string) {
  const suffix = path === "/" || path === "" ? "" : path;
  return `/${locale}${suffix}`;
}

function pageUrl(locale: string, path = "") {
  return `${SITE.url}${localizedPath(locale, path)}`;
}

function hreflangAlternates(path: string, localeList: readonly string[] = locales) {
  const suffix = path === "/" || path === "" ? "" : path;
  const languages = Object.fromEntries(
    localeList.map((loc) => [loc, `${SITE.url}/${loc}${suffix}`]),
  ) as Record<string, string>;
  languages["x-default"] = `${SITE.url}/en${suffix}`;
  return languages;
}

export function buildMetadata({
  locale = "en",
  title,
  description,
  path = "",
  image = "/api/og/hub",
  openGraphType = "website",
  robots = { index: true, follow: true },
  canonicalLocale,
  hreflangLocales,
  markdownAlternate = false,
}: PageMeta): Metadata {
  const url = pageUrl(canonicalLocale ?? locale, path);

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
      languages: hreflangAlternates(path, hreflangLocales ?? locales),
      ...(markdownAlternate
        ? { types: { "text/markdown": `${url}.md` } }
        : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: LOCALE_OG[locale as Locale] ?? "en_US",
      type: openGraphType,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots,
  };
}

export function jsonLdWebSite(locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: `${SITE.url}/${locale}`,
    description: SITE.description,
    inLanguage: inLanguage(locale),
    publisher: { "@id": `${SITE.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/${locale}/locations?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Topics Map-6 is an authority on. Answer engines lean on this to decide
 * whether the site is a credible source for a given query.
 */
const KNOWS_ABOUT = [
  "Grand Theft Auto VI",
  "Vice City",
  "State of Leonida",
  "GTA 6 interactive map",
  "GTA 6 collectibles",
  "GTA 6 release date",
  "GTA 6 pre-orders and editions",
  "Video game cartography",
];

export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/og-default.png`,
      width: 1200,
      height: 630,
    },
    knowsAbout: KNOWS_ABOUT,
    publishingPrinciples: `${SITE.url}/en/about`,
    ...(SITE_PROFILES.length ? { sameAs: SITE_PROFILES } : {}),
  };
}

export function jsonLdWebApplication(locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${SITE.name} Interactive Map`,
    url: `${SITE.url}/${locale}/map`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Interactive GTA 6 map with POIs, collectibles, coordinates, and distance tools.",
  };
}

export function jsonLdFAQ(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function jsonLdRegionalLocation(
  name: string,
  slug: string,
  schemaDescription: string,
  faq: { question: string; answer: string }[],
  locale = "en",
) {
  const url = pageUrl(locale, `/locations/${slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristAttraction",
        name: `${name} — GTA 6`,
        description: schemaDescription,
        url,
        isPartOf: {
          "@type": "Place",
          name: "State of Leonida, GTA 6",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE.name,
            item: pageUrl(locale),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Locations",
            item: pageUrl(locale, "/locations"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}

export function jsonLdPlace(
  location: {
    name: string;
    description: string;
    slug: string;
    x: number;
    y: number;
    category: string;
  },
  locale = "en",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: location.name,
    description: location.description,
    url: pageUrl(locale, `/locations/${location.slug}`),
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.y,
      longitude: location.x,
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "category",
      value: location.category,
    },
  };
}

export type BreadcrumbTrailItem = {
  name: string;
  /** Site-relative path, e.g. "/guides". Omit for the current page. */
  path?: string;
};

/**
 * `trail` excludes the site root — it is prepended automatically so every
 * breadcrumb resolves back to the localized home page.
 */
function breadcrumbNode(trail: BreadcrumbTrailItem[], locale: string) {
  const items = [{ name: SITE.name, path: "/" }, ...trail];

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: pageUrl(locale, item.path ?? ""),
    })),
  };
}

export function jsonLdBreadcrumb(trail: BreadcrumbTrailItem[], locale = "en") {
  return { "@context": "https://schema.org", ...breadcrumbNode(trail, locale) };
}

export function jsonLdFAQEntities(items: { question: string; answer: string }[]) {
  return items.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  }));
}

type GuideArticleInput = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  readTime?: number;
  category?: string;
  content?: string[];
  image?: string;
  /** Standalone answer-first summary rendered in the `.geo-answer` block. */
  answer?: string;
};

/**
 * Marks the headline and the answer-first block as the quotable part of a
 * page — the fragment voice assistants read out and answer engines lift.
 */
const SPEAKABLE = {
  "@type": "SpeakableSpecification",
  cssSelector: ["h1", ".geo-answer"],
};

/**
 * Single `@graph` for a guide page: Article + BreadcrumbList + FAQPage, wired
 * together by `@id` so Google attaches the FAQ and trail to this exact URL.
 */
export function jsonLdGuidePage(
  guide: GuideArticleInput,
  options: {
    locale?: string;
    breadcrumb: BreadcrumbTrailItem[];
    faq?: { question: string; answer: string }[];
  },
) {
  const { locale = "en", breadcrumb, faq } = options;
  const url = pageUrl(locale, `/guides/${guide.slug}`);
  const image = `${SITE.url}${guide.image ?? "/og-default.png"}`;
  const wordCount = guide.content
    ?.join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: guide.title,
      description: guide.description,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      inLanguage: inLanguage(locale),
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt ?? guide.publishedAt,
      image: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
      ...(guide.category ? { articleSection: guide.category } : {}),
      ...(guide.readTime ? { timeRequired: `PT${guide.readTime}M` } : {}),
      ...(wordCount ? { wordCount } : {}),
      ...(guide.answer ? { abstract: guide.answer, speakable: SPEAKABLE } : {}),
      isPartOf: { "@id": `${SITE.url}/#website` },
      author: { "@id": `${SITE.url}/#organization` },
      publisher: { "@id": `${SITE.url}/#organization` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    { ...breadcrumbNode(breadcrumb, locale), "@id": `${url}#breadcrumb` },
  ];

  if (faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      inLanguage: inLanguage(locale),
      mainEntity: jsonLdFAQEntities(faq),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/** Hub / index page: CollectionPage + ItemList + BreadcrumbList (+ FAQPage). */
export function jsonLdCollectionPage(options: {
  name: string;
  description: string;
  path: string;
  locale?: string;
  breadcrumb: BreadcrumbTrailItem[];
  items: { name: string; path: string }[];
  faq?: { question: string; answer: string }[];
}) {
  const {
    name,
    description,
    path,
    locale = "en",
    breadcrumb,
    items,
    faq,
  } = options;
  const url = pageUrl(locale, path);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "CollectionPage",
      "@id": url,
      name,
      description,
      url,
      inLanguage: inLanguage(locale),
      isPartOf: { "@id": `${SITE.url}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      ...(items.length ? { mainEntity: { "@id": `${url}#list` } } : {}),
    },
    { ...breadcrumbNode(breadcrumb, locale), "@id": `${url}#breadcrumb` },
  ];

  if (items.length) {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#list`,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: pageUrl(locale, item.path),
      })),
    });
  }

  if (faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      inLanguage: inLanguage(locale),
      mainEntity: jsonLdFAQEntities(faq),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function jsonLdArticle(
  guide: {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
  },
  locale = "en",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url: pageUrl(locale, `/guides/${guide.slug}`),
    inLanguage: inLanguage(locale),
    datePublished: guide.publishedAt,
    dateModified: guide.publishedAt,
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

export function jsonLdNewsArticle(
  article: {
    title: string;
    description: string;
    slug: string;
    locale: string;
    publishedAt: string;
    updatedAt?: string;
    image?: string;
    author?: string;
  },
  breadcrumb?: BreadcrumbTrailItem[],
) {
  const url = `${SITE.url}/${article.locale}/news/${article.slug}`;
  const image = article.image?.startsWith("http")
    ? article.image
    : `${SITE.url}${article.image || "/og-default.png"}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "NewsArticle",
      "@id": `${url}#article`,
      headline: article.title,
      description: article.description,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      inLanguage: inLanguage(article.locale),
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      image: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
      isPartOf: { "@id": `${SITE.url}/#website` },
      author: article.author
        ? { "@type": "Organization", name: article.author }
        : { "@id": `${SITE.url}/#organization` },
      publisher: { "@id": `${SITE.url}/#organization` },
      ...(breadcrumb?.length
        ? { breadcrumb: { "@id": `${url}#breadcrumb` } }
        : {}),
    },
  ];

  if (breadcrumb?.length) {
    graph.push({
      ...breadcrumbNode(breadcrumb, article.locale),
      "@id": `${url}#breadcrumb`,
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
