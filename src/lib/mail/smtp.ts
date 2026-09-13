import nodemailer, { type Transporter } from "nodemailer";

/**
 * Gmail SMTP over STARTTLS — same setup as leobotics / complytrust.
 * SMTP_USER must be a Google account and SMTP_PASSWORD an *app password*
 * (Google Account → Security → 2-step verification → App passwords), not the
 * account password: Gmail rejects plain passwords on SMTP.
 */
const HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const PORT = Number(process.env.SMTP_PORT || 587);
const USER = process.env.SMTP_USER;
const PASSWORD = process.env.SMTP_PASSWORD;

/** Where waitlist / contact notifications land. */
export const MAIL_TO = process.env.MAIL_TO || "u1407534515@gmail.com";

/** Gmail rewrites From to the authenticated account unless it is an alias. */
export const MAIL_FROM = process.env.MAIL_FROM || USER || MAIL_TO;

export function isMailConfigured(): boolean {
  return Boolean(USER && PASSWORD);
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!isMailConfigured()) return null;
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: PORT === 465,
    requireTLS: PORT === 587,
    auth: { user: USER, pass: PASSWORD },
  });

  return transporter;
}

export type MailInput = {
  subject: string;
  text: string;
  html?: string;
  to?: string;
  replyTo?: string;
};

/**
 * Never throws — callers treat mail as best-effort so a failed notification
 * cannot lose the submission it was announcing.
 */
export async function sendMail(
  input: MailInput,
): Promise<{ sent: boolean; error?: string }> {
  const tx = getTransporter();
  if (!tx) {
    return { sent: false, error: "SMTP_USER / SMTP_PASSWORD not configured" };
  }

  try {
    await tx.sendMail({
      from: `Map-6 <${MAIL_FROM}>`,
      to: input.to || MAIL_TO,
      subject: input.subject,
      text: input.text,
      ...(input.html ? { html: input.html } : {}),
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    });
    return { sent: true };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error("[mail] send failed:", error);
    return { sent: false, error };
  }
}
