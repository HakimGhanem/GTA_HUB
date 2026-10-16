"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/track";
import { activatePro, PRO_SESSION_KEY } from "@/lib/isPro";
import { PRO_CURRENCY, PRO_PRICE_CENTS } from "@/lib/pro/product";

export function SetProCookie({
  sessionId,
  email,
  paid,
}: {
  sessionId?: string;
  email?: string;
  paid: boolean;
}) {
  useEffect(() => {
    if (!paid || !sessionId) return;
    let alreadyCounted = false;
    try {
      alreadyCounted = window.localStorage.getItem(PRO_SESSION_KEY) === sessionId;
    } catch {
      /* storage blocked */
    }
    activatePro(sessionId, email);
    if (!alreadyCounted) {
      trackEvent("purchase", {
        transaction_id: sessionId,
        value: PRO_PRICE_CENTS / 100,
        currency: PRO_CURRENCY.toUpperCase(),
        item_name: "map6-pro",
      });
    }
  }, [paid, sessionId, email]);

  return null;
}
