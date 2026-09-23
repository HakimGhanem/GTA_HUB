"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

export function BuyProButton() {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error(data.error || "Checkout failed");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error && err.message === "rate_limited"
          ? "Too many attempts. Try again in a minute."
          : "Checkout could not start. Try again or write to hello@map-6.com.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="w-full max-w-sm rounded-lg bg-amber-500 px-8 py-3.5 text-base font-bold text-black transition-opacity hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading
          ? "Redirecting to Stripe..."
          : "Get Map-6 Pro — €3.99 once, forever"}
      </button>
      <p className="mt-2 text-xs text-foreground/45">
        One payment. No subscription. No renewal. Ever.
      </p>
      {error ? (
        <p aria-live="polite" className="mt-3 text-xs text-amber-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
