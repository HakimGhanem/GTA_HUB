import type { Firestore } from "firebase-admin/firestore";

export const COLLECTIONS = {
  articles: "articles",
  topics: "topics",
  keywordMetrics: "keyword_metrics",
} as const;

let db: Firestore | null | undefined;

/**
 * Returns Firestore when FIRESTORE_ENABLED=true and ADC / credentials work.
 * Returns null to fall back to data/content/*.json file store.
 */
export async function getFirestore(): Promise<Firestore | null> {
  if (db !== undefined) return db;

  if (process.env.FIRESTORE_ENABLED !== "true") {
    db = null;
    return null;
  }

  try {
    const { initializeApp, getApps, cert, applicationDefault } = await import(
      "firebase-admin/app"
    );
    const { getFirestore: getFs } = await import("firebase-admin/firestore");

    if (!getApps().length) {
      const projectId =
        process.env.FIRESTORE_PROJECT_ID ||
        process.env.GCP_PROJECT ||
        process.env.GOOGLE_CLOUD_PROJECT ||
        "gtahub-503009";

      if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON) as object;
        initializeApp({
          credential: cert(sa as Parameters<typeof cert>[0]),
          projectId,
        });
      } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // Explicit key file (CLI) — avoid picking a stale user ADC
        const { readFileSync } = await import("fs");
        const sa = JSON.parse(
          readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8"),
        ) as object;
        initializeApp({
          credential: cert(sa as Parameters<typeof cert>[0]),
          projectId,
        });
      } else {
        // Cloud Run / GCE metadata server
        initializeApp({ credential: applicationDefault(), projectId });
      }
    }

    const candidate = getFs();
    try {
      candidate.settings({ ignoreUndefinedProperties: true });
    } catch {
      /* already configured in this process */
    }
    // Probe credentials now (ADC often fails lazily on first RPC)
    await candidate.collection(COLLECTIONS.articles).limit(1).get();
    db = candidate;
    return db;
  } catch (err) {
    console.warn("[content] Firestore unavailable, using file store:", err);
    db = null;
    return null;
  }
}
