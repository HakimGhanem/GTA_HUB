import { GTA6_RELEASE, SITE } from "@/lib/constants";

/**
 * Confirmation sent to the subscriber. It doubles as the consent record: the
 * list is only worth building if every address can be shown to have opted in,
 * and if people recognise the sender when the launch email lands.
 */
export type ConfirmationCopy = {
  subject: string;
  text: string;
  html: string;
  headers: Record<string, string>;
};

const UNSUBSCRIBE_MAILTO = "hello@map-6.com";

type Strings = {
  subject: string;
  /** Inbox preview line — shown next to the subject before opening. */
  preheader: string;
  heading: string;
  intro: string;
  dateLabel: string;
  bullet1: string;
  bullet2: string;
  cta: string;
  promise: string;
  unsubscribe: string;
};

const COPY: Record<string, Strings> = {
  en: {
    subject: "You're on the GTA 6 launch alert list",
    preheader: "Day-one collectible maps, the moment GTA 6 is playable.",
    heading: "You're on the list",
    intro: "Your address is saved. Here is exactly what you signed up for:",
    dateLabel: "GTA 6 launch day",
    bullet1: "One email on launch day with the day-one collectible maps.",
    bullet2:
      "One short heads-up if something major drops before then — a new trailer, or a date change.",
    cta: "Open the interactive map",
    promise: "Two emails maximum. Never shared, never sold.",
    unsubscribe: "To be removed, just reply to this email.",
  },
  fr: {
    subject: "Tu es inscrit à l'alerte lancement GTA 6",
    preheader: "Les cartes des collectibles, dès que GTA 6 est jouable.",
    heading: "Tu es sur la liste",
    intro:
      "Ton adresse est enregistrée. Voici précisément ce que tu vas recevoir :",
    dateLabel: "Sortie de GTA 6",
    bullet1:
      "Un email le jour du lancement avec les cartes des collectibles day-one.",
    bullet2:
      "Un court message si un événement majeur tombe d'ici là — nouveau trailer, ou changement de date.",
    cta: "Ouvrir la carte interactive",
    promise: "Deux emails maximum. Jamais partagés, jamais revendus.",
    unsubscribe: "Pour te désinscrire, réponds simplement à cet email.",
  },
  de: {
    subject: "Du stehst auf der GTA-6-Launch-Liste",
    preheader: "Sammelobjekt-Karten, sobald GTA 6 spielbar ist.",
    heading: "Du bist auf der Liste",
    intro: "Deine Adresse ist gespeichert. Das bekommst du:",
    dateLabel: "GTA-6-Launch",
    bullet1:
      "Eine E-Mail am Launch-Tag mit den Sammelobjekt-Karten für Tag eins.",
    bullet2:
      "Eine kurze Nachricht, falls vorher etwas Großes passiert — neuer Trailer oder Datumsänderung.",
    cta: "Interaktive Karte öffnen",
    promise: "Maximal zwei E-Mails. Nie geteilt, nie verkauft.",
    unsubscribe: "Zum Abmelden einfach auf diese E-Mail antworten.",
  },
  es: {
    subject: "Estás en la lista de aviso de lanzamiento de GTA 6",
    preheader: "Mapas de coleccionables en cuanto GTA 6 se pueda jugar.",
    heading: "Estás en la lista",
    intro: "Tu dirección está guardada. Esto es lo que vas a recibir:",
    dateLabel: "Lanzamiento de GTA 6",
    bullet1:
      "Un email el día del lanzamiento con los mapas de coleccionables del día uno.",
    bullet2:
      "Un aviso breve si ocurre algo importante antes — nuevo tráiler o cambio de fecha.",
    cta: "Abrir el mapa interactivo",
    promise: "Dos emails como máximo. Nunca compartidos, nunca vendidos.",
    unsubscribe: "Para darte de baja, responde a este email.",
  },
  it: {
    subject: "Sei nella lista avvisi per il lancio di GTA 6",
    preheader: "Le mappe dei collezionabili appena GTA 6 è giocabile.",
    heading: "Sei in lista",
    intro: "Il tuo indirizzo è salvato. Ecco cosa riceverai:",
    dateLabel: "Uscita di GTA 6",
    bullet1:
      "Una email il giorno del lancio con le mappe dei collezionabili del day one.",
    bullet2:
      "Un breve avviso se succede qualcosa di importante prima — nuovo trailer o cambio data.",
    cta: "Apri la mappa interattiva",
    promise: "Massimo due email. Mai condivise, mai vendute.",
    unsubscribe: "Per cancellarti, rispondi a questa email.",
  },
  pt: {
    subject: "Estás na lista de alerta de lançamento de GTA 6",
    preheader: "Mapas de colecionáveis assim que GTA 6 estiver jogável.",
    heading: "Estás na lista",
    intro: "O teu endereço está guardado. Isto é o que vais receber:",
    dateLabel: "Lançamento de GTA 6",
    bullet1:
      "Um email no dia do lançamento com os mapas de colecionáveis do day one.",
    bullet2:
      "Um aviso curto se acontecer algo importante antes — novo trailer ou mudança de data.",
    cta: "Abrir o mapa interativo",
    promise: "Dois emails no máximo. Nunca partilhados, nunca vendidos.",
    unsubscribe: "Para saíres, basta responder a este email.",
  },
};

