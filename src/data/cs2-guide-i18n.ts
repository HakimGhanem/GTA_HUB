export type Cs2GuideCopy = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  whatTitle: string;
  whatBody: string;
  howTitle: string;
  howSteps: string[];
  map6Title: string;
  map6Body: string;
  regionsTitle: string;
  disclaimerTitle: string;
  disclaimerBody: string;
  faqTitle: string;
  faq: { question: string; answer: string }[];
  ctaSteam: string;
  ctaMap: string;
  ctaGuideNote: string;
  backToGuides: string;
  regionLinksLabel: string;
};

const EN: Cs2GuideCopy = {
  eyebrow: "Community 3D recreation",
  title: "GTA 6 Map in Cities: Skylines II — Explore Leonida in 3D",
  description:
    "A fan rebuilt Vice City, the Keys, and Port Gellhorn in Cities: Skylines II (map ID 153426). How to load it, and how Map-6 complements the 3D walkthrough.",
  intro:
    "While waiting for Grand Theft Auto VI, a fan known as Noasden spent about 145 hours rebuilding the community-estimated Leonida map inside Cities: Skylines II — at a claimed 1:1 scale, with traffic and weather systems doing their city-sim thing. Steam map ID 153426 is the download handle. Map-6 stays your browser map for searchable POIs, collectible filters, HUD coordinates, Shareable deep links, streamer overlays, and regional guides. CS2 is the closest thing to a walkable 3D preview of the same community cartography lineage — including GTADB-style mapping credited under CC BY 4.0 where those assets apply upstream. Neither tool is Rockstar; both are useful when you refuse fake leak PDFs.",
  whatTitle: "What was rebuilt?",
  whatBody:
    "The recreation covers Vice City, Vice Beach, the Leonida Keys, Port Gellhorn, and surrounding fabric. Expect beach neon that reads like Ocean Drive energy, causeway approaches that sell Keys travel time, crane clutter for Port Gellhorn industry, and transitions toward wetlands and wilderness that echo Grassrivers and Mount Kalaga on Map-6 regional hubs. It is based on trailers, screenshots, and community mapping — not official Rockstar files. Street names, interior layouts, and mission routing in CS2 are not canon. When the real game ships, treat CS2 as a nostalgia and teaching tool that will drift from accuracy. Use it now to train relative geography: where paradise marketing sits next to wage work, gated money, and humidity.",
  howTitle: "How to explore it in Cities: Skylines II",
  howSteps: [
    "Own Cities: Skylines II on Steam (plus any required add-ons for the save). Missing DLC is the usual reason a map fails to load — fix packages before blaming the ID.",
    "Open the in-game download / map browser and search for map ID 153426, then load Noasden’s Leonida recreation.",
    "Lower graphics or pause simulation if you only need a camera tour; city-scale saves are heavy when you are sightseeing rather than governing.",
    "Walk or drive a beach strip, a causeway, an industrial edge, then look for wetland and wilderness transitions — narrate them against Map-6 region names.",
    "Flip to Map-6 in the browser: filter Landmarks, copy HUD X/Y, Share a deep link with optional theme and creator ref, and paste it into your notes or Discord.",
    "Optional creator loop: keep Map-6 /overlay as an OBS or Kick browser source beside CS2 so viewers see verified pins while you walk fan streets — label both as estimates.",
  ],
  map6Title: "Map-6 vs Cities: Skylines II",
  map6Body:
    "Use Map-6 to search POIs, filter Landmarks / Collectibles / Secrets, copy coordinates, read /locations hubs (Vice City, Ocean Drive, Leonida Keys, Port Gellhorn, Grassrivers, Ambrosia Island, Mount Kalaga), and ship Share links that land friends on the same camera. Use CS2 when you want street canyons, bridge approaches, and a gut sense of travel time between neon and yards. Same community map ancestry; different jobs. Collectibles planning still belongs on Map-6 — CS2 will not magically place Rockstar hidden packages; it only helps you see rooftops and pier geometry that historically hide pickups. After launch, Map-6 absorbs verified pins; CS2 stays a fan snapshot. Editions (Standard vs Collector) are irrelevant to both tools — see the pre-order guide only if you are shopping for November 19, 2026.",
  regionsTitle: "Jump to regional Map-6 guides",
  disclaimerTitle: "Important disclaimer",
  disclaimerBody:
    "This is a fan estimate inside a third-party city builder. It is not affiliated with Rockstar Games or Take-Two Interactive. Map-6 does not host CS2 assets — we link to Steam and help you cross-reference locations. We do not sell leak packs, invent interiors, or claim the CS2 layout is final Leonida geography. Credit GTADB CC BY 4.0 where Map-6 basemap lineage applies, and say “fan estimate” on stream when you show either tool.",
  faqTitle: "FAQ",
  faq: [
    {
      question: "Is the CS2 map the official GTA 6 map?",
      answer:
        "No. It is a community recreation of an estimated layout. The real Leonida will differ in districts, scale feel, and countless details Rockstar has not shown.",
    },
    {
      question: "What is map ID 153426?",
      answer:
        "The in-game Cities: Skylines II download ID for Noasden’s Leonida recreation. Search that ID after you own the game and required add-ons.",
    },
    {
      question: "Do I need Map-6 if I have the CS2 map?",
      answer:
        "Yes if you want searchable POIs, collectible tracking, SEO guides, Shareable coordinates, overlay deep links, and filterable trailer scrubbing without launching Steam.",
    },
    {
      question: "How should I study both together?",
      answer:
        "Pick a Map-6 regional hub, read the prose, open /map with Landmarks on, then walk the analogous district in CS2. Pause on a recognizable silhouette and Share a Map-6 deep link into your notes.",
    },
    {
      question: "Can I use this for collectible routes?",
      answer:
        "Only as pattern recognition (rooftops, piers, yards). Log candidates against Map-6 landmarks and trailer timestamps; convert to Collectibles pins after launch when evidence is reproducible — see the hidden-packages guide.",
    },
    {
      question: "Is Map-6 affiliated with the CS2 author?",
      answer:
        "No. We complement the recreation editorially. Always follow Steam’s page for the save’s own terms, updates, and credits.",
    },
  ],
  ctaSteam: "View Cities: Skylines II on Steam",
  ctaMap: "Open Map-6 interactive map",
  ctaGuideNote: "Map ID for the fan Leonida save: {id}",
  backToGuides: "← All guides",
  regionLinksLabel: "Explore on Map-6",
};

