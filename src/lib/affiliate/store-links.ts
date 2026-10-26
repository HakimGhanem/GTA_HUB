import { buildAmazonAffiliateUrl } from "@/lib/amazon-affiliate";
import type { PreorderProduct } from "@/data/preorder-products";
import { searchQueryForProduct } from "@/lib/affiliate/catalog";
import { isAmazonStoreId } from "@/lib/affiliate/amazon-markets";
import { wrapWithPartnerBase } from "@/lib/affiliate/partner-bases";
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
  /** First-ranked checkout — the only button shown until "other stores". */
  primary: boolean;
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

/** Fnac: tracking wrap when configured, else official search (enabled on fr). */
export function buildFnacSearchUrl(query: string): string {
  const official = `https://www.fnac.com/SearchResult/ResultList.aspx?Search=${encodeURIComponent(query)}`;
  return wrapWithPartnerBase("fnac", official, query);
}

/** Best Buy: only offered when its tracking base is configured. */
export function buildBestBuySearchUrl(query: string): string {
  const official = `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(query)}`;
  return wrapWithPartnerBase("bestbuy", official, query);
}

/** Instant Gaming: localised official search, tracking wrap when configured. */
export function buildInstantGamingSearchUrl(
  query: string,
  locale = "en",
): string {
  const path = INSTANT_GAMING_SEARCH_PATH[locale] ?? INSTANT_GAMING_SEARCH_PATH.en;
  const official = `https://www.instant-gaming.com/${path}/?q=${encodeURIComponent(query)}`;
  return wrapWithPartnerBase("instant_gaming", official, query);
}

/** Eneba: localised official search, tracking wrap when configured. */
export function buildEnebaSearchUrl(query: string, locale = "en"): string {
  const prefix = ENEBA_LOCALE_PREFIX[locale] ?? "";
  const official = `https://www.eneba.com${prefix}/store/all?text=${encodeURIComponent(query)}`;
  return wrapWithPartnerBase("eneba", official, query);
}

/** CDKeys: single English storefront, tracking wrap when configured. */
export function buildCdkeysSearchUrl(query: string): string {
  const official = `https://www.cdkeys.com/catalogsearch/result/?q=${encodeURIComponent(query)}`;
  return wrapWithPartnerBase("cdkeys", official, query);
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
    : buildStoreSearchUrl(store, searchQueryForProduct(product, store.id));
}

export function buildOfferUrl(
  store: AffiliateStore,
  product: PreorderProduct,
  locale: string,
): string {
  const query = searchQueryForProduct(product, store.id);
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

function offerScore(
  store: AffiliateStore,
  target: StoreOffer["target"],
  locale: string,
): number {
  const primaryAmazon = amazonStoreForLocale(locale)?.id;
  const isAmazon = isAmazonStoreId(store.id);
  if (isAmazon && target === "product" && store.id === primaryAmazon) return 100;
  if (isAmazon && target === "product") return 70;
  if (store.id === "playstation" || store.id === "xbox") return 60;
  if (store.kind === "affiliate" && target === "product") return 40;
  if (isAmazon && target === "search") return 10;
  return 20;
}

export function offersForProduct(
  product: PreorderProduct,
  locale: string,
): StoreOffer[] {
  const ranked = STORES.filter((store) =>
    storeAppliesToProduct(store, product, locale),
  )
    .map((store) => {
      const isAmazon = isAmazonStoreId(store.id);
      const hasAsin = isAmazon && asinForStore(store, product).length > 0;
      const target: StoreOffer["target"] = hasAsin ? "product" : "search";
      return { store, target, score: offerScore(store, target, locale) };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return OFFER_ORDER.indexOf(a.store.id) - OFFER_ORDER.indexOf(b.store.id);
    });

  return ranked.map(({ store, target }, index) => {
    const isAmazon = isAmazonStoreId(store.id);
    return {
      id: store.id,
      label: store.label,
      href: buildOfferUrl(store, product, locale),
      kind: store.kind,
      variant: isAmazon ? "amazon" : "secondary",
      target,
      cta: ctaForStore(store, target),
      primary: index === 0,
    };
  });
}

export type OfferCtaKey =
  | "viewOnStore"
  | "searchOnStore"
  | "preorderOnStore"
  | "buyOnStore";

/** Replace the English fallback CTAs with translated ones. */
export function localizeOffers(
  offers: StoreOffer[],
  t: (key: OfferCtaKey, values: { store: string }) => string,
  verb: "preorder" | "buy" = "preorder",
): StoreOffer[] {
  return offers.map((offer) => {
    const key: OfferCtaKey = offer.primary
      ? verb === "buy"
        ? "buyOnStore"
        : "preorderOnStore"
      : offer.target === "search"
        ? "searchOnStore"
        : "viewOnStore";
    return { ...offer, cta: t(key, { store: offer.label }) };
  });
}

export function productHasOffers(
  product: PreorderProduct,
  locale: string,
): boolean {
  return offersForProduct(product, locale).length > 0;
}
