import type { Guide } from "./guides";

/**
 * Launch-window guides. These answer the three questions that spike between
 * 12 and 19 November 2026 and that no other Map-6 page covers: when the game
 * unlocks, how preload works, and how much room to clear. They are published
 * weeks early on purpose — a page shipped on launch day indexes in December.
 *
 * Rockstar has published the dates. It has never published an install size or
 * an unlock hour, so neither is stated here as an official figure.
 */
export const LAUNCH_GUIDES: Guide[] = [
  {
    slug: "gta-6-release-time",
    title: "GTA 6 Release Time — When It Unlocks in Your Time Zone",
    description:
      "GTA 6 launches 19 November 2026 on PS5 and Xbox Series X|S. What Rockstar has actually published about the unlock, what local midnight means where you live, and how to be ready.",
    answer:
      "Grand Theft Auto VI releases on 19 November 2026 on PlayStation 5 and Xbox Series X|S. Rockstar has not published an unlock hour, but every dated step of this release — pre-orders on 25 June and preload on 12 November — went live at local midnight, so plan for 00:00 on 19 November where you live rather than a single global moment.",
    category: "beginner",
    readTime: 9,
    publishedAt: "2026-10-12",
    comparison: {
      caption:
        "If the unlock follows the local-midnight pattern Rockstar used for pre-orders and preload, this is when 19 November 2026 begins for you. UTC offsets are the ones in force that week, after European and North American clocks have already gone back.",
      headers: ["Where you are", "Local unlock", "Same moment in UTC"],
      rows: [
        ["Auckland (NZDT, UTC+13)", "Thu 19 Nov, 00:00", "Wed 18 Nov, 11:00"],
        ["Sydney (AEDT, UTC+11)", "Thu 19 Nov, 00:00", "Wed 18 Nov, 13:00"],
        ["Tokyo / Seoul (UTC+9)", "Thu 19 Nov, 00:00", "Wed 18 Nov, 15:00"],
        ["Dubai (UTC+4)", "Thu 19 Nov, 00:00", "Wed 18 Nov, 20:00"],
        ["Paris / Berlin / Madrid (CET, UTC+1)", "Thu 19 Nov, 00:00", "Wed 18 Nov, 23:00"],
        ["London / Lisbon (GMT, UTC+0)", "Thu 19 Nov, 00:00", "Thu 19 Nov, 00:00"],
        ["New York / Toronto (EST, UTC−5)", "Thu 19 Nov, 00:00", "Thu 19 Nov, 05:00"],
        ["Chicago (CST, UTC−6)", "Thu 19 Nov, 00:00", "Thu 19 Nov, 06:00"],
        ["Los Angeles / Vancouver (PST, UTC−8)", "Thu 19 Nov, 00:00", "Thu 19 Nov, 08:00"],
      ],
    },
    content: [
      "Grand Theft Auto VI releases on Thursday 19 November 2026, on PlayStation 5 and Xbox Series X|S. That date is Rockstar's, published and repeated by Take-Two. The hour is the part nobody has published, and it is the reason this page exists: the single most-asked question of launch week has no official answer yet, only a very strong pattern.",
      "Here is the pattern. Pre-orders opened on 25 June 2026 at midnight local time. Digital preload starts on 12 November 2026, also at local midnight. Twice in a row, Rockstar has rolled this release out by local clock rather than by a single worldwide instant. If the third step follows the first two, GTA 6 becomes playable at 00:00 on 19 November wherever you are — which means New Zealand plays roughly a full day before the US West Coast.",
      "The alternative, which some publishers prefer, is a simultaneous global unlock keyed to one time zone. It happens, and Rockstar could do it. But nothing in the published schedule points that way, and the company has not announced a worldwide countdown. Until a Newswire post says otherwise, treat local midnight as the planning assumption and the table above as your arithmetic, not as a Rockstar statement.",
      "What this changes in practice: if you are in Europe, the game unlocks on the Wednesday evening in American terms, and the first streams you see will come out of Oceania and Asia several hours before your own midnight. If you are on the US West Coast, you will spend most of 18 November watching other people play. Plan around that rather than around a rumour that the game goes live at a convenient hour for your region.",
      "Being ready at midnight is a separate problem from knowing when midnight is, and it is the one you can actually solve now. Preload on 12 November is the whole point of the seven-day gap Rockstar left: the download finishes long before the unlock, and at 00:00 you decrypt rather than download. Our preload guide walks through the steps on both consoles, and the storage guide covers how much room to clear before the queue starts.",
      "Physical buyers have an extra step and should read it twice. The boxed Standard edition is a code in a box, not a disc. Codes are usable from 12 November so that physical buyers can preload alongside digital ones. If your copy is shipping rather than collected in store, a delivery that slips past 19 November means you unlock late regardless of the clock — which is the single strongest argument for digital if you care about playing at midnight.",
      "Account readiness is the other avoidable failure. Store checkouts and redemption screens are the things that break under load at midnight, not the game. Confirm the email and password on the PlayStation Network or Xbox account you will actually play on, make sure two-factor codes reach a phone you will have in your hand, and check that your payment method has not expired since June. A console that is ready and an account that is not is the most frustrating version of launch night.",
      "If you intend to be awake for it, decide what you are doing with the first hour. Most players spend it in the opening sequence; map hunters spend it confirming geography. Map-6 is built for the second group: open the fullscreen map, filter to landmarks, and check the first drive against the regions the trailers already showed — Vice City, the Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga. Coordinates from the HUD go straight into your notes.",
      "A word on what will not happen on 19 November. There is no announced PC version, so no PC unlock hour exists to look up. Cross-save between PlayStation and Xbox has not been announced. And no official list of collectibles has been published, which means every \"complete collectibles map\" circulating before launch is a guess. Map-6 will fill the collectible layers from verified in-game finds after release, not from pre-launch speculation.",
      "This page gets revised the moment Rockstar publishes an hour. If a Newswire post, a PlayStation Store countdown or an Xbox product page states a specific unlock time, the table above is replaced with that figure and the inference is removed. Until then, what you have is the published date, the pattern from two previous steps, and the arithmetic to convert it to your own clock.",
    ],
    faq: [
      {
        question: "What time does GTA 6 unlock?",
        answer:
          "Rockstar has not published an unlock hour. Pre-orders on 25 June 2026 and preload on 12 November 2026 both went live at local midnight, so the most likely outcome is 00:00 local on 19 November 2026. Nothing has been confirmed, and this page will be updated if Rockstar states a time.",
      },
      {
        question: "Will everyone get GTA 6 at the same moment worldwide?",
        answer:
          "Probably not. A local-midnight rollout means New Zealand unlocks about 21 hours before the US West Coast. A single global unlock is possible but has not been announced and would break the pattern used for pre-orders and preload.",
      },
      {
        question: "Can I start playing at midnight if I bought the boxed copy?",
        answer:
          "Only if the box is in your hands. The physical Standard edition contains a download code rather than a disc, and codes work from 12 November so physical buyers can preload. If delivery slips past launch day, you unlock when the box arrives.",
      },
    ],
  },
  {
    slug: "gta-6-preload",
    title: "GTA 6 Preload — 12 November, Step by Step on PS5 and Xbox",
    description:
      "Preload for GTA 6 opens 12 November 2026, seven days before launch. How to queue the download on PlayStation 5 and Xbox Series X|S, and what boxed buyers need to do first.",
    answer:
      "GTA 6 preload starts on 12 November 2026 at local midnight, seven days before the 19 November launch. Digital buyers find the download queued automatically on PlayStation 5 and Xbox Series X|S; boxed buyers must redeem the code from the case first, because the physical Standard edition ships a code rather than a disc.",
    category: "beginner",
    readTime: 9,
    publishedAt: "2026-10-12",
    content: [
      "Rockstar set preload for Grand Theft Auto VI on 12 November 2026, at local midnight, a full week before the 19 November launch. That gap is unusually generous and it is deliberate: a seven-day window means nobody has to race a progress bar at midnight on launch night. If you do one piece of launch preparation, do this one.",
      "On PlayStation 5, a digital pre-order downloads itself once preload opens, provided the console has room and is either on or in rest mode with automatic downloads enabled. You can check under Settings, then System, then Power Saving, that the console keeps its network connection in rest mode, and under Settings, then Saved Data and Game/App Settings, that automatic downloads are allowed. If nothing appears on 12 November, open your Game Library, find the pre-order, and start the download by hand.",
      "On Xbox Series X|S, the same applies through Instant-on and automatic updates. A pre-ordered digital copy lands in My Games and Apps under a Ready to Install or Queued section. If the console has been on energy-saving mode rather than Instant-on, it will not wake to download overnight, so either switch the power mode or start the download manually the next morning.",
      "Boxed buyers have an extra step, and it is the one that catches people out. The physical Standard edition of GTA 6 is a code in a box, not a disc. Rockstar made those codes usable from 12 November precisely so that physical buyers could preload alongside everyone else — but only after the box is in your hands and the code is redeemed on the store. Redeem it the day it arrives rather than waiting for launch night.",
      "Clearing space is the part to handle before 12 November, not during it. Rockstar has not published an install size for GTA 6, so there is no official number to plan against — our storage guide covers how to work out a sensible margin and how to free space on both consoles without deleting save data. The one rule that always holds: do not leave yourself a handful of spare gigabytes, because the day-one patch has to land somewhere too.",
      "Expect a day-one patch. Preloaded files are almost always a few days older than the shipping build, so a smaller update downloads on or just before 19 November. That patch is the reason a preloaded game can still show a progress bar on launch morning, and it is why finishing the big download on 12 November rather than on 18 November matters more than it looks.",
      "A preloaded game stays locked until the unlock moment. You will see it installed, with a timer or a padlock on the tile depending on the console, and it will refuse to launch. That is normal and does not mean the download failed. Our release-time guide covers what the unlock moment is likely to be in your time zone, since Rockstar has published the date but not the hour.",
      "If the download stalls, the usual fixes apply before anything dramatic: pause and resume the queue, check that no other console or household device is saturating the connection, and verify that the console has not run out of room mid-download. Rebuilding the PlayStation database or clearing the Xbox persistent storage are last resorts, not first moves, and neither is normally needed in a seven-day window.",
      "Use the week for something better than waiting. The map of Leonida is already navigable on Map-6: the fullscreen viewer covers Vice City, the Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga, with more than a thousand buildings matched to the South Florida addresses they were modelled on. Arriving on 19 November already knowing how the state fits together is worth more than a faster download.",
      "Dates on this page come from Rockstar's own published schedule: 12 November for preload, 19 November for launch, codes usable from 12 November for the boxed Standard edition. Console behaviour described here is standard platform behaviour rather than anything Rockstar has specified. If the publisher changes the preload date, this page changes with it.",
    ],
    faq: [
      {
        question: "When does GTA 6 preload start?",
        answer:
          "12 November 2026 at local midnight, seven days before the 19 November launch. The download queues automatically for digital pre-orders on PlayStation 5 and Xbox Series X|S when the console is set to download in rest or Instant-on mode.",
      },
      {
        question: "Can I preload GTA 6 if I bought the physical edition?",
        answer:
          "Yes, once you have redeemed the code. The boxed Standard edition contains a download code rather than a disc, and Rockstar made those codes usable from 12 November so physical buyers can preload at the same time as digital ones.",
      },
      {
        question: "Why is my preloaded copy of GTA 6 still downloading on launch day?",
        answer:
          "That is almost certainly the day-one patch. Preloaded files are built days before release, so a smaller update arrives on or just before launch. It is much faster than the main download, which is why preloading early still saves you the wait.",
      },
    ],
  },
  {
    slug: "gta-6-file-size",
    title: "GTA 6 File Size — How Much Space to Free Before Launch",
    description:
      "Rockstar has not published an install size for GTA 6. What that means for planning, how much room to clear on PS5 and Xbox Series X|S, and how to free it without losing saves.",
    answer:
      "Rockstar has not published an install size for GTA 6, so no official figure exists. Preload opens 12 November 2026, which is the deadline for having space ready. Clearing around 150 GB on PlayStation 5 or Xbox Series X|S leaves room for the install, the day-one patch and captures without having to delete anything at midnight.",
    category: "beginner",
    readTime: 9,
    publishedAt: "2026-10-12",
    updatedAt: "2026-10-26",
    comparison: {
      caption:
        "Published install sizes for comparable open-world titles, as context only. None of these is a prediction for GTA 6, and Rockstar has not announced a figure for it.",
      headers: ["Game", "Platform", "Approximate install"],
      rows: [
        ["Red Dead Redemption 2", "PS4 / Xbox One", "~150 GB"],
        ["Grand Theft Auto V (Expanded & Enhanced)", "PS5 / Xbox Series X|S", "~86 GB"],
        ["Call of Duty: Modern Warfare III", "PS5 / Xbox Series X|S", "~150 GB"],
        ["Grand Theft Auto VI", "PS5 / Xbox Series X|S", "Not announced"],
      ],
    },
    content: [
      "The honest answer first: Rockstar has not published how big Grand Theft Auto VI is. No Newswire post, no store listing, no Take-Two slide has given an install size. Every specific number circulating right now — and there are several, quoted with great confidence — is somebody's guess dressed up as a leak. Map-6 does not publish those, which is why this page tells you how to plan instead of what the number is.",
      "Status checked 26 October 2026: still no official size. Some fans expect Rockstar to publish one on Thursday 29 October, because the studio has posted GTA 6 news every Thursday since August. Rockstar has not said what, if anything, it will announce that day, and the size prediction is fan speculation. If an official figure appears, it goes at the top of this page with its source.",
      "What you actually need is not the exact size, it is enough headroom that you never have to think about it. The deadline is 12 November 2026, when preload opens, not 19 November when the game unlocks. A console that runs out of room halfway through a preload turns a comfortable seven-day window into a launch-night scramble.",
      "The table above is context, not prediction. Red Dead Redemption 2 shipped at roughly 150 GB, the enhanced edition of GTA V sits near 86 GB on current consoles, and large shooters routinely cross 150 GB. GTA 6 is a bigger and much later game than any of them, which tells you the direction but not the figure. Clearing around 150 GB is a reasonable target: generous enough that a larger-than-expected install still fits, modest enough that you do not have to wipe your library.",
      "Do not plan to the gigabyte. An install is only the first claim on your drive. The day-one patch needs somewhere to unpack, and console patching frequently requires temporary space on top of the final size. Video captures and screenshots eat the rest, and GTA is the kind of game people record. A drive that is 99 percent full is a drive that fails an update at the worst moment.",
      "On PlayStation 5, start in Settings, then Storage. The console shows what is installed and how much each title costs you, and lets you delete games without touching saved data, which lives separately and syncs to the cloud with a PlayStation Plus subscription. Games you have finished can also be moved to a USB extended-storage drive rather than deleted — a PS5 game stored there has to be moved back before it runs, but it is faster than redownloading a hundred gigabytes.",
      "On Xbox Series X|S, the equivalent is Settings, then System, then Storage devices. The same split applies: saves are tied to your account and the cloud rather than the console. Xbox is more forgiving about external drives, since a USB drive can hold Series X|S games indefinitely even though they must be copied to the internal SSD to play. Either way, do the moving now rather than during preload.",
      "If you are considering an upgrade rather than a clear-out, both consoles support expansion. PlayStation 5 takes an internal NVMe drive that meets Sony's speed requirements, and Xbox Series X|S uses an official expansion card that behaves exactly like internal storage. Neither is necessary for one game, but if your drive has been uncomfortably full for a year, this is the obvious moment. Our setup guide covers which options are worth the money.",
      "Boxed buyers do not escape any of this. The physical Standard edition of GTA 6 is a download code rather than a disc, so the full install lands on your drive exactly as it would for a digital copy. There is no version of this release where a disc saves you space.",
      "A note on the figures you will see elsewhere this month. Install sizes do appear on store pages shortly before release, often a few days ahead, and they sometimes change between preload and launch. When a size shows up on the PlayStation Store or the Microsoft Store, that is a real figure and this page will carry it with the source named. Until then, anything specific is speculation, including the numbers being repeated by sites that should know better.",
      "While the drive clears, the map does not need any space at all. Map-6 runs in a browser: the fullscreen viewer covers Leonida end to end, with more than a thousand buildings matched to the real South Florida addresses they were modelled on, and the preload guide covers the download steps for 12 November.",
    ],
    faq: [
      {
        question: "How many GB is GTA 6?",
        answer:
          "Rockstar has not announced an install size, and no official figure exists. Store pages normally publish a size shortly before release. Until then, clearing around 150 GB on PlayStation 5 or Xbox Series X|S is a sensible margin that covers the install, the day-one patch and captures.",
      },
      {
        question: "When do I need the space free by?",
        answer:
          "12 November 2026, when preload opens, rather than 19 November when the game unlocks. Running out of room mid-preload wastes the seven-day window Rockstar left between the two dates.",
      },
      {
        question: "Does the physical edition need less storage?",
        answer:
          "No. The boxed Standard edition of GTA 6 contains a download code rather than a disc, so the full game installs to your drive exactly as it does for a digital purchase.",
      },
    ],
  },
  {
    slug: "gta-6-reviews",
    title: "GTA 6 Reviews — Embargo Date & Review Scores Status",
    description:
      "No GTA 6 review embargo or review-code date has been announced, and no critic score exists yet. What is confirmed, what Rockstar did for GTA V and RDR2, and when this page updates.",
    answer:
      "There are no GTA 6 reviews yet. Rockstar has not announced a review embargo date or confirmed when critics receive codes, so no Metacritic or OpenCritic score exists. For GTA V and Red Dead Redemption 2, reviews went live the day before launch.",
    category: "beginner",
    readTime: 6,
    publishedAt: "2026-10-26",
    comparison: {
      caption:
        "When reviews of Rockstar's last two releases went live. Precedent only — Rockstar has announced nothing for GTA 6.",
      headers: ["Game", "Reviews published", "Launch", "Metacritic"],
      rows: [
        ["Grand Theft Auto V", "16 September 2013", "17 September 2013", "97 (PS3)"],
        ["Red Dead Redemption 2", "25 October 2018", "26 October 2018", "97 (PS4)"],
        ["Grand Theft Auto VI", "Not announced", "19 November 2026", "No score yet"],
      ],
    },
    content: [
      "Status on 26 October 2026: no outlet has published a review of Grand Theft Auto VI, because nobody outside Rockstar is allowed to. Rockstar has not announced a review embargo, has not said when critics receive codes, and the Metacritic and OpenCritic pages carry no score. Anything presented as an early verdict is a guess or a fake.",
      "What is confirmed sits around the review window rather than inside it. The game launches on 19 November 2026 on PlayStation 5 and Xbox Series X|S, and digital preload opens on 12 November. Reviews of a game this size almost always land before launch, which leaves a window of about three weeks from today.",
      "Rockstar's own history is the only useful guide. Reviews of Grand Theft Auto V appeared on 16 September 2013, one day before release. Red Dead Redemption 2 followed the same pattern in 2018, with reviews on 25 October for a 26 October launch. Both scored 97 on Metacritic. That is precedent, not a promise: a bigger game and a preload a week before launch could move the window either way.",
      "The rumours you will see this week fall into two groups. Insider posts claim review codes will go out soon, and some fans expect Rockstar to talk about it on Thursday 29 October, because the studio has posted something about GTA 6 every Thursday since the Extended Look in August. Rockstar has not announced anything for that date. Treat both as unconfirmed until Newswire or a reviewing outlet says so.",
      "Fake scores spread fastest in the days before an embargo. A screenshot of a Metacritic page with a number on it, a “leaked review” on a forum or a score attributed to a magazine that has not published is not a review. The real thing appears on the outlet's own site, under a named writer, at the same moment as dozens of others.",
      "What reviews will and will not settle: they will tell you how the story, the switching between Lucia and Jason, and the open world hold up. They will not change the price, the editions or the platforms, and they arrive too late to affect the Vintage Vice City Pack, which only requires buying before 20 November. If you are waiting for scores before pre-ordering, you lose nothing by waiting.",
      "When the embargo date is announced, this page gets it at the top with the source. When reviews go live, it gets the aggregate scores and links to the main outlets. Until then, the release-date guide covers the calendar and the file-size guide covers what to prepare on your console.",
    ],
    faq: [
      {
        question: "When do GTA 6 reviews come out?",
        answer:
          "Rockstar has not announced a review embargo date. For GTA V and Red Dead Redemption 2, reviews went live the day before launch; GTA 6 launches on 19 November 2026.",
      },
      {
        question: "Have critics received GTA 6 review codes?",
        answer:
          "Not according to anything Rockstar or a reviewing outlet has published. Claims that codes are about to go out come from insider posts and are unconfirmed.",
      },
      {
        question: "What is GTA 6's Metacritic score?",
        answer:
          "It has none yet. A score only appears once the review embargo lifts and outlets publish; any number shared before that is fake.",
      },
    ],
  },
];
