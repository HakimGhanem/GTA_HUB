"use client";

import { useState } from "react";

const STORAGE_KEY = "map6-pro-waitlist";

export function ProWaitlist() {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim();
    if (!clean.includes("@")) return;
    try {
      localStorage.setItem(STORAGE_KEY, clean);
    } catch {
      /* private mode */
    }
    setSaved(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6"
    >
      <h2 className="text-lg font-semibold text-white">Waitlist</h2>
      <p className="mt-2 text-sm text-white/55">
        Stored only in this browser ({STORAGE_KEY}). Nothing is sent to a
        Map-6 server. Prefer email?{" "}
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
          required
          value={email}
          onChange={(e) => {
            setSaved(false);
            setEmail(e.target.value);
          }}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-md border border-white/15 bg-[#0d1220] px-3 py-2 text-sm text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-400"
        >
          Save locally
        </button>
      </div>
      {saved ? (
        <p className="mt-3 text-xs text-emerald-300">
          Saved in this browser. Mail us if you want a human on the list.
        </p>
      ) : null}
    </form>
  );
}
