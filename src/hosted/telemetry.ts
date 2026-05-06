/**
 * Hosted MCP AgentRun telemetry is explicitly deferred.
 *
 * UCS history POST expects `{ entry: AgentRunHistoryEntry }`; the scaffold
 * must not send a flat payload and claim AgentRun observability. Milestone D
 * owns wiring the real contract for ok, stub, auth, upstream, and tool-error
 * outcomes. Until then, this helper is a no-op that never writes history.
 */
import type { BrandcodeMcpAuthInfo } from "./types.js";

export const HOSTED_AGENT_RUN_TELEMETRY_STATUS =
  "deferred_until_ucs_history_entry_contract";

export interface AgentRunRecordInput {
  ucsBaseUrl: string;
  ucsServiceToken: string;
  slug: string;
  tool: string;
  outcome: "ok" | "auth_error" | "upstream_error" | "tool_error" | "stub";
  latencyMs: number;
  auth: BrandcodeMcpAuthInfo;
  requestId: string;
  errorMessage?: string;
}

export async function emitAgentRunRecord(
  _input: AgentRunRecordInput,
): Promise<void> {
  return;
}
