import { buildAmazonAffiliateUrl } from "@/lib/amazon-affiliate";
import type { PreorderProduct } from "@/data/preorder-products";
import { searchQueryForProduct } from "@/lib/affiliate/catalog";
import {
  STORES,
  amazonStoreForLocale,
  buildStoreProductUrl,
  storeAppliesToProduct,
  type AffiliateStore,
  type AffiliateStoreId,
  type StoreLinkKind,
} from "@/lib/affiliate/stores";

export type StoreOffer = {
  id: AffiliateStoreId;
  label: string;
  href: string;
  kind: StoreLinkKind;
  variant: "amazon" | "secondary";
  cta: string;
};

const OFFER_ORDER: AffiliateStoreId[] = [
  "amazon_fr",
  "amazon_com",
  "amazon_de",
  "amazon_es",
  "amazon_it",
  "playstation",
  "xbox",
  "fnac",
  "bestbuy",
];

const PS_LOCALE_PATH: Record<string, string> = {
  en: "en-us",
  fr: "fr-fr",
  de: "de-de",
  es: "es-es",
  it: "it-it",
  pt: "pt-pt",
};

const XBOX_LOCALE_PATH: Record<string, string> = {
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
  it: "it-IT",
  pt: "pt-PT",
};

function envTrim(key: string): string {
  return process.env[key]?.trim() ?? "";
}

/**
 * Apply a partner base to an official destination.
 * Supports `{url}` / `{q}` placeholders or a tracking URL that already ends with `=`.
 * Never invents partner IDs.
 */
export function applyAffiliateBase(
  base: string,
  destination: string,
  query: string,
): string {
  if (base.includes("{url}")) {
    return base.replaceAll("{url}", encodeURIComponent(destination));
  }
  if (base.includes("{q}")) {
    return base.replaceAll("{q}", encodeURIComponent(query));
  }
  const trimmed = base.trim();
  if (trimmed.endsWith("=")) {
    return `${trimmed}${encodeURIComponent(destination)}`;
  }
  return trimmed;
}

/** Official / locale-aware PlayStation Store search. */
export function buildPlaystationSearchUrl(
  query: string,
  locale = "en",
): string {
  const path = PS_LOCALE_PATH[locale] ?? "en-us";
  return `https://store.playstation.com/${path}/search/${encodeURIComponent(query)}`;
}

/** Official / locale-aware Xbox Store search. */
export function buildXboxSearchUrl(query: string, locale = "en"): string {
  const path = XBOX_LOCALE_PATH[locale] ?? "en-US";
  return `https://www.xbox.com/${path}/games/search?q=${encodeURIComponent(query)}`;
}

/**
 * Fnac: affiliate wrap when NEXT_PUBLIC_FNAC_AFFILIATE_BASE is set,
 * else official search (enabled for fr).
 */
export function buildFnacSearchUrl(query: string): string {
  const official = `https://www.fnac.com/SearchResult/ResultList.aspx?Search=${encodeURIComponent(query)}`;
  const base = envTrim("NEXT_PUBLIC_FNAC_AFFILIATE_BASE");
  if (!base) return official;
  return applyAffiliateBase(base, official, query);
}

/** Best Buy: only used when NEXT_PUBLIC_BESTBUY_AFFILIATE_BASE is set. */
export function buildBestBuySearchUrl(query: string): string {
  const official = `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(query)}`;
  const base = envTrim("NEXT_PUBLIC_BESTBUY_AFFILIATE_BASE");
  if (!base) return official;
  return applyAffiliateBase(base, official, query);
}

export function buildAmazonUrlForLocale(asin: string, locale: string): string {
  const store = amazonStoreForLocale(locale);
  if (store && asin) return buildStoreProductUrl(store, asin);
  return buildAmazonAffiliateUrl(asin);
}

export function buildOfferUrl(
  store: AffiliateStore,
  product: PreorderProduct,
  locale: string,
): string {
  const query = searchQueryForProduct(product);
  switch (store.id) {
    case "amazon_fr":
    case "amazon_com":
    case "amazon_de":
    case "amazon_es":
    case "amazon_it":
      return buildStoreProductUrl(store, product.asin);
    case "playstation":
      return buildPlaystationSearchUrl(query, locale);
    case "xbox":
      return buildXboxSearchUrl(query, locale);
    case "fnac":
      return buildFnacSearchUrl(query);
    case "bestbuy":
      return buildBestBuySearchUrl(query);
    default:
      return store.baseUrl;
  }
}

function ctaForStore(store: AffiliateStore): string {
  if (store.id.startsWith("amazon")) return `View on ${store.label} →`;
  if (store.kind === "official") return `Search on ${store.label} →`;
  return `Search on ${store.label} →`;
}

export function offersForProduct(
  product: PreorderProduct,
  locale: string,
): StoreOffer[] {
  return STORES.filter((store) => storeAppliesToProduct(store, product, locale))
    .sort(
      (a, b) =>
        OFFER_ORDER.indexOf(a.id) - OFFER_ORDER.indexOf(b.id),
    )
    .map((store) => ({
      id: store.id,
      label: store.label,
      href: buildOfferUrl(store, product, locale),
      kind: store.kind,
      variant: store.id.startsWith("amazon") ? "amazon" : "secondary",
      cta: ctaForStore(store),
    }));
}

export function productHasOffers(
  product: PreorderProduct,
  locale: string,
): boolean {
  return offersForProduct(product, locale).length > 0;
}
