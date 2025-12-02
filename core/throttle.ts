/**
 * Throttle wrapper to limit how often a function can run.
 */

export function throttle<T>(
  fn: (...args: any[]) => Promise<T>,
  cooldownMs: number
) {
  let last = 0;

  return async (...args: any[]): Promise<T> => {
    const now = Date.now();
    if (now - last < cooldownMs) {
      throw new Error("Throttled");
    }
    last = now;
    return fn(...args);
  };
}
