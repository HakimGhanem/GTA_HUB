import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import {
  AMAZON_ENABLED,
} from "@/lib/amazon-affiliate";
import type { PreorderProduct } from "@/data/preorder-products";
import { buildAmazonProductUrlForLocale } from "@/lib/affiliate/store-links";

type AmazonAffiliateLinkProps = {
  /**
   * Takes the whole product, not a bare ASIN: each marketplace needs its own
   * ASIN, so the destination can only be resolved from the product slot.
   */
  product: PreorderProduct;
  children: ReactNode;
  className?: string;
  /** next-intl locale. When omitted, read from the request. */
  locale?: string;
};

/**
 * Amazon affiliate link with required rel attributes (nofollow sponsored).
 * Routes to the locale Amazon storefront when that store tag is enabled.
 */
export async function AmazonAffiliateLink({
  product,
  children,
  className,
  locale: localeProp,
}: AmazonAffiliateLinkProps) {
  const locale = localeProp ?? (await getLocale().catch(() => "fr"));
  const href = buildAmazonProductUrlForLocale(product, locale);

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export { AMAZON_ENABLED };
