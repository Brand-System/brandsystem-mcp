/**
 * Shared types for the hosted Brandcode MCP surface (S009 G-5b Phase 1).
 */
import type { BrandPackagePayload } from "../connectors/brandcode/types.js";

export type BrandcodeMcpScope = "read" | "check" | "feedback";

export interface BrandcodeMcpAuthInfo {
  /** Full bearer token (redact in logs). */
  token: string;
  /** Per-brand API key id — stable prefix, no secret. */
  keyId: string;
  /** Scope bundles granted to this key. */
  scopes: BrandcodeMcpScope[];
  /** Brand slugs this key is authorized to access. */
  allowedSlugs: string[];
  /** Environment the key belongs to. Drives URL resolution + token prefix. */
  environment: "staging" | "production";
}

export interface HostedBrandContext {
  /** Brand slug resolved from the URL path. */
  slug: string;
  /** Validated auth info scoped to this request. */
  auth: BrandcodeMcpAuthInfo;
  /** Lazy getter for the hosted brand package. Cached per-request. */
  loadBrandPackage: () => Promise<BrandPackagePayload | null>;
  /** Origin UCS API base — typically https://www.brandcode.studio. */
  ucsBaseUrl: string;
  /** Service token the hosted MCP uses to authenticate with UCS. */
  ucsServiceToken: string;
  /** Rate-limit posture observed at the hosted HTTP boundary. */
  rateLimit?: HostedRateLimitSnapshot;
}

export interface ToolDispatchMeta {
  /** Monotonic request identifier — passed through to AgentRunRecord. */
  requestId: string;
  /** ms-epoch of request start. */
  startedAt: number;
}

export interface HostedRuntimeOptions {
  /** UCS origin. Defaults to https://www.brandcode.studio. */
  ucsBaseUrl?: string;
  /** Service token for hosted→UCS calls. Must match UCS BRANDCODE_MCP_SERVICE_TOKEN. */
  ucsServiceToken: string;
  /** Environment. Controls which bearer prefix is accepted (bck_test_ vs bck_live_). */
  environment?: "staging" | "production";
  /** Optional token validator override (tests inject a stub). */
  validateToken?: (token: string) => Promise<BrandcodeMcpAuthInfo | null>;
  /** Optional hosted rate-limit override (tests inject a deterministic store). */
  rateLimit?: HostedRateLimitOptions | false;
}

export interface HostedRateLimitOptions {
  /** Enable or disable enforcement. Defaults to enabled. */
  enabled?: boolean;
  /** Maximum authenticated requests in each fixed window. */
  maxRequests?: number;
  /** Fixed-window duration in milliseconds. */
  windowMs?: number;
  /** Deterministic clock for tests. */
  now?: () => number;
  /** Deterministic in-memory store for tests. */
  store?: HostedRateLimitStore;
  /** Human-readable config source. */
  source?: string;
}

export interface HostedRateLimitStore {
  buckets: Map<string, HostedRateLimitBucket>;
}

export interface HostedRateLimitBucket {
  windowStart: number;
  count: number;
}

export interface HostedRateLimitSnapshot {
  status: "active_pre_release_in_process" | "disabled";
  enforced: boolean;
  enforcement: "in_process_fixed_window" | "none";
  scope: "per_key_per_brand";
  limit: number | null;
  remaining: number | null;
  window_ms: number | null;
  reset_at: string | null;
  retry_after_seconds: number | null;
  release_gate: "blocked";
  blocker_owner: string;
  required_before_public_release: string;
  source: string;
}
