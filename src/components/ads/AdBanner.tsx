"use client";

import { usePathname } from "next/navigation";
import { AD_SLOTS, shouldShowAds } from "@/lib/ads-config";
import { AdUnit } from "./AdUnit";

/** Footer-area banner — auto-hidden on /map and when AdSense is disabled. */
export function AdBanner() {
  const pathname = usePathname();

  if (!shouldShowAds(pathname) || !AD_SLOTS.banner) return null;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-4">
      <AdUnit slot={AD_SLOTS.banner} format="auto" />
    </div>
  );
}
