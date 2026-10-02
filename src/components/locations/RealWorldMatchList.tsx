import type { RealWorldMatch } from "@/lib/real-world-matches";

type Props = {
  matches: RealWorldMatch[];
  locale: string;
  subtypeLabel: (subtype: string) => string;
  unsettledLabel: string;
};

/**
 * Directory rows. Spacing lives on the parent via child selectors and the links
 * are plain anchors — at a thousand rows, repeating Tailwind classes and client
 * Link references on every entry is what makes the page heavy.
 */
export function RealWorldMatchList({
  matches,
  locale,
  subtypeLabel,
  unsettledLabel,
}: Props) {
  return (
    <ul className="divide-y divide-foreground/10 rounded-xl border border-foreground/10 text-sm [&>li]:px-4 [&>li]:py-2">
      {matches.map((match) => (
        <li key={match.slug}>
          <a
            href={`/${locale}/map?loc=${match.slug}&x=${match.x}&y=${match.y}`}
            className="font-medium hover:text-accent"
          >
            {match.realWorld.name}
          </a>
          {" — "}
          <span className="text-foreground/60">{match.realWorld.address}</span>
          {match.subtype ? ` · ${subtypeLabel(match.subtype)}` : ""}
          {match.confidence === "rumor" ? ` · ${unsettledLabel}` : ""}
        </li>
      ))}
    </ul>
  );
}
