import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const DESTINATIONS = [
  { slug: "vice-city", name: "Vice City" },
  { slug: "leonida-keys", name: "Leonida Keys" },
  { slug: "grassrivers", name: "Grassrivers" },
  { slug: "port-gellhorn", name: "Port Gellhorn" },
  { slug: "ambrosia-island", name: "Ambrosia" },
  { slug: "mount-kalaga", name: "Mount Kalaga" },
] as const;

export async function ViceCityHub() {
  const t = await getTranslations("home");

  const pills = [
    { href: "/guides/gta-6-preorder-guide", label: t("hub.preorder") },
    { href: "#story-map", label: t("hub.storyMap") },
    { href: "/news/gta-series-history-to-leonida", label: t("hub.history") },
    { href: "/news/gta-online-wallet-cards-before-vi", label: t("hub.online") },
    { href: "#cards", label: t("hub.cards") },
  ] as const;

  const related = [
    {
      href: "/guides/gta-6-release-date",
      title: t("relatedReleaseTitle"),
      desc: t("relatedReleaseDesc"),
    },
    {
      href: "/news/gta-series-history-to-leonida",
      title: t("relatedHistoryTitle"),
      desc: t("relatedHistoryDesc"),
    },
    {
      href: "/news/gta-online-wallet-cards-before-vi",
      title: t("relatedOnlineTitle"),
      desc: t("relatedOnlineDesc"),
    },
    {
      href: "#cards",
      title: t("relatedCardsTitle"),
      desc: t("relatedCardsDesc"),
    },
  ] as const;

  return (
    <div className="mb-12 space-y-10">
      <nav
        aria-label={t("hub.navLabel")}
        className="flex flex-wrap gap-2 border-b border-foreground/10 pb-4"
      >
        {pills.map((pill) =>
          pill.href.startsWith("#") ? (
            <a
              key={pill.href}
              href={pill.href}
              className="rounded-full border border-foreground/15 bg-foreground/5 px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:border-pink-400/50 hover:text-foreground"
            >
              {pill.label}
            </a>
          ) : (
            <Link
              key={pill.href}
              href={pill.href}
              className="rounded-full border border-foreground/15 bg-foreground/5 px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:border-pink-400/50 hover:text-foreground"
            >
              {pill.label}
            </Link>
          ),
        )}
      </nav>

      <section id="story-map" aria-labelledby="destinations-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 id="destinations-heading" className="text-2xl font-bold">
            {t("destinationsTitle")}
          </h2>
          <Link
            href="/map"
            className="text-sm font-medium text-pink-300 hover:text-pink-200"
          >
            {t("destinationsCta")}
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.slug}
              href={`/locations/${dest.slug}`}
              className="rounded-full border border-pink-400/25 bg-pink-500/10 px-3 py-1 text-sm text-pink-100 transition-colors hover:border-pink-300/60"
            >
              {dest.name}
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="story-heading">
        <h2 id="story-heading" className="mb-3 text-2xl font-bold">
          {t("storyTitle")}
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-foreground/65 sm:text-base">
          {t("storyBody")}
        </p>
      </section>

      <section aria-labelledby="characters-heading">
        <h2 id="characters-heading" className="mb-4 text-2xl font-bold">
          {t("charactersTitle")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/database/characters/lucia-caminos"
            className="rounded-xl border border-foreground/10 bg-gradient-to-br from-pink-500/15 to-foreground/[0.03] p-6 transition-colors hover:border-pink-400/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-pink-300">
              {t("luciaRole")}
            </p>
            <h3 className="mt-2 text-xl font-semibold">{t("luciaTitle")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">
              {t("luciaBody")}
            </p>
          </Link>
          <Link
            href="/database/characters/jason-duval"
            className="rounded-xl border border-foreground/10 bg-gradient-to-br from-sky-500/10 to-foreground/[0.03] p-6 transition-colors hover:border-sky-400/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
              {t("jasonRole")}
            </p>
            <h3 className="mt-2 text-xl font-semibold">{t("jasonTitle")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">
              {t("jasonBody")}
            </p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="mb-4 text-2xl font-bold">
          {t("featuresTitle")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {(
            [
              ["featureDualTitle", "featureDualBody"],
              ["featureWantedTitle", "featureWantedBody"],
              ["featureLifestyleTitle", "featureLifestyleBody"],
            ] as const
          ).map(([titleKey, bodyKey]) => (
            <div
              key={titleKey}
              className="rounded-xl border border-foreground/10 bg-foreground/5 p-5"
            >
              <h3 className="font-semibold text-foreground">{t(titleKey)}</h3>
              <p className="mt-2 text-sm text-foreground/55">{t(bodyKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="related-heading">
        <h2 id="related-heading" className="mb-4 text-2xl font-bold">
          {t("relatedTitle")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {related.map((card) =>
            card.href.startsWith("#") ? (
              <a
                key={card.href}
                href={card.href}
                className="rounded-xl border border-foreground/10 bg-foreground/5 p-5 transition-colors hover:border-pink-400/40"
              >
                <h3 className="font-semibold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm text-foreground/55">{card.desc}</p>
              </a>
            ) : (
              <Link
                key={card.href}
                href={card.href}
                className="rounded-xl border border-foreground/10 bg-foreground/5 p-5 transition-colors hover:border-pink-400/40"
              >
                <h3 className="font-semibold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm text-foreground/55">{card.desc}</p>
              </Link>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
