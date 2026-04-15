/**
 * Brand Diff Interpreter (M-12)
 *
 * Takes old and new brand state snapshots and produces a structured,
 * human-readable diff with per-field change type, magnitude, and impact.
 *
 * Designed to be wired into brand_brandcode_sync pull/push responses
 * to replace generic "3 files changed" with actionable brand impact.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BrandDiffChange {
  category: "color" | "typography" | "logo" | "voice" | "visual" | "governance" | "strategy";
  severity: "breaking" | "significant" | "minor";
  summary: string;
  details?: string;
}

export interface BrandDiffResult {
  changes: BrandDiffChange[];
  /** One-line summary suitable for what_happened */
  headline: string;
  /** Human-readable diff block */
  formatted: string;
}

// ---------------------------------------------------------------------------
// Color math (reused from brand-check-engine, kept local to avoid coupling)
// ---------------------------------------------------------------------------

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace("#", "").toLowerCase();
  if (h.length !== 6) return null;
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function rgbToLab(r: number, g: number, b: number): { L: number; a: number; b_: number } {
  let rr = r / 255, gg = g / 255, bb = b / 255;
  rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92;
  gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92;
  bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92;
  let x = (rr * 0.4124564 + gg * 0.3575761 + bb * 0.1804375) / 0.95047;
  let y = rr * 0.2126729 + gg * 0.7151522 + bb * 0.0721750;
  let z = (rr * 0.0193339 + gg * 0.1191920 + bb * 0.9503041) / 1.08883;
  const f = (t: number) => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  x = f(x); y = f(y); z = f(z);
  return { L: 116 * y - 16, a: 500 * (x - y), b_: 200 * (y - z) };
}

function deltaE(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return Infinity;
  const lab1 = rgbToLab(rgb1.r, rgb1.g, rgb1.b);
  const lab2 = rgbToLab(rgb2.r, rgb2.g, rgb2.b);
  return Math.round(Math.sqrt((lab1.L - lab2.L) ** 2 + (lab1.a - lab2.a) ** 2 + (lab1.b_ - lab2.b_) ** 2) * 10) / 10;
}

/** Relative luminance per WCAG */
function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const srgb = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 10) / 10;
}

// ---------------------------------------------------------------------------
// Diff functions by category
// ---------------------------------------------------------------------------

type RuntimeLike = Record<string, unknown>;

function diffColors(
  oldColors: Record<string, string> | undefined,
  newColors: Record<string, string> | undefined,
  oldTextColor?: string,
  newTextColor?: string,
): BrandDiffChange[] {
  if (!oldColors && !newColors) return [];
  const changes: BrandDiffChange[] = [];
  const old = oldColors ?? {};
  const nw = newColors ?? {};
  const allKeys = new Set([...Object.keys(old), ...Object.keys(nw)]);

  for (const role of allKeys) {
    const oldHex = old[role];
    const newHex = nw[role];

    if (!oldHex && newHex) {
      changes.push({
        category: "color",
        severity: "significant",
        summary: `COLOR  ${role}: added ${newHex}`,
      });
    } else if (oldHex && !newHex) {
      changes.push({
        category: "color",
        severity: "breaking",
        summary: `COLOR  ${role}: removed (was ${oldHex})`,
      });
    } else if (oldHex && newHex && oldHex.toLowerCase() !== newHex.toLowerCase()) {
      const de = deltaE(oldHex, newHex);
      let detail = `ΔE ${de}`;

      // Contrast impact against text color if available
      const textColor = newTextColor || oldTextColor;
      if (textColor && (role === "primary" || role === "surface" || role === "secondary")) {
        const oldContrast = contrastRatio(oldHex, textColor);
        const newContrast = contrastRatio(newHex, textColor);
        const wcaaOld = oldContrast >= 4.5 ? "AA" : oldContrast >= 3 ? "AA-large" : "fail";
        const wcaaNew = newContrast >= 4.5 ? "AA" : newContrast >= 3 ? "AA-large" : "fail";
        detail += `\n       Contrast with text: ${oldContrast}:1 → ${newContrast}:1`;
        if (wcaaOld !== wcaaNew) {
          detail += ` — WCAG ${wcaaOld} → ${wcaaNew}`;
        } else {
          detail += ` — still ${wcaaNew} compliant`;
        }
      }

      changes.push({
        category: "color",
        severity: de > 10 ? "breaking" : de > 3 ? "significant" : "minor",
        summary: `COLOR  ${role}: ${oldHex} → ${newHex} (ΔE ${de})`,
        details: detail,
      });
    }
  }

  return changes;
}

