"use client";

import { useEffect, useRef, useState } from "react";
import {
  ADSENSE_CLIENT,
  ADSENSE_ENABLED,
  ADSENSE_UNITS_VISIBLE,
} from "@/lib/ads-config";

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

type FillState = "pending" | "filled" | "unfilled";

/**
 * Manual AdSense unit. Label/chrome only when an ad is filled —
 * empty shells never cover editorial content while the site is "Getting ready".
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
  const insRef = useRef<HTMLModElement>(null);
  const [fill, setFill] = useState<FillState>("pending");

  useEffect(() => {
    if (!ADSENSE_ENABLED || !ADSENSE_UNITS_VISIBLE || !slot || pushed.current)
      return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      setFill("unfilled");
      return;
    }

    const el = insRef.current;
    if (!el) return;

    const check = () => {
      const status = el.getAttribute("data-ad-status");
      if (status === "filled") setFill("filled");
      else if (status === "unfilled") setFill("unfilled");
    };

    const observer = new MutationObserver(check);
    observer.observe(el, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
      childList: true,
      subtree: true,
    });

    const t1 = window.setTimeout(check, 2000);
    const t2 = window.setTimeout(() => {
      check();
      if (el.getAttribute("data-ad-status") !== "filled") {
        setFill((s) => (s === "filled" ? s : "unfilled"));
      }
    }, 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [slot]);

  if (!ADSENSE_ENABLED || !ADSENSE_UNITS_VISIBLE || !slot || fill === "unfilled")
    return null;

  const isFluid = format === "fluid";
  const filled = fill === "filled";

  return (
    <aside
      className={
        filled
          ? `my-6 max-h-[320px] overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] ${className}`
          : "sr-only"
      }
      aria-label={filled ? label : undefined}
      aria-hidden={!filled}
    >
      {filled ? (
        <p className="border-b border-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white/40">
          {label}
        </p>
      ) : null}
      <ins
        ref={insRef}
        className="adsbygoogle block w-full"
        style={{
          display: "block",
          minHeight: filled ? 90 : 1,
          maxHeight: 280,
          textAlign: isFluid ? "center" : undefined,
        }}
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
