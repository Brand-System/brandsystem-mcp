import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getLiveCacheEntry,
  setLiveCacheEntry,
  clearLiveCache,
  liveCacheSize,
} from "../../src/connectors/brandcode/live-cache.js";

describe("live-cache", () => {
  beforeEach(() => {
    clearLiveCache();
    vi.useRealTimers();
  });

  it("returns null for unknown slug", () => {
    expect(getLiveCacheEntry("nope")).toBeNull();
  });

  it("round-trips a set entry within TTL", () => {
    setLiveCacheEntry("acme", {
      package: { slug: "acme" },
      syncToken: "acme:1",
      ttlSeconds: 60,
    });
    const entry = getLiveCacheEntry("acme");
    expect(entry).not.toBeNull();
    expect(entry?.syncToken).toBe("acme:1");
    expect(entry?.package).toEqual({ slug: "acme" });
  });

  it("expires entries past TTL", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-18T00:00:00.000Z"));

    setLiveCacheEntry("acme", {
      package: { slug: "acme" },
      syncToken: "acme:1",
      ttlSeconds: 60,
    });

    // Just inside TTL
    vi.setSystemTime(new Date("2026-04-18T00:00:59.000Z"));
    expect(getLiveCacheEntry("acme")).not.toBeNull();

    // Past TTL
    vi.setSystemTime(new Date("2026-04-18T00:01:01.000Z"));
    expect(getLiveCacheEntry("acme")).toBeNull();
    // Expired entry is auto-evicted
    expect(liveCacheSize()).toBe(0);
  });

  it("clears a single slug without touching siblings", () => {
    setLiveCacheEntry("a", { package: null, syncToken: "a", ttlSeconds: 60 });
    setLiveCacheEntry("b", { package: null, syncToken: "b", ttlSeconds: 60 });

    clearLiveCache("a");

    expect(getLiveCacheEntry("a")).toBeNull();
    expect(getLiveCacheEntry("b")).not.toBeNull();
  });

  it("clearLiveCache() with no arg clears everything", () => {
    setLiveCacheEntry("a", { package: null, syncToken: "a", ttlSeconds: 60 });
    setLiveCacheEntry("b", { package: null, syncToken: "b", ttlSeconds: 60 });

    clearLiveCache();

    expect(liveCacheSize()).toBe(0);
  });

  it("setLiveCacheEntry overwrites prior entry for the same slug", () => {
    setLiveCacheEntry("acme", {
      package: { version: 1 },
      syncToken: "acme:1",
      ttlSeconds: 60,
    });
    setLiveCacheEntry("acme", {
      package: { version: 2 },
      syncToken: "acme:2",
      ttlSeconds: 60,
    });

    const entry = getLiveCacheEntry("acme");
    expect(entry?.syncToken).toBe("acme:2");
    expect((entry?.package as { version: number }).version).toBe(2);
  });
});
