import { AMAZON_AFFILIATE_TAG, AMAZON_STORE } from "@/lib/amazon-affiliate";
import type { PreorderProduct } from "@/data/preorder-products";

/**
 * Multi-storefront IDs. A store is enabled only when its env tag/base is set,
 * except PlayStation / Xbox (official search, no partner IDs) and Fnac on `fr`
 * (official search fallback when NEXT_PUBLIC_FNAC_AFFILIATE_BASE is unset).
 */
export const AFFILIATE_STORES = [
  "amazon_fr",
  "amazon_com",
  "amazon_de",
  "amazon_es",
  "amazon_it",
  "fnac",
  "bestbuy",
  "playstation",
  "xbox",
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
  /** Query param for partner tag when applicable */
  tagParam?: string;
  tag?: string;
};

const ALL_LOCALES = ["en", "fr", "es", "pt", "de", "it"];

function envTrim(key: string): string {
  return process.env[key]?.trim() ?? "";
}

function amazonStore(
  id: AffiliateStoreId,
  label: string,
  locales: string[],
  baseUrl: string,
  envTagKey: string,
): AffiliateStore {
  const specificTag = envTrim(envTagKey);
  const tag = specificTag || AMAZON_AFFILIATE_TAG;
  const enabled =
    id === "amazon_fr" ? Boolean(AMAZON_AFFILIATE_TAG) : Boolean(specificTag);
  return {
    id,
    label,
    locales,
    enabled,
    baseUrl,
    kind: "affiliate",
    tagParam: "tag",
    tag: tag || undefined,
  };
}

const FNAC_AFFILIATE_BASE = envTrim("NEXT_PUBLIC_FNAC_AFFILIATE_BASE");
const BESTBUY_AFFILIATE_BASE = envTrim("NEXT_PUBLIC_BESTBUY_AFFILIATE_BASE");

export const STORES: AffiliateStore[] = [
  amazonStore(
    "amazon_fr",
    "Amazon.fr",
    ["fr"],
    "https://www.amazon.fr",
    "NEXT_PUBLIC_AMAZON_AFFILIATE_TAG",
  ),
  amazonStore(
    "amazon_com",
    "Amazon.com",
    ["en"],
    "https://www.amazon.com",
    "NEXT_PUBLIC_AMAZON_US_TAG",
  ),
  amazonStore(
    "amazon_de",
    "Amazon.de",
    ["de"],
    "https://www.amazon.de",
    "NEXT_PUBLIC_AMAZON_DE_TAG",
  ),
  amazonStore(
    "amazon_es",
    "Amazon.es",
    ["es"],
    "https://www.amazon.es",
    "NEXT_PUBLIC_AMAZON_ES_TAG",
  ),
  amazonStore(
    "amazon_it",
    "Amazon.it",
    ["it"],
    "https://www.amazon.it",
    "NEXT_PUBLIC_AMAZON_IT_TAG",
  ),
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
];

export function enabledStores(): AffiliateStore[] {
  return STORES.filter((s) => s.enabled);
}

export function enabledStoresForLocale(locale: string): AffiliateStore[] {
  return enabledStores().filter((s) => s.locales.includes(locale));
}

export function amazonStoreForLocale(locale: string): AffiliateStore | undefined {
  return STORES.find(
    (s) => s.id.startsWith("amazon") && s.enabled && s.locales.includes(locale),
  );
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

/** Amazon /dp/ URL with Associates tag. Do not call with an invented ASIN. */
export function buildStoreProductUrl(store: AffiliateStore, asin: string): string {
  const base = store.baseUrl.replace(/\/$/, "");
  if (store.id.startsWith("amazon") && asin) {
    const url = new URL(`/dp/${asin}`, base);
    if (store.tag && store.tagParam) url.searchParams.set(store.tagParam, store.tag);
    return url.toString();
  }
  return base;
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
  if (store.id.startsWith("amazon") && product.asin.length === 0) return false;
  return true;
}
