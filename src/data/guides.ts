export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: "beginner" | "exploration" | "collectibles" | "lore";
  readTime: number;
  publishedAt: string;
  content: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "gta-6-preorder-guide",
    title: "GTA 6 Pre-Order Guide — PS5, Xbox & Collector's Edition",
    description:
      "Where to pre-order GTA 6 on Amazon: Standard and Collector's editions for PS5 and Xbox, plus hardware picks for launch day.",
    category: "beginner",
    readTime: 7,
    publishedAt: "2026-07-27",
    content: [
      "Grand Theft Auto VI launches November 19, 2026 on PS5 and Xbox Series X|S.",
      "This guide lists Amazon product slots ready for your SiteStripe affiliate ASINs.",
    ],
  },
  {
    slug: "gta-6-map-cities-skylines-2",
    title: "GTA 6 Map in Cities: Skylines II — Explore Leonida in 3D",
    description:
      "A fan rebuilt Vice City, the Keys, and Port Gellhorn in Cities: Skylines II (map ID 153426). How to load it, and how Map-6 complements the 3D walkthrough.",
    category: "exploration",
    readTime: 6,
    publishedAt: "2026-08-05",
    content: [
      "Fan Noasden rebuilt the community-estimated Leonida map in Cities: Skylines II (~145 hours, map ID 153426).",
      "Map-6 remains the web map for POIs and collectibles; CS2 offers a street-level 3D feel.",
    ],
  },
  {
    slug: "gta-6-map-guide",
    title: "GTA 6 Interactive Map — Complete Beginner's Guide",
    description:
      "Learn how to use the Map-6 interactive map to explore Vice City, track coordinates, and find every collectible.",
    category: "beginner",
    readTime: 12,
    publishedAt: "2026-07-01",
    content: [
      "Map-6 is a free interactive map for Grand Theft Auto VI’s open world — Vice City, the Leonida Keys, Port Gellhorn, the Grassrivers, Ambrosia Island, and the surrounding highways that stitch those regions together. Whether you are watching trailers frame-by-frame or planning a launch-day checklist, this guide walks through every tool on the map so you can find landmarks fast and share precise spots with friends.",
      "Start at /map (or your locale path such as /en/map). The canvas fills the screen so you can pan and zoom without clutter. A left sidebar lists searchable points of interest; category filters let you isolate landmarks, collectibles, shops, missions, and secrets. Tap a result to fly the camera to that pin and open a short summary before you jump to the full location page.",
      "Coordinates matter once the community starts dumping finds. The status HUD shows map X/Y in the same space Map-6 uses across the site. Copy those numbers when you screenshot a trailer angle or Discord tip, then paste them back later to re-center. Coordinates stay in your browser session — we do not upload your browsing path for ads targeting (see the Privacy Policy).",
      "Use filters aggressively. Trailer hunting is noisy: neon hotels, swamp boardwalks, and industrial cranes can look similar at a glance. Filtering to Landmarks while you scrub Ocean Drive footage keeps the pin cloud readable. Switch to Collectibles when you are building a 100% route, or Secrets when you are chasing rumor pins that still need confirmation.",
      "Every major pin links to a dedicated location page under /locations. Regional hubs such as Vice City and Ocean Drive include longer “About” write-ups, what to find on the ground, and FAQs aimed at searchers who land from Google rather than the map itself. Those pages also deep-link back into the interactive map so you never lose spatial context.",
      "Collectibles live both on the map and in the /collectibles hub. Types are grouped so you can study a single category — for example hidden packages — then return to the map with that mental model. Our hidden-packages guide explains what Rockstar has historically done with these pickups and what Map-6 will track when launch data lands.",
      "Before Trailer 3 or any Newswire drop, open the map, set Landmarks, and scan the Vice City shoreline, the Keys causeways, and the Port Gellhorn industrial edge. Pause new footage on neon strips, skyline silhouettes, and wetland transitions, then match them against pins you already bookmarked. That workflow is faster than scrolling social feeds alone.",
      "Map-6 uses community cartography (including GTADB assets under CC BY 4.0 where noted) and editorial location pages we maintain ourselves. We label speculation clearly: confirmed trailer geography stays in the indexable regional set; bulk auto-imported POIs that lack unique prose are held out of the sitemap so Google focuses on pages that actually help readers.",
      "For hardware and editions, pair this map guide with the GTA 6 pre-order guide (PS5, Xbox, collector options). For a street-level 3D feel of the same geography, see our Cities: Skylines II fan-map article (Steam map ID 153426) — complementary, not a replacement for the web map’s POI database.",
      "Mobile tip: landscape mode gives you more map, while the sidebar collapses into a sheet so filters stay reachable. If the map feels heavy on a low-end phone, zoom out one level and clear Collectibles until you need them — fewer markers means smoother panning.",
      "What we update after each official reveal: new landmark pins, revised region blurbs, news posts under /news, and cross-links from guides. Bookmark Map-6 now so launch week is a checklist, not a scavenger hunt through bookmarks folders.",
      "Ready to explore? Open the interactive map, filter to the category you care about, and save the location URLs that match your trailer notes. When Rockstar drops new footage, you already know where to look.",
    ],
  },
  {
    slug: "vice-city-locations",
    title: "Vice City — Every Known Location in GTA 6",
    description:
      "A region-by-region breakdown of Vice City: Ocean Drive, Little Vice, the beachfront, and downtown high-rises confirmed from trailers.",
    category: "exploration",
    readTime: 14,
    publishedAt: "2026-07-05",
    content: [
      "Vice City returns as the cultural and visual center of Grand Theft Auto VI — Rockstar’s fictional reimagining of Miami’s beaches, art deco strips, and towered downtown. On Map-6, Vice City is both a regional hub page and a cluster of pins you can filter while watching trailers. This guide organizes what is reasonably confirmed from official footage versus what remains community inference, and points you to the interactive map for spatial context.",
      "Ocean Drive is the postcard. Neon hotel façades, palm-lined asphalt, and beachfront nightlife dominate Trailer 1 and Trailer 2 stills. Expect tourism-facing businesses, photo ops, and high foot traffic once the game ships. Our Ocean Drive location page expands on what to look for and links straight back into the map centered on that strip.",
      "Little Vice and the inland blocks provide contrast: denser housing, street art, warehouses, and the kind of alleys Rockstar loves for mid-game missions. Trailer framing often cuts from glassy oceanfront to tighter streets within a few seconds — that rhythm is intentional. When you scrub footage, note transitions between pastel hotels and concrete overpasses; those cuts often reveal how districts connect.",
      "Downtown high-rises sell the skyline. Glass towers, elevated freeways, and evening light make Vice City feel larger than a beach town. Use the map’s Landmarks filter and zoom out until the coastal arc and inland grid both fit on screen — that overview helps you place a random trailer shot relative to the Keys causeways to the south.",
      "The beachfront itself is not just sand: piers, parking decks, and stunt-friendly ramps appear in community discussion of classic GTA traversal. We mark shoreline POIs as they become visually confirmed. If you are hunting collectible rumor spots, shoreline edges and pier undersides are historically rich in the series — treat that as pattern recognition, not a spoiler.",
      "Causeways and bridges matter. Vice City does not float in isolation; roads toward the Leonida Keys and further state geography are part of how players will route missions and side content. On Map-6, follow the coastal roads south and east from Vice City pins to see how the Keys and wetland approaches sit relative to the city.",
      "How to use this with the interactive map: open /map, filter Landmarks, search “Vice” or “Ocean”, then open each pin’s page for longer prose. Cross-check with the beginner map guide if you are new to coordinates and filters. For a 3D street-level wander of a fan-built Leonida, the Cities: Skylines II guide (map ID 153426) is a useful companion — still unofficial, still complementary.",
      "What we will not invent: exact store names, mission order, or “100% confirmed” interiors that Rockstar has not shown. AdSense and search quality both punish fake leak pages. When a claim is rumor, our news posts say so; when a landmark is clearly visible in an official trailer, it earns a pin and a regional blurb.",
      "Related reading on Map-6: the regional Vice City and Ocean Drive location pages, the Leonida lore overview for state-wide geography, and the release-date news article if you are timing a preorder. Keep this guide bookmarked — we revise section by section as Rockstar releases new official media.",
      "Practical trailer workflow: (1) pause on a neon hotel or tower silhouette, (2) match the skyline curve on Map-6, (3) drop a note with X/Y from the HUD, (4) revisit after the next Newswire. That loop beats scrolling twenty Discord servers for the same screenshot with worse metadata.",
      "Vice City will keep evolving between now and November 19, 2026. Map-6’s job is to stay the calm, filterable layer on top of the noise — confirmed geography first, speculation labeled, and always one click back to the live map.",
    ],
  },
  {
    slug: "hidden-packages-gta-6",
    title: "Hidden Packages in GTA 6 — What We Know So Far",
    description:
      "Will hidden packages return in GTA 6? Everything we know about classic collectibles so far.",
    category: "collectibles",
    readTime: 11,
    publishedAt: "2026-07-10",
    content: [
      "Hidden packages are one of the most recognizable collectible loops in Grand Theft Auto history. From the 3D-era cities through GTA V’s various pickup types, Rockstar has repeatedly rewarded players who climb rooftops, dive under piers, and poke behind destructible props. For GTA 6, the community expects a spiritual successor — even if the exact name, count, and rewards are not fully public yet.",
      "What is confirmed versus assumed: Rockstar has emphasized exploration and a denser living world in official marketing for Grand Theft Auto VI. Exact package counts, icons, and reward tables are not something Map-sales pages should invent. We track community datamines and trailer props carefully, but we will not publish a fake “all 120 locations” list before launch-quality evidence exists.",
      "Historical pattern recognition (useful, not gospel): packages and similar pickups often sit at vertical extremes — rooftops, crane tops, underwater shelves — or behind traversal puzzles. Shorelines, islands, and industrial yards are frequent homes. On Map-6, those geographies already have regional pages: Vice City beachfront, Leonida Keys, Port Gellhorn yards, Grassrivers wetlands, and Ambrosia Island exclusivity.",
      "How Map-6 will track them: collectible types appear in the /collectibles hub and as filterable categories on the interactive map. When a package (or its GTA 6 equivalent) is visually or data-confirmed, it gets a pin, a short description, and a linkable slug. Bulk unverified dumps stay out of the indexable set so searchers are not flooded with empty stubs.",
      "Rewards speculation belongs in a clearly labeled box. Past games have used collectibles for weapons, outfits, property discounts, or completion percentage. GTA 6 may mix single-player rewards with Social Club challenges. Until Rockstar or a credible datamine with sources says otherwise, treat any “unlock the rocket car by package #47” claim as rumor.",
      "Trailer hunting tips for collectible prep: when new footage drops, pause on rooftops, alley dumpsters, pier pylons, and swamp shacks. Mark the approximate area on Map-6 with a nearby landmark pin and a note of the trailer timestamp. After launch, convert those notes into real package pins as the community verifies them.",
      "Pair this guide with the beginner interactive map guide (filters + coordinates) and the Vice City locations guide (district context). If you want a 3D stroll while planning routes, the Cities: Skylines II Leonida rebuild (Steam map ID 153426) can help you visualize street canyons — just remember it is a fan project, not Rockstar’s game.",
      "Accessibility and session planning: collectible runs are marathon content. Use Map-6 filters to clear everything except Collectibles, zoom to one region (for example the Keys), and clear that band before moving inland. Sharing X/Y with co-op friends keeps the checklist honest.",
      "Editorial promise: we update this page when Rockstar confirms mechanics or when reputable mapping communities publish reproducible locations. We do not sell “leak packs.” Ads on Map-6 fund the site; they do not change how we label uncertainty.",
      "Next steps: open the collectibles hub, skim regional location pages for terrain types that historically hide pickups, and bookmark the interactive map. When launch week hits, you will already know how to filter, copy coordinates, and log finds without rebuilding your workflow from scratch.",
    ],
  },
  {
    slug: "leonida-lore-overview",
    title: "GTA 6 World — Lore & Geography Overview",
    description:
      "From Ambrosia Island to Mount Kalaga: understand the geography and fiction of GTA 6's Leonida setting.",
    category: "lore",
    readTime: 13,
    publishedAt: "2026-07-12",
    content: [
      "Leonida is Rockstar’s fictional stand-in for a Florida-shaped state: beaches and nightlife, swamp country, industrial ports, tourist kitsch, and wealth gated behind bridges. Understanding that geography makes trailers easier to parse and makes Map-6 more than a pin dump — it becomes a mental model of how the open world is supposed to feel.",
      "Vice City is the flagship metro: art deco hotels, neon strips, beaches, and a modern skyline. It carries the series’ nostalgia for the 1980s Vice City setting while updating the look for a contemporary South Florida vibe. Our Vice City guide and regional page go deeper on districts; this overview places the city inside the wider state.",
      "Ocean Drive is the tourist spine — the strip you show a friend who has never watched a trailer. It is not the whole city, but it is the shorthand. Map-6 treats it as its own location hub because searchers and trailer scrubbers both land there first.",
      "The Leonida Keys stretch the fantasy southward: causeways, smaller islands, fishing culture, and the sense that getting anywhere takes commitment. Trailer glimpses of bridges and water crossings matter for chase fantasy as much as for sightseeing. On the map, follow the coastal chain from Vice City outward to see how travel time might feel.",
      "Port Gellhorn represents the working coast — shipping, industry, and the logistics side of a state that also sells paradise postcards. Expect denser vertical clutter: cranes, yards, warehouses. It is a natural home for smuggling fantasy and late-game infrastructure missions, even before specific scripts are public.",
      "The Grassrivers channel Everglades energy: wetlands, airboats, wildlife, and roads that refuse to stay straight. Visually, trailer grass and water transitions are clues you are no longer in downtown. Use Map-6’s regional page when you need prose; use the interactive map when you need to see how wetlands sit relative to highways.",
      "Ambrosia Island is the exclusivity node — private wealth, manicured shores, and the social distance Rockstar loves to satirize. Think Fisher Island / Star Island energy without claiming a 1:1 real-world clone. Story and heist fantasy often orbit places like this; map pins help you remember where the money lives on the board.",
      "Mount Kalaga is Leonida’s northern wilderness frontier — forests, rivers, and canyons with a hunting-country feel. Rockstar has named it among the six destinations; exact borders remain estimated. Map-6 gives it a regional hub and a deep-linkable map focus (`?loc=mount-kalaga`).",
      "Lore versus marketing: Rockstar sells tone — satire, heat, humidity, crime as entertainment — more than a wiki-ready timeline in every trailer. Map-6’s lore pages stay grounded in geography and confirmed visuals. For dated claims (release window, platforms), prefer our news articles that cite Rockstar’s official channels.",
      "How to explore with Map-6: open the locations index, read one regional page, then jump to /map filtered to Landmarks for that area. Alternate with the Cities: Skylines II fan rebuild if you want a 3D skim of streets; come back to Map-6 for POIs, collectibles planning, and shareable coordinates.",
      "Pre-launch study plan: (1) Vice City + Ocean Drive for urban reads, (2) Keys + Grassrivers for traversal and wetlands, (3) Port Gellhorn + Ambrosia for industrial vs elite contrast, (4) Mount Kalaga for the north frontier, (5) collectibles guide for pickup theory.",
      "We will revise this overview as Rockstar names more districts or shows new biomes. Until then, treat Leonida as a Florida-shaped playground with sharp class and climate contrasts — and keep Map-6 open while you watch.",
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: Guide["category"]) {
  return GUIDES.filter((g) => g.category === category);
}