function diffTypography(
  oldTypo: Record<string, string> | undefined,
  newTypo: Record<string, string> | undefined,
): BrandDiffChange[] {
  if (!oldTypo && !newTypo) return [];
  const changes: BrandDiffChange[] = [];
  const old = oldTypo ?? {};
  const nw = newTypo ?? {};
  const allKeys = new Set([...Object.keys(old), ...Object.keys(nw)]);

  for (const role of allKeys) {
    const oldFont = old[role];
    const newFont = nw[role];

    if (!oldFont && newFont) {
      changes.push({ category: "typography", severity: "significant", summary: `FONT   ${role}: added "${newFont}"` });
    } else if (oldFont && !newFont) {
      changes.push({ category: "typography", severity: "breaking", summary: `FONT   ${role}: removed (was "${oldFont}")` });
    } else if (oldFont && newFont && oldFont !== newFont) {
      changes.push({ category: "typography", severity: "breaking", summary: `FONT   ${role}: "${oldFont}" → "${newFont}"` });
    }
  }

  return changes;
}

function diffVoice(
  oldVoice: RuntimeLike | null | undefined,
  newVoice: RuntimeLike | null | undefined,
): BrandDiffChange[] {
  if (!oldVoice && !newVoice) return [];
  const changes: BrandDiffChange[] = [];

  if (!oldVoice && newVoice) {
    changes.push({ category: "voice", severity: "significant", summary: "VOICE  Voice codex added" });
    return changes;
  }
  if (oldVoice && !newVoice) {
    changes.push({ category: "voice", severity: "breaking", summary: "VOICE  Voice codex removed" });
    return changes;
  }
  if (!oldVoice || !newVoice) return [];

  // Tone register
  const oldRegister = oldVoice.register as string | undefined;
  const newRegister = newVoice.register as string | undefined;
  if (oldRegister && newRegister && oldRegister !== newRegister) {
    changes.push({
      category: "voice",
      severity: "significant",
      summary: `VOICE  tone register: "${oldRegister}" → "${newRegister}"`,
    });
  }

  // Never-say list
  const oldNeverSay = new Set((oldVoice.never_say as string[] | undefined) ?? []);
  const newNeverSay = new Set((newVoice.never_say as string[] | undefined) ?? []);
  const added = [...newNeverSay].filter((w) => !oldNeverSay.has(w));
  const removed = [...oldNeverSay].filter((w) => !newNeverSay.has(w));
  if (added.length > 0 || removed.length > 0) {
    const parts: string[] = [];
    if (added.length > 0) parts.push(`${added.length} addition(s): ${added.slice(0, 3).map((w) => `"${w}"`).join(", ")}`);
    if (removed.length > 0) parts.push(`${removed.length} removal(s): ${removed.slice(0, 3).map((w) => `"${w}"`).join(", ")}`);
    changes.push({
      category: "voice",
      severity: "significant",
      summary: `VOICE  never_say: ${parts.join("; ")}`,
    });
  }

  // Anchor terms
  const oldAnchors = oldVoice.anchor_terms as Record<string, string> | undefined;
  const newAnchors = newVoice.anchor_terms as Record<string, string> | undefined;
  if (oldAnchors && newAnchors) {
    const oldKeys = new Set(Object.keys(oldAnchors));
    const newKeys = new Set(Object.keys(newAnchors));
    const addedTerms = [...newKeys].filter((k) => !oldKeys.has(k));
    const removedTerms = [...oldKeys].filter((k) => !newKeys.has(k));
    if (addedTerms.length > 0 || removedTerms.length > 0) {
      changes.push({
        category: "voice",
        severity: "minor",
        summary: `VOICE  anchor vocabulary: ${addedTerms.length} added, ${removedTerms.length} removed`,
      });
    }
  }

  // Tone descriptors
  const oldDesc = (oldVoice.tone_descriptors as string[] | undefined) ?? [];
  const newDesc = (newVoice.tone_descriptors as string[] | undefined) ?? [];
  if (JSON.stringify(oldDesc) !== JSON.stringify(newDesc)) {
    changes.push({
      category: "voice",
      severity: "significant",
      summary: `VOICE  tone descriptors: [${oldDesc.join(", ")}] → [${newDesc.join(", ")}]`,
    });
  }

  return changes;
}

function diffVisual(
  oldVisual: RuntimeLike | null | undefined,
  newVisual: RuntimeLike | null | undefined,
): BrandDiffChange[] {
  if (!oldVisual && !newVisual) return [];
  const changes: BrandDiffChange[] = [];

  if (!oldVisual && newVisual) {
    changes.push({ category: "visual", severity: "significant", summary: "VISUAL Visual identity added" });
    return changes;
  }
  if (oldVisual && !newVisual) {
    changes.push({ category: "visual", severity: "breaking", summary: "VISUAL Visual identity removed" });
    return changes;
  }
  if (!oldVisual || !newVisual) return [];

  const oldAntiPatterns = (oldVisual.anti_patterns as string[] | undefined) ?? [];
  const newAntiPatterns = (newVisual.anti_patterns as string[] | undefined) ?? [];
  const addedRules = newAntiPatterns.filter((r) => !oldAntiPatterns.includes(r));
  const removedRules = oldAntiPatterns.filter((r) => !newAntiPatterns.includes(r));
  if (addedRules.length > 0 || removedRules.length > 0) {
    changes.push({
      category: "visual",
      severity: "significant",
      summary: `VISUAL anti-patterns: ${addedRules.length} added, ${removedRules.length} removed`,
      details: addedRules.length > 0 ? `New rules: ${addedRules.slice(0, 3).join("; ")}` : undefined,
    });
  }

  return changes;
}

