import Script from "next/script";
import { ADSENSE_CLIENT } from "@/lib/ads-config";

/**
 * AdSense loader. lazyOnload keeps it off the LCP path.
 * Verification still uses ads.txt + google-adsense-account meta.
 */
export function AdSenseScript() {
  if (!ADSENSE_CLIENT) return null;

  return (
    <Script
      id="adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
