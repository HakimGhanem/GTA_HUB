"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ADSENSE_CLIENT } from "@/lib/ads-config";
import { isPro } from "@/lib/isPro";

/**
 * AdSense loader. lazyOnload keeps it off the LCP path.
 * Verification still uses ads.txt + google-adsense-account meta.
 * Script stays in the first HTML for AdSense verification. Only hide after
 * we confirm Pro on the client — default false so crawlers still see it.
 */
export function AdSenseScript() {
  const [pro, setPro] = useState(false);

  useEffect(() => {
    setPro(isPro());
    const onChange = () => setPro(isPro());
    window.addEventListener("map6-pro", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("map6-pro", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!ADSENSE_CLIENT || pro) return null;

  return (
    <Script
      id="adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
