/**
 * Collectibles copy for the hub and type pages, EN + FR. Every count comes from
 * the sources in `COLLECTIBLE_SOURCES` (in-game Progress menu as reported on
 * 18 Nov 2026). Map-6 is not affiliated with Rockstar.
 */

export type CollectibleSeo = {
  slug: string;
  metaDescription: string;
  about: string[];
  howToTrack: string[];
  faq: { question: string; answer: string }[];
};

type HubSeo = Omit<CollectibleSeo, "slug"> & { title: string };

const HUB_EN: HubSeo = {
  title: "GTA 6 100% Checklist & Collectibles — Every Total | Map-6",
  metaDescription:
    "GTA 6 100% completion checklist: every requirement and collectible total — 125 Cocaine Flamingos, 480 cards, 397 stunts, 255 animals. Tick them off as you play.",
  about: [
    "GTA 6 tracks its long tail in the Progress menu, and the 100% Completion checklist unlocks under Progress › Stats once the story is done. Progress made before that still counts, and nothing on the list is missable: everything can be finished in free roam after the credits.",
    "The checklist is lenient. PowerPyx calls it closer to 60% true completion: most collectible families only need part of the total (100 of 125 Cocaine Flamingos, 15 of 18 card sets, 300 of 397 stunts, 100 of 255 animals), and the only lists that demand everything are robberies, underwater discoveries, shooting ranges, drone trials and Bret’s target decks.",
    "There are no Hidden Packages in GTA 6. The pre-launch guides that promised 100 packages copied the system from GTA III and Vice City; the shipped game has none. The closest equivalent is the Cocaine Flamingo, which drops a cocaine package when you shoot it.",
    "Ticks on this page stay in your browser, with no account. Each collectible family links to its own page with the in-game tracking menu, the rules that trip people up, and the map.",
  ],
  howToTrack: [
    "Open Progress › Stats › 100% Completion after the story to see the official list.",
    "Progress › Collections shows each family; some only appear after you find the first item.",
    "Map › Exploration › Stunt Spots lists every stunt you have found and completed by name.",
    "Tick rows here as you go — they are saved in this browser only.",
  ],
  faq: [
    {
      question: "What do you need for 100% in GTA 6?",
      answer:
        "Finish the story, then clear the checklist under Progress › Stats › 100% Completion: robberies (22 bank jobs, 7 payday loans, 8 vaults, 34 of 35 smash ’n’ grabs, 50 of 91 stick ups), collections (100 of 125 flamingos, 15 of 18 card sets, 100 WAiNK scans, all 33 underwater discoveries, 30 of 34 magazines, 15 of 18 meditations), 300 of 397 stunts, 70 of 80 challenges, 200 of 277 vehicle scans, 50 of 66 weapons and 100 of 255 animals.",
    },
    {
      question: "Is anything missable for 100% in GTA 6?",
      answer:
        "No. According to PowerPyx, every requirement can still be done in free roam after the story.",
    },
    {
      question: "Does GTA 6 have hidden packages?",
      answer:
        "No. Neither the 100% checklist, the Progress menu nor the trophy list has a hidden package collectible. Cocaine Flamingos are the closest equivalent.",
    },
  ],
};

