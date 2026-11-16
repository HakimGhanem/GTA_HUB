import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllLocations } from "@/data/all-locations";
import { SITE } from "@/lib/constants";
import { getUpstreamStatus } from "@/lib/gtadb-upstream";
import {
  getLocationChangelog,
  GTADB_SYNCED_AT,
  type ChangelogEntry,
} from "@/lib/location-freshness";
import { buildMetadata } from "@/lib/seo";

/** Matches the upstream check cadence in `getUpstreamStatus`. */
export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

const EN = {
  title: "GTA 6 Map Updates — What Changed, and When",
  description:
    "Every change to Map-6's GTA 6 map, dated: pins added, buildings re-identified, localities split. Checked against the GTADB community survey every hour during launch week.",
  back: "← Map",
  kicker: "Changelog",
  heading: "Map updates",
  lead: "A map is only as good as its last check. This page dates every change to the pins, so you can see what moved since your last visit — and what we have not shipped yet.",
  statusTitle: "Live check",
  statusChecked: (when: string) => `Last compared with the GTADB survey: ${when}.`,
  statusUpToDate: "Nothing upstream is missing from the map.",
  statusPending: (added: number, updated: number) =>
    `Upstream has ${added} new and ${updated} edited pins we have not shipped yet. They go live with the next reviewed sync.`,
  statusOffline: (day: string) =>
    `GitHub did not answer this hour. Last successful sync: ${day}.`,
  cadence:
    "During launch week the comparison runs every hour; the rest of the time, whenever a page is rebuilt.",
  totalsTitle: "On the map today",
  totals: {
    pins: "pins across Leonida",
    matches: "matched to a real South Florida building",
    survey: "surveyed positions not yet identified",
  },
  logTitle: "Change log",
  added: (n: number) => `+${n} added`,
  updated: (n: number) => `${n} updated`,
  removed: (n: number) => `−${n} removed`,
  totalAfter: (n: number) => `${n} GTADB pins after this sync`,
  baseline: "Baseline import — counts only, no per-pin diff was kept.",
  samplesAdded: "Among the new pins",
  samplesUpdated: "Among the updated pins",
  rss: "RSS feed",
  credit:
    "Pins and identifications by the GTADB mapping community (CC BY 4.0). Map-6 imports, labels and dates them.",
  realLife: "Browse the real-life matches",
  parisTime: "(Paris time)",
} as const;

const FR = {
  title: "Mises à jour de la carte GTA 6 — ce qui a changé, et quand",
  description:
    "Chaque changement de la carte GTA 6 de Map-6, daté : pins ajoutés, bâtiments ré-identifiés, localités redécoupées. Comparé au relevé GTADB toutes les heures pendant la semaine de lancement.",
  back: "← Carte",
  kicker: "Journal",
  heading: "Mises à jour de la carte",
  lead: "Une carte ne vaut que par sa dernière vérification. Cette page date chaque changement des pins : vous voyez ce qui a bougé depuis votre dernière visite, et ce que nous n’avons pas encore publié.",
  statusTitle: "Vérification en direct",
  statusChecked: (when: string) => `Dernière comparaison avec le relevé GTADB : ${when}.`,
  statusUpToDate: "Rien de ce qui existe en amont ne manque sur la carte.",
  statusPending: (added: number, updated: number) =>
    `GTADB compte ${added} nouveaux pins et ${updated} pins modifiés que nous n’avons pas encore publiés. Ils passeront en ligne à la prochaine synchronisation relue.`,
  statusOffline: (day: string) =>
    `GitHub n’a pas répondu cette heure-ci. Dernière synchronisation réussie : ${day}.`,
  cadence:
    "Pendant la semaine de lancement, la comparaison tourne toutes les heures ; le reste du temps, à chaque reconstruction de page.",
  totalsTitle: "Sur la carte aujourd’hui",
  totals: {
    pins: "pins dans Leonida",
    matches: "rapprochés d’un bâtiment réel de Floride du Sud",
    survey: "positions relevées, pas encore identifiées",
  },
  logTitle: "Journal des changements",
  added: (n: number) => `+${n} ajoutés`,
  updated: (n: number) => `${n} mis à jour`,
  removed: (n: number) => `−${n} retirés`,
  totalAfter: (n: number) => `${n} pins GTADB après cette synchronisation`,
  baseline: "Import de référence — totaux seulement, aucun diff pin par pin n’a été conservé.",
  samplesAdded: "Parmi les nouveaux pins",
  samplesUpdated: "Parmi les pins mis à jour",
  rss: "Flux RSS",
  credit:
    "Pins et identifications par la communauté cartographique GTADB (CC BY 4.0). Map-6 les importe, les étiquette et les date.",
  realLife: "Parcourir les lieux réels",
  parisTime: "(heure de Paris)",
} as const;

const BCP47: Record<string, string> = { en: "en-GB", fr: "fr-FR" };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = locale === "fr" ? FR : EN;
  return buildMetadata({
    locale,
    title: `${copy.title} | ${SITE.name}`,
    description: copy.description,
    path: "/updates",
    canonicalLocale: locale === "fr" || locale === "en" ? locale : "en",
    hreflangLocales: ["en", "fr"],
    robots:
      locale === "en" || locale === "fr"
        ? { index: true, follow: true }
        : { index: false, follow: true },
  });
}

