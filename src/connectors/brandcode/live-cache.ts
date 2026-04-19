/**
 * In-memory cache for Live Mode hosted brand packages.
 *
 * Each entry is keyed by brand slug and holds the most recent pull result
 * plus its sync token and fetch timestamp. TTL is enforced at read time so
 * stale entries silently expire; per-slug clear() lets sync operations
 * invalidate live reads immediately.
 *
 * Process-local by design — no cross-process sharing, no disk persistence.
 */
import type { BrandPackagePayload } from "./types.js";

export interface LiveCacheEntry {
  package: BrandPackagePayload | null;
  syncToken: string;
  fetchedAt: number;
  ttlSeconds: number;
}

const cache = new Map<string, LiveCacheEntry>();

export function getLiveCacheEntry(slug: string): LiveCacheEntry | null {
  const entry = cache.get(slug);
  if (!entry) return null;
  const age = (Date.now() - entry.fetchedAt) / 1000;
  if (age >= entry.ttlSeconds) {
    cache.delete(slug);
    return null;
  }
  return entry;
}

export function setLiveCacheEntry(
  slug: string,
  entry: Omit<LiveCacheEntry, "fetchedAt"> & { fetchedAt?: number },
): void {
  cache.set(slug, {
    package: entry.package,
    syncToken: entry.syncToken,
    fetchedAt: entry.fetchedAt ?? Date.now(),
    ttlSeconds: entry.ttlSeconds,
  });
}

export function clearLiveCache(slug?: string): void {
  if (slug) {
    cache.delete(slug);
    return;
  }
  cache.clear();
}

export function liveCacheSize(): number {
  return cache.size;
}
