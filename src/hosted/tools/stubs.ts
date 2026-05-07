/**
 * Stub registrations for hosted tools whose full implementations land
 * after the sprint gate. Each stub:
 *   - uses the final description from the Phase 0 lock
 *   - returns a structured "not_implemented_in_staging" response
 *   - keeps the tool list at 8 so clients can probe the full surface now
 *
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { buildResponse, safeParseParams } from "../../lib/response.js";
import { enforceToolScope } from "../scope.js";
import type { HostedBrandContext } from "../types.js";

type StubReason = "not_implemented_in_staging";

function stubResponse(tool: string, slug: string, note: string) {
  return buildResponse({
    what_happened: `${tool} is not yet wired in Phase 1 staging`,
    next_steps: [note],
    data: {
      error: "not_implemented_in_staging" as StubReason,
      tool,
      slug,
      phase: "phase_1_staging_prototype",
    },
  });
}

export function registerFeedbackStub(
  server: McpServer,
  context: HostedBrandContext,
) {
  const shape = {
    kind: z
      .enum(["observation", "proposal"])
      .default("observation")
      .describe(
        "'observation' logs a note. 'proposal' adds to the governance review queue.",
      ),
    summary: z.string().describe("One-line summary of the feedback."),
    detail: z.string().optional().describe("Optional longer context."),
  };
  const schema = z.object(shape);
  server.tool(
    "brand_feedback",
    "Append an observation or proposal to the governance review queue for the connected hosted brand. Append-only. Phase 1 staging: stub.",
    shape,
    async (args) => {
      const scopeError = enforceToolScope("brand_feedback", context);
      if (scopeError) return scopeError;

      const parsed = safeParseParams(schema, args);
      if (!parsed.success) return parsed.response;
      return stubResponse(
        "brand_feedback",
        context.slug,
        "Feedback append lands once the UCS governance queue endpoint is wired",
      );
    },
  );
}

export function registerHistoryStub(
  server: McpServer,
  context: HostedBrandContext,
) {
  const shape = {
    limit: z.number().int().min(1).max(100).default(25).describe("Page size."),
    cursor: z.string().optional().describe("Pagination cursor."),
  };
  const schema = z.object(shape);
  server.tool(
    "brand_history",
    "Return recent MCP runs scoped by this API key and brand permissions. Read-only. Phase 1 staging: stub.",
    shape,
    async (args) => {
      const scopeError = enforceToolScope("brand_history", context);
      if (scopeError) return scopeError;

      const parsed = safeParseParams(schema, args);
      if (!parsed.success) return parsed.response;
      return stubResponse(
        "brand_history",
        context.slug,
        "Run history lands after UCS exposes a GET endpoint over AgentRunRecord",
      );
    },
  );
}
