import { GTA6_RELEASE } from "@/lib/constants";

/**
 * Confirmation sent to the subscriber. It doubles as the consent record: the
 * list is only worth building if every address can be shown to have opted in,
 * and if people recognise the sender when the launch email lands.
 */
export type ConfirmationCopy = { subject: string; text: string };

const UNSUBSCRIBE_MAILTO = "hello@map-6.com";

type Strings = {
  subject: string;
  intro: string;
  bullet1: string;
  bullet2: string;
  outro: string;
};

const COPY: Record<string, Strings> = {
  en: {
    subject: "You're on the GTA 6 launch alert list",
    intro:
      "Thanks — your address is saved. Here is exactly what you signed up for:",
    bullet1: "One email on launch day ({date}) with the day-one collectible maps.",
    bullet2:
      "One short heads-up if something major drops before then (new trailer, date change).",
    outro:
      "Nothing else, ever. We never share or sell the list. To be removed, just reply to this email.",
  },
  fr: {
    subject: "Tu es inscrit à l'alerte lancement GTA 6",
    intro: "Merci — ton adresse est enregistrée. Voici précisément ce que tu recevras :",
    bullet1:
      "Un email le jour du lancement ({date}) avec les cartes des collectibles day-one.",
    bullet2:
      "Un court message si un événement majeur tombe d'ici là (nouveau trailer, changement de date).",
    outro:
      "Rien d'autre, jamais. La liste n'est ni partagée ni revendue. Pour te désinscrire, réponds simplement à cet email.",
  },
  de: {
    subject: "Du stehst auf der GTA-6-Launch-Liste",
    intro: "Danke — deine Adresse ist gespeichert. Das bekommst du:",
    bullet1:
      "Eine E-Mail am Launch-Tag ({date}) mit den Collectible-Karten für Tag eins.",
    bullet2:
      "Eine kurze Nachricht, falls vorher etwas Großes passiert (neuer Trailer, Datumsänderung).",
    outro:
      "Sonst nichts. Die Liste wird nie geteilt oder verkauft. Zum Abmelden einfach auf diese E-Mail antworten.",
  },
  es: {
    subject: "Estás en la lista de aviso de lanzamiento de GTA 6",
    intro: "Gracias — tu dirección está guardada. Esto es lo que recibirás:",
    bullet1:
      "Un email el día del lanzamiento ({date}) con los mapas de coleccionables del día uno.",
    bullet2:
      "Un aviso breve si ocurre algo importante antes (nuevo tráiler, cambio de fecha).",
    outro:
      "Nada más. Nunca compartimos ni vendemos la lista. Para darte de baja, responde a este email.",
  },
  it: {
    subject: "Sei nella lista avvisi per il lancio di GTA 6",
    intro: "Grazie — il tuo indirizzo è salvato. Ecco cosa riceverai:",
    bullet1:
      "Una email il giorno del lancio ({date}) con le mappe dei collezionabili del day one.",
    bullet2:
      "Un breve avviso se succede qualcosa di importante prima (nuovo trailer, cambio data).",
    outro:
      "Nient'altro. La lista non viene mai condivisa né venduta. Per cancellarti, rispondi a questa email.",
  },
  pt: {
    subject: "Estás na lista de alerta de lançamento de GTA 6",
    intro: "Obrigado — o teu endereço está guardado. Isto é o que vais receber:",
    bullet1:
      "Um email no dia do lançamento ({date}) com os mapas de colecionáveis do day one.",
    bullet2:
      "Um aviso curto se acontecer algo importante antes (novo trailer, mudança de data).",
    outro:
      "Mais nada. A lista nunca é partilhada nem vendida. Para saíres, basta responder a este email.",
  },
};

export function buildConfirmation(locale?: string): ConfirmationCopy {
  const s = COPY[locale ?? "en"] ?? COPY.en;
  const date = GTA6_RELEASE.toLocaleDateString(locale ?? "en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return {
    subject: s.subject,
    text: [
      s.intro,
      "",
      `• ${s.bullet1.replace("{date}", date)}`,
      `• ${s.bullet2}`,
      "",
      s.outro,
      "",
      `— Map-6 · https://map-6.com · ${UNSUBSCRIBE_MAILTO}`,
    ].join("\n"),
  };
}
