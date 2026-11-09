/**
 * Registration deadlines configuration
 */

// Ilorin campus registration deadline: Monday, November 9, 2026 at 8:00:00 AM WAT (UTC+1)
// WAT (West Africa Time) is UTC+1 with no daylight saving time.
// 8:00 AM WAT = 07:00:00 UTC
export const ILORIN_DEADLINE_ISO = '2026-11-09T08:00:00+01:00';
export const ILORIN_DEADLINE_UTC = '2026-11-09T07:00:00Z';
export const ILORIN_DEADLINE_TIMESTAMP = new Date(ILORIN_DEADLINE_UTC).getTime(); // 1794207600000

export const ILORIN_DEADLINE_FORMATTED = 'Monday, November 9, 2026 at 8:00 AM WAT';

/**
 * Checks whether registration for Ilorin campus is closed.
 * @param currentTimeMs Optional timestamp to check against (defaults to Date.now())
 */
export function isIlorinRegistrationClosed(currentTimeMs: number = Date.now()): boolean {
  return currentTimeMs >= ILORIN_DEADLINE_TIMESTAMP;
}

/**
 * Subscriber helper for React useSyncExternalStore
 */
export function subscribeToTime(callback: () => void): () => void {
  const interval = setInterval(callback, 2000);
  return () => clearInterval(interval);
}

export function getIlorinClosedSnapshot(): boolean {
  return isIlorinRegistrationClosed();
}
