export type PreorderGuideCopy = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  whereTitle: string;
  whereBody: string;
  editionsTitle: string;
  editionsBody: string;
  /** Shown when Amazon game ASINs are not listed yet */
  editionsPending: string;
  platformTitle: string;
  platformBeforePs5: string;
  platformPs5: string;
  platformBetween: string;
  platformXbox: string;
  platformAfter: string;
  hardwareTitle: string;
  hardwareBody: string;
  tipsTitle: string;
  tips: string[];
  faqTitle: string;
  faq: { question: string; answer: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  backToGuides: string;
};

const EN: PreorderGuideCopy = {
  eyebrow: "Pre-order guide",
  title: "GTA 6 Pre-Order Guide — PS5, Xbox & Collector's Edition",
  description:
    "Where to pre-order GTA 6 on Amazon: Standard and Collector's editions for PS5 and Xbox, plus hardware picks for launch day.",
  intro:
    "Grand Theft Auto VI launches on {date} for PlayStation 5 and Xbox Series X|S. This Map-6 pre-order guide is the calm checklist for day-one copies, Collector versus Standard thinking, platform lock-in, and the hardware you can buy now while Amazon game ASINs are still pending. We stay practical: no fake Rockstar leak lists, no invented PC day-and-date claims, and clear pointers back to the interactive map so hype energy goes into Leonida literacy — filters, deep links, and GTADB-attributed cartography (CC BY 4.0 where noted) — instead of refresh-spam on empty product pages.",
  whereTitle: "Where to pre-order GTA 6",
  whereBody:
    "Rockstar has confirmed GTA 6 for PlayStation 5 and Xbox Series X|S. PC timing, if any, will be cited from official channels when it exists — Map-6 will not invent it. Amazon is one of the safest places to pre-order for many players: reliable shipping, easy returns, Prime delivery on eligible items, and cancellation on most pre-orders until the item ships. Use the product cards below to compare editions and platforms as soon as official ASINs appear. Some links may be Amazon Associates affiliates; Map-6 is a fan-made interactive map, not Rockstar or Take-Two — see the site disclosure. While you wait for listings, keep exploring Vice City, the Leonida Keys, Port Gellhorn, Grassrivers, Ambrosia Island, and Mount Kalaga on /map with Landmarks filtered, and Share deep links into your notes so launch week is navigation rather than shopping panic.",
  editionsTitle: "Standard vs Collector's Edition",
  editionsBody:
    "The Standard Edition includes the full game without the memorabilia tax — best value if you want playtime, digital convenience, or the cleanest dollars-per-hour. The Collector's Edition typically adds physical shelf pride (steelbooks, statues, art books) and exclusive extras Rockstar will confirm closer to launch. Treat every unofficial contents list as provisional until Newswire or store pages say otherwise. Do not buy Collector expecting a meaningful Online power advantage; historically Rockstar keeps core progression accessible without the box. Write down the premium over Standard and ask whether you would pay that for the objects alone. If you are undecided, Standard plus a headset or SSD from our best-setup guide often feels better day-to-day than a box you open once. Pair this section with our dedicated Collector's Edition comparison for shelf-versus-play math, and remember editions do not change Map-6 geography — the same filters and coordinates serve every SKU.",
  editionsPending:
    "Amazon pre-order listings for GTA 6 editions are not live yet. We will add affiliate product cards as soon as official ASINs appear. Until then, use the hardware picks below, lock PS5 versus Xbox, decide physical versus digital preferences, and bookmark /map so trailer scrubbing stays productive. Physical Collector stock historically evaporates near launch; digital Standard does not — that asymmetry should guide FOMO, not rumor threads. When cards light up, re-read the official contents before you pay a premium.",
  platformTitle: "PS5 or Xbox — which platform?",
  platformBeforePs5: "Both consoles run GTA 6 at launch. Choose the platform you already own to avoid buying twice, and remember cross-saves are not announced. PlayStation players should grab the ",
  platformPs5: "PS5 edition",
  platformBetween: "; Xbox owners should pick the ",
  platformXbox: "Xbox Series X|S edition",
  platformAfter:
    ". Friends lists, Game Pass or PS Plus habits, DualSense versus Xbox pad feel, and capture workflows all matter more than statue height. Buying a second console just for GTA 6 rarely pays off unless you were upgrading anyway. If your household splits ecosystems, pick one SKU deliberately — Collector on the wrong platform is an expensive paperweight. After you lock platform, open Map-6 and save deep links for the districts you care about so co-op night one starts with shared geography, not argument about which store app to open.",
  hardwareTitle: "Need new hardware?",
  hardwareBody:
    "Launch week is the worst time for a broken controller, a full SSD, or a TV stuck on the wrong HDMI port. If you are upgrading before Vice City opens, prioritize: healthy console, spare pad, wireless headset for marathon sessions, console-compatible 1TB storage with patch headroom, and HDMI 2.1 / 120Hz readiness if performance modes matter to you. You do not need OLED to enjoy GTA 6. Creators should skim the Map-6 clip kit for OBS overlay URLs (/overlay), streamer theme labels, and creator ref tags on Share links. Product cards below are Amazon shortlists — fill intent without turning this page into a flex list. Test your AV settings and headset party chat before midnight queues hit.",
  tipsTitle: "Pre-order tips",
  tips: [
    "Pre-order early if you want a physical copy or Collector box — stocks sell out near launch, while digital Standard remains available.",
    "Check digital versus physical, region, and exact edition before checkout; screenshot the cart if you are gift-buying for someone else's platform.",
    "Amazon usually lets you cancel a pre-order until the item ships — useful if Rockstar clarifies bonuses or you change platforms.",
    "Compare Standard versus Collector premiums only after official contents are public; ignore statue-height leak compilations as purchase advice.",
    "Leave SSD headroom for day-one patches and captures; a full drive on November 18 is a solved problem you should not rediscover.",
    "Bookmark /map, practice Landmarks and Collectibles filters, and Share a few deep links (optional theme + ref) so launch week is checklist energy.",
    "Credit community cartography honestly — Map-6 notes GTADB CC BY 4.0 where applicable — and never frame fan pins as Rockstar leaks.",
    "If PC details arrive later, revisit this page; do not assume console pre-orders transfer across platforms.",
  ],
  faqTitle: "FAQ",
  faq: [
    {
      question: "When does GTA 6 release?",
      answer:
        "{date} on PS5 and Xbox Series X|S per Rockstar's public console plans. Map-6 will update POIs and collectibles as community-verified data lands — filters and deep links first, fake complete lists never.",
    },
    {
      question: "Can I cancel an Amazon pre-order?",
      answer:
        "Yes — Amazon allows cancellation on most pre-orders until the item ships. Check the product page for the current policy, especially on Collector SKUs with limited allocation.",
    },
    {
      question: "Is Map-6 affiliated with Rockstar?",
      answer:
        "No. Map-6 is a fan-made interactive map. Some product links may be Amazon Associates affiliate links — not Rockstar or Take-Two. Cartography lineage includes community work such as GTADB under CC BY 4.0 where noted.",
    },
    {
      question: "Should I buy Collector or Standard?",
      answer:
        "Standard for play and value; Collector for memorabilia after the official contents list. Do not expect Online power gates. See our Collector's Edition guide for the longer decision template.",
    },
    {
      question: "What should I do while waiting for ASINs?",
      answer:
        "Lock platform, upgrade bottleneck hardware, explore /map with Landmarks, read regional /locations hubs, and optionally load the Cities: Skylines II fan Leonida save (map ID 153426) for a 3D street-level companion — fan estimate, not official.",
    },
    {
      question: "Do editions change the interactive map?",
      answer:
        "No. Standard and Collector play the same world geography on Map-6. Use Share links, overlay mode, and collectible filters the same way regardless of box.",
    },
  ],
  ctaTitle: "Explore Vice City while you wait",
  ctaBody:
    "Browse the interactive map — POIs, collectibles, coordinates, and Shareable deep links ready for launch day. Filter Landmarks while you scrub trailers, switch Collectibles when you plan routes, and keep GTADB attribution in mind when you credit the basemap on stream or in Discord.",
  ctaButton: "Open Interactive Map",
  backToGuides: "← All guides",
};

