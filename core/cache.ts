/**
 * Small TTL cache for any module that wants to reduce API traffic.
 */

interface CacheEntry<T> {
  value: T;
  expires: number;
}

const CACHE: Map<string, CacheEntry<any>> = new Map();

export function setCache<T>(key: string, value: T, ttlMs: number) {
  CACHE.set(key, {
    value,
    expires: Date.now() + ttlMs
  });
}

export function getCache<T>(key: string): T | null {
  const entry = CACHE.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expires) {
    CACHE.delete(key);
    return null;
  }

  return entry.value;
}
