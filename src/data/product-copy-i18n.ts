import type { PreorderProduct } from "./preorder-products";

export type ProductCopy = {
  label: string;
  description: string;
  badge?: string;
};

type ProductCopyOverride = Partial<ProductCopy>;

const FR: Record<string, ProductCopyOverride> = {
  GTA6_PS5: {
    description:
      "Édition Standard pour PlayStation 5. Digital ou physique — vérifiez la disponibilité sur Amazon.",
    badge: "Le plus demandé",
  },
  GTA6_XBOX: {
    description: "Édition Standard pour consoles Xbox Series X et Series S.",
  },
  GTA6_ULTIMATE_PS5: {
    description:
      "Palier premium officiel à 99,99 $ US — extras digitaux. Aucune Ultimate physique listée.",
  },
  GTA6_ULTIMATE_XBOX: {
    description: "Édition Ultimate officielle pour Xbox Series X|S.",
  },
  GTA6_COLLECTORS_PS5: {
    description:
      "Coffret premium avec objets exclusifs en jeu et goodies physiques (quand disponible).",
  },
  GTA6_COLLECTORS_XBOX: {
    description: "Coffret premium Xbox Series X|S avec extras exclusifs.",
  },
  PS5: {
    label: "Console PlayStation 5",
    description:
      "Besoin d'une console pour le jour J ? Associez une PS5 à votre précommande GTA 6.",
  },
  XBOX_SERIES_X: {
    description: "La console la plus puissante de Microsoft — Vice City en 4K.",
  },
  DUALSENSE: {
    label: "Manette sans fil DualSense",
    description:
      "Manette supplémentaire pour les sessions à deux et les longues nuits à Vice City.",
  },
  DUALSENSE_WHITE: {
    description: "Seconde DualSense pour le co-op canapé à Vice City.",
  },
  XBOX_PAD: {
    label: "Manette sans fil Xbox",
    description:
      "Manette officielle Series X|S — bouton partage prêt pour les clips.",
  },
  DUALSENSE_EDGE: {
    description:
      "Sticks interchangeables et palettes arrière — setup streamer / compétitif.",
    badge: "Pro",
  },
  PULSE_3D: {
    label: "Casque sans fil Pulse Elite",
    description:
      "Audio Link sans perte officiel PS5 — chat clair pour les longues nuits à Vice City.",
  },
  ARCTIS_NOVA: {
    description:
      "Casque gaming sans fil PS5 — accessoire milieu de funnel très rentable.",
  },
  SSD_1TB: {
    description:
      "NVMe compatible PS5 avec dissipateur — de la marge pour GTA 6 et vos captures.",
    badge: "Stockage",
  },
  CAPTURE_CARD: {
    description:
      "Capture console propre pour Kick / TikTok / OBS avec l'overlay Map-6.",
    badge: "Créateurs",
  },
  CHARGE_DOCK: {
    label: "Station de charge DualSense",
    description:
      "Gardez deux manettes chargées pour les sessions marathon de la semaine de lancement.",
  },
  HDMI_21_TV: {
    label: "TV gaming 4K HDMI 2.1",
    description:
      "Écrans prêts pour le 120 Hz et les modes performance du lancement.",
    badge: "Setup",
  },
  GTA5_PS5: {
    description:
      "Rejouez Los Santos sur la carte classique en attendant GTA 6.",
  },
};

const ES: Record<string, ProductCopyOverride> = {
  GTA6_PS5: {
    description:
      "Edición Standard para PlayStation 5. Digital o física — comprueba la disponibilidad en Amazon.",
    badge: "Más popular",
  },
  GTA6_XBOX: {
    description: "Edición Standard para consolas Xbox Series X y Series S.",
  },
  GTA6_ULTIMATE_PS5: {
    description:
      "Nivel premium oficial de 99,99 $ US — extras digitales. No hay Ultimate física listada.",
  },
  GTA6_ULTIMATE_XBOX: {
    description: "Edición Ultimate oficial para Xbox Series X|S.",
  },
  GTA6_COLLECTORS_PS5: {
    description:
      "Pack premium con objetos exclusivos en el juego y coleccionables físicos (cuando esté disponible).",
  },
  GTA6_COLLECTORS_XBOX: {
    description: "Pack premium para Xbox Series X|S con extras exclusivos.",
  },
  PS5: {
    label: "Consola PlayStation 5",
    description:
      "¿Necesitas consola para el día del lanzamiento? Combina una PS5 con tu reserva de GTA 6.",
  },
  XBOX_SERIES_X: {
    description: "La consola más potente de Microsoft — Vice City a 4K.",
  },
  DUALSENSE: {
    label: "Mando inalámbrico DualSense",
    description:
      "Mando extra para partidas a dos y noches largas en Vice City.",
  },
  DUALSENSE_WHITE: {
    description: "Segundo DualSense para el co-op de sofá en Vice City.",
  },
  XBOX_PAD: {
    label: "Mando inalámbrico Xbox",
    description:
      "Mando oficial Series X|S — botón de compartir listo para clips.",
  },
  DUALSENSE_EDGE: {
    description:
      "Sticks intercambiables y botones traseros — setup de streamer o competitivo.",
    badge: "Pro",
  },
  PULSE_3D: {
    label: "Auriculares inalámbricos Pulse Elite",
    description:
      "Audio Link sin pérdidas oficial de PS5 — chat nítido para noches largas en Vice City.",
  },
  ARCTIS_NOVA: {
    description:
      "Auriculares gaming inalámbricos para PS5 — accesorio de medio funnel muy rentable.",
  },
  SSD_1TB: {
    description:
      "NVMe compatible con PS5 y disipador — margen para GTA 6 y tus capturas.",
    badge: "Almacenamiento",
  },
  CAPTURE_CARD: {
    description:
      "Captura de consola limpia para Kick / TikTok / OBS con el overlay de Map-6.",
    badge: "Creadores",
  },
  CHARGE_DOCK: {
    label: "Base de carga DualSense",
    description:
      "Mantén dos mandos cargados para las sesiones maratón de la semana de lanzamiento.",
  },
  HDMI_21_TV: {
    label: "TV gaming 4K HDMI 2.1",
    description:
      "Pantallas listas para 120 Hz y los modos de rendimiento del lanzamiento.",
    badge: "Setup",
  },
  GTA5_PS5: {
    description:
      "Vuelve a Los Santos en el mapa clásico mientras esperas GTA 6.",
  },
};

const BY_LOCALE: Record<string, Record<string, ProductCopyOverride>> = {
  fr: FR,
  es: ES,
};

/** Localized card copy for a product slot; falls back to the English source. */
export function getProductCopy(
  product: PreorderProduct,
  locale: string,
): ProductCopy {
  const override = BY_LOCALE[locale]?.[product.envKey];

  return {
    label: override?.label ?? product.label,
    description: override?.description ?? product.description,
    badge: override?.badge ?? product.badge,
  };
}
