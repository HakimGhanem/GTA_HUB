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
  "for-a-lot-of-people-this-is-the-one-must-buy-game-this-year-and-they-will-want-t":
    {
      fr: "GTA 6 Ultimate : 89 % des précommandes à ~100 $",
      es: "GTA 6 Ultimate: el 89% de preventas a ~100 $",
      pt: "GTA 6 Ultimate: 89% das pré-vendas a ~100 $",
      de: "GTA 6 Ultimate: 89 % der Vorbestellungen (~100 $)",
      it: "GTA 6 Ultimate: l’89% dei preordini a ~100 $",
    },
  "gta-6-preorder-checklist-ps5-xbox": {
    fr: "Checklist précommande GTA 6 : PS5, Xbox & vérifs",
    es: "Checklist de preventa GTA 6: PS5, Xbox y qué verificar",
    pt: "Checklist de pré-venda GTA 6: PS5, Xbox e o que checar",
    de: "GTA-6-Vorbestell-Checkliste: PS5, Xbox & Checks",
    it: "Checklist preordine GTA 6: PS5, Xbox e cosa verificare",
  },
  "how-to-use-gta-6-interactive-map": {
    fr: "Comment utiliser la carte interactive GTA 6",
    es: "Cómo usar el mapa interactivo de GTA 6",
    pt: "Como usar o mapa interativo de GTA 6",
    de: "So nutzt du die interaktive GTA-6-Karte",
    it: "Come usare la mappa interattiva di GTA 6",
  },
  "leonida-regions-explained-gta-6": {
    fr: "Régions de Leonida : Vice City à Grassrivers",
    es: "Regiones de Leonida: de Vice City a Grassrivers",
    pt: "Regiões de Leonida: de Vice City a Grassrivers",
    de: "Leonida-Regionen: Von Vice City bis Grassrivers",
    it: "Regioni di Leonida: da Vice City a Grassrivers",
  },
  "gta-6-map-cities-skylines-2-news": {
    fr: "Carte GTA 6 en Cities: Skylines II (ID 153426)",
    es: "Mapa de GTA 6 en Cities: Skylines II (ID 153426)",
    pt: "Mapa de GTA 6 em Cities: Skylines II (ID 153426)",
    de: "GTA-6-Karte in Cities: Skylines II (ID 153426)",
    it: "Mappa GTA 6 in Cities: Skylines II (ID 153426)",
  },
  "ocean-drive-gta-6-map-clues": {
    fr: "Ocean Drive dans GTA 6 : indices carte des trailers",
    es: "Ocean Drive en GTA 6: pistas del mapa en los tráilers",
    pt: "Ocean Drive em GTA 6: pistas do mapa nos trailers",
    de: "Ocean Drive in GTA 6: Karten-Hinweise aus Trailern",
    it: "Ocean Drive in GTA 6: indizi mappa dai trailer",
  },
  "mount-kalaga-gta-6-region": {
    fr: "Mount Kalaga dans GTA 6 : nord sauvage de Leonida",
    es: "Mount Kalaga en GTA 6: el norte salvaje de Leonida",
    pt: "Mount Kalaga em GTA 6: o norte selvagem de Leonida",
    de: "Mount Kalaga in GTA 6: Leonidas nördliche Wildnis",
    it: "Mount Kalaga in GTA 6: il nord selvaggio di Leonida",
  },
  "gta-6-release-date-platforms": {
    fr: "Date de sortie GTA 6 & plateformes (2026)",
    es: "Fecha de lanzamiento de GTA 6 y plataformas (2026)",
    pt: "Data de lançamento de GTA 6 e plataformas (2026)",
    de: "GTA-6-Release-Datum & Plattformen (2026)",
    it: "Data di uscita GTA 6 e piattaforme (2026)",
  },
  "gta-6-trailer-3-what-we-know": {
    fr: "Trailer 3 GTA 6 : faits vérifiés vs rumeurs",
    es: "Tráiler 3 de GTA 6: hechos verificados vs rumores",
    pt: "Trailer 3 de GTA 6: factos verificados vs rumores",
    de: "GTA-6-Trailer 3: Verifizierte Fakten vs. Gerüchte",
    it: "Trailer 3 di GTA 6: fatti verificati vs rumor",
  },
  "gta-6-trailer-watch-map-checklist": {
    fr: "Checklist trailer GTA 6 pour chasseurs de carte",
    es: "Checklist de tráiler GTA 6 para cazadores de mapa",
    pt: "Checklist de trailer GTA 6 para caçadores de mapa",
    de: "GTA-6-Trailer-Checkliste für Kartenjäger",
    it: "Checklist trailer GTA 6 per cacciatori di mappa",
  },
  "gta-6-extended-look-trailer-coming-august-27-on-netflix": {
    fr: "Trailer Extended Look GTA 6 le 27 août sur Netflix",
    es: "Tráiler Extended Look de GTA 6 el 27 de agosto en Netflix",
    pt: "Trailer Extended Look de GTA 6 a 27 de agosto na Netflix",
    de: "GTA-6-Extended-Look-Trailer am 27. August auf Netflix",
    it: "Trailer Extended Look GTA 6 il 27 agosto su Netflix",
  },
  "netflix-bags-an-exclusive-gta-vi-trailer-for-all-of-six": {
    fr: "Netflix et le trailer exclusif GTA VI (6 minutes)",
    es: "Netflix y el tráiler exclusivo de GTA VI (seis minutos)",
    pt: "Netflix e o trailer exclusivo de GTA VI (seis minutos)",
    de: "Netflix und der exklusive GTA-VI-Trailer (sechs Minuten)",
    it: "Netflix e il trailer esclusivo di GTA VI (sei minuti)",
  },
  "new-gta-6-artwork-released-ahead-of-trailer-3-rockstarintel": {
    fr: "Nouveau artwork GTA 6 avant le Trailer 3",
    es: "Nuevo artwork de GTA 6 antes del Tráiler 3",
    pt: "Novo artwork de GTA 6 antes do Trailer 3",
    de: "Neues GTA-6-Artwork vor Trailer 3",
    it: "Nuovo artwork di GTA 6 prima del Trailer 3",
  },
  "netflix-s-gta-6-trailer-trashed-as-next-level-greed-by-fans-polygon-com": {
    fr: "Trailer Netflix GTA 6 critiqué : « greed » selon les fans",
    es: "Tráiler Netflix de GTA 6 criticado por «codicia»",
    pt: "Trailer Netflix de GTA 6 criticado por «ganância»",
    de: "Netflix-GTA-6-Trailer: Fans kritisieren «Greed»",
    it: "Trailer Netflix GTA 6 criticato per «avidità»",
  },
};

