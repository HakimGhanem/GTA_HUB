"use client";

import type { ReactNode } from "react";
import { trackAffiliateClick, type AffiliateClick } from "@/lib/analytics/affiliate";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** `sponsored` only when the click is actually commissioned. */
  monetised: boolean;
  click: Omit<AffiliateClick, "monetised">;
};

/**
 * Every outbound merchant link goes through here so no surface can ship an
 * untracked CTA. Tracking runs on click rather than on navigation because the
 * tab opens immediately and a `beforeunload` hook would miss `target=_blank`.
 */
export function OutboundLink({
  href,
  children,
  className,
  monetised,
  click,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel={
        monetised
          ? "nofollow sponsored noopener noreferrer"
          : "nofollow noopener noreferrer"
      }
      className={className}
      onClick={() => trackAffiliateClick({ ...click, monetised })}
    >
      {children}
    </a>
  );
}
