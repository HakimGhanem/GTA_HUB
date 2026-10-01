import { setRequestLocale } from "next-intl/server";
import { LiveGrid } from "@/components/live/LiveGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/constants";
import { buildMetadata, jsonLdFAQ } from "@/lib/seo";
import {
  getLiveDirectorySafe,
  LIVE_CATEGORIES,
} from "@/lib/twitch/directory";
import { TWITCH_PRECONNECT } from "@/lib/twitch/embed";

type Props = { params: Promise<{ locale: string }> };

/** Prerendered and refreshed every minute, so the HTML stays edge-cacheable. */
export const revalidate = 60;

const FAQ = [
  {
    question: "Does Map-6 host or re-stream Twitch broadcasts?",
    answer:
      "No. Every stream plays through the official Twitch player, on Twitch's own delivery network, and the view counts, subscriptions, and ad revenue stay with the creator. Map-6 never copies, re-encodes, or re-hosts a Twitch feed — that would break Twitch's developer terms and strip the creator of their stats.",
  },
  {
    question: "Why does the player only start when I click?",
    answer:
      "The Twitch embed loads third-party scripts and cookies, so it stays unloaded until you ask for it. That keeps the page fast for everyone and means no third-party cookie is set without an explicit action.",
  },
  {
    question: "Which streams show up here?",
    answer: `Live channels in the ${LIVE_CATEGORIES.join(", ")} categories on Twitch, refreshed every minute. GTA Online and FiveM roleplay streams appear under Grand Theft Auto V, which is Twitch's own categorisation. Streams the broadcaster flagged for mature audiences are labelled 18+.`,
  },
  {
    question: "How do I get my stream featured on Map-6?",
    answer:
      "Email hello@map-6.com with your channel. Featured channels sit at the top of this page. There is no fee, no exclusivity, and no requirement to stop streaming anywhere else — Map-6 is a fan hub, not a platform.",
  },
  {
    question: "Why does it open the Twitch app on my phone?",
    answer:
      "The Twitch iframe player is not supported in mobile browsers, so on a phone every card links straight to the channel on Twitch instead of loading a player that would not work.",
  },
] as const;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: `GTA Live Streams — who is playing right now | ${SITE.name}`,
    description:
      "Every live GTA stream on Twitch in one place: GTA 6, GTA 5, GTA Online, FiveM roleplay, San Andreas and Vice City. Official Twitch player, click to load, no re-streaming.",
    path: "/live",
    // English copy only — the other locales would be duplicates of /en.
    canonicalLocale: "en",
    hreflangLocales: ["en"],
  });
}

export default async function LivePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const directory = await getLiveDirectorySafe();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      {TWITCH_PRECONNECT.map((href) => (
        <link key={href} rel="preconnect" href={href} crossOrigin="" />
      ))}
      <JsonLd data={jsonLdFAQ([...FAQ])} />

      <p className="text-xs uppercase tracking-wider text-pink-400/80">
        Community · Live
      </p>
      <h1 className="mt-2 text-3xl font-bold">GTA streams live right now</h1>
      <p className="mt-4 max-w-3xl text-foreground/60">
        Every channel currently live in the GTA categories on Twitch —{" "}
        <em>GTA 6</em>, GTA 5 and GTA Online, FiveM roleplay, San Andreas and
        Vice City. Refreshed every minute. Playback runs on the official Twitch
        player, so the creator keeps their viewers, their stats, and their
        revenue; Map-6 never re-streams anyone.
      </p>

      <div className="mt-8">
        <LiveGrid initial={directory} />
      </div>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-pink-400/30 bg-pink-500/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            Streaming GTA? Get listed at the top
          </h2>
          <p className="mt-2 text-sm text-foreground/75">
            Featured channels sit above the directory. No fee, no exclusivity,
            no obligation to stream anywhere in particular — send your channel
            to{" "}
            <a href="mailto:hello@map-6.com" className="text-accent underline">
              hello@map-6.com
            </a>{" "}
            and grab the{" "}
            <Link href="/creators" className="text-accent underline">
              creator kit
            </Link>{" "}
            while you are there.
          </p>
        </div>

        <div className="rounded-xl border border-foreground/10 bg-foreground/5 px-5 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            Put the map on your stream
          </h2>
          <p className="mt-2 text-sm text-foreground/75">
            The{" "}
            <Link href="/overlay?theme=streamer" className="text-accent underline">
              chrome-free overlay
            </Link>{" "}
            is a 1920×1080 OBS browser source with 1,500+ Leonida pins. No
            login, no watermark on your scene.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          How this page works
        </h2>
        <dl className="mt-4 space-y-4">
          {FAQ.map(({ question, answer }) => (
            <div key={question}>
              <dt className="text-sm font-semibold text-foreground">
                {question}
              </dt>
              <dd className="mt-1 text-sm text-foreground/60">{answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
