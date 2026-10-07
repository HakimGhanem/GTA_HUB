import type { Article } from "@/lib/content/schema";
import { locationFigure } from "@/lib/content/key-news";

const AUTHOR = "Map-6 Editorial";
const NOW = "2026-10-07T12:00:00.000Z";

const VC = (alt: string, cap: string) => locationFigure("vice-city", alt, cap);
const OD = (alt: string, cap: string) => locationFigure("ocean-drive", alt, cap);
const KEYS = (alt: string, cap: string) =>
  locationFigure("leonida-keys", alt, cap);

const ROCKSTAR_VI = {
  url: "https://www.rockstargames.com/VI",
  title: "Rockstar Games — Grand Theft Auto VI",
};
const TTWO_PREORDER = {
  url: "https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi",
  title: "Take-Two — Rockstar announces GTA VI pre-orders",
};
const TTWO_Q1 = {
  url: "https://ir.take2games.com/node/32401/pdf",
  title: "Take-Two — Fiscal Q1 2027 results (7 Aug 2026)",
};
const ROCKSTAR_SUPPORT = {
  url: "https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions",
  title: "Rockstar Support — Platforms, editions, and versions",
};
const PS_BLOG = {
  url: "https://blog.playstation.com/2026/09/03/first-look-at-the-grand-theft-auto-vi-limited-edition-dualsense-wireless-controllers/",
  title: "PlayStation Blog — Limited-edition DualSense (3 Sep 2026)",
};

