import { locales } from "@/i18n/routing";

export type TrailerBeatCopy = { title: string; look: string };

export type TrailerCopy = {
  eyebrow: string;
  title: string;
  description: string;
  answerLabel: string;
  answer: string;
  intro: string;
  howTitle: string;
  howSteps: string[];
  beatsTitle: string;
  beatsIntro: string;
  estimateNotice: string;
  seekLabel: string;
  mapLinkLabel: string;
  noHubLabel: string;
  playLabel: string;
  privacyNote: string;
  watchOnYouTube: string;
  trailers: Record<string, { name: string; summary: string }>;
  beats: Record<string, TrailerBeatCopy>;
  rightsTitle: string;
  rightsBody: string;
  faqTitle: string;
  faq: { question: string; answer: string }[];
  ctaMap: string;
  ctaNews: string;
  backToNews: string;
};

const EN: TrailerCopy = {
  eyebrow: "Frame-by-frame map analysis",
  title: "GTA 6 Trailers — Timestamped Map Analysis",
  description:
    "Both official Grand Theft Auto VI trailers with a timestamped scrub list: what to pause on, and which Map-6 region each frame points to.",
  answerLabel: "Short answer",
  answer:
    "Rockstar has released two official Grand Theft Auto VI trailers: Trailer 1 on December 4, 2023 (1:31) and Trailer 2 on May 6, 2025 (2:47). This page plays both from the official Rockstar upload and pairs each map-relevant beat with the matching Map-6 region, so you can jump from a frame to the pin instead of scrolling Discord.",
  intro:
    "A trailer is only useful to a map project when someone writes down where each shot sits. That is what this page does: press a timestamp, watch the beat, then open the Map-6 hub it belongs to and compare the coastline, the causeways, or the crane silhouettes yourself. We never claim a district name Rockstar has not shown, and estimated geography stays labeled as an estimate.",
  howTitle: "How to scrub a trailer with Map-6",
  howSteps: [
    "Open the interactive map in a second tab and filter Landmarks — neon hotels, wet skylines, and industrial yards all blur together without a filter.",
    "Play a beat below, then pause on the first stable silhouette: rooflines, street curvature, and bridge counts survive colour grading better than pink saturation.",
    "Open the paired Map-6 hub and compare the frame against the pin. If it matches, copy the HUD X/Y into your notes with the timestamp.",
    "Hit Share on the map to copy a deep link that lands anyone on the same camera — that beats posting a blurry screenshot.",
    "When a frame does not match a hub, write it down as speculation. An honest gap is worth more than a forced pin.",
  ],
  beatsTitle: "Timestamped scrub list",
  beatsIntro:
    "Each entry jumps the player to that moment and links to the region it cross-references. Beats without a region are story or tone moments with no geography to place yet.",
  estimateNotice:
    "Timestamps are approximate and being verified frame by frame against the official uploads. Treat them as a starting point for your own scrub, not as citable frame numbers.",
  seekLabel: "Jump to {time}",
  mapLinkLabel: "Compare on the map",
  noHubLabel: "No region to place yet",
  playLabel: "Play {name} on YouTube's player",
  privacyNote:
    "Nothing loads from YouTube until you press play — no third-party request, no cookie, no tracking pixel before that click.",
  watchOnYouTube: "Watch on YouTube",
  trailers: {
    "trailer-1": {
      name: "Trailer 1",
      summary:
        "December 4, 2023 · 1:31 · The reveal. Vice City's postcard energy, the first look at Lucia, and a Florida-shaped state Rockstar calls Leonida.",
    },
    "trailer-2": {
      name: "Trailer 2",
      summary:
        "May 6, 2025 · 2:47 · Longer and far denser. More characters, more biomes, and the clearest read yet on how Leonida's regions connect.",
    },
  },
  beats: {
    "t1-beach-sunrise": {
      title: "Beachfront at first light",
      look: "Art deco facades, palm rows, and a wide beach strip — the Ocean Drive silhouette the whole marketing campaign leans on.",
    },
    "t1-lucia-interview": {
      title: "Lucia, in custody",
      look: "Interior scene with no exterior geography. Useful for tone and story, not for pins.",
    },
    "t1-store-gator": {
      title: "Alligator in a convenience store",
      look: "Flat swamp-adjacent sprawl and strip-mall retail — wetland energy rather than a Vice City block.",
    },
    "t1-causeway": {
      title: "Causeway and island chain",
      look: "Low bridges linking small islands. Count the spans: causeway geometry is the fastest way to tell the Keys from the mainland shore.",
    },
    "t1-industrial-edge": {
      title: "Cranes and yards",
      look: "Container stacks and gantry cranes. Industrial silhouettes read as the working edge of the state, far from the neon.",
    },
    "t1-downtown-dusk": {
      title: "Downtown skyline at dusk",
      look: "Glass towers and freeway curves. Zoom out until the coastal arc is visible to place the shot against the inland grid.",
    },
    "t2-stilt-house": {
      title: "Stilt house over water",
      look: "Shallow water, wooden decking, boats as transport. Placement depends on channel width — check it against the Keys before assuming mainland canals.",
    },
    "t2-prison-release": {
      title: "Prison release",
      look: "Institutional interiors and a parking lot. Story beat with no placeable landmark.",
    },
    "t2-ocean-drive-night": {
      title: "Neon strip after dark",
      look: "Hotel signage, crowds, wet asphalt reflections. Match the hotel roofline shapes rather than the colour of the neon.",
    },
    "t2-downtown-skyline": {
      title: "Dense skyline and freeways",
      look: "Tower cluster plus elevated roadway. This is the frame that tells you how far downtown sits from the waterfront.",
    },
    "t2-wetlands": {
      title: "Mangroves and airboats",
      look: "Grass-to-water transitions and shallow channels. Once the road stops being straight, you have left the city grid.",
    },
    "t2-gated-money": {
      title: "Gated mansions and yachts",
      look: "Walled frontages, private moorings, manicured planting. Wealth enclaves sit apart from the tourist strip by design.",
    },
    "t2-port-yard": {
      title: "Port and freight",
      look: "Cranes, warehousing, tank farms. Compare the waterline against the beach frames — same state, opposite economy.",
    },
    "t2-backcountry": {
      title: "Forest and elevation",
      look: "Tree cover, ridgelines, and actual altitude change — the clearest evidence Leonida is not flat coastline all the way through.",
    },
  },
  rightsTitle: "Why this page embeds rather than reuploads",
  rightsBody:
    "Both videos play from Rockstar Games' own YouTube upload through the official player, which is what framing a freely accessible video means: the rights holder controls the file, the view count, and can pull it at any time. Map-6 never downloads, mirrors, or reposts a trailer or its frames, and never overlays anything on the player. Map-6 is an unofficial fan project with no affiliation to Rockstar Games or Take-Two Interactive. Grand Theft Auto and all related marks belong to their owners.",
  faqTitle: "FAQ",
  faq: [
    {
      question: "How many official GTA 6 trailers are there?",
      answer:
        "Two. Trailer 1 arrived on December 4, 2023 and runs 1:31. Trailer 2 arrived on May 6, 2025 and runs 2:47. Anything else circulating as 'Trailer 3' is unconfirmed unless Rockstar Newswire posts it.",
    },
    {
      question: "Are the timestamps on this page official?",
      answer:
        "No. They are our own scrub notes, currently labeled as approximate while we verify each one against the official uploads. Rockstar does not publish chapter markers for the trailers.",
    },
    {
      question: "Can I trust the region each beat is paired with?",
      answer:
        "Treat it as a research starting point. We pair a frame with a region when the terrain type is clearly visible, and we leave a beat unpaired rather than inventing a district name Rockstar has not shown.",
    },
    {
      question: "Why does the video only load after I click?",
      answer:
        "Because a YouTube iframe pulls a large amount of third-party JavaScript and would slow the page for everyone who came to read. Loading it on click keeps the page fast and sends no request to YouTube until you actually want to watch.",
    },
    {
      question: "Does the trailer tell us where collectibles are?",
      answer:
        "No. Trailers show geography, not pickup coordinates. Rooftops, piers, and swamp huts are historically good hiding places, but that is a pattern, not a spoiler — collectible pins only land on Map-6 once there is real evidence.",
    },
  ],
  ctaMap: "Open the interactive map",
  ctaNews: "Latest GTA 6 news",
  backToNews: "← All news",
};