const FR: PreorderGuideCopy = {
  eyebrow: "Guide précommande",
  title: "Guide précommande GTA 6 — PS5, Xbox & Édition Collector",
  description:
    "Où précommander GTA 6 sur Amazon : éditions Standard et Collector pour PS5 et Xbox, plus le matériel pour le jour de sortie.",
  intro:
    "Grand Theft Auto VI sort le {date} sur PlayStation 5 et Xbox Series X|S. Ce guide précommande Map-6 est la checklist calme pour les copies day-one, le raisonnement Collector vs Standard, le lock plateforme, et le hardware achetable maintenant tant que les ASINs Amazon du jeu manquent. On reste pratique : pas de fausses listes leak Rockstar, pas de PC inventé day-and-date, et des renvois clairs vers la carte interactive pour que l'énergie hype aille vers la littératie Leonida — filtres, deep links, cartographie GTADB (CC BY 4.0) — plutôt que vers le refresh de fiches vides.",
  whereTitle: "Où précommander GTA 6",
  whereBody:
    "Rockstar a confirmé GTA 6 sur PlayStation 5 et Xbox Series X|S. Le timing PC, s'il existe, sera cité depuis les canaux officiels — Map-6 ne l'invente pas. Amazon reste l'un des canaux les plus sûrs : livraison fiable, retours simples, Prime sur articles éligibles, annulation d'une précommande jusqu'à l'expédition dans la plupart des cas. Comparez éditions et plateformes via les cartes produits dès que les ASINs officiels apparaissent. Certains liens peuvent être affiliés Amazon Associates ; Map-6 est une carte fan-made, pas Rockstar ni Take-Two. En attendant, explorez Vice City, les Keys, Port Gellhorn, Grassrivers, Ambrosia et Mount Kalaga sur /map avec Landmarks, et Sharez des deep links dans vos notes pour que la semaine de lancement soit de la navigation, pas de la panique shopping.",
  editionsTitle: "Édition Standard vs Collector",
  editionsBody:
    "La Standard inclut le jeu complet sans la taxe memorabilia — meilleur rapport si vous voulez du playtime ou du digital. La Collector ajoute en général du shelf pride physique (steelbook, statue, artbook) et des extras que Rockstar confirmera. Traitez toute liste non officielle comme provisoire. N'achetez pas Collector pour un avantage Online réel. Écrivez le premium vs Standard et demandez si vous paieriez ça pour les objets seuls. Indécis : Standard + casque/SSD du best-setup bat souvent une boîte ouverte une fois. Voyez aussi notre comparaison Collector dédiée. Les éditions ne changent pas la géographie Map-6 — mêmes filtres et coordonnées pour chaque SKU.",
  editionsPending:
    "Les fiches Amazon de précommande GTA 6 ne sont pas encore en ligne. Nous ajouterons les cartes affiliées dès les ASINs officiels. D'ici là : hardware ci-dessous, lock PS5 vs Xbox, préférence physique vs digital, /map en favori. Le stock Collector physique s'évapore près du lancement ; le Standard digital non — laissez cette asymétrie guider le FOMO, pas les threads rumeur.",
  platformTitle: "PS5 ou Xbox — quelle plateforme ?",
  platformBeforePs5: "Les deux consoles sortent GTA 6 le jour J. Choisissez la plateforme que vous possédez déjà ; les cross-saves ne sont pas annoncés. Sur PlayStation, prenez l'",
  platformPs5: "édition PS5",
  platformBetween: " ; sur Xbox, l'",
  platformXbox: "édition Xbox Series X|S",
  platformAfter:
    ". Listes d'amis, Game Pass ou PS Plus, ressenti DualSense vs pad Xbox, workflows capture comptent plus que la hauteur de statue. Un second console « juste pour GTA 6 » est rarement rentable. Foyer mixte : un SKU délibéré. Ensuite, ouvrez Map-6 et sauvegardez des deep links des districts qui vous intéressent pour le co-op soir 1.",
  hardwareTitle: "Besoin de nouveau matériel ?",
  hardwareBody:
    "La semaine de sortie est le pire moment pour manette HS, SSD plein ou mauvais port HDMI. Priorités : console saine, pad de rechange, casque wireless, stockage 1 To compatible avec marge patchs, HDMI 2.1 / 120 Hz si les modes perf comptent. Pas besoin d'OLED. Créateurs : voir le clip kit Map-6 pour overlay OBS (/overlay), thème streamer et tags ref. Les cartes ci-dessous sont des shortlists Amazon. Testez AV et party chat avant les files de minuit.",
  tipsTitle: "Conseils de précommande",
  tips: [
    "Précommandez tôt pour une version physique ou Collector — les stocks partent ; le Standard digital reste dispo.",
    "Vérifiez digital vs physique, région et édition exacte avant paiement ; capturez le panier pour un cadeau sur l'autre plateforme.",
    "Amazon autorise en général l'annulation jusqu'à l'expédition — utile si Rockstar clarifie les bonus.",
    "Comparez Standard vs Collector seulement après contenus officiels ; ignorez les compilations leak de statues.",
    "Laissez de la marge SSD pour patchs day-one et captures.",
    "Favori /map, pratiquez filtres Landmarks/Collectibles, Sharez quelques deep links (thème + ref optionnels).",
    "Créditez la carto communautaire — GTADB CC BY 4.0 — et ne présentez jamais des pins fan comme leaks Rockstar.",
    "Si le PC arrive plus tard, revenez ici ; les précommandes console ne se transfèrent pas.",
  ],
  faqTitle: "FAQ",
  faq: [
    {
      question: "Quand sort GTA 6 ?",
      answer:
        "Le {date} sur PS5 et Xbox Series X|S selon les plans console publics. Map-6 mettra à jour POI et collectibles dès données vérifiées — filtres et deep links d'abord, jamais de fausses listes complètes.",
    },
    {
      question: "Puis-je annuler une précommande Amazon ?",
      answer:
        "Oui — en général jusqu'à l'expédition. Vérifiez la politique sur la fiche, surtout Collector à allocation limitée.",
    },
    {
      question: "Map-6 est-il affilié à Rockstar ?",
      answer:
        "Non. Carte interactive fan-made. Liens Affiliés Amazon Associates possibles — pas Rockstar ni Take-Two. Carto GTADB en CC BY 4.0 là où noté.",
    },
    {
      question: "Collector ou Standard ?",
      answer:
        "Standard pour jouer et la valeur ; Collector pour memorabilia après liste officielle. Pas d'attente de power Online. Voir le guide Collector pour le template long.",
    },
    {
      question: "Que faire en attendant les ASINs ?",
      answer:
        "Lock plateforme, upgrader le hardware goulot, explorer /map, lire /locations, optionnellement CS2 map 153426 pour une balade 3D — estimation fan, pas officiel.",
    },
    {
      question: "Les éditions changent-elles la carte ?",
      answer:
        "Non. Même géographie Map-6. Share, overlay et filtres collectibles identiques quelle que soit la boîte.",
    },
  ],
  ctaTitle: "Explorez Vice City en attendant",
  ctaBody:
    "Parcourez la carte interactive — POI, collectibles, coordonnées et deep links Share prêts pour le jour J. Filtrez Landmarks en scrub trailer, Collectibles pour les routes, et gardez l'attribution GTADB en tête si vous créditez le basemap en stream ou Discord.",
  ctaButton: "Ouvrir la carte interactive",
  backToGuides: "← Tous les guides",
};

