import { ADSENSE_CLIENT } from "@/lib/ads-config";

/**
 * AdSense loader for site verification + ad units.
 * Rendered as a raw <script> in <head> so the AdSense crawler can see it
 * without executing Next.js client hydration.
 */
export function AdSenseScript() {
  if (!ADSENSE_CLIENT) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