const THEME = {
  page: "#070a12",
  card: "#121826",
  border: "#242c3d",
  accent: "#ec4899",
  text: "#ffffff",
  muted: "#9aa3b5",
  faint: "#6b7484",
} as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatDates(locale: string) {
  const opts = { timeZone: "UTC" } as const;
  return {
    long: GTA6_RELEASE.toLocaleDateString(locale, {
      ...opts,
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    compact: GTA6_RELEASE.toLocaleDateString(locale, {
      ...opts,
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
      .replace(/\./g, "")
      .toUpperCase(),
  };
}

/** Pink square + copy, the layout used for both promises. */
function bulletRow(text: string, isLast: boolean): string {
  return `
              <tr>
                <td style="padding:0 0 ${isLast ? "0" : "14px"} 0;" valign="top">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td width="24" valign="top" style="padding-top:6px;">
                        <div style="width:8px;height:8px;background-color:${THEME.accent};border-radius:2px;"></div>
                      </td>
                      <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:23px;color:#d7dce6;">
                        ${escapeHtml(text)}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>`;
}

/**
 * Table-based, fully inline-styled markup: Gmail strips <style> blocks and
 * Outlook ignores flexbox, so neither can be relied on here.
 */
function renderHtml(s: Strings, dates: ReturnType<typeof formatDates>): string {
  const mapUrl = `${SITE.url}/map`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
<title>${escapeHtml(s.subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${THEME.page};">
<div style="display:none;font-size:1px;color:${THEME.page};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
${escapeHtml(s.preheader)}
</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${THEME.page};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background-color:${THEME.card};border:1px solid ${THEME.border};border-radius:14px;overflow:hidden;">

        <tr>
          <td style="padding:22px 32px;border-bottom:1px solid ${THEME.border};">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:17px;font-weight:700;letter-spacing:1px;color:${THEME.text};">
                  MAP<span style="color:${THEME.accent};">-6</span>
                </td>
                <td align="right" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${THEME.faint};">
                  GTA HUB
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:34px 32px 8px 32px;">
            <h1 style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:26px;line-height:33px;font-weight:700;color:${THEME.text};">
              ${escapeHtml(s.heading)}
            </h1>
            <p style="margin:12px 0 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:23px;color:${THEME.muted};">
              ${escapeHtml(s.intro)}
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 0 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#1b1020;border:1px solid rgba(236,72,153,0.35);border-radius:10px;">
              <tr>
                <td align="center" style="padding:18px 16px;">
                  <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#f0a6cc;">
                    ${escapeHtml(s.dateLabel)}
                  </div>
                  <div style="margin-top:6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:28px;font-weight:700;letter-spacing:1px;color:${THEME.text};">
                    ${escapeHtml(dates.compact)}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:26px 32px 0 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
${bulletRow(s.bullet1, false)}
${bulletRow(s.bullet2, true)}
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px 4px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" bgcolor="${THEME.accent}" style="border-radius:999px;">
                  <a href="${mapUrl}" style="display:inline-block;padding:13px 28px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;">
                    ${escapeHtml(s.cta)}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:26px 32px 30px 32px;">
            <div style="height:1px;background-color:${THEME.border};font-size:0;line-height:0;">&nbsp;</div>
            <p style="margin:18px 0 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:${THEME.faint};">
              ${escapeHtml(s.promise)}<br>
              ${escapeHtml(s.unsubscribe)}
            </p>
            <p style="margin:14px 0 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:${THEME.faint};">
              <a href="${SITE.url}" style="color:#f0a6cc;text-decoration:none;">map-6.com</a>
              &nbsp;·&nbsp;
              <a href="mailto:${UNSUBSCRIBE_MAILTO}" style="color:#f0a6cc;text-decoration:none;">${UNSUBSCRIBE_MAILTO}</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function renderText(s: Strings, dates: ReturnType<typeof formatDates>): string {
  return [
    s.heading.toUpperCase(),
    "",
    s.intro,
    "",
    `• ${s.bullet1}`,
    `• ${s.bullet2}`,
    "",
    `${s.dateLabel}: ${dates.long}`,
    `${s.cta}: ${SITE.url}/map`,
    "",
    s.promise,
    s.unsubscribe,
    "",
    `— Map-6 · ${SITE.url} · ${UNSUBSCRIBE_MAILTO}`,
  ].join("\n");
}

export function buildConfirmation(locale?: string): ConfirmationCopy {
  const lang = locale && COPY[locale] ? locale : "en";
  const s = COPY[lang];
  const dates = formatDates(lang);

  return {
    subject: s.subject,
    text: renderText(s, dates),
    html: renderHtml(s, dates),
    headers: {
      // Gmail and Outlook surface a one-click unsubscribe from this.
      "List-Unsubscribe": `<mailto:${UNSUBSCRIBE_MAILTO}?subject=unsubscribe>`,
    },
  };
}
