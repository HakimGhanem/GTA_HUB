import type { Article } from "@/lib/content/schema";

const AUTHOR = "Map-6 Editorial";
const NOW = "2026-09-13T12:00:00.000Z";

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

This page started as a live desk. It is now the **post-event recap** we said we would write from **official frames only**. We still will not invent shop names, collectible totals, a PC date, or a runtime Rockstar did not print. For the how-to-watch path, see the [Extended Look guide](/en/guides/gta-6-extended-look-how-to-watch). For the pause list we used that night, see [what to pause](/en/news/gta-6-extended-look-map-watch-for).

## Key Geography Confirmed in the Extended Look

The look did what a long in-game package is supposed to do: it spent time in **places Trailers 1 and 2 already sold**, long enough to scrub. Map-6’s job is biomes and landmarks, not plot.

**Vice City metro.** Skyline cuts, freeway seams, and night neon remain the easiest match to the [Vice City hub](/en/locations/vice-city). If you paused on towers plus water, you were usually downtown-adjacent — not Keys, not Grassrivers.

**Ocean Drive energy.** Hotel façades, palm-lined asphalt, beachfront roadway. That is still the postcard strip on [Ocean Drive](/en/locations/ocean-drive). We do not promote unread neon into official business names. A readable sign earns a note; a blurry pink glow does not.

**Leonida Keys.** Causeways and small-island approaches. Use [Leonida Keys](/en/locations/leonida-keys). Do not file a mangrove shot here — that is Grassrivers work.

**Port Gellhorn.** Cranes, yards, industrial water. [Port Gellhorn](/en/locations/port-gellhorn) is the bucket for shipping infrastructure, not for gated wealth.

**Grassrivers.** Wetland and Everglades energy: water, grass, low horizon. [Grassrivers](/en/locations/grassrivers). Easy to confuse with Keys if you only remember “water.”

**Ambrosia Island.** Gated wealth, yachts, exclusive shoreline. [Ambrosia Island](/en/locations/ambrosia-island). Contrast shots against Vice City neon are the tell.

**Mount Kalaga.** Elevation, forest, river — the northern wilderness opposite the beach postcard. [Mount Kalaga](/en/locations/mount-kalaga) and the deep link [/en/map?loc=mount-kalaga](/en/map?loc=mount-kalaga).

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
];
