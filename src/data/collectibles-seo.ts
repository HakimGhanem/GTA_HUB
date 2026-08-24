/**
 * Editorial collectibles copy — AdSense-ready depth for hub + type pages.
 * Counts are franchise expectations / placeholders until Rockstar publishes finals.
 * Speculation is labeled; Map-6 is not affiliated with Rockstar.
 */

export type CollectibleSeo = {
  slug: string;
  metaDescription: string;
  about: string[];
  howToTrack: string[];
  faq: { question: string; answer: string }[];
};

export const COLLECTIBLES_HUB_SEO = {
  metaDescription:
    "GTA 6 collectibles guide: hidden packages, stunt jumps, street art & wildlife photography — how Map-6 tracks completion routes before launch.",
  about: [
    "Collectibles are the long-tail completion loop that has defined Grand Theft Auto since the 3D era: find every package, clear every jump, photograph every mural, and prove you explored the world instead of racing through the critical path. For Grand Theft Auto VI, Map-6 treats collectibles as a first-class map layer — even while Rockstar has not published final counts, reward tables, or Social Club challenge names for every category.",
    "What we do know from franchise history and official GTA 6 trailer context is directional, not contractual. Hidden packages (or a spiritual successor) rewarded thorough exploration in earlier games. Stunt jumps rewarded vehicle mastery on vertical city terrain. Photo challenges and wildlife objectives appeared in GTA Online and Red Dead Redemption 2–adjacent design language. Street art and mural photography fit Vice City’s neon visual identity. Until Rockstar ships the final design, Map-6 labels every count on these pages as an expected range, not a confirmed total.",
    "The interactive map at /map is the operational tool: filter by Collectibles, open a pin, copy coordinates, and share a deep link with friends or a Discord raid group. Category pages below explain how each loop typically works, what regions are richest based on trailer geography (Vice City beachfront, Port Gellhorn docks, Grassrivers wetlands, Leonida Keys islands), and how to avoid wasting time on rumor lists that invent exact street addresses Rockstar never showed.",
    "Editorial rules for Map-6 collectible coverage: (1) never invent a “datamined” total; (2) never present community guesses as Rockstar confirmation; (3) always link back to the live map so readers can verify pins themselves; (4) attribute community basemap tiles to GTADB under CC BY 4.0 where applicable. When launch day arrives, we will revise totals and pin lists against the shipping build rather than freezing pre-launch speculation as fact.",
    "If you are planning a 100% completion run, start with regional hubs — Vice City, Ocean Drive, Port Gellhorn, Grassrivers, Leonida Keys, Ambrosia Island, Mount Kalaga — then layer collectible filters. Pair this hub with the Hidden Packages guide and the beginner map guide so your route planning stays on verified Map-6 tools instead of unverified spreadsheet leaks.",
  ],
  howToTrack: [
    "Open /map and enable the Collectibles category filter.",
    "Use Share to copy a deep link with coordinates and zoom for your group.",
    "Cross-check regional location guides before trusting a single pin.",
    "Treat package/jump/art/wildlife totals on Map-6 as placeholders until launch.",
    "Revisit Map-6 after day-one patches — Rockstar often adjusts spawn logic.",
  ],
  faq: [
    {
      question: "Are GTA 6 collectible totals confirmed?",
      answer:
        "No. Map-6 shows expected category types and sample pins based on franchise history and trailer geography. Final counts, rewards, and Social Club challenge names will come from Rockstar at or after launch. We will update pages when official numbers ship.",
    },
    {
      question: "Do I need the interactive map for collectibles?",
      answer:
        "You can browse category pages for context, but completion routes are faster on /map with filters, measure tools, and shareable deep links. Category pages explain the loop; the map is where you execute it.",
    },
    {
      question: "Why are some collectible lists incomplete?",
      answer:
        "Because GTA 6 has not launched yet. Publishing a fake “all 100 packages” list would violate Map-6 editorial standards and AdSense/search quality expectations. We map what is responsible to publish and expand after release.",
    },
  ],
} as const;

