import type { HubEntity, HubSource } from "./types";

const OFFICIAL_VI: HubSource = {
  label: "Grand Theft Auto VI — Rockstar Games",
  url: "https://www.rockstargames.com/VI",
  date: "2025-05-06",
};

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

export const CHARACTERS: HubEntity[] = [
  {
    slug: "lucia-caminos",
    name: "Lucia Caminos",
    kind: "character",
    summary:
      "Confirmed GTA 6 protagonist. Rockstar’s official biography places her fresh out of the Leonida Penitentiary, planning a smarter path through Vice City with Jason Duval.",
    body: [
      "Lucia Caminos is one of the two confirmed playable protagonists of Grand Theft Auto VI. Rockstar Games names her on the official GTA VI site and features her throughout the first and second trailers as Jason’s partner.",
      "The official bio is short and specific. Her father taught her to fight; fighting for her family landed her in the Leonida Penitentiary; sheer luck got her out. She wants the good life her mother has dreamed of since their days in Liberty City — and she intends to take it into her own hands.",
      "Rockstar frames her as freshly released and committed to “only smart moves from here.” A life with Jason is presented as a possible way out, not as a finished plot. Map-6 does not invent prison-sentence lengths, mission titles, or a switch-mechanic explanation Rockstar has not published.",
      "Official trailers show Lucia in Vice City nightlife, rural Leonida, and the prison-release opening that Trailer 2 returns to. Those frames confirm presence and tone. They do not confirm a full character arc, romance outcome, or ending.",
      "This page cites Rockstar’s own GTA VI character copy and Newswire trailer posts only. Community leak names, datamined attributes, and unofficial “Lucia build” lists stay off Map-6 until Rockstar publishes them.",
    ],
    sources: [
      {
        label: "Lucia Caminos — Rockstar Games",
        url: "https://www.rockstargames.com/VI/lucia",
        date: "2025-05-06",
      },
      OFFICIAL_VI,
      TRAILER_1,
      TRAILER_2,
    ],
    confidence: "confirmed",
  },
  {
    slug: "jason-duval",
    name: "Jason Duval",
    kind: "character",
    summary:
      "Confirmed GTA 6 protagonist. Rockstar describes a Keys hustler with an Army past, now tied to Lucia Caminos and unsure whether that bond will save him or sink him.",
    body: [
      "Jason Duval is the other confirmed playable protagonist of Grand Theft Auto VI. Rockstar publishes his full name and biography on the official GTA VI site and centers Trailer 2 on the pair’s criminal partnership.",
      "The official copy is spare. He grew up around grifters and crooks, did a stint in the Army after troubled teens, then ended up in the Leonida Keys working for local drug runners. Rockstar says it might be time to try something new — without listing employers, ranks, or a rap sheet.",
      "On Lucia, Rockstar is deliberately unresolved: meeting her “could be the best or worst thing to ever happen to him.” Map-6 will not turn that line into a betrayal theory, a marriage plot, or a GTA V-style switch tutorial. Those details are unconfirmed.",
      "Trailers show Jason in the Keys, on the road with Lucia, and in Vice City set pieces. That is evidence of setting and pairing. It is not a vehicle roster in his name, a safehouse address, or a skill tree.",
      "Use this entry as a sourced stub: who Rockstar named, what Rockstar wrote, and which official videos put him on screen. When Newswire or rockstargames.com/VI add more, this page should grow. Until then, the honest list stays short.",
    ],
    sources: [
      {
        label: "Jason Duval — Rockstar Games",
        url: "https://www.rockstargames.com/VI/jason",
        date: "2025-05-06",
      },
      OFFICIAL_VI,
      TRAILER_2,
    ],
    confidence: "confirmed",
  },
  {
    slug: "boobie-ike",
    name: "Boobie Ike",
    kind: "character",
    summary:
      "Supporting character named on Rockstar’s official GTA VI site: a Vice City figure with a public-facing empire and a music-business partnership.",
    body: [
      "Boobie Ike is named on rockstargames.com/VI with an official biography. That is enough for a confirmed supporting entry. Map-6 does not promote fan-cast lists or leak-derived “crew” charts that Rockstar has not published.",
      "Rockstar calls him a local Vice City legend who turned time in the streets into a legitimate-looking empire spanning real estate, a strip club, and a recording studio. The site’s own line is that he is all smiles until it is time to talk business.",
      "The official copy also ties him to a music partnership with Dre’Quan for Only Raw Records — they “just need a hit.” Map-6 records that relationship because Rockstar wrote it. We do not invent track lists, club names beyond what Rockstar printed, or mission involvement.",
      "Trailer 2 and the official site place this Vice City music/nightlife circle on screen. Treat those appearances as confirmation that the character exists in marketing, not as a complete gameplay role. If Rockstar later publishes more, the sources list below is where new citations belong.",
    ],
    sources: [OFFICIAL_VI, TRAILER_2],
    confidence: "confirmed",
  },
  {
    slug: "cal-hampton",
    name: "Cal Hampton",
    kind: "character",
    summary:
      "Supporting character named on Rockstar’s official GTA VI site: Jason’s friend, an associate of Brian’s, written as a paranoid homebody in the Keys orbit.",
    body: [
      "Cal Hampton appears with a named biography on Rockstar’s official Grand Theft Auto VI site. That public first-party page is the reason he is in this encyclopedia. Unnamed extras in trailer frames are not.",
      "Rockstar’s copy is specific and small. Cal is Jason’s friend and a fellow associate of Brian’s. He feels safest hanging at home, snooping on Coast Guard comms with a few beers and private browser tabs open. Casual paranoia “loves company,” while Jason has bigger plans.",
      "The official site also gives him two quoted lines about birds in formation and psychopaths in charge. Those are flavor. They are not a confirmed conspiracy mission, a radio show, or a skill. Map-6 will not inflate a bio paragraph into a faction.",
      "Because Rockstar published the name and the relationship to Jason and Brian, confidence is confirmed — not “maybe from a paused frame.” We still skip stats, ages, and last-seen locations that do not appear on rockstargames.com/VI or Newswire.",
    ],
    sources: [OFFICIAL_VI, TRAILER_2],
    confidence: "confirmed",
  },
];
