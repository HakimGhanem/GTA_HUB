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

/** Fast enough for ChatGPT / bounce sessions. Email is first-party. */
const REVEAL_DELAY_MS = 6_000;
const REVEAL_SCROLL_RATIO = 0.2;
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
 * Sticky launch-alert bar. Shown after a short dwell or light scroll —
 * independent of cookie consent. Sits above the cookie dialog when that
 * dialog is still open so the two bars do not stack.
 */
export function LaunchAlertBanner() {
  const pathname = usePathname();
  return <Banner key={pathname} />;
}

function Banner() {
  const t = useTranslations("newsletter");
  const [visible, setVisible] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  const dismiss = useCallback(() => {
    writeLaunchAlertState("dismissed");
    setVisible(false);
    trackEvent("launch_alert_dismiss", { placement: "banner" });
  }, []);

  useEffect(() => {
    setCookieOpen(readCookieConsent() === null);
    const onConsent = () => setCookieOpen(false);
    window.addEventListener("map6-consent", onConsent);
    return () => window.removeEventListener("map6-consent", onConsent);
  }, []);

  useEffect(() => {
    if (readLaunchAlertState()) return;

    let armed = false;
    const reveal = () => {
      if (armed || readLaunchAlertState()) return;
      armed = true;
      setVisible(true);
      trackEvent("launch_alert_view", { placement: "banner" });
    };

    const onScroll = (e: Event) => {
      if (scrolledPastThreshold(e.target)) reveal();
    };
    const onJoined = () => {
      if (readLaunchAlertState() === "joined") setVisible(false);
    };

    const timer = window.setTimeout(reveal, REVEAL_DELAY_MS);
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("map6-launch-alert", onJoined);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("map6-launch-alert", onJoined);
    };
  }, []);

  const onSuccess = useCallback(() => {
    window.setTimeout(() => setVisible(false), HIDE_AFTER_SUCCESS_MS);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label={t("bannerTitle")}
      className={`fixed inset-x-0 z-[90] border-t border-pink-400/25 bg-surface/95 px-4 py-3 shadow-2xl backdrop-blur-md ${
        cookieOpen ? "bottom-[9.5rem] sm:bottom-28" : "bottom-0"
      }`}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-accent">
            {t("bannerTitle")}
          </p>
          <p className="mt-0.5 text-xs text-foreground/55">{t("bannerDesc")}</p>
        </div>
        <div className="flex items-center gap-2 sm:w-[26rem]">
          <LaunchAlertForm placement="banner" compact onSuccess={onSuccess} />
          <button
            type="button"
            onClick={dismiss}
            aria-label={t("dismiss")}
            className="shrink-0 self-start rounded-full p-2 text-foreground/40 hover:text-foreground/80"
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
