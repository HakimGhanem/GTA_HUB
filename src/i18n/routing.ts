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
 * Locales Google / AdSense may see as a full site. ES/PT/DE/IT stay in
 * `routing.locales` so old URLs parse, but middleware 302s them to `/en`
 * (news under those prefixes is 410 — thin factory copies).
 */
export const INDEXABLE_LOCALES = ["en", "fr"] as const;
export type IndexableLocale = (typeof INDEXABLE_LOCALES)[number];

export const PARKED_LOCALES = ["es", "pt", "de", "it"] as const;
export type ParkedLocale = (typeof PARKED_LOCALES)[number];

export function isIndexableLocale(locale: string): locale is IndexableLocale {
  return (INDEXABLE_LOCALES as readonly string[]).includes(locale);
}

export function isParkedLocale(locale: string): locale is ParkedLocale {
  return (PARKED_LOCALES as readonly string[]).includes(locale);
}

export function filterIndexableLocales(
  localeList: readonly string[] = locales,
): IndexableLocale[] {
  return localeList.filter(isIndexableLocale);
}
