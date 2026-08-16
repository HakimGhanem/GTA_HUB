import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { SITE } from "./constants";

const LOCALE_OG: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  pt: "pt_BR",
  de: "de_DE",
  it: "it_IT",
};

type PageMeta = {
  locale?: string;
  title: string;
  description: string;
  path?: string;
  image?: string;
  openGraphType?: "website" | "article";
  robots?: Metadata["robots"];
};

function localizedPath(locale: string, path: string) {
  const suffix = path === "/" || path === "" ? "" : path;
  return `/${locale}${suffix}`;
}

function hreflangAlternates(path: string) {
  const suffix = path === "/" || path === "" ? "" : path;
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${SITE.url}/${locale}${suffix}`]),
  ) as Record<string, string>;
  languages["x-default"] = `${SITE.url}/en${suffix}`;
  return languages;
}

export function buildMetadata({
  locale = "en",
  title,
  description,
  path = "",
  image = "/og-default.png",
  openGraphType = "website",
  robots = { index: true, follow: true },
}: PageMeta): Metadata {
  const url = `${SITE.url}${localizedPath(locale, path)}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
      languages: hreflangAlternates(path),
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
  const inLanguage: Record<string, string> = {
    en: "en-US",
    fr: "fr-FR",
    es: "es-ES",
    pt: "pt-BR",
    de: "de-DE",
    it: "it-IT",
  };

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: `${SITE.url}/${locale}`,
    description: SITE.description,
    inLanguage: inLanguage[locale] ?? "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/${locale}/locations?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    logo: `${SITE.url}/og-default.png`,
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
) {
  const pageUrl = `${SITE.url}/locations/${slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristAttraction",
        name: `${name} — GTA 6`,
        description: schemaDescription,
        url: pageUrl,
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
            item: SITE.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Locations",
            item: `${SITE.url}/locations`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name,
            item: pageUrl,
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

export function jsonLdPlace(location: {
  name: string;
  description: string;
  slug: string;
  x: number;
  y: number;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: location.name,
    description: location.description,
    url: `${SITE.url}/locations/${location.slug}`,
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

export function jsonLdArticle(guide: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url: `${SITE.url}/guides/${guide.slug}`,
    datePublished: guide.publishedAt,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function jsonLdNewsArticle(article: {
  title: string;
  description: string;
  slug: string;
  locale: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  author?: string;
}) {
  const url = `${SITE.url}/${article.locale}/news/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    image: article.image || `${SITE.url}/og-default.png`,
    author: {
      "@type": "Organization",
      name: article.author || SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/og-default.png`,
      },
    },
  };
}
