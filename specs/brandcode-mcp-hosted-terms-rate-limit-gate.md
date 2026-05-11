# Brandcode MCP Hosted Terms And Rate-Limit Gate

**Status:** M001-L15 approved posture - release gate still blocked
**Date:** 2026-05-09
**Applies to:** hosted `@brandcode/mcp` Use MCP
**Release posture:** no public release, npm publish, package listing, MCP
directory submission, or public listing change until Jason explicitly approves.

## Executive Readout

The hosted Brandcode Use MCP is not blocked on the locked 8-tool surface. It is
blocked on hosted-service trust. Staging and two-client proof remain useful, but
they do not settle terms, privacy/retention, rate limits, abuse handling, or
the package/source posture for `@brandcode/mcp`.

The hosted-service posture is approved in
`specs/brandcode-mcp-hosted-service-terms-decision-brief.md`, but this gate is
still **not release-satisfied**. M001-L20 added an optional durable shared
Redis REST rate-limit store at the hosted HTTP router. The router now reports
durable/shared enforcement when the Redis env contract is configured, and falls
back to the prior in-process limiter only for local tests and pre-release
development when no shared store env is present. Treat rate-limit/abuse posture
as an explicit release blocker until both:

- `brand_status` reports active per-brand rate-limit enforcement with
  command-backed durable/shared enforcement evidence; and
- Jason explicitly approves the final public release path.

## Gate Matrix

| Area | Current status | Required before public release |
| --- | --- | --- |
| Bearer-key access terms | Blocked | Jason-approved hosted service terms covering API-key access, account/brand authorization, key handling, availability, and acceptable use. |
| Client-owned brand data | Blocked | Public terms/privacy language stating client-owned runtime data, brand assets, feedback, and history boundaries. |
| `brand_feedback` retention | Blocked | Retention/visibility policy for explicit append-only feedback written to UCS history. |
| `brand_history` visibility | Blocked | Retention/visibility policy for compact scoped run/receipt summaries, including who can view history through each key posture. |
| Private custody | Pass for current implementation, gated for launch language | Keep package-safe delivery only. Do not expose raw private provider URLs, private blob URLs, service-token data, or raw custody paths. |
| Abuse handling | Pre-release owner approved; public launch language blocked | Jason Lankow / Brandcode Studio Ops `<jlankow@columnfive.com>` owns pre-release abuse response and may revoke, rotate, suspend, or throttle keys. Public release still needs final support/security language. |
| Rate limits | Blocked | M001-L20 added optional durable shared Redis REST enforcement and `brand_status` reporting. Hosted Redis env/proof and Jason release approval are still required before broad public release. |
| "Free in v1" copy | Jason decision | Decide whether this is public pricing copy, private beta posture, or launch-deferred language. |
| `@brandcode/mcp` package/source | Jason decision | Decide MIT, proprietary, dual-positioned, or service-only posture before npm/package/listing work. |
| Directory metadata | Deferred | Author separate Brandcode Use metadata only after this gate is satisfied or explicitly approved with blocker language. |

## Approved Service-Terms Posture - 2026-05-10

Jason approved the recommended terms posture:

- approved-brand, bearer-key-only, pre-release hosted access;
- client-owned or client-controlled brand data;
- hosted runtime data used only to serve MCP tools and governance workflows;
- append-only `brand_feedback`, not canonical mutation;
- scoped, compact, redacted `brand_history`;
- package-safe asset delivery only, with no raw private/provider URL exposure;
- no public "free in v1" launch copy until pricing/limits are settled;
- package/source posture may likely inherit MIT if Jason approves, while hosted
  service access remains separate from source/license access.

This approval does not authorize release, npm publish, directory submission, or
public listing changes.

## Current Implementation Truth

- `brand_status.rate_limits.status` reports `active_durable_shared` when the
  hosted Redis REST store is configured, or
  `active_pre_release_in_process` when the in-process local/test fallback is
  used.
- `brand_status.rate_limits.release_gate` is `blocked`.
- `brand_status.rate_limits.blocker_owner` is
  `Jason Lankow / Brandcode Studio Ops <jlankow@columnfive.com>`.
- The durable limiter is a Redis REST fixed-window guard keyed by environment,
  brand slug, and key id. It uses
  `BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_URL` /
  `BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_TOKEN`, with support for standard
  `UPSTASH_REDIS_REST_*` and `KV_REST_API_*` env names.
- Defaults are 60 authenticated requests per 60 seconds and can be adjusted
  with `BRANDCODE_MCP_RATE_LIMIT_REQUESTS_PER_WINDOW` and
  `BRANDCODE_MCP_RATE_LIMIT_WINDOW_SECONDS`.
- The limiter returns `429 rate_limited`, `retry-after`, and `x-ratelimit-*`
  headers when exceeded.
- If the durable shared store is configured but unavailable, the hosted router
  fails closed with `503 rate_limit_unavailable` before MCP tool dispatch.
- Because hosted Redis env/proof has not been completed in this repo session,
  this is an implementation step, not a public release claim.
- Pre-release abuse response owner: Jason Lankow / Brandcode Studio Ops
  `<jlankow@columnfive.com>`.
- Pre-release authority: the owner may revoke, rotate, suspend, or throttle
  hosted Brandcode MCP API keys for abuse, leaked keys, excessive traffic,
  security risk, or service-stability risk.
- General hosted AgentRun telemetry remains deferred.
- `brand_feedback` is the only active write path and is append-only review
  input, not canonical governance mutation.
- `brand_history` is read-only and returns compact scoped summaries with URL
  redaction.
- Hosted asset responses must remain package-safe. Private-provider-only
  delivery must stay blocked, not substituted.

## Remaining Decisions And Operational Gates

Jason approved the recommended terms posture. Remaining release blockers are:

- final feedback/history retention/deletion/export language;
- durable/shared hosted rate-limit enforcement evidence;
- final `@brandcode/mcp` npm package/source posture;
- explicit Jason approval for any release/publish/listing action.

## Release Rule

Do not claim release-candidate readiness, publish, submit to directories, alter
public listing metadata, or change package posture until this gate is settled
and Jason explicitly approves the release path.

After M001-L19, no public release, publish, directory submission, or public
listing change is authorized. Jason approved the pre-release operations owner
and chose durable shared rate limiting as the next lane before broad public
release.
