export const CONSENT_STORAGE_KEY = "map6_cookie_consent";

export type CookieConsentChoice = "all" | "essential";

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (v === "all" || v === "essential") return v;
  return null;
}

export function consentFlags(choice: CookieConsentChoice) {
  const granted = choice === "all";
  return {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  } as const;
}

export function applyConsentUpdate(choice: CookieConsentChoice): void {
  if (typeof window === "undefined") return;
  const flags = consentFlags(choice);
  window.dataLayer = window.dataLayer ?? [];
  const gtag = window.gtag;
  if (typeof gtag === "function") {
    gtag("consent", "update", flags);
  } else {
    window.dataLayer.push(["consent", "update", flags]);
  }
}
