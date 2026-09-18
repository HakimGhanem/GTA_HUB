"use client";

import { useState, type ReactNode } from "react";

export const PREORDER_PATHS = ["all", "ps5", "xbox", "console", "pc"] as const;
export type PreorderPath = (typeof PREORDER_PATHS)[number];

export type PreorderFunnelCopy = {
  title: string;
  all: string;
  ps5: string;
  xbox: string;
  console: string;
  pc: string;
  pcBody: string;
};

type Props = {
  copy: PreorderFunnelCopy;
  games: ReactNode;
  hardware: ReactNode;
  shared: ReactNode;
};

export function PreorderFunnel({ copy, games, hardware, shared }: Props) {
  const [path, setPath] = useState<PreorderPath>("all");

  const chips: { id: PreorderPath; label: string }[] = [
    { id: "all", label: copy.all },
    { id: "ps5", label: copy.ps5 },
    { id: "xbox", label: copy.xbox },
    { id: "console", label: copy.console },
    { id: "pc", label: copy.pc },
  ];

  return (
    <div>
      <h2 className="mt-10 text-2xl font-bold text-white">{copy.title}</h2>
      <div
        role="tablist"
        aria-label={copy.title}
        className="not-prose mt-4 flex flex-wrap gap-2"
      >
        {chips.map((chip) => {
          const active = path === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setPath(chip.id)}
              className={
                active
                  ? "rounded-full bg-pink-500 px-3.5 py-1.5 text-sm font-semibold text-white"
                  : "rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/70 hover:border-white/30 hover:text-white"
              }
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {path === "pc" ? (
        <p className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-white/70">
          {copy.pcBody}
        </p>
      ) : null}

      <div
        data-preorder-path={path}
        className={
          path === "pc"
            ? "hidden"
            : [
                "[&[data-preorder-path=ps5]_[data-preorder-platform=xbox]]:hidden",
                "[&[data-preorder-path=xbox]_[data-preorder-platform=ps5]]:hidden",
                "[&[data-preorder-path=ps5]_[data-preorder-platform=ps5]]:sm:col-span-2",
                "[&[data-preorder-path=xbox]_[data-preorder-platform=xbox]]:sm:col-span-2",
                "[&[data-preorder-path=console]_[data-preorder-games]]:hidden",
              ].join(" ")
        }
      >
        <div data-preorder-games="">{games}</div>
        {path === "console" ? hardware : null}
        {shared}
        {path === "all" || path === "ps5" || path === "xbox" ? hardware : null}
      </div>
    </div>
  );
}
