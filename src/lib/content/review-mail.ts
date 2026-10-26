import { SITE } from "@/lib/constants";
import { isMailConfigured, MAIL_TO, sendMail } from "@/lib/mail/smtp";
import { reviewToken } from "./desk-store";
import { articlePath, type Article } from "./schema";
import type { ValidateResult } from "./validate-article";

function reviewUrl(article: Article): string {
  const token = reviewToken(article.id);
  return `${SITE.url}/api/content/review?id=${encodeURIComponent(article.id)}&token=${token}`;
}

async function sendResend(input: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const from = process.env.RESEND_FROM || "Map-6 Desk <desk@map-6.com>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      text: input.text,
      html: input.html,
    }),
  });
  if (!res.ok) {
    console.warn("[desk-mail] Resend failed:", res.status, await res.text());
    return false;
  }
  return true;
}

export async function emailDeskReview(opts: {
  article: Article;
  validation: ValidateResult;
  event: string;
}): Promise<{ sent: boolean; url: string }> {
  const url = reviewUrl(opts.article);
  const to = process.env.CONTENT_REVIEW_EMAIL || MAIL_TO;
  const path = articlePath(opts.article);
  const subject = `[Map-6 desk] ${opts.event}: ${opts.article.locale}/${opts.article.slug}`;
  const reasons = opts.validation.reasons.length
    ? opts.validation.reasons.map((r) => `- ${r}`).join("\n")
    : "- validator passed (still drafted; AUTO_PUBLISH is off unless set)";
  const text = [
    `${opts.event} ${path}`,
    `status=${opts.article.status} pageType=${opts.article.pageType ?? "—"}`,
    `pass=${opts.validation.pass}`,
    reasons,
    "",
    `Review: ${url}`,
    `Public path (404 until published): ${SITE.url}${path}`,
  ].join("\n");
  const html = `<p>${opts.event} <code>${path}</code></p>
<p>status=${opts.article.status} pageType=${opts.article.pageType ?? "—"} pass=${opts.validation.pass}</p>
<pre>${reasons}</pre>
<p><a href="${url}">Open review</a></p>`;

  if (await sendResend({ to, subject, text, html })) {
    return { sent: true, url };
  }
  if (isMailConfigured()) {
    const result = await sendMail({ to, subject, text, html });
    return { sent: result.sent, url };
  }
  console.warn("[desk-mail] no Resend or SMTP; review url:", url);
  return { sent: false, url };
}
