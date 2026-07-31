"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/lib/ads-config";

type AdUnitProps = {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  layout?: string;
  layoutKey?: string;
  className?: string;
  label?: string;
};

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/**
 * Manual AdSense unit. Only mount on indexable editorial pages.
 * Call push() once per mount — React strict mode safe via ref guard.
 */
export function AdUnit({
  slot,
  format = "auto",
  layout,
  layoutKey,
  className = "",
  label = "Advertisement",
}: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_ENABLED || !slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      /* ad blocker or script not loaded */
    }
  }, [slot]);

  if (!ADSENSE_ENABLED || !slot) return null;

  const isFluid = format === "fluid";

  return (
    <aside
      className={`my-6 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] ${className}`}
      aria-label={label}
    >
      <p className="px-3 pt-2 text-[10px] uppercase tracking-wider text-white/30">
        {label}
      </p>
      <ins
        className="adsbygoogle block min-h-[90px] w-full px-2 pb-2"
        style={{ display: "block", textAlign: isFluid ? "center" : undefined }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(!isFluid ? { "data-full-width-responsive": "true" } : {})}
        {...(layout ? { "data-ad-layout": layout } : {})}
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      />
    </aside>
  );
}
