import type { ReactNode } from "react";
import {
  AMAZON_ENABLED,
  buildAmazonAffiliateUrl,
} from "@/lib/amazon-affiliate";

type AmazonAffiliateLinkProps = {
  asin: string;
  children: ReactNode;
  className?: string;
};

/**
 * Amazon affiliate link with required rel attributes (nofollow sponsored).
 * Renders a plain external link when tag is not configured yet.
 */
export function AmazonAffiliateLink({
  asin,
  children,
  className,
}: AmazonAffiliateLinkProps) {
  const href = buildAmazonAffiliateUrl(asin);

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