function EntrySamples({
  title,
  samples,
  locale,
}: {
  title: string;
  samples: NonNullable<ChangelogEntry["samples"]>["added"];
  locale: string;
}) {
  if (samples.length === 0) return null;
  return (
    <div className="mt-3">
      <p className="text-xs font-medium uppercase tracking-wide text-foreground/45">{title}</p>
      <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        {samples.map((s) => (
          <li key={s.slug}>
            <a href={`/${locale}/map?loc=${s.slug}`} className="text-accent hover:underline">
              {s.name}
            </a>{" "}
            <span className="text-foreground/40">· {s.region}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function UpdatesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = locale === "fr" ? FR : EN;
  const tag = BCP47[locale] ?? "en-GB";
  const num = new Intl.NumberFormat(tag);
  const day = (iso: string) =>
    new Intl.DateTimeFormat(tag, { dateStyle: "long", timeZone: "UTC" }).format(
      new Date(`${iso}T00:00:00Z`),
    );
  const stamp = (iso: string) =>
    `${new Intl.DateTimeFormat(tag, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Paris",
    }).format(new Date(iso))} ${copy.parisTime}`;

  const status = await getUpstreamStatus();
  const entries = getLocationChangelog();
  const all = getAllLocations();
  const matches = all.filter((loc) => loc.realWorld).length;
  const survey = all.filter((loc) => loc.subtype === "survey-point").length;

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
      <Link
        href="/map"
        className="mb-6 inline-block text-sm text-foreground/50 hover:text-foreground"
      >
        {copy.back}
      </Link>

      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-300">
        {copy.kicker}
      </p>
      <h1 className="mb-4 text-3xl font-bold">{copy.heading}</h1>
      <p className="text-foreground/70">{copy.lead}</p>

      <section className="mt-8 rounded-xl border border-cyan-400/25 bg-cyan-500/5 p-5">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
          <span
            className={`h-2 w-2 rounded-full ${status ? "bg-emerald-400" : "bg-amber-400"}`}
            aria-hidden
          />
          {copy.statusTitle}
        </h2>
        {status ? (
          <>
            <p className="text-sm text-foreground/80">
              <time dateTime={status.checkedAt}>{copy.statusChecked(stamp(status.checkedAt))}</time>
            </p>
            <p className="mt-1 text-sm text-foreground/70">
              {status.pendingAdded + status.pendingUpdated === 0
                ? copy.statusUpToDate
                : copy.statusPending(status.pendingAdded, status.pendingUpdated)}
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/70">{copy.statusOffline(day(GTADB_SYNCED_AT))}</p>
        )}
        <p className="mt-2 text-xs text-foreground/45">{copy.cadence}</p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">{copy.totalsTitle}</h2>
        <dl className="grid gap-4 sm:grid-cols-3">
          {(
            [
              [all.length, copy.totals.pins],
              [matches, copy.totals.matches],
              [survey, copy.totals.survey],
            ] as const
          ).map(([value, label]) => (
            <div key={label} className="rounded-xl border border-foreground/10 bg-foreground/5 p-5">
              <dt className="text-2xl font-bold">{num.format(value)}</dt>
              <dd className="mt-1 text-sm text-foreground/60">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold">{copy.logTitle}</h2>
          <a
            href={`/updates.xml${locale === "fr" ? "?lang=fr" : ""}`}
            className="text-sm text-accent underline"
          >
            {copy.rss}
          </a>
        </div>
        <ol className="space-y-4">
          {entries.map((entry) => (
            <li
              key={entry.date}
              id={entry.date}
              className="rounded-xl border border-foreground/10 bg-foreground/5 px-5 py-4"
            >
              <h3 className="font-semibold">
                <time dateTime={entry.date}>{day(entry.date)}</time>
              </h3>
              {entry.added != null ? (
                <p className="mt-1 flex flex-wrap gap-x-3 text-sm">
                  <span className="text-emerald-300">{copy.added(entry.added)}</span>
                  <span className="text-cyan-200">{copy.updated(entry.updated ?? 0)}</span>
                  {entry.removed ? (
                    <span className="text-foreground/50">{copy.removed(entry.removed)}</span>
                  ) : null}
                  <span className="text-foreground/50">{copy.totalAfter(entry.total)}</span>
                </p>
              ) : (
                <p className="mt-1 text-sm text-foreground/60">
                  {copy.totalAfter(entry.total)}. {copy.baseline}
                </p>
              )}
              {entry.samples ? (
                <>
                  <EntrySamples title={copy.samplesAdded} samples={entry.samples.added} locale={locale} />
                  <EntrySamples
                    title={copy.samplesUpdated}
                    samples={entry.samples.updated}
                    locale={locale}
                  />
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-10 text-sm text-foreground/50">
        {copy.credit}{" "}
        <Link href="/gta-6-real-life-locations" className="text-accent underline">
          {copy.realLife}
        </Link>
      </p>
    </main>
  );
}