const FR: Cs2GuideCopy = {
  eyebrow: "Recréation 3D communautaire",
  title: "Carte GTA 6 dans Cities: Skylines II — Explorer Leonida en 3D",
  description:
    "Un fan a reconstruit Vice City, les Keys et Port Gellhorn dans Cities: Skylines II (ID carte 153426). Comment la charger, et comment Map-6 complète la balade 3D.",
  intro:
    "En attendant Grand Theft Auto VI, un fan connu sous le nom de Noasden a passé environ 145 heures à reconstruire la carte estimée de Leonida dans Cities: Skylines II — échelle annoncée 1:1, avec trafic et météo. L'ID Steam 153426 est la poignée de téléchargement. Map-6 reste votre carte navigateur pour POI cherchables, filtres collectibles, coordonnées HUD, deep links Share, overlays streamer et guides régionaux. CS2 est l'aperçu 3D marchable le plus proche de la même lignée de mapping communautaire — dont le travail type GTADB crédité CC BY 4.0 en amont le cas échéant. Aucun des deux n'est Rockstar ; les deux servent si vous refusez les PDF leak inventés.",
  whatTitle: "Qu’est-ce qui a été reconstruit ?",
  whatBody:
    "La recréation couvre Vice City, Vice Beach, les Leonida Keys, Port Gellhorn et le tissu autour. Attendez-vous à du néon plage façon Ocean Drive, des approches causeway qui vendent le temps de trajet Keys, du clutter de grues Port Gellhorn, et des transitions vers wetlands / wilderness qui font écho à Grassrivers et Mount Kalaga sur les hubs Map-6. Base : trailers, captures, mapping communautaire — pas de fichiers officiels Rockstar. Noms de rues, intérieurs et routes de missions dans CS2 ne sont pas canon. À la sortie du vrai jeu, traitez CS2 comme outil nostalgia / enseignement qui dérivera. Servez-vous-en maintenant pour entraîner la géographie relative : paradis marketing à côté du travail salarié, de l'argent gated et de l'humidité.",
  howTitle: "Comment l’explorer dans Cities: Skylines II",
  howSteps: [
    "Possédez Cities: Skylines II sur Steam (et les add-ons requis). Un DLC manquant est la cause habituelle d’un load raté.",
    "Ouvrez le navigateur de cartes / téléchargements, cherchez l’ID 153426, chargez la recréation Leonida de Noasden.",
    "Baissez les graphismes ou mettez la simu en pause pour un tour caméra ; les saves city-scale sont lourdes en sightseeing.",
    "Marchez ou roulez une strip plage, un causeway, un bord industriel, puis cherchez transitions wetlands / wilderness — narratez avec les noms de régions Map-6.",
    "Passez à Map-6 : filtrez Landmarks, copiez X/Y HUD, Sharez un deep link (thème + ref optionnels), collez dans notes ou Discord.",
    "Boucle créateur optionnelle : /overlay Map-6 en source navigateur OBS/Kick à côté de CS2 — étiquetez les deux comme estimations.",
  ],
  map6Title: "Map-6 vs Cities: Skylines II",
  map6Body:
    "Map-6 : chercher POI, filtrer Landmarks / Collectibles / Secrets, copier coords, lire /locations (Vice City, Ocean Drive, Keys, Port Gellhorn, Grassrivers, Ambrosia, Mount Kalaga), Share pour aligner la caméra des amis. CS2 : canyons de rues, approches de ponts, ressenti du temps de trajet entre néon et yards. Même lignée community ; jobs différents. La planification collectibles reste sur Map-6 — CS2 ne place pas magiquement les paquets Rockstar ; il aide à voir toits et jetées. Après lancement, Map-6 absorbe les pins vérifiés ; CS2 reste un snapshot fan. Standard vs Collector est hors sujet pour les deux outils — guide précommande seulement si vous shoppez pour le 19 novembre 2026.",
  regionsTitle: "Aller aux guides régionaux Map-6",
  disclaimerTitle: "Avertissement important",
  disclaimerBody:
    "Estimation fan dans un city builder tiers. Pas d'affiliation Rockstar Games ou Take-Two. Map-6 n'héberge aucun asset CS2 — lien Steam + croisement de lieux. Pas de leak packs vendus, pas d'intérieurs inventés, pas de claim que le layout CS2 est la Leonida finale. Créditez GTADB CC BY 4.0 là où la lignée basemap Map-6 s'applique, et dites « estimation fan » en stream.",
  faqTitle: "FAQ",
  faq: [
    {
      question: "La carte CS2 est-elle la carte officielle de GTA 6 ?",
      answer:
        "Non. Recréation communautaire d'une disposition estimée. La vraie Leonida différera sur districts, scale feel et détails non montrés.",
    },
    {
      question: "C’est quoi l’ID 153426 ?",
      answer:
        "ID de téléchargement Cities: Skylines II de la recréation Leonida de Noasden. Cherchez-le une fois le jeu et add-ons achetés.",
    },
    {
      question: "Ai-je encore besoin de Map-6 avec la carte CS2 ?",
      answer:
        "Oui pour POI cherchables, suivi collectibles, guides SEO, coords Share, deep links overlay et scrub trailer filtrable sans lancer Steam.",
    },
    {
      question: "Comment étudier les deux ensemble ?",
      answer:
        "Choisissez un hub régional Map-6, lisez la prose, ouvrez /map Landmarks, puis marchez le district analogue dans CS2. Pause sur une silhouette, Share deep link Map-6 dans vos notes.",
    },
    {
      question: "Puis-je m’en servir pour des routes collectibles ?",
      answer:
        "Seulement en pattern recognition (toits, jetées, yards). Loggez contre landmarks Map-6 + timestamps ; convertissez en pins Collectibles après lancement — voir guide paquets cachés.",
    },
    {
      question: "Map-6 est-il affilié à l’auteur CS2 ?",
      answer:
        "Non. Complément éditorial. Suivez la page Steam pour termes, updates et crédits de la save.",
    },
  ],
  ctaSteam: "Voir Cities: Skylines II sur Steam",
  ctaMap: "Ouvrir la carte interactive Map-6",
  ctaGuideNote: "ID de la save fan Leonida : {id}",
  backToGuides: "← Tous les guides",
  regionLinksLabel: "Explorer sur Map-6",
};

