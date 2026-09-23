import { createHash } from "crypto";
import { COLLECTIONS, getFirestore } from "@/lib/content/firestore";

export type ProUser = {
  email: string;
  stripeSessionId: string;
  activatedAt: string;
  locale?: string;
};

function docId(email: string): string {
  return createHash("sha1").update(email).digest("hex");
}

export async function persistProUser(user: ProUser): Promise<boolean> {
  const fs = await getFirestore();
  if (!fs) return false;

  try {
    await fs
      .collection(COLLECTIONS.proUsers)
      .doc(docId(user.email))
      .set(
        {
          email: user.email,
          stripeSessionId: user.stripeSessionId,
          activatedAt: user.activatedAt,
          locale: user.locale,
          updatedAt: user.activatedAt,
        },
        { merge: true },
      );
    return true;
  } catch (err) {
    console.warn("[pro] Firestore write failed:", err);
    return false;
  }
}

export async function findProUser(
  email: string,
): Promise<{ found: boolean; activatedAt?: string }> {
  const fs = await getFirestore();
  if (!fs) return { found: false };

  try {
    const snap = await fs.collection(COLLECTIONS.proUsers).doc(docId(email)).get();
    if (!snap.exists) return { found: false };
    const data = snap.data() as { activatedAt?: string } | undefined;
    return { found: true, activatedAt: data?.activatedAt };
  } catch (err) {
    console.warn("[pro] Firestore read failed:", err);
    return { found: false };
  }
}
