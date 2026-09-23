import type { Article } from "@/lib/content/schema";
import { locationFigure } from "@/lib/content/key-news";

const AUTHOR = "Map-6 Editorial";
const NOW = "2026-09-23T16:00:00.000Z";

const VC = (alt: string, cap: string) => locationFigure("vice-city", alt, cap);
const OD = (alt: string, cap: string) => locationFigure("ocean-drive", alt, cap);
const KEYS = (alt: string, cap: string) =>
  locationFigure("leonida-keys", alt, cap);

const ROCKSTAR_VI = {
  url: "https://www.rockstargames.com/VI",
  title: "Rockstar Games — Grand Theft Auto VI",
};

function base(
  partial: Omit<Article, "author" | "reviewer" | "updatedAt" | "status">,
): Article {
  return {
    ...partial,
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    updatedAt: NOW,
  };
}

export const HUB_ARTICLES: Article[] = [
  base({
    id: "editorial-official-facts-roundup-en",
    slug: "gta-6-official-facts-roundup",
    locale: "en",
    title: "GTA 6 Official Facts — Date, Map Names, Lucia & Jason",
    description:
      "What Rockstar has actually locked for Grand Theft Auto VI: November 19 2026, PS5 and Xbox, named Leonida hubs, dual protagonists, and the Extended Look systems. Rumors stay labeled.",
    bodyMarkdown: `Rockstar’s public page for *Grand Theft Auto VI* is still the only document that should decide a pre-order, a console upgrade, or a map pin. This briefing is a **facts desk**, not a rumor dump. If a claim is not on [rockstargames.com/VI](https://www.rockstargames.com/VI), a Newswire post, or a Take-Two earnings remark, Map-6 labels it **unconfirmed**.

The game launches **November 19, 2026** on **PlayStation 5** and **Xbox Series X|S**. That date replaced earlier windows after Rockstar asked for more polish time. PC is **not** in the same sentence. Treat “day-one Steam” posts as noise until a separate Rockstar calendar exists. Editions and US list prices live in the [pre-order guide](/en/guides/gta-6-preorder-guide): Standard **$79.99**, Ultimate **$99.99**, with Ultimate as a **digital extras tier**, not a statue box.
${VC("Vice City hub on the Map-6 GTA 6 map", "Vice City is the marketed metro — neon, water, freeway seams — not the entire state of Leonida.")}

## Named geography, not a finished atlas

Rockstar markets a Florida-shaped state called **Leonida**. The destinations it has put on posters and trailers are the vocabulary Map-6 uses:

- **Vice City** — Miami-coded metro, nightlife, beaches, downtown seams.
- **Leonida Keys** — causeways, water, the “escape the city” contrast.
- **Grassrivers** — wetlands, mangrove energy, wildlife tone.
- **Port Gellhorn** — working waterfront and freight, not South Beach postcard.
- **Ambrosia** — gated wealth; Map-6 pins it as [Ambrosia Island](/en/locations/ambrosia-island).
- **Mount Kalaga** — northern wilderness and elevation, not swamp flatness.

Trailers also spend time on **Ocean Drive** as a recognizable strip. That is a district energy, not a promise that every hotel name is canon. Community reconstructions argue the full state may dwarf Los Santos. Rockstar has **not** printed km². We keep estimates on the [map-size guide](/en/guides/gta-6-map-size) and treat them as math, not a spec sheet. Open the [interactive map](/en/map) when you want pins instead of adjectives.

## Story and protagonists — official bios only

The campaign is sold as a modern Bonnie-and-Clyde couple: **Lucia Caminos** and **Jason Duval**. Lucia is the first non-optional female lead in a mainline *GTA*. Rockstar’s own copy places her out of the Leonida Penitentiary, aiming for the life her family never got. Jason is framed as someone who grew up around crime and tried to step away in the Keys — then Lucia happens. That is premise, not a mission list.

Map-6 will not invent last-heist titles, romance endings, or prison-sentence lengths. Character pages: [Lucia](/en/database/characters/lucia-caminos) and [Jason](/en/database/characters/jason-duval). Longer dual-lead notes: [characters guide](/en/guides/gta-6-characters-lucia-jason).
${OD("Ocean Drive on the Map-6 GTA 6 map", "Ocean Drive is trailer geography — a strip you can scrub — not an Ultimate unlock.")}

## Systems shown in An Extended Look

On **27 August 2026**, Rockstar ran **An Extended Look**: Netflix first at 3 PM ET, then YouTube and the official VI page six hours later. It was in-game PlayStation 5 footage, not a collectible dump. The useful systems sentences:

- You can play as **both** leads. Switching looks near-instant in free roam. Some missions lock a perspective. The other character can be AI support.
- The **six-star** wanted ladder is back. The HUD also shows what police *know* — appearance, weapons, vehicle — not only how loud you are.
- Lifestyle simulation returns in a San Andreas spirit: food, exercise, and sleep change how the pair look.
- Side activities in the package included water sports, gyms, clubs, and denser NPC reactions. Treat the clip as a **sample**, not a 100% activity list.

Deep scrub: [Extended Look breakdown](/en/guides/gta-6-extended-look-breakdown) and the [six-star explainer](/en/guides/gta-6-wanted-system).

## What this page refuses to “complete”

We will not publish a fake shop directory, a leaked mission flowchart, or a PC date dressed as Newswire. If you arrived from a gift-card shop that mixed story recap with Shark Card upsells, the map work still lives here for free. Pre-order when you have locked a platform. Explore geography on [/map](/en/map). Read dated briefings under [news](/en/news). That is the whole official-facts loop.

## Prices, editions, and what is still blank

US list prices from Take-Two: Standard **$79.99**, Ultimate **$99.99**. France and UK street prices move; the [pre-order guide](/en/guides/gta-6-preorder-guide) tracks the Amazon.fr code-in-box listings when they are in stock. Ultimate extras are vehicles, weapons, apparel, and story-threaded content — not a larger Leonida. Standard owners can buy an upgrade later on PlayStation or Microsoft stores.

Still blank on purpose: PC date, cross-saves, collectible totals, a Collector statue SKU, and any “89 percent Ultimate” figure that is not in a Take-Two filing. If a retailer page contradicts Rockstar, Rockstar wins. If a TikTok contradicts the VI page, the VI page wins.

Use this recap as a **hub index**, then jump to the page that does the long work: map size, wanted HUD, characters, or editions. Do not treat a gift-card landing page as a primary source.
`,
    cluster: "release",
    primaryKeyword: "gta 6 official facts",
    secondaryKeywords: [
      "gta 6 release date",
      "gta 6 map locations",
      "lucia jason gta 6",
    ],
    sources: [ROCKSTAR_VI],
    publishedAt: "2026-09-23T10:00:00.000Z",
    createdAt: "2026-09-23T10:00:00.000Z",
    relatedLocationSlugs: [
      "vice-city",
      "ocean-drive",
      "leonida-keys",
      "grassrivers",
      "port-gellhorn",
      "ambrosia-island",
      "mount-kalaga",
    ],
    relatedGuideSlugs: [
      "gta-6-release-date",
      "gta-6-characters-lucia-jason",
      "gta-6-extended-look-breakdown",
    ],
    eventKey: "official-facts-roundup-2026-09",
    funnelKind: "mixed",
    affiliateIntents: ["preorder_standard", "console_upgrade", "wallet_topup"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "When does GTA 6 come out?",
        answer:
          "Rockstar has locked November 19, 2026 for PlayStation 5 and Xbox Series X|S. PC is not in that same announcement.",
      },
      {
        question: "Which GTA 6 locations has Rockstar named?",
        answer:
          "Marketed destinations include Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, and Mount Kalaga. Ocean Drive appears as trailer geography. Borders that Rockstar has not drawn stay estimated on Map-6.",
      },
      {
        question: "Who are the GTA 6 protagonists?",
        answer:
          "Lucia Caminos and Jason Duval. Lucia is the first non-optional female lead in a mainline GTA. Official bios are short; fan-wiki backstories are not canon.",
      },
    ],
    notes: "Hub recap — original Map-6 voice, Startselect-adjacent themes.",
  }),
  base({
    id: "editorial-leak-timeline-en",
    slug: "gta-6-leaks-timeline-verified",
    locale: "en",
    title: "GTA 6 Leaks Timeline — What Held Up, What Map-6 Ignores",
    description:
      "A sourced timeline of GTA 6 leaks from 2022 onward: the teapotuberhacker dump, Trailer 1 rip, office stills, and why Map-6 still refuses leak maps and fake mission lists.",
    bodyMarkdown: `Leak culture around *Grand Theft Auto VI* is older than the first official trailer. Map-6’s job is geography you can **re-check on official frames**, not a museum of stolen builds. This timeline exists so searchers who type “gta 6 leaks” get **dates and labels**, not a new dump.

We do not host development maps, ripped interiors, or “100% collectible” spreadsheets built from a hack. Rockstar has issued takedowns. A citation that survives a DMCA week is worth more than a hotter still.
${VC("Vice City on Map-6 — official-frame geography", "Map-6 pins come from trailer and marketing geography, not stolen build maps.")}

## September 2022 — the forum dump

A GTAForums user posting as **teapotuberhacker** published a large set of images and clips from development. It landed **before** Rockstar had shown a public trailer. Outlets later treated the event as authentic theft of work-in-progress material. That does **not** make every filename in a re-upload a 2026 fact. Builds age. UI changes. District names move.

Map-6 rule: if a 2022 still is the only source for a shop name, it stays **off** the indexable pin list. We will not launder a stolen HUD into a “confirmed POI.”

## December 2023 — Trailer 1 week

Days before Trailer 1, a low-quality Vice City clip circulated on short-form apps. After Rockstar posted the official film, a lot of that footage **matched** the marketed city tone — Stockyard-adjacent industrial, heat, density. Matching a trailer is not the same as Rockstar confirming a district wiki.

**16 hours** before the planned Trailer 1 drop, a rip with “BUY $BTC” text spread. Rockstar pulled it and posted the real trailer early. The pictures were the same film. The watermark was not. Treat the early file as a **distribution leak**, not new story.

## 2025 — office stills and “monitor” posts

A January 2025 Reddit still claimed to show Lucia on a monitor inside a Rockstar office. The post vanished. Nothing was Newswire-confirmed. Office photography can be real and still be **useless for a map**: one frame, no coords, no biome label you can defend.

Later 2025–2026 cycles produced more “insider” calendars, PC windows, and ending thumbnails. Map-6’s default is **unverified** until Take-Two or Rockstar repeats the claim in public.

## 2026 — CyberLeek-adjacent noise and Extended Look

Summer 2026 social accounts recirculated build footage under various handles. Some clips were old 2022 material with new captions. Some were not. We do not authenticate anonymous Discord files. If a clip cannot be paused next to an **official** upload, it does not move a Map-6 hub.

The honest 2026 event is **An Extended Look** (27 August): Netflix, then YouTube. That is the systems package to scrub — wanted HUD, dual-lead switching, lifestyle — not a leak archive. Recap: [live notes](/en/news/gta-6-extended-look-live-notes).
${KEYS("Leonida Keys on the Map-6 GTA 6 map", "Keys causeways are trailer geography. Leak stills of unfinished roads are not pins.")}

## How Map-6 uses a leak (almost never)

1. **Does Rockstar later show the same silhouette?** If yes, we timestamp the *official* video, not the stolen one.
2. **Is the claim a number?** km², collectible totals, mission counts stay unlabeled until Newswire or the shipped game.
3. **Would publishing it invite a takedown?** Then it does not belong on a page we want indexed in November.

If you want the map, use [/map](/en/map) with the official-only filter. If you want story without fan-fiction, use the [characters guide](/en/guides/gta-6-characters-lucia-jason). If you want a shop that sells wallet codes, that is a different product — we only list Amazon gift cards with real ASINs and a disclosure.

Leaks made the wait louder. They did not replace Rockstar’s calendar: **November 19, 2026**, consoles first.

## What a “verified leak” is allowed to mean here

Verified, on Map-6, means one of three things: (1) Rockstar later showed the same silhouette on an official upload, (2) a court filing or police report documented the theft event itself, or (3) multiple mainstream outlets described the same *event* (a dump happened, a trailer ripped) without us needing their recap of plot. It does **not** mean a Discord admin stamped a PNG.

If you are mapping, pause official YouTube, copy X/Y from the Map-6 HUD, and write the biome in your own words. If you are shopping, a leak does not change the PS5 versus Xbox SKU. If you are writing a thumbnail, do not put “confirmed ending” on a still that vanished in an hour.

The 2022 dump remains historically important and cartographically dangerous. Use it as a warning about unfinished UI, not as a street atlas for November.
`,
    cluster: "trailer",
    primaryKeyword: "gta 6 leaks",
    secondaryKeywords: [
      "gta 6 leak timeline",
      "teapotuberhacker",
      "gta 6 trailer leak",
    ],
    sources: [
      ROCKSTAR_VI,
      {
        url: "https://www.rockstargames.com/newswire/article/8978kok9385a82/grand-theft-auto-vi-watch-trailer-1-now",
        title: "Rockstar Newswire — Trailer 1",
      },
    ],
    publishedAt: "2026-09-23T11:00:00.000Z",
    createdAt: "2026-09-23T11:00:00.000Z",
    relatedLocationSlugs: ["vice-city", "leonida-keys"],
    relatedGuideSlugs: [
      "gta-6-extended-look-breakdown",
      "gta-6-map-guide",
    ],
    eventKey: "leaks-timeline-verified-2026-09",
    funnelKind: "map_deep_link",
    affiliateIntents: ["retro_gta", "wallet_topup"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Was the 2022 GTA 6 leak real?",
        answer:
          "The 2022 forum dump is widely treated as stolen work-in-progress footage. That does not make every filename or shop sign from that build true for the 2026 retail map.",
      },
      {
        question: "Does Map-6 use leaked development maps?",
        answer:
          "No. Pins that ship in the index come from official trailers, marketing stills, and community cartography we can attribute. Stolen build maps stay off the site.",
      },
      {
        question: "Did Trailer 1 leak before Rockstar posted it?",
        answer:
          "A watermarked rip circulated about 16 hours early. Rockstar released the official trailer ahead of schedule. The frames matched; the BTC overlay was not official.",
      },
    ],
    notes: "Original leak desk — no stolen assets, no Startselect copy.",
  }),
  base({
    id: "editorial-gameplay-systems-en",
    slug: "gta-6-gameplay-systems-2026",
    locale: "en",
    title: "GTA 6 Gameplay Systems — Dual Leads, Six Stars, Lifestyle",
    description:
      "What An Extended Look actually showed: Jason and Lucia switching, a six-star wanted HUD that tracks knowledge, lifestyle appearance, and denser Leonida activities. Labeled, not invented.",
    bodyMarkdown: `For years, “GTA 6 gameplay” meant pause-frames and argument threads. **An Extended Look** (27 August 2026) changed the job. Rockstar showed a long in-game PlayStation 5 package — Netflix first, YouTube later — and the useful sentences are **systems**, not plot.

This page is a systems index. Geography still lives on the [map](/en/map). Character bios stay on the [Lucia & Jason guide](/en/guides/gta-6-characters-lucia-jason). We will not turn a 26-minute look into a fake 80-hour walkthrough.
${VC("Vice City metro energy after the Extended Look", "Most Extended Look chases read as Vice City / metro — not Keys, not Mount Kalaga.")}

## Dual protagonists in practice

You can inhabit **Lucia** and **Jason**. In free roam the swap is sold as near-instant. Rockstar’s own examples include one lead driving while the other shoots from the passenger seat. During some missions the camera **locks** so you experience a beat as one person. The other can be AI support — a partner, not a second player in the story campaign.

That has map consequences. A wanted level can sit on the body you are *not* holding. The Look implied a clean/dirty split: one description in the system, one character still usable. We will not publish a cheese table. We will say: **switching is a story tool and a wanted-system tool**. Details: [wanted guide](/en/guides/gta-6-wanted-system).

## Six stars and the knowledge HUD

*GTA V* shipped a five-star ladder in the retail wanted UI people remember. The Look puts **six stars** back on screen. More interesting than the extra pip: police **knowledge**. Icons can show whether they have your face, your gun, or your car. Losing a star and losing a description are different jobs.

Treat social “full icon list” posts as **unverified** until Rockstar prints them. Map-6 will revise this section from Newswire or a shipped HUD, not from a Discord PNG.

## Lifestyle, body, and sleep

*San Andreas* made food and gym time visible on the model. The Look returns that loop for both leads. Eat, train, skip sleep — the faces and bodies change. This is simulation flavor, not a promise that a min-max spreadsheet exists on day one. If you came here from a shop blog that spent two sentences on “tired eyes” then sold a Shark Card, the systems sentence is: **lifestyle is confirmed as a visible loop; the stat sheet is not.**

## Combat, cars, and a louder street

The package showed cover that looks more athletic than *GTA V*’s peek-and-spray, slow-motion shooting beats, and cars you enter with more than one animation. Pedestrians vary more in clothes and reactions. Destruction in firefights is easier to read on camera. All of that is **direction**, not a damage-formula FAQ.

Activities in the reel included jet skis, diving, dirt bikes, gyms, clubs, and a livestreaming NPC energy. List them as **shown**, not as a completion checklist. Rockstar has not published activity counts.
${OD("Ocean Drive strip used as a systems backdrop", "Neon strips are where the Look sells density. They are not a mission select screen.")}

## Vehicles and guns — what we will not inventory

The Look is a better car commercial than Trailer 1. Customization appears to change more than paint. We still do not publish a datamined garage. Weapons appear in context — coverage, chases, a slomo beat — not as a wiki table of DPS. When Rockstar names a pack (Ultimate extras, Vintage Vice City Pack), that belongs in the [editions guide](/en/guides/gta-6-ultimate-edition-vs-standard), not here.

## How to use this page with Map-6

1. Watch the official upload. Pause on biomes, not on chat spoilers.
2. Drop the same frame on [/trailer](/en/trailer) and a hub pin.
3. If you are buying hardware for launch week, use the [setup guide](/en/guides/best-setup-gta-6-ps5-xbox). Systems footage does not change the SSD you need.
4. If you still play *GTA Online* while you wait, wallet top-ups are a separate product — disclosed Amazon cards, not a Map-6 currency shop.

Launch remains **November 19, 2026** on PS5 and Xbox Series X|S. Gameplay talk that ignores that date is entertainment. Gameplay talk that cites the Look and then invents a skill tree is fiction.

## What we still have not seen as a spec

Rockstar has not published a wanted-icon legend, a dual-lead mission list, a body-stat formula, or an activity count. Preview language from creators (map scale versus *GTA V* / *RDR2*) stays on the [map-size guide](/en/guides/gta-6-map-size) as **labeled estimates**. We will not merge a YouTuber’s stopwatch into a Newswire sentence.

If you clip the Look for TikTok, attribute the official upload and keep Map-6 pins on biomes you can re-find. If you buy a headset because the audio in the Look sounded dense, that is a setup decision — use the [hardware checklist](/en/guides/best-setup-gta-6-ps5-xbox), not a fake “Rockstar recommended” SKU.

Systems change between a summer look and a November patch. This page will date-stamp revisions when Rockstar adds a HUD explainer. Until then, the Look is the ceiling of what we will claim.
`,
    cluster: "trailer",
    primaryKeyword: "gta 6 gameplay",
    secondaryKeywords: [
      "gta 6 wanted system",
      "gta 6 lucia jason switch",
      "gta 6 extended look",
    ],
    sources: [ROCKSTAR_VI],
    publishedAt: "2026-09-23T12:00:00.000Z",
    createdAt: "2026-09-23T12:00:00.000Z",
    relatedLocationSlugs: ["vice-city", "ocean-drive"],
    relatedGuideSlugs: [
      "gta-6-extended-look-breakdown",
      "gta-6-wanted-system",
      "gta-6-characters-lucia-jason",
    ],
    eventKey: "gameplay-systems-2026-09",
    funnelKind: "mixed",
    affiliateIntents: ["headset", "controller", "console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Can you play as both Lucia and Jason in GTA 6?",
        answer:
          "Yes. Rockstar’s Extended Look shows switching between the two leads. Some missions lock a perspective; the other character can assist as AI.",
      },
      {
        question: "Does GTA 6 have a six-star wanted level?",
        answer:
          "The Extended Look shows a six-star ladder and a knowledge HUD (appearance, weapons, vehicle). Exact icon rules are not a published spec.",
      },
      {
        question: "Does lifestyle change Lucia and Jason’s appearance?",
        answer:
          "The Look shows food, exercise, and sleep affecting how they look — a San Andreas-style loop. There is no official stat spreadsheet.",
      },
    ],
    notes: "Systems recap — does not clone the Extended Look guide.",
  }),
  base({
    id: "editorial-franchise-history-en",
    slug: "gta-series-history-to-leonida",
    locale: "en",
    title: "Grand Theft Auto History — From Top-Down Chaos to Leonida",
    description:
      "How the GTA series moved from 2D cities to 3D vice, San Andreas scale, Los Santos Online, and the Leonida bet. A Map-6 history for people who arrived via a gift-card hub.",
    bodyMarkdown: `Most “history of GTA” pages exist to park a product grid under a nostalgia heading. This one exists because Map-6 readers keep asking **why Vice City again** and **why a couple instead of a trio**. The short answer: Rockstar has spent three decades widening the joke from “steal a car” to “live in a satire of an American state.” Leonida is the next state-sized punchline.
${VC("Vice City as the 2026 return of a 2002 idea", "The 2002 Vice City was a city. 2026 Vice City is a metro inside a named state.")}

## 1997–2001 — cameras in the sky

The first *Grand Theft Auto* games were top-down crime toys. Liberty City, San Andreas, and Vice City existed as names before they existed as 3D places. The loop was already there: heat, radio, and a city that punishes greed with more cops. If you only know *GTA V*, this era is why the wanted star still feels like a joke that got expensive.

## 2001–2006 — the 3D punchlines

*GTA III* put the camera behind the shoulder and made Liberty City a character. *Vice City* (2002) sold 1980s heat, pink, and radio as identity. *San Andreas* (2004) made the map a state: city, countryside, gym, and a body that remembered what you ate. That last idea is the one the 2026 Extended Look just put back on Lucia and Jason.

Map-6 still ships a [classic Vice City map](/en/map?game=vc) and a [San Andreas map](/en/map?game=sa) for that reason. Practice collectible eyes on old cities while the new one is a trailer.

## 2008–2013 — HD cities, then the endless session

*GTA IV* made Liberty City heavier and more physical. *GTA V* (2013) split the campaign across three men and then refused to end: **GTA Online** became the live product. Los Santos is still where most players spend money — Shark Cards, businesses, a wanted loop that never shipped a sixth star in the UI people remember.

That Online decade is why a gift-card shop can honestly say “you can still cause chaos in Los Santos.” It is also why Map-6 keeps a [GTA 5 map](/en/map?game=gta5) next to Leonida. The wait for November 19 is not an empty calendar if you still have Blaine County collectibles to finish.

## 2023–2026 — the Leonida bet

Trailer 1 (December 2023) reintroduced Vice City as a living metro. Trailer 2 (May 2025) widened the state: Keys, wealth walls, elevation. An Extended Look (August 2026) showed systems. The launch date is **November 19, 2026** on PS5 and Xbox Series X|S.

What changed besides hardware? **Two protagonists who are a couple**, a state with six marketed hubs, and a wanted HUD that tracks *knowledge*. What did not change: satire of American leisure, radio as world-building, and a publisher that ships consoles first.

## How to read history on a map site

History is not a spoiler of Lucia’s ending. It is a **legend key**. When we say Grassrivers has “San Andreas countryside energy,” we mean biome contrast, not a copy of Flint County. When we say Ocean Drive has “Vice City 2002 postcard energy,” we mean recognizable heat — then we timestamp the 2020s trailer, not the PS2 disk.

If you want characters, use the [Lucia & Jason guide](/en/guides/gta-6-characters-lucia-jason). If you want the new atlas, use [Leonida lore](/en/guides/leonida-lore-overview). If you want to spend wallet credit on *GTA Online* while you wait, that is a disclosed Amazon path — PlayStation, Xbox, or Steam credit — not a Map-6 Shark Card storefront.
${OD("Ocean Drive as the through-line from 2002 neon to 2026 neon", "Same postcard instinct, new trailer timestamps. Do not paste PS2 street names onto the 2026 pin list.")}

The franchise got large by making cities feel like they remember you. Leonida is the test of whether a couple and a six-star HUD can do that at state scale. Map-6 will keep the pins honest either way.

## A short reading order if you only know V

Start with why Vice City was a radio-and-heat identity in 2002, not just a beach. Then read how *San Andreas* made the countryside a second joke. Then accept that *GTA Online* trained a generation to treat Los Santos as a live service. Leonida has to beat all three memories at once: postcard, state, and session.

That is why Map-6 keeps classic maps online. You can finish a horseshoe route on San Andreas the same week you scrub Mount Kalaga on the VI trailer. The muscle memory is “look up, look under the pier, write the coord.” The street names are not transferable. Anyone selling you a “Vice City 2002 to 2026 street converter” is writing fiction.

When Rockstar names a new district after launch, we add a hub. We do not retrofit twenty years of wiki lore overnight.
`,
    cluster: "story",
    primaryKeyword: "gta history",
    secondaryKeywords: [
      "grand theft auto history",
      "vice city history",
      "gta online before gta 6",
    ],
    sources: [ROCKSTAR_VI],
    publishedAt: "2026-09-23T13:00:00.000Z",
    createdAt: "2026-09-23T13:00:00.000Z",
    relatedLocationSlugs: ["vice-city", "ocean-drive"],
    relatedGuideSlugs: [
      "leonida-lore-overview",
      "gta-6-characters-lucia-jason",
    ],
    eventKey: "franchise-history-leonida-2026-09",
    funnelKind: "mixed",
    affiliateIntents: ["retro_gta", "wallet_topup", "console_upgrade"],
    mapCtaPath: "/map?game=gta5",
    faqs: [
      {
        question: "Is GTA 6 a sequel to GTA Vice City?",
        answer:
          "It returns to Vice City as a setting inside the new state of Leonida. It is a new mainline game with new protagonists, not a remake of the 2002 story.",
      },
      {
        question: "Why does Map-6 still have GTA 5 and Vice City maps?",
        answer:
          "The classic maps are practice tools and a place to play while GTA 6 is unreleased. Collectible eyes transfer. Street names do not.",
      },
      {
        question: "What did San Andreas add that GTA 6 is bringing back?",
        answer:
          "Visible lifestyle — food, gym, fatigue — showed up again in An Extended Look for Lucia and Jason. That is a systems rhyme, not a copy of the 2004 skill stats.",
      },
    ],
    notes: "Franchise history — original, map-first, not a shop blog clone.",
  }),
  base({
    id: "editorial-online-wallets-en",
    slug: "gta-online-wallet-cards-before-vi",
    locale: "en",
    title: "GTA Online Before GTA 6 — Shark Cards via PS, Xbox & Steam Wallets",
    description:
      "Los Santos is still live until November 19. How official Shark Cards work, why Map-6 points at PlayStation, Xbox and Steam gift cards on Amazon, and what does not transfer to Leonida.",
    bodyMarkdown: `*Grand Theft Auto VI* is a console date: **November 19, 2026**. *GTA Online* is a city that already exists. If you still have businesses, a nightclub, or a friend who only plays on weekends, the honest product between now and Leonida is **Los Santos** — plus, if you choose, official **Shark Card** cash.

Map-6 is not a key shop. We do not email codes. We do list **Amazon gift-card ASINs** we have checked (PlayStation Store France, Xbox credit, Steam wallet) so you can top up the same wallets you already use, then buy Shark Cards **inside** Rockstar’s storefronts. Affiliate links are disclosed. They do not change the face value of a card.
${locationFigure("vice-city", "Leonida waits; Los Santos is playable now", "Wallet credit buys GTA Online cash today. It does not pre-purchase Leonida property.")}

## What a Shark Card actually is

A Shark Card is an official Rockstar pack of **GTA$** for *GTA Online*. Tiers have animal names (Tiger, Bull, Great White, Whale, Megalodon). The dollars land on the **character** you are logged into. They do not unlock *GTA 6*. They do not move to Lucia or Jason. They do not become a November 19 pre-order.

If a thumbnail says “GTA 6 Shark Cards,” close it. VI has not shipped an official cash pack.

## Why gift cards, not a random grey-market listing

PlayStation, Xbox, and Steam each have a wallet. Shark Cards on those platforms charge that wallet (or the card on file). Buying a **region-correct** PSN, Xbox, or Steam gift card is the boring, reversible path:

1. Buy the card on Amazon (France codes for a France PSN account — the listings say so).
2. Redeem the code on the console or in the Steam client.
3. Open *GTA V* / *GTA Online* and purchase the official Shark Card from Rockstar’s store tile.

That is the same loop gift-card retailers describe. We are not inventing a fourth store. We are refusing to pretend Map-6 sells the code.

## What we list and what we will not invent

Live Amazon.fr ASINs on this site include PlayStation Store **€20** and **€50** email codes, an Xbox **€20** digital card, and a Steam **€20** wallet listing (stock swings — if Amazon shows unavailable, use the tagged search, do not buy a screenshot). *GTA V* on PS5 is a separate card for people who do not own the game yet.

We will not invent a Megalodon PS5 ASIN that is only on the PlayStation Store. We will not tell you a Steam card “pre-orders GTA 6 PC.” PC timing is **unconfirmed**. A wallet is for games that exist.

## Online when VI arrives

Take-Two has not published a full “what happens to GTA Online on November 19” spec on the VI page. History says the old city stays online for years. History also says new Rockstar online worlds do not import your yacht. Plan as if **Los Santos cash stays in Los Santos**. Spend it on the current game because you want that game — not because you think it converts.

## Map-6’s version of “while you wait”

- Finish collectibles on the [GTA 5 map](/en/map?game=gta5).
- Scrub Leonida on the [GTA 6 map](/en/map) so launch week is navigation.
- If you buy hardware anyway, use the [setup guide](/en/guides/best-setup-gta-6-ps5-xbox).
- If you buy wallet credit, buy the **right region**, redeem it yourself, and purchase Shark Cards from Rockstar — not from a Discord seller.

The wait is long. The cash shop is optional. The map is free.

## Region locks and common mistakes

France PSN codes do not redeem on a US account. A UK Steam wallet does not sit on a Euro account. Amazon listings for the cards we link say the region in the title — read it before checkout. If the page says “compte français uniquement,” believe it.

Do not buy a “GTA 6 Shark Card” from a marketplace seller. Do not send wallet codes to a stranger who promises to apply them. Do not assume *GTA V* PS5 progress is a Leonida save. Do not spend Ultimate-edition money on Shark Cards thinking it upgrades November’s SKU.

If Amazon shows a Steam card as unavailable, that is a stock issue, not a reason to jump to an unofficial key site. Use the tagged Amazon search, or wait. Map-6 would rather show an empty card than a grey listing.

Play first; pay for cash only if the grind is the part you hate. The [GTA 5 map](/en/map?game=gta5) does not charge either way.
`,
    cluster: "setup",
    primaryKeyword: "gta shark card",
    secondaryKeywords: [
      "playstation store gift card",
      "steam wallet gta",
      "gta online before gta 6",
    ],
    sources: [ROCKSTAR_VI],
    publishedAt: "2026-09-23T14:00:00.000Z",
    createdAt: "2026-09-23T14:00:00.000Z",
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: [
      "gta-6-preorder-guide",
      "best-setup-gta-6-ps5-xbox",
    ],
    eventKey: "online-wallet-cards-2026-09",
    funnelKind: "purchase",
    affiliateIntents: ["wallet_topup", "retro_gta", "console_upgrade"],
    mapCtaPath: "/map?game=gta5",
    faqs: [
      {
        question: "Do GTA Shark Cards work in GTA 6?",
        answer:
          "No. Shark Cards add GTA$ to GTA Online in GTA V. They do not credit Lucia, Jason, or a Leonida character.",
      },
      {
        question: "Can I buy GTA 6 with a PlayStation or Steam gift card?",
        answer:
          "A PSN card can fund a PlayStation Store purchase when the GTA 6 SKU is on that account’s store. A Steam card cannot buy a console game and cannot buy a PC edition that Rockstar has not listed.",
      },
      {
        question: "Why does Map-6 link Amazon gift cards?",
        answer:
          "They are real ASINs for official wallets. Map-6 may earn a commission. We do not sell codes or grey-market GTA$. Redeem on the official store, then buy Shark Cards from Rockstar.",
      },
    ],
    notes: "Wallet / Shark path — Amazon ASINs, not a key reseller.",
  }),

  // ── French ────────────────────────────────────────────────────────
  base({
    id: "editorial-official-facts-roundup-fr",
    slug: "gta-6-official-facts-roundup",
    locale: "fr",
    title: "GTA 6 : les faits officiels — date, lieux, Lucia & Jason",
    description:
      "Ce que Rockstar a vraiment verrouillé : 19 novembre 2026, PS5 et Xbox, hubs Leonida nommés, duo de protagonistes, systèmes de l’Extended Look. Les rumeurs restent étiquetées.",
    bodyMarkdown: `La page publique de *Grand Theft Auto VI* reste le seul document qui devrait décider d’une précommande, d’une console ou d’un pin. Ce briefing est un **bureau des faits**, pas un dump de rumeurs. Si une affirmation n’est pas sur [rockstargames.com/VI](https://www.rockstargames.com/VI), un Newswire ou une remarque Take-Two, Map-6 la labelle **non confirmée**.

Le jeu sort le **19 novembre 2026** sur **PlayStation 5** et **Xbox Series X|S**. Cette date a remplacé des fenêtres plus tôt après un appel à plus de finition. Le PC n’est **pas** dans la même phrase. Traitez les posts « Steam day-one » comme du bruit. Éditions et prix : [guide précommande](/fr/guides/gta-6-preorder-guide) — Standard **79,99 $** US, Ultimate **99,99 $**, l’Ultimate étant un **palier d’extras digitaux**, pas un coffret statue.
${VC("Hub Vice City sur la carte GTA 6 Map-6", "Vice City est le métro vendu — néon, eau, coutures d’autoroute — pas tout l’État de Leonida.")}

## Géographie nommée, pas un atlas fini

Rockstar vend un État façon Floride : **Leonida**. Les destinations affichées sur affiches et trailers sont le vocabulaire Map-6 :

- **Vice City** — métro façon Miami, nuit, plages.
- **Leonida Keys** — ponts, eau, contraste « hors de la ville ».
- **Grassrivers** — zones humides, mangrove, faune.
- **Port Gellhorn** — port de travail, pas la carte postale South Beach.
- **Ambrosia** — richesse fermée ; pin [Ambrosia Island](/fr/locations/ambrosia-island).
- **Mount Kalaga** — wilderness et dénivelé, pas le plat des marais.

Les trailers insistent aussi sur **Ocean Drive**. C’est une énergie de district, pas une garantie que chaque hôtel est canon. Les reconstructions communautaires parient sur un État plus vaste que Los Santos. Rockstar n’a **pas** imprimé de km². Les estimations restent dans le [guide taille de carte](/fr/guides/gta-6-map-size). Pour des pins : [carte interactive](/fr/map).

## Histoire et protagonistes — bios officielles seulement

La campagne est vendue comme un couple Bonnie-and-Clyde : **Lucia Caminos** et **Jason Duval**. Lucia est la première protagoniste féminine non optionnelle d’un *GTA* principal. La copie Rockstar la sort du pénitencier de Leonida. Jason a grandi dans le crime et a tenté de s’en extraire aux Keys. C’est une prémisse, pas une liste de missions.

Map-6 n’invente pas les titres de dernier coup, les fins amoureuses ni la durée de peine. Fiches : [Lucia](/fr/database/characters/lucia-caminos), [Jason](/fr/database/characters/jason-duval). Guide : [personnages](/fr/guides/gta-6-characters-lucia-jason).
${OD("Ocean Drive sur Map-6", "Ocean Drive est de la géographie trailer — une bande à scruber — pas un déblocage Ultimate.")}

## Systèmes vus dans An Extended Look

Le **27 août 2026**, Rockstar a diffusé **An Extended Look** : Netflix d’abord, YouTube et le site VI six heures plus tard. Images in-game PS5, pas un dump de collectibles.

- Les deux leads sont jouables. Le switch paraît quasi instantané en monde ouvert. Certaines missions verrouillent un point de vue. L’autre peut aider en IA.
- L’échelle à **six étoiles** revient. Le HUD montre aussi ce que la police *sait* — apparence, armes, véhicule.
- La simulation de mode de vie (nourriture, sport, sommeil) change l’apparence, dans l’esprit *San Andreas*.
- Le reel montre jet-skis, salles de sport, clubs, PNJ plus denses. C’est un **échantillon**, pas une liste 100 %.

Scrub : [breakdown Extended Look](/fr/guides/gta-6-extended-look-breakdown) et [six étoiles](/fr/guides/gta-6-wanted-system).

## Ce que cette page refuse de « compléter »

Pas d’annuaire de boutiques inventé, pas de flowchart de missions leak, pas de date PC déguisée en Newswire. Si vous venez d’une boutique de cartes cadeaux qui mélange recap et Shark Cards, le travail carte reste ici, gratuit. Précommandez quand la plateforme est verrouillée. Explorez [/map](/fr/map). Lisez les briefings sous [actus](/fr/news).

## Prix, éditions, et ce qui reste vide

Prix US Take-Two : Standard **79,99 $**, Ultimate **99,99 $**. Les prix rue FR/UK bougent ; le [guide précommande](/fr/guides/gta-6-preorder-guide) suit les fiches Amazon.fr code-in-box quand elles sont en stock. Les extras Ultimate sont véhicules, armes, tenues et contenu lié à l’histoire — pas un Leonida plus grand. Les possesseurs Standard peuvent acheter un upgrade plus tard sur les stores PlayStation ou Microsoft.

Reste vide exprès : date PC, cross-saves, totaux de collectibles, SKU statue Collector, et tout « 89 % Ultimate » absent d’un filing Take-Two. Si une page revendeur contredit Rockstar, Rockstar gagne. Si un TikTok contredit la page VI, la page VI gagne.

Servez-vous de ce recap comme **index de hub**, puis sautez vers la page qui fait le travail long : taille de carte, HUD de recherche, persos ou éditions. Ne traitez pas une landing de cartes cadeaux comme source primaire.
`,
    cluster: "release",
    primaryKeyword: "gta 6 faits officiels",
    secondaryKeywords: [
      "gta 6 date de sortie",
      "carte gta 6 lieux",
      "lucia jason gta 6",
    ],
    sources: [ROCKSTAR_VI],
    publishedAt: "2026-09-23T10:00:00.000Z",
    createdAt: "2026-09-23T10:00:00.000Z",
    relatedLocationSlugs: [
      "vice-city",
      "ocean-drive",
      "leonida-keys",
      "grassrivers",
      "port-gellhorn",
      "ambrosia-island",
      "mount-kalaga",
    ],
    relatedGuideSlugs: [
      "gta-6-release-date",
      "gta-6-characters-lucia-jason",
      "gta-6-extended-look-breakdown",
    ],
    eventKey: "official-facts-roundup-2026-09",
    funnelKind: "mixed",
    affiliateIntents: ["preorder_standard", "console_upgrade", "wallet_topup"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Quand sort GTA 6 ?",
        answer:
          "Rockstar a calé le 19 novembre 2026 sur PlayStation 5 et Xbox Series X|S. Le PC n’est pas dans la même annonce.",
      },
      {
        question: "Quels lieux GTA 6 Rockstar a-t-il nommés ?",
        answer:
          "Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia et Mount Kalaga. Ocean Drive apparaît comme géographie trailer. Les frontières non dessinées restent estimées sur Map-6.",
      },
      {
        question: "Qui sont les protagonistes de GTA 6 ?",
        answer:
          "Lucia Caminos et Jason Duval. Lucia est la première lead féminine non optionnelle d’un GTA principal. Les bios officielles sont courtes ; les wikis fans ne sont pas canon.",
      },
    ],
    notes: "Recap hub FR — voix Map-6, thèmes Startselect remaniés.",
  }),
  base({
    id: "editorial-leak-timeline-fr",
    slug: "gta-6-leaks-timeline-verified",
    locale: "fr",
    title: "Fuites GTA 6 — chronologie : ce qui tient, ce que Map-6 ignore",
    description:
      "Chronologie sourcée des fuites GTA 6 depuis 2022 : dump teapotuberhacker, rip du Trailer 1, photos de bureaux, et pourquoi Map-6 refuse les cartes leak et les listes de missions inventées.",
    bodyMarkdown: `La culture leak autour de *Grand Theft Auto VI* est plus vieille que le premier trailer officiel. Le job de Map-6, c’est une géographie **revérifiable sur des plans officiels**, pas un musée de builds volés. Cette chronologie donne des **dates et des labels** à ceux qui tapent « fuites GTA 6 ».

Nous n’hébergeons pas de cartes de développement, d’intérieurs extraits ou de tableurs « 100 % collectibles » issus d’un piratage. Rockstar envoie des DMCA. Une citation qui survit à une semaine de takedown vaut plus qu’un still plus chaud.
${VC("Vice City sur Map-6 — géographie de plans officiels", "Les pins Map-6 viennent des trailers et du marketing, pas des cartes de build volées.")}

## Septembre 2022 — le dump forum

Un compte GTAForums, **teapotuberhacker**, a publié un gros lot d’images et de clips de développement — **avant** tout trailer public. La presse a ensuite traité l’événement comme un vol de work-in-progress. Ça ne rend pas chaque nom de fichier d’un re-upload vrai en 2026. Les builds vieillissent. L’UI bouge. Les quartiers changent de nom.

Règle Map-6 : si un still 2022 est la seule source d’un nom de boutique, il reste **hors** de la liste indexable. Nous ne recyclerons pas un HUD volé en « POI confirmé ».

## Décembre 2023 — semaine du Trailer 1

Quelques jours avant le Trailer 1, un clip Vice City basse qualité a circulé en short-form. Après le film officiel, une partie de ces images **collait** au ton vendu. Coller à un trailer n’est pas confirmer un wiki de district.

**16 heures** avant le drop prévu, un rip tamponné « BUY $BTC » s’est répandu. Rockstar l’a retiré et a publié le vrai trailer plus tôt. Les images étaient le même film. Le watermark non. Fichier de **distribution**, pas nouvelle intrigue.

## 2025 — photos de bureaux

Un still Reddit de janvier 2025 prétendait montrer Lucia sur un moniteur dans un bureau Rockstar. Le post a disparu. Rien n’est passé en Newswire. Une photo de bureau peut être vraie et **inutile pour une carte** : un cadre, pas de coords, pas de biome défendable.

Les cycles 2025–2026 ont produit des calendriers « insider », des fenêtres PC et des fins en miniature. Par défaut Map-6 : **non vérifié** tant que Take-Two ou Rockstar ne répète pas le claim en public.

## 2026 — bruit type CyberLeek et Extended Look

L’été 2026, des comptes ont recyclé des images de build. Certains clips étaient du 2022 recaptionné. Nous n’authentifions pas des fichiers Discord anonymes. Si on ne peut pas pauser le plan à côté d’un upload **officiel**, ça ne déplace pas un hub Map-6.

L’événement honnête de 2026, c’est **An Extended Look** (27 août) : Netflix puis YouTube. C’est le paquet systèmes à scruber. Recap : [notes live](/fr/news/gta-6-extended-look-live-notes).
${KEYS("Leonida Keys sur Map-6", "Les causeways des Keys sont de la géographie trailer. Les stills leak de routes inachevées ne sont pas des pins.")}

## Comment Map-6 utilise une fuite (presque jamais)

1. **Rockstar montre-t-il plus tard la même silhouette ?** Si oui, on horodate la vidéo *officielle*.
2. **C’est un chiffre ?** km², totaux de collectibles, comptes de missions restent non labellés.
3. **Publier ça invite un takedown ?** Alors ça n’a pas sa place sur une page qu’on veut indexer en novembre.

Carte : [/map](/fr/map) avec le filtre official-only. Persos : [guide](/fr/guides/gta-6-characters-lucia-jason). Les cartes cadeaux Amazon sont un autre produit — ASINs réels et mention légale.

Les fuites ont rendu l’attente plus bruyante. Elles n’ont pas remplacé le calendrier : **19 novembre 2026**, consoles d’abord.

## Ce qu’une « fuite vérifiée » a le droit de vouloir dire ici

Vérifié, chez Map-6, veut dire une de trois choses : (1) Rockstar a plus tard montré la même silhouette sur un upload officiel, (2) un dépôt judiciaire ou un rapport de police a documenté le vol lui-même, ou (3) plusieurs médias ont décrit le même *événement* (un dump a eu lieu, un trailer a fuité) sans qu’on ait besoin de leur recap d’intrigue. Ça ne veut **pas** dire qu’un admin Discord a tamponné un PNG.

Si vous cartographiez, pausez le YouTube officiel, copiez X/Y depuis le HUD Map-6, et notez le biome avec vos mots. Si vous achetez, une fuite ne change pas le SKU PS5 versus Xbox. Si vous faites une miniature, n’écrivez pas « fin confirmée » sur un still disparu en une heure.

Le dump 2022 reste historiquement important et cartographiquement dangereux. Traitez-le comme un avertissement sur une UI inachevée, pas comme un atlas de rues pour novembre.
`,
    cluster: "trailer",
    primaryKeyword: "fuites gta 6",
    secondaryKeywords: [
      "chronologie fuites gta 6",
      "teapotuberhacker",
      "leak trailer gta 6",
    ],
    sources: [
      ROCKSTAR_VI,
      {
        url: "https://www.rockstargames.com/newswire/article/8978kok9385a82/grand-theft-auto-vi-watch-trailer-1-now",
        title: "Rockstar Newswire — Trailer 1",
      },
    ],
    publishedAt: "2026-09-23T11:00:00.000Z",
    createdAt: "2026-09-23T11:00:00.000Z",
    relatedLocationSlugs: ["vice-city", "leonida-keys"],
    relatedGuideSlugs: [
      "gta-6-extended-look-breakdown",
      "gta-6-map-guide",
    ],
    eventKey: "leaks-timeline-verified-2026-09",
    funnelKind: "map_deep_link",
    affiliateIntents: ["retro_gta", "wallet_topup"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "La fuite GTA 6 de 2022 était-elle réelle ?",
        answer:
          "Le dump forum 2022 est largement traité comme du work-in-progress volé. Ça ne rend pas chaque enseigne de ce build vraie pour la carte retail 2026.",
      },
      {
        question: "Map-6 utilise-t-il des cartes de développement leak ?",
        answer:
          "Non. Les pins indexés viennent des trailers officiels, du marketing et de la cartographie communautaire attribuable. Les cartes de build volées restent hors site.",
      },
      {
        question: "Le Trailer 1 a-t-il fuité avant Rockstar ?",
        answer:
          "Un rip tamponné a circulé environ 16 heures trop tôt. Rockstar a avancé la mise en ligne officielle. Les plans correspondaient ; l’overlay BTC n’était pas officiel.",
      },
    ],
    notes: "Bureau leak FR — pas d’assets volés, pas de copie Startselect.",
  }),
  base({
    id: "editorial-gameplay-systems-fr",
    slug: "gta-6-gameplay-systems-2026",
    locale: "fr",
    title: "Gameplay GTA 6 — duo jouable, six étoiles, mode de vie",
    description:
      "Ce qu’An Extended Look a vraiment montré : switch Lucia/Jason, HUD de recherche à six étoiles qui tracke le savoir policier, apparence liée au mode de vie, activités plus denses. Labellé, pas inventé.",
    bodyMarkdown: `Pendant des années, « gameplay GTA 6 » voulait dire pauses d’images et threads. **An Extended Look** (27 août 2026) a changé le job. Rockstar a montré un long paquet in-game PS5 — Netflix d’abord, YouTube ensuite — et les phrases utiles sont des **systèmes**, pas l’intrigue.

Ceci est un index systèmes. La géographie reste sur la [carte](/fr/map). Les bios restent dans le [guide Lucia & Jason](/fr/guides/gta-6-characters-lucia-jason). Nous ne transformerons pas un look de 26 minutes en walkthrough de 80 heures.
${VC("Énergie métro Vice City après l’Extended Look", "La plupart des poursuites du Look se lisent Vice City / métro — pas les Keys, pas Mount Kalaga.")}

## Deux protagonistes, en pratique

On incarne **Lucia** et **Jason**. En monde ouvert, le swap est vendu comme quasi instantané. Les exemples Rockstar incluent l’un au volant, l’autre qui tire. Certaines missions **verrouillent** la caméra. L’autre peut aider en IA — un partenaire, pas un second joueur dans la campagne.

Ça a des conséquences carte. Un niveau de recherche peut rester sur le corps que vous ne tenez pas. Le Look suggère un split propre/sale. Nous ne publierons pas de table de cheese. Nous dirons : **le switch est un outil d’histoire et un outil de wanted**. Détails : [guide recherche](/fr/guides/gta-6-wanted-system).

## Six étoiles et le HUD de connaissance

*GTA V* a laissé le souvenir d’une échelle à cinq étoiles. Le Look remet **six étoiles** à l’écran. Plus intéressant que le pip en plus : la **connaissance** policière. Des icônes peuvent indiquer s’ils ont votre tête, votre arme ou votre voiture. Perdre une étoile et perdre une description sont deux jobs.

Les posts « liste complète d’icônes » restent **non vérifiés** tant que Rockstar ne les imprime pas.

## Mode de vie, corps, sommeil

*San Andreas* rendait nourriture et salle visibles sur le modèle. Le Look ramène cette boucle pour les deux leads. Manger, s’entraîner, sauter le sommeil — les visages changent. C’est de la saveur simulation, pas une promesse de spreadsheet day-one.

## Combat, voitures, rue plus bruyante

Le paquet montre une couverture plus athlétique, des beats au ralenti, des entrées de voiture plus variées. Les piétons varient davantage. La destruction se lit mieux à la caméra. Tout ça est une **direction**, pas une FAQ de formules de dégâts.

Activités dans le reel : jet-skis, plongée, dirt, salles, clubs, énergie de PNJ en live. **Montré**, pas checklist. Rockstar n’a pas publié de comptes.
${OD("Bande Ocean Drive comme décor de systèmes", "Les bandes néon sont là où le Look vend la densité. Ce n’est pas un écran de sélection de missions.")}

## Véhicules et armes — ce que nous n’inventorions pas

Le Look est une meilleure pub voiture que le Trailer 1. La customisation semble changer plus que la peinture. Toujours pas de garage dataminé ici. Les armes apparaissent en contexte. Quand Rockstar nomme un pack (extras Ultimate, Vintage Vice City Pack), ça va dans le [guide éditions](/fr/guides/gta-6-ultimate-edition-vs-standard).

## Comment s’en servir avec Map-6

1. Regardez l’upload officiel. Pausez sur les biomes.
2. Posez le même cadre sur [/trailer](/fr/trailer) et un pin de hub.
3. Le hardware de launch week : [guide setup](/fr/guides/best-setup-gta-6-ps5-xbox).
4. Si vous jouez encore à *GTA Online*, les recharges de portefeuille sont un autre produit — cartes Amazon déclarées.

La sortie reste le **19 novembre 2026** sur PS5 et Xbox Series X|S. Un gameplay qui ignore cette date est du divertissement. Un gameplay qui cite le Look puis invente un arbre de compétences est de la fiction.

## Ce que nous n’avons toujours pas comme spec

Rockstar n’a pas publié de légende d’icônes de recherche, de liste de missions dual-lead, de formule de stats corporelles ni de compte d’activités. Le langage preview des créateurs (échelle vs *GTA V* / *RDR2*) reste dans le [guide taille](/fr/guides/gta-6-map-size) comme **estimations labellisées**. Nous ne fusionnerons pas le chronomètre d’un YouTuber dans une phrase Newswire.

Si vous clipez le Look pour TikTok, attribuez l’upload officiel et gardez les pins Map-6 sur des biomes retrouvables. Si vous achetez un casque parce que l’audio du Look sonnait dense, c’est une décision setup — [checklist hardware](/fr/guides/best-setup-gta-6-ps5-xbox), pas un faux SKU « recommandé Rockstar ».

Les systèmes bougent entre un look d’été et un patch de novembre. Cette page datera les révisions quand Rockstar ajoutera un explainer de HUD. D’ici là, le Look est le plafond de ce que nous affirmons.
`,
    cluster: "trailer",
    primaryKeyword: "gameplay gta 6",
    secondaryKeywords: [
      "systeme recherche gta 6",
      "lucia jason switch",
      "extended look gta 6",
    ],
    sources: [ROCKSTAR_VI],
    publishedAt: "2026-09-23T12:00:00.000Z",
    createdAt: "2026-09-23T12:00:00.000Z",
    relatedLocationSlugs: ["vice-city", "ocean-drive"],
    relatedGuideSlugs: [
      "gta-6-extended-look-breakdown",
      "gta-6-wanted-system",
      "gta-6-characters-lucia-jason",
    ],
    eventKey: "gameplay-systems-2026-09",
    funnelKind: "mixed",
    affiliateIntents: ["headset", "controller", "console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Peut-on jouer Lucia et Jason dans GTA 6 ?",
        answer:
          "Oui. L’Extended Look montre le switch entre les deux. Certaines missions verrouillent un point de vue ; l’autre peut aider en IA.",
      },
      {
        question: "GTA 6 a-t-il six étoiles de recherche ?",
        answer:
          "Le Look montre une échelle à six étoiles et un HUD de connaissance (apparence, armes, véhicule). Les règles exactes d’icônes ne sont pas une spec publiée.",
      },
      {
        question: "Le mode de vie change-t-il l’apparence de Lucia et Jason ?",
        answer:
          "Le Look montre nourriture, sport et sommeil qui changent leur tête — une boucle façon San Andreas. Pas de feuille de stats officielle.",
      },
    ],
    notes: "Recap systèmes FR — ne clone pas le guide Extended Look.",
  }),
  base({
    id: "editorial-franchise-history-fr",
    slug: "gta-series-history-to-leonida",
    locale: "fr",
    title: "Histoire de GTA — du chaos vue de dessus jusqu’à Leonida",
    description:
      "Comment la série est passée des villes 2D au vice en 3D, à l’échelle San Andreas, à Los Santos Online, puis au pari Leonida. Une histoire Map-6 pour ceux qui arrivent via un hub de cartes cadeaux.",
    bodyMarkdown: `La plupart des pages « histoire de GTA » existent pour glisser une grille produits sous un titre nostalgie. Celle-ci existe parce que les lecteurs Map-6 demandent **pourquoi Vice City encore** et **pourquoi un couple plutôt qu’un trio**. Réponse courte : Rockstar a passé trois décennies à élargir la blague, de « vole une voiture » à « vis dans la satire d’un État américain ». Leonida est la prochaine punchline à l’échelle d’un État.
${VC("Vice City, retour 2026 d’une idée 2002", "Le Vice City 2002 était une ville. Celui de 2026 est un métro dans un État nommé.")}

## 1997–2001 — caméras dans le ciel

Les premiers *Grand Theft Auto* étaient des jouets criminels vue de dessus. Liberty City, San Andreas et Vice City existaient comme noms avant d’exister en 3D. La boucle était déjà là : recherche, radio, une ville qui punit l’avidité avec plus de flics.

## 2001–2006 — les punchlines 3D

*GTA III* a mis la caméra derrière l’épaule. *Vice City* (2002) a vendu la chaleur 80s, le rose et la radio comme identité. *San Andreas* (2004) a fait de la carte un État : ville, campagne, salle, un corps qui se souvient de ce que vous mangez. C’est cette idée que l’Extended Look 2026 remet sur Lucia et Jason.

Map-6 garde une [carte Vice City classique](/fr/map?game=vc) et une [carte San Andreas](/fr/map?game=sa) pour ça. Entraînez l’œil collectible sur les vieilles villes.

## 2008–2013 — villes HD, puis la session sans fin

*GTA IV* a rendu Liberty City plus lourde. *GTA V* (2013) a coupé la campagne en trois hommes puis a refusé de s’arrêter : **GTA Online** est devenu le produit live. Los Santos est encore là où la plupart des joueurs dépensent — Shark Cards, businesses, une boucle de recherche qui n’a pas renvoyé la sixième étoile dans l’UI dont les gens se souviennent.

C’est pour ça qu’une boutique de cartes peut dire honnêtement « vous pouvez encore semer le chaos à Los Santos ». C’est aussi pour ça que Map-6 garde une [carte GTA 5](/fr/map?game=gta5) à côté de Leonida.

## 2023–2026 — le pari Leonida

Trailer 1 (décembre 2023) : Vice City vivant. Trailer 2 (mai 2025) : Keys, murs de richesses, dénivelé. Extended Look (août 2026) : systèmes. Date : **19 novembre 2026** sur PS5 et Xbox Series X|S.

Quoi de neuf hors hardware ? **Deux protagonistes en couple**, un État à six hubs vendus, un HUD de recherche qui tracke le *savoir*. Qu’est-ce qui n’a pas changé : la satire des loisirs américains, la radio comme world-building, un éditeur qui sort d’abord sur consoles.

## Lire l’histoire sur un site carte

L’histoire n’est pas un spoiler de la fin de Lucia. C’est une **légende**. Quand on dit que Grassrivers a une « énergie campagne San Andreas », on parle de contraste de biomes, pas d’une copie de Flint County. Quand on dit qu’Ocean Drive a une « énergie carte postale Vice City 2002 », on parle de chaleur reconnaissable — puis on horodate le trailer des années 2020, pas le disque PS2.

Persos : [guide Lucia & Jason](/fr/guides/gta-6-characters-lucia-jason). Atlas : [lore Leonida](/fr/guides/leonida-lore-overview). Crédit portefeuille pour *GTA Online* : chemin Amazon déclaré — PSN, Xbox ou Steam — pas une boutique Shark Card Map-6.
${OD("Ocean Drive, fil néon de 2002 à 2026", "Même instinct carte postale, nouveaux timestamps. Ne collez pas les noms de rues PS2 sur la liste 2026.")}

La franchise a grandi en faisant des villes qui ont l’air de se souvenir de vous. Leonida testera si un couple et un HUD à six étoiles tiennent à l’échelle d’un État. Map-6 gardera les pins honnêtes dans les deux cas.

## Un ordre de lecture si vous ne connaissez que V

Commencez par pourquoi Vice City était une identité radio-et-chaleur en 2002, pas juste une plage. Puis lisez comment *San Andreas* a fait de la campagne une deuxième blague. Puis acceptez que *GTA Online* a appris à une génération à traiter Los Santos comme un live service. Leonida doit battre ces trois souvenirs à la fois : carte postale, État, session.

C’est pour ça que Map-6 garde les cartes classiques en ligne. Vous pouvez finir un fer à cheval sur San Andreas la même semaine où vous scrubez Mount Kalaga sur le trailer VI. La mémoire musculaire, c’est « lève les yeux, regarde sous le ponton, note la coord ». Les noms de rues ne se transfèrent pas. Quiconque vous vend un « convertisseur de rues Vice City 2002 → 2026 » écrit de la fiction.

Quand Rockstar nommera un nouveau district après le lancement, nous ajouterons un hub. Nous ne recollerons pas vingt ans de lore wiki du jour au lendemain.
`,
    cluster: "story",
    primaryKeyword: "histoire gta",
    secondaryKeywords: [
      "histoire grand theft auto",
      "histoire vice city",
      "gta online avant gta 6",
    ],
    sources: [ROCKSTAR_VI],
    publishedAt: "2026-09-23T13:00:00.000Z",
    createdAt: "2026-09-23T13:00:00.000Z",
    relatedLocationSlugs: ["vice-city", "ocean-drive"],
    relatedGuideSlugs: [
      "leonida-lore-overview",
      "gta-6-characters-lucia-jason",
    ],
    eventKey: "franchise-history-leonida-2026-09",
    funnelKind: "mixed",
    affiliateIntents: ["retro_gta", "wallet_topup", "console_upgrade"],
    mapCtaPath: "/map?game=gta5",
    faqs: [
      {
        question: "GTA 6 est-il une suite de GTA Vice City ?",
        answer:
          "Il revient à Vice City comme décor dans le nouvel État de Leonida. C’est un nouveau jeu principal, pas un remake de l’histoire 2002.",
      },
      {
        question: "Pourquoi Map-6 a-t-il encore des cartes GTA 5 et Vice City ?",
        answer:
          "Ce sont des outils d’entraînement et un endroit où jouer tant que GTA 6 n’est pas sorti. L’œil collectible se transfère. Les noms de rues non.",
      },
      {
        question: "Qu’est-ce que San Andreas ramène dans GTA 6 ?",
        answer:
          "Un mode de vie visible — nourriture, salle, fatigue — est réapparu dans l’Extended Look pour Lucia et Jason. C’est une rime systèmes, pas une copie des stats 2004.",
      },
    ],
    notes: "Histoire de franchise FR — carte d’abord, pas un clone boutique.",
  }),
  base({
    id: "editorial-online-wallets-fr",
    slug: "gta-online-wallet-cards-before-vi",
    locale: "fr",
    title: "GTA Online avant GTA 6 — Shark Cards via PSN, Xbox et Steam",
    description:
      "Los Santos tourne encore jusqu’au 19 novembre. Comment marchent les Shark Cards officielles, pourquoi Map-6 pointe vers des cartes PlayStation, Xbox et Steam sur Amazon, et ce qui ne passera pas à Leonida.",
    bodyMarkdown: `*Grand Theft Auto VI* est une date console : **19 novembre 2026**. *GTA Online* est une ville qui existe déjà. Si vous avez encore des businesses, une boîte de nuit ou un pote du week-end, le produit honnête d’ici Leonida, c’est **Los Santos** — et, si vous le choisissez, du cash **Shark Card** officiel.

Map-6 n’est pas une boutique de clés. Nous n’envoyons pas de codes. Nous listons des **ASINs Amazon** vérifiés (PlayStation Store France, crédit Xbox, porte-monnaie Steam) pour recharger les wallets que vous avez déjà, puis acheter les Shark Cards **chez Rockstar**. Les liens affiliés sont déclarés. Ils ne changent pas la valeur faciale.
${locationFigure("vice-city", "Leonida attend ; Los Santos se joue maintenant", "Le crédit portefeuille achète du cash GTA Online aujourd’hui. Il n’achète pas de propriété à Leonida.")}

## Ce qu’est vraiment une Shark Card

Une Shark Card est un pack officiel de **GTA$** pour *GTA Online*. Les paliers portent des noms d’animaux (Tiger, Bull, Great White, Whale, Megalodon). Les dollars arrivent sur le **perso** connecté. Ils n’ouvrent pas *GTA 6*. Ils ne migrent pas vers Lucia ou Jason. Ils ne sont pas une précommande du 19 novembre.

Si une miniature dit « Shark Cards GTA 6 », fermez-la. VI n’a pas sorti de pack cash officiel.

## Pourquoi des cartes cadeaux, pas un listing gris

PlayStation, Xbox et Steam ont un portefeuille. Les Shark Cards sur ces plateformes le débiteront (ou la carte enregistrée). Acheter une carte **à la bonne région** est le chemin ennuyeux et réversible :

1. Achetez la carte sur Amazon (codes France pour un compte PSN France — les fiches le disent).
2. Utilisez le code sur la console ou dans le client Steam.
3. Ouvrez *GTA V* / *GTA Online* et achetez la Shark Card officielle chez Rockstar.

C’est la même boucle que décrivent les revendeurs de cartes. Nous n’inventons pas une quatrième boutique. Nous refusons de faire semblant de vendre le code.

## Ce que nous listons, ce que nous n’inventons pas

Les ASINs Amazon.fr en ligne ici : PlayStation Store **20 €** et **50 €** par e-mail, Xbox **20 €** digital, Steam **20 €** (le stock bouge — si Amazon affiche indisponible, passez par la recherche taguée, n’achetez pas une capture). *GTA V* PS5 est une carte à part si vous n’avez pas le jeu.

Nous n’inventerons pas un ASIN Megalodon PS5 qui n’existe que sur le PlayStation Store. Nous ne dirons pas qu’une carte Steam « précommande GTA 6 PC ». Le timing PC est **non confirmé**. Un wallet sert aux jeux qui existent.

## Online quand VI arrivera

Take-Two n’a pas publié de spec complète « que devient GTA Online le 19 novembre » sur la page VI. L’histoire dit que la vieille ville reste en ligne des années. L’histoire dit aussi que les nouveaux mondes Rockstar n’importent pas votre yacht. Partez du principe que **le cash Los Santos reste à Los Santos**.

## La version Map-6 du « en attendant »

- Finissez des collectibles sur la [carte GTA 5](/fr/map?game=gta5).
- Scrubez Leonida sur la [carte GTA 6](/fr/map).
- Hardware : [guide setup](/fr/guides/best-setup-gta-6-ps5-xbox).
- Crédit portefeuille : **bonne région**, vous le rechargez, Shark Cards chez Rockstar — pas chez un vendeur Discord.

L’attente est longue. La boutique cash est optionnelle. La carte est gratuite.

## Verrous de région et erreurs fréquentes

Les codes PSN France ne s’utilisent pas sur un compte US. Un porte-monnaie Steam UK ne s’assoit pas sur un compte euro. Les fiches Amazon des cartes que nous lions disent la région dans le titre — lisez-la avant de payer. Si la page dit « compte français uniquement », croyez-la.

N’achetez pas une « Shark Card GTA 6 » chez un marketplace seller. N’envoyez pas de codes wallet à un inconnu qui promet de les appliquer. Ne supposez pas que la progression *GTA V* PS5 est une save Leonida. Ne dépensez pas l’argent d’une Ultimate en Shark Cards en croyant upgrader le SKU de novembre.

Si Amazon affiche une carte Steam indisponible, c’est un problème de stock, pas une raison de sauter sur un site de clés gris. Passez par la recherche Amazon taguée, ou attendez. Map-6 préfère une carte vide à un listing gris.

Jouez d’abord ; payez du cash seulement si le grind est la partie que vous détestez. La [carte GTA 5](/fr/map?game=gta5) ne facture ni l’un ni l’autre.
`,
    cluster: "setup",
    primaryKeyword: "shark card gta",
    secondaryKeywords: [
      "carte playstation store",
      "carte steam gta",
      "gta online avant gta 6",
    ],
    sources: [ROCKSTAR_VI],
    publishedAt: "2026-09-23T14:00:00.000Z",
    createdAt: "2026-09-23T14:00:00.000Z",
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: [
      "gta-6-preorder-guide",
      "best-setup-gta-6-ps5-xbox",
    ],
    eventKey: "online-wallet-cards-2026-09",
    funnelKind: "purchase",
    affiliateIntents: ["wallet_topup", "retro_gta", "console_upgrade"],
    mapCtaPath: "/map?game=gta5",
    faqs: [
      {
        question: "Les Shark Cards marchent-elles dans GTA 6 ?",
        answer:
          "Non. Elles ajoutent des GTA$ à GTA Online dans GTA V. Elles ne créditent ni Lucia, ni Jason, ni un perso Leonida.",
      },
      {
        question: "Puis-je acheter GTA 6 avec une carte PSN ou Steam ?",
        answer:
          "Une carte PSN peut financer un achat PlayStation Store quand le SKU GTA 6 est sur ce compte. Une carte Steam n’achète pas un jeu console ni une édition PC que Rockstar n’a pas listée.",
      },
      {
        question: "Pourquoi Map-6 lie-t-il des cartes Amazon ?",
        answer:
          "Ce sont de vrais ASINs pour des wallets officiels. Map-6 peut toucher une commission. Nous ne vendons ni codes ni GTA$ gris. Rechargez le store officiel, puis achetez les Shark Cards chez Rockstar.",
      },
    ],
    notes: "Chemin wallet / Shark FR — ASINs Amazon, pas un revendeur de clés.",
  }),
];
