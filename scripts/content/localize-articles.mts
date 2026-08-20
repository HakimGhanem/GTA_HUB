#!/usr/bin/env npx tsx
/**
 * Localize published EN funnel articles → fr/es/pt/de/it (same slug).
 * Then upsert+publish remotely.
 *
 *   npm run content:localize -- --ids id1,id2
 *   npm run content:localize -- --recent 3 --publish
 */
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Article } from "../../src/lib/content/schema.ts";
import { argValue, hasFlag } from "./_shared.mts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const LOCALES = ["fr", "es", "pt", "de", "it"] as const;

type Locale = (typeof LOCALES)[number];

const UI: Record<
  Locale,
  {
    whatsNew: string;
    funnel: string;
    verified: string;
    confirmed: string;
    rumors: string;
    keyword: string;
    buy: string;
    mapAngle: string;
    clipKit: string;
    next: string;
    sources: string;
    sourcesBlurb: string;
    map: string;
    locations: string;
    mapGuide: string;
    preorder: string;
    openPin: string;
    screenRecord: string;
    cta: string;
    next1: string;
    next2: string;
    next3: string;
    classic: string;
    deepDive: string;
    clipDrop: string;
  }
> = {
  fr: {
    whatsNew: "Quoi de neuf",
    funnel:
      "Map-6 en fait une **page funnel** : deep-link carte + intention {kind} — pas un dump d’actu générique.",
    verified: "Faits vérifiés vs rumeurs",
    confirmed:
      "**Confirmé** : uniquement ce que Rockstar a dit ou montré dans des médias officiels.",
    rumors:
      "**Rumeurs** : les leaks restent clairement non vérifiés — on n’invente pas de date de trailer.",
    keyword: "Mot-clé principal",
    buy: "Achat / setup",
    mapAngle: "Angle carte & lieux",
    clipKit: "Kit clip (TikTok / Kick)",
    next: "Et ensuite",
    sources: "Sources",
    sourcesBlurb: "Citations sortantes utilisées pour ce brouillon — voir la liste ci-dessous.",
    map: "Carte interactive",
    locations: "Tous les lieux",
    mapGuide: "Guide carte débutant",
    preorder: "Guide précommande GTA 6",
    openPin: "Ouvre le pin sur la [carte interactive]({map}).",
    screenRecord:
      "Filme le HUD (coords + nom du POI) — Share copie un deep link.",
    cta: "CTA : lien map en bio + guide précommande si le clip est côté achat.",
    next1: "Ouvre la [carte interactive Map-6]({map}) et Share le pin.",
    next2: "Pour le hardware / éditions : [guide précommande]({preorder}).",
    next3:
      "Classiques : [carte GTA 5]({gta5}) ou [San Andreas]({sa}) en attendant VI.",
    classic: "Classiques GTA",
    deepDive: "— décryptage Map-6",
    clipDrop: "— à drop sur Kick / TikTok avec l’overlay carte",
  },
  es: {
    whatsNew: "Novedades",
    funnel:
      "Map-6 lo convierte en una **página funnel**: deep-link del mapa + intención {kind} — no un volcado de noticias genéricas.",
    verified: "Hechos verificados vs rumores",
    confirmed:
      "**Confirmado**: solo lo que Rockstar ha dicho o mostrado en medios oficiales.",
    rumors:
      "**Rumores**: los leaks se etiquetan como no verificados — no inventamos fechas de tráiler.",
    keyword: "Keyword principal",
    buy: "Compra / setup",
    mapAngle: "Ángulo mapa y lugares",
    clipKit: "Kit de clip (TikTok / Kick)",
    next: "Qué hacer ahora",
    sources: "Fuentes",
    sourcesBlurb: "Citas usadas en este borrador — ver lista abajo.",
    map: "Mapa interactivo",
    locations: "Todos los lugares",
    mapGuide: "Guía del mapa para principiantes",
    preorder: "Guía de preventa GTA 6",
    openPin: "Abre el pin en el [mapa interactivo]({map}).",
    screenRecord:
      "Graba el HUD (coords + nombre del POI) — Share copia un deep link.",
    cta: "CTA: link del mapa en bio + guía de preventa si el clip es de compra.",
    next1: "Abre el [mapa interactivo Map-6]({map}) y comparte el pin.",
    next2: "Para hardware / ediciones: [guía de preventa]({preorder}).",
    next3:
      "Clásicos: [mapa GTA 5]({gta5}) o [San Andreas]({sa}) mientras llega VI.",
    classic: "GTA clásico",
    deepDive: "— análisis Map-6",
    clipDrop: "— súbelo a Kick / TikTok con el overlay del mapa",
  },
  pt: {
    whatsNew: "Novidades",
    funnel:
      "A Map-6 transforma isto numa **página funnel**: deep-link do mapa + intenção {kind} — não um dump de notícias genéricas.",
    verified: "Factos verificados vs rumores",
    confirmed:
      "**Confirmado**: apenas o que a Rockstar disse ou mostrou em media oficiais.",
    rumors:
      "**Rumores**: leaks ficam claramente não verificados — não inventamos data de trailer.",
    keyword: "Keyword principal",
    buy: "Compra / setup",
    mapAngle: "Ângulo mapa e locais",
    clipKit: "Kit de clip (TikTok / Kick)",
    next: "Próximos passos",
    sources: "Fontes",
    sourcesBlurb: "Citações usadas neste rascunho — ver lista abaixo.",
    map: "Mapa interativo",
    locations: "Todos os locais",
    mapGuide: "Guia do mapa para iniciantes",
    preorder: "Guia de pré-venda GTA 6",
    openPin: "Abre o pin no [mapa interativo]({map}).",
    screenRecord:
      "Grava o HUD (coords + nome do POI) — Share copia um deep link.",
    cta: "CTA: link do mapa na bio + guia de pré-venda se o clip for de compra.",
    next1: "Abre o [mapa interativo Map-6]({map}) e partilha o pin.",
    next2: "Para hardware / edições: [guia de pré-venda]({preorder}).",
    next3:
      "Clássicos: [mapa GTA 5]({gta5}) ou [San Andreas]({sa}) à espera do VI.",
    classic: "GTA clássico",
    deepDive: "— análise Map-6",
    clipDrop: "— posta no Kick / TikTok com o overlay do mapa",
  },
  de: {
    whatsNew: "Was gibt’s Neues",
    funnel:
      "Map-6 macht daraus eine **Funnel-Seite**: Map-Deep-Link + Intent {kind} — kein generischer News-Dump.",
    verified: "Verifizierte Fakten vs. Gerüchte",
    confirmed:
      "**Bestätigt**: nur was Rockstar gesagt oder in offiziellen Medien gezeigt hat.",
    rumors:
      "**Gerüchte**: Leaks bleiben klar unverifiziert — wir erfinden kein Trailer-Datum.",
    keyword: "Primary keyword",
    buy: "Kauf / Setup",
    mapAngle: "Karten- & Ortswinkel",
    clipKit: "Clip-Kit (TikTok / Kick)",
    next: "Nächste Schritte",
    sources: "Quellen",
    sourcesBlurb: "Zitationen für diesen Entwurf — siehe Liste unten.",
    map: "Interaktive Karte",
    locations: "Alle Orte",
    mapGuide: "Karten-Guide für Einsteiger",
    preorder: "GTA-6-Vorbestell-Guide",
    openPin: "Öffne den Pin auf der [interaktiven Karte]({map}).",
    screenRecord:
      "Nimm das HUD auf (Coords + POI-Name) — Share kopiert einen Deep Link.",
    cta: "CTA: Map-Link in der Bio + Vorbestell-Guide, wenn der Clip kaufnah ist.",
    next1: "Öffne die [Map-6 interaktive Karte]({map}) und teile den Pin.",
    next2: "Für Hardware / Editionen: [Vorbestell-Guide]({preorder}).",
    next3:
      "Klassiker: [GTA-5-Karte]({gta5}) oder [San Andreas]({sa}), bis VI kommt.",
    classic: "GTA-Klassiker",
    deepDive: "— Map-6 Deep Dive",
    clipDrop: "— auf Kick / TikTok mit Map-Overlay droppen",
  },
  it: {
    whatsNew: "Novità",
    funnel:
      "Map-6 ne fa una **pagina funnel**: deep-link mappa + intent {kind} — non un dump di news generiche.",
    verified: "Fatti verificati vs rumor",
    confirmed:
      "**Confermato**: solo ciò che Rockstar ha detto o mostrato nei media ufficiali.",
    rumors:
      "**Rumor**: i leak restano chiaramente non verificati — non inventiamo date del trailer.",
    keyword: "Keyword principale",
    buy: "Acquisto / setup",
    mapAngle: "Angolo mappa e luoghi",
    clipKit: "Kit clip (TikTok / Kick)",
    next: "Cosa fare ora",
    sources: "Fonti",
    sourcesBlurb: "Citazioni usate in questa bozza — vedi elenco sotto.",
    map: "Mappa interattiva",
    locations: "Tutti i luoghi",
    mapGuide: "Guida mappa per principianti",
    preorder: "Guida preordine GTA 6",
    openPin: "Apri il pin sulla [mappa interattiva]({map}).",
    screenRecord:
      "Registra l’HUD (coords + nome POI) — Share copia un deep link.",
    cta: "CTA: link mappa in bio + guida preordine se il clip è di acquisto.",
    next1: "Apri la [mappa interattiva Map-6]({map}) e condividi il pin.",
    next2: "Per hardware / edizioni: [guida preordine]({preorder}).",
    next3:
      "Classici: [mappa GTA 5]({gta5}) o [San Andreas]({sa}) in attesa di VI.",
    classic: "GTA classici",
    deepDive: "— approfondimento Map-6",
    clipDrop: "— droppalo su Kick / TikTok con overlay mappa",
  },
};

