import type { Article } from "@/lib/content/schema";
import { locationFigure } from "@/lib/content/key-news";
import { HUB_ARTICLES } from "./editorial-hub-articles";
import { KEY_FR_ARTICLES } from "./editorial-key-fr";

const AUTHOR = "Map-6 Editorial";
const NOW = "2026-09-21T09:00:00.000Z";

/**
 * Hand-expanded Discover pieces. Merged last in the repository so they win
 * over factory drafts with the same locale+slug.
 */
export const EDITORIAL_ARTICLES: Article[] = [
  {
    id: "editorial-ultimate-edition-preorder-leads",
    slug: "gta-6-ultimate-edition-preorder-leads",
    locale: "en",
    title: "GTA 6 Ultimate Edition Leads Pre-Orders for November 19 Launch",
    description:
      "Take-Two says the $99.99 Ultimate Edition is outpacing Standard in GTA 6 pre-orders. What Zelnick signaled, what 89% reports mean, and how to choose.",
    bodyMarkdown: `Take-Two’s Strauss Zelnick told the market that Grand Theft Auto VI’s premium tier — the **$99.99 Ultimate Edition** — is outpacing the **$79.99 Standard Edition** in pre-orders. The game is still locked to **November 19, 2026** on PlayStation 5 and Xbox Series X|S. That combination (a $20 premium *and* a lead in the cart) is the story. It is not a new launch date, a PC confirmation, or a reason to treat every “89%” screenshot as a Newswire stat.

This briefing separates **what an executive said**, **what outlets inferred**, and **what you should actually buy**. For SKU-by-SKU checkout, use the [pre-order guide](/en/guides/gta-6-preorder-guide) and the [Ultimate vs Standard comparison](/en/guides/gta-6-ultimate-edition-vs-standard). Geography does not change by edition — the [interactive map](/en/map) is the same for every SKU.
${locationFigure("vice-city", "Vice City hub on the Map-6 GTA 6 map", "Same Vice City pins for Standard and Ultimate — editions do not change the atlas.")}

## What Zelnick Actually Said

Zelnick’s public remark, as reported in September 2026 coverage, is a **demand signal**: the ~$100 Ultimate Edition is selling ahead of Standard in the pre-order mix. Map-6 will not invent a longer “verbatim” paragraph than Take-Two has posted. We treat the comment as:

- **Confirmed as executive commentary** (Take-Two CEO, on the record via earnings / investor-adjacent remarks picked up by the press).
- **Not a Rockstar Newswire SKU change.** Prices and edition names still come from [rockstargames.com/VI](https://www.rockstargames.com/VI) and the store pages.
- **Not a sell-out clock.** Digital Standard does not vanish because Ultimate is popular.

The useful reading is simple. A $20 premium that still leads the mix means a slice of the audience is paying for **named extras** (vehicles, weapons, apparel, story-threaded content) rather than waiting. It does **not** mean those extras are an Online power gate. Rockstar has not said that.

If you see a social post that adds a fake quote — “buy Ultimate tonight or lose your slot,” “PC is day one,” “89% confirmed on Newswire” — discard it. Zelnick talked about **mix**, not a midnight ultimatum.

## Why 89% Ultimate Edition Is Surprising

Secondary coverage (including RockstarINTEL aggregations of the same cycle) floated a figure near **89% Ultimate**. Map-6 labels that **reported**, not Rockstar-confirmed, until a Take-Two filing or a transcript posts the same number in context (sample size, region, digital vs physical, date range).

Even as a directional number it is surprising, for three honest reasons:

1. **$20 is not trivial** on a $79.99 game. In past Rockstar launches, most players bought the full game and skipped memorabilia. Ultimate is digital extras, not a statue — but it is still a premium.
2. **Physical Ultimate is not listed.** If the mix is this Ultimate-heavy, it is almost certainly a **digital** story. Code-in-box Standard cannot explain an 89% Ultimate share by itself.
3. **Pre-order windows attract enthusiasts.** People who pre-order in September are not a random sample of November buyers. Early mix can look richer than day-one mix.

So: treat 89% as a **headline from the press**, useful as a “premium is not dead” signal, useless as a personal FOMO score. Your decision is still “are the official extras worth $20 to me?”

## Ultimate vs Standard — The Actual Difference

Official US baseline from Take-Two / Rockstar Support:

| | Standard | Ultimate |
|---|---|---|
| US price | $79.99 | $99.99 |
| Full game | Yes | Yes |
| Vintage Vice City Pack (eligible buy before Nov 20, 2026) | Yes | Yes |
| GTA+ month (eligible digital) | Yes | Yes |
| Ultimate extras (vehicles, weapons, apparel, story-threaded) | Upgrade later | Included |
| Physical | Code-in-box, no disc | Digital only (no physical Ultimate listed) |

Both editions are the **same campaign and the same map**. You are not buying a larger Leonida. You are buying a **$20 cosmetics-and-story extras bundle** that Standard owners can add later via the Ultimate Edition Upgrade on PlayStation or Microsoft stores after redeeming the base code.

What Ultimate is **not**:

- A Collector statue box (there is no announced Collector in the launch pair).
- A confirmed Online progression skip.
- A physical disc with extra missions etched on it.

If you are undecided, Standard plus a headset or SSD from the [best-setup guide](/en/guides/best-setup-gta-6-ps5-xbox) often improves every session more than an unseen vehicle pack.
${locationFigure("ocean-drive", "Ocean Drive on the Map-6 GTA 6 map", "Ocean Drive is trailer geography, not an Ultimate unlock.")}

## What This Means for Your Pre-Order Decision

Use Zelnick’s remark as **information**, not as a command.

1. **Lock platform first.** PS5 and Xbox SKUs do not cross-convert. Cross-saves are not announced. The wrong console wastes the $20 faster than the wrong edition.
2. **If you already want the extras**, Ultimate now avoids a second checkout later. The upgrade path exists; paying twice in attention is the real cost.
3. **If you do not care about extras**, Standard is the full game. The Vintage Vice City Pack window (eligible purchases before **November 20, 2026**) applies to both tiers — it is not an Ultimate exclusive.
4. **Physical buyers** are in Standard / code-in-box territory. There is no physical Ultimate to “match the 89%.”
5. **Re-check Rockstar** before you pay. Store pages move. Map-6 will not invent ASINs.

While you wait for November 19, geography is free: [Vice City](/en/locations/vice-city), [Ocean Drive](/en/locations/ocean-drive), and the [map guide](/en/guides/gta-6-map-guide). Editions do not change pins.
`,
    cluster: "preorder",
    primaryKeyword: "gta 6 ultimate edition",
    secondaryKeywords: [
      "gta 6 preorder",
      "gta 6 standard vs ultimate",
      "zelnick gta 6",
    ],
    sources: [
      {
        url: "https://www.rockstargames.com/VI",
        title: "Rockstar Games — Grand Theft Auto VI",
      },
      {
        url: "https://map-6.com/en/guides/gta-6-ultimate-edition-vs-standard",
        title: "Map-6 — Ultimate vs Standard (official comparison)",
      },
    ],
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    publishedAt: "2026-09-10T10:00:00.000Z",
    updatedAt: NOW,
    createdAt: "2026-09-10T10:00:00.000Z",
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: [
      "gta-6-ultimate-edition-vs-standard",
      "gta-6-preorder-guide",
    ],
    eventKey: "ultimate-edition-preorder-leads-2026-09",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_standard", "console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Did Strauss Zelnick confirm that 89% of GTA 6 pre-orders are Ultimate?",
        answer:
          "No. Zelnick said Ultimate is outpacing Standard. The ~89% figure comes from secondary coverage and stays labeled reported until a Take-Two filing or transcript posts the same number with a sample.",
      },
      {
        question: "Is GTA 6 Ultimate Edition worth $20 more than Standard?",
        answer:
          "Only if the official extras (vehicles, weapons, apparel, story-threaded content) are worth $20 to you. Both editions are the full game. Standard owners can buy the Ultimate Upgrade later on PlayStation or Microsoft stores.",
      },
      {
        question: "Can I buy a physical GTA 6 Ultimate Edition box?",
        answer:
          "Not as listed. Ultimate is a digital tier. Physical listings are Standard code-in-box (no disc). Do not pay a scalper for a fake Ultimate box.",
      },
    ],
    notes: "Editorial expansion for Discover — sourced, no invented quote.",
  },
  {
    id: "editorial-extended-look-live-notes",
    slug: "gta-6-extended-look-live-notes",
    locale: "en",
    title: "GTA 6 Extended Look Recap — Geography, Jason & Lucia, Open Questions",
    description:
      "Post-event recap of GTA 6 An Extended Look: confirmed Leonida geography, what we saw of Jason and Lucia, Map-6 pins we refreshed, and what Rockstar still has not said.",
    bodyMarkdown: `An Extended Look is no longer a countdown. Rockstar’s official session landed **27 August 2026 at 3 PM ET (21:00 CEST)** on Netflix first, then on YouTube and [rockstargames.com/VI](https://www.rockstargames.com/VI) **six hours later**. Netflix Tudum framed it as in-game PlayStation 5 footage — not a new leak calendar and not a 100% collectible dump.

This page started as a live desk. It is now the **post-event recap** we said we would write from **official frames only**. We still will not invent shop names, collectible totals, a PC date, or a runtime Rockstar did not print. Systems and timestamps: [Extended Look breakdown](/en/guides/gta-6-extended-look-breakdown) and the [trailer scrub](/en/trailer). Wanted HUD: [six-star explainer](/en/guides/gta-6-wanted-system). How to watch leftovers: [Extended Look guide](/en/guides/gta-6-extended-look-how-to-watch). Pause list: [what to pause](/en/news/gta-6-extended-look-map-watch-for).
${locationFigure("vice-city", "Vice City after the Extended Look, on Map-6", "Vice City metro remains the easiest Extended Look match — skyline, water, freeway seams.")}

## Key Geography Confirmed in the Extended Look

The look did what a long in-game package is supposed to do: it spent time in **places Trailers 1 and 2 already sold**, long enough to scrub. Map-6’s job is biomes and landmarks, not plot.

**Vice City metro.** Skyline cuts, freeway seams, and night neon remain the easiest match to the [Vice City hub](/en/locations/vice-city). If you paused on towers plus water, you were usually downtown-adjacent — not Keys, not Grassrivers.

**Ocean Drive energy.** Hotel façades, palm-lined asphalt, beachfront roadway. That is still the postcard strip on [Ocean Drive](/en/locations/ocean-drive). We do not promote unread neon into official business names. A readable sign earns a note; a blurry pink glow does not.

**Leonida Keys.** Causeways and small-island approaches. Use [Leonida Keys](/en/locations/leonida-keys). Do not file a mangrove shot here — that is Grassrivers work.

**Port Gellhorn.** Cranes, yards, industrial water. [Port Gellhorn](/en/locations/port-gellhorn) is the bucket for shipping infrastructure, not for gated wealth.

**Grassrivers.** Wetland and Everglades energy: water, grass, low horizon. [Grassrivers](/en/locations/grassrivers). Easy to confuse with Keys if you only remember “water.”

**Ambrosia Island.** Gated wealth, yachts, exclusive shoreline. [Ambrosia Island](/en/locations/ambrosia-island). Contrast shots against Vice City neon are the tell.

**Mount Kalaga.** Elevation, forest, river — the northern wilderness opposite the beach postcard. [Mount Kalaga](/en/locations/mount-kalaga) and the deep link [/en/map?loc=mount-kalaga](/en/map?loc=mount-kalaga).
${locationFigure("mount-kalaga", "Mount Kalaga wilderness hub on Map-6", "Mount Kalaga is elevation and forest — the opposite postcard from Ocean Drive.")}

None of that is a new continent. The Extended Look **re-confirmed the atlas** with more in-game time. Borders Rockstar has not drawn stay **estimated** on Map-6.

How to re-scrub without lying to yourself: pause on **shape first** (causeway vs skyline vs crane vs mangrove vs forested elevation), then assign a hub, then write a confidence tag. Color grade is not geography. A teal night look can sit on Ocean Drive or downtown Vice City; the roadway and the waterline tell you which. If two hubs still fit, leave the pin as a guess. That habit is why Map-6 stays usable in November instead of becoming a leak wiki.

## Jason & Lucia — What We Saw

Jason and Lucia remain the marketed pair. The Extended Look’s value for character work is **blocking and costume in real lighting**, not a biography dump.

What we treat as **on-screen / official packaging**:

- Two protagonists sharing frames in Vice City and across Leonida biomes.
- In-game presentation (PS5 capture), not a pre-vis reel dressed as gameplay.
- Tone: heat, satire, crime-as-entertainment — consistent with prior trailers.

What we **do not** write from this look:

- Full relationship timeline or ending speculation.
- Mission names that were not readable on a HUD.
- “Confirmed ability lists” built from one stunt cut.

If you are here for characters rather than pins, stay on official frames and skip invented bios. This recap stays geographic on purpose. The pair is the marketing engine; Leonida is the reason Map-6 exists. Mixing those jobs is how “Lucia confirmed in Mount Kalaga” posts get written from a single tree line.

Creators who clipped the Netflix window: keep the overlay honest. Credit the official file, credit GTADB if you show tiles, and do not burn a fake collectible total in the caption. The [creator kit](/en/creators) is built for that constraint.

## Map-6 Pins Updated From This Footage

We did **not** invent a new POI catalog. We raised confidence on hubs that matched official footage and left unlabeled interiors alone.

Practical updates for Map-6 users:

1. **Landmarks filter on** before you re-scrub. Collectibles stay sparse until Rockstar publishes types.
2. Re-open the seven hubs above in tabs. If a frame matches, copy HUD **X/Y** (see [Privacy](/en/privacy)) and keep a confidence tag: trailer-visible vs guess.
3. Prefer [interactive map](/en/map) deep links (\`?loc=\`) over Discord screenshots. A pin you can share is a pin you can find in November.
4. Creators: [creator kit](/en/creators) and [overlay](/en/overlay). Credit GTADB (CC BY 4.0) if you talk tiles.

The live table on this slug was empty before 21:00 CEST on 27 August. We do not keep a fake “waiting” row now that the look is public. The recap above **is** the log.

## What We Still Don't Know

Honesty is the product.

- **PC date** for the same window — **unconfirmed**.
- **Official runtime** printed by Rockstar — recaps that say “~30 minutes” stay press, not Newswire.
- **Complete collectible / weapon / shop catalogs** — unpublished. We will not invent them from a HUD blur.
- **Exact district borders** inside Vice City and the Keys.
- **Unlock hour** in your country — retailers differ.

Console launch remains **November 19, 2026** on PS5 and Xbox Series X|S. Re-check [rockstargames.com/VI](https://www.rockstargames.com/VI) before you spend. Next map homework: [beginner map guide](/en/guides/gta-6-map-guide) and [Leonida regions](/en/news/leonida-regions-explained-gta-6).

If another official look drops, we update this slug again from frames — we do not spawn a second “Trailer 4 leak calendar” article. Same rule as 27 August: official player timestamps only.
`,
    cluster: "trailer",
    primaryKeyword: "gta 6 extended look",
    secondaryKeywords: ["gta 6 trailer 3", "gta 6 map trailer"],
    sources: [
      {
        url: "https://www.rockstargames.com/VI",
        title: "Rockstar Games — Grand Theft Auto VI",
      },
      {
        url: "https://www.netflix.com/tudum/articles/grand-theft-auto-6-extended-first-look",
        title: "Netflix Tudum — An Extended Look",
      },
    ],
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    publishedAt: "2026-08-27T14:00:00.000Z",
    updatedAt: NOW,
    createdAt: "2026-08-27T14:00:00.000Z",
    relatedLocationSlugs: ["vice-city", "ocean-drive", "mount-kalaga"],
    relatedGuideSlugs: [
      "gta-6-extended-look-breakdown",
      "gta-6-wanted-system",
      "gta-6-extended-look-how-to-watch",
      "gta-6-map-guide",
    ],
    eventKey: "extended-look-live-notes-2026-08-27",
    funnelKind: "map_deep_link",
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Did the GTA 6 Extended Look reveal a PC release date?",
        answer:
          "No. The look was in-game PS5 footage. PC timing for the November 19, 2026 console window stays unconfirmed until Rockstar posts it.",
      },
      {
        question: "Are Map-6 collectible totals updated from the Extended Look?",
        answer:
          "No. We refresh landmark confidence when frames match existing hubs. We do not invent package, jump, or weapon totals from a single presentation.",
      },
      {
        question: "Where can I rewatch An Extended Look for free?",
        answer:
          "After the Netflix window, Rockstar’s YouTube / rockstargames.com/VI upload is the free path. Hours and mirrors: the Map-6 how-to-watch guide.",
      },
    ],
    notes: "Post-event recap replacing the pre-drop live desk.",
  },
  {
    id: "editorial-preorder-ps5-details",
    slug: "gta-6-preorder-ps5-details",
    locale: "en",
    title: "GTA 6 PS5 Pre-Order Details: Editions, Prices, Code-in-Box",
    description:
      "PS5 pre-order options for GTA 6 in 2026: $79.99 Standard vs $99.99 Ultimate, physical code-in-box vs digital, and a checklist before you pay.",
    bodyMarkdown: `If you already live on PlayStation, the **PS5 SKU is the honest cart** for Grand Theft Auto VI. Rockstar has confirmed **November 19, 2026** on PS5 and Xbox Series X|S. This page is the PlayStation pre-order briefing: editions, the $20 gap, physical vs digital, and a checklist that does not invent a sell-out clock.

Xbox shoppers should use the [full pre-order guide](/en/guides/gta-6-preorder-guide) instead of forcing a PS5 article to do both jobs. Platform lock-in is the first decision; edition is the second.
${locationFigure("vice-city", "Vice City on Map-6 — same map for every PS5 edition", "The PS5 SKU does not unlock a larger Leonida. It unlocks the same map as Xbox.")}

## PS5 Pre-Order Options in 2026

On PlayStation you are choosing among a short official list:

- **Digital Standard** on the PlayStation Store — the full game, no box, never “out of stock” in the physical sense.
- **Digital Ultimate** — same game plus the marketed extras, **$20 more**.
- **Physical Standard** at retailers — almost always a **code-in-box**, not a playable Blu-ray of GTA 6.
- **Physical Ultimate** — **not listed**. Do not buy a scalped “Ultimate box.”

There is no announced Collector statue tier in the launch pair. Leak spreadsheets of figurine height are not checkout advice.

Pre-order norms that still matter in 2026: many retailers (including Amazon) bill at dispatch, allow cancellation until then, and keep **separate listings per platform**. A PS5 code will not become an Xbox license. Confirm the PSN account on the console that will redeem the code — gift mistakes are expensive.

Eligible purchases before **November 20, 2026** include the **Vintage Vice City Pack** on both Standard and Ultimate. Eligible digital copies include a month of GTA+. Preload has been communicated as opening **November 12**. Re-verify those windows on the store page; Map-6 will not invent a new hour.

## Standard vs Ultimate — Price Breakdown

Official US prices from Take-Two:

- **Standard Edition — $79.99.** Full campaign and Online. This is the game.
- **Ultimate Edition — $99.99.** Full game plus exclusive vehicles, weapons, apparel, and story-threaded extras as marketed.

The **$20** is the only official premium Map-6 will quote. Regional storefronts add VAT; Amazon.fr-style EU listings can sit under a local RRP. Always read the live product page.

Who should pay $20:

- You already want the extras list on the store page.
- You prefer one checkout now over an upgrade later.

Who should skip it:

- You want Vice City on day one and do not care about the extras pack.
- You would rather put $20 into a DualSense, headset, or SSD ([best setup](/en/guides/best-setup-gta-6-ps5-xbox)).
- You are buying physical — Ultimate is not in that box.

Standard owners can buy the **Ultimate Edition Upgrade** later on the PlayStation Store after redeeming the base code (Rockstar Support). You are not locked out forever if you wait.

Zelnick’s remark that Ultimate is **outpacing** Standard in pre-orders is a mix signal, not a PS5 stock warning. Digital Standard does not evaporate because enthusiasts bought premium. Details: [Ultimate leads pre-orders](/en/news/gta-6-ultimate-edition-preorder-leads).

## Physical vs Digital — The Code-in-Box Situation

This is the paragraph retailers bury.

**Physical GTA 6 on PS5 is a download code in a box.** There is no day-one assumption of a full disc install. That means:

- You still need disk space and a network connection on launch week.
- The code is **region-tied**. A US box on a EU PSN account is a support ticket, not a quirk.
- The box is memorabilia plus a license, not an offline archive of the whole game.

**Digital** is the same license without cardboard. It cannot “sell out” the way a steelbook can. If your goal is playing at 00:01 on November 19, digital Standard or Ultimate on the correct PSN ID is the low-drama path.

Buy physical if you want a shelf object and you accept code-in-box rules. Do not buy physical because you think it is “more Ultimate” or “more official.” It is not.

## Pre-Order Checklist Before You Buy

1. Confirm **PS5** (not Xbox, not a rumor PC SKU).
2. Confirm the listing shows **November 19, 2026** — not a recycled 2025 date.
3. Choose **Standard vs Ultimate** from the official extras list, not from a leak weapon chart.
4. If physical: accept **code-in-box, no disc**, and match **region + PSN**.
5. Enable a purchase PIN if the console is shared.
6. Leave **SSD headroom** for the day-one patch and captures.
7. Ignore “PC day-one guaranteed” and unlabeled insider calendars.
8. Bookmark the [interactive map](/en/map) so launch week is geography, not tab chaos.
${locationFigure("ocean-drive", "Ocean Drive hub for PS5 launch-week notes", "Save Ocean Drive before checkout — launch night is a geography problem, not a SKU problem.")}

Affiliate cards on Map-6 are labeled and do not change the price you pay. Game ASINs appear when official listings exist — we never invent them.

Next reads: [pre-order price & editions](/en/guides/gta-6-preorder-price-editions), [PS5-focused pre-order guide](/en/guides/gta-6-preorder-ps5-guide), [release date](/en/news/gta-6-release-date-platforms).
`,
    cluster: "preorder",
    primaryKeyword: "gta 6 preorder ps5",
    secondaryKeywords: [
      "gta 6 ps5 edition",
      "gta 6 ultimate edition",
      "gta 6 code in box",
    ],
    sources: [
      {
        url: "https://www.rockstargames.com/VI",
        title: "Rockstar Games — Grand Theft Auto VI",
      },
      {
        url: "https://map-6.com/en/guides/gta-6-preorder-guide",
        title: "Map-6 — GTA 6 pre-order guide",
      },
    ],
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    publishedAt: "2026-09-10T10:05:00.000Z",
    updatedAt: NOW,
    createdAt: "2026-09-10T10:05:00.000Z",
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: ["gta-6-preorder-guide", "gta-6-preorder-ps5-guide"],
    eventKey: "preorder-ps5-details-2026-09",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_standard", "console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Does a physical GTA 6 PS5 box include a playable disc?",
        answer:
          "The listed physical Standard is code-in-box — a download code, not a full disc install. You still need storage and a network connection on launch week.",
      },
      {
        question: "What is the official GTA 6 price on PS5?",
        answer:
          "Take-Two’s US baseline is $79.99 Standard and $99.99 Ultimate. Local storefronts add tax. Re-check the live PlayStation or retailer page before you pay.",
      },
      {
        question: "Can I upgrade from PS5 Standard to Ultimate later?",
        answer:
          "Yes. Rockstar Support says Standard owners can buy the Ultimate Edition Upgrade on the PlayStation Store after redeeming the base code. Physical Ultimate is not listed.",
      },
    ],
    notes: "Editorial PS5 preorder briefing for Discover.",
  },
  {
    id: "editorial-trailer-frames-leonida-hubs",
    slug: "gta-6-trailer-frames-leonida-hubs",
    locale: "en",
    title: "GTA 6 Trailer Frames Mapped to Leonida Hubs",
    description:
      "Official Trailer 1 and Trailer 2 seconds mapped to Map-6’s seven Leonida hubs: what to pause on, and what we refuse to invent before launch.",
    bodyMarkdown: `Rockstar has published **two** official Grand Theft Auto VI trailers: **Trailer 1** on 4 December 2023 (1:31) and **Trailer 2** on 6 May 2025 (2:47). This briefing is the written index of the frames Map-6 already ties to regional hubs. It is not a third trailer, a collectible dump, or a replacement for the [timestamped player](/en/trailer).

The [map guide](/en/guides/gta-6-map-guide) teaches the HUD. This page answers a narrower question: **which official second belongs to which named region**, and which seconds we leave unpaired.

Timestamps stay **approximate** until we finish a frame-by-frame pass on the Rockstar uploads. Treat them as a scrub start. Rockstar does not publish chapter markers.

## The pairing rule

A beat gets a hub only when the **terrain type** is visible: towers vs causeway spans vs mangroves vs cranes vs gated waterfront vs elevation. Color grade is not geography. A teal night look can sit on Ocean Drive or downtown Vice City; the roofline and the waterline decide.

If two hubs still fit, we **do not pick**. An honest gap beats a forced pin. Story interiors (Lucia in custody, the prison-release lot) stay off the map on purpose.
${locationFigure("vice-city", "Vice City downtown hub used for Trailer 1 ~1:10", "Trailer 1’s dusk towers belong on the Vice City hub — not on Keys causeways.")}

## Trailer 1 — 4 December 2023

| ~Time | Hub | What to pause on |
|---|---|---|
| 0:06 | [Ocean Drive](/en/locations/ocean-drive) | Art deco facades, palm rows, a wide beach strip |
| 0:31 | [Grassrivers](/en/locations/grassrivers) | Alligator in strip-mall retail — wetland sprawl, not a Vice City block |
| 0:47 | [Leonida Keys](/en/locations/leonida-keys) | Low bridges, small islands — count the spans |
| 0:58 | [Port Gellhorn](/en/locations/port-gellhorn) | Container stacks and gantry cranes |
| 1:10 | [Vice City](/en/locations/vice-city) | Glass towers and freeway curves at dusk |

Ambrosia Island and Mount Kalaga do **not** get a Trailer 1 row. We will not invent one from a blur.

## Trailer 2 — 6 May 2025

| ~Time | Hub | What to pause on |
|---|---|---|
| 0:08 | [Leonida Keys](/en/locations/leonida-keys) | Stilt house, shallow water, boats as transport |
| 1:01 | [Ocean Drive](/en/locations/ocean-drive) | Neon hotels, crowds, wet asphalt — match rooflines, not pink saturation |
| 1:24 | [Vice City](/en/locations/vice-city) | Dense skyline plus elevated roadway |
| 1:42 | [Grassrivers](/en/locations/grassrivers) | Mangroves and airboats — the road stops being a grid |
| 1:58 | [Ambrosia Island](/en/locations/ambrosia-island) | Walled mansions, private moorings |
| 2:13 | [Port Gellhorn](/en/locations/port-gellhorn) | Freight waterline vs the beach frames |
| 2:29 | [Mount Kalaga](/en/locations/mount-kalaga) | Tree cover and actual elevation |

Open the matching hub, then [deep-link the map](/en/map) with \`?loc=\`. Copy HUD X/Y only after the silhouette matches. Confidence stays **trailer-visible**, not “confirmed street.”
${locationFigure("ocean-drive", "Ocean Drive hub for Trailer 2 ~1:01", "Trailer 2’s wet-asphalt hotels are Ocean Drive energy — match rooflines, not pink grade.")}

## How to use the table on a second pass

Play the official uploads from the [timestamped player](/en/trailer), keep **Landmarks** on, and walk the rows in order. When a beat matches, open the hub page, then the ?loc= deep link, then write one line: timestamp, hub, confidence. Do not batch-pin seven districts from memory after the credits.

A useful second pass is slower than the first. Pause two seconds early, look at the **horizon** before the subject, and only then decide Keys vs Grassrivers. Water alone is not a region. If chat is already naming a shop, ignore the name until a readable sign is on screen. Map-6 would rather be a day late than publish a fake street.

The [beginner map guide](/en/guides/gta-6-map-guide) is the HUD lesson. This article is only the **index of official seconds**. Use both. Editions and pre-order SKUs do not add pins — see the [pre-order guide](/en/guides/gta-6-preorder-guide) if you came here from a shopping tab.

## What this is not

- **Not a collectible list.** Trailers show biomes. Packages, jumps, and shop names wait for evidence.
- **Not Trailer 3.** Anything sold as a third cinematic stays unconfirmed until Rockstar Newswire posts it. See the [Trailer 3 guide](/en/guides/gta-6-trailer-3-what-we-know) for that watch.
- **Not district borders.** Vice City downtown vs Ocean Drive is a visual contrast, not a shapefile Rockstar published.
- **Not a leak wiki.** Community GTADB pins can sit next to these hubs. They are working hypotheses.

If you only have time for one pass: play Trailer 2 from the [official player](/en/trailer), keep Landmarks on, and walk the seven rows above. That is the entire pre-launch atlas Rockstar has actually shown.

Console launch remains **19 November 2026** on PlayStation 5 and Xbox Series X|S. Re-check [rockstargames.com/VI](https://www.rockstargames.com/VI) before you spend. Editions do not change pins.
`,
    cluster: "map",
    primaryKeyword: "gta 6 trailer map locations",
    secondaryKeywords: [
      "gta 6 trailer timestamps",
      "leonida regions trailer",
      "gta vi map hubs",
    ],
    sources: [
      {
        url: "https://www.rockstargames.com/VI",
        title: "Rockstar Games — Grand Theft Auto VI",
      },
      {
        url: "https://map-6.com/en/trailer",
        title: "Map-6 — Timestamped trailer analysis",
      },
    ],
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    publishedAt: "2026-09-15T16:00:00.000Z",
    updatedAt: NOW,
    createdAt: "2026-09-15T16:00:00.000Z",
    relatedLocationSlugs: [
      "vice-city",
      "ocean-drive",
      "grassrivers",
      "leonida-keys",
      "port-gellhorn",
      "ambrosia-island",
      "mount-kalaga",
    ],
    relatedGuideSlugs: ["gta-6-map-guide"],
    eventKey: "trailer-frames-leonida-hubs-2026-09",
    funnelKind: "map_deep_link",
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Are these GTA 6 trailer timestamps official?",
        answer:
          "No. They are Map-6 scrub notes, labeled approximate until each beat is checked against the Rockstar YouTube uploads. Rockstar does not publish chapter markers.",
      },
      {
        question: "Why are Ambrosia Island and Mount Kalaga missing from Trailer 1?",
        answer:
          "Those biomes are not clearly placeable in Trailer 1. Trailer 2 supplies the gated-wealth (~1:58) and elevation (~2:29) frames. We do not back-fill Trailer 1 with guesses.",
      },
      {
        question: "Does this replace the Map-6 trailer page?",
        answer:
          "No. The /trailer page is the official-player scrub. This article is the written hub index for search and notes. Use both: pause there, read the pairing here.",
      },
    ],
    notes: "Indexable evidence table — does not clone the map guide or /trailer.",
  },
  {
    id: "editorial-trailer-frames-leonida-hubs-fr",
    slug: "gta-6-trailer-frames-leonida-hubs",
    locale: "fr",
    title: "Plans trailer GTA 6 associés aux hubs Leonida",
    description:
      "Secondes officielles des Trailers 1 et 2 associées aux sept hubs Leonida de Map-6 : quoi mettre en pause, et ce que nous refusons d’inventer.",
    bodyMarkdown: `Rockstar a publié **deux** trailers officiels de Grand Theft Auto VI : le **Trailer 1** le 4 décembre 2023 (1:31) et le **Trailer 2** le 6 mai 2025 (2:47). Ce briefing est l’index écrit des plans que Map-6 relie déjà aux hubs régionaux. Ce n’est pas un troisième trailer, ni un dump de collectibles, ni un remplacement du [lecteur horodaté](/fr/trailer).

Le [guide carte](/fr/guides/gta-6-map-guide) explique le HUD. Cette page répond à une question plus étroite : **quelle seconde officielle appartient à quelle région nommée**, et lesquelles nous laissons sans pin.

Les timecodes restent **approximatifs** jusqu’à la passe image par image sur les uploads Rockstar. Point de départ de scrub. Rockstar ne publie pas de chapitres.

## La règle d’association

Un passage reçoit un hub seulement si le **type de terrain** est visible : tours vs travées de causeway vs mangroves vs grues vs front de mer fermé vs dénivelé. L’étalonnage n’est pas de la géographie. Un bleu-nuit peut être Ocean Drive ou le centre de Vice City ; la ligne de toit et la ligne d’eau tranchent.

Si deux hubs restent possibles, nous **ne choisissons pas**. Un trou assumé vaut mieux qu’un pin forcé. Les intérieurs de récit (Lucia en détention, le parking de sortie de prison) restent hors carte.
${locationFigure("vice-city", "Hub Vice City pour le Trailer 1 vers 1:10", "Les tours du crépuscule du Trailer 1 vont sur Vice City — pas sur les causeways des Keys.")}

## Trailer 1 — 4 décembre 2023

| ~Temps | Hub | Quoi figer |
|---|---|---|
| 0:06 | [Ocean Drive](/fr/locations/ocean-drive) | Façades art déco, palmiers, large bande de plage |
| 0:31 | [Grassrivers](/fr/locations/grassrivers) | Alligator dans un commerce de bord de route — étalement de marais, pas un bloc de Vice City |
| 0:47 | [Leonida Keys](/fr/locations/leonida-keys) | Ponts bas, petites îles — comptez les travées |
| 0:58 | [Port Gellhorn](/fr/locations/port-gellhorn) | Piles de conteneurs et portiques |
| 1:10 | [Vice City](/fr/locations/vice-city) | Tours de verre et courbes d’autoroute au crépuscule |

Ambrosia Island et Mount Kalaga n’ont **pas** de ligne Trailer 1. Nous n’en inventons pas à partir d’un flou.

## Trailer 2 — 6 mai 2025

| ~Temps | Hub | Quoi figer |
|---|---|---|
| 0:08 | [Leonida Keys](/fr/locations/leonida-keys) | Maison sur pilotis, eau peu profonde, bateaux |
| 1:01 | [Ocean Drive](/fr/locations/ocean-drive) | Hôtels néon, foule, asphalte mouillé — les toits, pas la saturation rose |
| 1:24 | [Vice City](/fr/locations/vice-city) | Skyline dense et voie surélevée |
| 1:42 | [Grassrivers](/fr/locations/grassrivers) | Mangroves et hydroglisseurs — la route cesse d’être une grille |
| 1:58 | [Ambrosia Island](/fr/locations/ambrosia-island) | Villas murées, mouillages privés |
| 2:13 | [Port Gellhorn](/fr/locations/port-gellhorn) | Ligne d’eau fret vs plans de plage |
| 2:29 | [Mount Kalaga](/fr/locations/mount-kalaga) | Forêt et vrai dénivelé |

Ouvrez le hub, puis le [deep link carte](/fr/map) avec \`?loc=\`. Ne copiez le X/Y du HUD qu’après la correspondance de silhouette. La confiance reste **visible au trailer**, pas « rue confirmée ».
${locationFigure("ocean-drive", "Hub Ocean Drive pour le Trailer 2 vers 1:01", "Les hôtels sur asphalte mouillé du Trailer 2 sont Ocean Drive — les toits, pas le rose.")}

## Comment relire le tableau

Lancez les uploads officiels depuis le [lecteur horodaté](/fr/trailer), filtrez **Landmarks**, et descendez les lignes dans l’ordre. Quand un plan colle, ouvrez la page hub, puis le deep link ?loc=, puis une ligne : timecode, hub, confiance. Ne posez pas sept pins de mémoire après le générique.

La deuxième passe est plus lente. Pausez deux secondes trop tôt, regardez **l’horizon** avant le sujet, puis tranchez Keys vs Grassrivers. L’eau seule n’est pas une région. Si le chat nomme déjà une boutique, ignorez le nom tant qu’une enseigne n’est pas lisible. Map-6 préfère un jour de retard à une fausse rue.

Le [guide carte](/fr/guides/gta-6-map-guide) est la leçon HUD. Cet article n’est que **l’index des secondes officielles**. Les éditions n’ajoutent aucun pin — voir le [guide précommande](/fr/guides/gta-6-preorder-guide) si vous venez d’un onglet shopping.

## Ce que ce n’est pas

- **Pas une liste de collectibles.** Les trailers montrent des biomes. Paquets, jumps et noms de boutiques attendent des preuves.
- **Pas le Trailer 3.** Tout ce qui se vend comme troisième cinématique reste non confirmé tant que Rockstar Newswire ne le publie pas. Voir le [guide Trailer 3](/fr/guides/gta-6-trailer-3-what-we-know).
- **Pas des frontières de quartiers.** Vice City centre vs Ocean Drive est un contraste visuel, pas un shapefile Rockstar.
- **Pas un wiki de leaks.** Les pins GTADB peuvent voisinier ces hubs. Ce sont des hypothèses de travail.

Si vous n’avez le temps que d’une passe : lancez le Trailer 2 depuis le [lecteur officiel](/fr/trailer), filtrez Landmarks, et descendez les sept lignes. C’est tout l’atlas pré-lancement que Rockstar a réellement montré.

Le lancement console reste le **19 novembre 2026** sur PlayStation 5 et Xbox Series X|S. Revérifiez [rockstargames.com/VI](https://www.rockstargames.com/VI) avant de payer. L’édition n’ajoute aucun pin.
`,
    cluster: "map",
    primaryKeyword: "carte gta 6 trailer lieux",
    secondaryKeywords: [
      "gta 6 trailer timecodes",
      "régions leonida trailer",
      "hubs carte gta vi",
    ],
    sources: [
      {
        url: "https://www.rockstargames.com/VI",
        title: "Rockstar Games — Grand Theft Auto VI",
      },
      {
        url: "https://map-6.com/fr/trailer",
        title: "Map-6 — Analyse trailer horodatée",
      },
    ],
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    publishedAt: "2026-09-15T16:00:00.000Z",
    updatedAt: NOW,
    createdAt: "2026-09-15T16:00:00.000Z",
    relatedLocationSlugs: [
      "vice-city",
      "ocean-drive",
      "grassrivers",
      "leonida-keys",
      "port-gellhorn",
      "ambrosia-island",
      "mount-kalaga",
    ],
    relatedGuideSlugs: ["gta-6-map-guide"],
    eventKey: "trailer-frames-leonida-hubs-2026-09",
    funnelKind: "map_deep_link",
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Ces timecodes trailer GTA 6 sont-ils officiels ?",
        answer:
          "Non. Ce sont des notes de scrub Map-6, étiquetées approximatives jusqu’à vérification sur les uploads YouTube Rockstar. Rockstar ne publie pas de chapitres.",
      },
      {
        question: "Pourquoi Ambrosia et Mount Kalaga manquent-ils au Trailer 1 ?",
        answer:
          "Ces biomes ne sont pas clairement plaçables dans le Trailer 1. Le Trailer 2 fournit les plans richesse fermée (~1:58) et dénivelé (~2:29). Nous ne complétons pas le Trailer 1 par des conjectures.",
      },
      {
        question: "Cet article remplace-t-il la page trailer Map-6 ?",
        answer:
          "Non. /trailer est le scrub sur le lecteur officiel. Cet article est l’index écrit des hubs pour la recherche et les notes. Les deux se complètent.",
      },
    ],
    notes: "Table de preuves indexable — ne clone ni le guide carte ni /trailer.",
  },
  ...HUB_ARTICLES,
  ...KEY_FR_ARTICLES,
];
