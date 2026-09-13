import { buildAmazonAffiliateUrl } from "@/lib/amazon-affiliate";
import type { PreorderProduct } from "@/data/preorder-products";
import { searchQueryForProduct } from "@/lib/affiliate/catalog";
import { isAmazonStoreId } from "@/lib/affiliate/amazon-markets";
import {
  STORES,
  amazonStoreForLocale,
  asinForStore,
  buildStoreProductUrl,
  buildStoreSearchUrl,
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
  /**
   * `product` links straight to the item, `search` lands on tagged search
   * results because we have no ASIN for that marketplace yet.
   */
  target: "product" | "search";
  cta: string;
};

const OFFER_ORDER: AffiliateStoreId[] = [
  "amazon_fr",
  "amazon_co_uk",
  "amazon_com",
  "amazon_de",
  "amazon_es",
  "amazon_it",
  "playstation",
  "xbox",
  "fnac",
  "bestbuy",
  "instant_gaming",
  "eneba",
  "cdkeys",
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

/** Instant Gaming translates the search segment itself, not just the prefix. */
const INSTANT_GAMING_SEARCH_PATH: Record<string, string> = {
  en: "en/search",
  fr: "fr/rechercher",
  de: "de/suche",
  es: "es/busquedas",
  it: "it/ricerca",
  pt: "pt/pesquisar",
};

/** Eneba serves English at the root and prefixes the other languages. */
const ENEBA_LOCALE_PREFIX: Record<string, string> = {
  en: "",
  fr: "/fr",
  de: "/de",
  es: "/es",
  it: "/it",
  pt: "/pt",
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

/**
 * Instant Gaming: affiliate wrap when NEXT_PUBLIC_INSTANT_GAMING_AFFILIATE_BASE
 * is set, else official localised search.
 */
export function buildInstantGamingSearchUrl(
  query: string,
  locale = "en",
): string {
  const path = INSTANT_GAMING_SEARCH_PATH[locale] ?? INSTANT_GAMING_SEARCH_PATH.en;
  const official = `https://www.instant-gaming.com/${path}/?q=${encodeURIComponent(query)}`;
  const base = envTrim("NEXT_PUBLIC_INSTANT_GAMING_AFFILIATE_BASE");
  if (!base) return official;
  return applyAffiliateBase(base, official, query);
}

/** Eneba: affiliate wrap when NEXT_PUBLIC_ENEBA_AFFILIATE_BASE is set. */
export function buildEnebaSearchUrl(query: string, locale = "en"): string {
  const prefix = ENEBA_LOCALE_PREFIX[locale] ?? "";
  const official = `https://www.eneba.com${prefix}/store/all?text=${encodeURIComponent(query)}`;
  const base = envTrim("NEXT_PUBLIC_ENEBA_AFFILIATE_BASE");
  if (!base) return official;
  return applyAffiliateBase(base, official, query);
}

/** CDKeys: affiliate wrap when NEXT_PUBLIC_CDKEYS_AFFILIATE_BASE is set. */
export function buildCdkeysSearchUrl(query: string): string {
  const official = `https://www.cdkeys.com/catalogsearch/result/?q=${encodeURIComponent(query)}`;
  const base = envTrim("NEXT_PUBLIC_CDKEYS_AFFILIATE_BASE");
  if (!base) return official;
  return applyAffiliateBase(base, official, query);
}

/** Amazon link for a product on the locale's marketplace, ASIN or search. */
export function buildAmazonProductUrlForLocale(
  product: PreorderProduct,
  locale: string,
): string {
  const store = amazonStoreForLocale(locale);
  if (!store) return buildAmazonAffiliateUrl(product.asin);
  const asin = asinForStore(store, product);
  return asin
    ? buildStoreProductUrl(store, asin)
    : buildStoreSearchUrl(store, searchQueryForProduct(product));
}

export function buildOfferUrl(
  store: AffiliateStore,
  product: PreorderProduct,
  locale: string,
): string {
  const query = searchQueryForProduct(product);
  if (isAmazonStoreId(store.id)) {
    const asin = asinForStore(store, product);
    return asin
      ? buildStoreProductUrl(store, asin)
      : buildStoreSearchUrl(store, query);
  }
  switch (store.id) {
    case "playstation":
      return buildPlaystationSearchUrl(query, locale);
    case "xbox":
      return buildXboxSearchUrl(query, locale);
    case "fnac":
      return buildFnacSearchUrl(query);
    case "bestbuy":
      return buildBestBuySearchUrl(query);
    case "instant_gaming":
      return buildInstantGamingSearchUrl(query, locale);
    case "eneba":
      return buildEnebaSearchUrl(query, locale);
    case "cdkeys":
      return buildCdkeysSearchUrl(query);
    default:
      return store.baseUrl;
  }
}

/**
 * English default. Callers with a translator should override via
 * `localizeOffers` so a FR page never shows an English CTA.
 */
function ctaForStore(store: AffiliateStore, target: StoreOffer["target"]): string {
  const verb = target === "product" ? "View on" : "Search on";
  return `${verb} ${store.label} →`;
}

export function offersForProduct(
  product: PreorderProduct,
  locale: string,
): StoreOffer[] {
  return STORES.filter((store) => storeAppliesToProduct(store, product, locale))
    .sort((a, b) => OFFER_ORDER.indexOf(a.id) - OFFER_ORDER.indexOf(b.id))
    .map((store) => {
      const isAmazon = isAmazonStoreId(store.id);
      const hasAsin = isAmazon && asinForStore(store, product).length > 0;
      const target: StoreOffer["target"] = hasAsin ? "product" : "search";
      return {
        id: store.id,
        label: store.label,
        href: buildOfferUrl(store, product, locale),
        kind: store.kind,
        variant: isAmazon ? "amazon" : "secondary",
        target,
        cta: ctaForStore(store, target),
      };
    });
}

/** Replace the English fallback CTAs with translated ones. */
export function localizeOffers(
  offers: StoreOffer[],
  t: (key: "viewOnStore" | "searchOnStore", values: { store: string }) => string,
): StoreOffer[] {
  return offers.map((offer) => ({
    ...offer,
    cta: t(offer.target === "product" ? "viewOnStore" : "searchOnStore", {
      store: offer.label,
    }),
  }));
}

export function productHasOffers(
  product: PreorderProduct,
  locale: string,
): boolean {
  return offersForProduct(product, locale).length > 0;
}
