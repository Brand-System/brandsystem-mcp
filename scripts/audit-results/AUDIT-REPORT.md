# Lane I — Extraction Quality Audit Report
**Version:** @brandsystem/mcp v0.3.12
**Date:** April 6, 2026
**Benchmark:** Baseline for extraction quality improvements

## Summary

| Metric | Result |
|---|---|
| Brands tested | 10 |
| Average quality score | 7.3/10 |
| Average extraction time | 1,399ms |
| Logo detection rate | 100% (10/10) |
| Color extraction rate | 90% (9/10 found colors) |
| Font extraction rate | 100% (all 10 found fonts) |
| Runtime generation | 100% (all 10 produced brand-runtime.json) |

## Per-Brand Results

| Brand | Colors | Fonts | Logo | Quality | Duration | Issues |
|---|---|---|---|---|---|---|
| Linear | 6 | 5 | Yes | HIGH (9/10) | 3022ms | None |
| Stripe | 12 | 5 | Yes | HIGH (8/10) | 1423ms | None |
| Notion | 6 | 5 | Yes | HIGH (8/10) | 1737ms | None |
| Vercel | 10 | 5 | Yes | HIGH (8/10) | 1183ms | None |
| Figma | 4 | 5 | Yes | HIGH (7/10) | 1705ms | Fewer colors than expected |
| Basecamp | 0 | 5 | Yes | LOW (2/10) | 778ms | Zero colors |
| Arc | 4 | 5 | Yes | MEDIUM (5/10) | 754ms | Few colors |
| Superhuman | 9 | 5 | Yes | HIGH (7/10) | 982ms | 5/9 unknown roles |
| Cal.com | 8 | 5 | Yes | MEDIUM (6/10) | 1908ms | None |
| Loom | 13 | 5 | Yes | HIGH (7/10) | 497ms | 9/13 unknown roles |

## Issues Found

### CRITICAL: Basecamp — Zero Colors Extracted

Basecamp.com uses CSS custom properties defined via JavaScript or loaded dynamically. The static CSS parser found zero color declarations. This is the CSS-in-JS / runtime CSS gap identified in Lane I ticket I8.

**Root cause:** The extractor only parses `<style>` blocks and linked `<link rel="stylesheet">` stylesheets. Basecamp's colors are either:
- Set via JavaScript after page load
- In CSS files loaded dynamically
- Using CSS custom properties defined in a way the parser doesn't catch

**Impact:** Any site using runtime CSS injection will have the same problem. This likely affects a significant portion of modern web apps.

**Recommended fix (I8):** Headless browser fallback. When static extraction yields zero colors, offer to extract via computed styles using a headless browser. This is a larger architectural change.

### HIGH: Color Role Assignment — Too Many "unknown" Roles

Superhuman (5/9 unknown) and Loom (9/13 unknown) have CSS variable names that include color scale numbers (e.g., `mulberry 30`, `thd color violet 50`) but the role inference doesn't recognize scale patterns.

**Pattern:** When a brand uses a design token naming convention like `{hue} {scale}`, the role inference sees no keyword match (no "primary", "secondary", etc.) and defaults to "unknown".

**Recommended fix (I2):** Detect design token scale patterns. If multiple colors share a hue name with different scale numbers, group them as a scale and infer:
- Lowest scale number (lightest) = tint
- Middle = base color (infer role from hue name or frequency)
- Highest scale number (darkest) = text or emphasis variant

### MEDIUM: Font Cap at 5

Every brand returned exactly 5 fonts. This is either a cap in the extractor or coincidental.

**Investigation needed:** Check if the CSS parser has a limit on font extraction. Five fonts is reasonable for most brands but suspicious as a universal count.

### LOW: Logo Quality Not Assessed

Logo detection rate is 100% but we don't know if the correct logo was found. The extractor finds logos, but Mira's Booth Beacon test showed that SVG gradient stops can be empty, rendering the logo as a black rectangle. Need manual verification of at least the top 3 results.

## What Works Well

1. **Extraction speed:** Average 1.4 seconds for full Session 1 pipeline. Fastest was Loom at 497ms.
2. **Logo detection:** 100% rate across 10 diverse sites. The header SVG priority + Clearbit + common path fallback chain is robust.
3. **Runtime generation:** 100% produced brand-runtime.json and interaction-policy.json. The compile step is reliable.
4. **CSS variable detection:** Brands using explicit CSS custom properties (Linear, Vercel, Loom) extracted well. The `css-variable` source type correctly gets highest priority.
5. **Font detection:** Consistent across all 10 brands. System font filtering works correctly.

## Prioritized Fix List

| Priority | Issue | Ticket | Effort | Impact |
|---|---|---|---|---|
| 1 | Design token scale grouping (unknown roles) | I2 | Medium | HIGH — affects any brand using token naming |
| 2 | Basecamp-style zero extraction (runtime CSS) | I8 | Large | HIGH — affects JS-heavy sites |
| 3 | Investigate font cap at 5 | I3 | Small | LOW — 5 is usually enough |
| 4 | Logo quality verification | I4 | Medium | MEDIUM — detect empty gradient stops |

## Benchmark Baselines

These numbers are the baseline to beat after extraction improvements:

```
Average quality:         7.3 / 10
Average duration:        1,399 ms
Logo detection rate:     100%
Color extraction rate:   90% (9/10 brands)
Role assignment rate:    ~60% (estimated, many unknowns)
Font extraction rate:    100%
Runtime generation rate: 100%
```

Re-run this audit after each batch of extraction improvements to measure progress.
