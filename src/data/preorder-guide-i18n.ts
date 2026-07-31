export type PreorderGuideCopy = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  whereTitle: string;
  whereBody: string;
  editionsTitle: string;
  editionsBody: string;
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
    "Grand Theft Auto VI launches on {date}. Whether you are locking in a day-one copy or upgrading your setup before Jason and Lucia hit Vice City, this guide covers the best Amazon pre-order options.",
  whereTitle: "Where to pre-order GTA 6",
  whereBody:
    "Rockstar has confirmed GTA 6 for PlayStation 5 and Xbox Series X|S. PC details may follow later. Amazon is one of the safest places to pre-order: reliable shipping, easy returns, and Prime delivery on eligible items. Use the product cards below to compare editions and platforms.",
  editionsTitle: "Standard vs Collector's Edition",
  editionsBody:
    "The Standard Edition includes the full game. The Collector's Edition typically adds physical memorabilia and exclusive in-game content — Rockstar will confirm exact contents closer to launch. If you only want the game, standard is the best value. Collectors is for fans who want shelf-worthy extras.",
  platformTitle: "PS5 or Xbox — which platform?",
  platformBeforePs5:
    "Both consoles run GTA 6 at launch. Choose the platform you already own to avoid buying twice. PlayStation players should grab the ",
  platformPs5: "PS5 edition",
  platformBetween: "; Xbox owners should pick the ",
  platformXbox: "Xbox Series X|S edition",
  platformAfter:
    ". Cross-platform saves are unlikely — Rockstar has not announced them for GTA 6.",
  hardwareTitle: "Need new hardware?",
  hardwareBody:
    "Launch week is the worst time for a broken controller or outdated console. If you are upgrading before Vice City opens its doors, these Amazon picks are worth considering:",
  tipsTitle: "Pre-order tips",
  tips: [
    "Pre-order early if you want a physical copy — stocks sell out near launch.",
    "Check whether you are buying digital or physical before checkout.",
    "Amazon usually lets you cancel a pre-order until the item ships.",
    "Compare Standard vs Collector's Edition prices as Rockstar announces bonuses.",
  ],
  faqTitle: "FAQ",
  faq: [
    {
      question: "When does GTA 6 release?",
      answer:
        "{date}. Map-6 will be updated with every POI and collectible as community data drops.",
    },
    {
      question: "Can I cancel an Amazon pre-order?",
      answer:
        "Yes — Amazon allows cancellation on most pre-orders until the item ships. Check the product page for the current policy.",
    },
    {
      question: "Is Map-6 affiliated with Rockstar?",
      answer:
        "No. Map-6 is a fan-made interactive map. Some product links may be Amazon Associates affiliate links — not Rockstar or Take-Two.",
    },
  ],
  ctaTitle: "Explore Vice City while you wait",
  ctaBody:
    "Browse the interactive map — POIs, collectibles, and coordinates ready for launch day.",
  ctaButton: "Open Interactive Map",
  backToGuides: "← All guides",
};

const FR: PreorderGuideCopy = {
  eyebrow: "Guide précommande",
  title: "Guide précommande GTA 6 — PS5, Xbox & Édition Collector",
  description:
    "Où précommander GTA 6 sur Amazon : éditions Standard et Collector pour PS5 et Xbox, plus le matériel pour le jour de sortie.",
  intro:
    "Grand Theft Auto VI sort le {date}. Que vous sécurisiez une copie day-one ou que vous modernisiez votre setup avant l'arrivée de Jason et Lucia à Vice City, ce guide couvre les meilleures options de précommande Amazon.",
  whereTitle: "Où précommander GTA 6",
  whereBody:
    "Rockstar a confirmé GTA 6 sur PlayStation 5 et Xbox Series X|S. Le PC pourrait suivre plus tard. Amazon reste l'un des canaux les plus sûrs : livraison fiable, retours simples et Prime sur les articles éligibles. Comparez les éditions et plateformes via les cartes produits ci-dessous.",
  editionsTitle: "Édition Standard vs Collector",
  editionsBody:
    "L'édition Standard inclut le jeu complet. L'édition Collector ajoute généralement des goodies physiques et du contenu exclusif — Rockstar confirmera le détail à l'approche du lancement. Pour le jeu seul, la Standard offre le meilleur rapport qualité-prix. La Collector vise les fans qui veulent des extras à exposer.",
  platformTitle: "PS5 ou Xbox — quelle plateforme ?",
  platformBeforePs5:
    "Les deux consoles sortent GTA 6 le jour J. Choisissez la plateforme que vous possédez déjà pour éviter d'acheter deux fois. Sur PlayStation, prenez l'",
  platformPs5: "édition PS5",
  platformBetween: " ; sur Xbox, l'",
  platformXbox: "édition Xbox Series X|S",
  platformAfter:
    ". Les sauvegardes cross-play sont peu probables — Rockstar ne les a pas annoncées pour GTA 6.",
  hardwareTitle: "Besoin de nouveau matériel ?",
  hardwareBody:
    "La semaine de sortie est le pire moment pour une manette HS ou une console obsolète. Si vous upgez avant l'ouverture de Vice City, ces produits Amazon méritent le détour :",
  tipsTitle: "Conseils de précommande",
  tips: [
    "Précommandez tôt si vous voulez une version physique — les stocks partent vite.",
    "Vérifiez digital vs physique avant de valider le panier.",
    "Amazon autorise en général l'annulation d'une précommande jusqu'à l'expédition.",
    "Comparez Standard et Collector dès que Rockstar annonce les bonus.",
  ],
  faqTitle: "FAQ",
  faq: [
    {
      question: "Quand sort GTA 6 ?",
      answer:
        "Le {date}. Map-6 sera mis à jour avec chaque POI et collectible dès que la communauté publie de nouvelles données.",
    },
    {
      question: "Puis-je annuler une précommande Amazon ?",
      answer:
        "Oui — Amazon permet en général d'annuler une précommande jusqu'à l'expédition. Vérifiez la politique sur la fiche produit.",
    },
    {
      question: "Map-6 est-il affilié à Rockstar ?",
      answer:
        "Non. Map-6 est une carte interactive créée par des fans. Certains liens produits peuvent être des liens affiliés Amazon Associates — pas Rockstar ni Take-Two.",
    },
  ],
  ctaTitle: "Explorez Vice City en attendant",
  ctaBody:
    "Parcourez la carte interactive — POI, collectibles et coordonnées prêts pour le jour de sortie.",
  ctaButton: "Ouvrir la carte interactive",
  backToGuides: "← Tous les guides",
};

