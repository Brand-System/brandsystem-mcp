/**
 * Hosted `brand_runtime` tool — Phase 1 sprint-gate implementation.
 *
 * Resolves the slug from context, pulls the hosted brand package via the
 * service-token fetcher, and returns a runtime slice. Shares the slicing
 * logic with the local stdio tool (see src/tools/brand-runtime.ts) but the
 * data source is always UCS here; no local `.brand/` reads.
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { buildResponse, safeParseParams } from "../../lib/response.js";
import { ERROR_CODES } from "../../types/index.js";
import type { BrandPackagePayload } from "../../connectors/brandcode/types.js";
import type { HostedBrandContext } from "../types.js";

const paramsShape = {
  slice: z
    .enum(["full", "visual", "voice", "minimal"])
    .default("full")
    .describe(
      "Which slice of the runtime to return. 'full' (~1200 tokens), 'visual' (~200), 'voice' (~400), 'minimal' (~100). Use slices to trim sub-agent context.",
    ),
};

const ParamsSchema = z.object(paramsShape);
type Params = z.infer<typeof ParamsSchema>;

/**
 * Recognized hosted-package shapes (order matters — first match wins):
 *
 *   1. `pkg.runtime`                     — pre-compiled runtime at top level
 *   2. `pkg.brandInstance.runtime`       — legacy nested runtime
 *   3. `pkg.brandInstance.{tokens,fonts,assets,...}` — current flat shape;
 *                                          normalize into a runtime-like object
 *   4. `pkg.identity`                    — package IS a runtime
 *
 * G-5h: the flat brandInstance shape is the one UCS actually serves today.
 * Keeping the older shapes lets clients upgrade without UCS changes.
 */