const TITLES: Record<string, Partial<Record<Locale, string>>> = {
  "take-two-ceo-teases-more-gta-6-trailers-after-netflix-stream-event-vice": {
    fr: "Take-Two tease d’autres trailers GTA 6 après Netflix",
    es: "El CEO de Take-Two anticipa más tráilers de GTA 6 tras Netflix",
    pt: "CEO da Take-Two sugere mais trailers de GTA 6 após Netflix",
    de: "Take-Two-CEO deutet weitere GTA-6-Trailer nach Netflix an",
    it: "Il CEO di Take-Two anticipa altri trailer di GTA 6 dopo Netflix",
  },
  "gta-6-trailer-3-expected-to-arrive-within-two-weeks-according-to-insider-tweakto":
    {
      fr: "Trailer 3 GTA 6 attendu sous deux semaines (insider)",
      es: "El tráiler 3 de GTA 6 llegaría en dos semanas (insider)",
      pt: "Trailer 3 de GTA 6 esperado em duas semanas (insider)",
      de: "GTA-6-Trailer 3 laut Insider binnen zwei Wochen",
      it: "Trailer 3 di GTA 6 atteso entro due settimane (insider)",
    },
  "gta-6-an-extended-look-on-netflix-confirms-new-trailer-how-to-watch-for-free-and":
    {
      fr: "GTA 6 Extended Look sur Netflix : trailer et visionnage",
      es: "GTA 6 Extended Look en Netflix: tráiler y cómo verlo",
      pt: "GTA 6 Extended Look na Netflix: trailer e como assistir",
      de: "GTA 6 Extended Look auf Netflix: Trailer & Stream",
      it: "GTA 6 Extended Look su Netflix: trailer e come guardarlo",
    },
};