export const COLLECTIBLE_TYPE_SEO: Record<string, CollectibleSeo> = {
  "hidden-packages": {
    slug: "hidden-packages",
    metaDescription:
      "GTA 6 hidden packages explained — how the classic collectible loop may return, where to look on Map-6, and how to track dockside & rooftop pins.",
    about: [
      "Hidden packages are the most recognizable Grand Theft Auto collectible: unmarked (or lightly marked) pickups that reward players who climb roofs, dive under piers, and poke behind destructible props. In GTA III through San Andreas and into later remasters, the package loop taught players to read verticality and shoreline clutter. For GTA 6, the community expects a spiritual successor even if Rockstar renames the item, changes the total, or folds it into a phone app challenge.",
      "Map-6 does not claim a confirmed package count. Trailer footage of Vice City docks, Ocean Drive hotels, and Port Gellhorn shipping yards suggests high density of prop clutter — historically fertile ground for package placement — but that is geographic reasoning, not a leak. Sample pins on this page are planning markers for those biomes, not a complete launch checklist.",
      "How to use Map-6 for packages: open the interactive map, filter Collectibles, focus Port Gellhorn and Vice City waterfront first, then Grassrivers boardwalks and Keys marinas. Share pins with `?loc=` deep links so co-op partners land on the same zoom. Measure tools help estimate walking loops between clusters without inventing in-game GPS routes Rockstar has not shown.",
      "Editorial caution: lists circulating on social media that claim “exact package #47 under the third crane” before launch are almost always fabricated or misread mods. Map-6 will only escalate sample pins to verified locations after the retail build exists. Until then, treat this page as a method guide plus a growing community-mapped set.",
      "Related reading: the Hidden Packages guide under /guides goes deeper on franchise history and completion strategy. Regional pages for Port Gellhorn and Ocean Drive explain why those districts historically hide shoreline collectibles. When Rockstar publishes official totals, we will revise the mapped counter on this page and the collectibles hub.",
      "Accessibility tip for streamers: use Map-6 streamer theme and overlay URLs so chat can call out package candidates without covering gameplay. Tag shares with `?ref=` if you want attribution on return visits.",
    ],
    howToTrack: [
      "Prioritize docks, rooftops, and alley clutter in Vice City & Port Gellhorn.",
      "Mark cleared pins with Map-6’s local progress checklist (browser save, unlimited) — shared pins stay public.",
      "Re-scan areas after story missions that open new interiors or restricted zones.",
      "Cross-check GTADB community landmarks for newly tagged props after trailers.",
    ],
    faq: [
      {
        question: "Will hidden packages return in GTA 6?",
        answer:
          "Rockstar has not confirmed the name or count. Franchise history and completionist design make a package-like loop likely, but Map-6 labels this as expectation, not confirmation. We will update when official details ship.",
      },
      {
        question: "Where should I start looking?",
        answer:
          "Trailer-heavy waterfronts: Vice City beachfront, Port Gellhorn yards, and Keys marinas. Use /map Collectibles filter and Port Gellhorn / Ocean Drive location guides for regional context.",
      },
      {
        question: "Are Map-6 package pins complete?",
        answer:
          "No. Pre-launch pins are samples and community-mapped candidates. A complete list requires the shipping game. Incomplete lists beat fake “100%” spreadsheets for long-term trust.",
      },
    ],
  },
  "stunt-jumps": {
    slug: "stunt-jumps",
    metaDescription:
      "GTA 6 stunt jumps guide — how jump challenges usually work, Vice City ramp logic, and tracking jumps on the Map-6 interactive map.",
    about: [
      "Stunt jumps reward precise vehicle launches off ramps, broken overpasses, pier lips, and construction gaps. In prior GTA titles, completing the jump set was a core 100% requirement and a natural streaming set piece. GTA 6’s denser vertical city and multi-level highways — visible in trailers — make jump challenges a strong design candidate again, though Rockstar has not published a final ramp list.",
      "Map-6 tracks jump candidates as Collectibles-category pins with region tags. Sample entries near Ocean Drive illustrate beachfront parking-structure launches typical of Miami-inspired verticality. Expect additional candidates around downtown Vice City parking decks, Keys bridges, and Port Gellhorn industrial slopes once the community can drive the retail map.",
      "Practical approach: learn one district at a time. Clear Ocean Drive / downtown Vice City first while you still know the skyline from trailers, then expand to Port Gellhorn and wilderness dirt ramps. Use Map-6 measure tools to estimate run-up distances when planning clip routes for TikTok or Kick — without claiming those distances are official in-game challenge metrics.",
      "Vehicles matter historically: sports cars for short pier jumps, off-roaders for wilderness ramps, motorcycles for tight alley launches. Until Rockstar confirms vehicle classes for each jump, treat vehicle advice as franchise-based tips. Map-6 will not invent “required vehicle” fields before launch.",
      "Creators: pair jump hunts with Map-6 clip kit deep links so viewers can open the same ramp pin. Streamer theme enlarges labels for camera readability. Overlay mode keeps the map chrome-free beside gameplay.",
      "After launch, verify each pin in-game; community maps sometimes misplace a ramp by a block when working from pause-menu screenshots. Report mismatches via your usual Map-6 feedback channel once we publish a corrections workflow.",
    ],
    howToTrack: [
      "Filter Collectibles on /map and scan beachfront + highway overpasses.",
      "Save Share links for incomplete jumps between sessions.",
      "Practice run-ups in free roam before attempting completionist runs.",
      "Film failures — landing zones often reveal better approach angles.",
    ],
    faq: [
      {
        question: "How many stunt jumps will GTA 6 have?",
        answer:
          "Unknown. Map-6 lists an expected planning total as a placeholder. Prior games varied widely; Rockstar’s final number will replace our placeholder after launch.",
      },
      {
        question: "Do jumps require specific cars?",
        answer:
          "Not confirmed for GTA 6. Historically, some jumps favored bikes or sports cars. We will only mark required classes when the retail game (or Rockstar documentation) says so.",
      },
    ],
  },
  "street-art": {
    slug: "street-art",
    metaDescription:
      "GTA 6 street art & murals — photo-style collectibles, Vice City graffiti culture, and Map-6 pins for mural hunting.",
    about: [
      "Street art collectibles usually ask players to find murals, tags, or gallery pieces and photograph or “capture” them for a completion counter. Vice City’s trailer aesthetic — neon, political satire, coastal murals — makes graffiti and large-format wall art a natural fit. Rockstar has not confirmed a street-art challenge name or count for GTA 6; Map-6 prepares the category because it matches both franchise precedent and the city’s visual language.",
      "Sample mural pins emphasize warehouse walls and alley exposures in denser Vice City blocks. Real Miami and Miami Beach have long mural traditions; Rockstar’s satire often remixes that culture. Expect community mappers to tag additional walls as more trailer stills and, later, in-game screenshots circulate.",
      "On Map-6, treat street art as a photography loop: navigate, frame, capture, share. Use deep links when collaborating with friends who specialize in “find the mural” content. Pair with Ocean Drive and Vice City regional guides for district context.",
      "Do not trust “complete mural lists” sold as datamines before launch. Map-6 will grow verified art pins only when locations can be reproduced in the shipping build or clearly identified in official media with enough geographic confidence.",
      "Accessibility: high-contrast neon theme helps locate pins on OLED capture cards. Overlay URLs keep the map usable beside console footage for mural hunts.",
    ],
    howToTrack: [
      "Browse Collectibles → Street Art on /map.",
      "Check alley walls behind Ocean Drive hotels and warehouse districts.",
      "Screenshot in-game finds and compare against Map-6 pins after launch.",
      "Read Vice City location SEO pages for district orientation.",
    ],
    faq: [
      {
        question: "Is street art confirmed for GTA 6?",
        answer:
          "Not as a named challenge. The category is prepared from franchise patterns and Vice City’s mural-friendly aesthetic. Official confirmation will update this page.",
      },
      {
        question: "Do I need a camera weapon or phone app?",
        answer:
          "Unknown until launch. Prior Rockstar titles used phone cameras or dedicated photo modes. Map-6 will document the actual capture method when it ships.",
      },
    ],
  },
  wildlife: {
    slug: "wildlife",
    metaDescription:
      "GTA 6 wildlife photography — Grassrivers animals, Keys coast species, and Map-6 tracking for nature photo challenges.",
    about: [
      "Wildlife photography challenges ask players to find animals in specific biomes and capture photos for a completion set. GTA 6’s Leonida state — Everglades-inspired Grassrivers, Keys islands, northern wilderness around Mount Kalaga — is built for that loop. Trailers have shown alligators and dense wetlands; Rockstar has not published a wildlife checklist.",
      "Map-6’s wildlife pins start in Grassrivers because that region’s ecology is the clearest trailer signal. Ambrosia Island and Leonida Keys may host coastal birds and marine life; Mount Kalaga suggests forest mammals. All of that is biome inference, clearly labeled as such.",
      "Completionists should combine wildlife filters with time-of-day experimentation after launch — many Rockstar photo challenges are diurnal. Pre-launch, use Map-6 to learn wetland geography so you are not learning the map and the animals on the same day.",
      "Ethics note for real-world readers: Map-6 discusses fictional animals in a video game. Do not harass wildlife in real Florida wetlands because a game map mentioned alligators.",
      "Related hubs: Grassrivers and Mount Kalaga location pages plus the beginner map guide. Share wildlife pins carefully — spoiling rare spawns can annoy co-op partners; use private Discord links if needed.",
    ],
    howToTrack: [
      "Filter Collectibles on /map and focus Grassrivers first.",
      "Read Grassrivers / Mount Kalaga guides for biome context.",
      "After launch, note time-of-day for each successful photo.",
      "Update personal checklists; Map-6 shared pins are not per-player saves.",
    ],
    faq: [
      {
        question: "Which animals appear in GTA 6?",
        answer:
          "Trailers confirm wetland wildlife including alligators. A full species list is not official. Map-6 will expand species pins when Rockstar or the retail game provides them.",
      },
      {
        question: "Is wildlife photography required for 100%?",
        answer:
          "Unknown. Some Rockstar games gate 100% behind photo sets; others keep them optional. We will mark requirement status after launch documentation exists.",
      },
    ],
  },
};

export function getCollectibleTypeSeo(slug: string): CollectibleSeo | undefined {
  return COLLECTIBLE_TYPE_SEO[slug];
}
