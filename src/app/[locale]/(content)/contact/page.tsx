import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const EN = {
  title: "Contact",
  heading: "Contact Map-6",
  description:
    "Reach Map-6: corrections on map pins or guides, press enquiries, privacy and data requests, pin removal, and Pro billing. Who answers what, and how fast.",
  back: "← Home",
  kicker: "Who to write to",
  lead:
    "Map-6 is a small fan project, so there is no ticket queue — mail lands with a human. Pick the address that matches your request and it gets answered faster.",
  routesTitle: "Where to write",
  routes: [
    {
      email: "hello@map-6.com",
      label: "General, press, partnerships",
      note: "Questions about the map or guides, interview and citation requests, affiliate or sponsorship proposals. The press kit answers most editorial questions first.",
    },
    {
      email: "hello@map-6.com",
      label: "Corrections",
      note: "A wrong pin, an outdated price, a guide that contradicts official footage. Include the page URL and, where you can, the source — an official frame with a timestamp beats a forum post.",
    },
    {
      email: "privacy@map-6.com",
      label: "Privacy and data requests",
      note: "Access, correction or deletion of personal data, consent withdrawal, and anything about cookies or advertising identifiers. The privacy policy sets out what we collect.",
    },
    {
      email: "privacy@map-6.com",
      label: "Takedown and attribution",
      note: "If you own community map data, a screenshot or artwork reproduced here and want it credited differently or removed, write with the exact URL. We remove first and discuss after.",
    },
    {
      email: "hello@map-6.com",
      label: "Pro billing",
      note: "Payments run through Stripe, so we never see your card details. Include the email used at checkout — not the card number.",
    },
  ],
  expectTitle: "What to expect",
  expect: [
    "We read everything, and aim to reply within three working days. Corrections are handled first because a wrong pin costs a reader a wasted trip.",
    "A correction that cites an official source gets applied the same week. One that cites a leak or a Discord rumour does not — see our editorial standards for why.",
    "We are not Rockstar support. We cannot recover accounts, issue refunds for the game, or confirm a release date beyond what Rockstar and Take-Two have published.",
  ],
  elsewhereTitle: "Also useful",
  elsewhere: [
    { href: "/press", label: "Press kit", note: "Fact sheet, suggested citation, pages worth linking." },
    { href: "/about", label: "Editorial standards", note: "What we will not invent, and how pins are labelled." },
    { href: "/privacy", label: "Privacy policy", note: "What we collect, cookies, advertising." },
    { href: "/attributions", label: "Sources and attributions", note: "Community tiles and data credits." },
  ],
  legal:
    "Rockstar Games, Grand Theft Auto, and GTA are trademarks of their respective owners. Map-6 is a fan project and is not endorsed by Rockstar Games or Take-Two Interactive.",
} as const;

