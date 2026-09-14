import { setRequestLocale } from "next-intl/server";
import { CreatorLinkBuilder } from "@/components/creators/CreatorLinkBuilder";
import { getAllLocations } from "@/data/all-locations";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/constants";
import { getIndexableLocations } from "@/lib/location-indexing";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: `Creator Kit — Overlay, Share Links & ref= | ${SITE.name}`,
    description:
      "Use Map-6 on Kick, TikTok, Twitch, or OBS: chrome-free overlay, streamer theme, shareable pin URLs, and creator ref tags. Fan project — not an official Rockstar partner program.",
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
      <p className="text-xs uppercase tracking-wider text-pink-400/80">
        Creators
      </p>
      <h1 className="mt-2 text-3xl font-bold">Map-6 creator kit</h1>
      <p className="mt-4 text-white/60">
        Deep-link a pin, drop a transparent overlay into OBS, and keep a{" "}
        <code className="text-white/80">ref=</code> handle on shares. No login.
        No “official partner” badge — Map-6 is a fan map.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/overlay?theme=streamer"
          className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-400"
        >
          Open overlay
        </Link>
        <Link
          href="/map?theme=streamer"
          className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:bg-white/10"
        >
          Open map
        </Link>
        <Link
          href="/guides/gta-6-map-clip-kit"
          className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:bg-white/10"
        >
          Clip-kit guide
        </Link>
      </div>

      <CreatorLinkBuilder locale={locale} locations={builderLocations} />

      <article className="mt-10 space-y-4 text-white/70">
        <h2 className="text-xl font-semibold text-white">Share URLs</h2>
        <p>
          The builder above writes the same URLs the map toolbar copies: game,
          location, x/y, zoom, and theme. On the map itself, append{" "}
          <code className="text-white/80">&amp;ref=yourhandle</code> once and
          Map-6 remembers it for the session, so later Share copies keep your
          tag without retyping it.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-white">Overlay</h2>
        <p>
          The overlay is a chrome-free Browser Source:{" "}
          <Link
            href="/overlay?theme=streamer"
            className="text-pink-300 underline"
          >
            /overlay?theme=streamer
          </Link>
          . OBS: 1920×1080, shut down the source when hidden if you want CPU
          back. Kick and Twitch browser sources use the same URL. Streamer
          theme enlarges labels; Neon is high-contrast for shorts; Default is
          calmer for talking-head scenes.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-white">
          Clipping official beats
        </h2>
        <p>
          Trailers and Netflix specials land on their own schedule, and the gap
          between a first upload and the official mirror is a clip window — not
          an official-partner badge. Open the overlay, Share a Landmarks pin,
          keep your <code className="text-white/80">ref=</code>, and credit
          GTADB CC BY 4.0 if you talk about tiles. Do not overlay fake leak
          lists or an invented PC date. Timings and pause lists for each beat
          live in{" "}
          <Link href="/news" className="text-pink-300 underline">
            news
          </Link>
          , which we date so you can tell a live post from an archive.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-white">Attribution</h2>
        <p>
          Say the map is fan-made. Credit GTADB / GTA VI Mapping Community
          under CC BY 4.0 when you discuss basemap tiles. Do not call pins
          “Rockstar leaks.” Secrets-category pins can be rumor-grade — say so
          before chat treats them as fact. Disclose affiliate links if you
          send viewers to product cards.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-white">What this is not</h2>
        <p>
          This is not a paid partner program, not a Rockstar endorsement, and
          not a leak desk. We will not invent exclusive map packs. If you want
          a branded overlay and cloud sync later, see{" "}
          <Link href="/pro" className="text-pink-300 underline">
            Pro
          </Link>{" "}
          (waitlist, no checkout yet).
        </p>
      </article>
    </main>
  );
}
