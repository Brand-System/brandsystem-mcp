import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  writeConnectorConfig,
  writePackagePayload,
  readConnectorConfig,
  readPackagePayload,
} from "../../src/connectors/brandcode/persistence.js";
import type { ConnectorConfig } from "../../src/connectors/brandcode/types.js";
import {
  ensureLiveFreshness,
  buildLiveIndicator,
  invalidateLiveCache,
} from "../../src/connectors/brandcode/live-source.js";

vi.mock("../../src/connectors/brandcode/client.js", () => ({
  pullHostedBrand: vi.fn(),
}));
import { pullHostedBrand } from "../../src/connectors/brandcode/client.js";
const mockedPull = pullHostedBrand as unknown as ReturnType<typeof vi.fn>;

const baseConfig: ConnectorConfig = {
  provider: "brandcode",
  brandUrl: "https://www.brandcode.studio/start/brands/acme",
  slug: "acme",
  pullUrl: "https://www.brandcode.studio/api/brand/hosted/acme/pull",
  connectUrl: "https://www.brandcode.studio/api/brand/hosted/acme/connect",
  syncToken: "acme:1:2026-04-18T00:00:00.000Z",
  lastSyncedAt: "2026-04-18T00:00:00.000Z",
  shareTokenRequired: false,
};

describe("ensureLiveFreshness", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), "live-source-test-"));
    invalidateLiveCache();
    mockedPull.mockReset();
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true });
  });

  it("returns inactive when no connector is present", async () => {
    const result = await ensureLiveFreshness(tmpDir);
    expect(result).toEqual({ live: false, source: "inactive" });
    expect(mockedPull).not.toHaveBeenCalled();
  });

  it("returns inactive when connector has liveMode off", async () => {
    await writeConnectorConfig(tmpDir, { ...baseConfig, liveMode: false });
    const result = await ensureLiveFreshness(tmpDir);
    expect(result.live).toBe(false);
    expect(result.source).toBe("inactive");
    expect(mockedPull).not.toHaveBeenCalled();
  });

  it("fetches live when liveMode is on and cache is cold (upToDate)", async () => {
    await writeConnectorConfig(tmpDir, { ...baseConfig, liveMode: true });
    await writePackagePayload(tmpDir, { hello: "local" });

    mockedPull.mockResolvedValueOnce({
      contractVersion: "v1",
      source: "hosted",
      requestedSyncToken: baseConfig.syncToken,
      upToDate: true,
      brand: { slug: "acme", syncToken: baseConfig.syncToken } as never,
      delta: null,
      package: null,
    });

    const result = await ensureLiveFreshness(tmpDir);
    expect(result.live).toBe(true);
    expect(result.source).toBe("live-no-change");
    expect(result.package).toEqual({ hello: "local" });
    expect(mockedPull).toHaveBeenCalledTimes(1);
  });

  it("updates local package + config + cache on a changed pull", async () => {
    await writeConnectorConfig(tmpDir, { ...baseConfig, liveMode: true });

    mockedPull.mockResolvedValueOnce({
      contractVersion: "v1",
      source: "hosted",
      requestedSyncToken: baseConfig.syncToken,
      upToDate: false,
      brand: { slug: "acme", syncToken: "acme:2:2026-04-18T00:05:00.000Z" } as never,
      delta: null,
      package: { greeting: "hosted" },
    });

    const result = await ensureLiveFreshness(tmpDir);
    expect(result.source).toBe("live");
    expect(result.syncToken).toBe("acme:2:2026-04-18T00:05:00.000Z");
    expect(result.package).toEqual({ greeting: "hosted" });

    const writtenPkg = await readPackagePayload(tmpDir);
    expect(writtenPkg).toEqual({ greeting: "hosted" });

    const writtenConfig = await readConnectorConfig(tmpDir);
    expect(writtenConfig?.syncToken).toBe("acme:2:2026-04-18T00:05:00.000Z");
    expect(writtenConfig?.liveMode).toBe(true);
  });

  it("serves from cache on a second call within TTL", async () => {
    await writeConnectorConfig(tmpDir, { ...baseConfig, liveMode: true });

    mockedPull.mockResolvedValueOnce({
      contractVersion: "v1",
      source: "hosted",
      requestedSyncToken: baseConfig.syncToken,
      upToDate: false,
      brand: { slug: "acme", syncToken: "acme:2" } as never,
      delta: null,
      package: { n: 1 },
    });

    const first = await ensureLiveFreshness(tmpDir);
    expect(first.source).toBe("live");

    const second = await ensureLiveFreshness(tmpDir);
    expect(second.source).toBe("cache");
    expect(second.package).toEqual({ n: 1 });
    expect(mockedPull).toHaveBeenCalledTimes(1);
  });

  it("falls back to local mirror on network error", async () => {
    await writeConnectorConfig(tmpDir, { ...baseConfig, liveMode: true });
    await writePackagePayload(tmpDir, { stale: true });

    mockedPull.mockRejectedValueOnce(new Error("ECONNRESET"));

    const result = await ensureLiveFreshness(tmpDir);
    expect(result.live).toBe(true);
    expect(result.source).toBe("local-fallback");
    expect(result.package).toEqual({ stale: true });
    expect(result.fallbackReason).toContain("ECONNRESET");
  });

  it("invalidateLiveCache forces a re-fetch", async () => {
    await writeConnectorConfig(tmpDir, { ...baseConfig, liveMode: true });

    mockedPull.mockResolvedValue({
      contractVersion: "v1",
      source: "hosted",
      requestedSyncToken: baseConfig.syncToken,
      upToDate: false,
      brand: { slug: "acme", syncToken: "acme:2" } as never,
      delta: null,
      package: { n: 1 },
    });

    await ensureLiveFreshness(tmpDir);
    invalidateLiveCache("acme");
    await ensureLiveFreshness(tmpDir);

    expect(mockedPull).toHaveBeenCalledTimes(2);
  });
});

describe("buildLiveIndicator", () => {
  it("returns null when live is false", () => {
    expect(
      buildLiveIndicator({ live: false, source: "inactive" }),
    ).toBeNull();
  });

  it("summarizes live results for tool responses", () => {
    const now = Date.now();
    const indicator = buildLiveIndicator({
      live: true,
      source: "cache",
      fetchedAt: now - 15_000,
      ttlSeconds: 60,
      syncToken: "acme:2",
      slug: "acme",
    });
    expect(indicator?.live_mode).toBe(true);
    expect(indicator?.data_source).toBe("cache");
    expect(indicator?.cache_ttl_seconds).toBe(60);
    expect(indicator?.cache_age_seconds).toBeGreaterThanOrEqual(15);
    expect(indicator?.slug).toBe("acme");
  });

  it("carries fallback_reason when upstream errored", () => {
    const indicator = buildLiveIndicator({
      live: true,
      source: "local-fallback",
      slug: "acme",
      fallbackReason: "timeout",
    });
    expect(indicator?.fallback_reason).toBe("timeout");
  });
});