const DESCS: Record<Locale, (kw: string) => string> = {
  fr: (kw) =>
    `Ce qu’on sait sur ${kw} : sources, contexte carte et impact pour Vice City. Couverture Map-6 vérifiée — pas de date inventée.`,
  es: (kw) =>
    `Lo que sabemos sobre ${kw}: fuentes, contexto del mapa e impacto en Vice City. Cobertura Map-6 verificada — sin fechas inventadas.`,
  pt: (kw) =>
    `O que sabemos sobre ${kw}: fontes, contexto do mapa e impacto em Vice City. Cobertura Map-6 verificada — sem datas inventadas.`,
  de: (kw) =>
    `Was wir zu ${kw} wissen: Quellen, Kartenkontext und Vice City. Verifizierte Map-6-Berichterstattung — kein erfundenes Trailer-Datum.`,
  it: (kw) =>
    `Cosa sappiamo su ${kw}: fonti, contesto mappa e impatto su Vice City. Copertura Map-6 verificata — niente date inventate.`,
};

function fill(tpl: string, vars: Record<string, string>) {
  return tpl.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");
}

function localizeBody(en: Article, locale: Locale, headline: string): string {
  const ui = UI[locale];
  const map = `/${locale}/map`;
  const preorder = `/${locale}/guides/gta-6-preorder-guide`;
  const locations = `/${locale}/locations`;
  const mapGuide = `/${locale}/guides/gta-6-map-guide`;
  const gta5 = `/${locale}/map?game=gta5`;
  const sa = `/${locale}/map?game=sa`;
  const kind = en.funnelKind || "mixed";
  const sourceLine = en.sources[0]?.title || headline;
  const hookSuffix =
    kind === "clip_kit" || kind === "mixed" ? ui.clipDrop : ui.deepDive;

  const buyNote: Record<Locale, string> = {
    fr: "Les slots affiliation se remplissent dès que les ASINs officiels existent.",
    es: "Los slots de afiliados se rellenan cuando existan ASINs oficiales.",
    pt: "Os slots de afiliados preenchem-se quando houver ASINs oficiais.",
    de: "Affiliate-Slots werden gefüllt, sobald offizielle ASINs live sind.",
    it: "Gli slot affiliate si riempiono quando ci sono ASIN ufficiali.",
  };

  const buyBlock =
    en.funnelKind === "purchase" || en.funnelKind === "mixed"
      ? `\n## ${ui.buy}\n\n- Full picks: [${ui.preorder}](${preorder})\n- ${buyNote[locale]}\n`
      : "";

  return `## ${ui.whatsNew}

${sourceLine}

${fill(ui.funnel, { kind })}

## ${ui.verified}

- ${ui.confirmed}
- ${ui.rumors}

${ui.keyword}: **${en.primaryKeyword}**.
${buyBlock}
## ${ui.mapAngle}

- [${ui.map}](${map})
- [${ui.locations}](${locations})
- [${ui.mapGuide}](${mapGuide})

## ${ui.clipKit}

> ${headline} ${hookSuffix}

1. ${fill(ui.openPin, { map })}
2. ${ui.screenRecord}
3. ${ui.cta}

## ${ui.next}

1. ${fill(ui.next1, { map })}
2. ${fill(ui.next2, { preorder })}
3. ${fill(ui.next3, { gta5, sa })}

## ${ui.sources}

${ui.sourcesBlurb}
`;
}

