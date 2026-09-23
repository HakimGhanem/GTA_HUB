import { locales, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import type Stripe from "stripe";

export const PRO_PRODUCT_ID = "map6-pro";
export const PRO_PRICE_CENTS = 399;
export const PRO_CURRENCY = "eur";

export const PRO_PRODUCT_NAME = "Map-6 Pro — GTA 6 Launch Edition";
export const PRO_PRODUCT_DESCRIPTION =
  "Lifetime access: no ads on all pages, collectible tracker with cloud sync, CSV pin export, streamer overlay kit.";

const STRIPE_LOCALES: Record<Locale, Stripe.Checkout.SessionCreateParams.Locale> =
  {
    en: "en",
    fr: "fr",
    es: "es",
    de: "de",
    it: "it",
    pt: "pt",
  };

export function isAppLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function stripeCheckoutLocale(
  locale: string,
): Stripe.Checkout.SessionCreateParams.Locale {
  return isAppLocale(locale) ? STRIPE_LOCALES[locale] : "en";
}

export function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    SITE.url
  ).replace(/\/$/, "");
}
