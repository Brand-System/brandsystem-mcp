/**
 * Recovery Guidance Engine (M-13)
 *
 * Maps each missing brand field to downstream capabilities it unlocks,
 * readiness point impact, recommended MCP tool, and estimated effort.
 * Produces a ranked list sorted by readiness impact descending.
 */

import { BrandDir } from "./brand-dir.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RecoveryAction {
  rank: number;
  field: string;
  tool: string;
  toolArgs?: string;
  description: string;
  unlocks: string[];
  readinessPoints: number;
  effort: "quick" | "moderate" | "deep";
  tier: "highest" | "lower";
}

export interface RecoveryReport {
  currentReadiness: number;
  maxReadiness: number;
  actions: RecoveryAction[];
  /** Pre-formatted text block for the response */
  formatted: string;
}

// ---------------------------------------------------------------------------
// Capability dependency graph
// ---------------------------------------------------------------------------

interface CapabilityDep {
  field: string;
  label: string;
  tool: string;
  toolArgs?: string;
  description: string;
  effort: "quick" | "moderate" | "deep";
  /** Readiness points this field contributes */
  points: number;
  /** Capabilities unlocked when this field is populated */
  unlocks: string[];
  /** Check function: returns true if the field is present */
  check: (state: BrandState) => boolean;
}

interface BrandState {
  hasColors: boolean;
  colorCount: number;
  hasPrimaryColor: boolean;
  hasTypography: boolean;
  typographyCount: number;
  hasLogo: boolean;
  hasLogoSvg: boolean;
  hasSpacing: boolean;
  hasRuntime: boolean;
  hasPolicy: boolean;
  hasDesignSynthesis: boolean;
  hasDesignMd: boolean;
  hasVisualIdentity: boolean;
  hasMessaging: boolean;
  hasVoice: boolean;
  hasStrategy: boolean;
  hasExtractionEvidence: boolean;
  hasConnector: boolean;
}

