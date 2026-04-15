import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { writeFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { stringify } from "yaml";
import { BrandDir } from "../../src/lib/brand-dir.js";
import { generateRecoveryGuidance } from "../../src/lib/recovery-guidance.js";

// ---------------------------------------------------------------------------
// Fixture helpers
// ---------------------------------------------------------------------------

const TEST_DIR = join(tmpdir(), `recovery-guidance-test-${Date.now()}`);

async function createBrandFixture(opts: {
  colors?: number;
  hasPrimary?: boolean;
  typography?: number;
  hasLogo?: boolean;
  hasRuntime?: boolean;
  hasVisual?: boolean;
  hasMessaging?: boolean;
  hasStrategy?: boolean;
}): Promise<string> {
  const dir = join(TEST_DIR, `brand-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
  const brandPath = join(dir, ".brand");
  await mkdir(join(brandPath, "assets", "logo"), { recursive: true });

  // brand.config.yaml
  await writeFile(
    join(brandPath, "brand.config.yaml"),
    stringify({ schema_version: "0.1.0", session: 1, client_name: "Test Brand", created_at: new Date().toISOString() }),
  );

  // core-identity.yaml
  const colors = Array.from({ length: opts.colors ?? 0 }, (_, i) => ({
    name: `Color ${i}`,
    value: `#${String(i).padStart(6, "0")}`,
    role: i === 0 && opts.hasPrimary ? "primary" : "unknown",
    source: "web",
    confidence: "high",
  }));
  const typography = Array.from({ length: opts.typography ?? 0 }, (_, i) => ({
    name: `Font ${i}`,
    family: `Font Family ${i}`,
    source: "web",
    confidence: "high",
  }));
  const logo = opts.hasLogo
    ? [{ type: "wordmark", source: "web", confidence: "high", variants: [{ name: "default", inline_svg: "<svg></svg>" }] }]
    : [];

  await writeFile(
    join(brandPath, "core-identity.yaml"),
    stringify({ schema_version: "0.1.0", colors, typography, logo, spacing: null }),
  );

  if (opts.hasRuntime) {
    await writeFile(join(brandPath, "brand-runtime.json"), JSON.stringify({ version: "0.1.0" }));
  }

  if (opts.hasVisual) {
    await writeFile(
      join(brandPath, "visual-identity.yaml"),
      stringify({ schema_version: "0.1.0", session: 2, composition: null, patterns: null, illustration: null, photography: null, signature: null, anti_patterns: [], positioning_context: "" }),
    );
  }

  if (opts.hasMessaging) {
    await writeFile(
      join(brandPath, "messaging.yaml"),
      stringify({ schema_version: "0.1.0", session: 3, perspective: null, voice: { tone: { descriptors: [], register: "", never_sounds_like: "", sentence_patterns: { prefer: [], avoid: [] }, conventions: { person: "we", reader_address: "you", oxford_comma: true, sentence_length: 18 } }, vocabulary: { anchor: [], never_say: [], jargon_policy: "", placeholder_defaults: { headline: "", subhead: "", cta: "", body_paragraph: "" } }, ai_ism_detection: { patterns: [], instruction: "" } }, brand_story: null }),
    );
  }

  if (opts.hasStrategy) {
    await writeFile(
      join(brandPath, "content-strategy.yaml"),
      stringify({ schema_version: "0.1.0", session: 4, personas: [], journey_stages: [], messaging_matrix: [], themes: [] }),
    );
  }

  return dir;
}

afterAll(async () => {
  await rm(TEST_DIR, { recursive: true, force: true }).catch(() => {});
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("generateRecoveryGuidance", () => {
  it("returns null when no .brand/ exists", async () => {
    const brandDir = new BrandDir(join(TEST_DIR, "nonexistent"));
    const result = await generateRecoveryGuidance(brandDir);
    expect(result).toBeNull();
  });

  it("returns 100% for a complete brand", async () => {
    const dir = await createBrandFixture({
      colors: 5,
      hasPrimary: true,
      typography: 3,
      hasLogo: true,
      hasRuntime: true,
      hasVisual: true,
      hasMessaging: true,
      hasStrategy: true,
    });
    const brandDir = new BrandDir(dir);
    const result = await generateRecoveryGuidance(brandDir);
    expect(result).not.toBeNull();
    // Core capabilities met; connector, evidence, design synthesis, policy are extras
    expect(result!.currentReadiness).toBeGreaterThanOrEqual(70);
    // Should have few remaining actions (all lower-impact extras)
    expect(result!.actions.length).toBeLessThanOrEqual(5);
  });

  it("returns ranked actions for an empty brand", async () => {
    const dir = await createBrandFixture({
      colors: 0,
      hasPrimary: false,
      typography: 0,
      hasLogo: false,
    });
    const brandDir = new BrandDir(dir);
    const result = await generateRecoveryGuidance(brandDir);
    expect(result).not.toBeNull();
    expect(result!.currentReadiness).toBeLessThan(20);
    expect(result!.actions.length).toBeGreaterThan(5);
    // First action should be highest impact
    expect(result!.actions[0].tier).toBe("highest");
    expect(result!.actions[0].readinessPoints).toBeGreaterThan(0);
  });

  it("ranks logo high when missing", async () => {
    const dir = await createBrandFixture({
      colors: 5,
      hasPrimary: true,
      typography: 3,
      hasLogo: false,
      hasRuntime: true,
    });
    const brandDir = new BrandDir(dir);
    const result = await generateRecoveryGuidance(brandDir);
    expect(result).not.toBeNull();
    // Logo should be in the highest tier
    const logoAction = result!.actions.find((a) => a.field === "logo");
    expect(logoAction).toBeDefined();
    expect(logoAction!.tier).toBe("highest");
  });

  it("includes tool and effort in actions", async () => {
    const dir = await createBrandFixture({ colors: 0 });
    const brandDir = new BrandDir(dir);
    const result = await generateRecoveryGuidance(brandDir);
    expect(result).not.toBeNull();
    for (const action of result!.actions) {
      expect(action.tool).toBeTruthy();
      expect(["quick", "moderate", "deep"]).toContain(action.effort);
      expect(action.unlocks.length).toBeGreaterThan(0);
    }
  });

  it("produces formatted output with readiness projections", async () => {
    const dir = await createBrandFixture({
      colors: 3,
      hasPrimary: true,
      typography: 2,
      hasLogo: false,
    });
    const brandDir = new BrandDir(dir);
    const result = await generateRecoveryGuidance(brandDir);
    expect(result).not.toBeNull();
    expect(result!.formatted).toContain("Brand readiness:");
    expect(result!.formatted).toContain("HIGHEST IMPACT");
    expect(result!.formatted).toContain("→ Unlocks:");
    expect(result!.formatted).toContain("→ Readiness:");
  });

  it("correctly updates readiness when fields are filled", async () => {
    // Brand with nothing
    const emptyDir = await createBrandFixture({ colors: 0, typography: 0 });
    const emptyResult = await generateRecoveryGuidance(new BrandDir(emptyDir));

    // Brand with colors + typography
    const partialDir = await createBrandFixture({ colors: 5, hasPrimary: true, typography: 3 });
    const partialResult = await generateRecoveryGuidance(new BrandDir(partialDir));

    expect(emptyResult!.currentReadiness).toBeLessThan(partialResult!.currentReadiness);
    expect(partialResult!.actions.length).toBeLessThan(emptyResult!.actions.length);
  });
});