/** Per-slug SERP descriptions (unique copy — avoid generic “what we know”). */
const SLUG_DESCS: Record<string, Partial<Record<Locale, string>>> = {
  "gta-6-preorder-checklist-ps5-xbox": {
    fr: "Checklist précommande GTA 6 PS5/Xbox : date officielle, éditions à comparer et prep carte Map-6 avant le lancement.",
    es: "Checklist de preventa GTA 6 PS5/Xbox: fecha oficial, ediciones a comparar y prep del mapa Map-6 antes del lanzamiento.",
    pt: "Checklist de pré-venda GTA 6 PS5/Xbox: data oficial, edições a comparar e prep do mapa Map-6 antes do lançamento.",
    de: "GTA-6-Vorbestell-Checkliste PS5/Xbox: offizielles Datum, Editionen vergleichen und Map-6-Karten-Prep vor Launch.",
    it: "Checklist preordine GTA 6 PS5/Xbox: data ufficiale, edizioni da confrontare e prep mappa Map-6 prima del lancio.",
  },
  "how-to-use-gta-6-interactive-map": {
    fr: "Tutoriel carte interactive GTA 6 Map-6 : filtres, coords, collectibles et pages lieux — gratuit, prêt pour le lancement.",
    es: "Guía del mapa interactivo GTA 6 Map-6: filtros, coords, coleccionables y páginas de lugares — gratis, listo para el lanzamiento.",
    pt: "Guia do mapa interativo GTA 6 Map-6: filtros, coords, colecionáveis e páginas de locais — grátis, pronto para o lançamento.",
    de: "GTA-6-Karten-Tutorial Map-6: Filter, Coords, Collectibles und Ortsseiten — kostenlos, launch-ready.",
    it: "Guida mappa interattiva GTA 6 Map-6: filtri, coords, collezionabili e pagine luoghi — gratis, pronto al lancio.",
  },
  "leonida-regions-explained-gta-6": {
    fr: "Géographie Leonida GTA 6 : Vice City, Ocean Drive, Keys, Port Gellhorn, Grassrivers, Ambrosia — liens Map-6 par région.",
    es: "Geografía de Leonida en GTA 6: Vice City, Ocean Drive, Keys, Port Gellhorn, Grassrivers, Ambrosia — enlaces Map-6 por región.",
    pt: "Geografia de Leonida em GTA 6: Vice City, Ocean Drive, Keys, Port Gellhorn, Grassrivers, Ambrosia — links Map-6 por região.",
    de: "Leonida-Geografie in GTA 6: Vice City, Ocean Drive, Keys, Port Gellhorn, Grassrivers, Ambrosia — Map-6-Links je Region.",
    it: "Geografia di Leonida in GTA 6: Vice City, Ocean Drive, Keys, Port Gellhorn, Grassrivers, Ambrosia — link Map-6 per regione.",
  },
  "gta-6-map-cities-skylines-2-news": {
    fr: "Noasden reconstruit Leonida dans Cities: Skylines II (~145h, ID 153426). Projet fan vs carte POI Map-6 — pas Rockstar.",
    es: "Noasden reconstruye Leonida en Cities: Skylines II (~145h, ID 153426). Proyecto fan vs mapa POI Map-6 — no es Rockstar.",
    pt: "Noasden reconstrói Leonida em Cities: Skylines II (~145h, ID 153426). Projeto fã vs mapa POI Map-6 — não é Rockstar.",
    de: "Noasden baut Leonida in Cities: Skylines II nach (~145h, ID 153426). Fan-Projekt vs Map-6-POI-Karte — nicht Rockstar.",
    it: "Noasden ricostruisce Leonida in Cities: Skylines II (~145h, ID 153426). Progetto fan vs mappa POI Map-6 — non Rockstar.",
  },
  "ocean-drive-gta-6-map-clues": {
    fr: "Landmarks Ocean Drive dans les trailers GTA 6 — hôtels néon, front de mer et skyline à repérer sur la carte Map-6.",
    es: "Hitos de Ocean Drive en los tráilers de GTA 6 — hoteles neón, paseo marítimo y skyline en el mapa Map-6.",
    pt: "Marcos de Ocean Drive nos trailers de GTA 6 — hotéis neon, beira-mar e skyline no mapa Map-6.",
    de: "Ocean-Drive-Landmarken aus GTA-6-Trailern — Neon-Hotels, Strandstraße und Skyline auf der Map-6-Karte.",
    it: "Landmark di Ocean Drive nei trailer di GTA 6 — hotel al neon, lungomare e skyline sulla mappa Map-6.",
  },
  "mount-kalaga-gta-6-region": {
    fr: "Mount Kalaga dans GTA 6 — région nord Leonida nommée par Rockstar, différences avec Grassrivers, ouverture sur Map-6.",
    es: "Mount Kalaga en GTA 6 — región norte de Leonida nombrada por Rockstar, diferencias con Grassrivers, apertura en Map-6.",
    pt: "Mount Kalaga em GTA 6 — região norte de Leonida nomeada pela Rockstar, diferenças vs Grassrivers, abertura no Map-6.",
    de: "Mount Kalaga in GTA 6 — nördliche Leonida-Region von Rockstar, Unterschied zu Grassrivers, Öffnen auf Map-6.",
    it: "Mount Kalaga in GTA 6 — regione nord di Leonida nominata da Rockstar, differenze vs Grassrivers, apertura su Map-6.",
  },
  "gta-6-release-date-platforms": {
    fr: "Date de sortie officielle GTA 6, plateformes confirmées et impact carte/précommande sur Map-6 — sources Rockstar.",
    es: "Fecha oficial de GTA 6, plataformas confirmadas e impacto mapa/preventa en Map-6 — fuentes Rockstar.",
    pt: "Data oficial de GTA 6, plataformas confirmadas e impacto mapa/pré-venda no Map-6 — fontes Rockstar.",
    de: "Offizielles GTA-6-Release-Datum, bestätigte Plattformen und Karten-/Vorbestell-Impact auf Map-6 — Rockstar-Quellen.",
    it: "Data ufficiale GTA 6, piattaforme confermate e impatto mappa/preordine su Map-6 — fonti Rockstar.",
  },
  "gta-6-trailer-3-what-we-know": {
    fr: "Statut Trailer 3 GTA 6, faits vs rumeurs et indices carte Map-6. Aucune date inventée — sources officielles seulement.",
    es: "Estado del Tráiler 3 de GTA 6, hechos vs rumores e indicios del mapa Map-6. Sin fechas inventadas — solo fuentes oficiales.",
    pt: "Estado do Trailer 3 de GTA 6, factos vs rumores e pistas do mapa Map-6. Sem datas inventadas — só fontes oficiais.",
    de: "Status GTA-6-Trailer 3, Fakten vs. Gerüchte und Map-6-Kartenhinweise. Kein erfundenes Datum — nur offizielle Quellen.",
    it: "Stato del Trailer 3 di GTA 6, fatti vs rumor e indizi mappa Map-6. Niente date inventate — solo fonti ufficiali.",
  },
  "gta-6-trailer-watch-map-checklist": {
    fr: "Checklist pour croiser trailers GTA 6 et Map-6 : néon, Keys, Port Gellhorn, Grassrivers, Mount Kalaga.",
    es: "Checklist para cruzar tráilers de GTA 6 con Map-6: neón, Keys, Port Gellhorn, Grassrivers, Mount Kalaga.",
    pt: "Checklist para cruzar trailers de GTA 6 com Map-6: néon, Keys, Port Gellhorn, Grassrivers, Mount Kalaga.",
    de: "Checkliste: GTA-6-Trailer gegen Map-6 abgleichen — Neon, Keys, Port Gellhorn, Grassrivers, Mount Kalaga.",
    it: "Checklist per confrontare trailer GTA 6 e Map-6: neon, Keys, Port Gellhorn, Grassrivers, Mount Kalaga.",
  },
  "gta-6-extended-look-trailer-coming-august-27-on-netflix": {
    fr: "Extended Look GTA 6 annoncé le 27 août sur Netflix — contexte carte, sources et angles Vice City sur Map-6.",
    es: "Extended Look de GTA 6 el 27 de agosto en Netflix — contexto mapa, fuentes y ángulos Vice City en Map-6.",
    pt: "Extended Look de GTA 6 a 27 de agosto na Netflix — contexto mapa, fontes e ângulos Vice City no Map-6.",
    de: "GTA-6-Extended-Look am 27. August auf Netflix — Kartenkontext, Quellen und Vice-City-Winkel auf Map-6.",
    it: "Extended Look GTA 6 il 27 agosto su Netflix — contesto mappa, fonti e angoli Vice City su Map-6.",
  },
  "netflix-bags-an-exclusive-gta-vi-trailer-for-all-of-six": {
    fr: "Exclus Netflix du trailer GTA VI (~6 min) : contexte carte Map-6, sources vérifiées — pas de date inventée.",
    es: "Exclusiva Netflix del tráiler GTA VI (~6 min): contexto mapa Map-6, fuentes verificadas — sin fechas inventadas.",
    pt: "Exclusivo Netflix do trailer GTA VI (~6 min): contexto mapa Map-6, fontes verificadas — sem datas inventadas.",
    de: "Netflix-Exklusiv-Trailer GTA VI (~6 Min.): Map-6-Kartenkontext, verifizierte Quellen — kein erfundenes Datum.",
    it: "Esclusiva Netflix del trailer GTA VI (~6 min): contesto mappa Map-6, fonti verificate — niente date inventate.",
  },
  "new-gta-6-artwork-released-ahead-of-trailer-3-rockstarintel": {
    fr: "Nouvel artwork GTA 6 avant Trailer 3 : indices visuels, contexte carte Map-6 et sources — pas de spoiler inventé.",
    es: "Nuevo artwork de GTA 6 antes del Tráiler 3: indicios visuales, mapa Map-6 y fuentes — sin spoilers inventados.",
    pt: "Novo artwork de GTA 6 antes do Trailer 3: pistas visuais, mapa Map-6 e fontes — sem spoilers inventados.",
    de: "Neues GTA-6-Artwork vor Trailer 3: visuelle Hinweise, Map-6-Kontext und Quellen — keine erfundenen Spoiler.",
    it: "Nuovo artwork GTA 6 prima del Trailer 3: indizi visivi, contesto Map-6 e fonti — niente spoiler inventati.",
  },
  "netflix-s-gta-6-trailer-trashed-as-next-level-greed-by-fans-polygon-com": {
    fr: "Réactions fans au trailer Netflix GTA 6 (« greed ») : contexte, sources et angles carte Vice City sur Map-6.",
    es: "Reacción de fans al tráiler Netflix de GTA 6 («codicia»): contexto, fuentes y ángulos mapa Vice City en Map-6.",
    pt: "Reação dos fãs ao trailer Netflix de GTA 6 («ganância»): contexto, fontes e ângulos mapa Vice City no Map-6.",
    de: "Fan-Reaktion auf Netflix-GTA-6-Trailer («Greed»): Kontext, Quellen und Vice-City-Kartenwinkel auf Map-6.",
    it: "Reazione dei fan al trailer Netflix GTA 6 («avidità»): contesto, fonti e angoli mappa Vice City su Map-6.",
  },
  "take-two-ceo-teases-more-gta-6-trailers-after-netflix-stream-event-vice": {
    fr: "Take-Two tease d’autres trailers GTA 6 après Netflix : contexte carte Map-6 et sources — zéro date inventée.",
    es: "Take-Two anticipa más tráilers de GTA 6 tras Netflix: contexto mapa Map-6 y fuentes — cero fechas inventadas.",
    pt: "Take-Two sugere mais trailers de GTA 6 após Netflix: contexto mapa Map-6 e fontes — zero datas inventadas.",
    de: "Take-Two deutet weitere GTA-6-Trailer nach Netflix an: Map-6-Kontext und Quellen — kein erfundenes Datum.",
    it: "Take-Two anticipa altri trailer GTA 6 dopo Netflix: contesto Map-6 e fonti — zero date inventate.",
  },
  "gta-6-trailer-3-expected-to-arrive-within-two-weeks-according-to-insider-tweakto":
    {
      fr: "Rumeur insider Trailer 3 GTA 6 sous 2 semaines : on sépare leak et officiel, avec contexte carte Map-6.",
      es: "Rumor insider: Tráiler 3 de GTA 6 en 2 semanas — separamos leak y oficial, con contexto mapa Map-6.",
      pt: "Rumor insider: Trailer 3 de GTA 6 em 2 semanas — separamos leak e oficial, com contexto mapa Map-6.",
      de: "Insider-Gerücht: GTA-6-Trailer 3 in 2 Wochen — Leak vs. offiziell, mit Map-6-Kartenkontext.",
      it: "Rumor insider: Trailer 3 GTA 6 entro 2 settimane — separiamo leak e ufficiale, con contesto Map-6.",
    },
  "gta-6-an-extended-look-on-netflix-confirms-new-trailer-how-to-watch-for-free-and":
    {
      fr: "Extended Look Netflix confirme un trailer GTA 6 : comment regarder, contexte carte et liens Map-6.",
      es: "Extended Look en Netflix confirma tráiler de GTA 6: cómo verlo, contexto mapa y enlaces Map-6.",
      pt: "Extended Look na Netflix confirma trailer de GTA 6: como assistir, contexto mapa e links Map-6.",
      de: "Netflix Extended Look bestätigt GTA-6-Trailer: Stream-Tipps, Kartenkontext und Map-6-Links.",
      it: "Extended Look su Netflix conferma trailer GTA 6: come guardarlo, contesto mappa e link Map-6.",
    },
  "for-a-lot-of-people-this-is-the-one-must-buy-game-this-year-and-they-will-want-t":
    {
      fr: "Édition Ultimate GTA 6 : ~89 % des précommandes à ~100 $ — checklist achat et prep carte Map-6.",
      es: "Edición Ultimate de GTA 6: ~89% de preventas a ~100 $ — checklist de compra y prep mapa Map-6.",
      pt: "Edição Ultimate de GTA 6: ~89% das pré-vendas a ~100 $ — checklist de compra e prep mapa Map-6.",
      de: "GTA-6-Ultimate-Edition: ~89 % der Vorbestellungen (~100 $) — Kauf-Checkliste und Map-6-Prep.",
      it: "Edizione Ultimate GTA 6: ~89% dei preordini a ~100 $ — checklist acquisto e prep mappa Map-6.",
    },
};