const ES: PreorderGuideCopy = {
  eyebrow: "Guía de preventa",
  title: "Guía de preventa de GTA 6 — PS5, Xbox y Edición Coleccionista",
  description:
    "Dónde hacer la preventa de GTA 6 en Amazon: ediciones Standard y Coleccionista para PS5 y Xbox, más hardware para el día del lanzamiento.",
  intro:
    "Grand Theft Auto VI se lanza el {date}. Tanto si aseguras una copia day-one como si actualizas tu setup antes de que Jason y Lucia lleguen a Vice City, esta guía cubre las mejores opciones de preventa en Amazon.",
  whereTitle: "Dónde preordenar GTA 6",
  whereBody:
    "Rockstar ha confirmado GTA 6 para PlayStation 5 y Xbox Series X|S. PC podría llegar más tarde. Amazon es uno de los canales más seguros: envío fiable, devoluciones fáciles y Prime en artículos elegibles. Compara ediciones y plataformas con las tarjetas de producto de abajo.",
  editionsTitle: "Edición Standard vs Coleccionista",
  editionsBody:
    "La edición Standard incluye el juego completo. La Coleccionista suele añadir memorabilia física y contenido exclusivo — Rockstar confirmará el detalle cerca del lanzamiento. Si solo quieres el juego, Standard es la mejor relación calidad-precio. Coleccionista es para fans que quieren extras de colección.",
  platformTitle: "¿PS5 o Xbox?",
  platformBeforePs5:
    "Ambas consolas lanzan GTA 6 el día uno. Elige la plataforma que ya tienes para no comprar dos veces. En PlayStation, ve a por la ",
  platformPs5: "edición PS5",
  platformBetween: "; en Xbox, la ",
  platformXbox: "edición Xbox Series X|S",
  platformAfter:
    ". Las partidas cruzadas son poco probables: Rockstar no las ha anunciado para GTA 6.",
  hardwareTitle: "¿Necesitas hardware nuevo?",
  hardwareBody:
    "La semana de lanzamiento es el peor momento para un mando roto o una consola antigua. Si vas a actualizar antes de explorar Vice City, estas opciones de Amazon merecen la pena:",
  tipsTitle: "Consejos de preventa",
  tips: [
    "Preordena pronto si quieres copia física: el stock se agota cerca del lanzamiento.",
    "Comprueba digital vs física antes de pagar.",
    "Amazon suele permitir cancelar una preventa hasta el envío.",
    "Compara Standard y Coleccionista cuando Rockstar anuncie los extras.",
  ],
  faqTitle: "FAQ",
  faq: [
    {
      question: "¿Cuándo sale GTA 6?",
      answer:
        "El {date}. Map-6 se actualizará con cada POI y coleccionable cuando la comunidad publique nuevos datos.",
    },
    {
      question: "¿Puedo cancelar una preventa de Amazon?",
      answer:
        "Sí: Amazon suele permitir cancelar preventas hasta que el artículo se envía. Revisa la política en la ficha del producto.",
    },
    {
      question: "¿Map-6 está afiliado a Rockstar?",
      answer:
        "No. Map-6 es un mapa interactivo hecho por fans. Algunos enlaces de producto pueden ser de afiliados de Amazon Associates — no de Rockstar ni Take-Two.",
    },
  ],
  ctaTitle: "Explora Vice City mientras esperas",
  ctaBody:
    "Abre el mapa interactivo: POIs, coleccionables y coordenadas listos para el día del lanzamiento.",
  ctaButton: "Abrir mapa interactivo",
  backToGuides: "← Todas las guías",
};

const BY_LOCALE: Record<string, PreorderGuideCopy> = {
  en: EN,
  fr: FR,
  es: ES,
};

export function getPreorderGuideCopy(locale: string): PreorderGuideCopy {
  return BY_LOCALE[locale] ?? EN;
}
