import { readCookieConsent } from "./consent";

export type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>;

/** Strip undefined — gtag rejects sparse objects inconsistently. */
function cleanParams(params?: AnalyticsEventParams) {
  if (!params) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

/**
 * GA4 custom event (requires analytics_storage granted via Consent Mode).
 * No-ops in dev and when gtag is missing.
 */
export function trackEvent(name: string, params?: AnalyticsEventParams): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") return;
  if (readCookieConsent() !== "all") return;

  const gtag = window.gtag;
  if (typeof gtag !== "function") return;

  gtag("event", name, cleanParams(params));
}

/** SPA virtual page view on map query changes. */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") return;
  if (readCookieConsent() !== "all") return;

  const gtag = window.gtag;
  if (typeof gtag !== "function") return;

  gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}
