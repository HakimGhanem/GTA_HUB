export type PreorderGuideCopy = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  whereTitle: string;
  whereBody: string;
  editionsTitle: string;
  editionsBody: string;
  comparison: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  /** Stock and pricing caveat shown next to the game product cards */
  stockNote: string;
  retailersTitle: string;
  retailersBody: string;
  retailersLinkLabel: string;
  platformTitle: string;
  platformBeforePs5: string;
  platformPs5: string;
  platformBetween: string;
  platformXbox: string;
  platformAfter: string;
  hardwareTitle: string;
  hardwareBody: string;
  setupUpgradesTitle: string;
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
  title: "GTA 6 Pre-Order Guide — PS5, Xbox, Standard & Ultimate",
  description:
    "Where to pre-order GTA 6: official Standard ($79.99) and Ultimate ($99.99) for PS5 and Xbox, Vintage Vice City Pack, preload November 12, plus hardware picks.",
  intro:
    "Grand Theft Auto VI launches on {date} for PlayStation 5 and Xbox Series X|S. Official US prices from Take-Two: Standard $79.99, Ultimate $99.99. Eligible purchases before November 20, 2026 include the Vintage Vice City Pack; eligible digital copies include a month of GTA+. Preload starts November 12. This Map-6 pre-order guide is the calm checklist for day-one copies, Standard versus Ultimate, platform lock-in, and the hardware you can buy now. We stay practical: no fake Collector leak lists, no invented PC day-and-date claims, and clear pointers back to the interactive map so hype energy goes into Leonida literacy — filters, deep links, and GTADB-attributed cartography (CC BY 4.0 where noted).",
  whereTitle: "Where to pre-order GTA 6",
  whereBody:
    "Rockstar has confirmed GTA 6 for PlayStation 5 and Xbox Series X|S. PC timing, if any, will be cited from official channels when it exists — Map-6 will not invent it. Amazon is one of the safest places to pre-order for many players: reliable shipping, easy returns, Prime delivery on eligible items, cancellation on most pre-orders until the item ships, and a lowest-price guarantee that bills you the cheapest price seen before dispatch. Pre-orders opened June 25, 2026, and Amazon.fr undercut the €79.99 RRP at €60 for both platforms. Use the product cards below to jump straight to the PS5 or Xbox listing. Some links may be Amazon Associates affiliates; Map-6 is a fan-made interactive map, not Rockstar or Take-Two — see the site disclosure. While you wait for launch, keep exploring Vice City, the Leonida Keys, Port Gellhorn, Grassrivers, Ambrosia Island, and Mount Kalaga on /map with Landmarks filtered, and Share deep links into your notes so launch week is navigation rather than shopping panic.",
  editionsTitle: "Standard vs Ultimate Edition",
  editionsBody:
    "Standard ($79.99 US) is the full game. Ultimate ($99.99 US) is the official premium tier — exclusive vehicles, weapons, apparel, and story-threaded extras per Take-Two. There is no announced Collector’s Edition in the launch pair, and no physical Ultimate SKU. Physical Standard is a download code in the box, not a disc, available from November 12 to support preload. Standard owners can buy an Ultimate Upgrade later on PlayStation or Microsoft stores after redeeming the base code. The Vintage Vice City Pack (eligible purchases before November 20) is not Ultimate-exclusive. If you are undecided, Standard plus a headset or SSD from our best-setup guide often beats $20 of unseen cosmetics. Pair this section with our Ultimate vs Standard comparison. Editions do not change Map-6 geography.",
  comparison: {
    caption: "Take-Two / Rockstar Support — US retail baseline",
    headers: ["", "Standard", "Ultimate"],
    rows: [
      ["US price", "$79.99", "$99.99"],
      ["Vintage Vice City Pack (before Nov 20)", "Eligible yes", "Eligible yes"],
      ["GTA+ month (digital)", "Eligible yes", "Eligible yes"],
      ["Physical", "Code-in-box, no disc", "Not listed"],
      ["Upgrade later", "Yes → Ultimate Upgrade", "Included"],
    ],
  },
  stockNote:
    "Stock caveat: Amazon.fr only lists the Standard code-in-box SKUs — one for PS5, one for Xbox Series X|S. Ultimate is digital-only on the PlayStation and Microsoft stores, and there is no Collector's SKU to hunt. Because Rockstar allots key quotas per retailer, both listings sold out within 48 hours of opening and have flipped between “in stock at €60” and “currently unavailable” since. If a card lands on an unavailable page, check back after the next Rockstar beat rather than paying a marketplace markup — and remember the digital store never sells out.",
  retailersTitle: "Amazon vs Fnac vs Cdiscount vs Carrefour",
  retailersBody:
    "Amazon is not the only shop undercutting the €79.99 store price. Fnac, Cdiscount and Carrefour list the same Standard code-in-box SKU around €60, with the same Vintage Vice City Pack eligibility and no store-exclusive bonus anywhere — the only real differences are stock, delivery and how late you can cancel. Compare all six storefronts below, official stores included.",
  retailersLinkLabel: "See the full GTA 6 price comparison →",
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
  setupUpgradesTitle: "Launch setup upgrades",
  tipsTitle: "Pre-order tips",
  tips: [
    "Pre-order early if you want a physical code-in-box copy — digital Standard remains available; there is no physical Ultimate.",
    "Check digital versus physical, region, and Standard versus Ultimate before checkout; screenshot the cart if you are gift-buying for someone else's platform.",
    "Amazon usually lets you cancel a pre-order until the item ships — useful if you change platforms or skip Ultimate.",
    "The Vintage Vice City Pack window is November 20, 2026 — not a reason to buy fake Collector leak lists.",
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
      question: "Should I buy Ultimate or Standard?",
      answer:
        "Standard ($79.99 US) for play and value; Ultimate ($99.99 US) only if the official extras list is worth $20. The Vintage Vice City Pack can apply to both before November 20. See our Ultimate vs Standard guide.",
    },
    {
      question: "What if the Amazon listing shows as unavailable?",
      answer:
        "Retailer key quotas run out, so the code-in-box listings go in and out of stock — Amazon restocked at €60 once already. Set a stock alert instead of paying a marketplace markup, or buy digital on the PlayStation/Microsoft store, which never sells out. Meanwhile: lock platform, upgrade bottleneck hardware, and explore /map with Landmarks.",
    },
    {
      question: "Do editions change the interactive map?",
      answer:
        "No. Standard and Ultimate play the same world geography on Map-6. Use Share links, overlay mode, and collectible filters the same way regardless of edition.",
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
  title: "Guide précommande GTA 6 — PS5, Xbox, Standard & Ultimate",
  description:
    "Où précommander GTA 6 : Standard (79,99 $) et Ultimate (99,99 $) officielles, pack Vintage Vice City, preload 12 novembre, plus le matériel.",
  intro:
    "Grand Theft Auto VI sort le {date} sur PlayStation 5 et Xbox Series X|S. Les précommandes sont ouvertes depuis le 25 juin 2026, et Amazon.fr casse le prix conseillé de 79,99 € à 60 € sur les deux plateformes. Ce guide précommande Map-6 est la checklist calme pour les copies day-one : le raisonnement Ultimate vs Standard, le lock plateforme, la réalité du stock par quotas, et le hardware achetable maintenant. On reste pratique : pas de fausses listes leak Rockstar, pas de PC inventé day-and-date, et des renvois clairs vers la carte interactive pour que l'énergie hype aille vers la littératie Leonida — filtres, deep links, cartographie GTADB (CC BY 4.0).",
  whereTitle: "Où précommander GTA 6",
  whereBody:
    "Rockstar a confirmé GTA 6 sur PlayStation 5 et Xbox Series X|S. Le timing PC, s'il existe, sera cité depuis les canaux officiels — Map-6 ne l'invente pas. Amazon reste l'un des canaux les plus sûrs : livraison fiable et gratuite, retours simples, prélèvement seulement à l'expédition, annulation possible jusque-là, et garantie du prix le plus bas qui vous débite le tarif le plus avantageux vu avant l'envoi. Les boîtes code sont annoncées pour le 12 novembre, une semaine avant la sortie, de quoi lancer le préchargement. Utilisez les cartes produits ci-dessous pour aller directement sur la fiche PS5 ou Xbox. Certains liens peuvent être affiliés Amazon Associates ; Map-6 est une carte fan-made, pas Rockstar ni Take-Two. En attendant le lancement, explorez Vice City, les Keys, Port Gellhorn, Grassrivers, Ambrosia et Mount Kalaga sur /map avec Landmarks, et Sharez des deep links dans vos notes pour que la semaine de lancement soit de la navigation, pas de la panique shopping.",
  editionsTitle: "Édition Standard vs Ultimate",
  editionsBody:
    "Standard (79,99 $ US) = le jeu complet. Ultimate (99,99 $ US) = le palier premium officiel (véhicules, armes, tenues, extras liés à l’histoire selon Take-Two). Pas d’édition Collector annoncée dans la paire de lancement, pas d’Ultimate physique. La Standard physique est un code dans la boîte, pas un disque, dès le 12 novembre pour le preload. Les propriétaires Standard peuvent acheter l’upgrade Ultimate plus tard. Le pack Vintage Vice City (achats éligibles avant le 20 novembre) n’est pas exclusif Ultimate. Indécis : Standard + casque/SSD bat souvent 20 $ de cosmétique non listée. Voir la comparaison Ultimate. Les éditions ne changent pas la géographie Map-6.",
  comparison: {
    caption: "Take-Two / Rockstar Support — référence tarifaire US",
    headers: ["", "Standard", "Ultimate"],
    rows: [
      ["Prix US", "79,99 $", "99,99 $"],
      ["Pack Vintage Vice City (avant le 20 nov.)", "Éligible", "Éligible"],
      ["Mois de GTA+ (digital)", "Éligible", "Éligible"],
      ["Physique", "Code dans la boîte, sans disque", "Non listé"],
      ["Upgrade plus tard", "Oui → upgrade Ultimate", "Inclus"],
    ],
  },
  stockNote:
    "Réalité du stock : Amazon.fr ne liste que les deux boîtes code Standard — une PS5, une Xbox Series X|S. L'Ultimate est dématérialisée uniquement sur le PlayStation Store et le Microsoft Store, et il n'existe aucune édition Collector à chasser. Comme Rockstar alloue des quotas de clés par revendeur, les deux fiches sont parties en rupture 48 h après l'ouverture, puis ont alterné entre « en stock à 60 € » et « actuellement indisponible ». Si une carte tombe sur une fiche indisponible, posez une alerte stock et attendez le prochain réassort plutôt que de payer une marge marketplace — le digital, lui, n'est jamais en rupture.",
  retailersTitle: "Amazon, Fnac, Cdiscount ou Carrefour ?",
  retailersBody:
    "Amazon n'est pas le seul à casser les 79,99 € des stores officiels. Fnac, Cdiscount et Carrefour référencent la même Standard en boîte code autour de 60 €, avec la même éligibilité au pack Vintage Vice City et aucun bonus exclusif d'enseigne : les vraies différences sont le stock, la livraison et le délai d'annulation. Comparez les six enseignes ci-dessous, stores officiels inclus.",
  retailersLinkLabel: "Voir le comparateur complet des prix GTA 6 →",
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
  setupUpgradesTitle: "Upgrades setup pour le lancement",
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
      question: "Ultimate ou Standard ?",
      answer:
        "Standard (79,99 $ US) pour jouer et la valeur ; Ultimate (99,99 $ US) seulement si la liste officielle vaut 20 $. Le pack Vintage Vice City peut s’appliquer aux deux avant le 20 novembre. Voir le guide Ultimate vs Standard.",
    },
    {
      question: "Et si la fiche Amazon est indisponible ?",
      answer:
        "Les quotas de clés par revendeur s'épuisent, donc les boîtes code alternent stock et rupture — Amazon a déjà réapprovisionné une fois à 60 €. Posez une alerte stock plutôt que de payer une marge marketplace, ou prenez le digital sur le PlayStation/Microsoft Store, jamais en rupture. En attendant : lock plateforme, hardware goulot, /map et /locations.",
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
  title: "Guía de preventa de GTA 6 — PS5, Xbox, Standard y Ultimate",
  description:
    "Dónde hacer la preventa de GTA 6 en Amazon: ediciones Standard y Coleccionista para PS5 y Xbox, más hardware para el día del lanzamiento.",
  intro:
    "Grand Theft Auto VI se lanza el {date} en PlayStation 5 y Xbox Series X|S. Las preventas están abiertas desde el 25 de junio de 2026 y Amazon.fr rebaja el PVP de 79,99 € a 60 € en ambas plataformas. Esta guía de preventa de Map-6 es la checklist calmada para copias day-one: el razonamiento Ultimate vs Standard, el lock de plataforma, la realidad del stock por cupos y el hardware que puedes comprar ya. Seguimos siendo prácticos: sin falsas listas leak de Rockstar, sin PC inventado day-and-date, y con enlaces claros al mapa interactivo para que la energía del hype vaya a la literacidad de Leonida — filtros, deep links, cartografía GTADB (CC BY 4.0).",
  whereTitle: "Dónde preordenar GTA 6",
  whereBody:
    "Rockstar ha confirmado GTA 6 para PlayStation 5 y Xbox Series X|S. El timing de PC, si existe, se citará desde canales oficiales — Map-6 no lo inventa. Amazon es uno de los canales más seguros: envío fiable, devoluciones fáciles, Prime en elegibles y cancelación de preventas hasta el envío en la mayoría de casos. Usa las tarjetas de producto de abajo para ir directo a la ficha de PS5 o Xbox. Algunos enlaces pueden ser de afiliados Amazon Associates; Map-6 es un mapa fan-made, no Rockstar ni Take-Two. Mientras esperas el lanzamiento, explora Vice City, las Keys, Port Gellhorn, Grassrivers, Ambrosia y Mount Kalaga en /map con Landmarks, y comparte deep links en tus notas para que la semana de lanzamiento sea navegación, no pánico de compras.",
  editionsTitle: "Edición Standard vs Ultimate",
  editionsBody:
    "Standard incluye el juego completo sin el impuesto de memorabilia — mejor valor si quieres horas de juego o digital. Coleccionista suele añadir orgullo de estantería (steelbook, estatua, artbook) y extras que Rockstar confirmará. Trata toda lista no oficial como provisional. No compres Coleccionista esperando ventaja de poder en Online. Anota el premium frente a Standard y pregunta si pagarías eso por los objetos solos. Si dudas: Standard + auriculares/SSD de la guía best-setup suele ganar al día a día frente a una caja que abres una vez. Mira también nuestra comparación Coleccionista. Las ediciones no cambian la geografía de Map-6 — mismos filtros y coordenadas para cada SKU.",
  comparison: {
    caption: "Take-Two / Rockstar Support — referencia de precios en EE. UU.",
    headers: ["", "Standard", "Ultimate"],
    rows: [
      ["Precio US", "79,99 $", "99,99 $"],
      ["Pack Vintage Vice City (antes del 20 nov.)", "Elegible", "Elegible"],
      ["Mes de GTA+ (digital)", "Elegible", "Elegible"],
      ["Física", "Código en la caja, sin disco", "No listada"],
      ["Mejorar después", "Sí → mejora a Ultimate", "Incluido"],
    ],
  },
  stockNote:
    "Realidad del stock: Amazon.fr solo lista las dos cajas con código Standard — una de PS5 y otra de Xbox Series X|S. La Ultimate es digital exclusiva de PlayStation Store y Microsoft Store, y no existe ninguna edición Coleccionista que perseguir. Como Rockstar reparte cupos de claves por tienda, ambas fichas se agotaron 48 h después de la apertura y desde entonces alternan entre «en stock a 60 €» y «no disponible actualmente». Si una tarjeta cae en una ficha agotada, activa un aviso de stock en vez de pagar sobreprecio de marketplace — el digital nunca se agota.",
  retailersTitle: "Amazon, Fnac, Cdiscount o Carrefour",
  retailersBody:
    "Amazon no es la única tienda que baja de los 79,99 € oficiales. Fnac, Cdiscount y Carrefour listan la misma Standard en caja con código alrededor de 60 €, con la misma elegibilidad al pack Vintage Vice City y sin bono exclusivo de tienda: lo que cambia es el stock, el envío y hasta cuándo puedes cancelar. Compara las seis tiendas abajo, incluidas las oficiales.",
  retailersLinkLabel: "Ver el comparador completo de precios de GTA 6 →",
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
  setupUpgradesTitle: "Mejoras de setup para el lanzamiento",
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
      question: "¿Y si la ficha de Amazon aparece agotada?",
      answer:
        "Los cupos de claves por tienda se acaban, así que las cajas con código alternan stock y agotado — Amazon ya reabasteció una vez a 60 €. Activa un aviso de stock en vez de pagar sobreprecio de marketplace, o compra digital en PlayStation/Microsoft Store, que nunca se agota. Mientras: lock de plataforma, hardware cuello de botella, /map y /locations.",
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
  de: { ...EN, eyebrow: "Vorbestellungs-Guide", title: "GTA 6 Vorbestellung — PS5, Xbox, Standard & Ultimate", backToGuides: "← Alle Guides", ctaButton: "Interaktive Karte öffnen" },
  it: { ...EN, eyebrow: "Guida preordine", title: "Guida preordine GTA 6 — PS5, Xbox, Standard e Ultimate", backToGuides: "← Tutte le guide", ctaButton: "Apri mappa interattiva" },
  pt: { ...EN, eyebrow: "Guia de pré-venda", title: "Guia de pré-venda GTA 6 — PS5, Xbox, Standard e Ultimate", backToGuides: "← Todos os guias", ctaButton: "Abrir mapa interativo" },
};

export function getPreorderGuideCopy(locale: string): PreorderGuideCopy {
  return BY_LOCALE[locale] ?? EN;
}