function diffStrategy(
  oldStrategy: RuntimeLike | null | undefined,
  newStrategy: RuntimeLike | null | undefined,
): BrandDiffChange[] {
  if (!oldStrategy && !newStrategy) return [];
  const changes: BrandDiffChange[] = [];

  if (!oldStrategy && newStrategy) {
    changes.push({ category: "strategy", severity: "significant", summary: "STRATEGY Content strategy added" });
    return changes;
  }
  if (oldStrategy && !newStrategy) {
    changes.push({ category: "strategy", severity: "breaking", summary: "STRATEGY Content strategy removed" });
    return changes;
  }
  if (!oldStrategy || !newStrategy) return [];

  const oldPC = oldStrategy.persona_count as number | undefined;
  const newPC = newStrategy.persona_count as number | undefined;
  if (oldPC !== undefined && newPC !== undefined && oldPC !== newPC) {
    changes.push({ category: "strategy", severity: "minor", summary: `STRATEGY personas: ${oldPC} → ${newPC}` });
  }

  const oldMS = oldStrategy.matrix_size as number | undefined;
  const newMS = newStrategy.matrix_size as number | undefined;
  if (oldMS !== undefined && newMS !== undefined && oldMS !== newMS) {
    changes.push({ category: "strategy", severity: "minor", summary: `STRATEGY messaging matrix: ${oldMS} → ${newMS} variants` });
  }

  return changes;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Compute a structured diff between two brand runtime snapshots.
 * Accepts the raw JSON from brand-runtime.json (old and new).
 */
export function computeBrandDiff(
  oldRuntime: RuntimeLike | null,
  newRuntime: RuntimeLike | null,
): BrandDiffResult {
  if (!oldRuntime && !newRuntime) {
    return { changes: [], headline: "No brand data to compare", formatted: "" };
  }
  if (!oldRuntime && newRuntime) {
    return { changes: [{ category: "color", severity: "significant", summary: "New brand created" }], headline: "New brand created", formatted: "New brand — no previous state to compare" };
  }
  if (oldRuntime && !newRuntime) {
    return { changes: [{ category: "color", severity: "breaking", summary: "Brand removed" }], headline: "Brand removed", formatted: "Brand data removed" };
  }

  const old = oldRuntime!;
  const nw = newRuntime!;

  const oldIdentity = old.identity as RuntimeLike | undefined;
  const newIdentity = nw.identity as RuntimeLike | undefined;

  // Find text color for contrast computation
  const oldTextColor = (oldIdentity?.colors as Record<string, string> | undefined)?.text;
  const newTextColor = (newIdentity?.colors as Record<string, string> | undefined)?.text;

  const changes: BrandDiffChange[] = [
    ...diffColors(
      oldIdentity?.colors as Record<string, string> | undefined,
      newIdentity?.colors as Record<string, string> | undefined,
      oldTextColor,
      newTextColor,
    ),
    ...diffTypography(
      oldIdentity?.typography as Record<string, string> | undefined,
      newIdentity?.typography as Record<string, string> | undefined,
    ),
    ...diffVoice(old.voice as RuntimeLike | null, nw.voice as RuntimeLike | null),
    ...diffVisual(old.visual as RuntimeLike | null, nw.visual as RuntimeLike | null),
    ...diffStrategy(old.strategy as RuntimeLike | null, nw.strategy as RuntimeLike | null),
  ];

  // Logo change
  const oldLogo = oldIdentity?.logo as RuntimeLike | undefined;
  const newLogo = newIdentity?.logo as RuntimeLike | undefined;
  if (JSON.stringify(oldLogo) !== JSON.stringify(newLogo)) {
    if (!oldLogo && newLogo) {
      changes.push({ category: "logo", severity: "significant", summary: "LOGO   Logo added" });
    } else if (oldLogo && !newLogo) {
      changes.push({ category: "logo", severity: "breaking", summary: "LOGO   Logo removed" });
    } else {
      changes.push({ category: "logo", severity: "significant", summary: "LOGO   Logo updated" });
    }
  }

  if (changes.length === 0) {
    return { changes: [], headline: "No brand changes detected", formatted: "Brand runtime is identical" };
  }

  // Format
  const formatted = changes
    .map((c) => c.details ? `${c.summary}\n       ${c.details}` : c.summary)
    .join("\n\n");

  const breaking = changes.filter((c) => c.severity === "breaking").length;
  const significant = changes.filter((c) => c.severity === "significant").length;
  const minor = changes.filter((c) => c.severity === "minor").length;

  const parts: string[] = [];
  if (breaking > 0) parts.push(`${breaking} breaking`);
  if (significant > 0) parts.push(`${significant} significant`);
  if (minor > 0) parts.push(`${minor} minor`);

  const headline = `${changes.length} change(s) detected: ${parts.join(", ")}`;

  return { changes, headline, formatted };
}
