import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "es", "pt", "de", "it"],
  defaultLocale: "en",
  localePrefix: "always",
  // Disable middleware Link headers — they emit x-default without locale
  // prefix (e.g. https://map-6.com/) which 307-redirects and conflicts with
  // HTML canonical/hreflang from buildMetadata (https://map-6.com/en/...).
  alternateLinks: false,
});

export const locales = routing.locales;
export type Locale = (typeof locales)[number];

/**
 * Locales Google may index. ES/PT/DE/IT stay in the UI but are noindex —
 * their news/guide copy is still thin and triggered AdSense “low-value content”.
 */
export const INDEXABLE_LOCALES = ["en", "fr"] as const;
export type IndexableLocale = (typeof INDEXABLE_LOCALES)[number];

export function isIndexableLocale(locale: string): locale is IndexableLocale {
  return (INDEXABLE_LOCALES as readonly string[]).includes(locale);
}

export function filterIndexableLocales(
  localeList: readonly string[] = locales,
): IndexableLocale[] {
  return localeList.filter(isIndexableLocale);
}
