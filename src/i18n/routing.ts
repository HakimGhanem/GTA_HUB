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
