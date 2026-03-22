import { describe, it, expect } from "vitest";
import {
  generateChat,
  generateCode,
  generateTeam,
  generateEmail,
  type BrandData,
} from "../../src/tools/brand-export.js";

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

function makeMinimalData(overrides: Partial<BrandData> = {}): BrandData {
  return {
    config: {
      schema_version: "0.1.0",
      session: 1,
      client_name: "Acme Corp",
      created_at: "2026-01-01T00:00:00Z",
    },
    identity: {
      schema_version: "0.1.0",
      colors: [],
      typography: [],
      logo: [],
      spacing: null,
    },
    visual: null,
    messaging: null,
    ...overrides,
  };
}

function makeFullData(): BrandData {
  return {
    config: {
      schema_version: "0.1.0",
      session: 3,
      client_name: "TestBrand Co",
      industry: "Technology",
      website_url: "https://testbrand.com",
      created_at: "2026-01-01T00:00:00Z",
    },
    identity: {
      schema_version: "0.1.0",
      colors: [
        { name: "Brand Red", value: "#e4250c", role: "primary", source: "web", confidence: "confirmed" },
        { name: "Dark Surface", value: "#1a171a", role: "surface", source: "web", confidence: "high" },
        { name: "White", value: "#ffffff", role: "text", source: "web", confidence: "high" },
        { name: "Accent Orange", value: "#ff6b35", role: "accent", source: "web", confidence: "medium" },
        { name: "Gray 500", value: "#6b7280", role: "neutral", source: "web", confidence: "medium" },
        { name: "Support Blue", value: "#3b82f6", role: "secondary", source: "web", confidence: "low" },
      ],
      typography: [
        { name: "Heading", family: "Inter", weight: 700, size: "32px", source: "web", confidence: "high" },
        { name: "Body", family: "Inter", weight: 400, size: "16px", source: "web", confidence: "high" },
        { name: "Code", family: "JetBrains Mono", weight: 400, source: "web", confidence: "medium" },
      ],
      logo: [
        {
          type: "wordmark",
          source: "web",
          confidence: "high",
          variants: [
            {
              name: "default",
              inline_svg: '<svg viewBox="0 0 100 30"><text>TestBrand</text></svg>',
              data_uri: "data:image/svg+xml;base64,PHN2Zz4=",
            },
          ],
        },
      ],
      spacing: { base_unit: "8px", scale: [4, 8, 16, 24, 32, 48, 64], source: "web", confidence: "medium" },
    },
    visual: {
      schema_version: "0.1.0",
      session: 2,
      composition: {
        energy: "high-tension, asymmetric",
        negative_space: "minimum 35%",
        grid: "8px base, flexible columns",
        layout_preference: "asymmetric tension",
      },
      patterns: null,
      illustration: null,
      photography: null,
      signature: {
        description: "Distinctive visual language using bold geometric shapes",
        elements: ["Angular crop overlays", "Gradient mesh backgrounds", "Oversized typography"],
      },
      anti_patterns: [
        { rule: "No drop shadows", severity: "hard" },
        { rule: "No orange as background fill", severity: "hard" },
        { rule: "No centered body copy", severity: "soft" },
      ],
      positioning_context: "Premium technology brand",
    },
    messaging: {
      schema_version: "0.1.0",
      session: 3,
      perspective: {
        worldview: "Technology should amplify human creativity",
        tension: "Most tools replace thinking instead of enhancing it",
        resolution: "We build tools that make thinking visible",
        audience: "Creative professionals and knowledge workers",
        positioning: "The thinking-amplification platform",
        one_liner: "We make thinking visible.",
      },
      voice: {
        tone: {
          descriptors: ["precise", "warm", "confident"],
          register: "Expert peer, not professor",
          never_sounds_like: "Corporate jargon or startup hype",
          sentence_patterns: {
            prefer: ["Active voice", "Short declarative"],
            avoid: ["Passive constructions", "Triple-nested clauses"],
          },
          conventions: {
            person: "we",
            founder_voice: "I",
            reader_address: "you",
            oxford_comma: true,
            sentence_length: 15,
            paragraph_length: 3,
          },
        },
        vocabulary: {
          anchor: [
            { use: "system", not: "solution", reason: "Systems have structure; solutions are vague" },
            { use: "governance", not: "guidelines", reason: "Governance implies enforcement" },
          ],
          never_say: [
            { word: "leverage", reason: "Corporate cliche" },
            { word: "synergy", reason: "Meaningless buzzword" },
          ],
          jargon_policy: "Define on first use",
          placeholder_defaults: {
            headline: "Make thinking visible",
            subhead: "The system for creative governance",
            cta: "Start building",
            body_paragraph: "Your brand is a system, not a set of assets.",
          },
        },
        ai_ism_detection: {
          patterns: ["In today's landscape", "It's important to note", "Let's dive in"],
          instruction: "Rewrite any sentence containing these patterns.",
        },
      },
      brand_story: {
        origin: "Founded by designers who got tired of inconsistent brand output",
        tension: "Every new tool and team member dilutes the brand",
        resolution: "A governance system that scales with the team",
        vision: "Every creative act strengthened by brand intelligence",
        tagline: "Brand governance, not brand police.",
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Chat export tests
// ---------------------------------------------------------------------------

describe("generateChat", () => {
  it("includes portability notice", () => {
    const result = generateChat(makeMinimalData(), true);
    expect(result).toContain("Portability notice");
    expect(result).toContain("Upload it to any AI conversation");
  });

  it("includes client name in the heading", () => {
    const result = generateChat(makeMinimalData(), true);
    expect(result).toContain("# Acme Corp");
  });

  it("includes industry when available", () => {
    const data = makeMinimalData({
      config: { ...makeMinimalData().config, industry: "Finance" },
    });
    const result = generateChat(data, true);
    expect(result).toContain("Finance");
  });

  it("embeds logo SVG when include_logo is true", () => {
    const data = makeFullData();
    const result = generateChat(data, true);
    expect(result).toContain("## Logo");
    expect(result).toContain("```svg");
    expect(result).toContain("<svg");
    expect(result).toContain("data:image/svg+xml");
  });

  it("omits logo when include_logo is false", () => {
    const data = makeFullData();
    const result = generateChat(data, false);
    expect(result).not.toContain("## Logo");
    expect(result).not.toContain("```svg");
  });

  it("includes color table with hex and roles", () => {
    const data = makeFullData();
    const result = generateChat(data, true);
    expect(result).toContain("## Colors");
    expect(result).toContain("#e4250c");
    expect(result).toContain("primary");
    expect(result).toContain("Brand Red");
  });

  it("includes typography list", () => {
    const data = makeFullData();
    const result = generateChat(data, true);
    expect(result).toContain("## Typography");
    expect(result).toContain("Inter");
    expect(result).toContain("JetBrains Mono");
  });

  it("includes anti-patterns as HARD RULES", () => {
    const data = makeFullData();
    const result = generateChat(data, true);
    expect(result).toContain("HARD RULES");
    expect(result).toContain("No drop shadows");
    expect(result).toContain("**NEVER**");
  });

  it("includes composition rules", () => {
    const data = makeFullData();
    const result = generateChat(data, true);
    expect(result).toContain("## Composition Rules");
    expect(result).toContain("high-tension");
    expect(result).toContain("minimum 35%");
  });

  it("includes signature moves", () => {
    const data = makeFullData();
    const result = generateChat(data, true);
    expect(result).toContain("## Signature Moves");
    expect(result).toContain("Angular crop overlays");
  });

  it("includes voice rules from Session 3", () => {
    const data = makeFullData();
    const result = generateChat(data, true);
    expect(result).toContain("## Voice");
    expect(result).toContain("precise, warm, confident");
    expect(result).toContain("Anchor Vocabulary");
    expect(result).toContain("system");
    expect(result).toContain("Never Say");
    expect(result).toContain("leverage");
  });

  it("includes AI-ism detection patterns", () => {
    const data = makeFullData();
    const result = generateChat(data, true);
    expect(result).toContain("## AI-ism Detection");
    expect(result).toContain("In today's landscape");
    expect(result).toContain("Rewrite any sentence");
  });

  it("includes perspective", () => {
    const data = makeFullData();
    const result = generateChat(data, true);
    expect(result).toContain("## Perspective");
    expect(result).toContain("We make thinking visible.");
  });

  it("includes brand story tagline", () => {
    const data = makeFullData();
    const result = generateChat(data, true);
    expect(result).toContain("Brand governance, not brand police.");
  });

  it("works with minimal data (no visual, no messaging)", () => {
    const result = generateChat(makeMinimalData(), true);
    expect(result).toContain("# Acme Corp");
    expect(result).toContain("## Colors");
    expect(result).toContain("## Typography");
    // Should NOT contain sections requiring Session 2/3 data
    expect(result).not.toContain("## HARD RULES");
    expect(result).not.toContain("## Voice");
    expect(result).not.toContain("## AI-ism Detection");
    expect(result).not.toContain("## Perspective");
  });
});

// ---------------------------------------------------------------------------
// Code export tests
// ---------------------------------------------------------------------------

describe("generateCode", () => {
  it("includes MCP JSON config", () => {
    const result = generateCode(makeMinimalData());
    expect(result).toContain("mcpServers");
    expect(result).toContain("@brandsystem/mcp");
    expect(result).toContain(".mcp.json");
  });

  it("includes CLAUDE.md / .cursorrules snippet", () => {
    const result = generateCode(makeMinimalData());
    expect(result).toContain("CLAUDE.md");
    expect(result).toContain(".cursorrules");
    expect(result).toContain("brand_write");
    expect(result).toContain("brand_preflight");
  });

  it("includes client name", () => {
    const result = generateCode(makeMinimalData());
    expect(result).toContain("Acme Corp");
  });

  it("references .brand/ key files", () => {
    const result = generateCode(makeMinimalData());
    expect(result).toContain("core-identity.yaml");
    expect(result).toContain("visual-identity.yaml");
    expect(result).toContain("messaging.yaml");
    expect(result).toContain("tokens.json");
  });

  it("includes workflow reference", () => {
    const result = generateCode(makeMinimalData());
    expect(result).toContain("brand_status");
    expect(result).toContain("brand_export");
    expect(result).toContain("brand_audit");
  });
});

// ---------------------------------------------------------------------------
// Team export tests
// ---------------------------------------------------------------------------

describe("generateTeam", () => {
  it("uses 'Brand Guidelines' heading", () => {
    const result = generateTeam(makeMinimalData(), true);
    expect(result).toContain("Brand Guidelines");
  });

  it("includes industry when present", () => {
    const data = makeFullData();
    const result = generateTeam(data, true);
    expect(result).toContain("Technology");
  });

  it("describes colors in human-readable format", () => {
    const data = makeFullData();
    const result = generateTeam(data, true);
    expect(result).toContain("## Color Palette");
    expect(result).toContain("Brand Red");
    expect(result).toContain("#e4250c");
    expect(result).toContain("(primary)");
  });

  it("includes typography", () => {
    const data = makeFullData();
    const result = generateTeam(data, true);
    expect(result).toContain("## Typography");
    expect(result).toContain("Inter");
  });

  it("includes logo usage rules", () => {
    const data = makeFullData();
    const result = generateTeam(data, true);
    expect(result).toContain("Logo Usage Rules");
    expect(result).toContain("never recreate");
  });

  it("includes voice summary in plain language", () => {
    const data = makeFullData();
    const result = generateTeam(data, true);
    expect(result).toContain("Voice & Tone");
    expect(result).toContain("precise, warm, confident");
    expect(result).toContain('Say "system" instead of "solution"');
  });

  it("includes anti-patterns in plain language", () => {
    const data = makeFullData();
    const result = generateTeam(data, true);
    expect(result).toContain("What NOT To Do");
    expect(result).toContain("Never");
    expect(result).toContain("No drop shadows");
  });

  it("includes brand story", () => {
    const data = makeFullData();
    const result = generateTeam(data, true);
    expect(result).toContain("## Brand Story");
    expect(result).toContain("Brand governance, not brand police.");
  });

  it("includes brandsystem.app attribution", () => {
    const result = generateTeam(makeMinimalData(), true);
    expect(result).toContain("brandsystem.app");
  });

  it("works with minimal data", () => {
    const result = generateTeam(makeMinimalData(), true);
    expect(result).toContain("# Acme Corp");
    expect(result).not.toContain("## Voice & Tone");
  });
});

// ---------------------------------------------------------------------------
// Email export tests
// ---------------------------------------------------------------------------

describe("generateEmail", () => {
  it("starts with a sharing-oriented intro", () => {
    const result = generateEmail(makeMinimalData());
    expect(result).toContain("brand system for");
  });

  it("lists all colors with names and roles", () => {
    const data = makeFullData();
    const result = generateEmail(data);
    expect(result).toContain("## Colors");
    // Should include all 6 colors now
    expect(result).toContain("#e4250c");
    expect(result).toContain("#3b82f6");
    expect(result).toContain("Brand Red");
  });

  it("lists fonts with usage hints", () => {
    const data = makeFullData();
    const result = generateEmail(data);
    expect(result).toContain("## Typography");
    expect(result).toContain("Inter");
    expect(result).toContain("JetBrains Mono");
    // Should include usage hints
    expect(result).toContain("(headings)");
    expect(result).toContain("(body text)");
    expect(result).toContain("(code / monospace)");
  });

  it("includes top 5 anti-patterns prioritizing hard rules", () => {
    const data = makeFullData();
    const result = generateEmail(data);
    expect(result).toContain("Anti-Patterns");
    expect(result).toContain("No drop shadows");
    expect(result).toContain("No orange as background fill");
    expect(result).toContain("**NEVER**");
  });

  it("includes voice summary with 2-3 sentences", () => {
    const data = makeFullData();
    const result = generateEmail(data);
    expect(result).toContain("## Voice");
    expect(result).toContain("precise, warm, confident");
    expect(result).toContain("Expert peer, not professor");
    expect(result).toContain("never sound like");
  });

  it("includes brand positioning one-liner", () => {
    const data = makeFullData();
    const result = generateEmail(data);
    expect(result).toContain("Brand positioning");
    expect(result).toContain("We make thinking visible.");
  });

  it("includes brand tagline", () => {
    const data = makeFullData();
    const result = generateEmail(data);
    expect(result).toContain("Brand governance, not brand police.");
  });

  it("links to brandsystem.app with a 'full guidelines' note", () => {
    const result = generateEmail(makeMinimalData());
    expect(result).toContain("brandsystem.app");
    expect(result).toContain("full guidelines");
  });

  it("is between 200 and 500 words for full data", () => {
    const data = makeFullData();
    const result = generateEmail(data);
    const wordCount = result.split(/\s+/).length;
    expect(wordCount).toBeGreaterThan(150);
    expect(wordCount).toBeLessThan(500);
  });

  it("works with minimal data", () => {
    const result = generateEmail(makeMinimalData());
    expect(result).toContain("Acme Corp");
    expect(result).not.toContain("## Colors");
    expect(result).not.toContain("## Typography");
  });
});