function desk(
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

export const DESK_2026_10_ARTICLES: Article[] = [
  desk({
    id: "desk-2026-10-launch-calendar-en",
    slug: "gta-6-six-weeks-out-launch-calendar",
    locale: "en",
    title: "GTA 6 Launch Calendar: Six Weeks Out",
    description:
      "Six weeks to November 19: preload on the 12th, code-in-box the same week, two consoles only. The calendar Rockstar printed — and the blanks it left.",
    bodyMarkdown: `Grand Theft Auto VI is **43 days** from a Wednesday launch: **19 November 2026**, PlayStation 5 and Xbox Series X|S. That is not a rumor window. It is the sentence on [rockstargames.com/VI](https://www.rockstargames.com/VI) and in Take-Two’s own lineup table.

If you are still waiting for a Steam tile or a “Trailer 3 next Friday” graphic, you are planning against a calendar Rockstar has not printed. The useful sheet is short: pre-orders already open, a preload Monday, a code-in-box the same week, and a launch that does not mention PC.
${VC("Vice City hub on the Map-6 GTA 6 map", "Vice City is the marketed metro — the calendar does not add a third platform.")}

## The dates that are actually on paper

Take-Two’s 25 June 2026 pre-order release is still the cleanest public document after the VI page.

| When | What is official | What it is not |
|---|---|---|
| 25 June 2026, midnight local | Pre-orders open | Not a PC storefront |
| 12 November 2026, local midnight | Digital preload | Not “you can play early” |
| 12 November 2026 | Physical **code-in-box** on sale so you can redeem and preload | Not a disc in the tray |
| 19 November 2026 | Launch on PS5 and Xbox Series X|S | Not Steam, not Switch |
| Before 20 November 2026 | Vintage Vice City Pack on eligible buys | Not an Ultimate exclusive |

The physical SKU is a download code in a box. Rockstar said so in that same release. If a shelf sticker implies a Blu-ray, the sticker is wrong. Codes are meant to be usable **as soon as you have the box** so preload can start on the 12th — useful if your internet is a bottleneck, useless if you expected to lend a disc to a friend.

## What six weeks is actually for

This is not a content drought. It is a decision window.

1. **Lock a platform.** Cross-saves are not announced. A PS5 cart does not become an Xbox install. The [pre-order guide](/en/guides/gta-6-preorder-guide) is the checkout list; this page is the clock.
2. **Decide Standard vs Ultimate now, not in the queue.** The $20 gap is extras, not a bigger state. Geography on the [interactive map](/en/map) does not change with the SKU.
3. **Plan storage and a display** if your current box is tight. The [setup guide](/en/guides/best-setup-gta-6-ps5-xbox) is the hardware page; do not wait for a fake “120 Hz confirmed” leak.
4. **Ignore a third trailer date** until Newswire posts one. Extended Look already ran on 27 August. A community calendar is not a Rockstar calendar.

Preload week will punish anyone who still has 40 GB free and a 20 Mbps line. That is a household problem, not a scoop.

## The blanks we will not fill in for you

PC remains absent from Take-Two’s 7 August 2026 future-lineup table — the same table that prints November 19 next to PS5 and Xbox. “GTA 5 on PC came later, so VI will too” is history, not a booking. We keep that argument on the dedicated PC piece.

No official collectible count. No km². No cross-gen. No day-one GTA Online for VI — Online as you know it is still **Los Santos until this campaign ends**. If you are topping up Shark Cards, you are funding the current session, not Leonida.

Use the [release-date guide](/en/guides/gta-6-release-date) when you need the delay history. Use [locations](/en/locations) when you want named hubs instead of a countdown graphic. Six weeks is enough time to learn Vice City’s seams and still short enough that a wrong console cannot be laughed off.
${OD("Ocean Drive on the Map-6 GTA 6 map", "Ocean Drive is trailer geography you can learn now — editions do not unlock it earlier.")}

The honest six-week briefing is boring on purpose. The date is fixed. The platforms are two. The preload Monday is the only new mechanical date left on the public calendar. Everything else is merch, mix comments from a CEO, and people selling you urgency you do not need.
`,
    cluster: "release",
    primaryKeyword: "gta 6 release date",
    secondaryKeywords: ["gta 6 preload", "gta 6 launch calendar", "gta 6 platforms"],
    sources: [ROCKSTAR_VI, TTWO_PREORDER, ROCKSTAR_SUPPORT],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city", "ocean-drive"],
    relatedGuideSlugs: ["gta-6-release-date", "gta-6-preorder-guide"],
    eventKey: "story-launch-calendar",
    funnelKind: "mixed",
    affiliateIntents: ["preorder_standard", "console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "When does GTA 6 come out?",
        answer:
          "November 19, 2026 on PlayStation 5 and Xbox Series X|S. Rockstar has not announced a PC date in the same materials.",
      },
      {
        question: "When can I preload GTA 6?",
        answer:
          "Digital pre-orders can preload from November 12, 2026 at local midnight. Physical copies are code-in-box; redeem the code to join that preload window.",
      },
      {
        question: "Is there a GTA 6 disc?",
        answer:
          "The announced physical version is a download code in a box, not a playable disc. Take-Two said so when pre-orders opened.",
      },
    ],
    notes: "Desk — six weeks out, Oct 2026.",
  }),

  desk({
    id: "desk-2026-10-ttwo-en",
    slug: "ttwo-q1-fy27-gta-6-preorders-zelnick",
    locale: "en",
    title: "Take-Two: GTA 6 Pre-Orders Skew Ultimate",
    description:
      "Zelnick called GTA 6 pre-orders unprecedented and said the mix skews to the $99.99 Ultimate Edition. He gave no 89% figure. What the filing actually said.",
    bodyMarkdown: `Strauss Zelnick will talk about Grand Theft Auto VI pre-orders. He will not give you a unit count. On **7 August 2026** Take-Two reported fiscal Q1 2027 (quarter ended **30 June 2026**): **$1.39 billion** in net bookings, a touch above guidance, and a reiterated full-year outlook of **$8.0 to $8.2 billion**. The launch date in that packet is the one you already know — **19 November 2026**, PS5 and Xbox.

Three days later, on CNBC’s Squawk Box, he added the only mix comment that is safe to repeat: pre-orders are **“skewing more to the premium edition”**, and that “might be a reflection of the fact that the most avid consumers are the ones who are pre-ordering now.” That is a CEO describing **who showed up in June and July**, not a Newswire pie chart.
${VC("Vice City on the Map-6 GTA 6 map", "The $20 Ultimate premium does not buy a larger Vice City.")}

## What the filing said — and stopped saying

The earnings release is public on Take-Two IR. It does **not** print a GTA VI attach rate, a digital-versus-physical split, or an Ultimate percentage. Recurrent consumer spending still dominated the quarter (Take-Two said 84% of net bookings), with NBA 2K and the existing Grand Theft Auto series among the largest contributors — meaning **V and Online**, not VI, paid the bills in Q1.

Zelnick’s prepared remarks called the pre-order start “exceptional.” On the call he went further: nobody at Take-Two had seen demand like it, in this company or in the industry, and then he immediately caveated the thing every aggregator skipped — **pre-orders can be cancelled**. He also refused to say whether demand is pulled forward from November. That hedge is the story. A September screenshot of “89% Ultimate” is not.

| Claim you will see | What exists | Map-6 label |
|---|---|---|
| Pre-orders are “unprecedented” | CEO, earnings + CNBC | Executive commentary |
| Mix skews to Ultimate (~$100) | CEO, CNBC 10 Aug 2026 | Directional, no sample |
| “89%” or “90%” Ultimate | Press / telemetry blogs | **Not** in the filing |
| $8.0–$8.2B FY27 net bookings | Company outlook, 7 Aug | Guidance, not VI units |
| Day-one PC in the outlook | — | Absent from the lineup table |

If a social card adds a fake Zelnick quote — “buy Ultimate tonight or lose your slot” — discard it. He talked about **mix among early buyers**, then reminded everyone that a pre-order is not a sale.

## What the skew is worth to you

A $20 premium that leads among **people who pre-order in summer** is not surprising. Those buyers want the named extras: vehicles, weapons, apparel, story-threaded activities. Rockstar has not said those extras are an Online power gate. The [Ultimate vs Standard guide](/en/guides/gta-6-ultimate-edition-vs-standard) is the SKU table; this page is the earnings caption.

The useful personal test is unchanged:

1. Do you want the extras on day one? Ultimate avoids a second checkout. The upgrade path exists after launch.
2. Do you not care? Standard is the full campaign and the same [map](/en/map). The Vintage Vice City Pack window (eligible buys before **20 November 2026**) applies to both tiers.
3. Are you buying physical? You are in Standard / code-in-box territory. There is no physical Ultimate on the public list.

Take-Two’s own pricing defence on the call was value language: $80 as a “phenomenal value” for some players, a modest step-up for others. That is marketing with a 10-K accent. It is still more honest than a telemetry blog dressing a summer cohort as the November mix.

## Why Map-6 will not recycle the 89% headline

We already published a September desk piece when the “89%” figure started circulating through RockstarINTEL-style aggregators. It remains **reported, not filed**. Repeating it as if Zelnick said it on CNBC is how a map site becomes another Google News clone. The [pre-order guide](/en/guides/gta-6-preorder-guide) will change when store pages change. This article changes when Take-Two prints a number. Until then the earnings story is: guidance held, pre-orders are loud, Ultimate is popular **among the people already in the cart**, and November will look different because casual money has not arrived yet.
${OD("Ocean Drive on the Map-6 GTA 6 map", "Trailer geography is free. The Ultimate extras are not a bigger atlas.")}

Read the PDF yourself. It is shorter than the recaps.
`,
    cluster: "preorder",
    primaryKeyword: "gta 6 ultimate edition",
    secondaryKeywords: ["zelnick gta 6", "take-two gta 6", "gta 6 preorder"],
    sources: [TTWO_Q1, ROCKSTAR_VI, TTWO_PREORDER],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: [
      "gta-6-ultimate-edition-vs-standard",
      "gta-6-preorder-guide",
    ],
    eventKey: "story-ttwo-preorder-mix",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_standard", "preorder_collectors"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Did Take-Two say 89% of GTA 6 pre-orders are Ultimate?",
        answer:
          "No. Zelnick said the mix is skewing to the premium edition among early, avid buyers. The 89% and 90% figures are press inferences, not a number in the Q1 FY27 filing.",
      },
      {
        question: "What did Take-Two report for Q1 FY27?",
        answer:
          "$1.39 billion in net bookings for the quarter ended June 30, 2026, and a reiterated fiscal 2027 net-bookings outlook of $8.0 to $8.2 billion.",
      },
      {
        question: "Should I buy Ultimate because of the skew?",
        answer:
          "Only if you want the official extras. The skew describes who pre-ordered in summer, not what a November buyer should do. Standard is the full game and the same map.",
      },
    ],
    notes: "Desk — TTWO Q1 FY27 / CNBC skew.",
  }),

  desk({
    id: "desk-2026-10-collection-en",
    slug: "gta-6-vice-city-collection-399-no-game",
    locale: "en",
    title: "GTA 6 $400 Box Includes No Game",
    description:
      "Rockstar’s Goodtime State Vice City Collection is $399.99 of merch: 11 items, ships November 19, game sold separately. What is in the box, and what is not.",
    bodyMarkdown: `Rockstar put a collector’s box on the Rockstar Store on **24 September 2026** and named it like a television tie-in: **Grand Theft Auto VI: The Goodtime State – Vice City Collection**. The US price is **$399.99**. The UK listing that week was **£349.99**. A German store session the next day showed **€399.99**. The sentence that matters is on the product page in Rockstar’s own English: **the game is sold separately**.

This is not a Collector’s Edition of the campaign. It is a limited merch crate inspired by **Macca the Gator**, an in-world show, shipping **from 19 November 2026** — the same day the game launches, not the day a courier has to ring your bell.
${VC("Vice City hub on the Map-6 GTA 6 map", "The souvenir poster is merch. The playable city is on the map, not in the crate.")}

## What $400 actually buys

Coverage that opened the listing (Forbes, Kotaku, the store FAQ) agrees on an **11-item** set. Map-6 will not invent a twelfth.

- Macca the Gator figure (with a stash-style base in several write-ups)
- Oakley Frogskins sunglasses
- New Era 9FORTY A-Frame snapback
- Leonida Keys crossbody bag
- Macca magnetic mirror
- Chunkee the Manatee shot glass
- Vice City swizzle spoon
- Razor-blade keychain
- Enamel pin set in a tin
- Sticker pack
- Double-sided souvenir poster with a **map of Leonida** on the reverse

That last item is why this page exists on a map site. It is a **poster**, sold as souvenir paper, not a data source. We will not trace our [interactive map](/en/map) from a merch print. Pins on Map-6 still come from official trailer frames and named hubs — see the [map guide](/en/guides/gta-6-map-guide).

| | Vice City Collection | Ultimate Edition | Standard |
|---|---|---|---|
| Pays for the game | No | Yes | Yes |
| Typical US price | $399.99 merch | $99.99 game | $79.99 game |
| Where | Rockstar Store | Console / Rockstar digital | Console, retail code-in-box |
| Ships / launches | From 19 Nov 2026 | 19 Nov 2026 | 19 Nov 2026 |
| Limit | One per person, 18+, limited qty | — | — |

The Newswire headline was the supply scare: **while supplies last**. The store FAQ called quantities limited and offered a wishlist if it sells out. UK coverage said the listing went after two days. Treat stock claims as **store-state**, not a remaining-unit ticker Rockstar has not published.

## Who this is for

If you already have a platform locked and you want physical junk from Leonida, this is the official crate. Shipping is extra; several write-ups noted it is not eligible for free shipping. Asia, Latin America, and Australia were “stay tuned” on early listings — confirm the country list on the store before you build a story around a grey-import.

If you do **not** own the game, **$400 does not get you into Vice City**. Buy the [Standard or Ultimate SKU](/en/guides/gta-6-preorder-guide) first. The collection does not include a download code. It does not include Ultimate extras. It does not move a pin.

Rockstar has done expensive boxes before (GTA V, Red Dead 2). Those usually argued they were editions **of the game**. This one argues it is a TV-show gift shop. That is a taste question, not a map question. The razor-blade keychain will get screenshots. The playable state will not care.
${KEYS("Leonida Keys on the Map-6 GTA 6 map", "The crossbody bag is branded Keys. The causeways are still a trailer read.")}

One per person, Rockstar login, adults only. If a reseller listing promises a “Collector’s Edition with the game inside,” it is mislabelled. Point at this page, then at the VI storefront.
`,
    cluster: "preorder",
    primaryKeyword: "gta 6 collector edition",
    secondaryKeywords: [
      "vice city collection",
      "gta 6 goodtime state",
      "gta 6 merch",
    ],
    sources: [
      ROCKSTAR_VI,
      {
        url: "https://www.rockstargames.com/newswire",
        title: "Rockstar Newswire — Vice City Collection pre-order",
      },
      {
        url: "https://kotaku.com/rockstar-reveals-400-special-edition-of-grand-theft-auto-6-2000736975",
        title: "Kotaku — $400 box, game sold separately",
      },
    ],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city", "leonida-keys"],
    relatedGuideSlugs: ["gta-6-preorder-guide", "gta-6-map-guide"],
    eventKey: "story-vice-city-collection",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_collectors", "preorder_standard"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Does the GTA 6 Vice City Collection include the game?",
        answer:
          "No. Rockstar’s listing says Grand Theft Auto VI is sold separately. You are buying 11 merchandise items.",
      },
      {
        question: "How much is the Goodtime State Vice City Collection?",
        answer:
          "The US Rockstar Store listed $399.99. UK coverage read £349.99. A German session showed €399.99. Shipping is extra.",
      },
      {
        question: "When does the collector box ship?",
        answer:
          "Rockstar says it is available to ship from November 19, 2026 — launch day — not that it arrives that afternoon.",
      },
    ],
    notes: "Desk — one collector URL for the family.",
  }),

  desk({
    id: "desk-2026-10-pc-en",
    slug: "gta-6-pc-still-unannounced-october-2026",
    locale: "en",
    title: "GTA 6 PC Release Is Still Not a Thing",
    description:
      "As of October 2026 Rockstar has not announced GTA 6 on PC. Take-Two’s lineup still lists PS5 and Xbox only. What a real PC date would look like.",
    bodyMarkdown: `There is no PC version of Grand Theft Auto VI on any official calendar. Not a year. Not a season. Not a “Windows coming later” footnote on [rockstargames.com/VI](https://www.rockstargames.com/VI). Take-Two’s **7 August 2026** earnings lineup prints the game once: **PlayStation 5 and Xbox Series X|S, 19 November 2026**. The same table is happy to write “PC” next to NBA 2K27. It does not write it next to VI.

That absence is the news. Everything else is pattern-matching from GTA V’s 18-month PC wait, and pattern-matching is how fake Steam dates get traffic.
${VC("Vice City hub on the Map-6 GTA 6 map", "The atlas is console-first. A PC pin set does not exist because a PC SKU does not exist.")}

## Where a real announcement would land

A PC SKU that is real shows up in three places in the same week:

1. A Rockstar Newswire post and an update to the VI page.
2. A storefront — Rockstar Games Store plus at least one of Steam, Epic, or Microsoft Store (PC).
3. System requirements, even a first pass.

Until those three exist, a YouTube thumbnail with a November 2027 date is fan fiction. Cloud streaming has not been announced either. GeForce Now wishlists are not a Rockstar product.

Rockstar Support’s platforms article names **two** current-gen boxes and then talks editions. It does not hedge with “PC TBA.” The June 25 pre-order release lists PlayStation Store, Microsoft Store, Rockstar Games Store, and retailers. No Steam sentence.

## What this means if you only own a PC

You cannot play VI on **19 November 2026** on the hardware on your desk. There is no announced wait to put in a calendar. The options that are actually in the world are: buy or borrow a PS5 or Xbox Series X|S, or wait for an announcement that has not been scheduled.

That is a worse sentence than “Q2 2027,” which is why people invent Q2 2027. Map-6 will not. The [release-date guide](/en/guides/gta-6-release-date) tracks what Rockstar delayed and what it did not. A missing platform is not a delay. It is a blank.

If you are shopping a GPU “for GTA 6,” you are shopping for other games. Keep the receipt. Requirements, when they exist, will not match a Reddit spreadsheet from 2024.

## What we still map anyway

Leonida’s named hubs do not depend on DirectX. [Vice City](/en/locations/vice-city), the Keys, Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga — those names are already on posters. The [interactive map](/en/map) is the same homework a console buyer can do in October. A PC buyer can do it too. You just cannot launch the executable in November.

Mods, FiveM nostalgia, and “it will be better on PC” are arguments about a product that is not for sale. They are not pins.
${OD("Ocean Drive on the Map-6 GTA 6 map", "You can study Ocean Drive without a Steam key. You cannot drive it on PC in November.")}

When Rockstar posts a PC date, this slug gets a new lede and a store link. Until then, the honest title is the one on this page.
`,
    cluster: "release",
    primaryKeyword: "gta 6 pc release date",
    secondaryKeywords: ["gta 6 steam", "gta 6 pc", "gta 6 platforms"],
    sources: [ROCKSTAR_VI, TTWO_Q1, ROCKSTAR_SUPPORT],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: ["gta-6-release-date", "gta-6-preorder-guide"],
    eventKey: "story-gta6-pc",
    funnelKind: "mixed",
    affiliateIntents: ["console_upgrade", "preorder_standard"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Is GTA 6 coming to PC?",
        answer:
          "Rockstar has not announced a PC version. Official platform lists and Take-Two’s August 2026 lineup name PlayStation 5 and Xbox Series X|S only.",
      },
      {
        question: "When is the GTA 6 Steam date?",
        answer:
          "There is no Steam date. Any specific month you see outside Rockstar or Take-Two is invented.",
      },
      {
        question: "Will GTA 6 be on Game Pass or GeForce Now at launch?",
        answer:
          "Neither has been announced for VI. Do not plan a November session around a cloud tile that does not exist.",
      },
    ],
    notes: "Desk — PC still blank, Oct 2026.",
  }),

  desk({
    id: "desk-2026-10-preload-en",
    slug: "gta-6-preload-november-12-code-in-box",
    locale: "en",
    title: "GTA 6 Preload Starts on November 12",
    description:
      "Digital GTA 6 pre-orders preload from November 12 at local midnight. Physical is a code-in-box you redeem the same week — not a disc.",
    bodyMarkdown: `The only new mechanical date left on the public GTA 6 calendar is a Monday. **12 November 2026**, local midnight, digital pre-orders can **preload**. Take-Two wrote that in the 25 June pre-order release so that people who have already paid are not sitting on a 100 GB+ prompt on launch morning.

The physical version goes on sale the **same day**, and it is a **code in a box**. Rockstar Support repeats it: redeem as soon as you have the code so you can join that preload. There is no disc to drop in a drive. If your plan was “buy Friday night, install Saturday,” you need the code in hand **before** the weekend, not a shrink-wrapped movie case.
${VC("Vice City on the Map-6 GTA 6 map", "Preload fills a drive. It does not unlock a larger Vice City.")}

## Digital vs the box on the shelf

| | Digital pre-order | Physical code-in-box |
|---|---|---|
| Preload from 12 Nov, local midnight | Yes, once the store says the bits are up | Yes, after you redeem the code |
| Vintage Vice City Pack (buy before 20 Nov) | Yes | Yes — Support says the code includes the pack |
| One month of GTA+ | Digital offer; claim by 31 Mar 2027 | Not in the physical Support paragraph |
| Play before 19 Nov | No | No |
| Shareable disc | No | No |

Storage is the boring risk. Rockstar has not posted a final install size in the materials we trust. Leave a **large** chunk of free space on the console you will actually play on — not the old box in a cupboard. If you are still on a 550 GB drive with two other day-one games, read the [setup guide](/en/guides/best-setup-gta-6-ps5-xbox) before 12 November, not on it.

Retail midnight is local. A code bought in Paris does not follow New York. The [pre-order guide](/en/guides/gta-6-preorder-guide) is the store-by-store page; this article is the week-of sequence.

## What preload is not

It is not an early unlock. It is not a beta. It is not a reason to sleep in the store queue on the 11th unless you enjoy queues. The executable becomes a game on **19 November**. Everything you download on the 12th is so that Wednesday is a patch, not a full fetch.

People will post “preload is live” screenshots from one region twelve hours before yours. Believe the store tile on **your** account. Cross-play and cross-saves remain unannounced, so preloading on the wrong family of hardware is how you donate a week of bandwidth to a library you will not launch.

## Why we are writing this in October

Because the factory internet will write it fifteen times in November with broken titles. One desk URL is enough. If Rockstar moves the preload day, we change this lede. If a retailer ships codes late, that is a courier problem — keep the order email, not a panic tab.

Use the extra month to learn [locations](/en/locations) on the [map](/en/map). The download bar does not teach you Ocean Drive.
${OD("Ocean Drive on the Map-6 GTA 6 map", "Learn the strip in October. Preload will not do it for you.")}
`,
    cluster: "preorder",
    primaryKeyword: "gta 6 preload",
    secondaryKeywords: ["gta 6 code in box", "gta 6 physical", "gta 6 preorder"],
    sources: [TTWO_PREORDER, ROCKSTAR_SUPPORT, ROCKSTAR_VI],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: ["gta-6-preorder-guide", "best-setup-gta-6-ps5-xbox"],
    eventKey: "story-preload-physical",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_standard", "storage_ssd"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "When does GTA 6 preload start?",
        answer:
          "November 12, 2026 at local midnight for digital pre-orders. Physical buyers redeem a code-in-box to join the same window.",
      },
      {
        question: "Can I play GTA 6 on November 12?",
        answer:
          "No. Preload installs the client. Launch remains November 19, 2026.",
      },
      {
        question: "Does the physical copy include GTA+?",
        answer:
          "Rockstar Support lists the Vintage Vice City Pack on the physical code. The complimentary GTA+ month is described as a digital pre-order offer.",
      },
    ],
    notes: "Desk — preload / code-in-box.",
  }),

  desk({
    id: "desk-2026-10-dualsense-en",
    slug: "gta-6-dualsense-limited-edition-where-to-buy",
    locale: "en",
    title: "GTA 6 DualSense: Black vs White Stock",
    description:
      "Two official GTA 6 DualSense pads, $84.99, launch November 19. Black is PlayStation Direct in key countries; White is on retail too. What Sony actually said.",
    bodyMarkdown: `Sony announced two limited Grand Theft Auto VI DualSense controllers on **3 September 2026** and opened pre-orders on **10 September at 10:00 local**. Both launch **from 19 November 2026** at **$84.99 / €84.99 / £74.99**. The White pad is Vice City at daybreak. The Black pad is nightlife. Neither pad is the game.

The distribution sentence is the one people got wrong in live blogs. In the US, UK, France, Germany, Austria, Spain, Italy, the Netherlands, Belgium and Luxembourg, the **Black** Limited Edition is **PlayStation Direct exclusive**. The **White** Limited Edition is on Direct **and** participating retailers. Portugal used playstation.com/store/hardware. Other regions: select or participating retailers, exact date “may vary.”
${VC("Vice City hub on the Map-6 GTA 6 map", "The pads are painted like Vice City. They do not add map pins.")}

## What you are buying

A standard DualSense with a paint job and a launch-week scarcity story. Haptics do not become a six-star wanted ladder because the shell is black. If you need a working pad for November, a regular DualSense or the Xbox equivalent on the [setup guide](/en/guides/best-setup-gta-6-ps5-xbox) is the boring buy. If you want the object, you already know which colour you are.

PlayStation Direct offered **free launch-day delivery** on eligible pre-orders. The US store limited Black to **one per order**. Sony published **no stock numbers**. Sold-out posts on 10 September were real for some queues and theatre for others. Check the live tile, not a screenshot from a UK drop at 10:00 BST.

| | Black Limited Edition | White Limited Edition |
|---|---|---|
| Look | Nightlife | Daybreak / pastel |
| Direct (US, UK, listed EU) | Exclusive | Yes |
| Other retailers in those countries | No (Direct countries above) | Participating retailers |
| Price | $84.99 / €84.99 / £74.99 | Same |
| Game included | No | No |

Scalper listings the same afternoon were the predictable tax. A pad that does not include the [pre-order](/en/guides/gta-6-preorder-guide) is a bad panic buy at twice MSRP.

## Xbox players

There is no matching official Xbox Series controller in the PlayStation Blog post, because it is a PlayStation Blog post. If Microsoft announces a VI pad, it will be a Microsoft post. Until then, do not hold an Xbox session hostage to a DualSense.

## Map-6 angle

Zero. Buy or skip. Then come back to the [map](/en/map). A controller does not change Ocean Drive, and the factory news cycle treated this drop like a new trailer. It was a hardware SKU with a queue. We are leaving one URL so the next restock does not become five new slugs.
${OD("Ocean Drive on the Map-6 GTA 6 map", "Nightlife black, daybreak white — still the same strip on the map.")}
`,
    cluster: "setup",
    primaryKeyword: "gta 6 dualsense",
    secondaryKeywords: ["gta 6 controller", "gta 6 ps5", "playstation direct"],
    sources: [PS_BLOG, ROCKSTAR_VI],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: ["best-setup-gta-6-ps5-xbox", "gta-6-preorder-guide"],
    eventKey: "story-dualsense-gta6",
    funnelKind: "purchase",
    affiliateIntents: ["controller", "console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "How much is the GTA 6 DualSense?",
        answer:
          "Sony’s recommended price is $84.99, €84.99, or £74.99. Launch is from November 19, 2026.",
      },
      {
        question: "Where can I buy the black GTA 6 controller?",
        answer:
          "In the US, UK, and listed Direct EU countries, only on PlayStation Direct. Elsewhere, Sony pointed at select retailers.",
      },
      {
        question: "Does the controller include GTA 6?",
        answer: "No. It is a limited DualSense. The game is a separate purchase.",
      },
    ],
    notes: "Desk — DualSense drop, one URL.",
  }),

  desk({
    id: "desk-2026-10-vintage-en",
    slug: "gta-6-vintage-vice-city-pack-gta-plus",
    locale: "en",
    title: "GTA 6 Vintage Pack vs One Month of GTA+",
    description:
      "Buy GTA 6 before November 20 and Rockstar includes the Vintage Vice City Pack. Digital also gets a GTA+ month to claim by March 31, 2027. What is in each.",
    bodyMarkdown: `The pre-order bonus that is **not** Ultimate is easy to miss because it is named like a nostalgia ad. **Vintage Vice City Pack**: a ’55 Vapid Stanier and a Shore Court garage near Ocean Beach, outfits and hairstyles for Jason and Lucia, and a tropical weapon pattern nodding at Tommy Vercetti’s shirt. Rockstar Support says it is on **digital pre-orders and purchases of either edition before 20 November 2026**. Physical codes include the pack too.

Digital buyers also get **one month of GTA+**. PlayStation’s terms (Ireland page, same offer shape elsewhere) say you claim it **by 31 March 2027**, once per account. It can auto-renew into a paid month. Cancel in subscriptions if you do not want that. Existing subscribers get the month added after they claim.
${OD("Ocean Drive on the Map-6 GTA 6 map", "Shore Court sits with Ocean Beach in the pack copy — trailer sand, not an Ultimate gate.")}

## Two bonuses, two clocks

| Bonus | Who gets it | Clock | Where it lives |
|---|---|---|---|
| Vintage Vice City Pack | Standard or Ultimate, digital **or** physical code, buy before **20 Nov 2026** | That date | In VI, as the story unlocks the items |
| One month of GTA+ | **Digital** eligible purchase before 20 Nov | Claim by **31 Mar 2027** | GTA+ / GTA V and classics library, not a larger Leonida |

Xbox store copy for the pack is more poetic than Support and gives a hard digital cutoff of **19 November 2026 23:59:59** in at least one locale. When store fine print fights Support, we flag both and tell you to read the tile you are paying. Map-6 will not invent a third deadline.

GTA+ is Rockstar’s membership for **the current Online**. It is a way to play V and other catalog games and to take the usual subscriber perks. It is **not** a VI progression skip. It does not transfer a Los Santos garage into Leonida. If you are buying wallet credit to feed Shark Cards, that is still the [wallets article](/en/news/gta-online-wallet-cards-before-vi) problem, not this pack.

## Ultimate is a different shelf

Ultimate’s extras (vehicles, weapons, apparel, story-threaded activities) sit **on top** of this. You do not need Ultimate to get the Stanier. You do not get Ultimate extras by claiming GTA+. The [comparison guide](/en/guides/gta-6-ultimate-edition-vs-standard) is the $20 question. This page is the “I already picked Standard, did I miss the bonus?” question.

Items “will be available to Jason and Lucia as their story progresses.” That is Rockstar saying you will not find the linen suit in a free-roam crate at minute five. Do not write a leak path for it.

## What to do this week

1. If you want the pack, buy **before 20 November**, not “sometime in December when it is on sale.”
2. If you are digital, decide whether you will **claim GTA+** or let the email rot — and whether you will cancel the renew.
3. If you are physical, budget for a code-in-box arriving in time to [preload on the 12th](/en/news/gta-6-preload-november-12-code-in-box).
4. Open the [map](/en/map) and learn Ocean Beach / Ocean Drive so the garage line in the pack copy means something.
${VC("Vice City on the Map-6 GTA 6 map", "The pack is costume and a car. The city is the same for every edition.")}

Read Support, then the store tile, then pay. In that order.
`,
    cluster: "preorder",
    primaryKeyword: "gta 6 preorder bonus",
    secondaryKeywords: ["vintage vice city pack", "gta+", "gta 6 standard"],
    sources: [
      ROCKSTAR_SUPPORT,
      TTWO_PREORDER,
      {
        url: "https://www.playstation.com/en-ie/support/games/gta-vi-offer-terms/",
        title: "PlayStation — GTA+ month terms (digital offer)",
      },
    ],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["ocean-drive", "vice-city"],
    relatedGuideSlugs: [
      "gta-6-preorder-guide",
      "gta-6-ultimate-edition-vs-standard",
    ],
    eventKey: "story-vintage-pack",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_standard", "wallet_topup"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "What is in the GTA 6 Vintage Vice City Pack?",
        answer:
          "A ’55 Vapid Stanier and garage, outfits and hairstyles for both leads, and an exclusive weapon pattern. Rockstar says the items unlock as the story progresses.",
      },
      {
        question: "Do I need Ultimate to get the Vintage pack?",
        answer:
          "No. Support lists it on either edition if you buy before November 20, 2026, including the physical code-in-box.",
      },
      {
        question: "Is the free GTA+ month automatic?",
        answer:
          "No. Digital buyers claim it on the GTA+ product page by March 31, 2027. It can continue as a paid subscription unless you cancel.",
      },
    ],
    notes: "Desk — vintage pack + GTA+.",
  }),

  desk({
    id: "desk-2026-10-hubs-en",
    slug: "gta-6-leonida-named-hubs-october-2026",
    locale: "en",
    title: "GTA 6 Map: The Six Hubs Rockstar Named",
    description:
      "Rockstar named six Leonida hubs: Vice City, the Keys, Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga. What each is, and what we will not draw.",
    bodyMarkdown: `Leonida is the state. **Vice City** is the postcard. People still type “GTA 6 Miami map” because the marketing wants them to. The official vocabulary is wider, and it has not grown since the last trailer cycle. Six marketed destinations, one strip you can pause on, and a lot of white space we refuse to ink from a leak.

The names, as Rockstar has put them on posters and in the Extended Look package:

- **Vice City** — Miami-coded metro, nightlife, beaches, freeway seams.
- **Leonida Keys** — causeways, water, the exit from the metro.
- **Grassrivers** — wetlands, mangrove tone, wildlife.
- **Port Gellhorn** — working waterfront and freight, not South Beach.
- **Ambrosia** — gated wealth. On Map-6 that is [Ambrosia Island](/en/locations/ambrosia-island).
- **Mount Kalaga** — northern elevation, not swamp flatness.
${VC("Vice City hub on the Map-6 GTA 6 map", "Vice City is the metro. It is not the entire state of Leonida.")}

**Ocean Drive** is trailer geography — a recognizable night strip — not a promise that every hotel neon is canon. We pin the energy. We do not label a Hyatt.

## What “named” means on this site

A named hub gets a [location page](/en/locations) and a region on the [interactive map](/en/map). An unnamed swamp in a 2022 dump does not. Community reconstructions (including the Cities: Skylines rebuilds) are useful as **scale arguments**. They are not a spec sheet. Rockstar has not printed km². The [map guide](/en/guides/gta-6-map-guide) keeps scale arguments in a box labeled math.

If a TikTok draws a county line through Grassrivers, we do not copy it. If Trailer 2 shows a gated ridge at a timestamp we can scrub, we add a note, not a border.

| Hub | Official tone | Map-6 habit |
|---|---|---|
| Vice City | Neon metro | Densest pin set |
| Leonida Keys | Escape / water | Causeway reads |
| Grassrivers | Wetland | Wildlife, sparse road |
| Port Gellhorn | Work port | Cranes, not clubs |
| Ambrosia | Wealth | Gated, island treatment |
| Mount Kalaga | Wild north | Elevation, not beach |

## Why this is a news page in October

Because leak maps will spike again as preload week gets close, and someone will publish “the real 8,000-POI atlas.” Our job that week is the same as this week: **show the six names, show the trailer strips, hide the stolen build.** The longer leak policy is a separate article. This one is the tourist card.

Open the [map guide](/en/guides/gta-6-map-guide) if you are new. Open [/map](/en/map) if you already know the names and want coordinates. Editions do not add a seventh hub. Ultimate does not unlock Mount Kalaga. The $400 poster is not a seventh hub either — it is paper.
${KEYS("Leonida Keys on the Map-6 GTA 6 map", "The Keys are the official contrast to the metro — water, not a leak-shaped county.")}

When Rockstar names a seventh, we add a seventh. That is the whole editorial algorithm.
`,
    cluster: "map",
    primaryKeyword: "gta 6 map",
    secondaryKeywords: ["leonida", "vice city map", "gta 6 locations"],
    sources: [ROCKSTAR_VI, {
      url: "https://www.rockstargames.com/VI",
      title: "Rockstar — VI destinations and media",
    }],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: [
      "vice-city",
      "leonida-keys",
      "grassrivers",
      "port-gellhorn",
      "ambrosia-island",
      "mount-kalaga",
    ],
    relatedGuideSlugs: ["gta-6-map-guide", "leonida-lore-overview"],
    eventKey: "story-leonida-hubs",
    funnelKind: "map_deep_link",
    affiliateIntents: [],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "How many cities are in GTA 6?",
        answer:
          "Rockstar markets a state, Leonida, and names Vice City as the metro plus five other destinations. It has not published a city count.",
      },
      {
        question: "Is Ocean Drive a separate region?",
        answer:
          "It is a trailer strip inside the Vice City energy, not a seventh named hub on the posters.",
      },
      {
        question: "Do you use leak maps to fill Leonida?",
        answer:
          "No. Pins that we cannot re-check on official frames stay off the public map.",
      },
    ],
    notes: "Desk — named hubs only.",
  }),

  desk({
    id: "desk-2026-10-leaks-en",
    slug: "gta-6-why-we-ignore-leak-maps",
    locale: "en",
    title: "Why Map-6 Will Not Host GTA 6 Leak Maps",
    description:
      "The 2022 dump, trailer rips, and office stills happened. Map-6 still will not host a leak map. What we keep, what we bin, and why that is the product.",
    bodyMarkdown: `In September 2022 a lot of unfinished Grand Theft Auto VI left Rockstar without permission. The internet named the actor, built wikis, and drew maps from a stolen build. Those files are still out there. **They are not on Map-6.**

That is not a purity contest. It is a product decision. A map you can defend in an AdSense review and in a citation is a map you can **re-check on official frames**. A map you traced from teapotuberhacker footage is a liability with prettier colors. We already published a dated leak timeline. This page is the policy in October, six weeks out, when the dump will trend again.
${VC("Vice City on the Map-6 GTA 6 map", "If we cannot pause it on a Rockstar upload, it is not a public pin.")}

## What we will use

- Trailer 1, Trailer 2, An Extended Look (27 August 2026), official screenshots, Newswire, the VI page.
- Names Rockstar printed: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga, Lucia Caminos, Jason Duval.
- Take-Two sentences that are on IR or in a named interview.

Timestamps we publish are **our scrub**, labeled approximate, against YouTube encodes that can shift. That is still a higher bar than a Discord pin.

## What we will not use

- Stolen build geography, interior names, mission titles, shop directories, character bios that only exist in the dump.
- “Leaked map size” presented as km².
- Fake Newswire screenshots and AI stills.
- Anyone’s reconstruction that we cannot point at an official second.

GTABase-style leak atlases exist. They are not a competitor we copy. They are a category we left on purpose. If you want that, you know where it lives. If you want something you can show a lawyer and a search reviewer, you are on the [interactive map](/en/map).

## “But the dump was right about Vice City”

Parts of a stolen build will rhyme with a trailer that came later. That does not make the rest of the build a source. Journalism 101, plus copyright. The [leaks timeline](/en/news/gta-6-leaks-timeline-verified) is the museum label. This page is the velvet rope.

When a leaker posts “the real road spine” in October, we will open official footage and decide if a **named** seam moved. We will not import a GeoJSON. We will not host a toggle. We will not “just this once” because preload week is good for traffic.

Readers who want rumor have plenty of tabs. Readers who want [locations](/en/locations) they can trust have one atlas. The [map guide](/en/guides/gta-6-map-guide) teaches the second group. We write for them.
${KEYS("Leonida Keys on the Map-6 GTA 6 map", "Causeways we can scrub stay. County lines from 2022 stay off.")}

If that means we look “late” next to a leak account, good. Late and still up in December is the job.
`,
    cluster: "map",
    primaryKeyword: "gta 6 leaks",
    secondaryKeywords: ["gta 6 leak map", "teapotuberhacker", "gta 6 map"],
    sources: [
      ROCKSTAR_VI,
      {
        url: "https://www.rockstargames.com/newswire",
        title: "Rockstar Newswire — official posts only",
      },
    ],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city", "leonida-keys"],
    relatedGuideSlugs: ["gta-6-map-guide"],
    eventKey: "story-leaks-policy",
    funnelKind: "map_deep_link",
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Does Map-6 use the 2022 GTA 6 leak?",
        answer:
          "No. We may mention that the leak happened, with dates. We do not pin stolen-build geography.",
      },
      {
        question: "Why do other maps have more pins?",
        answer:
          "They are tracing unfinished files. We only publish what we can re-check on official media. Fewer pins is the point.",
      },
      {
        question: "Will you add leak pins after launch?",
        answer:
          "After launch the source of truth is the shipped game, not a 2022 dump. We will map what players can stand in.",
      },
    ],
    notes: "Desk — leak map policy.",
  }),

  desk({
    id: "desk-2026-10-extended-en",
    slug: "gta-6-extended-look-what-still-unknown",
    locale: "en",
    title: "GTA 6 Extended Look: What Is Still Blank",
    description:
      "An Extended Look (27 August) showed dual leads, a six-star knowledge HUD, and lifestyle meters. Six weeks later, here is what that footage still did not settle.",
    bodyMarkdown: `On **27 August 2026** Rockstar ran **An Extended Look**: Netflix at 15:00 ET, then YouTube and the VI page about six hours later. It was in-game PlayStation 5 footage, not a merch stream. It remains the last long official look at systems. Six weeks later, people are still treating it as a complete design document. It is a **sample**.

What it actually showed, without the adjective pile:

- You can play **both** Lucia and Jason. Switching looked near-instant in free roam. Some missions lock a perspective. The other lead can ride along as AI.
- A **six-star** wanted ladder is back. The HUD also tracks what police **know** — appearance, weapons, vehicle — not only how loud you are.
- Lifestyle meters in a San Andreas spirit: food, exercise, sleep change how the pair look.
- Side activities in the package included water, gyms, clubs, denser NPC pushback. That is a reel, not a 100% list.
${OD("Ocean Drive on the Map-6 GTA 6 map", "Extended Look spent time on the strip. It did not finish the atlas.")}

The [systems hub](/en/news/gta-6-gameplay-systems-2026) and the [Extended Look watch guide](/en/guides/gta-6-extended-look-how-to-watch) unpack what aired. This page is the negative space.

## Still blank after the look

| Topic | Status 7 Oct 2026 |
|---|---|
| PC | Not announced |
| Cross-saves / cross-play | Not announced |
| GTA Online in VI on day one | Not announced as a VI mode |
| Collectible totals | Not printed |
| Full activity list | Sample only |
| Wanted-star bonuses as numbers | Seen, not specced |
| Third trailer date | Not posted |
| Final install size | Not in the documents we trust |

If a creator tells you the look “confirmed” a winter playlist or a property empire, they are writing fanfic on top of a Netflix window. Rockstar showed **systems sentences**, then went back to selling Standard, Ultimate, a $400 crate, and two DualSense colours.

## What a player should do with a six-week-old look

Rewatch on the official upload, not a cropped TikTok. Pause on geography; drop a pin on the [map](/en/map) only when the building or seam is stable across encodes. Read [locations](/en/locations) for the named hubs. Do not build a character build around a lifestyle meter we have not seen in a patch notes file.

The look also did **not** change editions. You do not need Ultimate to switch characters. You do not need the Vice City Collection to see a six-star chase. Hardware still matters more than a painted pad — [setup guide](/en/guides/best-setup-gta-6-ps5-xbox) if your TV is 60 Hz and you care.

We will write a new systems piece when Rockstar ships another long look or a Newswire that adds a sentence. Until then, repeating August footage with a October dateline is how the factory calendar got ugly. One “what is still blank” URL is the honest refresh.
${VC("Vice City on the Map-6 GTA 6 map", "The look sold a city that reacts. It did not sell a finished POI list.")}
`,
    cluster: "trailer",
    primaryKeyword: "gta 6 extended look",
    secondaryKeywords: ["gta 6 gameplay", "gta 6 wanted system", "lucia jason"],
    sources: [
      ROCKSTAR_VI,
      {
        url: "https://www.netflix.com/tudum",
        title: "Netflix Tudum — An Extended Look window",
      },
      TTWO_Q1,
    ],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city", "ocean-drive"],
    relatedGuideSlugs: [
      "gta-6-extended-look-how-to-watch",
      "gta-6-map-guide",
    ],
    eventKey: "story-extended-look-blanks",
    funnelKind: "mixed",
    affiliateIntents: ["console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "When was GTA 6 An Extended Look?",
        answer:
          "27 August 2026. Netflix first at 3 PM ET, then YouTube and rockstargames.com/VI.",
      },
      {
        question: "Did Extended Look confirm a PC date?",
        answer: "No. It was PlayStation 5 footage. PC remains unannounced.",
      },
      {
        question: "Is the six-star wanted system confirmed?",
        answer:
          "It appears in official Extended Look footage, including a HUD that tracks police knowledge. Exact tuning is not in a public design doc.",
      },
    ],
    notes: "Desk — Extended Look negatives.",
  }),
];
