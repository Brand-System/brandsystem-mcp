/**
 * Brand Preview Generator (M-15)
 *
 * Generates a single-page HTML visual proof from brand-runtime.json.
 * Shows the brand applied to common UI patterns — not a data dump.
 * Designed to be screenshot-ready and shareable.
 */

import type { BrandRuntime } from "./runtime-compiler.js";

function contrastColor(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.5 ? "#1a1a1a" : "#ffffff";
}

function wcagRatio(hex1: string, hex2: string): string {
  const lum = (hex: string) => {
    const h = hex.replace("#", "");
    const srgb = [0, 2, 4].map((i) => {
      const c = parseInt(h.substring(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  };
  const l1 = lum(hex1);
  const l2 = lum(hex2);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return ratio.toFixed(1);
}

export function generatePreviewHtml(runtime: BrandRuntime): string {
  const name = runtime.client_name || "Brand";
  const colors = runtime.identity?.colors ?? {};
  const typography = runtime.identity?.typography ?? {};
  const voice = runtime.voice;
  const visual = runtime.visual;

  const primaryColor = colors.primary ?? colors.secondary ?? Object.values(colors)[0] ?? "#2563eb";
  const secondaryColor = colors.secondary ?? colors.accent ?? Object.values(colors)[1] ?? "#64748b";
  const accentColor = colors.accent ?? colors.action ?? Object.values(colors)[2] ?? primaryColor;
  const surfaceColor = colors.surface ?? "#ffffff";
  const textColor = colors.text ?? "#1a1a1a";

  const headingFont = Object.values(typography)[0] ?? "system-ui";
  const bodyFont = Object.values(typography)[1] ?? Object.values(typography)[0] ?? "system-ui";

  const colorEntries = Object.entries(colors);
  const fontEntries = Object.entries(typography);

  // Build color swatches
  const swatchesHtml = colorEntries
    .map(
      ([role, hex]) =>
        `<div class="swatch" style="background:${hex};color:${contrastColor(hex)}">
          <span class="swatch-hex">${hex}</span>
          <span class="swatch-role">${role}</span>
        </div>`,
    )
    .join("\n");

  // Build font specimens
  const fontSpecimensHtml = fontEntries
    .map(
      ([role, family]) =>
        `<div class="font-specimen">
          <span class="font-role">${role}</span>
          <span class="font-sample" style="font-family:'${family}',system-ui">${family}</span>
        </div>`,
    )
    .join("\n");

  // Build contrast matrix (top 4 colors against white and dark)
  const contrastPairs = colorEntries.slice(0, 4).flatMap(([role, hex]) => [
    { pair: `${role} on white`, fg: hex, bg: "#ffffff" },
    { pair: `${role} on dark`, fg: hex, bg: "#1a1a1a" },
    { pair: `white on ${role}`, fg: "#ffffff", bg: hex },
  ]);

  const contrastHtml = contrastPairs
    .map(({ pair, fg, bg }) => {
      const ratio = wcagRatio(fg, bg);
      const level = parseFloat(ratio) >= 7 ? "AAA" : parseFloat(ratio) >= 4.5 ? "AA" : parseFloat(ratio) >= 3 ? "AA-lg" : "fail";
      const levelClass = level === "fail" ? "contrast-fail" : level === "AA-lg" ? "contrast-warn" : "contrast-pass";
      return `<div class="contrast-cell ${levelClass}" style="background:${bg};color:${fg}">
        <span class="contrast-label">${pair}</span>
        <span class="contrast-ratio">${ratio}:1 ${level}</span>
      </div>`;
    })
    .join("\n");

  // Voice summary
  const voiceHtml = voice
    ? `<div class="voice-section">
        <h3>Voice</h3>
        <div class="voice-descriptors">${(voice.tone_descriptors ?? []).map((d) => `<span class="voice-tag">${d}</span>`).join("")}</div>
        ${voice.register ? `<p class="voice-register">Register: ${voice.register}</p>` : ""}
        ${voice.never_say && voice.never_say.length > 0 ? `<p class="voice-neversay">Never say: ${voice.never_say.slice(0, 5).map((w) => `<s>${w}</s>`).join(", ")}</p>` : ""}
      </div>`
    : "";

  // Anti-patterns
  const antiPatternHtml =
    visual && visual.anti_patterns && visual.anti_patterns.length > 0
      ? `<div class="antipatterns-section">
          <h3>Visual Rules</h3>
          <ul>${(visual.anti_patterns as string[]).map((r) => `<li>${r}</li>`).join("")}</ul>
        </div>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} — Brand Preview</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --primary:${primaryColor};
  --secondary:${secondaryColor};
  --accent:${accentColor};
  --surface:${surfaceColor};
  --text:${textColor};
  --heading-font:'${headingFont}',system-ui,sans-serif;
  --body-font:'${bodyFont}',system-ui,sans-serif;
  --radius:8px;
}
body{font-family:var(--body-font);color:var(--text);background:#f5f5f5;line-height:1.5}
.preview{max-width:800px;margin:0 auto;padding:32px 24px}

/* Header */
.header{background:var(--primary);color:${contrastColor(primaryColor)};padding:48px 40px;border-radius:var(--radius);margin-bottom:32px}
.header h1{font-family:var(--heading-font);font-size:32px;font-weight:700;margin-bottom:8px}
.header p{opacity:0.85;font-size:14px}

/* Section */
.section{background:var(--surface);border-radius:var(--radius);padding:32px;margin-bottom:24px}
.section h2{font-family:var(--heading-font);font-size:20px;font-weight:600;margin-bottom:16px;color:var(--text)}
.section h3{font-family:var(--heading-font);font-size:16px;font-weight:600;margin-bottom:12px;color:var(--text)}

/* Color swatches */
.swatches{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px}
.swatch{padding:24px 16px 12px;border-radius:6px;display:flex;flex-direction:column;align-items:flex-start;gap:4px;min-height:80px}
.swatch-hex{font-family:monospace;font-size:13px;opacity:0.9}
.swatch-role{font-size:11px;text-transform:uppercase;letter-spacing:0.05em;opacity:0.7}

/* Font specimens */
.font-specimens{display:flex;flex-direction:column;gap:16px}
.font-specimen{display:flex;align-items:baseline;gap:16px}
.font-role{font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#888;min-width:80px}
.font-sample{font-size:28px;font-weight:500}

/* UI demo */
.ui-demo{display:flex;flex-direction:column;gap:16px}
.demo-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.btn{padding:10px 24px;border-radius:6px;font-family:var(--body-font);font-size:14px;font-weight:500;border:none;cursor:pointer;display:inline-block}
.btn-primary{background:var(--primary);color:${contrastColor(primaryColor)}}
.btn-secondary{background:transparent;color:var(--primary);border:2px solid var(--primary)}
.btn-accent{background:var(--accent);color:${contrastColor(accentColor)}}
.demo-card{border:1px solid #e5e5e5;border-radius:var(--radius);padding:20px;flex:1;min-width:200px}
.demo-card h4{font-family:var(--heading-font);font-size:16px;margin-bottom:8px}
.demo-card p{font-size:14px;color:#666;line-height:1.6}

/* Heading hierarchy */
.heading-demo h1{font-family:var(--heading-font);font-size:36px;font-weight:700;margin-bottom:8px}
.heading-demo h2{font-family:var(--heading-font);font-size:24px;font-weight:600;margin-bottom:8px}
.heading-demo h3{font-family:var(--heading-font);font-size:18px;font-weight:500;margin-bottom:8px}
.heading-demo p{font-family:var(--body-font);font-size:15px;color:#555;max-width:60ch;line-height:1.7}

/* Contrast matrix */
.contrast-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.contrast-cell{padding:12px;border-radius:6px;display:flex;flex-direction:column;gap:2px}
.contrast-label{font-size:11px;opacity:0.8}
.contrast-ratio{font-size:13px;font-weight:600}
.contrast-fail{outline:2px solid #ef4444;outline-offset:-2px}
.contrast-warn{outline:2px solid #f59e0b;outline-offset:-2px}

/* Voice */
.voice-descriptors{display:flex;gap:8px;margin-bottom:12px}
.voice-tag{background:var(--primary);color:${contrastColor(primaryColor)};padding:4px 12px;border-radius:16px;font-size:13px;font-weight:500}
.voice-register{font-size:14px;color:#666;margin-bottom:8px}
.voice-neversay{font-size:14px;color:#888}
.voice-neversay s{color:#ef4444;text-decoration:line-through}

/* Anti-patterns */
.antipatterns-section ul{list-style:none;padding:0}
.antipatterns-section li{padding:6px 0;font-size:14px;color:#666;border-bottom:1px solid #eee}
.antipatterns-section li::before{content:"✕ ";color:#ef4444;font-weight:700}

/* Footer */
.footer{text-align:center;padding:24px;color:#999;font-size:12px}
</style>
</head>
<body>
<div class="preview">

  <div class="header">
    <h1>${name}</h1>
    <p>Brand Preview — generated from brand-runtime.json</p>
  </div>

  <div class="section">
    <h2>Color Palette</h2>
    <div class="swatches">
      ${swatchesHtml || '<p style="color:#999">No colors extracted yet</p>'}
    </div>
  </div>

  <div class="section">
    <h2>Typography</h2>
    <div class="font-specimens">
      ${fontSpecimensHtml || '<p style="color:#999">No fonts extracted yet</p>'}
    </div>
    <div class="heading-demo" style="margin-top:24px;padding-top:24px;border-top:1px solid #eee">
      <h1 style="color:var(--primary)">Heading One</h1>
      <h2>Heading Two</h2>
      <h3 style="color:var(--secondary)">Heading Three</h3>
      <p>Body text demonstrates the reading experience. Good typography creates hierarchy and rhythm that guides the eye naturally through content.</p>
    </div>
  </div>

  <div class="section">
    <h2>UI Components</h2>
    <div class="ui-demo">
      <div class="demo-row">
        <button class="btn btn-primary">Primary Action</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-accent">Accent</button>
      </div>
      <div class="demo-row">
        <div class="demo-card">
          <h4 style="color:var(--primary)">Feature Card</h4>
          <p>A sample card component styled with brand colors and typography.</p>
        </div>
        <div class="demo-card">
          <h4 style="color:var(--secondary)">Another Card</h4>
          <p>Demonstrates how secondary colors work in content containers.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Contrast Accessibility</h2>
    <div class="contrast-grid">
      ${contrastHtml || '<p style="color:#999">No colors to check</p>'}
    </div>
  </div>

  ${voiceHtml ? `<div class="section">${voiceHtml}</div>` : ""}
  ${antiPatternHtml ? `<div class="section">${antiPatternHtml}</div>` : ""}

  <div class="footer">
    Generated by <a href="https://brandcode.studio/mcp" style="color:var(--primary)">brandsystem-mcp</a> — ${new Date().toISOString().slice(0, 10)}
  </div>

</div>
</body>
</html>`;
}
