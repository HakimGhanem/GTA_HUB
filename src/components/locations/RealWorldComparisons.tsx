import { gtadbPhotoUrl, hasPhotoPair } from "@/lib/gtadb-photos";
import type { RealWorldMatch } from "@/lib/real-world-matches";

type Props = {
  matches: RealWorldMatch[];
  locale: string;
  title: string;
  lead: string;
  inGameLabel: string;
  realLabel: string;
  credit: string;
  /** Each pair is two remote photos; past a couple dozen the page gets heavy. */
  limit?: number;
};

/** Settled matches first, then the freshest edits — the pairs most worth showing. */
function pickPairs(matches: RealWorldMatch[], limit: number): RealWorldMatch[] {
  return matches
    .filter(hasPhotoPair)
    .sort(
      (a, b) =>
        Number(a.confidence === "rumor") - Number(b.confidence === "rumor") ||
        (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""),
    )
    .slice(0, limit);
}

export function RealWorldComparisons({
  matches,
  locale,
  title,
  lead,
  inGameLabel,
  realLabel,
  credit,
  limit = 12,
}: Props) {
  const pairs = pickPairs(matches, limit);
  if (pairs.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="mb-5 text-foreground/70">{lead}</p>
      <ul className="grid gap-6 sm:grid-cols-2">
        {pairs.map((match) => (
          <li
            key={match.slug}
            className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5"
          >
            <div className="grid grid-cols-2 gap-px bg-foreground/10">
              {(
                [
                  ["ig", inGameLabel],
                  ["rl", realLabel],
                ] as const
              ).map(([kind, label]) => (
                <figure key={kind} className="relative aspect-[4/3] bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element -- CC BY photos served by jsDelivr's CDN; proxying ~2,800 of them through the optimizer would bill transforms for no gain */}
                  <img
                    src={gtadbPhotoUrl(match, kind)}
                    alt={`${match.realWorld.name} — ${label}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <figcaption className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {label}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="px-4 py-3 text-sm">
              <a
                href={`/${locale}/map?loc=${match.slug}&x=${match.x}&y=${match.y}`}
                className="font-medium hover:text-accent"
              >
                {match.realWorld.name}
              </a>
              <p className="mt-0.5 text-xs text-foreground/55">{match.realWorld.address}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-foreground/45">{credit}</p>
    </section>
  );
}
