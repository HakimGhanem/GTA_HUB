import { getLocale, getTranslations } from "next-intl/server";
import { StoreOfferButtons } from "@/components/affiliate/StoreOfferButtons";
import type { PreorderProduct } from "@/data/preorder-products";
import { displayProductPrice, productEnvVar } from "@/data/preorder-products";
import { getProductCopy } from "@/data/product-copy-i18n";
import { localizeOffers, offersForProduct } from "@/lib/affiliate/store-links";

const PLATFORM_COLORS: Record<PreorderProduct["platform"], string> = {
  PS5: "bg-blue-500/20 text-blue-300",
  Xbox: "bg-green-500/20 text-green-300",
  PC: "bg-purple-500/20 text-purple-300",
  Multi: "bg-foreground/10 text-foreground/70",
};

type AmazonProductCardProps = {
  product: PreorderProduct;
  /**
   * Dev-only SiteStripe slot UI (env var name + B0XXXXXXXX).
   * Ignored in production — empty ASINs never render there.
   */
  showPlaceholders?: boolean;
  /** next-intl locale. When omitted, read from the request (fallback "fr"). */
  locale?: string;
};

export async function AmazonProductCard({
  product,
  showPlaceholders = false,
  locale: localeProp,
}: AmazonProductCardProps) {
  const locale = localeProp ?? (await getLocale().catch(() => "fr"));
  const t = await getTranslations({ locale, namespace: "affiliate" });
  const copy = getProductCopy(product, locale);
  const hasAsin = product.asin.length > 0;
  const allowPlaceholder =
    showPlaceholders && process.env.NODE_ENV !== "production";
  const verb =
    product.edition === "hardware" ||
    product.edition === "accessory" ||
    product.edition === "gift_card"
      ? "buy"
      : "preorder";
  const offers = localizeOffers(
    offersForProduct(product, locale),
    (key, values) => t(key, values),
    verb,
  );
  const price = displayProductPrice(product, locale);
  const format = product.commerce?.format;

  if (!hasAsin && !allowPlaceholder && offers.length === 0) return null;

  return (
    <div className="flex flex-col rounded-xl border border-foreground/10 bg-foreground/5 p-5 transition-colors hover:border-pink-400/30">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${PLATFORM_COLORS[product.platform]}`}
        >
          {product.platform}
        </span>
        {copy.badge && (
          <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-xs font-medium text-accent">
            {copy.badge}
          </span>
        )}
        {format === "code_in_box" ? (
          <span className="rounded-full border border-foreground/10 px-2 py-0.5 text-xs text-foreground/50">
            {t("formatCodeInBox")}
          </span>
        ) : null}
        {format === "digital" ? (
          <span className="rounded-full border border-emerald-400/20 px-2 py-0.5 text-xs text-emerald-300">
            {t("formatDigital")}
          </span>
        ) : null}
      </div>

      <h3 className="text-lg font-semibold text-foreground">{copy.label}</h3>
      {price ? (
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{price.primary}</span>
          {price.compare ? (
            <span className="text-sm text-foreground/40 line-through">
              {price.compare}
            </span>
          ) : null}
        </p>
      ) : null}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/60">
        {copy.description}
      </p>

      {!hasAsin && allowPlaceholder ? (
        <div className="mt-4 rounded-lg border border-dashed border-foreground/15 bg-foreground/[0.02] px-4 py-3">
          <p className="text-xs font-medium text-foreground/50">
            ASIN slot — paste SiteStripe link
          </p>
          <code className="mt-1 block text-[10px] text-foreground/30">
            {productEnvVar(product.envKey)}=B0XXXXXXXX
          </code>
        </div>
      ) : null}

      <StoreOfferButtons
        offers={offers}
        otherStoresLabel={t("otherStores")}
      />
    </div>
  );
}
