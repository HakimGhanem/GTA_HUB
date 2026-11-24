/**
 * GTA 6 100% Completion checklist (Progress › Stats › 100% Completion, unlocked
 * after the story). Transcribed from PowerPyx's checklist, 18 Nov 2026, which
 * matches GTABase's 100% guide and GTA Wiki. Nothing on it is missable.
 */
export type ChecklistItem = {
  id: string;
  en: string;
  fr: string;
  required: number;
  total?: number;
  /** Collectible type slug with its own page. */
  collectible?: string;
};

export type ChecklistGroup = { id: string; en: string; fr: string; items: ChecklistItem[] };

export const CHECKLIST_100: ChecklistGroup[] = [
  {
    id: "story",
    en: "Story & robberies",
    fr: "Histoire et braquages",
    items: [
      { id: "story", en: "Finish the story", fr: "Terminer l’histoire", required: 1, total: 1 },
      { id: "tasks", en: "Optional tasks completed", fr: "Tâches optionnelles terminées", required: 100 },
      { id: "gang-ops", en: "Gang operations cleared", fr: "Opérations de gang nettoyées", required: 39, total: 39 },
      { id: "bank-jobs", en: "Bank jobs fully completed", fr: "Braquages de banque terminés", required: 22, total: 22 },
      { id: "payday", en: "Payday loan jobs fully completed", fr: "Braquages de prêteurs sur salaire", required: 7, total: 7 },
      { id: "smash", en: "Smash ’N’ Grabs fully completed", fr: "Smash ’N’ Grabs terminés", required: 34, total: 35 },
      { id: "stickups", en: "Stick ups fully completed", fr: "Braquages à main armée terminés", required: 50, total: 91 },
      { id: "vaults", en: "Vaults hit", fr: "Coffres-forts pillés", required: 8, total: 8 },
      { id: "narcotics", en: "$100,000 of narcotics fenced", fr: "100 000 $ de stupéfiants revendus", required: 1, total: 1 },
      { id: "jewelry", en: "$100,000 of jewelry fenced", fr: "100 000 $ de bijoux revendus", required: 1, total: 1 },
      { id: "bills", en: "$250,000 of marked bills fenced", fr: "250 000 $ de billets marqués revendus", required: 1, total: 1 },
      { id: "vehicles-fenced", en: "$200,000 of vehicles fenced", fr: "200 000 $ de véhicules revendus", required: 1, total: 1 },
    ],
  },
  {
    id: "collections",
    en: "Collections",
    fr: "Collections",
    items: [
      { id: "flamingos", en: "Cocaine Flamingos destroyed", fr: "Flamants roses à cocaïne détruits", required: 100, total: 125, collectible: "cocaine-flamingos" },
      { id: "cards", en: "Collectible card sets completed", fr: "Sets de cartes complétés", required: 15, total: 18, collectible: "collectible-cards" },
      { id: "waink", en: "WAiNK locations scanned", fr: "Lieux WAiNK scannés", required: 100, collectible: "waink-locations" },
      { id: "underwater", en: "Underwater discoveries found", fr: "Découvertes sous-marines", required: 33, total: 33, collectible: "underwater-discoveries" },
      { id: "kenton", en: "Kenton sets completed", fr: "Sets de Kenton terminés", required: 5, total: 7, collectible: "underwater-discoveries" },
      { id: "magazines", en: "Magazines, books & comics found", fr: "Magazines, livres et BD trouvés", required: 30, total: 34, collectible: "magazines" },
      { id: "meditations", en: "Meditations completed", fr: "Méditations terminées", required: 15, total: 18, collectible: "meditation-spots" },
      { id: "playlists", en: "Unique playlists completed", fr: "Playlists uniques complétées", required: 2, total: 2 },
      { id: "styles", en: "Styles discovered", fr: "Styles découverts", required: 70, total: 79 },
    ],
  },
  {
    id: "activities",
    en: "Activities",
    fr: "Activités",
    items: [
      { id: "stunts", en: "Stunts completed (jumps, bridges, knife flights, base jumps)", fr: "Cascades (sauts, ponts, lames de couteau, base jumps)", required: 300, total: 397, collectible: "stunt-jumps" },
      { id: "challenges", en: "Challenges completed", fr: "Défis terminés", required: 70, total: 80 },
      { id: "races", en: "Unique races won", fr: "Courses uniques gagnées", required: 30, total: 40 },
      { id: "race-gold", en: "Race challenge gold medals", fr: "Médailles d’or en défi de course", required: 10, total: 13 },
      { id: "shooting", en: "Shooting range gold medals", fr: "Médailles d’or au stand de tir", required: 42, total: 42 },
      { id: "drones", en: "Top Fun drone time trials", fr: "Contre-la-montre de drones Top Fun", required: 42, total: 42 },
      { id: "basketball", en: "Basketball hoops scored", fr: "Paniers de basket marqués", required: 90, total: 100 },
      { id: "pool", en: "Pool opponents defeated", fr: "Adversaires de billard battus", required: 5, total: 7 },
      { id: "minigolf", en: "Mini golf courses played", fr: "Parcours de mini-golf joués", required: 2, total: 3 },
      { id: "games", en: "Video games played", fr: "Jeux vidéo lancés", required: 4, total: 4 },
      { id: "decks", en: "Bret’s target decks", fr: "Cibles de Bret", required: 15, total: 15 },
    ],
  },
  {
    id: "discovery",
    en: "Discovery",
    fr: "Découverte",
    items: [
      { id: "vehicles", en: "Base model vehicles scanned", fr: "Modèles de véhicules scannés", required: 200, total: 277 },
      { id: "weapons", en: "Standard issue weapons found", fr: "Armes standard trouvées", required: 50, total: 66 },
      { id: "animals", en: "Animals studied", fr: "Animaux étudiés", required: 100, total: 255, collectible: "wildlife" },
    ],
  },
];

export const CHECKLIST_ITEM_COUNT = CHECKLIST_100.reduce((n, g) => n + g.items.length, 0);
