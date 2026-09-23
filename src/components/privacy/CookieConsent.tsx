"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  applyConsentUpdate,
  CONSENT_STORAGE_KEY,
  readCookieConsent,
  type CookieConsentChoice,
} from "@/lib/analytics/consent";

type Consent = CookieConsentChoice | null;

/**
 * Consent UI for AdSense / GA4. Updates Google Consent Mode on save.
 */
export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readCookieConsent());
    setReady(true);
  }, []);

  function save(value: CookieConsentChoice) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    setConsent(value);
    applyConsentUpdate(value);
    window.dispatchEvent(
      new CustomEvent("map6-consent", { detail: { consent: value } }),
    );
  }

  if (!ready || consent) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-foreground/15 bg-surface/95 p-4 shadow-2xl backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p
            id="cookie-consent-title"
            className="text-sm font-semibold text-foreground"
          >
            {t("title")}
          </p>
          <p
            id="cookie-consent-desc"
            className="mt-1 text-xs leading-relaxed text-foreground/60"
          >
            {t.rich("desc", {
              privacyLink: (chunks) => (
                <Link
                  href="/privacy"
                  className="text-accent underline hover:text-accent/80"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save("essential")}
            className="rounded-full border border-foreground/20 px-4 py-2 text-xs font-semibold text-foreground/80 hover:border-foreground/40"
          >
            {t("essential")}
          </button>
          <button
            type="button"
            onClick={() => save("all")}
            className="rounded-full bg-pink-500 px-4 py-2 text-xs font-semibold text-accent-foreground hover:bg-pink-400"
          >
            {t("acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
