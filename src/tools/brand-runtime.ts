import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BrandDir } from "../lib/brand-dir.js";
import { buildResponse, safeParseParams } from "../lib/response.js";
import { ERROR_CODES } from "../types/index.js";

const paramsShape = {
  slice: z
    .enum(["full", "visual", "voice", "minimal"])
    .default("full")
    .describe(
      "Which slice of the runtime to return. 'full': everything (~1200 tokens). " +
      "'visual': colors, typography, logo, anti-patterns, composition (~200 tokens). " +
      "'voice': tone, vocabulary, never-say, perspective (~400 tokens). " +
      "'minimal': primary color, heading font, logo reference only (~100 tokens). " +
      "Use slices to reduce prompt size when handing off to sub-agents that only need part of the brand."
    ),
};

const ParamsSchema = z.object(paramsShape);
type Params = z.infer<typeof ParamsSchema>;

function sliceRuntime(runtime: Record<string, unknown>, slice: Params["slice"]): Record<string, unknown> {
  if (slice === "full") return runtime;

  const base = {
    version: runtime.version,
    client_name: runtime.client_name,
    compiled_at: runtime.compiled_at,
    slice_type: slice,
  };

  if (slice === "minimal") {
    const identity = runtime.identity as Record<string, unknown> | undefined;
    return {
      ...base,
      identity: identity ? {
        colors: identity.colors ? Object.fromEntries(
          Object.entries(identity.colors as Record<string, string>).filter(([k]) => k === "primary")
        ) : {},
        typography: identity.typography ? Object.fromEntries(
          Object.entries(identity.typography as Record<string, string>).slice(0, 1)
        ) : {},
        logo: identity.logo,
      } : null,
    };
  }

  if (slice === "visual") {
    return {
      ...base,
      identity: runtime.identity,
      visual: runtime.visual,
    };
  }

  if (slice === "voice") {
    return {
      ...base,
      voice: runtime.voice,
      strategy: runtime.strategy,
    };
  }

  return runtime;
}

async function handler(input: Params) {
  const brandDir = new BrandDir(process.cwd());

  if (!(await brandDir.exists())) {
    return buildResponse({
      what_happened: "No .brand/ directory found",
      next_steps: ["Run brand_start to create a brand system first"],
      data: { error: ERROR_CODES.NOT_INITIALIZED },
    });
  }

  if (!(await brandDir.hasRuntime())) {
    return buildResponse({
      what_happened: "No brand-runtime.json found — run brand_compile first",
      next_steps: [
        "Run brand_compile to generate the runtime contract",
        "The runtime is automatically compiled from your brand data each time you compile",
      ],
      data: { error: ERROR_CODES.NOT_COMPILED },
    });
  }

  const runtime = await brandDir.readRuntime();
  const sliced = sliceRuntime(runtime as Record<string, unknown>, input.slice);

  const sliceLabel = input.slice === "full" ? "full runtime" : `${input.slice} slice`;
  const estimatedTokens = input.slice === "full" ? "~1200" : input.slice === "visual" ? "~200" : input.slice === "voice" ? "~400" : "~100";

  return buildResponse({
    what_happened: `Loaded brand ${sliceLabel} (${estimatedTokens} tokens)`,
    next_steps: [
      "Inject this into your sub-agent's prompt as brand context",
      ...(input.slice !== "full" ? [`For the complete runtime, use slice='full'. Current slice: ${input.slice}`] : []),
      "Run brand_compile to refresh after making changes",
    ],
    data: {
      runtime: sliced,
      agent_tip: input.slice === "full"
        ? "For sub-agents that only need colors/fonts, use slice='visual' (~200 tokens). For copy tasks, use slice='voice' (~400 tokens). Smaller slices reduce satisficing."
        : `This is the ${input.slice} slice. The full runtime has more context but costs more tokens.`,
    },
  });
}

export function register(server: McpServer) {
  server.tool(
    "brand_runtime",
    "Read the compiled brand runtime contract (brand-runtime.json). Returns the brand system that AI agents load as context for on-brand output. Supports slicing: 'full' (~1200 tokens, everything), 'visual' (~200 tokens, colors + fonts + anti-patterns), 'voice' (~400 tokens, tone + vocabulary + perspective), 'minimal' (~100 tokens, primary color + heading font). Use slices when passing brand context to sub-agents — smaller context reduces token cost and agent satisficing. Read-only. Run brand_compile to refresh.",
    paramsShape,
    async (args) => {
      const parsed = safeParseParams(ParamsSchema, args);
      if (!parsed.success) return parsed.response;
      return handler(parsed.data);
    },
  );
}
