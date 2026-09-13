export const LAUNCH_ALERT_KEY = "map6_launch_alert";

/** "joined" is permanent; "dismissed" is re-shown after DISMISS_TTL_MS. */
export type LaunchAlertState = "joined" | "dismissed";

const DISMISS_TTL_MS = 30 * 24 * 60 * 60 * 1000;

type Stored = { state: LaunchAlertState; at: number };

export function readLaunchAlertState(): LaunchAlertState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(LAUNCH_ALERT_KEY);
    if (!raw) return null;

    const { state, at } = JSON.parse(raw) as Stored;
    if (state === "joined") return "joined";
    if (state === "dismissed" && Date.now() - at < DISMISS_TTL_MS) {
      return "dismissed";
    }
    return null;
  } catch {
    return null;
  }
}

export function writeLaunchAlertState(state: LaunchAlertState): void {
  if (typeof window === "undefined") return;
  try {
    const payload: Stored = { state, at: Date.now() };
    window.localStorage.setItem(LAUNCH_ALERT_KEY, JSON.stringify(payload));
  } catch {
    /* private mode / storage full — the banner just shows again */
  }
}
