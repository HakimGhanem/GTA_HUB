import type { LocalizedGuide } from "./guides-i18n";
import {
  LAUNCH_TRAILER_SHOTS,
  launchTrailerShotRows,
} from "./launch-trailer-shots";

/** Version française des huit guides écrits contre les wikis et agrégateurs. */
export const COMPETITIVE_GUIDES_FR: Record<string, LocalizedGuide> = {
  "gta-6-characters-lucia-jason": {
    title: "Personnages de GTA 6 — Lucia Caminos et Jason Duval",
    description:
      "Les protagonistes confirmés de GTA 6, Lucia Caminos et Jason Duval : bascule entre personnages, relation, et comment Map-6 relie leur histoire à la géographie de Leonida.",
    readTime: 11,
    answer:
      "GTA 6 a deux protagonistes jouables, Lucia Caminos et Jason Duval, et le jeu permet de passer de l’un à l’autre. Rockstar a confirmé le duo et leur relation ; la mécanique exacte de la bascule en mission n’est pas publique.",
    comparison: {
      caption: "Confirmé ou non — protagonistes uniquement",
      headers: ["Fait", "Lucia Caminos", "Jason Duval"],
      rows: [
        [
          "Rôle",
          "Héroïne jouable ; première protagoniste féminine non optionnelle d’un GTA principal",
          "Co-héros jouable ; son partenaire",
        ],
        [
          "Bascule",
          "Libre en monde ouvert ; certaines missions verrouillent un point de vue",
          "Même système",
        ],
        [
          "Ton dans les trailers",
          "Bracelet électronique, ennuis judiciaires",
          "Passé militaire évoqué en interview",
        ],
        [
          "Biographies inventées",
          "Ne traitez pas les wikis de fans comme du canon",
          "Ne traitez pas les wikis de fans comme du canon",
        ],
      ],
    },
    faq: [
      {
        question: "Qui sont les personnages principaux de GTA 6 ?",
        answer:
          "La communication officielle de Rockstar est centrée sur Lucia Caminos et Jason Duval, un couple inspiré de Bonnie and Clyde. Ce sont les deux protagonistes jouables. Les PNJ nommés qui circulent via des leaks restent non vérifiés tant que le Newswire ou les crédits du jeu ne les confirment pas.",
      },
      {
        question: "Peut-on alterner entre Lucia et Jason ?",
        answer:
          "Oui en monde ouvert, selon les previews officielles. Rockstar North a indiqué que certaines missions scénarisées verrouillent un point de vue ou basculent automatiquement, comme les séquences dirigées de GTA 5. Quelles missions, et selon quelles règles, n’a pas été détaillé.",
      },
      {
        question: "Où Lucia et Jason évoluent-ils sur la carte ?",
        answer:
          "Les trailers les montrent dans le néon de Vice City, sur les passages des Keys, dans des campements des marais et aux abords industriels. Utilisez les hubs régionaux Map-6 — Vice City, Ocean Drive, Grassrivers, Port Gellhorn — pour recaler les plans. Une page personnage ne remplace pas la géographie.",
      },
    ],
    content: [
      "Grand Theft Auto VI est le premier GTA principal construit autour d’un couple plutôt que d’un trio d’inconnus. Les héros jouables confirmés sont Lucia Caminos et Jason Duval — présentés comme partenaires dans le crime et dans la vie. Map-6 est d’abord un produit de géographie ; cette page existe parce que les recherches « personnages gta 6 » et « lucia caminos » atterrissent sur des sites de cartes qui n’en parlent pas du tout. Nous restons sur des sources sûres : trailers officiels, communication Rockstar/Take-Two et previews de presse identifiées — pas de biographie inventée.",
      "Lucia est la première protagoniste féminine non optionnelle de la série. La présentation officielle montre des ennuis judiciaires (dont un bracelet électronique dans le langage du trailer) et un personnage qui n’est pas une place d’invitée. Jason est son partenaire ; la presse de preview évoque un passé militaire qui justifierait certains points de vue en mission. Aucun de ces faits n’autorise une origin story de roman. Un site qui liste des rues d’enfance, des frères et sœurs jamais montrés ou des tableaux de stats devine.",
      "La bascule entre protagonistes revient, resserrée par rapport aux trois de GTA 5. Les previews et une interview Rockstar North (via les traductions Famitsu / GamesRadar) indiquent une bascule libre en monde ouvert, tandis que certaines missions verrouillent un point de vue ou l’imposent — par exemple une fuite qui met Lucia au volant. La romance et l’optimisation du « couple parfait » sont décrites comme optionnelles, pas comme une barrière de puissance. Ce paragraphe sera mis à jour si Rockstar publie une explication des systèmes.",
      "C’est la géographie qui nous distingue des clones de wiki. La grammaire visuelle de Lucia et Jason, c’est Leonida : le néon d’Ocean Drive, les digues des Keys, l’humidité des Grassrivers, l’acier de Port Gellhorn, l’entre-soi d’Ambrosia, le calme de Mount Kalaga. Ouvrez /map avec le filtre Landmarks, mettez un trailer en pause sur un hôtel ou un chenal à hydroglisseur, et partagez un lien profond dans vos notes. Connaître les personnages sans lire l’espace, c’est de la presse people.",
      "À lire ensuite sur Map-6 : gta-6-story pour la prémisse sans spoilers, leonida-lore-overview pour les biomes, vice-city-locations et ocean-drive-gta-6 pour recaler les districts, gta-6-vehicles pour les voitures des trailers et la Stanier du Vintage Vice City Pack, et gta-6-map-guide pour les filtres et les coordonnées du HUD. Les éditions (Standard 79,99 $ contre Ultimate 99,99 $ US) ne changent pas qui vous incarnez — voir le comparatif Ultimate.",
      "Ce que nous ne publierons pas : dossiers de leaks sur des modèles de personnages inutilisés, faux tableaux de déblocage de Criminal Profile, ou troisième protagoniste « confirmé ». Les listes de casting inventées sont punies autant par AdSense que par la recherche. Quand Rockstar nomme un second rôle sur le Newswire, nous ajoutons un paragraphe sourcé et un lien vers la carte — nous ne reconstituons pas un wiki en une nuit.",
      "Côté créateurs : le thème Streamer de Map-6 avec une légende qui nomme le district (« digue des Keys, pas une Floride générique ») fonctionne mieux qu’une miniature « leak nouveau personnage ». Le mode overlay sur /overlay garde l’interface hors caméra ; le guide clip kit donne les URL de partage et les tags ref.",
      "Prochaine étape : lisez la page histoire pour la prémisse officielle, puis passez dix minutes sur /map à balayer Vice City → les Keys → Port Gellhorn → Grassrivers → Mount Kalaga. Vous connaissez alors le couple et l’État. C’est tout le dossier personnages tant que Rockstar n’en montre pas davantage.",
    ],
  },
  "gta-6-story": {
    title: "Histoire de GTA 6 — Lucia, Jason et la prémisse de Leonida",
    description:
      "Ce que Rockstar a réellement dit de l’histoire de GTA 6 : deux protagonistes, un coup qui tourne mal, et Leonida comme décor — sans faux leaks de scénario.",
    readTime: 8,
    answer:
      "Rockstar n’a confirmé que la prémisse générale : Lucia Caminos et Jason Duval, un coup qui tourne mal, et l’État de Leonida comme décor. Les résumés de scénario détaillés qui circulent en ligne ne sont pas officiels.",
    faq: [
      {
        question: "De quoi parle l’histoire de GTA 6 ?",
        answer:
          "La communication officielle suit Lucia Caminos et Jason Duval, un couple entraîné dans une conspiration criminelle après une occasion simple qui tourne mal. L’ordre des missions et les fins ne sont pas confirmés. Map-6 s’en tient à la prémisse.",
      },
      {
        question: "GTA 6 est-il uniquement solo au lancement ?",
        answer:
          "Les documents publics de lancement de Rockstar mettent en avant l’histoire solo à Leonida sur PS5 et Xbox Series X|S. Le calendrier d’Online, les détails de GTA+ au-delà du mois numérique annoncé et les rumeurs de coopération scénarisée restent à part tant que des publications officielles ne disent pas le contraire.",
      },
    ],
    content: [
      "Qui tape « histoire gta 6 » cherche deux choses : la prémisse officielle, et une mise en garde contre les faux leaks de fin. Map-6 donne les deux. Le pitch public de Rockstar : Lucia et Jason estiment que la vie a truqué les cartes ; un coup censé être simple tourne mal ; ils sont entraînés dans une conspiration qui traverse Leonida. C’est tout le résumé sourcé. Le reste — ordre des braquages, noms des retournements, titres des missions finales — relève de la rumeur jusqu’à ce que vous y jouiez ou que Rockstar le publie.",
      "L’histoire est façonnée par la géographie. Vice City vend la satire et la nuit ; les Keys vendent l’engagement et les traversées ; Port Gellhorn vend le travail et la logistique ; les Grassrivers vendent l’humidité et la fuite ; Ambrosia vend l’argent clôturé ; Mount Kalaga vend le nord silencieux. Notre aperçu du lore et les hubs régionaux sous /locations sont le compagnon spatial de cette page. On ne comprend pas le couple sans l’État.",
      "La bascule est un outil narratif, pas seulement une mécanique. Rockstar a indiqué que certaines missions verrouillent un point de vue pour vous faire vivre un moment en tant que Lucia ou en tant que Jason. Ne supposez pas une bascule libre pendant chaque cinématique. Le monde ouvert est l’endroit où explorer les deux ; les séquences dirigées sont celles où Rockstar garde la main. Détails : gta-6-characters-lucia-jason.",
      "Leonida est une fiction en forme de Floride, pas un documentaire. Traitez les clins d’œil à des villes réelles comme une inspiration, pas comme un GPS : Leonida emprunte la silhouette du sud de la Floride et une partie de son bâti, mais le plan des rues est inventé.",
      "Contexte de calendrier, pas d’intrigue : 19 novembre 2026 sur PS5 et Xbox Series X|S ; préchargement à partir du 12 novembre pour les copies numériques éligibles (et les boîtes physiques avec code), selon le support Rockstar. Le DLC scénarisé et les saisons Online ne sont pas annoncés ici. Voir gta-6-release-date et gta-6-platforms-ps5-xbox.",
      "Comment utiliser Map-6 sans se spoiler après la sortie : filtrez Landmarks, partagez un pin, et évitez les forums de titres de missions si vous voulez une première partie propre. Avant la sortie, ne recalez que des images de trailers — aucune affirmation du type « la mission 14 commence ici ». Créateurs : étiquetez la spéculation à l’antenne et liez cette page quand le chat réclame le scénario.",
      "Cette page est révisée quand le Newswire de Rockstar ajoute de la prémisse, ce qu’il a fait trois fois en deux ans. Le hub personnages couvre Jason et Lucia en particulier, et l’aperçu du lore de Leonida couvre l’État qu’ils traversent.",
    ],
  },
  "gta-6-map-size": {
    title: "Taille de la carte GTA 6 — Leonida face à GTA 5",
    description:
      "Ce que Rockstar a dit de la carte de GTA 6 face aux estimations de fans à 2–2,5× GTA 5. Biomes de Leonida, intérieurs, et comment explorer l’échelle sur Map-6.",
    readTime: 10,
    answer:
      "Rockstar n’a publié aucune superficie en kilomètres carrés pour la carte de GTA 6. Les estimations communautaires situent Leonida autour de 2 à 2,5 fois la carte de GTA 5, ce qui reste une estimation et non un chiffre confirmé.",
    comparison: {
      caption: "Langage officiel et estimations communautaires — ce n’est pas la même chose",
      headers: ["Affirmation", "Statut", "Lecture Map-6"],
      rows: [
        [
          "« La plus grande évolution, la plus immersive »",
          "Communication officielle Rockstar / Take-Two",
          "Un ton, pas une superficie",
        ],
        [
          "La plus grande carte de la série",
          "Langage du studio en preview ; aucune surface publiée",
          "À traiter comme qualitatif",
        ],
        [
          "~2× GTA 5 / ~3× RDR2 / Vice City ~2× Los Santos",
          "Rapporté par des créateurs après une session de preview Rockstar (TGG), repris par GamesRadar",
          "Langage de preview — pas une superficie publiée",
        ],
        [
          "~83 km² contre ~125 km²",
          "Calcul sur ancienne image leakée contre cartographie communautaire plus récente",
          "Les deux non officiels ; nous ne tranchons pas",
        ],
        [
          "~2× à 2,5× la surface terrestre de GTA 5",
          "Reconstruction communautaire (trailers et géographie ancienne)",
          "Estimation — annoncée comme telle",
        ],
        [
          "Six groupes de destinations nommés",
          "Vice City, les Keys, Port Gellhorn, Ambrosia, Grassrivers, Mount Kalaga",
          "À utiliser comme hubs Map-6",
        ],
        [
          "Plus de 700 intérieurs",
          "Repris dans la presse, pas une fiche technique Rockstar",
          "Chiffre non vérifié — à ne pas citer comme un fait",
        ],
      ],
    },
    faq: [
      {
        question: "Quelle est la taille de la carte de GTA 6 ?",
        answer:
          "Rockstar n’a publié aucun chiffre en kilomètres carrés. La communication qualifie Leonida de plus grande évolution de la série. Les projets de cartographie communautaire estiment souvent environ 2× à 2,5× la surface terrestre de GTA 5. Map-6 présente ces deux phrases séparément.",
      },
      {
        question: "GTA 6 est-il plus grand que GTA 5 ?",
        answer:
          "Rockstar le décrit comme plus vaste et plus dense que les épisodes précédents. Les multiplicateurs exacts sont des calculs de fans à partir de coordonnées reconstruites et de la géographie des trailers. Utilisez la carte classique GTA 5 de Map-6 (?game=gta5) à côté de Leonida pour ressentir la différence, plutôt qu’un faux tableau de km².",
      },
    ],
    content: [
      "« Taille de la carte GTA 6 » est l’une des requêtes les plus recherchées du secteur — et la plupart des pages qui s’y positionnent mélangent slogans officiels et calculs de Discord. Map-6 les sépare. Officiel : Rockstar et Take-Two présentent Grand Theft Auto VI comme la plus grande évolution de la série, la plus immersive, située dans l’État de Leonida. Langage de preview, rapporté par des créateurs lors d’une session Rockstar (TGG) et repris par GamesRadar : environ deux fois GTA 5, environ trois fois Red Dead Redemption 2, Vice City seule environ deux fois Los Santos. Les reconstructions non officielles oscillent encore entre ~83 km² (calcul sur une ancienne image leakée) et ~125 km² (cartographie plus récente). Ces chiffres ne sont pas interchangeables. Aucune des reconstructions citées ici ne provient de la carte de développement leakée, que GamesRadar a elle aussi refusé de reproduire.",
      "Les destinations nommées, utilisables tout de suite : Vice City, les Leonida Keys, Port Gellhorn, Ambrosia, les Grassrivers et le parc national de Mount Kalaga. Ces six groupes sont le squelette des hubs régionaux et des filtres de Map-6. D’autres quartiers apparaîtront en jeu ; nous n’inventerons pas une liste de quarante districts pour gonfler la page.",
      "La densité compte plus que la surface brute. Les previews parlent de rues peuplées, d’intérieurs et d’activités qui remplissent la couche d’icônes. Certains médias reprennent « plus de 700 intérieurs » ; traitez-le comme du langage de presse tant que Rockstar ne publie pas de chiffre. Avant la sortie, le travail de Map-6 est la position relative : côte néon contre keys contre port contre marais contre île fermée contre nature du nord — pas un faux calculateur de superficie.",
      "Pour ressentir l’échelle sur Map-6 : ouvrez /map, dézoomez jusqu’à voir Vice City et la chaîne des Keys sur le même écran, balayez de Port Gellhorn vers Ambrosia, puis remontez vers Mount Kalaga avec les Grassrivers comme milieu humide. Passez en ?game=gta5 pour comparer avec votre mémoire de Los Santos. L’outil de mesure et les X/Y du HUD existent pour noter vos estimations de temps de trajet sans les faire passer pour des kilomètres officiels.",
      "La concurrence : MapGenie domine historiquement les cartes de collectibles après la sortie ; Leonida Intel et stateofleonida.net dominent la reconstruction avant la sortie. Map-6 l’emporte sur les filtres gratuits sans limite de « trouvés », les hubs multilingues, les URL overlay et clip, et des pages éditoriales qui refusent de présenter des estimations comme des spécifications Rockstar.",
      "À lire aussi : gta-6-map-guide, leonida-lore-overview, vice-city-locations, ocean-drive-gta-6, gta-6-map-cities-skylines-2 (le compagnon 3D Steam 153426) et les cartes classiques GTA 5/VC/SA. Quand Rockstar publiera un visuel d’échelle officiel, cette page recevra une mise à jour datée — nous ne transformerons pas des calculs de fans en fausse précision avant cela.",
      "Méthode pour le Trailer 3 et le Newswire : une nouvelle vidéo change la confiance, pas les km². Recalez les skylines avec le filtre Landmarks, notez les limites de biomes, partagez des liens profonds. Les disputes de taille en commentaires sont un divertissement ; vos notes, elles, doivent parler de formes et de traversées.",
    ],
  },
  "gta-6-platforms-ps5-xbox": {
    title: "Plateformes GTA 6 — PS5 et Xbox confirmées, PC non annoncé",
    description:
      "Les plateformes officielles de GTA 6 : PlayStation 5 et Xbox Series X|S le 19 novembre 2026. Statut du PC, des consoles précédentes et du mobile, clairement étiqueté.",
    readTime: 7,
    answer:
      "GTA 6 sort uniquement sur PlayStation 5 et Xbox Series X|S, le 19 novembre 2026. Le PC, la PlayStation 4, la Xbox One et le mobile n’ont pas été annoncés par Rockstar.",
    comparison: {
      caption: "Tableau de statut — à ne mettre à jour que depuis Rockstar / Take-Two",
      headers: ["Plateforme", "Statut", "Notes"],
      rows: [
        [
          "PlayStation 5",
          "Confirmée",
          "19 novembre 2026 ; mention PS5 Pro Enhanced dans certaines fiches boutique",
        ],
        ["Xbox Series X|S", "Confirmée", "19 novembre 2026"],
        ["PC", "Non annoncé", "Aucune date ni fiche technique"],
        [
          "PS4 / Xbox One",
          "Absentes de la liste de lancement",
          "Ne présumez pas de portages sur l’ancienne génération",
        ],
        [
          "Mobile / APK",
          "Non annoncé",
          "Traitez les installateurs comme des arnaques — voir la veille anti-arnaque",
        ],
      ],
    },
    faq: [
      {
        question: "Sur quelles plateformes sort GTA 6 ?",
        answer:
          "Les plateformes de lancement confirmées sont la PlayStation 5 et la Xbox Series X|S, le 19 novembre 2026. Rockstar n’a annoncé ni date PC ni version sur l’ancienne génération dans les documents que Map-6 cite.",
      },
      {
        question: "GTA 6 sortira-t-il sur PC au lancement ?",
        answer:
          "Aucune date PC n’a été annoncée aux côtés de la date console. N’achetez pas de « clés PC » et ne téléchargez pas de faux clients EXE ou APK. Revenez sur cette page quand Rockstar publiera un calendrier PC officiel.",
      },
    ],
    content: [
      "La confusion sur les plateformes est ce qui produit arnaques et précommandes gâchées. L’ensemble officiel est simple : Grand Theft Auto VI sur PlayStation 5 et Xbox Series X|S le 19 novembre 2026. Cette phrase est tout le tableau confirmé. Le reste — PC au lancement, rumeurs Switch 2, APK Android, portages ancienne génération — reste dans la colonne « non annoncé » tant que Rockstar ou Take-Two ne l’en sortent pas.",
      "Le préchargement commence le 12 novembre 2026 à minuit heure locale pour les éditions numériques éligibles ; la Standard physique (code dans la boîte, sans disque) doit être disponible à partir de cette date pour permettre l’activation et le préchargement. Le préchargement n’est pas un accès anticipé. Détails : la page « Platforms, Editions, and Versions » du support Rockstar et gta-6-release-date.",
      "Joueurs PC : gta-6-pc-requirements explique ce qu’on peut, ou non, déduire des spécifications d’un portage non annoncé. Joueurs console : gta-6-ps5-vs-xbox pour la question de l’écosystème. Si un inconnu vous propose une « build PC » ou une clé bêta, gta-6-scam-watch décrit le déroulé de l’arnaque.",
      "Les fiches boutique peuvent mentionner PS5 Pro Enhanced ou un label similaire. Ce n’est pas un jeu distinct, ni une raison d’acheter une Pro dans l’urgence si votre PS5 se porte bien. Le jeu intergénérationnel et les sauvegardes croisées ne sont pas annoncés.",
      "Map-6 reste la même couche interactive de Leonida sur chaque SKU confirmé. Ouvrez /map, filtrez Landmarks, lisez les hubs /locations. La géographie se moque de l’icône de boutique sur laquelle vous appuyez.",
      "Ce tableau est révisé quand les canaux officiels ajoutent une plateforme. D’ici là, « plateformes GTA 6 » doit se résoudre à deux consoles et un « à déterminer » clairement étiqueté — pas à un compte à rebours PC plein d’espoir.",
    ],
  },
  "gta-6-trailer-3-what-we-know": {
    title: "Trailer de lancement de GTA 6 (Trailer 3) — faits et carte",
    description:
      "Rockstar a mis en ligne le trailer de lancement de GTA 6 le 15 octobre 2026, sans prévenir : 90 secondes, capturées sur PS5, un inédit de Justice. Ce qu’il confirme et les plans recalés sur Map-6.",
    readTime: 8,
    answer:
      "Le trailer de lancement de GTA 6 — de fait le Trailer 3 — est sorti le 15 octobre 2026, sans annonce préalable. Il dure environ 90 secondes, a été capturé en jeu sur PlayStation 5 et dévoile « Flower in a Hurricane » de Justice. La sortie reste fixée au 19 novembre 2026.",
    comparison: LAUNCH_TRAILER_SHOTS.length
      ? {
          caption:
            "Plans du trailer de lancement recalés sur Map-6. Timecodes vérifiés à la main sur la vidéo officielle ; selon l’encodage, une seconde d’écart est possible.",
          headers: ["Timecode", "Plan", "Page Map-6"],
          rows: launchTrailerShotRows("fr"),
        }
      : {
          caption: "Trailer de lancement de GTA 6 — ce que Rockstar a réellement publié",
          headers: ["Élément", "Statut"],
          rows: [
            ["Mise en ligne", "15 octobre 2026, sans teaser"],
            ["Durée", "Environ 90 secondes"],
            ["Capture", "En jeu, sur PlayStation 5 (Rockstar)"],
            ["Musique", "« Flower in a Hurricane » — Justice feat. Tame Impala, SZA, King Gizzard & The Lizard Wizard"],
            ["Date de sortie", "19 novembre 2026, inchangée"],
            ["Plans recalés sur la carte", "En cours — publiés seulement une fois chaque image vérifiée"],
          ],
        },
    faq: [
      {
        question: "Le trailer de lancement de GTA 6, c’est le Trailer 3 ?",
        answer:
          "Rockstar l’appelle Launch Trailer et non Trailer 3, mais c’est bien la troisième bande-annonce cinématique après décembre 2023 et mai 2025. L’Extended Look du 27 août 2026 était du gameplay, pas un trailer numéroté.",
      },
      {
        question: "Quand est sorti le trailer de lancement de GTA 6 ?",
        answer:
          "Le 15 octobre 2026, sur les chaînes de Rockstar et sur rockstargames.com/VI, sans annonce la veille.",
      },
      {
        question: "Quelle est la musique du trailer de lancement ?",
        answer:
          "« Flower in a Hurricane » de Justice, avec Tame Impala, SZA et King Gizzard & The Lizard Wizard. Rockstar indique que le titre figure sur Grand Theft Auto VI: The Album.",
      },
    ],
    content: [
      "Pas de compte à rebours, pas de teaser : Rockstar a publié le trailer de lancement de Grand Theft Auto VI le 15 octobre 2026, comme il l’avait fait pour le Trailer 2. Une minute trente environ, capturée intégralement en jeu sur PlayStation 5 selon le studio. Le calendrier ne bouge pas : sortie le 19 novembre 2026 sur PS5 et Xbox Series X|S, préchargement dès le 12 novembre.",
      "Beaucoup cherchent encore « Trailer 3 GTA 6 ». Rockstar parle de Launch Trailer, mais c’est dans les faits la troisième cinématique, après celles de décembre 2023 et de mai 2025. L’Extended Look d’août montrait du gameplay ; Map-6 le range à part.",
      "Le trailer pose surtout le récit. En voix off, Jason évoque un passé militaire qui s’est mal terminé ; la description officielle résume l’intrigue en un coup facile qui tourne mal et entraîne le couple dans une conspiration à l’échelle de Leonida. Lucia l’appelle dès les premières secondes, puis tout s’enchaîne en musique. C’est un film d’accroche pour ceux qui n’ont pas suivi trois ans d’images, pas une présentation des systèmes de jeu.",
      "L’autre nouvelle, c’est la musique. « Flower in a Hurricane » est un inédit de Justice avec Tame Impala, SZA et King Gizzard & The Lizard Wizard. Rockstar confirme que le duo français signe la bande originale et que le morceau figure sur Grand Theft Auto VI: The Album.",
      "Une partie des joueurs a trouvé l’image floue comparée au Trailer 1. Ce flou ressemble à un choix d’objectif et d’étalonnage plutôt qu’à une baisse de résolution. Conséquence pratique pour recaler une image sur la carte : fiez-vous aux toits, aux courbes de route et aux côtes, jamais à la netteté ni aux couleurs.",
      "Cette page liste les plans que Map-6 a recalés. Chaque timecode est vérifié à la main sur la vidéo officielle et renvoie vers la page du lieu ; tant qu’un plan n’est pas vérifié, il n’apparaît pas. Pas de liste de plans reprise des réseaux sociaux ni générée à partir de descriptions : un timecode faux envoie le lecteur au mauvais endroit.",
      "Pour le faire vous-même : ouvrez /map avec Landmarks seul, mettez en pause sur les skylines, les digues et les fronts de mer, comparez les silhouettes, puis partagez le lien profond. Les pages régionales sous /locations — Vice City, Ocean Drive, Leonida Keys, Port Gellhorn, Grassrivers, Ambrosia et Mount Kalaga — détaillent chaque zone.",
      "Regardez uniquement sur les canaux de Rockstar. Les packs « 4K en avance » ou « version longue » sur Telegram servent souvent à diffuser des malwares ; gta-6-scam-watch détaille le reste. À lire aussi : gta-6-release-date, gta-6-characters-lucia-jason, gta-6-map-guide.",
    ],
  },
  "ocean-drive-gta-6": {
    title: "Ocean Drive dans GTA 6 — guide du front de mer de Vice City",
    description:
      "Ocean Drive dans GTA 6 : la bande art déco inspirée de South Beach, les landmarks des trailers, les lectures jour et nuit, et les pins Map-6 du front de mer de Vice City.",
    readTime: 9,
    answer:
      "Ocean Drive est la bande art déco de GTA 6 inspirée de South Beach, le long du front de mer de Vice City, visible dans les images officielles des trailers et épinglée sur la carte interactive Map-6.",
    faq: [
      {
        question: "Ocean Drive dans GTA 6 est-elle une vraie rue ?",
        answer:
          "C’est la version satirique par Rockstar d’Ocean Drive à Miami Beach — hôtels pastel, palmiers, énergie tournée vers l’Atlantique — pas un clone GPS. Les correspondances exactes de noms d’hôtels relèvent de l’analyse communautaire tant que Rockstar ne les confirme pas.",
      },
      {
        question: "Comment ouvrir Ocean Drive sur Map-6 ?",
        answer:
          "Allez sur /locations/ocean-drive puis « Voir sur la carte », ou ouvrez /map et cherchez Ocean Drive. Filtrez Landmarks pour recaler les trailers, Collectibles pour la théorie des rivages et des jetées. Partagez le lien profond pour que vos amis arrivent sur la même caméra.",
      },
    ],
    content: [
      "Ocean Drive est la carte postale de GTA 6 — la bande sur laquelle on met les trailers en pause. Map-6 dispose déjà d’un hub régional sur /locations/ocean-drive ; ce guide est la page d’atterrissage longue pour « ocean drive gta 6 », avec un appel à la carte plus clair qu’un paragraphe de wiki. Elle se situe dans Vice City, et non comme un État séparé de Leonida.",
      "Ce que montrent vraiment les trailers : façades d’hôtels art déco, asphalte bordé de palmiers, décapotables, trottoirs bondés, néon après la tombée de la nuit, bords de plage et de jetées. De jour la lecture est pastel et touristique ; de nuit elle est carnavalesque. Recalez les silhouettes de toits et la courbure des rues, pas la saturation rose. Les X/Y du HUD valent mieux que « l’hôtel rose ».",
      "Les connexions : digues vers les Leonida Keys, percées vers les blocs plus denses de Vice, et contraste plus large avec le calme clôturé d’Ambrosia et la côte ouvrière de Port Gellhorn. Lisez vice-city-locations et leonida-lore-overview après cette page pour que la bande ne devienne pas toute votre carte mentale.",
      "Théorie des collectibles (un motif, pas un spoiler) : toits, dessous de jetées, bords de ruelles — les cachettes classiques de GTA. Filtrez Collectibles sur /map et gardez les pins de rumeur hors de vos notes « confirmées ». hidden-packages-gta-6 explique la règle d’honnêteté.",
      "Créateurs : thème Streamer pour les shorts « trouve cet hôtel d’Ocean Drive » ; Neon pour le contraste TikTok ; /overlay pour OBS. Légendez le district, pas « la Floride ». Le clip kit donne la forme des URL, y compris loc=ocean-drive.",
      "La communication du Vintage Vice City Pack évoque Ocean Beach et un garage Shore Court pour la Vapid Stanier de 1955 : traitez ce texte comme de la géographie de bonus d’édition, pas comme un atlas des rues. Voir gta-6-vehicles.",
      "Ensuite : ouvrez la page de lieu Ocean Drive, cliquez sur « Voir sur la carte », enregistrez un lien de partage, puis balayez vers le centre-ville et vers les Keys pour donner du contexte à la carte postale. À lire aussi : gta-6-map-guide, gta-6-characters-lucia-jason, gta-6-map-cities-skylines-2.",
    ],
  },
  "gta-6-vehicles": {
    title: "Véhicules de GTA 6 — voitures des trailers et Vintage Vice City Pack",
    description:
      "Ce que les médias officiels montrent réellement des véhicules de GTA 6 : voitures, bateaux, aéronefs, la Vapid Stanier de 1955 en bonus de précommande, et tout ce qui reste inconnu.",
    readTime: 8,
    answer:
      "Rockstar n’a publié aucune liste de véhicules pour GTA 6. Ce qui est réellement confirmé vient des images officielles des trailers et des véhicules vintage inclus dans le Vintage Vice City Pack offert en précommande.",
    faq: [
      {
        question: "Quelles voitures y a-t-il dans GTA 6 ?",
        answer:
          "Les trailers et captures officiels montrent un large éventail — voitures, motos, bateaux, aéronefs, kayaks, buggys tout-terrain — sans liste nommée complète. Le Vintage Vice City Pack inclut une Vapid Stanier de 1955 pour les précommandes éligibles passées avant le 20 novembre 2026.",
      },
      {
        question: "L’édition Ultimate ajoute-t-elle des véhicules exclusifs ?",
        answer:
          "Take-Two décrit Ultimate comme un ensemble de véhicules, armes et tenues premium ainsi que du contenu lié à l’histoire. La liste exacte des véhicules figure sur les pages boutique officielles et n’a pas été détaillée ailleurs. Les possesseurs de la Standard pourront acheter la mise à niveau Ultimate plus tard.",
      },
    ],
    content: [
      "Les pages de véhicules servent surtout aux wikis à capter le trafic « voitures gta 6 » avec deux cents noms non sourcés. Map-6 fait l’inverse : les médias officiels, un véhicule de précommande confirmé, puis un lien vers la carte. Les trailers et les captures Rockstar montrent voitures, motos, bateaux, aéronefs, un kayak, des buggys tout-terrain, et une promesse de garages et de planques. Le vol de voiture est présenté en preview comme un système (types de serrures, traceurs, scan au téléphone) — ce n’est pas une raison de publier un garage de leaks.",
      "Vintage Vice City Pack (achats Standard ou Ultimate éligibles avant le 20 novembre 2026) : le texte officiel du support mentionne une Vapid Stanier de 1955 à ranger dans un garage personnel Shore Court près d’Ocean Beach, plus des tenues, des coiffures et un motif d’arme qui renvoie au Vice City classique. Ce pack est une fenêtre de précommande, pas une exclusivité Ultimate. Les copies numériques peuvent aussi inclure un mois de GTA+. Vérifiez sur le support Rockstar avant de payer.",
      "L’édition Ultimate (99,99 $ US) est présentée comme un ensemble exclusif de véhicules, armes, tenues et activités liées à l’histoire de Jason et Lucia. Nous n’énumérerons pas de véhicules non listés. Il n’existe pas d’Ultimate physique ; le code en boîte, c’est la Standard. Voir gta-6-ultimate-edition-vs-standard.",
      "Lecture de la carte : la promesse automobile vit sur des routes et des eaux déjà étudiables — décapotables d’Ocean Drive, digues des Keys, hydroglisseurs des Grassrivers, dépôts de Port Gellhorn. Filtrez Landmarks, puis imaginez la traversée. La carte CS2 153426 aide à ressentir les canyons de rues. L’hydroglisseur est une signature des Grassrivers dans les images officielles : ne classez pas chaque plan aquatique en Vice City.",
      "Créateurs : clippez une voiture de trailer, puis partagez le pin Map-6 correspondant plutôt qu’un jpg Discord flou. Le clip kit couvre les URL overlay. Ne légendez jamais un pin communautaire comme un « spawn officiel ».",
      "À lire aussi : ocean-drive-gta-6, le hub Grassrivers, gta-6-preorder-guide, gta-6-scam-watch (fausses clés de packs de voitures). Quand Rockstar publiera une vidéo dédiée aux véhicules, nous ajouterons des noms sourcés — nous ne recopierons pas un dump de wiki.",
    ],
  },
  "gta-6-scam-watch": {
    title: "Arnaques GTA 6 — faux téléchargements, clés bêta et APK",
    description:
      "Comment éviter les arnaques GTA 6 : faux installateurs PC, APK Android, pages de connexion clonées, clés bradées et faux rips du Trailer 3. Boutiques officielles uniquement.",
    readTime: 7,
    answer:
      "Il n’existe ni installateur PC, ni APK Android, ni clé bêta pour GTA 6 — le jeu sort sur PS5 et Xbox Series X|S le 19 novembre 2026. N’achetez que sur le PlayStation Store, le Microsoft Store ou chez un revendeur établi.",
    faq: [
      {
        question: "Existe-t-il un téléchargement PC ou un APK de GTA 6 ?",
        answer:
          "Aucun installateur PC, APK Android ou bêta publique n’a été annoncé par Rockstar avant la sortie. Traitez ces fichiers comme des malwares ou du vol. Attendez rockstargames.com et les vraies boutiques console.",
      },
      {
        question: "Où précommander GTA 6 ?",
        answer:
          "PlayStation Store, Microsoft Store, canaux officiels Rockstar/Take-Two, et revendeurs établis (y compris les fiches Amazon que vous pouvez vérifier). Voir le guide de précommande Map-6. Ne payez jamais un inconnu pour une « clé bêta ».",
      },
    ],
    content: [
      "Des précommandes ouvertes attirent des arnaques de niveau industriel. Leonida Intel tient déjà une page de veille ; Map-6 a besoin de la même couche de confiance pour que le trafic « faux téléchargement gta 6 » ne reparte pas vers un malware. Règles fermes : Rockstar n’a annoncé aucune bêta publique de GTA VI, aucune date PC, aucune version Android, aucun installateur avant la sortie. Clés bêta, APK, clients EXE, pages de connexion clonées et clés « trop bon marché » sont dangereux tant que Rockstar ne les annonce pas sur ses canaux officiels.",
      "Les faits officiels qui permettent de tester une offre : sortie console le 19 novembre 2026 ; préchargement le 12 novembre ; Standard 79,99 $ US et Ultimate 99,99 $ US ; Vintage Vice City Pack avant le 20 novembre ; la boîte physique contient un code de téléchargement, pas un disque. Quiconque propose du PC au lancement, une version crackée ou des « fichiers de carte insider » contre de l’argent n’est pas une source. Map-6 n’héberge aucune build leakée.",
      "Trailer 3 et rips de gameplay : attendez la chaîne YouTube de Rockstar. Les packs Telegram « leak 4K » sont un emballage à malware courant. Utilisez Map-6 pour recaler des images officielles, pas pour décoder des fichiers volés.",
      "Hygiène de paiement : vérifiez l’URL de la boutique, le SKU de la plateforme et le nom de l’édition (Standard ou Ultimate — il n’y a pas d’édition Collector officielle dans le duo de lancement Take-Two). L’annulation jusqu’à l’expédition chez Amazon vaut toujours mieux qu’un intermédiaire Discord. Les cartes affiliées de Map-6 renvoient vers de vraies fiches Amazon.fr de la Standard ; nous ne sommes pas Rockstar.",
      "Si vous avez déjà cliqué sur une fausse page : changez vos mots de passe Rockstar, PSN, Xbox et Amazon depuis un appareil sain, révoquez les sessions, et n’entrez aucun code depuis le site frauduleux. Ce n’est pas un guide complet de réponse à incident — c’est un panneau stop.",
      "À lire aussi : gta-6-pc-requirements, gta-6-platforms-ps5-xbox, gta-6-preorder-guide, gta-6-trailer-3-what-we-know. Mettez /map en favori pour la géographie, et cette page en favori avant de taper « gta 6 télécharger gratuit ».",
    ],
  },
};
