"use client";

import { useEffect } from "react";
import {
  applyConsentUpdate,
  readCookieConsent,
  type CookieConsentChoice,
} from "@/lib/analytics/consent";

/**
 * Applies stored cookie choice to GA Consent Mode after hydration.
 */
export function ConsentBridge() {
  useEffect(() => {
    const stored = readCookieConsent();
    if (stored) applyConsentUpdate(stored);

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<{ consent: CookieConsentChoice }>).detail;
      if (detail?.consent) applyConsentUpdate(detail.consent);
    };

    window.addEventListener("map6-consent", onConsent);
    return () => window.removeEventListener("map6-consent", onConsent);
  }, []);

  return null;
}
