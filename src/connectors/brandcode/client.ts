/**
 * HTTP client for the Brandcode Studio hosted brand API.
 */

import type {
  ResolvedHostedBrand,
  ConnectArtifact,
  PullResult,
  HostedBrandDetailResponse,
  HostedBrandFeedResponse,
  MagicLinkResponse,
  VerifyResponse,
  SaveBrandResponse,
  DeviceCodeResponse,
  DeviceCodePollResponse,
} from "./types.js";

const USER_AGENT = "brandsystem-mcp";
const TIMEOUT_MS = 30_000;

export class BrandcodeClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public body: string,
  ) {
    super(message);
    this.name = "BrandcodeClientError";
  }
}

interface FetchOptions {
  shareToken?: string;
  authToken?: string;
}

interface RequestInit {
  method?: string;
  body?: string;
  contentType?: string;
}

async function request<T>(url: string, opts?: FetchOptions, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    accept: "application/json",
    "user-agent": USER_AGENT,
  };
  if (opts?.shareToken) {
    headers["x-brand-share-token"] = opts.shareToken;
  }
  if (opts?.authToken) {
    headers["authorization"] = `Bearer ${opts.authToken}`;
  }
  if (init?.contentType) {
    headers["content-type"] = init.contentType;
  }

  const res = await fetch(url, {
    method: init?.method ?? "GET",
    headers,
    body: init?.body,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new BrandcodeClientError(
      `Brandcode API ${res.status}: ${res.statusText}`,
      res.status,
      body,
    );
  }

  return (await res.json()) as T;
}

/**
 * List all publicly listed hosted brands.
 */
export async function fetchHostedBrandList(
  baseUrl: string,
): Promise<HostedBrandFeedResponse> {
  return request<HostedBrandFeedResponse>(
    `${baseUrl}/api/brand/hosted`,
  );
}

/**
 * Fetch details for a single hosted brand.
 */
export async function fetchHostedBrandDetails(
  resolved: ResolvedHostedBrand,
  opts?: FetchOptions,
): Promise<HostedBrandDetailResponse> {
  return request<HostedBrandDetailResponse>(resolved.detailUrl, opts);
}

/**
 * Fetch the connect artifact (sync strategy, URLs, token transport).
 */
export async function fetchHostedBrandConnect(
  resolved: ResolvedHostedBrand,
  opts?: FetchOptions,
): Promise<ConnectArtifact> {
  return request<ConnectArtifact>(resolved.connectUrl, opts);
}

/**
 * Pull a hosted brand. Pass syncToken to enable delta-aware no-op.
 */
export async function pullHostedBrand(
  resolved: ResolvedHostedBrand,
  syncToken?: string,
  opts?: FetchOptions,
): Promise<PullResult> {
  let url = resolved.pullUrl;
  if (syncToken) {
    url += `?syncToken=${encodeURIComponent(syncToken)}`;
  }
  return request<PullResult>(url, opts);
}

// ---------------------------------------------------------------------------
// Auth endpoints
// ---------------------------------------------------------------------------

/**
 * Request a magic link email for the given email address.
 */
export async function requestMagicLink(
  baseUrl: string,
  email: string,
): Promise<MagicLinkResponse> {
  return request<MagicLinkResponse>(
    `${baseUrl}/api/auth/magic-link`,
    undefined,
    {
      method: "POST",
      body: JSON.stringify({ email }),
      contentType: "application/json",
    },
  );
}

/**
 * Verify a magic link token and receive a session JWT.
 */
export async function verifyMagicLink(
  baseUrl: string,
  token: string,
): Promise<VerifyResponse> {
  return request<VerifyResponse>(
    `${baseUrl}/api/auth/verify?token=${encodeURIComponent(token)}`,
  );
}

// ---------------------------------------------------------------------------
// Brand save/push endpoints
// ---------------------------------------------------------------------------

/**
 * Save a brand package to Studio (create or update).
 * Requires auth token.
 */
export async function saveBrandToStudio(
  baseUrl: string,
  payload: Record<string, unknown>,
  authToken: string,
): Promise<SaveBrandResponse> {
  return request<SaveBrandResponse>(
    `${baseUrl}/api/brand/save`,
    { authToken },
    {
      method: "POST",
      body: JSON.stringify(payload),
      contentType: "application/json",
    },
  );
}

// ---------------------------------------------------------------------------
// Device code auth endpoints
// ---------------------------------------------------------------------------

/**
 * Request a device code for agent-first authentication.
 */
export async function requestDeviceCode(
  baseUrl: string,
  email: string,
): Promise<DeviceCodeResponse> {
  return request<DeviceCodeResponse>(
    `${baseUrl}/api/auth/device-code`,
    undefined,
    {
      method: "POST",
      body: JSON.stringify({ email }),
      contentType: "application/json",
    },
  );
}

/**
 * Poll for device code completion. Returns the session JWT when approved.
 */
export async function pollDeviceCode(
  baseUrl: string,
  code: string,
): Promise<DeviceCodePollResponse> {
  return request<DeviceCodePollResponse>(
    `${baseUrl}/api/auth/device-code/poll?code=${encodeURIComponent(code)}`,
  );
}
