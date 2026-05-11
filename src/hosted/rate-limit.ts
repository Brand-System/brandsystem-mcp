import type {
  BrandcodeMcpAuthInfo,
  HostedRateLimitOptions,
  HostedRateLimitSnapshot,
  HostedRateLimitStore,
} from "./types.js";

const DEFAULT_MAX_REQUESTS = 60;
const DEFAULT_WINDOW_MS = 60_000;
const MAX_REQUESTS_ENV = "BRANDCODE_MCP_RATE_LIMIT_REQUESTS_PER_WINDOW";
const WINDOW_SECONDS_ENV = "BRANDCODE_MCP_RATE_LIMIT_WINDOW_SECONDS";
const DISABLED_ENV = "BRANDCODE_MCP_RATE_LIMIT_DISABLED";
const PRE_RELEASE_OPS_OWNER =
  "Jason Lankow / Brandcode Studio Ops <jlankow@columnfive.com>";

const defaultStore: HostedRateLimitStore = {
  buckets: new Map(),
};

export interface HostedRateLimitResult {
  allowed: boolean;
  snapshot: HostedRateLimitSnapshot;
}

interface ResolvedRateLimitOptions {
  enabled: boolean;
  maxRequests: number;
  windowMs: number;
  now: () => number;
  store: HostedRateLimitStore;
  source: string;
}

function positiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.floor(parsed);
}

function resolveOptions(
  options: HostedRateLimitOptions | false | undefined,
): ResolvedRateLimitOptions {
  if (options === false) {
    return {
      enabled: false,
      maxRequests: DEFAULT_MAX_REQUESTS,
      windowMs: DEFAULT_WINDOW_MS,
      now: Date.now,
      store: defaultStore,
      source: "router option disabled",
    };
  }

  const envDisabled = process.env[DISABLED_ENV] === "1";
  const maxRequests = positiveInt(
    process.env[MAX_REQUESTS_ENV],
    DEFAULT_MAX_REQUESTS,
  );
  const windowSeconds = positiveInt(
    process.env[WINDOW_SECONDS_ENV],
    DEFAULT_WINDOW_MS / 1000,
  );

  return {
    enabled: options?.enabled ?? !envDisabled,
    maxRequests: options?.maxRequests ?? maxRequests,
    windowMs: options?.windowMs ?? windowSeconds * 1000,
    now: options?.now ?? Date.now,
    store: options?.store ?? defaultStore,
    source:
      options?.source ??
      `${MAX_REQUESTS_ENV}/${WINDOW_SECONDS_ENV}${
        envDisabled ? ` (${DISABLED_ENV}=1)` : ""
      }`,
  };
}

export function createMemoryRateLimitStore(): HostedRateLimitStore {
  return {
    buckets: new Map(),
  };
}

function disabledSnapshot(source: string): HostedRateLimitSnapshot {
  return {
    status: "disabled",
    enforced: false,
    enforcement: "none",
    scope: "per_key_per_brand",
    limit: null,
    remaining: null,
    window_ms: null,
    reset_at: null,
    retry_after_seconds: null,
    release_gate: "blocked",
    blocker_owner: PRE_RELEASE_OPS_OWNER,
    required_before_public_release:
      "Implement durable shared hosted rate-limit enforcement before broad public release; pre-release abuse response owner is Jason Lankow / Brandcode Studio Ops <jlankow@columnfive.com>",
    source,
  };
}

function activeSnapshot(input: {
  limit: number;
  remaining: number;
  windowMs: number;
  resetAt: number;
  retryAfterSeconds: number | null;
  source: string;
}): HostedRateLimitSnapshot {
  return {
    status: "active_pre_release_in_process",
    enforced: true,
    enforcement: "in_process_fixed_window",
    scope: "per_key_per_brand",
    limit: input.limit,
    remaining: input.remaining,
    window_ms: input.windowMs,
    reset_at: new Date(input.resetAt).toISOString(),
    retry_after_seconds: input.retryAfterSeconds,
    release_gate: "blocked",
    blocker_owner: PRE_RELEASE_OPS_OWNER,
    required_before_public_release:
      "Replace in-process pre-release enforcement with durable shared hosted rate-limit enforcement before broad public release",
    source: input.source,
  };
}

export function checkHostedRateLimit(input: {
  slug: string;
  auth: BrandcodeMcpAuthInfo;
  options?: HostedRateLimitOptions | false;
}): HostedRateLimitResult {
  const options = resolveOptions(input.options);
  if (!options.enabled) {
    return {
      allowed: true,
      snapshot: disabledSnapshot(options.source),
    };
  }

  const now = options.now();
  const key = [
    input.auth.environment,
    input.slug,
    input.auth.keyId,
  ].join(":");
  const existing = options.store.buckets.get(key);
  const windowExpired =
    !existing || now >= existing.windowStart + options.windowMs;
  const bucket = windowExpired
    ? { windowStart: now, count: 0 }
    : existing;

  bucket.count += 1;
  options.store.buckets.set(key, bucket);

  const resetAt = bucket.windowStart + options.windowMs;
  const remaining = Math.max(options.maxRequests - bucket.count, 0);
  const allowed = bucket.count <= options.maxRequests;
  return {
    allowed,
    snapshot: activeSnapshot({
      limit: options.maxRequests,
      remaining,
      windowMs: options.windowMs,
      resetAt,
      retryAfterSeconds: allowed
        ? null
        : Math.max(1, Math.ceil((resetAt - now) / 1000)),
      source: options.source,
    }),
  };
}

export function hostedRateLimitHeaders(
  snapshot: HostedRateLimitSnapshot,
): HeadersInit {
  if (!snapshot.enforced) return {};
  const headers: Record<string, string> = {
    "x-ratelimit-limit": String(snapshot.limit),
    "x-ratelimit-remaining": String(snapshot.remaining),
  };
  if (snapshot.reset_at) {
    headers["x-ratelimit-reset"] = String(
      Math.ceil(new Date(snapshot.reset_at).getTime() / 1000),
    );
  }
  if (snapshot.retry_after_seconds) {
    headers["retry-after"] = String(snapshot.retry_after_seconds);
  }
  return headers;
}
