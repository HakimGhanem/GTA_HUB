"use client";

import { Link } from "@/i18n/navigation";

type ClassicMap = {
  game: string;
  href: string;
  label: string;
  desc: string;
};

type Props = {
  title: string;
  hint: string;
  maps: ClassicMap[];
};

export function ClassicMapsPromo({ title, hint, maps }: Props) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-white/55">{hint}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {maps.map((m) => (
          <Link
            key={m.game}
            href={m.href}
            className="rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:border-pink-400/40"
          >
            <p className="font-semibold text-pink-200">{m.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-white/55">{m.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
