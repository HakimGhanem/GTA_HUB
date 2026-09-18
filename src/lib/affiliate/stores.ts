import { AMAZON_STORE } from "@/lib/amazon-affiliate";
import type { PreorderProduct } from "@/data/preorder-products";
import {
  AMAZON_STORE_IDS,
  asinForAmazonStore,
  existsOnAmazon,
  isAmazonStoreId,
  type AmazonStoreId,
} from "@/lib/affiliate/amazon-markets";

/**
 * Multi-storefront IDs. A store is enabled only when its env tag/base is set,
 * except PlayStation / Xbox (official search, no partner IDs) and Fnac on `fr`
 * (official search fallback when NEXT_PUBLIC_FNAC_AFFILIATE_BASE is unset).
 */
export const AFFILIATE_STORES = [
  ...AMAZON_STORE_IDS,
  "fnac",
  "bestbuy",
  "playstation",
  "xbox",
  "instant_gaming",
  "eneba",
  "cdkeys",
] as const;

export type AffiliateStoreId = (typeof AFFILIATE_STORES)[number];

export type StoreLinkKind = "affiliate" | "official";

export type AffiliateStore = {
  id: AffiliateStoreId;
  label: string;
  /** Locale preference for auto-routing */
  locales: string[];
  enabled: boolean;
  baseUrl: string;
  kind: StoreLinkKind;
  /** When set, only these product platforms get this storefront */
  platforms?: PreorderProduct["platform"][];
  /** When set, only these editions get this storefront */
  editions?: PreorderProduct["edition"][];
  /** Query param for partner tag when applicable */
  tagParam?: string;
  tag?: string;
};

const ALL_LOCALES = ["en", "fr", "es", "pt", "de", "it"];

function envTrim(key: string): string {
  return process.env[key]?.trim() ?? "";
}

/**
 * Next only inlines NEXT_PUBLIC_* when the key is a string literal.
 * `process.env[amazonTagEnvVar(id)]` stays empty in the Cloud Run bundle.
 */
const AMAZON_TAGS: Record<AmazonStoreId, string> = {
  amazon_fr: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG?.trim() ?? "",
  amazon_co_uk: process.env.NEXT_PUBLIC_AMAZON_UK_TAG?.trim() ?? "",
  amazon_com: process.env.NEXT_PUBLIC_AMAZON_US_TAG?.trim() ?? "",
  amazon_de: process.env.NEXT_PUBLIC_AMAZON_DE_TAG?.trim() ?? "",
  amazon_es: process.env.NEXT_PUBLIC_AMAZON_ES_TAG?.trim() ?? "",
  amazon_it: process.env.NEXT_PUBLIC_AMAZON_IT_TAG?.trim() ?? "",
};

/**
 * Associates tags are per-marketplace: an amazon.fr tag does not track on
 * amazon.co.uk. Each storefront therefore requires its own tag and never
 * borrows another market's, so a click is either tracked or not offered.
 */
function amazonStore(
  id: AmazonStoreId,
  label: string,
  locales: string[],
  baseUrl: string,
): AffiliateStore {
  const tag = AMAZON_TAGS[id];
  return {
    id,
    label,
    locales,
    enabled: Boolean(tag),
    baseUrl,
    kind: "affiliate",
    tagParam: "tag",
    tag: tag || undefined,
  };
}

const FNAC_AFFILIATE_BASE = envTrim("NEXT_PUBLIC_FNAC_AFFILIATE_BASE");
const BESTBUY_AFFILIATE_BASE = envTrim("NEXT_PUBLIC_BESTBUY_AFFILIATE_BASE");
const INSTANT_GAMING_AFFILIATE_BASE = envTrim(
  "NEXT_PUBLIC_INSTANT_GAMING_AFFILIATE_BASE",
);
const ENEBA_AFFILIATE_BASE = envTrim("NEXT_PUBLIC_ENEBA_AFFILIATE_BASE");
const CDKEYS_AFFILIATE_BASE = envTrim("NEXT_PUBLIC_CDKEYS_AFFILIATE_BASE");

/**
 * Key resellers list digital codes only: no console, no controller, and no
 * physical Collector's box. Offering them there would send a click to a
 * marketplace that cannot fulfil the product.
 */
const KEY_STORE_EDITIONS: PreorderProduct["edition"][] = ["standard", "ultimate"];