const ES: PreorderGuideCopy = {
  eyebrow: "Guía de preventa",
  title: "Guía de preventa de GTA 6 — PS5, Xbox y Edición Coleccionista",
  description:
    "Dónde hacer la preventa de GTA 6 en Amazon: ediciones Standard y Coleccionista para PS5 y Xbox, más hardware para el día del lanzamiento.",
  intro:
    "Grand Theft Auto VI se lanza el {date} en PlayStation 5 y Xbox Series X|S. Esta guía de preventa de Map-6 es la checklist calmada para copias day-one, el razonamiento Coleccionista vs Standard, el lock de plataforma y el hardware que puedes comprar ya mientras faltan ASINs de Amazon del juego. Seguimos siendo prácticos: sin falsas listas leak de Rockstar, sin PC inventado day-and-date, y con enlaces claros al mapa interactivo para que la energía del hype vaya a la literacidad de Leonida — filtros, deep links, cartografía GTADB (CC BY 4.0) — en lugar de refrescar fichas vacías.",
  whereTitle: "Dónde preordenar GTA 6",
  whereBody:
    "Rockstar ha confirmado GTA 6 para PlayStation 5 y Xbox Series X|S. El timing de PC, si existe, se citará desde canales oficiales — Map-6 no lo inventa. Amazon es uno de los canales más seguros: envío fiable, devoluciones fáciles, Prime en elegibles y cancelación de preventas hasta el envío en la mayoría de casos. Compara ediciones y plataformas con las tarjetas de producto en cuanto aparezcan ASINs oficiales. Algunos enlaces pueden ser de afiliados Amazon Associates; Map-6 es un mapa fan-made, no Rockstar ni Take-Two. Mientras esperas, explora Vice City, las Keys, Port Gellhorn, Grassrivers, Ambrosia y Mount Kalaga en /map con Landmarks, y comparte deep links en tus notas para que la semana de lanzamiento sea navegación, no pánico de compras.",
  editionsTitle: "Edición Standard vs Coleccionista",
  editionsBody:
    "Standard incluye el juego completo sin el impuesto de memorabilia — mejor valor si quieres horas de juego o digital. Coleccionista suele añadir orgullo de estantería (steelbook, estatua, artbook) y extras que Rockstar confirmará. Trata toda lista no oficial como provisional. No compres Coleccionista esperando ventaja de poder en Online. Anota el premium frente a Standard y pregunta si pagarías eso por los objetos solos. Si dudas: Standard + auriculares/SSD de la guía best-setup suele ganar al día a día frente a una caja que abres una vez. Mira también nuestra comparación Coleccionista. Las ediciones no cambian la geografía de Map-6 — mismos filtros y coordenadas para cada SKU.",
  editionsPending:
    "Las fichas de preventa de GTA 6 en Amazon aún no están disponibles. Añadiremos tarjetas de afiliado en cuanto haya ASINs oficiales. Mientras: hardware de abajo, lock PS5 vs Xbox, preferencia física vs digital, /map en favoritos. El stock físico Coleccionista se agota cerca del lanzamiento; el Standard digital no — deja que esa asimetría guíe el FOMO, no los hilos de rumores.",
  platformTitle: "¿PS5 o Xbox?",
  platformBeforePs5: "Ambas consolas lanzan GTA 6 el día uno. Elige la plataforma que ya tienes; no hay cross-saves anunciados. En PlayStation, ve a por la ",
  platformPs5: "edición PS5",
  platformBetween: "; en Xbox, la ",
  platformXbox: "edición Xbox Series X|S",
  platformAfter:
    ". Listas de amigos, Game Pass o PS Plus, DualSense vs mando Xbox y captura importan más que la altura de la estatua. Una segunda consola «solo por GTA 6» rara vez compensa. Hogar mixto: un SKU deliberado. Luego abre Map-6 y guarda deep links de los distritos que te importan para el co-op de la noche uno.",
  hardwareTitle: "¿Necesitas hardware nuevo?",
  hardwareBody:
    "La semana de lanzamiento es el peor momento para un mando roto, un SSD lleno o el HDMI equivocado. Prioriza: consola sana, mando de repuesto, auriculares wireless, almacenamiento 1 TB compatible con margen para parches, HDMI 2.1 / 120 Hz si te importan los modos de rendimiento. No necesitas OLED. Creadores: mira el clip kit de Map-6 para overlay OBS (/overlay), tema streamer y tags ref. Las tarjetas de abajo son shortlists de Amazon. Prueba AV y party chat antes de las colas de medianoche.",
  tipsTitle: "Consejos de preventa",
  tips: [
    "Preordena pronto si quieres copia física o Coleccionista — el stock se agota; el Standard digital sigue disponible.",
    "Comprueba digital vs física, región y edición exacta antes de pagar; captura el carrito si regalas a otra plataforma.",
    "Amazon suele permitir cancelar hasta el envío — útil si Rockstar aclara bonos.",
    "Compara Standard vs Coleccionista solo tras contenidos oficiales; ignora compilaciones leak de estatuas.",
    "Deja margen de SSD para parches day-one y capturas.",
    "Favorito /map, practica filtros Landmarks/Collectibles, comparte deep links (tema + ref opcionales).",
    "Acredita la cartografía comunitaria — GTADB CC BY 4.0 — y nunca presentes pines fan como leaks de Rockstar.",
    "Si llega PC después, vuelve aquí; las preventas de consola no se transfieren.",
  ],
  faqTitle: "FAQ",
  faq: [
    {
      question: "¿Cuándo sale GTA 6?",
      answer:
        "El {date} en PS5 y Xbox Series X|S según los planes públicos de consola. Map-6 actualizará POIs y coleccionables con datos verificados — filtros y deep links primero, nunca listas completas falsas.",
    },
    {
      question: "¿Puedo cancelar una preventa de Amazon?",
      answer:
        "Sí: suele permitirse hasta el envío. Revisa la política en la ficha, sobre todo Coleccionista con asignación limitada.",
    },
    {
      question: "¿Map-6 está afiliado a Rockstar?",
      answer:
        "No. Mapa interactivo fan-made. Enlaces de afiliados Amazon Associates posibles — no Rockstar ni Take-Two. Cartografía GTADB bajo CC BY 4.0 donde se indica.",
    },
    {
      question: "¿Coleccionista o Standard?",
      answer:
        "Standard para jugar y valor; Coleccionista para memorabilia tras lista oficial. No esperes poder Online. Ver la guía Coleccionista para el template largo.",
    },
    {
      question: "¿Qué hacer mientras faltan ASINs?",
      answer:
        "Lock de plataforma, mejorar el hardware cuello de botella, explorar /map, leer /locations, opcionalmente CS2 mapa 153426 para un paseo 3D — estimación fan, no oficial.",
    },
    {
      question: "¿Las ediciones cambian el mapa?",
      answer:
        "No. Misma geografía en Map-6. Share, overlay y filtros de coleccionables iguales sea cual sea la caja.",
    },
  ],
  ctaTitle: "Explora Vice City mientras esperas",
  ctaBody:
    "Abre el mapa interactivo: POIs, coleccionables, coordenadas y deep links compartibles listos para el día del lanzamiento. Filtra Landmarks al revisar tráileres, Collectibles al planear rutas, y ten presente la atribución GTADB si acreditas el basemap en stream o Discord.",
  ctaButton: "Abrir mapa interactivo",
  backToGuides: "← Todas las guías",
};

const BY_LOCALE: Record<string, PreorderGuideCopy> = {
  en: EN,
  fr: FR,
  es: ES,
  de: { ...EN, eyebrow: "Vorbestellungs-Guide", title: "GTA 6 Vorbestellung — PS5, Xbox & Collector's Edition", backToGuides: "← Alle Guides", ctaButton: "Interaktive Karte öffnen" },
  it: { ...EN, eyebrow: "Guida preordine", title: "Guida preordine GTA 6 — PS5, Xbox e Collector's Edition", backToGuides: "← Tutte le guide", ctaButton: "Apri mappa interattiva" },
  pt: { ...EN, eyebrow: "Guia de pré-venda", title: "Guia de pré-venda GTA 6 — PS5, Xbox e Edição Colecionador", backToGuides: "← Todos os guias", ctaButton: "Abrir mapa interativo" },
};

export function getPreorderGuideCopy(locale: string): PreorderGuideCopy {
  return BY_LOCALE[locale] ?? EN;
}
