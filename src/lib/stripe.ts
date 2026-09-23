import Stripe from "stripe";

let client: Stripe | null = null;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/** Shared server Stripe client. Uses the SDK's pinned API version. */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!client) {
    client = new Stripe(key);
  }
  return client;
}

export async function retrievePaidProSession(sessionId: string) {
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  const paid =
    session.metadata?.product === "map6-pro" &&
    session.payment_status === "paid";

  return {
    paid,
    email: session.customer_details?.email ?? "",
    sessionId: session.id,
    locale: session.metadata?.locale ?? "en",
  };
}
