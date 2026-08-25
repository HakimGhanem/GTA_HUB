import type { HubEntity, HubSource } from "./types";

const TRAILER_1: HubSource = {
  label: "Grand Theft Auto VI — Watch Trailer 1 Now (Newswire)",
  url: "https://www.rockstargames.com/newswire/article/8978kok9385a82/grand-theft-auto-vi-watch-trailer-1-now",
  date: "2023-12-04",
};

const TRAILER_2: HubSource = {
  label: "Grand Theft Auto VI — Watch Trailer 2 Now (Newswire)",
  url: "https://www.rockstargames.com/newswire/article/3928aaa9471o3a/grand-theft-auto-vi-watch-trailer-2-now",
  date: "2025-05-06",
};

const OFFICIAL_VI: HubSource = {
  label: "Grand Theft Auto VI — Rockstar Games",
  url: "https://www.rockstargames.com/VI",
  date: "2025-05-06",
};

export const VEHICLES: HubEntity[] = [
  {
    slug: "convertible",
    name: "Convertible",
    kind: "vehicle",
    summary:
      "Trailer-visible type — open-top cars on Vice City beachfronts and nightlife strips. Not an official in-game model name.",
    body: [
      "Official GTA 6 trailers show convertibles on neon beachfront roads that match Vice City / Ocean Drive marketing. The type is on screen. Rockstar has not published a manufacturer, handling sheet, or dealership list for those frames.",
      "Map-6 labels this entry “convertible” on purpose. Fan wikis often assign returning GTA brand names from silhouettes. Those matches can be useful for screenshot hunting; they are not first-party names unless Rockstar prints them on Newswire or rockstargames.com/VI.",
      "What trailers do establish is tone: open-top traffic is part of Leonida’s tourism fantasy — palm-lined strips, night driving, and crowded promenades. That is geography and mood, not a spawn table.",
      "No top speed, class, or customization tree is listed here. When Rockstar names a specific convertible in official copy, this row should be replaced or split. Until then, treat it as a trailer-visible type you can look for while you scrub footage on the map.",
    ],
    sources: [TRAILER_1, TRAILER_2, OFFICIAL_VI],
    confidence: "trailer",
  },
  {
    slug: "police-cruiser",
    name: "Police cruiser",
    kind: "vehicle",
    summary:
      "Trailer-visible type — marked police cars in urban and pursuit footage. Generic label; not a published in-game unit name.",
    body: [
      "Official trailers include marked police cruisers in Vice City and chase sequences. Lights, livery, and pursuit framing are visible. Rockstar has not posted a GTA 6 police-vehicle roster, radio codes, or wanted-level rules.",
      "This page does not guess Vapid / Buffalo / Stanier identities from body lines. Community matching is a separate hobby. Map-6 only records that a police-cruiser type appears in official video.",
      "Trailers also imply a living law-enforcement presence — cruisers in traffic, not a single prop car. That still is not a count of precincts, helicopter units, or water patrol, which belong on their own sourced rows if Rockstar shows them as named types.",
      "Use the interactive map to pin districts where trailer chases appear to take place. Do not treat a paused frame as a confirmed spawn or a leak of dispatch AI.",
    ],
    sources: [TRAILER_1, TRAILER_2],
    confidence: "trailer",
  },
  {
    slug: "quad-atv",
    name: "Quad / ATV",
    kind: "vehicle",
    summary:
      "Trailer-visible type — off-road quads and ATVs in rural and wetland-adjacent footage. No official model name or stats.",
    body: [
      "Official trailers show quad / ATV-class vehicles away from the neon strip — dirt, scrub, and inland Leonida rather than Ocean Drive traffic. The silhouette is clear enough to list the type. It is not clear enough to invent a manufacturer badge.",
      "Rockstar has not published off-road handling notes, a dirt-bike-versus-ATV catalog, or a “how many quads” number. Map-6 will not fill those blanks with GTA Online carry-over names.",
      "The type matters for map literacy: when footage leaves causeways for trails and wetlands, the vehicle language changes. That is why this row exists beside convertibles and cruisers — contrast, not a garage checklist.",
      "If a later Newswire or official site names a specific ATV, cite that URL here and upgrade the label. Until then, confidence stays trailer-visible.",
    ],
    sources: [TRAILER_1, TRAILER_2],
    confidence: "trailer",
  },
  {
    slug: "boat",
    name: "Boat",
    kind: "vehicle",
    summary:
      "Trailer-visible type — watercraft on Keys, coast, and wetland water. Generic “boat,” not a named yacht or airboat catalog.",
    body: [
      "Official trailers put boats on Leonida water: coastal runs, Keys-adjacent shots, and shallow wetland craft in Grassrivers-style channels. Water is part of the marketed map, not a rumor.",
      "Map-6 keeps one generic “boat” row instead of a fan marina list. Speedboats, skiffs, and airboat-like wetland hulls may all appear in official video; without Rockstar names, they stay under this type. We do not publish a yacht count or a jet-ski SKU.",
      "No top speed, docking system, or “how many slips in Port Gellhorn” figure is official. Those sentences belong in leak blogs. They do not belong here.",
      "When you match a trailer wake to a coastline on the map, you are doing geography. When you name the hull after a GTA V analog, you are guessing. This encyclopedia only does the first.",
    ],
    sources: [TRAILER_1, TRAILER_2, OFFICIAL_VI],
    confidence: "trailer",
  },
];