const HUB_FR: HubSeo = {
  title: "Checklist 100 % GTA 6 et collectibles — tous les totaux | Map-6",
  metaDescription:
    "Checklist 100 % de GTA 6 : chaque objectif et chaque total de collectibles — 125 flamants roses, 480 cartes, 397 cascades, 255 animaux. Cochez au fil du jeu.",
  about: [
    "GTA 6 suit tout dans le menu Progression, et la checklist 100 % se débloque sous Progression › Stats une fois l’histoire terminée. Ce que vous faites avant compte déjà, et rien n’est manquable : tout peut se finir en exploration libre après le générique.",
    "La checklist est clémente. PowerPyx l’estime plus proche de 60 % de complétion réelle : la plupart des familles de collectibles ne demandent qu’une partie du total (100 flamants sur 125, 15 sets de cartes sur 18, 300 cascades sur 397, 100 animaux sur 255). Seuls les braquages, les découvertes sous-marines, les stands de tir, les drones et les cibles de Bret exigent tout.",
    "Il n’y a pas de paquets cachés dans GTA 6. Les guides d’avant-sortie qui promettaient 100 paquets recopiaient le système de GTA III et Vice City ; le jeu final n’en a aucun. L’équivalent le plus proche est le flamant rose à cocaïne, qui lâche un paquet quand on tire dessus.",
    "Vos coches restent dans votre navigateur, sans compte. Chaque famille de collectibles a sa page avec le menu de suivi en jeu, les règles qui piègent les joueurs, et la carte.",
  ],
  howToTrack: [
    "Ouvrez Progression › Stats › Complétion à 100 % après l’histoire pour voir la liste officielle.",
    "Progression › Collections affiche chaque famille ; certaines n’apparaissent qu’après le premier objet trouvé.",
    "Carte › Exploration › Spots de cascade liste chaque cascade trouvée et réussie par son nom.",
    "Cochez les lignes ici au fil du jeu — elles sont enregistrées dans ce navigateur uniquement.",
  ],
  faq: [
    {
      question: "Que faut-il pour le 100 % de GTA 6 ?",
      answer:
        "Finir l’histoire, puis la checklist sous Progression › Stats › Complétion à 100 % : braquages (22 banques, 7 prêteurs sur salaire, 8 coffres, 34 smash ’n’ grabs sur 35, 50 braquages à main armée sur 91), collections (100 flamants sur 125, 15 sets de cartes sur 18, 100 scans WAiNK, les 33 découvertes sous-marines, 30 magazines sur 34, 15 méditations sur 18), 300 cascades sur 397, 70 défis sur 80, 200 véhicules scannés sur 277, 50 armes sur 66 et 100 animaux sur 255.",
    },
    {
      question: "Y a-t-il des éléments manquables pour le 100 % ?",
      answer: "Non. Selon PowerPyx, tout reste faisable en exploration libre après l’histoire.",
    },
    {
      question: "GTA 6 a-t-il des paquets cachés ?",
      answer:
        "Non. Ni la checklist 100 %, ni le menu Progression, ni la liste des trophées ne contiennent de paquets cachés. Les flamants roses à cocaïne sont l’équivalent le plus proche.",
    },
  ],
};

