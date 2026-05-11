import { Redis } from "@upstash/redis";
import type {
  BrandcodeMcpAuthInfo,
  HostedRateLimitOptions,
  HostedRateLimitSnapshot,
  HostedRateLimitStore,
  HostedRateLimitStoreInput,
  HostedRateLimitStoreResult,
} from "./types.js";

const DEFAULT_MAX_REQUESTS = 60;
const DEFAULT_WINDOW_MS = 60_000;
const MAX_REQUESTS_ENV = "BRANDCODE_MCP_RATE_LIMIT_REQUESTS_PER_WINDOW";
const WINDOW_SECONDS_ENV = "BRANDCODE_MCP_RATE_LIMIT_WINDOW_SECONDS";
const DISABLED_ENV = "BRANDCODE_MCP_RATE_LIMIT_DISABLED";
const REDIS_URL_ENV = "BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_URL";
const REDIS_TOKEN_ENV = "BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_TOKEN";
const UPSTASH_URL_ENV = "UPSTASH_REDIS_REST_URL";
const UPSTASH_TOKEN_ENV = "UPSTASH_REDIS_REST_TOKEN";
const KV_URL_ENV = "KV_REST_API_URL";
const KV_TOKEN_ENV = "KV_REST_API_TOKEN";
const PRE_RELEASE_OPS_OWNER =
  "Jason Lankow / Brandcode Studio Ops <jlankow@columnfive.com>";

const REDIS_FIXED_WINDOW_SCRIPT = `
local current = redis.call("INCR", KEYS[1])
if current == 1 then
  redis.call("PEXPIRE", KEYS[1], ARGV[1])
end
local ttl = redis.call("PTTL", KEYS[1])
if ttl < 0 then
  redis.call("PEXPIRE", KEYS[1], ARGV[1])
  ttl = tonumber(ARGV[1])
end
return { current, ttl }
`;

export interface HostedRateLimitResult {
  allowed: boolean;
  snapshot: HostedRateLimitSnapshot;
  error?: "rate_limit_store_unavailable";
}

interface ResolvedRateLimitOptions {
  enabled: boolean;
  maxRequests: number;
  windowMs: number;
  now: () => number;
  store: HostedRateLimitStore;
  source: string;
}

let defaultMemoryStore: HostedRateLimitStore | null = null;
let defaultRedisStore: HostedRateLimitStore | null = null;

function positiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.floor(parsed);
}

function readRedisConfig(env: Record<string, string | undefined>) {
  const customUrl = env[REDIS_URL_ENV]?.trim();
  const customToken = env[REDIS_TOKEN_ENV]?.trim();
  if (customUrl && customToken) {
    return {
      url: customUrl,
      token: customToken,
      source: `${REDIS_URL_ENV}/${REDIS_TOKEN_ENV}`,
    };
  }

  const upstashUrl = env[UPSTASH_URL_ENV]?.trim();
  const upstashToken = env[UPSTASH_TOKEN_ENV]?.trim();
  if (upstashUrl && upstashToken) {
    return {
      url: upstashUrl,
      token: upstashToken,
      source: `${UPSTASH_URL_ENV}/${UPSTASH_TOKEN_ENV}`,
    };
  }

  const kvUrl = env[KV_URL_ENV]?.trim();
  const kvToken = env[KV_TOKEN_ENV]?.trim();
  if (kvUrl && kvToken) {
    return {
      url: kvUrl,
      token: kvToken,
      source: `${KV_URL_ENV}/${KV_TOKEN_ENV}`,
    };
  }

  return null;
}

function encodeRateLimitKeyPart(value: string): string {
  return encodeURIComponent(value);
}

function rateLimitKey(input: {
  environment: string;
  slug: string;
  keyId: string;
}): string {
  return [
    "brandcode",
    "mcp",
    "rate-limit",
    encodeRateLimitKeyPart(input.environment),
    encodeRateLimitKeyPart(input.slug),
    encodeRateLimitKeyPart(input.keyId),
  ].join(":");
}

function createRedisRateLimitStore(input: {
  redis: Pick<Redis, "eval">;
  source: string;
}): HostedRateLimitStore {
  return {
    mode: "durable_shared",
    enforcement: "durable_shared_redis_fixed_window",
    source: `durable shared Redis REST (${input.source})`,
    async check(
      checkInput: HostedRateLimitStoreInput,
    ): Promise<HostedRateLimitStoreResult> {
      const result = await input.redis.eval<[string], [number, number]>(
        REDIS_FIXED_WINDOW_SCRIPT,
        [checkInput.key],
        [String(checkInput.windowMs)],
      );
      const [count, ttl] = Array.isArray(result) ? result : [0, 0];
      const ttlMs = Number.isFinite(Number(ttl))
        ? Math.max(0, Number(ttl))
        : checkInput.windowMs;
      return {
        count: Number(count),
        resetAt: checkInput.now + ttlMs,
      };
    },
  };
}

