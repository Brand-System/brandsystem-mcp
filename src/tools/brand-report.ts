import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BrandDir } from "../lib/brand-dir.js";
import { generateReportHTML, generateBrandInstructions } from "../lib/report-html.js";
import type { NeedsClarification } from "../types/index.js";
import { access } from "node:fs/promises";
import { join } from "node:path";

async function handler() {
  const brandDir = new BrandDir(process.cwd());

  if (!(await brandDir.exists())) {
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            _metadata: {
              what_happened: "No .brand/ directory found",
              next_steps: ["Run brand_init first to create the brand system"],
            },
            error: "not_initialized",
          }),
        },
      ],
    };
  }

  const config = await brandDir.readConfig();
  const identity = await brandDir.readCoreIdentity();

  // Read clarifications if they exist
  let clarifications: NeedsClarification = { schema_version: "0.1.0", items: [] };
  try {
    await access(join(brandDir.brandPath, "needs-clarification.yaml"));
    clarifications = await brandDir.readClarifications();
  } catch {
    // No clarifications file — that's fine
  }

  // Count tokens if they exist
  let tokenCount = 0;
  try {
    await access(join(brandDir.brandPath, "tokens.json"));
    const tokens = await brandDir.readTokens();
    const brand = tokens.brand as Record<string, Record<string, unknown>> | undefined;
    if (brand) {
      tokenCount += Object.keys(brand.color || {}).length;
      tokenCount += Object.keys(brand.typography || {}).length;
      tokenCount += Object.keys(brand.spacing || {}).length;
    }
  } catch {
    // No tokens file
  }

  // Simple audit counts (inline, avoid circular dep on audit tool)
  let pass = 0, warn = 0, fail = 0;
  if (identity.colors.length > 0) pass++; else warn++;
  if (identity.colors.some((c) => c.role === "primary")) pass++; else warn++;
  if (identity.typography.length > 0) pass++; else warn++;
  if (identity.logo.length > 0) pass++; else warn++;
  if (tokenCount > 0) pass++; else warn++;
  if (identity.colors.every((c) => /^#[0-9a-fA-F]{3,8}$/.test(c.value))) pass++; else fail++;
  const lowConf = [...identity.colors, ...identity.typography].filter(
    (e) => e.confidence === "low"
  ).length;
  if (lowConf === 0) pass++; else warn++;

  const html = generateReportHTML({
    config,
    identity,
    clarifications: clarifications.items,
    tokenCount,
    auditSummary: { pass, warn, fail },
  });

  // Write to disk for Code environments
  await brandDir.writeAsset("../brand-report.html", html);

  // Build the conversation guide for the LLM
  const hasLogo = identity.logo.length > 0;
  const hasPrimary = identity.colors.some((c) => c.role === "primary");
  const hasHighConfFonts = identity.typography.some((t) => t.confidence !== "low");

  // Generate the portable brand instructions text
  const brandInstructions = generateBrandInstructions(config, identity);

  const looksRightActions = [
    "**Paste into your AI tool's instructions** — The report includes a ready-to-copy Brand Instructions block. Paste it into: Claude Project Instructions, a ChatGPT Custom GPT, a Gemini Gem, Cursor .cursorrules, or any AI tool's system prompt",
    "**Upload this file as reference** — Drop this HTML into any chat when creating visual content and say \"Use this as my brand guidelines\"",
    "**Share with your team** — Anyone who pastes the Brand Instructions block into their AI tool will get on-brand output immediately",
  ];

  const looksWrongActions: string[] = [];
  if (!hasLogo) {
    looksWrongActions.push("**Connect to Figma** — Extract your logo, colors, and typography directly from your design file (run brand_extract_figma)");
  }
  if (!hasPrimary || clarifications.items.length > 0) {
    looksWrongActions.push("**Upload brand guidelines** — Share your brand guidelines PDF or document and we'll extract the correct values");
  }
  looksWrongActions.push(
    "**Upload an on-brand asset** — Share a file you know is on-brand (website screenshot, social graphic, presentation) and we'll sample the correct colors and fonts from it",
    "**Send to your design team** — Forward this report to your brand/design team for review — they can correct any values and send it back",
    "**Scan a different URL** — If this wasn't your main brand page, try brand_extract_web with a different URL",
  );

  // Return both metadata (for the LLM) and HTML (for artifact rendering)
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            _metadata: {
              what_happened: `Generated brand identity report for "${config.client_name}"`,
              conversation_guide: {
                instruction: "Present the HTML as an artifact, then ask the user: 'Does this look right?' and present the two paths below based on their answer.",
                if_looks_right: {
                  say: `Great — here's how to start using your brand identity everywhere:`,
                  actions: looksRightActions,
                },
                if_looks_wrong: {
                  say: "No problem — let's get it right. What's off? Here are some ways to improve it:",
                  actions: looksWrongActions,
                  follow_up: "Which of these would be easiest for you? Or tell me what specifically looks wrong and I'll help fix it.",
                },
              },
            },
            report: {
              file: ".brand/brand-report.html",
              colors: identity.colors.length,
              fonts: identity.typography.length,
              logos: identity.logo.length,
              tokens: tokenCount,
              clarifications: clarifications.items.length,
              completeness: {
                has_logo: hasLogo,
                has_primary_color: hasPrimary,
                has_fonts: hasHighConfFonts,
              },
            },
            brand_instructions: brandInstructions,
          },
          null,
          2
        ),
      },
      {
        type: "text" as const,
        text: `---BRAND_REPORT_HTML_START---\n${html}\n---BRAND_REPORT_HTML_END---`,
      },
    ],
  };
}

export function register(server: McpServer) {
  server.tool(
    "brand_report",
    "Generate a self-contained HTML brand identity report. Embeds logos as inline SVG, lists colors with roles, typography, and DTCG tokens. The HTML is portable — it works when pasted into any AI conversation as brand guidelines. Use AFTER brand_compile. In Chat: present the HTML as an artifact. In Code: also written to .brand/brand-report.html.",
    async () => handler()
  );
}
