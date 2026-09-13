"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

type Status = "idle" | "sending" | "done" | "error";

export function ProWaitlist({ source = "pro" }: { source?: string }) {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim();
    if (!clean) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean, locale, source }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        duplicate?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(
          data.error === "rate_limited"
            ? "Too many attempts. Try again in a minute."
            : data.error === "invalid_email"
              ? "That email looks wrong — check the spelling."
              : "We could not save that. Mail us directly and we will add you by hand.",
        );
        return;
      }

      setStatus("done");
      setMessage(
        data.duplicate
          ? "You were already on the list — nothing else to do."
          : "You are on the list. We email once when Pro opens, and once for launch week.",
      );
    } catch {
      setStatus("error");
      setMessage(
        "Network error. Mail us directly and we will add you by hand.",
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6"
    >
      <h2 className="text-lg font-semibold text-white">Waitlist</h2>
      <p className="mt-2 text-sm text-white/55">
        One email when Map-6 Pro opens, one for GTA 6 launch week. No sharing,
        no third-party list, unsubscribe by replying. Prefer to write to a
        human?{" "}
        <a
          href="mailto:hello@map-6.com?subject=Map-6%20Pro%20waitlist"
          className="text-pink-300 underline"
        >
          hello@map-6.com
        </a>
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          disabled={status === "sending"}
          value={email}
          onChange={(e) => {
            if (status !== "sending") setStatus("idle");
            setEmail(e.target.value);
          }}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-md border border-white/15 bg-[#0d1220] px-3 py-2 text-sm text-white disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending" || status === "done"}
          className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-400 disabled:opacity-60"
        >
          {status === "sending"
            ? "Joining…"
            : status === "done"
              ? "Joined"
              : "Join the waitlist"}
        </button>
      </div>
      {message ? (
        <p
          aria-live="polite"
          className={`mt-3 text-xs ${
            status === "error" ? "text-amber-300" : "text-emerald-300"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
