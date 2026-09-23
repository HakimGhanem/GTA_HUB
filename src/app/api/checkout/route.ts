import { NextResponse } from "next/server";
import {
  isAppLocale,
  PRO_CURRENCY,
  PRO_PRICE_CENTS,
  PRO_PRODUCT_DESCRIPTION,
  PRO_PRODUCT_ID,
  PRO_PRODUCT_NAME,
  siteOrigin,
  stripeCheckoutLocale,
} from "@/lib/pro/product";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = { windowMs: 60_000, max: 8 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
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
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Checkout is not configured" },
      { status: 503 },
    );
  }

  if (isRateLimited(clientIp(req))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let locale = "en";
  try {
    const body = (await req.json()) as { locale?: unknown };
    if (typeof body.locale === "string" && isAppLocale(body.locale)) {
      locale = body.locale;
    }
  } catch {
    /* empty body — default en */
  }

  const origin = siteOrigin();

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      currency: PRO_CURRENCY,
      line_items: [
        {
          price_data: {
            currency: PRO_CURRENCY,
            unit_amount: PRO_PRICE_CENTS,
            product_data: {
              name: PRO_PRODUCT_NAME,
              description: PRO_PRODUCT_DESCRIPTION,
              images: [`${origin}/api/og/hub`],
            },
          },
          quantity: 1,
        },
      ],
      success_url:
        `${origin}/${locale}/pro/success` +
        `?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/pro`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      locale: stripeCheckoutLocale(locale),
      custom_text: {
        submit: {
          message:
            "One payment. Pro access forever. No subscription, no renewal.",
        },
      },
      metadata: {
        product: PRO_PRODUCT_ID,
        locale,
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
