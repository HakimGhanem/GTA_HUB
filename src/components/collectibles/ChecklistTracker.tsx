"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type ChecklistRow = {
  id: string;
  label: string;
  required: number;
  total?: number;
  href?: string;
};

export type ChecklistSection = { id: string; label: string; rows: ChecklistRow[] };

const STORAGE_KEY = "map6-checklist:gta6-100";
const CHANGE_EVENT = "map6-checklist-change";

/** In-memory copy so ticks still work when localStorage is unavailable. */
let memoryValue = "[]";

function readRaw(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? memoryValue;
  } catch {
    return memoryValue;
  }
}

function writeRaw(value: string) {
  memoryValue = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Private mode or a full quota.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function parseDone(raw: string): Set<string> {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return new Set(Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : []);
  } catch {
    return new Set();
  }
}

export function ChecklistTracker({ sections }: { sections: ChecklistSection[] }) {
  const t = useTranslations("collectibles");
  const raw = useSyncExternalStore(subscribe, readRaw, () => "[]");
  const done = useMemo(() => parseDone(raw), [raw]);

  function toggle(id: string) {
    const next = new Set(done);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    writeRaw(JSON.stringify([...next]));
  }

  const totalRows = sections.reduce((n, s) => n + s.rows.length, 0);
  const pct = totalRows ? Math.round((done.size / totalRows) * 100) : 0;

  return (
    <div>
      <div className="sticky top-16 z-10 mb-6 rounded-xl border border-foreground/10 bg-background/95 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-semibold text-foreground">
            {t("checklistProgress", { done: done.size, total: totalRows })}
          </span>
          <span className="font-mono text-accent">{pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-foreground/10">
          <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.id}>
            <h3 className="mb-3 text-lg font-semibold text-foreground">{section.label}</h3>
            <ul className="divide-y divide-foreground/10 rounded-xl border border-foreground/10">
              {section.rows.map((row) => {
                const checked = done.has(row.id);
                return (
                  <li key={row.id} className="flex items-center gap-3 px-4 py-3">
                    <input
                      id={`chk-${row.id}`}
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(row.id)}
                      className="h-5 w-5 shrink-0 accent-pink-500"
                    />
                    <label
                      htmlFor={`chk-${row.id}`}
                      className={`flex-1 text-sm ${checked ? "text-foreground/40 line-through" : "text-foreground/80"}`}
                    >
                      {row.label}
                    </label>
                    <span className="shrink-0 font-mono text-xs text-foreground/60">
                      {row.total && row.total !== row.required
                        ? t("requiredOf", { required: row.required, total: row.total })
                        : row.required}
                    </span>
                    {row.href ? (
                      <Link href={row.href} className="shrink-0 text-xs text-accent underline">
                        {t("guideLink")}
                      </Link>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
