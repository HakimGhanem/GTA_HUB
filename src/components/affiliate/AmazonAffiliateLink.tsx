import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import {
  AMAZON_ENABLED,
} from "@/lib/amazon-affiliate";
import { buildAmazonUrlForLocale } from "@/lib/affiliate/store-links";

type AmazonAffiliateLinkProps = {
  asin: string;
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
  asin,
  children,
  className,
  locale: localeProp,
}: AmazonAffiliateLinkProps) {
  const locale = localeProp ?? (await getLocale().catch(() => "fr"));
  const href = buildAmazonUrlForLocale(asin, locale);

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
