export const PRO_FLAG_KEY = "map6_pro";
export const PRO_SESSION_KEY = "map6_pro_session";
export const PRO_ACTIVATED_KEY = "map6_pro_activated";
export const PRO_EMAIL_KEY = "map6_pro_email";

/** Client-side check (localStorage). Server always returns false. */
export function isPro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(PRO_FLAG_KEY) === "true";
  } catch {
    return false;
  }
}

export function activatePro(sessionId: string, email?: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PRO_FLAG_KEY, "true");
    window.localStorage.setItem(PRO_SESSION_KEY, sessionId);
    window.localStorage.setItem(PRO_ACTIVATED_KEY, new Date().toISOString());
    if (email) window.localStorage.setItem(PRO_EMAIL_KEY, email);
    window.dispatchEvent(new CustomEvent("map6-pro"));
  } catch {
    /* private mode / storage full */
  }
}
