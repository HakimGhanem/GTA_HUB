"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "map6_cookie_consent";

type Consent = "all" | "essential" | null;

function readConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v === "all" || v === "essential") return v;
  return null;
}

/**
 * Lightweight consent UI for AdSense / analytics disclosure.
 * Accept → personalized ads OK; Essential → ads may be non-personalized.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  function save(value: Exclude<Consent, null>) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
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
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/15 bg-[#0d121c]/95 p-4 shadow-2xl backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p
            id="cookie-consent-title"
            className="text-sm font-semibold text-white"
          >
            Cookies & ads
          </p>
          <p id="cookie-consent-desc" className="mt-1 text-xs leading-relaxed text-white/60">
            We use cookies for essential site features, analytics, and Google
            AdSense ads (clearly labeled “Advertisement”). See our{" "}
            <Link href="/privacy" className="text-pink-300 underline hover:text-pink-200">
              Privacy Policy
            </Link>
            . You can change your choice anytime by clearing site data.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save("essential")}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 hover:border-white/40"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => save("all")}
            className="rounded-full bg-pink-500 px-4 py-2 text-xs font-semibold text-white hover:bg-pink-400"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
