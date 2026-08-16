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
    "While waiting for GTA 6, a fan known as Noasden spent about 145 hours rebuilding the community-estimated Leonida map inside Cities: Skylines II — at a claimed 1:1 scale, with traffic and weather. Map-6 stays your web map for POIs and collectibles; CS2 is the closest thing to a walkable 3D preview.",
  whatTitle: "What was rebuilt?",
  whatBody:
    "The recreation covers Vice City, Vice Beach, the Leonida Keys, Port Gellhorn, and surrounding areas. It is based on community mapping (trailers, screenshots, GTADB-style projects) — not official Rockstar files. Expect differences when the real game ships.",
  howTitle: "How to explore it in Cities: Skylines II",
  howSteps: [
    "Own Cities: Skylines II on Steam (plus any required add-ons for the save).",
    "Open the in-game download / map browser.",
    "Search for map ID 153426 and load the Leonida recreation.",
    "Walk districts, follow traffic, and compare landmarks with Map-6 coordinates.",
  ],
  map6Title: "Map-6 vs Cities: Skylines II",
  map6Body:
    "Use Map-6 in the browser to search POIs, filter collectibles, copy coordinates, and read regional guides. Use Cities: Skylines II when you want a street-level 3D feel. They share the same community map lineage — different jobs.",
  regionsTitle: "Jump to regional Map-6 guides",
  disclaimerTitle: "Important disclaimer",
  disclaimerBody:
    "This is a fan estimate inside a third-party game. It is not affiliated with Rockstar Games or Take-Two. Map-6 does not host CS2 assets — we only link to Steam and help you cross-reference locations.",
  faqTitle: "FAQ",
  faq: [
    {
      question: "Is the CS2 map the official GTA 6 map?",
      answer:
        "No. It is a community recreation of an estimated layout. The real Leonida will differ.",
    },
    {
      question: "What is map ID 153426?",
      answer:
        "The in-game Cities: Skylines II download ID for Noasden’s Leonida recreation. Search that ID after you own the game.",
    },
    {
      question: "Do I need Map-6 if I have the CS2 map?",
      answer:
        "Yes if you want searchable POIs, collectible tracking, SEO guides, and shareable coordinates without launching Steam.",
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
    "En attendant GTA 6, un fan connu sous le nom de Noasden a passé environ 145 heures à reconstruire la carte estimée de Leonida dans Cities: Skylines II — à une échelle annoncée 1:1, avec trafic et météo. Map-6 reste votre carte web pour les POI et collectibles ; CS2 est l’aperçu 3D le plus proche d’une balade à pied.",
  whatTitle: "Qu’est-ce qui a été reconstruit ?",
  whatBody:
    "La recréation couvre Vice City, Vice Beach, les Leonida Keys, Port Gellhorn et les environs. Elle s’appuie sur le mapping communautaire (trailers, captures, projets type GTADB) — pas sur des fichiers officiels Rockstar. Attendez-vous à des écarts à la sortie du vrai jeu.",
  howTitle: "Comment l’explorer dans Cities: Skylines II",
  howSteps: [
    "Possédez Cities: Skylines II sur Steam (et les add-ons requis pour la save).",
    "Ouvrez le navigateur de cartes / téléchargements en jeu.",
    "Cherchez l’ID de carte 153426 et chargez la recréation de Leonida.",
    "Parcourez les quartiers, suivez le trafic, et comparez les landmarks avec les coordonnées Map-6.",
  ],
  map6Title: "Map-6 vs Cities: Skylines II",
  map6Body:
    "Utilisez Map-6 dans le navigateur pour chercher des POI, filtrer les collectibles, copier des coordonnées et lire les guides régionaux. Utilisez Cities: Skylines II pour le ressenti 3D au niveau de la rue. Même lignée de mapping community — rôles différents.",
  regionsTitle: "Aller aux guides régionaux Map-6",
  disclaimerTitle: "Avertissement important",
  disclaimerBody:
    "Il s’agit d’une estimation fan dans un jeu tiers. Pas d’affiliation avec Rockstar Games ou Take-Two. Map-6 n’héberge aucun asset CS2 — nous lienons seulement vers Steam et aidons à croiser les lieux.",
  faqTitle: "FAQ",
  faq: [
    {
      question: "La carte CS2 est-elle la carte officielle de GTA 6 ?",
      answer:
        "Non. C’est une recréation communautaire d’une disposition estimée. La vraie Leonida sera différente.",
    },
    {
      question: "C’est quoi l’ID 153426 ?",
      answer:
        "L’ID de téléchargement Cities: Skylines II de la recréation Leonida de Noasden. Cherchez cet ID une fois le jeu acheté.",
    },
    {
      question: "Ai-je encore besoin de Map-6 avec la carte CS2 ?",
      answer:
        "Oui si vous voulez des POI cherchables, le suivi des collectibles, des guides SEO et des coordonnées partageables sans lancer Steam.",
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
    "Mientras llega GTA 6, un fan conocido como Noasden dedicó unas 145 horas a reconstruir el mapa estimado de Leonida en Cities: Skylines II — a escala anunciada 1:1, con tráfico y clima. Map-6 sigue siendo tu mapa web de POIs y coleccionables; CS2 es la vista 3D caminable más cercana.",
  whatTitle: "¿Qué se reconstruyó?",
  whatBody:
    "La recreación cubre Vice City, Vice Beach, Leonida Keys, Port Gellhorn y alrededores. Se basa en mapeo comunitario (tráileres, capturas, proyectos tipo GTADB), no en archivos oficiales de Rockstar. Habrá diferencias cuando salga el juego real.",
  howTitle: "Cómo explorarlo en Cities: Skylines II",
  howSteps: [
    "Ten Cities: Skylines II en Steam (y los add-ons necesarios para la partida).",
    "Abre el navegador de mapas / descargas del juego.",
    "Busca el ID de mapa 153426 y carga la recreación de Leonida.",
    "Recorre distritos, sigue el tráfico y compara landmarks con las coordenadas de Map-6.",
  ],
  map6Title: "Map-6 vs Cities: Skylines II",
  map6Body:
    "Usa Map-6 en el navegador para buscar POIs, filtrar coleccionables, copiar coordenadas y leer guías regionales. Usa Cities: Skylines II para la sensación 3D a pie de calle. Misma línea de mapeo comunitario — distintos roles.",
  regionsTitle: "Ir a las guías regionales de Map-6",
  disclaimerTitle: "Aviso importante",
  disclaimerBody:
    "Es una estimación fan dentro de un juego de terceros. No está afiliada a Rockstar Games ni Take-Two. Map-6 no aloja assets de CS2: solo enlazamos a Steam y ayudamos a cruzar ubicaciones.",
  faqTitle: "FAQ",
  faq: [
    {
      question: "¿El mapa de CS2 es el mapa oficial de GTA 6?",
      answer:
        "No. Es una recreación comunitaria de un diseño estimado. La Leonida real será distinta.",
    },
    {
      question: "¿Qué es el ID 153426?",
      answer:
        "El ID de descarga en Cities: Skylines II de la recreación de Leonida de Noasden. Búscalo tras comprar el juego.",
    },
    {
      question: "¿Sigo necesitando Map-6 si tengo el mapa de CS2?",
      answer:
        "Sí si quieres POIs buscables, seguimiento de coleccionables, guías SEO y coordenadas compartibles sin abrir Steam.",
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
