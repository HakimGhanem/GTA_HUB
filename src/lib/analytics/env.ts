export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || null;

export const GTM_CONTAINER_ID =
  process.env.NEXT_PUBLIC_GTM_ID?.trim() || null;

/** Direct gtag GA4 when no GTM container (default Map-6 prod setup). */
export const USE_DIRECT_GA4 = !!GA_MEASUREMENT_ID && !GTM_CONTAINER_ID;