const CAPABILITY_GRAPH: CapabilityDep[] = [
  {
    field: "logo",
    label: "Logo SVG",
    tool: "brand_set_logo",
    toolArgs: 'svg="<svg>...</svg>"',
    description: "Add a logo SVG via brand_set_logo",
    effort: "quick",
    points: 12,
    unlocks: [
      "VIM generation (visual identity manifest)",
      "Brand report logo section",
      "HTML report portable logo",
      "Figma adapter logo injection",
    ],
    check: (s) => s.hasLogo,
  },
  {
    field: "colors",
    label: "Brand colors (3+)",
    tool: "brand_extract_web",
    toolArgs: 'url="https://yourbrand.com"',
    description: "Extract colors from your website",
    effort: "quick",
    points: 10,
    unlocks: [
      "brand_check color mode",
      "Token compliance scoring",
      "DTCG color tokens in tokens.json",
    ],
    check: (s) => s.colorCount >= 3,
  },
  {
    field: "primary_color",
    label: "Primary color identified",
    tool: "brand_clarify",
    description: "Confirm which color is primary via brand_clarify",
    effort: "quick",
    points: 5,
    unlocks: [
      "Primary color usage scoring",
      "Contrast ratio checks in brand_check",
    ],
    check: (s) => s.hasPrimaryColor,
  },
  {
    field: "typography",
    label: "Brand typography (2+)",
    tool: "brand_extract_web",
    toolArgs: 'url="https://yourbrand.com"',
    description: "Extract fonts from your website",
    effort: "quick",
    points: 8,
    unlocks: [
      "brand_check font mode",
      "DTCG typography tokens",
      "Font compliance in brand_audit_content",
    ],
    check: (s) => s.typographyCount >= 2,
  },
  {
    field: "runtime",
    label: "Compiled runtime",
    tool: "brand_compile",
    description: "Compile brand-runtime.json from extracted data",
    effort: "quick",
    points: 8,
    unlocks: [
      "brand_check (all modes)",
      "brand://runtime MCP resource",
      "Sub-agent brand context loading",
    ],
    check: (s) => s.hasRuntime,
  },
  {
    field: "design_synthesis",
    label: "Design synthesis",
    tool: "brand_generate_designmd",
    description: "Generate design-synthesis.json + DESIGN.md",
    effort: "quick",
    points: 5,
    unlocks: [
      "Radius, shadow, spacing, motion tokens",
      "DESIGN.md human-readable summary",
    ],
    check: (s) => s.hasDesignSynthesis && s.hasDesignMd,
  },
  {
    field: "visual_identity",
    label: "Visual identity (Session 2)",
    tool: "brand_deepen_identity",
    toolArgs: 'mode="interview"',
    description: "Complete visual identity interview",
    effort: "moderate",
    points: 15,
    unlocks: [
      "Anti-pattern rules in brand_check css mode",
      "Visual compliance scoring",
      "brand_preflight CSS checks",
      "Interaction policy visual rules",
    ],
    check: (s) => s.hasVisualIdentity,
  },
  {
    field: "messaging",
    label: "Voice + messaging (Session 3)",
    tool: "brand_compile_messaging",
    toolArgs: 'mode="interview"',
    description: "Define perspective, voice codex, brand story",
    effort: "deep",
    points: 15,
    unlocks: [
      "brand_check text mode (never-say, anchor terms, AI-isms)",
      "Voice alignment scoring",
      "brand_write full brand context",
      "Message coverage scoring",
    ],
    check: (s) => s.hasMessaging,
  },
  {
    field: "strategy",
    label: "Content strategy (Session 4)",
    tool: "brand_build_personas",
    toolArgs: 'mode="interview"',
    description: "Build personas, journey, themes, messaging matrix",
    effort: "deep",
    points: 12,
    unlocks: [
      "Persona-targeted content via brand_write",
      "Journey-stage claims policies",
      "Content theme editorial calendar",
    ],
    check: (s) => s.hasStrategy,
  },
  {
    field: "connector",
    label: "Brandcode Studio connection",
    tool: "brand_brandcode_connect",
    description: "Connect to Brandcode Studio for hosting + sync",
    effort: "moderate",
    points: 5,
    unlocks: [
      "Cloud-hosted brand URL",
      "Team sharing via brand_brandcode_sync",
      "Cross-device brand access",
    ],
    check: (s) => s.hasConnector,
  },
  {
    field: "extraction_evidence",
    label: "Multi-page extraction evidence",
    tool: "brand_extract_site",
    toolArgs: 'url="https://yourbrand.com"',
    description: "Run deep multi-page extraction for richer evidence",
    effort: "moderate",
    points: 5,
    unlocks: [
      "Richer design synthesis signals",
      "Cross-page consistency validation",
      "extraction-evidence.json for audit trail",
    ],
    check: (s) => s.hasExtractionEvidence,
  },
];

// ---------------------------------------------------------------------------
// State assessment
// ---------------------------------------------------------------------------