export const STORES: AffiliateStore[] = [
  amazonStore("amazon_fr", "Amazon.fr", ["fr"], "https://www.amazon.fr"),
  // English traffic is UK-first (Associates UK), with amazon.com for US/CA/AU.
  amazonStore("amazon_co_uk", "Amazon.co.uk", ["en"], "https://www.amazon.co.uk"),
  amazonStore("amazon_com", "Amazon.com", ["en"], "https://www.amazon.com"),
  amazonStore("amazon_de", "Amazon.de", ["de"], "https://www.amazon.de"),
  amazonStore("amazon_es", "Amazon.es", ["es", "pt"], "https://www.amazon.es"),
  amazonStore("amazon_it", "Amazon.it", ["it"], "https://www.amazon.it"),
  {
    id: "fnac",
    label: "Fnac",
    locales: ["fr"],
    // Affiliate wrap when env is set; otherwise official search on fr.
    enabled: true,
    kind: FNAC_AFFILIATE_BASE ? "affiliate" : "official",
    baseUrl: FNAC_AFFILIATE_BASE || "https://www.fnac.com",
  },
  {
    id: "bestbuy",
    label: "Best Buy",
    locales: ["en"],
    enabled: Boolean(BESTBUY_AFFILIATE_BASE),
    kind: "affiliate",
    baseUrl: BESTBUY_AFFILIATE_BASE || "https://www.bestbuy.com",
  },
  {
    id: "playstation",
    label: "PlayStation Store",
    locales: ALL_LOCALES,
    enabled: true,
    kind: "official",
    platforms: ["PS5"],
    baseUrl: "https://store.playstation.com",
  },
  {
    id: "xbox",
    label: "Xbox Store",
    locales: ALL_LOCALES,
    enabled: true,
    kind: "official",
    platforms: ["Xbox"],
    baseUrl: "https://www.xbox.com",
  },
  {
    id: "instant_gaming",
    label: "Instant Gaming",
    locales: ALL_LOCALES,
    enabled: Boolean(INSTANT_GAMING_AFFILIATE_BASE),
    kind: "affiliate",
    editions: KEY_STORE_EDITIONS,
    baseUrl: INSTANT_GAMING_AFFILIATE_BASE || "https://www.instant-gaming.com",
  },
  {
    id: "eneba",
    label: "Eneba",
    locales: ALL_LOCALES,
    enabled: Boolean(ENEBA_AFFILIATE_BASE),
    kind: "affiliate",
    editions: KEY_STORE_EDITIONS,
    baseUrl: ENEBA_AFFILIATE_BASE || "https://www.eneba.com",
  },
  {
    // cdkeys.com is a single English storefront, unlike the localised two above.
    id: "cdkeys",
    label: "CDKeys",
    locales: ["en"],
    enabled: Boolean(CDKEYS_AFFILIATE_BASE),
    kind: "affiliate",
    editions: KEY_STORE_EDITIONS,
    baseUrl: CDKEYS_AFFILIATE_BASE || "https://www.cdkeys.com",
  },
];

export function enabledStores(): AffiliateStore[] {
  return STORES.filter((s) => s.enabled);
}

export function enabledStoresForLocale(locale: string): AffiliateStore[] {
  return enabledStores().filter((s) => s.locales.includes(locale));
}

/** Every enabled Amazon marketplace serving this locale, in registry order. */
export function amazonStoresForLocale(locale: string): AffiliateStore[] {
  return STORES.filter(
    (s) => isAmazonStoreId(s.id) && s.enabled && s.locales.includes(locale),
  );
}

export function amazonStoreForLocale(locale: string): AffiliateStore | undefined {
  return amazonStoresForLocale(locale)[0];
}

export function primaryStoreForLocale(locale: string): AffiliateStore {
  const amazon = amazonStoreForLocale(locale);
  if (amazon) return amazon;
  const match = enabledStoresForLocale(locale)[0];
  if (match) return match;
  const fr = STORES.find((s) => s.id === "amazon_fr");
  if (fr?.enabled) return fr;
  return {
    id: "amazon_fr",
    label: "Amazon",
    locales: ["fr"],
    enabled: false,
    kind: "affiliate",
    baseUrl: AMAZON_STORE,
  };
}

function withTag(store: AffiliateStore, url: URL): string {
  if (store.tag && store.tagParam) url.searchParams.set(store.tagParam, store.tag);
  return url.toString();
}

/** Amazon /dp/ URL with Associates tag. Do not call with an invented ASIN. */
export function buildStoreProductUrl(store: AffiliateStore, asin: string): string {
  const base = store.baseUrl.replace(/\/$/, "");
  if (isAmazonStoreId(store.id) && asin) {
    return withTag(store, new URL(`/dp/${asin}`, base));
  }
  return base;
}

/**
 * Tagged search results on that marketplace. Associates links may point at a
 * search page, so this keeps a click monetised when we have no local ASIN —
 * unlike a /dp/ URL built from another marketplace's ASIN, which 404s.
 */
export function buildStoreSearchUrl(
  store: AffiliateStore,
  query: string,
): string {
  const url = new URL("/s", store.baseUrl.replace(/\/$/, ""));
  url.searchParams.set("k", query);
  return withTag(store, url);
}

/** Marketplace-specific ASIN, or "" when only a search link is possible. */
export function asinForStore(
  store: AffiliateStore,
  product: PreorderProduct,
): string {
  return isAmazonStoreId(store.id) ? asinForAmazonStore(product, store.id) : "";
}

export function storeAppliesToProduct(
  store: AffiliateStore,
  product: PreorderProduct,
  locale: string,
): boolean {
  if (!store.enabled) return false;
  if (!store.locales.includes(locale)) return false;
  if (store.platforms && !store.platforms.includes(product.platform)) {
    return false;
  }
  if (store.editions && !store.editions.includes(product.edition)) return false;
  // No Collector's SKU exists — official-store search would look like a listing.
  if (product.edition === "collectors") return false;
  // An Amazon storefront needs either its own ASIN or a sibling market's, which
  // proves the product is listed and makes a tagged search link worthwhile.
  if (isAmazonStoreId(store.id) && !existsOnAmazon(product)) return false;
  return true;
}