const FR = {
  title: "Contact",
  heading: "Contacter Map-6",
  description:
    "Contacter Map-6 : corrections sur les pins ou les guides, demandes presse, confidentialité et données personnelles, retrait de contenu, facturation Pro. Qui répond à quoi, et en combien de temps.",
  back: "← Accueil",
  kicker: "À qui écrire",
  lead:
    "Map-6 est un petit projet de fans : il n’y a pas de file de tickets, les mails arrivent chez un humain. Choisissez l’adresse qui correspond à votre demande, elle sera traitée plus vite.",
  routesTitle: "Où écrire",
  routes: [
    {
      email: "hello@map-6.com",
      label: "Général, presse, partenariats",
      note: "Questions sur la carte ou les guides, demandes d’interview et de citation, propositions d’affiliation ou de sponsoring. Le kit presse répond déjà à l’essentiel des questions éditoriales.",
    },
    {
      email: "hello@map-6.com",
      label: "Corrections",
      note: "Un pin mal placé, un prix périmé, un guide qui contredit les images officielles. Indiquez l’URL de la page et, si possible, la source — un plan officiel horodaté vaut mieux qu’un post de forum.",
    },
    {
      email: "privacy@map-6.com",
      label: "Confidentialité et données personnelles",
      note: "Accès, rectification ou suppression de données, retrait du consentement, et tout ce qui concerne les cookies ou les identifiants publicitaires. La politique de confidentialité détaille ce que nous collectons.",
    },
    {
      email: "privacy@map-6.com",
      label: "Retrait et attribution",
      note: "Si vous êtes à l’origine de données communautaires, d’une capture ou d’une illustration reprise ici et souhaitez un autre crédit ou un retrait, écrivez avec l’URL exacte. Nous retirons d’abord, nous discutons ensuite.",
    },
    {
      email: "hello@map-6.com",
      label: "Facturation Pro",
      note: "Les paiements passent par Stripe, nous ne voyons donc jamais vos coordonnées bancaires. Indiquez l’e-mail utilisé au paiement — pas le numéro de carte.",
    },
  ],
  expectTitle: "Ce que vous pouvez attendre",
  expect: [
    "Nous lisons tout, et visons une réponse sous trois jours ouvrés. Les corrections passent en premier, parce qu’un pin faux coûte un déplacement inutile à un lecteur.",
    "Une correction qui cite une source officielle est appliquée dans la semaine. Une correction qui s’appuie sur un leak ou une rumeur Discord ne l’est pas — nos standards éditoriaux expliquent pourquoi.",
    "Nous ne sommes pas le support de Rockstar. Nous ne pouvons pas récupérer un compte, rembourser le jeu, ni confirmer une date de sortie au-delà de ce que Rockstar et Take-Two ont publié.",
  ],
  elsewhereTitle: "Aussi utile",
  elsewhere: [
    { href: "/press", label: "Kit presse", note: "Fiche, citation suggérée, pages à lier." },
    { href: "/about", label: "Standards éditoriaux", note: "Ce que nous n’inventons pas, et comment les pins sont étiquetés." },
    { href: "/privacy", label: "Politique de confidentialité", note: "Ce que nous collectons, cookies, publicité." },
    { href: "/attributions", label: "Sources et attributions", note: "Crédits des tuiles et des données communautaires." },
  ],
  legal:
    "Rockstar Games, Grand Theft Auto et GTA sont des marques de leurs propriétaires. Map-6 est un projet de fans, non approuvé par Rockstar Games ni Take-Two Interactive.",
} as const;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = locale === "fr" ? FR : EN;
  return buildMetadata({
    locale,
    title: `${copy.title} | ${SITE.name}`,
    description: copy.description,
    path: "/contact",
    canonicalLocale: locale === "fr" || locale === "en" ? locale : "en",
    hreflangLocales: ["en", "fr"],
    robots:
      locale === "en" || locale === "fr"
        ? { index: true, follow: true }
        : { index: false, follow: true },
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = locale === "fr" ? FR : EN;

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-foreground/50 hover:text-foreground"
      >
        {copy.back}
      </Link>

      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-300">
        {copy.kicker}
      </p>
      <h1 className="mb-4 text-3xl font-bold">{copy.heading}</h1>
      <p className="text-foreground/70">{copy.lead}</p>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">{copy.routesTitle}</h2>
        <ul className="space-y-3">
          {copy.routes.map((route) => (
            <li
              key={route.label}
              className="rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3"
            >
              <p className="font-medium text-foreground">{route.label}</p>
              <a href={`mailto:${route.email}`} className="text-sm text-accent underline">
                {route.email}
              </a>
              <p className="mt-1 text-sm text-foreground/55">{route.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">{copy.expectTitle}</h2>
        <div className="space-y-3 text-foreground/70">
          {copy.expect.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">{copy.elsewhereTitle}</h2>
        <ul className="space-y-3">
          {copy.elsewhere.map((page) => (
            <li
              key={page.href}
              className="rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3"
            >
              <Link href={page.href} className="font-medium text-accent underline">
                {page.label}
              </Link>
              <p className="mt-1 text-sm text-foreground/50">{page.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-foreground/45">{copy.legal}</p>
      </section>
    </main>
  );
}
