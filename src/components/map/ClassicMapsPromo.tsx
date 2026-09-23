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
    <section className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-foreground/55">{hint}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {maps.map((m) => (
          <Link
            key={m.game}
            href={m.href}
            className="rounded-lg border border-foreground/10 bg-foreground/5 p-4 transition-colors hover:border-pink-400/40"
          >
            <p className="font-semibold text-accent">{m.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/55">{m.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