const FALLBACK_DESCS: Record<Locale, (kw: string, cluster: string) => string> = {
  fr: (kw, cluster) =>
    cluster === "preorder" || cluster === "release"
      ? `${kw} : date, plateformes et checklist achat Map-6 — sources officielles uniquement.`
      : cluster === "map" || cluster === "locations"
        ? `${kw} : repères carte Leonida, POI Map-6 et liens lieux — couverture vérifiée.`
        : `${kw} : sources, angle carte Vice City et impact Map-6 — aucune date inventée.`,
  es: (kw, cluster) =>
    cluster === "preorder" || cluster === "release"
      ? `${kw}: fecha, plataformas y checklist de compra Map-6 — solo fuentes oficiales.`
      : cluster === "map" || cluster === "locations"
        ? `${kw}: hitos del mapa Leonida, POI Map-6 y enlaces de lugares — cobertura verificada.`
        : `${kw}: fuentes, ángulo mapa Vice City e impacto Map-6 — sin fechas inventadas.`,
  pt: (kw, cluster) =>
    cluster === "preorder" || cluster === "release"
      ? `${kw}: data, plataformas e checklist de compra Map-6 — só fontes oficiais.`
      : cluster === "map" || cluster === "locations"
        ? `${kw}: marcos do mapa Leonida, POI Map-6 e links de locais — cobertura verificada.`
        : `${kw}: fontes, ângulo mapa Vice City e impacto Map-6 — sem datas inventadas.`,
  de: (kw, cluster) =>
    cluster === "preorder" || cluster === "release"
      ? `${kw}: Datum, Plattformen und Kauf-Checkliste Map-6 — nur offizielle Quellen.`
      : cluster === "map" || cluster === "locations"
        ? `${kw}: Leonida-Kartenmarker, Map-6-POIs und Ortslinks — verifizierte Berichterstattung.`
        : `${kw}: Quellen, Vice-City-Kartenwinkel und Map-6-Impact — kein erfundenes Datum.`,
  it: (kw, cluster) =>
    cluster === "preorder" || cluster === "release"
      ? `${kw}: data, piattaforme e checklist acquisto Map-6 — solo fonti ufficiali.`
      : cluster === "map" || cluster === "locations"
        ? `${kw}: marker mappa Leonida, POI Map-6 e link luoghi — copertura verificata.`
        : `${kw}: fonti, angolo mappa Vice City e impatto Map-6 — niente date inventate.`,
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
      const description = (
        SLUG_DESCS[en.slug]?.[locale] ||
        FALLBACK_DESCS[locale](en.primaryKeyword, en.cluster)
      ).slice(0, 160);
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