async function assessBrandState(brandDir: BrandDir): Promise<BrandState | null> {
  if (!(await brandDir.exists())) return null;

  try {
    const identity = await brandDir.readCoreIdentity();
    const hasVisual = await brandDir.hasVisualIdentity();
    const hasMessaging = await brandDir.hasMessaging();
    const hasStrategy = await brandDir.hasStrategy();
    const hasRuntime = await brandDir.hasRuntime();
    const hasExtractionEvidence = await brandDir.hasExtractionEvidence();
    const hasDesignSynthesis = await brandDir.hasDesignSynthesis();
    const hasDesignMd = await brandDir.hasDesignMarkdown();

    let hasPolicy = false;
    try { await brandDir.readPolicy(); hasPolicy = true; } catch { /* nope */ }

    let hasVoice = false;
    if (hasMessaging) {
      try {
        const m = await brandDir.readMessaging();
        hasVoice = !!m.voice;
      } catch { /* nope */ }
    }

    let hasConnector = false;
    try {
      const { readConnectorConfig } = await import("../connectors/brandcode/persistence.js");
      const config = await readConnectorConfig(brandDir.root);
      hasConnector = config !== null;
    } catch { /* nope */ }

    return {
      hasColors: identity.colors.length > 0,
      colorCount: identity.colors.length,
      hasPrimaryColor: identity.colors.some((c) => c.role === "primary"),
      hasTypography: identity.typography.length > 0,
      typographyCount: identity.typography.length,
      hasLogo: identity.logo.length > 0,
      hasLogoSvg: identity.logo.some((l) => l.variants.some((v) => !!v.inline_svg)),
      hasSpacing: identity.spacing !== null,
      hasRuntime,
      hasPolicy,
      hasDesignSynthesis,
      hasDesignMd,
      hasVisualIdentity: hasVisual,
      hasMessaging,
      hasVoice,
      hasStrategy,
      hasExtractionEvidence,
      hasConnector,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function generateRecoveryGuidance(brandDir: BrandDir): Promise<RecoveryReport | null> {
  const state = await assessBrandState(brandDir);
  if (!state) return null;

  const totalPoints = CAPABILITY_GRAPH.reduce((sum, dep) => sum + dep.points, 0);
  const earnedPoints = CAPABILITY_GRAPH
    .filter((dep) => dep.check(state))
    .reduce((sum, dep) => sum + dep.points, 0);

  const currentReadiness = Math.round((earnedPoints / totalPoints) * 100);

  // Find missing capabilities, sorted by points descending
  const missing = CAPABILITY_GRAPH
    .filter((dep) => !dep.check(state))
    .sort((a, b) => b.points - a.points);

  if (missing.length === 0) {
    return {
      currentReadiness: 100,
      maxReadiness: 100,
      actions: [],
      formatted: "Brand system is complete. All capabilities unlocked.",
    };
  }

  // Build ranked actions with cumulative readiness projection
  let projectedReadiness = currentReadiness;
  const actions: RecoveryAction[] = missing.map((dep, i) => {
    const pointsPct = Math.round((dep.points / totalPoints) * 100);
    projectedReadiness += pointsPct;
    return {
      rank: i + 1,
      field: dep.field,
      tool: dep.tool,
      toolArgs: dep.toolArgs,
      description: dep.description,
      unlocks: dep.unlocks,
      readinessPoints: pointsPct,
      effort: dep.effort,
      tier: i < 3 ? "highest" : "lower",
    };
  });

  // Format
  const lines: string[] = [`Brand readiness: ${currentReadiness}%`, ""];

  const highest = actions.filter((a) => a.tier === "highest");
  const lower = actions.filter((a) => a.tier === "lower");

  if (highest.length > 0) {
    lines.push("HIGHEST IMPACT (do these first):");
    let cumulative = currentReadiness;
    for (const a of highest) {
      const before = cumulative;
      cumulative += a.readinessPoints;
      lines.push(`  ${a.rank}. ${a.description}`);
      if (a.toolArgs) {
        lines.push(`     → Run: ${a.tool} ${a.toolArgs}`);
      } else {
        lines.push(`     → Run: ${a.tool}`);
      }
      lines.push(`     → Unlocks: ${a.unlocks.slice(0, 2).join(", ")}`);
      lines.push(`     → Readiness: ${before}% → ${cumulative}% (+${a.readinessPoints}pp)`);
      lines.push("");
    }
  }

  if (lower.length > 0) {
    lines.push("LOWER IMPACT (nice to have):");
    for (const a of lower) {
      lines.push(`  ${a.rank}. ${a.description} (+${a.readinessPoints}pp)`);
      lines.push(`     → Unlocks: ${a.unlocks[0]}`);
    }
  }

  return {
    currentReadiness,
    maxReadiness: 100,
    actions,
    formatted: lines.join("\n"),
  };
}
