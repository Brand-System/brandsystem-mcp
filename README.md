# @brandsystem/mcp

MCP server for progressive brand identity extraction. Scan a website, get your brand system.

Most brand guidelines live in PDFs that no tool can read. This MCP server extracts your brand identity from live sources (websites, Figma files), compiles it into structured design tokens, and makes it available to any AI coding or content tool through the [Model Context Protocol](https://modelcontextprotocol.io).

The result is a `.brand/` directory in your repo with your colors, fonts, logos, and DTCG tokens -- portable, version-controlled, and ready for any AI tool to consume.

---

## Quick Start

### 1. Add to your MCP config

Add this to your `.mcp.json` (Claude Code, Cursor, Windsurf):

```json
{
  "mcpServers": {
    "brandsystem": {
      "command": "npx",
      "args": ["-y", "@brandsystem/mcp"]
    }
  }
}
```

### 2. Initialize your brand system

Tell your AI tool:

> Run brand_init for "Acme Corp" with website https://acme.com

### 3. Extract, compile, report

> Run brand_extract_web, then brand_compile, then brand_report

You now have a `.brand/` directory with your full brand identity, DTCG design tokens, and a portable HTML report.

---

## What It Does

The server implements a four-stage pipeline:

```
Extract --> Compile --> Audit --> Report
```

**Extract** -- Pull brand identity from live sources. Web extraction parses CSS for colors, font stacks, and logo candidates. Figma extraction reads variables and text styles for higher-accuracy tokens. Both sources are confidence-scored and merged, with Figma overriding web data when available.

**Compile** -- Transform raw identity data into DTCG-format `tokens.json`. Only values with medium or higher confidence are promoted to tokens. Low-confidence values are surfaced in `needs-clarification.yaml` for human review.

**Audit** -- Validate the `.brand/` directory against schema requirements. Checks file existence, schema validity, primary color assignment, typography coverage, logo embedding, and confidence distribution.

**Report** -- Generate a self-contained HTML brand identity report. Embeds logos inline, displays color swatches with roles, lists typography, and includes the compiled tokens. The HTML is portable -- paste it into any AI conversation as brand guidelines.

---

## Tools Reference

### Session 1: Core Identity

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `brand_start` | **Entry point.** Creates brand system or resumes existing one. Presents source menu and interview questions. | `client_name` (required), `website_url`, `industry` |
| `brand_init` | Initialize a new `.brand/` directory with config scaffold and empty identity | `client_name` (required), `industry`, `website_url`, `figma_file_key` |
| `brand_extract_web` | Extract colors, fonts, and logos from a website by parsing HTML and CSS | `url` (required) |
| `brand_extract_figma` | Extract brand identity from Figma (two-phase: plan then ingest) | `mode` (`plan` or `ingest`), `figma_file_key`, `variables`, `styles`, `logo_svg` |
| `brand_compile` | Compile core-identity into DTCG tokens. Generates VIM when Session 2 data exists. | No parameters |
| `brand_clarify` | Resolve clarification items interactively (color roles, font confirmations) | `id` (required), `answer` (required) |
| `brand_audit` | Validate the `.brand/` directory against schema requirements | No parameters |
| `brand_status` | Show current state with session progression and next steps | No parameters |
| `brand_report` | Generate a portable HTML brand identity report with embedded assets | No parameters |

### Session 2: Visual Identity

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `brand_deepen_identity` | Visual identity interview — composition, patterns, illustration, photography, signature, anti-patterns | `mode` (`interview` or `record`), `section`, `answers` |
| `brand_ingest_assets` | Scan and catalog brand assets, generate manifests | `mode` (`scan` or `tag`), `file`, `description`, `usage`, `theme` |
| `brand_preflight` | Check HTML content against brand compliance rules | `html` (required), `mode` (`check` or `rules`) |

### Session 3: Core Messaging

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `brand_extract_messaging` | Audit existing website voice — fingerprint, vocabulary, claims, contradictions, AI-isms | `url` (required), `pages` (optional) |
| `brand_compile_messaging` | Guided interview for perspective, voice codex, and brand story | `mode` (`interview` or `record`), `section`, `answers` |
| `brand_write` | Load full brand context for content generation. Routes visual vs written vs mixed types. | `content_type` (required), `topic`, `channel`, `theme` |

### Tool Flow

The tools auto-chain — each tool's response tells the LLM what to run next:

```
Session 1: brand_start → brand_extract_web → brand_compile → brand_clarify → brand_report
Session 2: brand_deepen_identity (interview × 6 sections) → brand_compile (generates VIM)
Session 3: brand_extract_messaging → brand_compile_messaging (interview × 3 sections) → brand_write
```

`brand_status` can be called at any point. `brand_preflight` runs after any content generation. `brand_audit` validates the system at any stage.

---

## The `.brand/` Directory

After running the full pipeline, your `.brand/` directory looks like this:

```
.brand/
  brand.config.yaml              # Client name, industry, source URLs, session state
  core-identity.yaml             # Colors, typography, logos with confidence scores
  tokens.json                    # DTCG design tokens (compiled output)
  needs-clarification.yaml       # Items requiring human review
  brand-report.html              # Portable HTML brand report
  visual-identity.yaml           # Session 2: composition, patterns, anti-patterns
  visual-identity-manifest.md    # Session 2: compiled VIM document
  system-integration.md          # Session 2: CLAUDE.md / .cursorrules setup guide
  messaging.yaml                 # Session 3: perspective, voice, brand story
  messaging-audit.md             # Session 3: voice fingerprint analysis
  brand-story.md                 # Session 3: compiled brand narrative
  assets/
    logo/
      logo-wordmark.svg          # Extracted logo files
    illustrations/               # Brand illustrations with MANIFEST.yaml
    stickers/                    # Brand stickers with MANIFEST.yaml
    patterns/                    # Brand patterns with MANIFEST.yaml
```

### File Details

| File | Format | Purpose |
|------|--------|---------|
| `brand.config.yaml` | YAML | Project metadata: client name, industry, website URL, Figma file key, session number, schema version |
| `core-identity.yaml` | YAML | All extracted brand data: colors (with roles and confidence), typography (with families and weights), logo specs (with inline SVG and data URIs), spacing |
| `tokens.json` | JSON | [DTCG](https://tr.designtokens.org/format/) design tokens. Only includes values with medium+ confidence. Each token carries `$extensions` with source and confidence metadata |
| `needs-clarification.yaml` | YAML | Prioritized list of items the system could not resolve confidently: missing primary color, low-confidence values, unassigned roles |
| `brand-report.html` | HTML | Self-contained brand report. Works offline, embeds all assets inline. Paste into any AI tool as brand guidelines |
| `assets/logo/` | SVG/PNG | Extracted logo files. SVGs include inline path data in `core-identity.yaml` for portability |

---

## Platform Setup

### Claude Code

Create `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "brandsystem": {
      "command": "npx",
      "args": ["-y", "@brandsystem/mcp"]
    }
  }
}
```

### Cursor

Create `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "brandsystem": {
      "command": "npx",
      "args": ["-y", "@brandsystem/mcp"]
    }
  }
}
```

### Windsurf

Add via Windsurf MCP settings (Settings > MCP Servers > Add):

- **Name:** brandsystem
- **Command:** `npx -y @brandsystem/mcp`

### Claude Chat (no MCP)

If you are using Claude Chat without MCP support:

1. Run the pipeline in a code environment first to generate `brand-report.html`
2. Upload the HTML file to your Claude Chat conversation
3. Say: "Use this as my brand guidelines for everything we create"

The report HTML is self-contained and works as a standalone brand reference in any AI tool.

---

## How It Works

### Confidence Scoring

Every extracted value carries a confidence level:

| Level | Meaning | Token Behavior |
|-------|---------|----------------|
| `confirmed` | Human-verified | Included in tokens |
| `high` | Strong signal (e.g., Figma variable, CSS custom property named `--brand-primary`) | Included in tokens |
| `medium` | Reasonable inference (e.g., most-frequent chromatic color in CSS) | Included in tokens |
| `low` | Weak signal (e.g., color appears once in a generic property) | Excluded from tokens, added to `needs-clarification.yaml` |

### Source Precedence

When the same brand element is found in multiple sources, the higher-precedence source wins:

```
figma > manual > web
```

A Figma-sourced primary color will replace a web-extracted one. A manually confirmed value overrides both automated sources. Within the same source, higher confidence wins.

### Web Extraction

`brand_extract_web` fetches the target URL and:

1. Parses all `<style>` blocks and up to 5 linked stylesheets
2. Extracts color values from CSS properties and custom properties
3. Infers color roles from property names (e.g., `--primary`, `--brand-accent`)
4. Promotes the most-frequent chromatic color to "primary" if no explicit primary is found
5. Extracts font families and ranks by frequency
6. Finds logo candidates from `<img>`, `<svg>`, and `<link rel="icon">` elements
7. Downloads and embeds logos as inline SVG or base64 data URIs

### Figma Extraction

`brand_extract_figma` works in two steps to bridge between the Figma MCP and brandsystem:

1. **Plan mode** -- Returns specific instructions for what data to fetch from Figma (variables, text styles, logo components)
2. **Ingest mode** -- Processes the collected Figma data, maps variable names to roles, and merges into `core-identity.yaml` at `high` confidence

### DTCG Token Compilation

`brand_compile` transforms `core-identity.yaml` into [Design Tokens Community Group](https://tr.designtokens.org/format/) format:

- Colors become `$type: "color"` tokens keyed by role
- Typography becomes grouped tokens with `fontFamily`, `dimension` (size), and `fontWeight` entries
- Spacing becomes `dimension` tokens with scale values
- Each token includes `$extensions["com.brandsystem"]` with source and confidence metadata
- Only values with `medium` or higher confidence are included

---

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Watch mode for development
npm run dev

# Run tests
npm test

# Watch mode for tests
npm run test:watch

# Type check without emitting
npm run lint

# Start the server (stdio transport)
npm start
```

### Project Structure

```
src/
  index.ts              # Entry point -- stdio transport
  server.ts             # MCP server creation and tool registration (16 tools)
  tools/                # One file per tool
    brand-start.ts              # Onboarding router (entry point)
    brand-init.ts               # Directory scaffolding
    brand-extract-web.ts        # Website extraction
    brand-extract-figma.ts      # Figma extraction (plan/ingest)
    brand-compile.ts            # Token + VIM compilation
    brand-clarify.ts            # Interactive clarification
    brand-audit.ts              # Schema validation
    brand-status.ts             # Progress dashboard
    brand-report.ts             # HTML report generation
    brand-deepen-identity.ts    # Session 2: visual identity interview
    brand-ingest-assets.ts      # Session 2: asset cataloging
    brand-preflight.ts          # Session 2: HTML compliance checking
    brand-extract-messaging.ts  # Session 3: voice/messaging audit
    brand-compile-messaging.ts  # Session 3: perspective + voice interview
    brand-write.ts              # Session 3: content generation context
  lib/                  # Shared utilities
    brand-dir.ts        # .brand/ directory I/O (YAML, JSON, markdown, assets)
    confidence.ts       # Confidence scoring and source precedence
    css-parser.ts       # CSS color and font extraction
    dtcg-compiler.ts    # DTCG token compilation
    logo-extractor.ts   # Logo candidate detection
    svg-resolver.ts     # SVG inlining and base64 encoding
    report-html.ts      # HTML report generation
    vim-generator.ts    # Visual Identity Manifest + system integration markdown
    response.ts         # Structured MCP response builder
  types/
    index.ts            # TypeScript type definitions
  schemas/
    index.ts            # Zod schemas for validation
bin/
  brandsystem-mcp.mjs   # CLI entry point
test/
```

---

## License

MIT
