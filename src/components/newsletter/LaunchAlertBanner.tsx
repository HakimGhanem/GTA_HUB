"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { readCookieConsent } from "@/lib/analytics/consent";
import { trackEvent } from "@/lib/analytics/track";
import {
  readLaunchAlertState,
  writeLaunchAlertState,
} from "@/lib/waitlist/local";
import { LaunchAlertForm } from "./LaunchAlertForm";

/** Late enough that it reads as an offer to an engaged reader, not a wall. */
const REVEAL_DELAY_MS = 25_000;
const REVEAL_SCROLL_RATIO = 0.35;
const HIDE_AFTER_SUCCESS_MS = 5_000;

function scrolledPastThreshold(target: EventTarget | null): boolean {
  const el =
    target instanceof HTMLElement
      ? target
      : document.scrollingElement ?? document.documentElement;

  const scrollable = el.scrollHeight - el.clientHeight;
  if (scrollable <= 0) return false;

  return el.scrollTop / scrollable >= REVEAL_SCROLL_RATIO;
}

/**
 * Sticky launch-alert bar. Held back until the visitor has chosen a cookie
 * option (so it never stacks on the consent dialog) and until they have either
 * read for a while or scrolled — and never on a page that already has the
 * inline block.
 */
export function LaunchAlertBanner() {
  // Remount per route so each page re-arms its own reveal timer and scroll
  // threshold from a hidden state.
  const pathname = usePathname();
  return <Banner key={pathname} />;
}

function Banner() {
  const t = useTranslations("newsletter");
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    writeLaunchAlertState("dismissed");
    setVisible(false);
    trackEvent("launch_alert_dismiss", { placement: "banner" });
  }, []);

  useEffect(() => {
    if (readLaunchAlertState()) return;
    if (document.querySelector("[data-launch-alert-inline]")) return;

    let consented = readCookieConsent() !== null;
    let delayElapsed = false;
    let armed = false;

    const reveal = () => {
      if (armed || !consented) return;
      armed = true;
      setVisible(true);
      trackEvent("launch_alert_view", { placement: "banner" });
    };

    const onScroll = (e: Event) => {
      if (scrolledPastThreshold(e.target)) reveal();
    };
    // A visitor who answers the cookie dialog late still gets the banner.
    const onConsent = () => {
      consented = true;
      if (delayElapsed) reveal();
    };

    const timer = window.setTimeout(() => {
      delayElapsed = true;
      reveal();
    }, REVEAL_DELAY_MS);
    // Capture phase: the page scrolls inside a container, not the window.
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("map6-consent", onConsent);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("map6-consent", onConsent);
    };
  }, []);

  const onSuccess = useCallback(() => {
    window.setTimeout(() => setVisible(false), HIDE_AFTER_SUCCESS_MS);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label={t("bannerTitle")}
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-pink-400/25 bg-[#0d121c]/95 px-4 py-3 shadow-2xl backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-pink-200">
            {t("bannerTitle")}
          </p>
          <p className="mt-0.5 text-xs text-white/55">{t("bannerDesc")}</p>
        </div>
        <div className="flex items-center gap-2 sm:w-[26rem]">
          <LaunchAlertForm placement="banner" onSuccess={onSuccess} />
          <button
            type="button"
            onClick={dismiss}
            aria-label={t("dismiss")}
            className="shrink-0 self-start rounded-full p-2 text-white/40 hover:text-white/80"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
