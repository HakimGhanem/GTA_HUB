/** Bump when map FAQ, nav, or pin copy changes — drives sitemap lastmod. */
export const MAP_CONTENT_UPDATED_AT = "2026-10-19T12:00:00.000Z";

type MapFaqCopy = {
  summary: string;
  intro: string;
  faq: { question: string; answer: string }[];
};

const EN: MapFaqCopy = {
  summary: "About this GTA 6 map & FAQ",
  intro:
    "Map-6 is a free interactive GTA 6 map of Leonida and Vice City built from official trailers, screenshots and the Extended Look. Every pin carries a confidence label and, where we found one, the real-world address in Florida it is based on. Leak maps are never used.",
  faq: [
    {
      question: "Is there an official GTA 6 map?",
      answer:
        "Not yet. Rockstar has named the state of Leonida and hubs like Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga, but has not published a full map. Map-6 places what the official footage shows and labels how sure each match is.",
    },
    {
      question: "What does the Map-6 GTA 6 map show?",
      answer:
        "Over 1,000 real-world matches between trailer shots and Florida locations, each with a confidence label, plus coordinates, a distance tool and shareable links to the exact view.",
    },
    {
      question: "Will the map be updated when GTA 6 releases?",
      answer:
        "Yes. GTA 6 launches on 19 November 2026 on PlayStation 5 and Xbox Series X|S, with digital preload from 12 November. From launch day we add collectibles, stores and mission locations as they are verified in game.",
    },
    {
      question: "Is the map free?",
      answer:
        "Yes, the map, guides and local progress tracking are free. Map-6 Pro (€3.99 once) removes ads and adds cloud sync and CSV export.",
    },
    {
      question: "When does GTA 6 unlock, and when can I preload?",
      answer:
        "GTA 6 launches 19 November 2026 on PlayStation 5 and Xbox Series X|S. Digital preload starts 12 November at local midnight. Rockstar has not published an unlock hour. Map-6 has the release-time, preload and storage guides.",
    },
    {
      question: "Is GTA 6 on PC?",
      answer:
        "Rockstar has not announced a PC version. The launch covers PlayStation 5 and Xbox Series X|S only.",
    },
  ],
};

const FR: MapFaqCopy = {
  summary: "À propos de cette carte GTA 6 & FAQ",
  intro:
    "Map-6 est une carte interactive gratuite de GTA 6 (Leonida et Vice City), construite à partir des trailers officiels, des captures et de l'Extended Look. Chaque repère a un niveau de confiance et, quand nous l'avons trouvée, l'adresse réelle en Floride dont il s'inspire. Aucune carte issue de fuites n'est utilisée.",
  faq: [
    {
      question: "Existe-t-il une carte officielle de GTA 6 ?",
      answer:
        "Pas encore. Rockstar a nommé l'État de Leonida et des zones comme Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia et Mount Kalaga, sans publier de carte complète. Map-6 place ce que montrent les images officielles et indique le niveau de certitude de chaque correspondance.",
    },
    {
      question: "Que montre la carte GTA 6 de Map-6 ?",
      answer:
        "Plus de 1 000 correspondances entre les plans des trailers et des lieux réels de Floride, chacune avec un niveau de confiance, ainsi que les coordonnées, un outil de mesure de distance et des liens partageables vers la vue exacte.",
    },
    {
      question: "La carte sera-t-elle mise à jour à la sortie de GTA 6 ?",
      answer:
        "Oui. GTA 6 sort le 19 novembre 2026 sur PlayStation 5 et Xbox Series X|S, avec préchargement numérique dès le 12 novembre. Dès la sortie, nous ajoutons collectibles, magasins et lieux de missions au fur et à mesure qu'ils sont vérifiés en jeu.",
    },
    {
      question: "La carte est-elle gratuite ?",
      answer:
        "Oui, la carte, les guides et le suivi local de progression sont gratuits. Map-6 Pro (3,99 € une fois) retire les pubs et ajoute la synchronisation cloud et l'export CSV.",
    },
    {
      question: "À quelle heure GTA 6 se débloque-t-il, et quand précharger ?",
      answer:
        "GTA 6 sort le 19 novembre 2026 sur PlayStation 5 et Xbox Series X|S. Le préchargement numérique ouvre le 12 novembre à minuit local. Rockstar n'a pas publié d'heure de déblocage. Les guides Map-6 couvrent l'heure de sortie, le préchargement et l'espace disque.",
    },
    {
      question: "GTA 6 sort-il sur PC ?",
      answer:
        "Rockstar n'a pas annoncé de version PC. Le lancement concerne uniquement la PlayStation 5 et la Xbox Series X|S.",
    },
  ],
};

export function getMapFaq(locale: string): MapFaqCopy {
  return locale === "fr" ? FR : EN;
}