const TYPES_EN: Record<string, Omit<CollectibleSeo, "slug">> = {
  "cocaine-flamingos": {
    metaDescription:
      "GTA 6 Cocaine Flamingos: 125 in Leonida, 100 needed for 100%. How to tell real ones from decorations, where the counter is, and what to do with the cocaine.",
    about: [
      "Cocaine Flamingos are GTA 6’s answer to hidden packages: 125 pink lawn flamingos scattered through yards, docks and beaches, each with a cocaine package inside. The 100% checklist needs any 100 of them.",
      "Only flamingos with a black-and-white beak count. Ones with a yellow-and-black beak are decorations and cannot be broken. Shoot the body of a real one and it breaks open; that is what marks it as found. Picking up the package is optional, but the cocaine sells to a fence and helps the $100,000 narcotics line on the same checklist.",
      "The counter only appears after you break your first one. Published spots so far cluster in Belpoint, Watson Bay, Capri and the Featherstone Islands in Mariana County, plus La Perle in Vice City.",
    ],
    howToTrack: [
      "Progress › Collections › Exploration › Cocaine Flamingos (visible after the first).",
      "Check the beak: black and white counts, yellow and black does not.",
      "Sell the cocaine to a fence for the narcotics fencing requirement.",
    ],
    faq: [
      { question: "How many Cocaine Flamingos are in GTA 6?", answer: "125. The 100% checklist needs any 100 of them." },
      { question: "Why won’t a flamingo break?", answer: "It is a decoration. Only flamingos with a black-and-white beak are collectibles; yellow-and-black beaks cannot be destroyed." },
      { question: "Are Cocaine Flamingos missable?", answer: "No. They can be found at any time in free roam, including after the story." },
    ],
  },
  "collectible-cards": {
    metaDescription:
      "GTA 6 collectible cards: 480 unique cards in 18 sets. Complete any 15 sets for 100%. How sets work, duplicates, and where to track them.",
    about: [
      "GTA 6 has 480 unique collectible cards split into 18 sets of 18 to 36 cards. The 100% checklist does not ask for every card: it asks for every card in any 15 of the 18 sets, so three sets can be skipped entirely.",
      "Some cards have duplicates placed in more than one location. A duplicate does not count twice, so a stack of spares does not mean a set is closer to done. Check the set view before chasing a card you may already own.",
      "Plan sets rather than single cards: pick the 15 sets whose remaining cards sit closest to the regions you play in most.",
    ],
    howToTrack: [
      "Progress › Collections › Collectible Cards shows each set and its missing cards.",
      "Skip the three sets with the most awkward remaining cards.",
    ],
    faq: [
      { question: "How many cards are in GTA 6?", answer: "480 unique cards in 18 sets, each holding 18 to 36 cards." },
      { question: "Do I need every card for 100%?", answer: "No. You need every card from any 15 of the 18 sets." },
    ],
  },
  "stunt-jumps": {
    metaDescription:
      "GTA 6 stunts: 397 in four families — 130 stunt jumps, 202 under the bridges, 40 knife flights, 25 base jumps. 300 needed for 100%, 250 for the trophy.",
    about: [
      "Stunts in GTA 6 come in four families: 130 stunt jumps over ramps, 202 under-the-bridge flights, 40 knife flights between buildings and 25 base jumps. That makes 397, and the 100% checklist needs any 300 of them in any mix. The stunt trophy and achievement asks for 250.",
      "Under-the-bridge flights are the quickest to rack up, which is why most completion routes start there and leave the fiddliest stunt jumps for last.",
      "Every stunt has a unique name and stays marked on the in-game map once completed, which makes it easy to compare against a guide list.",
    ],
    howToTrack: [
      "Progress › Activities › Stunts, then a family to see progress by region.",
      "Map › Exploration › Stunt Spots lists found and completed stunts by name.",
      "Mix families freely: any 300 of 397 count.",
    ],
    faq: [
      { question: "How many stunt jumps are in GTA 6?", answer: "130 stunt jumps, inside 397 stunts in total once under-the-bridge flights (202), knife flights (40) and base jumps (25) are added." },
      { question: "How many stunts do I need for 100%?", answer: "Any 300 of the 397, in any combination of the four families." },
    ],
  },
  "waink-locations": {
    metaDescription:
      "GTA 6 WAiNK locations: scan landmarks, curiosities, sculptures and No Flusher tags with the phone. 100 scans needed for 100%.",
    about: [
      "WAiNK is the in-game phone app you scan things with. Walk near a scannable spot on foot — not in a vehicle — and a prompt tells you one is nearby. Scannable spots include landmarks, curiosities, sculptures and No Flusher tags.",
      "The 100% checklist asks for 100 WAiNK scans. The game does not print a total; one guide counts 112 spots in four groups (31 landmarks, 35 curiosities, 23 sculptures, 23 No Flusher tags), which leaves a small margin.",
      "Landmarks are where Map-6 helps most: more than 1,900 Leonida buildings on the map are matched to the real South Florida places they were modelled on, which makes famous façades easy to find before you go scanning.",
    ],
    howToTrack: [
      "Progress › Collections › WAiNK Locations.",
      "Scan on foot: the prompt does not show from a vehicle.",
      "Use the real-life landmark pages to plan a walking route through Vice City.",
    ],
    faq: [
      { question: "How many WAiNK locations are in GTA 6?", answer: "The game does not publish a total. One guide counts 112; the 100% checklist needs 100 scans." },
      { question: "Why don’t I get the WAiNK prompt?", answer: "You have to be on foot. The nearby-scan prompt does not appear while you are in a vehicle." },
    ],
  },
  "underwater-discoveries": {
    metaDescription:
      "GTA 6 underwater discoveries: all 33 shipwreck treasures needed for 100%, tied to Kenton’s treasure-diving questline (5 of 7 sets for the Kenton line).",
    about: [
      "Underwater discoveries are the sunken treasures in Kenton’s treasure-diving questline. Kenton marks purple chest icons on the map; you dive, use the metal detector to dig the treasure out of the sea floor and bring it back to his shop.",
      "He runs seven shipwreck sets. The Kenton line on the 100% checklist only needs five of them, but the underwater discoveries line needs all 33 treasures — so in practice you clear all seven.",
    ],
    howToTrack: [
      "Progress › Collections › Exploration › Underwater Discoveries.",
      "Progress › Collections › Kenton’s Treasures for the set view.",
      "Return to Kenton after each set; he calls with the next locations.",
    ],
    faq: [
      { question: "How many underwater discoveries are in GTA 6?", answer: "33, and the 100% checklist needs all of them." },
      { question: "Do I need all of Kenton’s sets?", answer: "The Kenton line needs 5 of 7, but all 33 underwater discoveries are required, which means finishing all seven sets." },
    ],
  },
  magazines: {
    metaDescription:
      "GTA 6 magazines, books and comics: 27 to read plus 7 book swaps, 34 in all. 30 unique ones needed for 100%; duplicates don’t count.",
    about: [
      "GTA 6 has 27 magazines, books and comics you can pick up and read, plus 7 book swaps that sit in their own Progress category but count toward the same line. That is 34, and the 100% checklist needs any 30.",
      "Most magazines have duplicate copies in several fixed locations. Only unique titles count, so grabbing the same issue twice does nothing for the total.",
    ],
    howToTrack: [
      "Progress › Collections › Exploration › Magazines, Books & Comics and Book Swaps.",
      "Check the title before detouring: duplicates do not count.",
    ],
    faq: [
      { question: "How many magazines are in GTA 6?", answer: "27 magazines, books and comics plus 7 book swaps, 34 in total. 30 unique ones count for 100%." },
    ],
  },
  "meditation-spots": {
    metaDescription:
      "GTA 6 meditation spots: 18 meditations at 10 locations. Bring your partner — Lucia and Jason meditating together counts twice. 15 needed for 100%.",
    about: [
      "There are 18 meditations spread over 10 locations. Lucia and Jason can meditate together at a spot, which counts as two meditations at once — that is how 10 places add up to 18.",
      "Call your partner before heading out so you get both at each visit. The 100% checklist needs 15 of the 18.",
    ],
    howToTrack: [
      "Progress › Collections › Exploration › Meditations.",
      "Call your partner first so each spot counts twice.",
    ],
    faq: [
      { question: "How many meditation spots are in GTA 6?", answer: "18 meditations at 10 locations; 15 are needed for 100%." },
    ],
  },
  wildlife: {
    metaDescription:
      "GTA 6 animals: 255 species including 35 fish. Study any 100 through binoculars for 100% — no hunting needed. Where to find them.",
    about: [
      "GTA 6 counts 255 animals, including 35 fish and every breed of cat and dog. The 100% checklist needs any 100, and you only have to study them: select the binoculars in the weapon wheel, zoom in and hold to study. Hunting is not required for this count.",
      "Cats and dogs gather around towns. Most wild animals live in the swamps and in the countryside in the north of the map — the Grassrivers wetlands are the obvious first stop. Fish count when you swim near them, no rod needed, and birds can be studied too.",
      "Bret’s 15 target decks are a separate checklist line and do require some hunting.",
    ],
    howToTrack: [
      "Progress › Animals.",
      "Binoculars from the weapon wheel, zoom in, hold to study.",
      "Swim near fish to study them without fishing.",
    ],
    faq: [
      { question: "How many animals are in GTA 6?", answer: "255, including 35 fish. Any 100 count for 100%." },
      { question: "Do I need to hunt animals for 100%?", answer: "Not for the animal count — studying them through binoculars is enough. Bret’s target decks do need some hunting." },
    ],
  },
};

