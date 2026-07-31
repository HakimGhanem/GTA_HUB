import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "es", "pt", "de", "it"],
  defaultLocale: "en",
  localePrefix: "always",
});

export const locales = routing.locales;
export type Locale = (typeof locales)[number];