const FR: TrailerCopy = {
  eyebrow: "Analyse carte image par image",
  title: "Trailers GTA 6 — Analyse carte horodatée",
  description:
    "Les deux trailers officiels de Grand Theft Auto VI avec une liste horodatée : quoi mettre en pause, et à quelle région Map-6 chaque plan correspond.",
  answerLabel: "Réponse courte",
  answer:
    "Rockstar a publié deux trailers officiels de Grand Theft Auto VI : le Trailer 1 le 4 décembre 2023 (1:31) et le Trailer 2 le 6 mai 2025 (2:47). Cette page lit les deux depuis l'upload officiel Rockstar et associe chaque plan utile à la région Map-6 correspondante, pour passer d'une image au pin sans scroller Discord.",
  intro:
    "Un trailer ne sert un projet cartographique que si quelqu'un note où se situe chaque plan. C'est le rôle de cette page : cliquez un timecode, regardez le passage, puis ouvrez le hub Map-6 correspondant et comparez vous-même le littoral, les causeways ou les silhouettes de grues. Nous n'affirmons jamais un nom de quartier que Rockstar n'a pas montré, et la géographie estimée reste étiquetée comme telle.",
  howTitle: "Comment scruter un trailer avec Map-6",
  howSteps: [
    "Ouvrez la carte interactive dans un second onglet et filtrez Landmarks — hôtels néon, skylines humides et zones industrielles se confondent sans filtre.",
    "Lancez un passage ci-dessous, puis mettez en pause sur la première silhouette stable : lignes de toit, courbure des rues et nombre de ponts résistent mieux à l'étalonnage que la saturation rose.",
    "Ouvrez le hub Map-6 associé et comparez l'image au pin. Si ça colle, copiez le X/Y du HUD dans vos notes avec le timecode.",
    "Utilisez Share sur la carte pour copier un deep link qui fait atterrir n'importe qui sur la même caméra — plus utile qu'une capture floue.",
    "Quand un plan ne correspond à aucun hub, notez-le comme spéculation. Un trou assumé vaut mieux qu'un pin forcé.",
  ],
  beatsTitle: "Liste horodatée",
  beatsIntro:
    "Chaque entrée avance le lecteur au moment indiqué et renvoie à la région recoupée. Les passages sans région sont des moments de récit ou de ton, sans géographie plaçable pour l'instant.",
  estimateNotice:
    "Les timecodes sont approximatifs et en cours de vérification image par image sur les uploads officiels. Traitez-les comme un point de départ pour votre propre scrub, pas comme des références citables.",
  seekLabel: "Aller à {time}",
  mapLinkLabel: "Comparer sur la carte",
  noHubLabel: "Aucune région à placer",
  playLabel: "Lire {name} dans le lecteur YouTube",
  privacyNote:
    "Rien n'est chargé depuis YouTube avant que vous appuyiez sur lecture — aucune requête tierce, aucun cookie, aucun pixel de suivi avant ce clic.",
  watchOnYouTube: "Voir sur YouTube",
  trailers: {
    "trailer-1": {
      name: "Trailer 1",
      summary:
        "4 décembre 2023 · 1:31 · La révélation. L'énergie carte postale de Vice City, la première apparition de Lucia, et un État en forme de Floride que Rockstar appelle Leonida.",
    },
    "trailer-2": {
      name: "Trailer 2",
      summary:
        "6 mai 2025 · 2:47 · Plus long et beaucoup plus dense. Plus de personnages, plus de biomes, et la lecture la plus claire à ce jour de la façon dont les régions de Leonida se connectent.",
    },
  },
  beats: {
    "t1-beach-sunrise": {
      title: "Front de mer au petit jour",
      look: "Façades art déco, alignements de palmiers, large bande de plage — la silhouette Ocean Drive sur laquelle repose toute la campagne marketing.",
    },
    "t1-lucia-interview": {
      title: "Lucia, en détention",
      look: "Scène d'intérieur sans géographie extérieure. Utile pour le ton et le récit, pas pour les pins.",
    },
    "t1-store-gator": {
      title: "Alligator dans une supérette",
      look: "Étalement plat en bordure de marais et commerce de bord de route — énergie zone humide plutôt que bloc de Vice City.",
    },
    "t1-causeway": {
      title: "Causeway et chaîne d'îles",
      look: "Ponts bas reliant de petites îles. Comptez les travées : la géométrie des causeways est le moyen le plus rapide de distinguer les Keys du littoral continental.",
    },
    "t1-industrial-edge": {
      title: "Grues et chantiers",
      look: "Piles de conteneurs et portiques. Les silhouettes industrielles se lisent comme le bord laborieux de l'État, loin du néon.",
    },
    "t1-downtown-dusk": {
      title: "Skyline du centre au crépuscule",
      look: "Tours de verre et courbes d'autoroute. Dézoomez jusqu'à voir l'arc côtier pour situer le plan face à la grille intérieure.",
    },
    "t2-stilt-house": {
      title: "Maison sur pilotis",
      look: "Eau peu profonde, terrasse en bois, bateaux comme moyen de transport. Le placement dépend de la largeur du chenal — vérifiez face aux Keys avant de supposer des canaux continentaux.",
    },
    "t2-prison-release": {
      title: "Sortie de prison",
      look: "Intérieurs institutionnels et parking. Moment de récit, aucun repère plaçable.",
    },
    "t2-ocean-drive-night": {
      title: "Strip néon de nuit",
      look: "Enseignes d'hôtels, foule, reflets sur asphalte mouillé. Comparez les formes de lignes de toit plutôt que la couleur du néon.",
    },
    "t2-downtown-skyline": {
      title: "Skyline dense et autoroutes",
      look: "Grappe de tours et voie surélevée. C'est le plan qui indique la distance entre le centre et le front de mer.",
    },
    "t2-wetlands": {
      title: "Mangroves et airboats",
      look: "Transitions herbe/eau et chenaux peu profonds. Dès que la route cesse d'être droite, vous avez quitté la grille urbaine.",
    },
    "t2-gated-money": {
      title: "Villas fermées et yachts",
      look: "Façades murées, mouillages privés, végétation taillée. Les enclaves de richesse sont volontairement à l'écart du strip touristique.",
    },
    "t2-port-yard": {
      title: "Port et fret",
      look: "Grues, entrepôts, réservoirs. Comparez la ligne d'eau à celle des plans de plage — même État, économie opposée.",
    },
    "t2-backcountry": {
      title: "Forêt et relief",
      look: "Couvert forestier, lignes de crête et vrai dénivelé — la preuve la plus claire que Leonida n'est pas un littoral plat de bout en bout.",
    },
  },
  rightsTitle: "Pourquoi cette page intègre au lieu de réhéberger",
  rightsBody:
    "Les deux vidéos sont lues depuis l'upload YouTube de Rockstar Games via le lecteur officiel : c'est ce que signifie encadrer une vidéo librement accessible — l'ayant droit garde le fichier, les vues, et peut la retirer à tout moment. Map-6 ne télécharge, ne copie et ne republie jamais un trailer ni ses images, et ne superpose rien au lecteur. Map-6 est un projet de fans non officiel, sans aucune affiliation avec Rockstar Games ou Take-Two Interactive. Grand Theft Auto et les marques associées appartiennent à leurs propriétaires.",
  faqTitle: "FAQ",
  faq: [
    {
      question: "Combien y a-t-il de trailers officiels GTA 6 ?",
      answer:
        "Deux. Le Trailer 1 est sorti le 4 décembre 2023 et dure 1:31. Le Trailer 2 est sorti le 6 mai 2025 et dure 2:47. Tout ce qui circule comme « Trailer 3 » n'est pas confirmé tant que Rockstar Newswire ne le publie pas.",
    },
    {
      question: "Les timecodes de cette page sont-ils officiels ?",
      answer:
        "Non. Ce sont nos propres notes de scrub, actuellement étiquetées comme approximatives le temps de les vérifier sur les uploads officiels. Rockstar ne publie pas de chapitres pour les trailers.",
    },
    {
      question: "Peut-on se fier à la région associée à chaque passage ?",
      answer:
        "Considérez-la comme un point de départ. Nous associons un plan à une région quand le type de terrain est clairement visible, et nous laissons un passage sans région plutôt que d'inventer un nom de quartier que Rockstar n'a pas montré.",
    },
    {
      question: "Pourquoi la vidéo ne se charge-t-elle qu'après un clic ?",
      answer:
        "Parce qu'une iframe YouTube tire une grande quantité de JavaScript tiers et ralentirait la page pour tous ceux qui viennent lire. Le chargement au clic garde la page rapide et n'envoie aucune requête à YouTube avant que vous vouliez réellement regarder.",
    },
    {
      question: "Le trailer révèle-t-il l'emplacement des collectibles ?",
      answer:
        "Non. Les trailers montrent de la géographie, pas des coordonnées de ramassage. Toits, jetées et cabanes de marais sont historiquement de bonnes cachettes, mais c'est un pattern, pas un spoiler — les pins collectibles n'arrivent sur Map-6 qu'avec de vraies preuves.",
    },
  ],
  ctaMap: "Ouvrir la carte interactive",
  ctaNews: "Dernières actus GTA 6",
  backToNews: "← Toutes les actus",
};

const BY_LOCALE: Record<string, TrailerCopy> = { en: EN, fr: FR };

export function getTrailerCopy(locale: string): TrailerCopy {
  return BY_LOCALE[locale] ?? EN;
}

export function hasTrailerTranslation(locale: string): boolean {
  return locale in BY_LOCALE;
}

export function trailerHreflangLocales(): string[] {
  return locales.filter(hasTrailerTranslation);
}