const TYPES_FR: Record<string, Omit<CollectibleSeo, "slug">> = {
  "cocaine-flamingos": {
    metaDescription:
      "Flamants roses à cocaïne GTA 6 : 125 à Leonida, 100 pour le 100 %. Reconnaître les vrais, trouver le compteur, et quoi faire de la cocaïne.",
    about: [
      "Les flamants roses à cocaïne remplacent les paquets cachés dans GTA 6 : 125 flamants de jardin dispersés dans les cours, les docks et les plages, chacun avec un paquet de cocaïne à l’intérieur. La checklist 100 % en demande 100.",
      "Seuls les flamants au bec noir et blanc comptent. Ceux au bec jaune et noir sont décoratifs et incassables. Tirez sur le corps d’un vrai : il se brise, et c’est ce qui le valide. Ramasser le paquet est facultatif, mais la cocaïne se revend à un receleur et aide la ligne « 100 000 $ de stupéfiants revendus ».",
      "Le compteur n’apparaît qu’après le premier flamant cassé. Les emplacements publiés se concentrent à Belpoint, Watson Bay, Capri et aux Featherstone Islands (Mariana County), plus La Perle à Vice City.",
    ],
    howToTrack: [
      "Progression › Collections › Exploration › Flamants roses à cocaïne (visible après le premier).",
      "Vérifiez le bec : noir et blanc compte, jaune et noir non.",
      "Revendez la cocaïne à un receleur pour l’objectif de stupéfiants.",
    ],
    faq: [
      { question: "Combien de flamants roses à cocaïne dans GTA 6 ?", answer: "125. La checklist 100 % en demande 100." },
      { question: "Pourquoi un flamant ne se casse pas ?", answer: "C’est une décoration. Seuls les flamants au bec noir et blanc sont des collectibles ; ceux au bec jaune et noir sont indestructibles." },
      { question: "Les flamants sont-ils manquables ?", answer: "Non. On peut les trouver à tout moment en exploration libre, y compris après l’histoire." },
    ],
  },
  "collectible-cards": {
    metaDescription:
      "Cartes à collectionner GTA 6 : 480 cartes uniques en 18 sets. 15 sets complets pour le 100 %. Fonctionnement, doublons et suivi.",
    about: [
      "GTA 6 compte 480 cartes uniques réparties en 18 sets de 18 à 36 cartes. La checklist 100 % ne demande pas toutes les cartes : elle demande toutes celles de 15 sets au choix, donc trois sets peuvent être ignorés.",
      "Certaines cartes existent en double à plusieurs endroits. Un doublon ne compte pas deux fois : vérifiez la vue du set avant de courir après une carte que vous avez peut-être déjà.",
      "Raisonnez par set plutôt que par carte : choisissez les 15 sets dont les cartes manquantes sont les plus proches de vos zones de jeu.",
    ],
    howToTrack: [
      "Progression › Collections › Cartes à collectionner affiche chaque set et ses cartes manquantes.",
      "Laissez de côté les trois sets les plus pénibles.",
    ],
    faq: [
      { question: "Combien de cartes dans GTA 6 ?", answer: "480 cartes uniques en 18 sets de 18 à 36 cartes." },
      { question: "Faut-il toutes les cartes pour le 100 % ?", answer: "Non. Il faut toutes les cartes de 15 sets sur 18." },
    ],
  },
  "stunt-jumps": {
    metaDescription:
      "Cascades GTA 6 : 397 en quatre familles — 130 sauts, 202 passages sous les ponts, 40 lames de couteau, 25 base jumps. 300 pour le 100 %, 250 pour le trophée.",
    about: [
      "Les cascades de GTA 6 forment quatre familles : 130 sauts sur rampe, 202 passages sous les ponts, 40 vols en lame de couteau entre les immeubles et 25 base jumps. Soit 397 ; la checklist 100 % en demande 300, dans n’importe quelle combinaison. Le trophée des cascades en demande 250.",
      "Les passages sous les ponts sont les plus rapides à enchaîner : la plupart des parcours de complétion commencent par là et gardent les sauts les plus délicats pour la fin.",
      "Chaque cascade a un nom unique et reste marquée sur la carte du jeu une fois réussie, ce qui facilite la comparaison avec une liste.",
    ],
    howToTrack: [
      "Progression › Activités › Cascades, puis une famille pour voir la progression par région.",
      "Carte › Exploration › Spots de cascade liste les cascades trouvées et réussies.",
      "Mélangez les familles : 300 sur 397 au choix.",
    ],
    faq: [
      { question: "Combien de sauts dans GTA 6 ?", answer: "130 sauts, sur 397 cascades au total avec les passages sous les ponts (202), les lames de couteau (40) et les base jumps (25)." },
      { question: "Combien de cascades pour le 100 % ?", answer: "300 sur 397, dans n’importe quelle combinaison des quatre familles." },
    ],
  },
  "waink-locations": {
    metaDescription:
      "Lieux WAiNK GTA 6 : scannez monuments, curiosités, sculptures et tags No Flusher avec le téléphone. 100 scans pour le 100 %.",
    about: [
      "WAiNK est l’application du téléphone qui sert à scanner. Approchez-vous à pied d’un lieu scannable — pas en véhicule — et une notification vous prévient. On y trouve des monuments, des curiosités, des sculptures et des tags No Flusher.",
      "La checklist 100 % demande 100 scans WAiNK. Le jeu n’affiche pas de total ; un guide en compte 112 en quatre groupes (31 monuments, 35 curiosités, 23 sculptures, 23 tags No Flusher), ce qui laisse une petite marge.",
      "C’est sur les monuments que Map-6 aide le plus : plus de 1 900 bâtiments de Leonida sont rapprochés des lieux réels de Floride du Sud dont ils s’inspirent, ce qui permet de repérer les façades connues avant de partir scanner.",
    ],
    howToTrack: [
      "Progression › Collections › Lieux WAiNK.",
      "Scannez à pied : la notification n’apparaît pas en véhicule.",
      "Utilisez les pages lieux réels pour préparer un itinéraire à pied dans Vice City.",
    ],
    faq: [
      { question: "Combien de lieux WAiNK dans GTA 6 ?", answer: "Le jeu ne publie pas de total. Un guide en compte 112 ; la checklist 100 % demande 100 scans." },
      { question: "Pourquoi je n’ai pas la notification WAiNK ?", answer: "Il faut être à pied. La notification de scan n’apparaît pas en véhicule." },
    ],
  },
  "underwater-discoveries": {
    metaDescription:
      "Découvertes sous-marines GTA 6 : les 33 trésors d’épaves sont obligatoires pour le 100 %, via la quête de plongée de Kenton (5 sets sur 7 pour sa ligne).",
    about: [
      "Les découvertes sous-marines sont les trésors de la quête de plongée de Kenton. Il marque des coffres violets sur la carte ; vous plongez, déterrez le trésor au détecteur de métaux et le rapportez à sa boutique.",
      "Il propose sept sets d’épaves. La ligne Kenton de la checklist n’en demande que cinq, mais la ligne découvertes sous-marines exige les 33 trésors : en pratique, il faut finir les sept.",
    ],
    howToTrack: [
      "Progression › Collections › Exploration › Découvertes sous-marines.",
      "Progression › Collections › Trésors de Kenton pour la vue par set.",
      "Retournez voir Kenton après chaque set ; il appelle avec les lieux suivants.",
    ],
    faq: [
      { question: "Combien de découvertes sous-marines dans GTA 6 ?", answer: "33, toutes obligatoires pour le 100 %." },
      { question: "Faut-il tous les sets de Kenton ?", answer: "La ligne Kenton en demande 5 sur 7, mais les 33 découvertes sous-marines sont obligatoires, donc il faut finir les sept." },
    ],
  },
  magazines: {
    metaDescription:
      "Magazines, livres et BD GTA 6 : 27 à lire plus 7 échanges de livres, 34 au total. 30 différents pour le 100 % ; les doublons ne comptent pas.",
    about: [
      "GTA 6 propose 27 magazines, livres et BD à ramasser et lire, plus 7 échanges de livres rangés dans leur propre catégorie mais comptés sur la même ligne. Soit 34 ; la checklist 100 % en demande 30.",
      "La plupart des magazines existent en plusieurs exemplaires à des endroits fixes. Seuls les titres différents comptent : reprendre le même numéro ne fait pas avancer le total.",
    ],
    howToTrack: [
      "Progression › Collections › Exploration › Magazines, livres et BD, et Échanges de livres.",
      "Vérifiez le titre avant le détour : les doublons ne comptent pas.",
    ],
    faq: [
      { question: "Combien de magazines dans GTA 6 ?", answer: "27 magazines, livres et BD plus 7 échanges de livres, 34 au total. 30 différents comptent pour le 100 %." },
    ],
  },
  "meditation-spots": {
    metaDescription:
      "Spots de méditation GTA 6 : 18 méditations sur 10 lieux. Venez à deux — Lucia et Jason ensemble comptent double. 15 pour le 100 %.",
    about: [
      "Il y a 18 méditations réparties sur 10 lieux. Lucia et Jason peuvent méditer ensemble au même endroit, ce qui compte pour deux : c’est ainsi que 10 lieux font 18.",
      "Appelez votre partenaire avant de partir pour valider les deux à chaque visite. La checklist 100 % en demande 15 sur 18.",
    ],
    howToTrack: [
      "Progression › Collections › Exploration › Méditations.",
      "Appelez votre partenaire d’abord pour que chaque lieu compte double.",
    ],
    faq: [
      { question: "Combien de spots de méditation dans GTA 6 ?", answer: "18 méditations sur 10 lieux ; 15 sont nécessaires pour le 100 %." },
    ],
  },
  wildlife: {
    metaDescription:
      "Animaux GTA 6 : 255 espèces dont 35 poissons. Observez-en 100 aux jumelles pour le 100 % — pas besoin de chasser. Où les trouver.",
    about: [
      "GTA 6 compte 255 animaux, dont 35 poissons et chaque race de chat et de chien. La checklist 100 % en demande 100, et il suffit de les étudier : sélectionnez les jumelles dans la roue des armes, zoomez et maintenez pour étudier. La chasse n’est pas nécessaire pour ce compteur.",
      "Chats et chiens se trouvent en ville. La plupart des animaux sauvages vivent dans les marais et la campagne au nord de la carte — les zones humides de Grassrivers sont le premier arrêt évident. Les poissons comptent quand on nage près d’eux, sans canne, et les oiseaux s’étudient aussi.",
      "Les 15 cibles de Bret sont une ligne séparée de la checklist et demandent, elles, un peu de chasse.",
    ],
    howToTrack: [
      "Progression › Animaux.",
      "Jumelles dans la roue des armes, zoom, maintenir pour étudier.",
      "Nagez près des poissons pour les étudier sans pêcher.",
    ],
    faq: [
      { question: "Combien d’animaux dans GTA 6 ?", answer: "255, dont 35 poissons. 100 au choix comptent pour le 100 %." },
      { question: "Faut-il chasser pour le 100 % ?", answer: "Pas pour le compteur d’animaux — les étudier aux jumelles suffit. Les cibles de Bret demandent un peu de chasse." },
    ],
  },
};

export function getCollectiblesHubSeo(locale: string): HubSeo {
  return locale === "fr" ? HUB_FR : HUB_EN;
}

export function getCollectibleTypeSeo(slug: string, locale = "en"): CollectibleSeo | undefined {
  const seo = (locale === "fr" ? TYPES_FR : TYPES_EN)[slug] ?? TYPES_EN[slug];
  return seo ? { slug, ...seo } : undefined;
}

/** English copy, for the llms.txt / markdown mirrors. */
export const COLLECTIBLES_HUB_SEO = HUB_EN;
export const COLLECTIBLE_TYPE_SEO: Record<string, CollectibleSeo> = Object.fromEntries(
  Object.entries(TYPES_EN).map(([slug, seo]) => [slug, { slug, ...seo }]),
);
