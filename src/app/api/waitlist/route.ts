import { NextResponse } from "next/server";
import { isMailConfigured, sendMail } from "@/lib/mail/smtp";
import { buildConfirmation } from "@/lib/waitlist/confirmation";
import { persistSignup } from "@/lib/waitlist/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALLOWED_SOURCES = new Set(["pro", "creators", "launch"]);
const ALLOWED_PLACEMENTS = new Set(["banner", "inline"]);
const MAX_EMAIL_LENGTH = 254;

/** Per-IP throttle. In-memory, so it resets on deploy and is per instance. */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT.windowMs,
  );
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5_000) hits.clear();

  return recent.length > RATE_LIMIT.max;
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request) {
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const { email, locale, source, placement } = (body ?? {}) as Record<
    string,
    unknown
  >;

  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > MAX_EMAIL_LENGTH) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }

  const cleanSource =
    typeof source === "string" && ALLOWED_SOURCES.has(source) ? source : "pro";
  const cleanPlacement =
    typeof placement === "string" && ALLOWED_PLACEMENTS.has(placement)
      ? placement
      : undefined;
  const cleanLocale =
    typeof locale === "string" && /^[a-z]{2}$/.test(locale) ? locale : undefined;

  const signup = {
    email: cleanEmail,
    locale: cleanLocale,
    source: cleanSource,
    placement: cleanPlacement,
    createdAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent")?.slice(0, 300) || undefined,
  };

  const { persisted, duplicate } = await persistSignup(signup);

  const { sent, error } = await sendMail({
    subject: `[Map-6] Waitlist ${cleanSource} — ${cleanEmail}`,
    replyTo: cleanEmail,
    text: [
      `New Map-6 waitlist signup.`,
      ``,
      `Email:     ${cleanEmail}`,
      `Source:    ${cleanSource}`,
      `Placement: ${cleanPlacement ?? "—"}`,
      `Locale:    ${cleanLocale ?? "unknown"}`,
      `Date:      ${signup.createdAt}`,
      `Stored:    ${persisted ? (duplicate ? "Firestore (already listed)" : "Firestore") : "email only"}`,
    ].join("\n"),
  });

  // A signup that reached neither Firestore nor the inbox is lost — say so
  // rather than showing the user a success state.
  if (!persisted && !sent) {
    console.error("[waitlist] signup not captured:", error);
    return NextResponse.json(
      { ok: false, error: isMailConfigured() ? "send_failed" : "not_configured" },
      { status: 503 },
    );
  }

  // Confirmation to the subscriber — proof of consent, and it makes the sender
  // familiar so the launch-day email is not mistaken for spam.
  if (!duplicate && isMailConfigured()) {
    const confirm = buildConfirmation(cleanLocale);
    await sendMail({
      to: cleanEmail,
      subject: confirm.subject,
      text: confirm.text,
    });
  }

  return NextResponse.json({ ok: true, duplicate });
}
