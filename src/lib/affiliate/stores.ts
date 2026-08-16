import { AMAZON_AFFILIATE_TAG, AMAZON_STORE } from "@/lib/amazon-affiliate";

/**
 * Multi-storefront scaffolding. Amazon is live; others are hooks for when
 * partner programs / deep links are approved (Fnac, Best Buy, etc.).
 */
export const AFFILIATE_STORES = [
  "amazon_fr",
  "amazon_com",
  "amazon_de",
  "amazon_es",
  "amazon_it",
  "fnac",
  "bestbuy",
] as const;

export type AffiliateStoreId = (typeof AFFILIATE_STORES)[number];

export type AffiliateStore = {
  id: AffiliateStoreId;
  label: string;
  /** Locale preference for auto-routing */
  locales: string[];
  enabled: boolean;
  baseUrl: string;
  /** Query param for partner tag when applicable */
  tagParam?: string;
  tag?: string;
};

function amazonStore(
  id: AffiliateStoreId,
  label: string,
  locales: string[],
  baseUrl: string,
  envTagKey: string,
): AffiliateStore {
  const tag = process.env[envTagKey]?.trim() || AMAZON_AFFILIATE_TAG;
  const enabled = Boolean(tag) && (id === "amazon_fr" || Boolean(process.env[envTagKey]));
  return {
    id,
    label,
    locales,
    enabled: id === "amazon_fr" ? Boolean(AMAZON_AFFILIATE_TAG) : enabled,
    baseUrl,
    tagParam: "tag",
    tag: tag || undefined,
  };
}

export const STORES: AffiliateStore[] = [
  amazonStore("amazon_fr", "Amazon.fr", ["fr"], "https://www.amazon.fr", "NEXT_PUBLIC_AMAZON_AFFILIATE_TAG"),
  amazonStore("amazon_com", "Amazon.com", ["en"], "https://www.amazon.com", "NEXT_PUBLIC_AMAZON_US_TAG"),
  amazonStore("amazon_de", "Amazon.de", ["de"], "https://www.amazon.de", "NEXT_PUBLIC_AMAZON_DE_TAG"),
  amazonStore("amazon_es", "Amazon.es", ["es"], "https://www.amazon.es", "NEXT_PUBLIC_AMAZON_ES_TAG"),
  amazonStore("amazon_it", "Amazon.it", ["it"], "https://www.amazon.it", "NEXT_PUBLIC_AMAZON_IT_TAG"),
  {
    id: "fnac",
    label: "Fnac",
    locales: ["fr"],
    enabled: Boolean(process.env.NEXT_PUBLIC_FNAC_AFFILIATE_BASE),
    baseUrl: process.env.NEXT_PUBLIC_FNAC_AFFILIATE_BASE ?? "https://www.fnac.com",
  },
  {
    id: "bestbuy",
    label: "Best Buy",
    locales: ["en"],
    enabled: Boolean(process.env.NEXT_PUBLIC_BESTBUY_AFFILIATE_BASE),
    baseUrl: process.env.NEXT_PUBLIC_BESTBUY_AFFILIATE_BASE ?? "https://www.bestbuy.com",
  },
];

export function primaryStoreForLocale(locale: string): AffiliateStore {
  const match = STORES.find((s) => s.enabled && s.locales.includes(locale));
  if (match) return match;
  const fr = STORES.find((s) => s.id === "amazon_fr");
  if (fr?.enabled) return fr;
  return {
    id: "amazon_fr",
    label: "Amazon",
    locales: ["fr"],
    enabled: false,
    baseUrl: AMAZON_STORE,
  };
}

export function buildStoreProductUrl(store: AffiliateStore, asin: string): string {
  const base = store.baseUrl.replace(/\/$/, "");
  if (store.id.startsWith("amazon")) {
    const url = new URL(`/dp/${asin}`, base);
    if (store.tag && store.tagParam) url.searchParams.set(store.tagParam, store.tag);
    return url.toString();
  }
  // Non-Amazon: partner deep-link templates can replace this later
  return `${base}?q=${encodeURIComponent(asin)}`;
}

export function enabledStores(): AffiliateStore[] {
  return STORES.filter((s) => s.enabled);
}
