import { getGuideBySlug, type Guide } from "./guides";

export type LocalizedGuide = Pick<
  Guide,
  "title" | "description" | "content" | "readTime"
>;

const FR: Record<string, LocalizedGuide> = {
  "gta-6-map-guide": {
    title: "Carte interactive GTA 6 — Guide débutant complet",
    description:
      "Apprenez à utiliser la carte interactive Map-6 pour explorer Vice City, suivre les coordonnées et trouver chaque collectible.",
    readTime: 12,
    content: [
      "Map-6 est une carte interactive gratuite du monde ouvert de Grand Theft Auto VI — Vice City, les Leonida Keys, Port Gellhorn, les Grassrivers, Ambrosia Island, Mount Kalaga et les axes qui relient ces régions. Que vous analysiez les trailers image par image ou prépariez une checklist pour le lancement, ce guide détaille chaque outil pour trouver rapidement les landmarks et partager des points précis.",
      "Commencez sur /map (ou /fr/map). La carte occupe l’écran ; une barre latérale liste les points d’intérêt. Les filtres isolent landmarks, collectibles, magasins, missions et secrets. Un clic centre la caméra et ouvre un résumé avant la page du lieu.",
      "Les coordonnées comptent dès que la communauté publie des trouvailles. Le HUD affiche X/Y dans le même référentiel que le reste du site. Copiez-les avec une capture trailer ou un tip Discord, puis recentrez plus tard. Les coordonnées restent dans votre navigateur — voir la Politique de confidentialité.",
      "Filtrez agressivement. La chasse trailer est bruyante : hôtels néon, boardwalks de marais et grues industrielles se ressemblent. Filtrez Landmarks pour Ocean Drive ; passez Collectibles pour une route 100 % ; Secrets pour les rumeurs encore non confirmées.",
      "Chaque pin majeur mène à une page sous /locations. Les hubs régionaux (Vice City, Ocean Drive, Mount Kalaga…) incluent des textes « À propos », ce qu’on y trouve, et une FAQ. Ils renvoient aussi vers la carte interactive.",
      "Les collectibles vivent sur la carte et dans /collectibles. Notre guide sur les paquets cachés explique les patterns historiques Rockstar et ce que Map-6 suivra au lancement.",
      "Avant Trailer 3 ou un Newswire : ouvrez la carte, filtrez Landmarks, scannez le littoral de Vice City, les causeways des Keys, le bord industriel de Port Gellhorn et la frontière boisée de Mount Kalaga. Mettez en pause les néons, skylines et transitions de biomes.",
      "Map-6 s’appuie sur la cartographie communautaire (dont GTADB en CC BY 4.0) et des pages éditoriales. La spéculation est étiquetée ; les POI auto-importés sans prose unique restent hors sitemap.",
      "Pour le matériel et les éditions, couplez ce guide au guide de précommande GTA 6. Pour une balade 3D fan-made, voir Cities: Skylines II (map ID 153426) — complémentaire, pas un remplacement de la base POI web.",
      "Mobile : le mode paysage donne plus de carte ; la sidebar devient une feuille. Sur téléphone bas de gamme, zoomez d’un cran et masquez les Collectibles jusqu’à en avoir besoin.",
      "Après chaque révélation officielle : nouveaux pins, blurb régions, news sous /news, liens croisés. Ajoutez Map-6 en favori pour que la semaine de lancement soit une checklist, pas une chasse au trésor.",
      "Prêt ? Ouvrez la carte, filtrez la catégorie utile, et gardez les URLs de lieux qui collent à vos notes trailer.",
    ],
  },
  "vice-city-locations": {
    title: "Vice City — Tous les lieux connus de GTA 6",
    description:
      "Découpage région par région de Vice City : Ocean Drive, Little Vice, front de mer et gratte-ciel downtown confirmés par les trailers.",
    readTime: 14,
    content: [
      "Vice City revient comme centre culturel et visuel de Grand Theft Auto VI — la Miami fictionnelle de Rockstar. Sur Map-6, c’est à la fois un hub régional et un ensemble de pins filtrables pendant le visionnage des trailers. Ce guide sépare le raisonnablement confirmé de l’inférence communautaire.",
      "Ocean Drive est la carte postale : façades d’hôtels néon, palmiers, nightlife. Notre page Ocean Drive développe les repères et renvoie à la carte centrée sur la strip.",
      "Little Vice et les blocs intérieurs contrastent : densités, street art, entrepôts, ruelles. Notez les coupes trailer entre hôtels pastels et autoroutes — elles révèlent souvent la connexion des districts.",
      "Le downtown vend la skyline : tours de verre, freeways, lumière du soir. Zoomez jusqu’à voir l’arc côtier et la grille intérieure, pour placer un plan trailer par rapport aux Keys.",
      "Le front de mer n’est pas que du sable : pontons, parkings, ramps. Les bords de rivage et dessous de jetées sont historiquement riches en collectibles — pattern, pas spoiler.",
      "Causeways et ponts comptent. Suivez les routes côtières sud/est depuis Vice City pour voir Keys et approches humides.",
      "Sur la carte : filtrez Landmarks, cherchez « Vice » ou « Ocean », ouvrez chaque pin. Pour une balade 3D fan, le guide Cities: Skylines II (ID 153426) complète Map-6.",
      "Nous n’inventons pas noms de magasins, ordre de missions ou intérieurs non montrés. Les rumeurs restent étiquetées dans les news.",
      "Lectures liées : pages régionales Vice City / Ocean Drive, aperçu lore Leonida, article date de sortie. Ce guide sera révisé section par section.",
      "Workflow trailer : (1) pause hôtel/tour, (2) matcher la courbe de skyline, (3) noter X/Y, (4) revenir après le prochain Newswire.",
      "Vice City évoluera jusqu’au 19 novembre 2026. Map-6 reste la couche calme et filtrable — géographie confirmée d’abord.",
    ],
  },
  "hidden-packages-gta-6": {
    title: "Paquets cachés dans GTA 6 — Ce qu’on sait",
    description:
      "Les paquets cachés reviendront-ils dans GTA 6 ? Tout ce qu’on sait sur ces collectibles classiques.",
    readTime: 11,
    content: [
      "Les paquets cachés sont une boucle collectible emblématique de GTA. Pour GTA 6, la communauté attend un successeur spirituel — même si nom, nombre et récompenses ne sont pas encore publics.",
      "Confirmé vs supposé : Rockstar insiste sur l’exploration. Map-6 ne publiera pas de fausse liste « 120 lieux » avant des preuves solides.",
      "Patterns historiques : toits, grues, zones sous-marines, rivages, îles, yards industriels. Sur Map-6 : Vice City, Keys, Port Gellhorn, Grassrivers, Ambrosia, Mount Kalaga.",
      "Suivi Map-6 : hub /collectibles + filtres carte. Un paquet confirmé = pin + description + slug. Les dumps non vérifiés restent hors index.",
      "Récompenses : armes, tenues, réductions, % complétion — jusqu’à confirmation, traitez les claims précis comme rumeurs.",
      "Chasse trailer : pause toits, dumpsters, pylônes de jetée, cabanes de marais. Marquez une zone proche + timestamp ; convertissez en pins après lancement.",
      "Couplez avec le guide carte débutant et Vice City. CS2 map 153426 aide à visualiser les canyons de rues — projet fan, pas Rockstar.",
      "Sessions : filtrez Collectibles seulement, videz une région (ex. Keys) avant d’avancer. Partagez X/Y en co-op.",
      "Promesse éditoriale : mise à jour quand Rockstar confirme ou qu’une communauté sérieuse publie des lieux reproductibles. Pas de « leak packs » vendus.",
      "Suite : hub collectibles, pages régionales, carte en favori pour la semaine de lancement.",
    ],
  },
  "leonida-lore-overview": {
    title: "Monde GTA 6 — Lore & géographie de Leonida",
    description:
      "D’Ambrosia Island aux Grassrivers et Mount Kalaga : comprendre la géographie et la fiction du cadre de GTA 6.",
    readTime: 13,
    content: [
      "Leonida est le stand-in floridien de Rockstar : plages, marais, ports, kitsch touristique, richesse derrière des ponts. Comprendre cette géographie rend les trailers lisibles et Map-6 utile.",
      "Vice City est la métropole phare : art déco, néons, plages, skyline moderne. Notre guide Vice City va plus loin sur les districts.",
      "Ocean Drive est l’épine touristique — le raccourci pour quelqu’un qui n’a jamais vu un trailer.",
      "Les Leonida Keys étirent le fantasme vers le sud : causeways, îles, culture pêche. Les ponts comptent pour les courses autant que pour le sightseeing.",
      "Port Gellhorn est la côte qui travaille — shipping, industrie, logistique. Grues, yards, entrepôts.",
      "Grassrivers canalise l’énergie Everglades : zones humides, airboats, faune, routes qui refusent d’être droites.",
      "Ambrosia Island est le nœud d’exclusivité — richesses privées, rivages manicures. Énergie Star Island / Fisher Island sans clone 1:1.",
      "Mount Kalaga est la frontière nord : forêts, rivières, canyons, vibe chasse / wilderness proches de Red Dead. Rockstar l’a nommé parmi les destinations ; les frontières exactes restent estimées. Sur Map-6, c’est un hub régional à part.",
      "Lore vs marketing : Rockstar vend un ton (satire, chaleur, crime divertissant) plus qu’une timeline wiki. Pour dates/plateformes, préférez nos news sourcées.",
      "Explorer avec Map-6 : index locations → une page régionale → /map filtrée Landmarks. Alternez avec CS2 pour un skim 3D.",
      "Plan d’étude pré-lancement : (1) Vice City + Ocean Drive, (2) Keys + Grassrivers, (3) Port Gellhorn + Ambrosia, (4) Mount Kalaga, (5) collectibles. Révision au fil des médias officiels.",
    ],
  },
  "best-setup-gta-6-ps5-xbox": {
    title: "Meilleur setup GTA 6 — PS5, Xbox, casque & stockage",
    description:
      "Checklist hardware avant le lancement : console, DualSense, casque, SSD et écran 120 Hz.",
    readTime: 9,
    content: [
      "GTA 6 sort le 19 novembre 2026 sur PS5 et Xbox Series X|S. La semaine d’avant est le pire moment pour découvrir une console HS, un SSD plein ou une TV sans HDMI 2.1. Cette page est une checklist d’achat.",
      "Gardez la plateforme que vous avez déjà. Un second console pour GTA 6 seul est rarement rentable. Si votre machine est saine, passez aux manettes, casque et stockage.",
      "Le stockage compte : laissez de la marge pour patchs et captures. Un SSD 1 To (compatible console/PC) est le add-on mid-funnel tant que les ASINs jeu ne sont pas live.",
      "L’audio vend les longues sessions — Pulse 3D ou équivalent pour le chat et les pas. Une DualSense de rechange pour le co-op.",
      "Écran : pas besoin d’OLED, mais HDMI 2.1 / 120 Hz protège les modes perf. Vérifiez le port HDMI réellement utilisé.",
      "Les cartes produits ci-dessous sont une shortlist Amazon. Map-6 est fan-made ; certains liens sont affiliés. Pour Standard vs Collector, voir les guides dédiés.",
      "Créateurs : voir le clip kit Map-6 pour overlay OBS et liens `?theme=streamer&ref=…`.",
      "Ensuite : console → pad → casque → SSD → écran, puis /map en favori.",
    ],
  },
  "gta-6-collectors-edition": {
    title: "Édition Collector GTA 6 — ça vaut le coup ?",
    description:
      "Comparer Collector vs Standard sur PS5 et Xbox : pour qui payer le premium, et quand précommander.",
    readTime: 8,
    content: [
      "Les Collector monétisent le shelf pride — steelbook, statue, artbook, extras in-game. Standard = le jeu sans la taxe memorabilia. Tant que Rockstar n’a pas publié le contenu exact, traitez chaque liste leak comme provisoire.",
      "Standard si vous voulez jouer jour-1. Collector si vous collectionnez ou si le stock physique s’évapore. Rarement un avantage Online réel.",
      "PS5 vs Xbox restent des SKUs séparés ; pas de cross-saves annoncés.",
      "Les cartes Amazon s’allument dès que les ASINs existent. Sinon, regardez la grille hardware si vous manquez encore d’une machine.",
      "FOMO : le Collector physique part avant le digital Standard. Souvent Standard + casque/SSD > une boîte ouverte une fois.",
      "Map-6 est indépendant de Rockstar. Liens affiliés possibles — voir la mention légale.",
    ],
  },
  "gta-6-map-clip-kit": {
    title: "Clip kit carte GTA 6 — TikTok, Kick & overlay OBS",
    description:
      "Deep-links partageables, thème streamer, overlay transparent OBS, tags créateur pour Kick / TikTok / Twitch.",
    readTime: 7,
    content: [
      "Map-6 sert au scrub trailer et à la navigation launch — donc aussi aux clips. Ce kit explique deep-link, thèmes streamer/neon, et overlay transparent OBS / Kick.",
      "Les URLs portent jeu, lieu, coords, zoom, thème et `ref` créateur. Ex. `/fr/map?loc=ocean-drive&x=420&y=280&z=5&theme=streamer&ref=tonpseudo`. Bouton Share sur la carte.",
      "Overlay sans chrome : `/fr/overlay?theme=streamer&ref=tonpseudo` (ou bouton Overlay). OBS → Source Navigateur → 1920×1080.",
      "Thèmes : Default, Streamer (gros labels), Neon (contraste). Persistés dans le lien partagé.",
      "Workflow : (1) pause trailer, (2) matcher sur Map-6, (3) Share, (4) coller dans la caption TikTok/Kick.",
      "Hardware créateurs : capture card, casque, écran 120 Hz — cartes produits optionnelles ci-dessous.",
      "`?ref=` est mémorisé en session pour les prochains Share / Overlay.",
      "Ouvrez la carte, thème Streamer, copiez Overlay, et sortez un short « trouve ce POI ».",
    ],
  },
};

export function getLocalizedGuide(
  slug: string,
  locale: string,
): LocalizedGuide | null {
  const base = getGuideBySlug(slug);
  if (!base) return null;
  if (locale === "fr" && FR[slug]) {
    return FR[slug];
  }
  return {
    title: base.title,
    description: base.description,
    content: base.content,
    readTime: base.readTime,
  };
}
