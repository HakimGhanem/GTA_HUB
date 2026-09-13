export type AttributionsCopy = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string[];
  fieldLabels: {
    license: string;
    used: string;
    changes: string;
    files: string;
    source: string;
  };
  byPermissionBadge: string;
  byPermissionNote: string;
  removalTitle: string;
  removalBody: string;
  trademarkTitle: string;
  trademarkBody: string;
  reuseTitle: string;
  reuseBody: string;
};

const EN: AttributionsCopy = {
  eyebrow: "Data sources",
  title: "Attributions & data sources",
  description:
    "Every external dataset and basemap Map-6 uses, with its source, licence, what we use it for, and what we changed. GTADB (CC BY 4.0), DurtyFree, and community map projects.",
  intro: [
    "Map-6 is built on community cartography. This page is the single place where each external source is named with its licence, the part of the site it feeds, and the modifications we made — the two things a credit line alone never tells you. If a claim here does not match what you find upstream, that is a bug worth reporting.",
    "We also state where we hold no licence at all. Some community projects publish data without declaring terms; we credit them, we do not pretend that grants us rights, and we remove material on request from the author. Naming that openly is more useful than a blanket “community-sourced” disclaimer.",
  ],
  fieldLabels: {
    license: "Licence",
    used: "Used for",
    changes: "What we changed",
    files: "Datasets in our repo",
    source: "Source",
  },
  byPermissionBadge: "By permission — no licence declared",
  byPermissionNote:
    "This project declares no licence, so nothing here grants us reuse rights. We credit the author, keep the extract minimal, and will remove it on request.",
  removalTitle: "Removal and correction requests",
  removalBody:
    "If you maintain one of these projects and want your data removed, re-credited, or described differently, contact us through the about page and we will act on it — no argument, no delay tactics.",
  trademarkTitle: "Trademarks",
  trademarkBody:
    "Grand Theft Auto, GTA, Vice City, and Rockstar Games are trademarks of Take-Two Interactive. Map-6 is an independent fan project with no affiliation to, endorsement by, or partnership with Rockstar Games or Take-Two.",
  reuseTitle: "Reusing Map-6",
  reuseBody:
    "Our own editorial text, guides, and location prose are ours. Basemap tiles carry their upstream licence, so reuse must repeat the attribution above — CC BY 4.0 obligations travel with the tiles. Streamers and video creators: a spoken or on-screen credit plus a link is enough, and the creator kit gives you a ready-made credit line.",
};

const FR: AttributionsCopy = {
  eyebrow: "Sources de données",
  title: "Attributions et sources de données",
  description:
    "Tous les jeux de données et fonds de carte externes utilisés par Map-6, avec leur source, leur licence, l'usage que nous en faisons et nos modifications. GTADB (CC BY 4.0), DurtyFree et projets communautaires.",
  intro: [
    "Map-6 repose sur la cartographie communautaire. Cette page est l'endroit unique où chaque source externe est nommée avec sa licence, la partie du site qu'elle alimente et les modifications que nous avons apportées — les deux choses qu'une simple ligne de crédit ne dit jamais. Si une information ici ne correspond pas à ce que vous trouvez en amont, c'est un bug qui mérite d'être signalé.",
    "Nous indiquons aussi les cas où nous n'avons aucune licence. Certains projets communautaires publient des données sans préciser de conditions : nous les créditons, nous ne prétendons pas que cela nous accorde des droits, et nous retirons le contenu sur demande de l'auteur. Le dire ouvertement est plus utile qu'un vague avertissement « source communautaire ».",
  ],
  fieldLabels: {
    license: "Licence",
    used: "Utilisé pour",
    changes: "Nos modifications",
    files: "Jeux de données dans notre dépôt",
    source: "Source",
  },
  byPermissionBadge: "Par tolérance — aucune licence déclarée",
  byPermissionNote:
    "Ce projet ne déclare aucune licence : rien ici ne nous accorde de droits de réutilisation. Nous créditons l'auteur, gardons l'extrait minimal et le retirerons sur demande.",
  removalTitle: "Demandes de retrait ou de correction",
  removalBody:
    "Si vous maintenez l'un de ces projets et souhaitez que vos données soient retirées, créditées autrement ou décrites différemment, contactez-nous via la page À propos : nous agirons sans discuter et sans manœuvre dilatoire.",
  trademarkTitle: "Marques",
  trademarkBody:
    "Grand Theft Auto, GTA, Vice City et Rockstar Games sont des marques de Take-Two Interactive. Map-6 est un projet de fans indépendant, sans affiliation, approbation ni partenariat avec Rockstar Games ou Take-Two.",
  reuseTitle: "Réutiliser Map-6",
  reuseBody:
    "Nos textes éditoriaux, guides et descriptions de lieux sont les nôtres. Les tuiles de fond de carte conservent leur licence d'origine : toute réutilisation doit donc reprendre l'attribution ci-dessus, car les obligations CC BY 4.0 suivent les tuiles. Streamers et vidéastes : un crédit à l'oral ou à l'écran avec un lien suffit, et le kit créateur fournit une ligne de crédit prête à coller.",
};

/** Locales with written copy — drives canonical, hreflang and indexing */
export const ATTRIBUTIONS_LOCALES = ["en", "fr"] as const;

export function getAttributionsCopy(locale: string): AttributionsCopy {
  return locale === "fr" ? FR : EN;
}

export function hasAttributionsTranslation(locale: string): boolean {
  return (ATTRIBUTIONS_LOCALES as readonly string[]).includes(locale);
}
