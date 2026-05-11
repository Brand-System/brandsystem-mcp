# Brandcode MCP Hosted Terms And Rate-Limit Gate

**Status:** M001-L21 data policy drafted - release gate still blocked
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
`specs/brandcode-mcp-hosted-service-terms-decision-brief.md`, and the
pre-release hosted data-policy draft now lives in
`specs/brandcode-mcp-hosted-data-policy.md`, but this gate is still **not
release-satisfied**. M001-L20 added an optional durable shared Redis REST
rate-limit store at the hosted HTTP router. The router now reports
durable/shared enforcement when the Redis env contract is configured, and falls
back to the prior in-process limiter only for local tests and pre-release
development when no shared store env is present. Treat release as blocked until
all remaining public-launch gates are satisfied, including:

- `brand_status` reports active per-brand rate-limit enforcement with
  command-backed durable/shared enforcement evidence; and
- final deletion/export request handling and public launch language are
  approved by Jason/legal/ops; and
- `@brandcode/mcp` package/source posture is decided; and
- Jason explicitly approves the final public release path.

## Gate Matrix

| Area | Current status | Required before public release |
| --- | --- | --- |
| Bearer-key access terms | Blocked | Jason-approved hosted service terms covering API-key access, account/brand authorization, key handling, availability, and acceptable use. |
| Client-owned brand data | Blocked | Public terms/privacy language stating client-owned runtime data, brand assets, feedback, and history boundaries. |
| `brand_feedback` retention | Drafted for pre-release / launch blocked | `brand_feedback` is explicit append-only review input in UCS history. Public launch still needs final deletion/export language, support SLA, and legal/ops wording. |
| `brand_history` visibility | Drafted for pre-release / launch blocked | `brand_history` returns compact scoped redacted summaries. Public launch still needs final deletion/export language, support SLA, and legal/ops wording. |
| Private custody | Pass for current implementation, gated for launch language | Keep package-safe delivery only. Do not expose raw private provider URLs, private blob URLs, service-token data, or raw custody paths. |
| Abuse handling | Pre-release owner approved; public launch language blocked | Jason Lankow / Brandcode Studio Ops `<jlankow@columnfive.com>` owns pre-release abuse response and may revoke, rotate, suspend, or throttle keys. Public release still needs final support/security language. |
| Rate limits | Staging proof complete / release blocked | M001-L20 added optional durable shared Redis REST enforcement and `brand_status` reporting. Hosted staging proof now reports `active_durable_shared`; Jason release approval is still required before broad public release. |
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
- 2026-05-11 hosted proof against
  `https://mcp.staging.brandcode.studio/brandcode` reported
  `status: "active_durable_shared"` and
  `enforcement: "durable_shared_redis_fixed_window"` using
  `KV_REST_API_URL/KV_REST_API_TOKEN`.
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
- M001-L20 completed hosted Redis/KV proof on the staging route. This is
  command-backed pre-release proof, not public release approval.
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

- final deletion/export request handling and public launch language;
- final `@brandcode/mcp` npm package/source posture;
- deferred Brandcode Use directory metadata;
- explicit Jason approval for any release/publish/listing action.

## Release Rule

Do not claim release-candidate readiness, publish, submit to directories, alter
public listing metadata, or change package posture until this gate is settled
and Jason explicitly approves the release path.

After M001-L19, no public release, publish, directory submission, or public
listing change is authorized. Jason approved the pre-release operations owner
and chose durable shared rate limiting as the next lane before broad public
release.