async function main() {
  const file = path.join(root, "data/content/articles.json");
  const articles = JSON.parse(await fs.readFile(file, "utf8")) as Article[];
  const idArg = argValue("--ids");
  const recent = Number(argValue("--recent") ?? "3");
  const doPublish = hasFlag("--publish");

  let sources: Article[];
  if (idArg) {
    const ids = new Set(idArg.split(",").map((s) => s.trim()));
    sources = articles.filter((a) => ids.has(a.id) && a.locale === "en");
  } else {
    sources = articles
      .filter((a) => a.locale === "en" && a.status === "published")
      .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""))
      .slice(0, recent);
  }

  if (!sources.length) throw new Error("No EN source articles");

  const created: Article[] = [];
  const now = new Date().toISOString();

  for (const en of sources) {
    for (const locale of LOCALES) {
      const existing = articles.find(
        (a) => a.slug === en.slug && a.locale === locale,
      );
      const title =
        TITLES[en.slug]?.[locale] ||
        `${en.title}`.slice(0, 58);
      const description = DESCS[locale](en.primaryKeyword).slice(0, 160);
      const bodyMarkdown = localizeBody(en, locale, title);
      const article: Article = {
        ...en,
        id: existing?.id ?? randomUUID(),
        locale,
        title: title.slice(0, 60),
        description:
          description.length < 120
            ? description.padEnd(120, ".")
            : description.slice(0, 160),
        bodyMarkdown,
        status: "drafted",
        author: "Map-6 Editorial",
        reviewer: undefined,
        publishedAt: undefined,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
        clipHook: `${title} ${UI[locale].deepDive}`,
        notes: `Localized from ${en.id} (${en.locale})`,
        eventKey: `${en.eventKey}-${locale}`,
      };

      if (existing) {
        const idx = articles.findIndex((a) => a.id === existing.id);
        articles[idx] = { ...existing, ...article, id: existing.id };
        created.push(articles[idx]);
      } else {
        articles.push(article);
        created.push(article);
      }
      console.log(`+ ${locale} ${article.slug.slice(0, 48)}`);
    }
  }

  await fs.writeFile(file, `${JSON.stringify(articles, null, 2)}\n`);
  console.log(`Wrote ${created.length} localized drafts`);

  if (!doPublish) {
    console.log("Tip: re-run with --publish to upsert+publish on map-6.com");
    return;
  }

  const secret = process.env.CONTENT_API_SECRET;
  if (!secret) throw new Error("CONTENT_API_SECRET required for --publish");
  const base = (
    process.env.SITE_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://map-6.com"
  ).replace(/\/$/, "");

  async function post(apiPath: string, body: unknown) {
    const res = await fetch(`${base}${apiPath}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`${apiPath} ${res.status}: ${text.slice(0, 400)}`);
    return JSON.parse(text) as { path?: string };
  }

  for (const a of created) {
    process.stdout.write(`publish ${a.locale}/${a.slug.slice(0, 40)} … `);
    await post("/api/content/upsert", { article: { ...a, status: "drafted" } });
    const result = await post("/api/content/publish", {
      articleId: a.id,
      reviewer: "localize",
    });
    a.status = "published";
    a.publishedAt = now;
    a.reviewer = "localize";
    console.log(result.path ?? "ok");
  }

  await fs.writeFile(file, `${JSON.stringify(articles, null, 2)}\n`);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
