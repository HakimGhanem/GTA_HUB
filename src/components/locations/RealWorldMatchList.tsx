import { hasOwnLocationPage, isGtadbListingSlug } from "@/lib/location-indexing";
import type { RealWorldMatch } from "@/lib/real-world-matches";

type Props = {
  matches: RealWorldMatch[];
  locale: string;
  subtypeLabel: (subtype: string) => string;
  unsettledLabel: string;
  inGameLabel: string;
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
  inGameLabel,
}: Props) {
  return (
    <ul className="divide-y divide-foreground/10 rounded-xl border border-foreground/10 text-sm [&>li]:px-4 [&>li]:py-2">
      {matches.map((match) => {
        const locationHref =
          hasOwnLocationPage(match) && !isGtadbListingSlug(match.slug)
            ? `/${locale}/locations/${match.slug}`
            : undefined;
        return (
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
            {locationHref ? (
              <>
                {" · "}
                <a href={locationHref} className="text-accent underline">
                  {inGameLabel}
                </a>
              </>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
