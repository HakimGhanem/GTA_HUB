"use client";

import { useEffect, useState } from "react";
import { ADSENSE_CLIENT } from "@/lib/ads-config";
import { isPro } from "@/lib/isPro";

/**
 * AdSense loader. A native async script (not next/script) — the loader rejects
 * the `data-nscript` attribute next/script adds, and `lazyOnload` delayed the
 * tag until after every other resource, so queued adsbygoogle.push() calls
 * could outlive their <ins> elements.
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
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
