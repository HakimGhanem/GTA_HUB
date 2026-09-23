import { setRequestLocale } from "next-intl/server";
import { CreatorLinkBuilder } from "@/components/creators/CreatorLinkBuilder";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllLocations } from "@/data/all-locations";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/constants";
import { getIndexableLocations } from "@/lib/location-indexing";
import { buildMetadata, jsonLdFAQ } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const FAQ = [
  {
    question: "Does Map-6 have a Rockstar creator code for GTA Online or Shark Cards?",
    answer:
      "No. Map-6 has no official Rockstar or Take-Two creator code. We will not invent one, display a fake “use code MAP6” CTA, or send viewers to unofficial virtual-currency sellers. If an official GTA 6 Online creator program opens and we are accepted, the code will be published on this page with a date and a link to the official program.",
  },
  {
    question: "Is Map-6 an official Rockstar partner?",
    answer:
      "No. Map-6 is a fan project. We are not endorsed by Rockstar Games or Take-Two Interactive. Overlay, share links, and ref= tags are our own tools — they are not a partner badge.",
  },
  {
    question: "How do I put Map-6 on Kick, Twitch, or OBS?",
    answer:
      "Use the builder on /creators or open /overlay?theme=streamer as a 1920×1080 Browser Source. Share links carry location, coordinates, zoom, theme, and an optional ref= handle. No login required.",
  },
  {
    question: "What happens if Rockstar opens a GTA 6 Online creator program?",
    answer:
      "We apply the same day from this URL. Until written acceptance exists, this page stays a kit and a brand-safety brief — not a currency storefront.",
  },
] as const;

const FACTS: [string, string][] = [
  ["Product", "Free interactive GTA 6 map, OBS overlay, shareable pin URLs"],
  ["URL", "https://map-6.com/en/creators"],
  ["Audience", "Players and streamers researching Leonida before 19 Nov 2026"],
  ["Creator tools", "Chrome-free overlay, streamer / neon themes, ref= tags, no login"],
  ["Map", "1,500+ POIs, filters, measure, unlimited local progress"],
  ["Editorial", "Official frames first. Speculation labeled. No leaked development maps."],
  ["Brand safety", "No fake collectible totals, no invented PC date, no unofficial currency sellers"],
  ["Basemap", "GTADB / GTA VI Mapping Community, CC BY 4.0"],
  ["Contact", "hello@map-6.com"],
  ["Not", "Rockstar-affiliated. Not a leak desk. Not a Shark Card store."],
];

const RULES = [
  {
    title: "Fan-made, said out loud",
    body: "Say the map is fan-made. Do not call Map-6 an official partner, a Rockstar tool, or a leak desk — on stream or in a thumbnail.",
  },
  {
    title: "Official frames only",
    body: "Clip trailers, Newswire, and the official YouTube file. Do not overlay fake leak lists, Discord “exclusive” pin packs, or an invented PC date.",
  },
  {
    title: "Confidence on camera",
    body: "Secrets-category pins can be rumor-grade. Say so before chat treats them as fact. Confirmed trailer geography stays in the regional hubs.",
  },
  {
    title: "Credit the basemap",
    body: "Credit GTADB / GTA VI Mapping Community under CC BY 4.0 when you discuss tiles. Do not call community pins “Rockstar leaks.”",
  },
  {
    title: "No unofficial currency",
    body: "Do not send viewers to key shops, “cheap Shark Cards,” or any checkout that is not Rockstar / the platform store. We will not host those links.",
  },
  {
    title: "Disclose paid links",
    body: "If you send viewers to Map-6 product cards or other affiliate URLs, say so. Same rule we follow on the site.",
  },
] as const;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: `Creator Kit — Overlay, Share Links & partner brief | ${SITE.name}`,
    description:
      "Map-6 creator kit for Kick, TikTok, Twitch, and OBS: overlay, shareable pins, ref= tags, and brand-safety rules. No official Rockstar creator code — fan project, ready if a GTA 6 Online program opens.",
    path: "/creators",
    // English copy only — the other locales would be duplicates of /en.
    canonicalLocale: "en",
    hreflangLocales: ["en"],
  });
}

