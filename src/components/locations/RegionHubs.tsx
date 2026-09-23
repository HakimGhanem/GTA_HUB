"use client";

import { Link } from "@/i18n/navigation";

const REGIONS = [
  { slug: "vice-city", name: "Vice City" },
  { slug: "ocean-drive", name: "Ocean Drive" },
  { slug: "leonida-keys", name: "Leonida Keys" },
  { slug: "port-gellhorn", name: "Port Gellhorn" },
  { slug: "grassrivers", name: "Grassrivers" },
  { slug: "ambrosia-island", name: "Ambrosia Island" },
  { slug: "mount-kalaga", name: "Mount Kalaga" },
] as const;

type Props = {
  title: string;
  hint: string;
};

export function RegionHubs({ title, hint }: Props) {
  return (
    <section className="mb-10 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-foreground/55">{hint}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {REGIONS.map((r) => (
          <Link
            key={r.slug}
            href={`/locations/${r.slug}`}
            className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/85 hover:border-pink-400/40 hover:text-accent/80"
          >
            {r.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
