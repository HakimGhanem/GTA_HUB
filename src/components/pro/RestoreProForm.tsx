"use client";

import { useState } from "react";
import { activatePro } from "@/lib/isPro";

type Status = "idle" | "sending" | "done" | "missing" | "error";

export function RestoreProForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim();
    if (!clean) return;

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/pro/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        found?: boolean;
        sessionId?: string;
        email?: string;
        error?: string;
      };

      if (res.status === 429 || data.error === "rate_limited") {
        setStatus("error");
        setMessage("Too many attempts. Try again in a minute.");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        setMessage("Restore failed. Write to hello@map-6.com.");
        return;
      }

      if (!data.found || !data.sessionId) {
        setStatus("missing");
        setMessage(
          "No Pro purchase for that email yet. If you just paid, wait a minute and retry — or mail hello@map-6.com with your Stripe receipt.",
        );
        return;
      }

      activatePro(data.sessionId, data.email ?? clean);
      setStatus("done");
      setMessage("Pro is active on this device.");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again or mail hello@map-6.com.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 rounded-xl border border-foreground/10 bg-foreground/5 p-6"
    >
      <label htmlFor="restore-email" className="text-sm font-medium text-foreground">
        Email used at checkout
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id="restore-email"
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
          className="min-w-0 flex-1 rounded-md border border-foreground/15 bg-surface px-3 py-2 text-sm text-foreground disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending" || status === "done"}
          className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-black hover:bg-amber-400 disabled:opacity-60"
        >
          {status === "sending"
            ? "Checking…"
            : status === "done"
              ? "Restored"
              : "Restore Pro"}
        </button>
      </div>
      {message ? (
        <p
          aria-live="polite"
          className={`mt-3 text-xs ${
            status === "done" ? "text-emerald-300" : "text-amber-300"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