export default async function CreatorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const builderLocations = getIndexableLocations(getAllLocations()).map(
    ({ slug, name, x, y }) => ({ slug, name, x, y }),
  );

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
      <JsonLd data={jsonLdFAQ([...FAQ])} />

      <p className="text-xs uppercase tracking-wider text-pink-400/80">
        Creators & partners
      </p>
      <h1 className="mt-2 text-3xl font-bold">Map-6 creator kit</h1>
      <p className="mt-4 text-foreground/60">
        Overlay, shareable pins, and brand-safe clip rules for Kick, TikTok,
        Twitch, and OBS. No login. No “official partner” badge — Map-6 is a fan
        map. If Rockstar or Take-Two opens an official{" "}
        <em>GTA 6</em> Online creator program, this page is the brief we send.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/overlay?theme=streamer"
          className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-accent-foreground hover:bg-pink-400"
        >
          Open overlay
        </Link>
        <Link
          href="/map?theme=streamer"
          className="rounded-full border border-foreground/20 px-5 py-2 text-sm text-foreground hover:bg-foreground/10"
        >
          Open map
        </Link>
        <Link
          href="/guides/gta-6-map-clip-kit"
          className="rounded-full border border-foreground/20 px-5 py-2 text-sm text-foreground hover:bg-foreground/10"
        >
          Clip-kit guide
        </Link>
        <a
          href="mailto:hello@map-6.com?subject=Map-6%20creator%20partnership"
          className="rounded-full border border-foreground/20 px-5 py-2 text-sm text-foreground hover:bg-foreground/10"
        >
          Partnerships
        </a>
      </div>

      <section className="mt-10 rounded-xl border border-pink-400/30 bg-pink-500/10 px-5 py-4">
        <h2 className="text-lg font-semibold text-foreground">
          Official creator code — none yet
        </h2>
        <p className="mt-2 text-sm text-foreground/75">
          Rockstar has not published a public creator-code program for{" "}
          <em>GTA 6</em> Online virtual currency. Map-6 will not invent a code,
          a commission rate, or a “use MAP6 at checkout” button. When an
          official program exists and we have written acceptance, the code
          appears here first — dated, and linked to the official Rockstar or
          Take-Two page. Until then this URL is a kit, not a storefront.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Partner brief</h2>
        <blockquote className="mt-3 rounded-xl border border-foreground/10 bg-foreground/5 px-5 py-4 text-foreground/80">
          Map-6 (map-6.com) is a source-tagged interactive map of Leonida with
          1,500+ points of interest, a chrome-free OBS overlay, and shareable
          pin URLs used by streamers on Kick, TikTok, and Twitch. It does not
          host leaked development maps, unofficial currency sellers, or a fake
          partner badge. Editorial rule: official frames first; speculation
          labeled.
        </blockquote>
        <p className="mt-3 text-sm text-foreground/50">
          Same line as the{" "}
          <Link href="/press" className="text-accent underline">
            press kit
          </Link>
          . Partnerships and program applications:{" "}
          <a href="mailto:hello@map-6.com" className="text-accent underline">
            hello@map-6.com
          </a>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Fact sheet</h2>
        <dl className="mt-3 divide-y divide-white/10 rounded-xl border border-foreground/10">
          {FACTS.map(([term, value]) => (
            <div
              key={term}
              className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr]"
            >
              <dt className="text-sm font-medium text-foreground/50">{term}</dt>
              <dd className="text-sm text-foreground/80">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          Brand rules we already enforce
        </h2>
        <p className="mt-2 text-sm text-foreground/55">
          A reviewer should be able to watch a Map-6 clip and see these rules
          held. They are also the rules we will keep if an official currency
          code is ever attached to this site.
        </p>
        <ul className="mt-4 space-y-3">
          {RULES.map((rule) => (
            <li
              key={rule.title}
              className="rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3"
            >
              <p className="font-medium text-foreground">{rule.title}</p>
              <p className="mt-1 text-sm text-foreground/60">{rule.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          If an official program opens
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-foreground/70">
          <li>
            We apply the same day from this URL, with the{" "}
            <Link href="/press" className="text-accent underline">
              press kit
            </Link>{" "}
            and{" "}
            <Link href="/about" className="text-accent underline">
              editorial standards
            </Link>
            .
          </li>
          <li>
            No code, rate, or checkout is shown until written acceptance
            exists. We will not wrap unofficial Shark Card or key sellers.
          </li>
          <li>
            Accepted code goes on this page, in the overlay credit line, and in
            the{" "}
            <Link
              href="/guides/gta-6-map-clip-kit"
              className="text-accent underline"
            >
              clip-kit guide
            </Link>
            — dated, with the official program link.
          </li>
        </ol>
      </section>

      <CreatorLinkBuilder locale={locale} locations={builderLocations} />

      <article className="mt-10 space-y-4 text-foreground/70">
        <h2 className="text-xl font-semibold text-foreground">Share URLs</h2>
        <p>
          The builder above writes the same URLs the map toolbar copies: game,
          location, x/y, zoom, and theme. On the map itself, append{" "}
          <code className="text-foreground/80">&amp;ref=yourhandle</code> once and
          Map-6 remembers it for the session, so later Share copies keep your
          tag without retyping it.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-foreground">Overlay</h2>
        <p>
          The overlay is a chrome-free Browser Source:{" "}
          <Link
            href="/overlay?theme=streamer"
            className="text-accent underline"
          >
            /overlay?theme=streamer
          </Link>
          . OBS: 1920×1080, shut down the source when hidden if you want CPU
          back. Kick and Twitch browser sources use the same URL. Streamer
          theme enlarges labels; Neon is high-contrast for shorts; Default is
          calmer for talking-head scenes.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-foreground">
          Clipping official beats
        </h2>
        <p>
          Trailers and Netflix specials land on their own schedule, and the gap
          between a first upload and the official mirror is a clip window — not
          an official-partner badge. Open the overlay, Share a Landmarks pin,
          keep your <code className="text-foreground/80">ref=</code>, and credit
          GTADB CC BY 4.0 if you talk about tiles. Do not overlay fake leak
          lists or an invented PC date. Timings and pause lists for each beat
          live in{" "}
          <Link href="/news" className="text-accent underline">
            news
          </Link>
          , which we date so you can tell a live post from an archive.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-foreground">What this is not</h2>
        <p>
          This is not a paid partner program, not a Rockstar endorsement, and
          not a leak desk. We will not invent exclusive map packs or a fake
          creator code. If you want a branded overlay and cloud sync, see{" "}
          <Link href="/pro" className="text-accent underline">
            Pro
          </Link>{" "}
          (€3.99 once, lifetime).
        </p>
      </article>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
        <dl className="mt-4 space-y-4">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-foreground">{item.question}</dt>
              <dd className="mt-1 text-sm text-foreground/60">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-10 text-sm text-foreground/45">
        Rockstar Games, Grand Theft Auto, and GTA are trademarks of their
        respective owners. Map-6 is a fan project and is not endorsed by
        Rockstar Games or Take-Two Interactive.
      </p>
    </main>
  );
}
