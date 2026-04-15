import { describe, it, expect } from "vitest";
import { computeBrandDiff } from "../../src/lib/brand-diff.js";

describe("computeBrandDiff", () => {
  // ---------------------------------------------------------------------------
  // Edge cases
  // ---------------------------------------------------------------------------

  it("returns empty for identical runtimes", () => {
    const runtime = { identity: { colors: { primary: "#2a4494" }, typography: { Heading: "Inter" } }, voice: null, visual: null, strategy: null };
    const result = computeBrandDiff(runtime, { ...runtime });
    expect(result.changes).toHaveLength(0);
    expect(result.headline).toContain("No brand changes");
  });

  it("handles null old runtime (new brand)", () => {
    const result = computeBrandDiff(null, { identity: { colors: { primary: "#2a4494" } } });
    expect(result.headline).toContain("New brand");
  });

  it("handles null new runtime (brand removed)", () => {
    const result = computeBrandDiff({ identity: { colors: { primary: "#2a4494" } } }, null);
    expect(result.headline).toContain("removed");
  });

  it("handles both null", () => {
    const result = computeBrandDiff(null, null);
    expect(result.changes).toHaveLength(0);
  });

  // ---------------------------------------------------------------------------
  // Color diffs
  // ---------------------------------------------------------------------------

  it("detects color value change with ΔE", () => {
    const old = { identity: { colors: { primary: "#2a4494" }, typography: {} }, voice: null, visual: null, strategy: null };
    const nw = { identity: { colors: { primary: "#ff0000" }, typography: {} }, voice: null, visual: null, strategy: null };
    const result = computeBrandDiff(old, nw);
    expect(result.changes.length).toBe(1);
    expect(result.changes[0].category).toBe("color");
    expect(result.changes[0].summary).toContain("ΔE");
    expect(result.changes[0].summary).toContain("#2a4494");
    expect(result.changes[0].summary).toContain("#ff0000");
  });

  it("detects minor color change (low ΔE)", () => {
    const old = { identity: { colors: { primary: "#2a4494" } }, voice: null, visual: null, strategy: null };
    const nw = { identity: { colors: { primary: "#2b4595" } }, voice: null, visual: null, strategy: null };
    const result = computeBrandDiff(old, nw);
    expect(result.changes[0].severity).toBe("minor");
  });

  it("detects color addition", () => {
    const old = { identity: { colors: { primary: "#2a4494" } }, voice: null, visual: null, strategy: null };
    const nw = { identity: { colors: { primary: "#2a4494", accent: "#f5a623" } }, voice: null, visual: null, strategy: null };
    const result = computeBrandDiff(old, nw);
    expect(result.changes.some((c) => c.summary.includes("added"))).toBe(true);
  });

  it("detects color removal as breaking", () => {
    const old = { identity: { colors: { primary: "#2a4494", accent: "#f5a623" } }, voice: null, visual: null, strategy: null };
    const nw = { identity: { colors: { primary: "#2a4494" } }, voice: null, visual: null, strategy: null };
    const result = computeBrandDiff(old, nw);
    const removal = result.changes.find((c) => c.summary.includes("removed"));
    expect(removal).toBeDefined();
    expect(removal!.severity).toBe("breaking");
  });

  it("includes contrast info for primary color change", () => {
    const old = { identity: { colors: { primary: "#2a4494", text: "#333333" } }, voice: null, visual: null, strategy: null };
    const nw = { identity: { colors: { primary: "#cccccc", text: "#333333" } }, voice: null, visual: null, strategy: null };
    const result = computeBrandDiff(old, nw);
    const primaryChange = result.changes.find((c) => c.summary.includes("primary"));
    expect(primaryChange?.details).toContain("Contrast");
  });

  // ---------------------------------------------------------------------------
  // Typography diffs
  // ---------------------------------------------------------------------------

  it("detects font family change as breaking", () => {
    const old = { identity: { colors: {}, typography: { Heading: "Inter" } }, voice: null, visual: null, strategy: null };
    const nw = { identity: { colors: {}, typography: { Heading: "Playfair Display" } }, voice: null, visual: null, strategy: null };
    const result = computeBrandDiff(old, nw);
    expect(result.changes[0].category).toBe("typography");
    expect(result.changes[0].severity).toBe("breaking");
    expect(result.changes[0].summary).toContain("Inter");
    expect(result.changes[0].summary).toContain("Playfair Display");
  });

  // ---------------------------------------------------------------------------
  // Voice diffs
  // ---------------------------------------------------------------------------

  it("detects voice codex addition", () => {
    const old = { identity: { colors: {} }, voice: null, visual: null, strategy: null };
    const nw = { identity: { colors: {} }, voice: { register: "professional", never_say: ["leverage"] }, visual: null, strategy: null };
    const result = computeBrandDiff(old, nw);
    expect(result.changes.some((c) => c.category === "voice" && c.summary.includes("added"))).toBe(true);
  });

  it("detects tone register change", () => {
    const old = { identity: { colors: {} }, voice: { register: "warm-authoritative", never_say: [], anchor_terms: {}, tone_descriptors: [] }, visual: null, strategy: null };
    const nw = { identity: { colors: {} }, voice: { register: "direct-authoritative", never_say: [], anchor_terms: {}, tone_descriptors: [] }, visual: null, strategy: null };
    const result = computeBrandDiff(old, nw);
    expect(result.changes.some((c) => c.summary.includes("register"))).toBe(true);
  });

  it("detects never_say additions and removals", () => {
    const old = { identity: { colors: {} }, voice: { register: "warm", never_say: ["leverage", "synergy"], anchor_terms: {}, tone_descriptors: [] }, visual: null, strategy: null };
    const nw = { identity: { colors: {} }, voice: { register: "warm", never_say: ["leverage", "disrupt"], anchor_terms: {}, tone_descriptors: [] }, visual: null, strategy: null };
    const result = computeBrandDiff(old, nw);
    const neverSayChange = result.changes.find((c) => c.summary.includes("never_say"));
    expect(neverSayChange).toBeDefined();
    expect(neverSayChange!.summary).toContain("addition");
    expect(neverSayChange!.summary).toContain("removal");
  });

  // ---------------------------------------------------------------------------
  // Visual diffs
  // ---------------------------------------------------------------------------

  it("detects anti-pattern rule additions", () => {
    const old = { identity: { colors: {} }, voice: null, visual: { anti_patterns: ["No drop shadows"] }, strategy: null };
    const nw = { identity: { colors: {} }, voice: null, visual: { anti_patterns: ["No drop shadows", "No gradients"] }, strategy: null };
    const result = computeBrandDiff(old, nw);
    expect(result.changes.some((c) => c.category === "visual")).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Strategy diffs
  // ---------------------------------------------------------------------------

  it("detects persona count change", () => {
    const old = { identity: { colors: {} }, voice: null, visual: null, strategy: { persona_count: 3, matrix_size: 6 } };
    const nw = { identity: { colors: {} }, voice: null, visual: null, strategy: { persona_count: 5, matrix_size: 10 } };
    const result = computeBrandDiff(old, nw);
    expect(result.changes.some((c) => c.summary.includes("personas"))).toBe(true);
    expect(result.changes.some((c) => c.summary.includes("matrix"))).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Multi-category diffs
  // ---------------------------------------------------------------------------

  it("produces formatted output with multiple categories", () => {
    const old = {
      identity: { colors: { primary: "#2a4494" }, typography: { Heading: "Inter" } },
      voice: { register: "warm", never_say: [], anchor_terms: {}, tone_descriptors: ["clear", "warm"] },
      visual: null,
      strategy: null,
    };
    const nw = {
      identity: { colors: { primary: "#ff0000" }, typography: { Heading: "Roboto" } },
      voice: { register: "direct", never_say: ["leverage"], anchor_terms: {}, tone_descriptors: ["clear", "direct"] },
      visual: null,
      strategy: null,
    };
    const result = computeBrandDiff(old, nw);
    expect(result.changes.length).toBeGreaterThanOrEqual(4); // color + font + register + never_say + descriptors
    expect(result.formatted).toContain("COLOR");
    expect(result.formatted).toContain("FONT");
    expect(result.formatted).toContain("VOICE");
    expect(result.headline).toContain("change");
  });

  // ---------------------------------------------------------------------------
  // Logo diffs
  // ---------------------------------------------------------------------------

  it("detects logo addition", () => {
    const old = { identity: { colors: {}, logo: null }, voice: null, visual: null, strategy: null };
    const nw = { identity: { colors: {}, logo: { type: "wordmark", has_svg: true } }, voice: null, visual: null, strategy: null };
    const result = computeBrandDiff(old, nw);
    expect(result.changes.some((c) => c.category === "logo" && c.summary.includes("added"))).toBe(true);
  });
});