const ES: Cs2GuideCopy = {
  eyebrow: "Recreación 3D de la comunidad",
  title: "Mapa de GTA 6 en Cities: Skylines II — Explora Leonida en 3D",
  description:
    "Un fan reconstruyó Vice City, las Keys y Port Gellhorn en Cities: Skylines II (ID de mapa 153426). Cómo cargarlo y cómo Map-6 complementa el paseo 3D.",
  intro:
    "Mientras llega Grand Theft Auto VI, un fan conocido como Noasden dedicó unas 145 horas a reconstruir el mapa estimado de Leonida en Cities: Skylines II — escala anunciada 1:1, con tráfico y clima. El ID de Steam 153426 es la clave de descarga. Map-6 sigue siendo tu mapa en el navegador para POIs buscables, filtros de coleccionables, coordenadas HUD, deep links compartibles, overlays de streamer y guías regionales. CS2 es la vista 3D caminable más cercana de la misma línea de mapeo comunitario — incluido trabajo tipo GTADB acreditado CC BY 4.0 cuando aplica. Ninguna herramienta es Rockstar; ambas sirven si rechazas PDFs leak inventados.",
  whatTitle: "¿Qué se reconstruyó?",
  whatBody:
    "La recreación cubre Vice City, Vice Beach, Leonida Keys, Port Gellhorn y el tejido alrededor. Espera neón playero con energía Ocean Drive, causeways que venden tiempo de viaje a las Keys, grúas de Port Gellhorn y transiciones a humedales / wilderness que resonan con Grassrivers y Mount Kalaga en los hubs de Map-6. Base: tráileres, capturas, mapeo comunitario — no archivos oficiales de Rockstar. Nombres de calles, interiores y rutas de misión en CS2 no son canon. Cuando salga el juego real, trata CS2 como nostalgia y herramienta didáctica que se desalineará. Úsalo ahora para entrenar geografía relativa: marketing de paraíso junto a trabajo asalariado, dinero gated y humedad.",
  howTitle: "Cómo explorarlo en Cities: Skylines II",
  howSteps: [
    "Ten Cities: Skylines II en Steam (y los add-ons necesarios). Un DLC faltante suele explicar un load fallido.",
    "Abre el navegador de mapas / descargas, busca el ID 153426 y carga la recreación de Leonida de Noasden.",
    "Baja gráficos o pausa la simulación si solo quieres un tour de cámara; las partidas a escala ciudad pesan en sightseeing.",
    "Camina o conduce una franja de playa, un causeway, un borde industrial, luego busca transiciones a humedales / wilderness — nómbralas con las regiones de Map-6.",
    "Pasa a Map-6: filtra Landmarks, copia X/Y del HUD, comparte un deep link (tema + ref opcionales) y pégalo en notas o Discord.",
    "Bucle creador opcional: /overlay de Map-6 como fuente de navegador OBS/Kick junto a CS2 — etiqueta ambos como estimaciones.",
  ],
  map6Title: "Map-6 vs Cities: Skylines II",
  map6Body:
    "Map-6: buscar POIs, filtrar Landmarks / Collectibles / Secrets, copiar coords, leer /locations (Vice City, Ocean Drive, Keys, Port Gellhorn, Grassrivers, Ambrosia, Mount Kalaga), Share para alinear la cámara de tus amigos. CS2: cañones de calles, enfoques de puentes, sensación de tiempo de viaje entre neón y astilleros. Misma línea comunitaria; roles distintos. La planificación de coleccionables sigue en Map-6 — CS2 no coloca paquetes de Rockstar; solo ayuda a ver tejados y muelles. Tras el lanzamiento, Map-6 absorbe pines verificados; CS2 queda como snapshot fan. Standard vs Coleccionista es irrelevante para ambas herramientas — guía de preventa solo si compras para el 19 de noviembre de 2026.",
  regionsTitle: "Ir a las guías regionales de Map-6",
  disclaimerTitle: "Aviso importante",
  disclaimerBody:
    "Es una estimación fan dentro de un city builder de terceros. No está afiliada a Rockstar Games ni Take-Two. Map-6 no aloja assets de CS2: enlazamos a Steam y cruzamos ubicaciones. No vendemos leak packs, no inventamos interiores ni afirmamos que el layout de CS2 sea la Leonida final. Acredita GTADB CC BY 4.0 donde aplique la línea de basemap de Map-6, y di «estimación fan» en stream.",
  faqTitle: "FAQ",
  faq: [
    {
      question: "¿El mapa de CS2 es el mapa oficial de GTA 6?",
      answer:
        "No. Es una recreación comunitaria de un diseño estimado. La Leonida real diferirá en distritos, sensación de escala y detalles no mostrados.",
    },
    {
      question: "¿Qué es el ID 153426?",
      answer:
        "El ID de descarga en Cities: Skylines II de la recreación de Leonida de Noasden. Búscalo tras comprar el juego y los add-ons.",
    },
    {
      question: "¿Sigo necesitando Map-6 si tengo el mapa de CS2?",
      answer:
        "Sí si quieres POIs buscables, seguimiento de coleccionables, guías SEO, coordenadas compartibles, deep links de overlay y scrub de tráileres con filtros sin abrir Steam.",
    },
    {
      question: "¿Cómo estudiar ambos juntos?",
      answer:
        "Elige un hub regional de Map-6, lee la prosa, abre /map con Landmarks, luego camina el distrito análogo en CS2. Pausa en una silueta y comparte un deep link de Map-6 en tus notas.",
    },
    {
      question: "¿Sirve para rutas de coleccionables?",
      answer:
        "Solo como reconocimiento de patrones (tejados, muelles, astilleros). Registra candidatos contra landmarks de Map-6 y timestamps; conviértelos en pines Collectibles tras el lanzamiento — ver guía de paquetes ocultos.",
    },
    {
      question: "¿Map-6 está afiliado al autor de CS2?",
      answer:
        "No. Complemento editorial. Sigue la página de Steam para términos, updates y créditos de la partida.",
    },
  ],
  ctaSteam: "Ver Cities: Skylines II en Steam",
  ctaMap: "Abrir el mapa interactivo Map-6",
  ctaGuideNote: "ID de la partida fan de Leonida: {id}",
  backToGuides: "← Todas las guías",
  regionLinksLabel: "Explorar en Map-6",
};

const BY_LOCALE: Record<string, Cs2GuideCopy> = {
  en: EN,
  fr: FR,
  es: ES,
};

export function getCs2GuideCopy(locale: string): Cs2GuideCopy {
  return BY_LOCALE[locale] ?? EN;
}