function defaultStore(): HostedRateLimitStore {
  const redisConfig = readRedisConfig(process.env);
  if (redisConfig) {
    defaultRedisStore ??= createRedisRateLimitStore({
      redis: new Redis({
        url: redisConfig.url,
        token: redisConfig.token,
      }),
      source: redisConfig.source,
    });
    return defaultRedisStore;
  }

  defaultMemoryStore ??= createMemoryRateLimitStore();
  return defaultMemoryStore;
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
      store: defaultStore(),
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
    store: options?.store ?? defaultStore(),
    source:
      options?.source ??
      `${MAX_REQUESTS_ENV}/${WINDOW_SECONDS_ENV}${
        envDisabled ? ` (${DISABLED_ENV}=1)` : ""
      }`,
  };
}

export function createMemoryRateLimitStore(): HostedRateLimitStore {
  const buckets = new Map<string, { windowStart: number; count: number }>();
  return {
    mode: "in_process",
    enforcement: "in_process_fixed_window",
    source: "in-process memory fallback",
    buckets,
    async check(
      input: HostedRateLimitStoreInput,
    ): Promise<HostedRateLimitStoreResult> {
      const existing = buckets.get(input.key);
      const windowExpired =
        !existing || input.now >= existing.windowStart + input.windowMs;
      const bucket = windowExpired
        ? { windowStart: input.now, count: 0 }
        : existing;

      bucket.count += 1;
      buckets.set(input.key, bucket);

      return {
        count: bucket.count,
        resetAt: bucket.windowStart + input.windowMs,
      };
    },
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
  store: HostedRateLimitStore;
}): HostedRateLimitSnapshot {
  const durable = input.store.mode === "durable_shared";
  return {
    status: durable
      ? "active_durable_shared"
      : "active_pre_release_in_process",
    enforced: true,
    enforcement: input.store.enforcement,
    scope: "per_key_per_brand",
    limit: input.limit,
    remaining: input.remaining,
    window_ms: input.windowMs,
    reset_at: new Date(input.resetAt).toISOString(),
    retry_after_seconds: input.retryAfterSeconds,
    release_gate: "blocked",
    blocker_owner: PRE_RELEASE_OPS_OWNER,
    required_before_public_release:
      durable
        ? "Capture command-backed hosted durable/shared rate-limit proof and Jason explicit release approval before broad public release"
        : "Replace in-process pre-release enforcement with durable shared hosted rate-limit enforcement before broad public release",
    source: `${input.source}; ${input.store.source}`,
  };
}

function unavailableSnapshot(input: {
  maxRequests: number;
  windowMs: number;
  source: string;
  store: HostedRateLimitStore;
}): HostedRateLimitSnapshot {
  return {
    status: "unavailable",
    enforced: false,
    enforcement: "durable_shared_unavailable",
    scope: "per_key_per_brand",
    limit: input.maxRequests,
    remaining: null,
    window_ms: input.windowMs,
    reset_at: null,
    retry_after_seconds: null,
    release_gate: "blocked",
    blocker_owner: PRE_RELEASE_OPS_OWNER,
    required_before_public_release:
      "Restore durable shared hosted rate-limit store availability before public release or broad hosted access",
    source: `${input.source}; ${input.store.source}`,
  };
}

export async function checkHostedRateLimit(input: {
  slug: string;
  auth: BrandcodeMcpAuthInfo;
  options?: HostedRateLimitOptions | false;
}): Promise<HostedRateLimitResult> {
  const options = resolveOptions(input.options);
  if (!options.enabled) {
    return {
      allowed: true,
      snapshot: disabledSnapshot(options.source),
    };
  }

  const now = options.now();
  const key = rateLimitKey({
    environment: input.auth.environment,
    slug: input.slug,
    keyId: input.auth.keyId,
  });

  let storeResult: HostedRateLimitStoreResult;
  try {
    storeResult = await options.store.check({
      key,
      maxRequests: options.maxRequests,
      windowMs: options.windowMs,
      now,
    });
  } catch {
    if (options.store.mode === "durable_shared") {
      return {
        allowed: false,
        error: "rate_limit_store_unavailable",
        snapshot: unavailableSnapshot({
          maxRequests: options.maxRequests,
          windowMs: options.windowMs,
          source: options.source,
          store: options.store,
        }),
      };
    }
    throw new Error("Hosted rate-limit store failed");
  }

  const remaining = Math.max(options.maxRequests - storeResult.count, 0);
  const allowed = storeResult.count <= options.maxRequests;
  return {
    allowed,
    snapshot: activeSnapshot({
      limit: options.maxRequests,
      remaining,
      windowMs: options.windowMs,
      resetAt: storeResult.resetAt,
      retryAfterSeconds: allowed
        ? null
        : Math.max(1, Math.ceil((storeResult.resetAt - now) / 1000)),
      source: options.source,
      store: options.store,
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