function extractRuntime(
  pkg: BrandPackagePayload | null,
): Record<string, unknown> | null {
  if (!pkg) return null;
  const record = pkg as Record<string, unknown>;
  if (record.runtime && typeof record.runtime === "object") {
    return record.runtime as Record<string, unknown>;
  }
  const instance = record.brandInstance as Record<string, unknown> | undefined;
  if (instance) {
    if (instance.runtime && typeof instance.runtime === "object") {
      return instance.runtime as Record<string, unknown>;
    }
    if (
      isRecord(instance.tokens) ||
      isRecord(instance.fonts) ||
      Array.isArray(instance.assets)
    ) {
      return normalizeBrandInstance(record, instance);
    }
  }
  if (record.identity && typeof record.identity === "object") {
    return record;
  }
  return null;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function pickString(...candidates: unknown[]): string {
  for (const c of candidates) {
    if (typeof c === "string" && c.length > 0) return c;
  }
  return "";
}

/**
 * Build a runtime-shaped object from the flat brandInstance UCS serves today.
 *
 * Sources consulted:
 *   - identity.colors     ← brandInstance.tokens.colors (role → hex)
 *   - identity.typography ← brandInstance.fonts.roles (preferred) or
 *                           brandInstance.tokens.typography.fontFamily
 *   - identity.logo       ← first logo-tagged entry in brandInstance.assets
 *   - version             ← pkg.runtimeVersion or manifest.brandcodeVersion
 *   - client_name         ← manifest.name, tokens.brandName, or slug
 *
 * visual/voice/strategy stay null until richer mappings land alongside the
 * real brand_check / brand_search implementations in Milestone B.
 */
function normalizeBrandInstance(
  pkg: Record<string, unknown>,
  instance: Record<string, unknown>,
): Record<string, unknown> {
  const tokens = instance.tokens as Record<string, unknown> | undefined;
  const fonts = instance.fonts as Record<string, unknown> | undefined;
  const assets = instance.assets as unknown[] | undefined;
  const manifest = instance.manifest as Record<string, unknown> | undefined;

  const colors =
    (tokens?.colors as Record<string, string> | undefined) ?? {};
  const typography = pickTypography(fonts, tokens);
  const logo = pickLogo(assets);

  return {
    version: pickString(
      pkg.runtimeVersion,
      manifest?.brandcodeVersion,
      manifest?.version,
      "hosted",
    ),
    client_name: pickString(
      manifest?.name,
      tokens?.brandName,
      pkg.slug,
      "hosted brand",
    ),
    compiled_at: new Date().toISOString(),
    sessions_completed: 0,
    identity: {
      colors,
      typography,
      logo,
    },
    visual: null,
    voice: null,
    strategy: null,
  };
}

function pickTypography(
  fonts: Record<string, unknown> | undefined,
  tokens: Record<string, unknown> | undefined,
): Record<string, string> {
  const out: Record<string, string> = {};
  const roles = fonts?.roles as
    | Record<string, Record<string, unknown>>
    | undefined;
  if (roles) {
    // Canonical order — display first so minimal slice picks it as "heading".
    const order = ["display", "heading", "body", "mono"];
    for (const role of order) {
      const fam = roles[role]?.fontFamily;
      if (typeof fam === "string" && fam.length > 0) out[role] = fam;
    }
    for (const [role, spec] of Object.entries(roles)) {
      if (order.includes(role)) continue;
      const fam = (spec as Record<string, unknown> | undefined)?.fontFamily;
      if (typeof fam === "string" && fam.length > 0) out[role] = fam;
    }
    if (Object.keys(out).length > 0) return out;
  }
  const tokenTypo = tokens?.typography as Record<string, unknown> | undefined;
  const family = tokenTypo?.fontFamily;
  if (typeof family === "string" && family.length > 0) {
    out.default = family;
  }
  return out;
}

function pickLogo(
  assets: unknown[] | undefined,
): { type: string; has_svg: boolean } | null {
  if (!assets || assets.length === 0) return null;
  for (const asset of assets) {
    if (!asset || typeof asset !== "object") continue;
    const a = asset as Record<string, unknown>;
    const kind =
      (typeof a.kind === "string" && a.kind) ||
      (typeof a.type === "string" && a.type) ||
      (typeof a.role === "string" && a.role) ||
      "";
    if (!/logo/i.test(kind)) continue;
    const format =
      (typeof a.format === "string" && a.format) ||
      (typeof a.contentType === "string" && a.contentType) ||
      "";
    return {
      type: kind,
      has_svg: /svg/i.test(format),
    };
  }
  return null;
}

function sliceRuntime(
  runtime: Record<string, unknown>,
  slice: Params["slice"],
): Record<string, unknown> {
  if (slice === "full") return runtime;
  const base = {
    version: runtime.version,
    client_name: runtime.client_name,
    compiled_at: runtime.compiled_at,
    slice_type: slice,
  };
  const identity = runtime.identity as Record<string, unknown> | undefined;
  if (slice === "minimal") {
    return {
      ...base,
      identity: identity
        ? {
            colors: identity.colors
              ? Object.fromEntries(
                  Object.entries(identity.colors as Record<string, string>).filter(
                    ([k]) => k === "primary",
                  ),
                )
              : {},
            typography: identity.typography
              ? Object.fromEntries(
                  Object.entries(
                    identity.typography as Record<string, string>,
                  ).slice(0, 1),
                )
              : {},
            logo: identity.logo,
          }
        : null,
    };
  }
  if (slice === "visual") {
    return { ...base, identity, visual: runtime.visual };
  }
  if (slice === "voice") {
    return { ...base, voice: runtime.voice, strategy: runtime.strategy };
  }
  return runtime;
}

export function registerRuntime(
  server: McpServer,
  context: HostedBrandContext,
) {
  server.tool(
    "brand_runtime",
    "Fetch the live governed brand runtime for the connected hosted brand. Returns a compiled runtime contract (identity, visual rules, voice constraints, content strategy) suitable for injection into any sub-agent. Supports slicing: full/visual/voice/minimal. Read-only. Always reflects current Brand Console state — no local cache.",
    paramsShape,
    async (args) => {
      const parsed = safeParseParams(ParamsSchema, args);
      if (!parsed.success) return parsed.response;

      let pkg: BrandPackagePayload | null;
      try {
        pkg = await context.loadBrandPackage();
      } catch (err) {
        return buildResponse({
          what_happened: `Failed to load hosted brand "${context.slug}": ${(err as Error).message}`,
          next_steps: [
            "Retry in a moment — the hosted brand service may be temporarily unavailable",
          ],
          data: { error: ERROR_CODES.FETCH_FAILED, slug: context.slug },
        });
      }

      const runtime = extractRuntime(pkg);
      if (!runtime) {
        return buildResponse({
          what_happened: `No compiled runtime available for "${context.slug}" yet`,
          next_steps: [
            "Run brand_compile via @brandsystem/mcp against the hosted brand",
            "Or edit the brand in Brand Console to trigger a runtime compile",
          ],
          data: {
            error: ERROR_CODES.NOT_COMPILED,
            slug: context.slug,
          },
        });
      }

      const sliced = sliceRuntime(runtime, parsed.data.slice);
      const estimatedTokens =
        parsed.data.slice === "full"
          ? "~1200"
          : parsed.data.slice === "visual"
            ? "~200"
            : parsed.data.slice === "voice"
              ? "~400"
              : "~100";

      return buildResponse({
        what_happened: `Loaded live runtime for "${context.slug}" — ${parsed.data.slice} slice (${estimatedTokens} tokens)`,
        next_steps: [
          "Inject this into your sub-agent's prompt as brand context",
          parsed.data.slice === "full"
            ? "Use slice='visual' or 'voice' for smaller hand-offs"
            : "Use slice='full' for complete context",
        ],
        data: {
          runtime: sliced,
          runtime_origin: "hosted",
          slug: context.slug,
          environment: context.auth.environment,
        },
      });
    },
  );
}
