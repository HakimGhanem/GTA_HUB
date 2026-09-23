import { NextResponse } from "next/server";
import { isMailConfigured, sendMail } from "@/lib/mail/smtp";
import { persistProUser } from "@/lib/pro/store";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return NextResponse.json(
      { error: "Webhook signature failed" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (
      session.metadata?.product === "map6-pro" &&
      session.payment_status === "paid"
    ) {
      const email = session.customer_details?.email?.toLowerCase() ?? "";
      const sessionId = session.id;
      const locale = session.metadata.locale;
      const activatedAt = new Date().toISOString();

      if (email) {
        const persisted = await persistProUser({
          email,
          stripeSessionId: sessionId,
          activatedAt,
          locale,
        });
        console.log("Pro activated:", email, sessionId, persisted ? "firestore" : "log-only");
      } else {
        console.log("Pro activated (no email):", sessionId);
      }

      if (isMailConfigured()) {
        await sendMail({
          subject: `[Map-6] Pro purchase — ${email || sessionId}`,
          text: [
            `Map-6 Pro activated (one-time €3.99).`,
            ``,
            `Email:     ${email || "—"}`,
            `Session:   ${sessionId}`,
            `Locale:    ${locale ?? "unknown"}`,
            `Date:      ${activatedAt}`,
          ].join("\n"),
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
