import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Register MCP prompts — reusable interaction templates that agents
 * can list and invoke for common brand workflows.
 */
export function registerPrompts(server: McpServer): void {
  // --- Extract brand from a website ---
  server.prompt(
    "extract-brand",
    "Extract brand identity from a website URL. Runs the full extraction pipeline: colors, fonts, logo, visual rules, and generates tokens + runtime.",
    {
      url: z.string().describe("Website URL to extract brand from"),
    },
    ({ url }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Extract the brand identity from ${url}. Use brand_start with mode="auto" to run the full pipeline. After extraction, show me the key brand elements: primary colors, fonts, logo detection, and quality score. If quality is low, suggest what to do next.`,
          },
        },
      ],
    }),
  );

  // --- Check content against brand ---
  server.prompt(
    "check-brand",
    "Check text, colors, or fonts against the compiled brand identity. Fast inline gate for brand compliance.",
    {
      content: z.string().describe("Text, hex color, font name, or CSS to check"),
    },
    ({ content }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Check this against my brand identity using brand_check: "${content}". If it's a hex color, check it as a color. If it looks like CSS, check it as CSS. If it's a font name, check as font. Otherwise check as text. Show me pass/fail and any fixes needed.`,
          },
        },
      ],
    }),
  );

  // --- Generate on-brand content ---
  server.prompt(
    "write-on-brand",
    "Load brand context and generate on-brand content. Uses brand_write to load voice, tone, vocabulary, and anti-patterns before writing.",
    {
      content_type: z
        .string()
        .describe('Type of content: "general", "headline", "social", "email", "landing_page"'),
      brief: z.string().describe("What the content should say or accomplish"),
    },
    ({ content_type, brief }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `I need to write ${content_type} content. Here's the brief: ${brief}\n\nFirst, run brand_write with content_type="${content_type}" to load my brand context (voice, tone, vocabulary, anti-patterns). Then write the content following the brand guidelines. After writing, run brand_check on the output text to verify compliance.`,
          },
        },
      ],
    }),
  );

  // --- Brand status overview ---
  server.prompt(
    "brand-overview",
    "Get a complete overview of the current brand identity — what's extracted, what's missing, and what to do next.",
    () => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: "Run brand_status to show me the full state of my brand identity. Tell me what sessions are complete, what's missing, what the readiness level is, and what I should do next to strengthen the brand. If connected to Brandcode Studio, also run brand_brandcode_status.",
          },
        },
      ],
    }),
  );
}
