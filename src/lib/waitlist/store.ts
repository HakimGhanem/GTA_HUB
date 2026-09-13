import { createHash } from "crypto";
import { COLLECTIONS, getFirestore } from "@/lib/content/firestore";

export type WaitlistSignup = {
  email: string;
  locale?: string;
  source: string;
  /** Which surface converted — "banner", "inline", … Used for attribution. */
  placement?: string;
  createdAt: string;
  userAgent?: string;
};

/** Email as document id so a re-submit updates instead of duplicating. */
function docId(email: string): string {
  return createHash("sha1").update(email).digest("hex");
}

export type PersistResult = {
  persisted: boolean;
  /** True when this email was already on the list. */
  duplicate: boolean;
};

/**
 * Best-effort durable store. Firestore is optional here — when it is off the
 * notification email is the record of the signup, so a failure to persist must
 * not fail the request.
 */
export async function persistSignup(
  signup: WaitlistSignup,
): Promise<PersistResult> {
  const fs = await getFirestore();
  if (!fs) return { persisted: false, duplicate: false };

  try {
    const ref = fs.collection(COLLECTIONS.waitlist).doc(docId(signup.email));
    const existing = await ref.get();

    // Keep the original createdAt on a re-submit; record the latest touch.
    const { createdAt, ...rest } = signup;
    await ref.set(
      existing.exists ? { ...rest, updatedAt: createdAt } : signup,
      { merge: true },
    );

    return { persisted: true, duplicate: existing.exists };
  } catch (err) {
    console.warn("[waitlist] Firestore write failed:", err);
    return { persisted: false, duplicate: false };
  }
}
