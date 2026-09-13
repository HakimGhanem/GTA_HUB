import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ATTRIBUTIONS,
  LICENSE_LABEL,
  LICENSE_URL,
  type LocalizedText,
} from "@/data/attributions";
import {
  ATTRIBUTIONS_LOCALES,
  getAttributionsCopy,
  hasAttributionsTranslation,
} from "@/data/attributions-i18n";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

function text(value: LocalizedText, locale: string) {
  return locale === "fr" ? value.fr : value.en;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = getAttributionsCopy(locale);
  const translated = hasAttributionsTranslation(locale);

  return buildMetadata({
    locale,
    title: `${copy.title} | ${SITE.name}`,
    description: copy.description,
    path: "/attributions",
    canonicalLocale: translated ? locale : "en",
    hreflangLocales: ATTRIBUTIONS_LOCALES,
    robots: translated
      ? { index: true, follow: true }
      : { index: false, follow: true },
  });
}

export default async function AttributionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = getAttributionsCopy(locale);

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
      <p className="text-xs uppercase tracking-wider text-pink-400/80">
        {copy.eyebrow}
      </p>
      <h1 className="mt-2 text-3xl font-bold">{copy.title}</h1>
      <div className="mt-5 space-y-3 text-white/70">
        {copy.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="mt-10 space-y-4">
        {ATTRIBUTIONS.map((entry) => (
          <li
            key={entry.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">
                <a
                  href={entry.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/20 hover:decoration-white/60"
                >
                  {entry.source}
                </a>
              </h2>
              {entry.byPermission ? (
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-amber-200">
                  {copy.byPermissionBadge}
                </span>
              ) : (
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-emerald-200">
                  {text(LICENSE_LABEL[entry.license], locale)}
                </span>
              )}
            </div>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex flex-wrap gap-2">
                <dt className="w-40 shrink-0 text-white/40">
                  {copy.fieldLabels.license}
                </dt>
                <dd className="text-white/75">
                  {LICENSE_URL[entry.license] ? (
                    <a
                      href={LICENSE_URL[entry.license]}
                      target="_blank"
                      rel="license noopener noreferrer"
                      className="text-pink-300 underline"
                    >
                      {text(LICENSE_LABEL[entry.license], locale)}
                    </a>
                  ) : (
                    text(LICENSE_LABEL[entry.license], locale)
                  )}
                  {entry.copyright ? (
                    <span className="text-white/45"> · {entry.copyright}</span>
                  ) : null}
                </dd>
              </div>
              <div className="flex flex-wrap gap-2">
                <dt className="w-40 shrink-0 text-white/40">
                  {copy.fieldLabels.used}
                </dt>
                <dd className="text-white/75">{text(entry.used, locale)}</dd>
              </div>
              <div className="flex flex-wrap gap-2">
                <dt className="w-40 shrink-0 text-white/40">
                  {copy.fieldLabels.changes}
                </dt>
                <dd className="text-white/75">{text(entry.changes, locale)}</dd>
              </div>
              {entry.files?.length ? (
                <div className="flex flex-wrap gap-2">
                  <dt className="w-40 shrink-0 text-white/40">
                    {copy.fieldLabels.files}
                  </dt>
                  <dd className="font-mono text-xs text-white/55">
                    {entry.files.join(" · ")}
                  </dd>
                </div>
              ) : null}
            </dl>

            {entry.byPermission ? (
              <p className="mt-4 rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 text-xs leading-relaxed text-amber-100/80">
                {copy.byPermissionNote}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <section className="mt-12 space-y-6 text-sm text-white/65">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {copy.removalTitle}
          </h2>
          <p className="mt-2 leading-relaxed">
            {copy.removalBody}{" "}
            <Link href="/about" className="text-pink-300 underline">
              /about
            </Link>
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">
            {copy.reuseTitle}
          </h2>
          <p className="mt-2 leading-relaxed">
            {copy.reuseBody}{" "}
            <Link href="/creators" className="text-pink-300 underline">
              /creators
            </Link>
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">
            {copy.trademarkTitle}
          </h2>
          <p className="mt-2 leading-relaxed">{copy.trademarkBody}</p>
        </div>
      </section>
    </main>
  );
}
