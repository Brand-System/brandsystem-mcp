import { buildResponse } from "../lib/response.js";
import {
  TOOL_SCOPE_REQUIREMENTS,
  toolHasScope,
} from "./auth.js";
import type { HostedBrandContext } from "./types.js";

export function scopeDeniedResponse(
  tool: string,
  context: HostedBrandContext,
) {
  const requiredScope = TOOL_SCOPE_REQUIREMENTS[tool];
  return buildResponse({
    what_happened: `${tool} was blocked because this key lacks the required scope`,
    next_steps: [
      requiredScope
        ? `Use a Brandcode MCP key with \`${requiredScope}\` scope for ${tool}`
        : "Use a registered Brandcode MCP hosted tool",
    ],
    data: {
      error: "insufficient_scope",
      status: 403,
      tool,
      slug: context.slug,
      required_scope: requiredScope ?? null,
      granted_scopes: context.auth.scopes,
    },
  });
}

export function enforceToolScope(
  tool: string,
  context: HostedBrandContext,
) {
  if (toolHasScope(tool, context.auth.scopes)) return null;
  return scopeDeniedResponse(tool, context);
}
