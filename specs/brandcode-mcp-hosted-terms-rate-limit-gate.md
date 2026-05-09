# Brandcode MCP Hosted Terms And Rate-Limit Gate

**Status:** M001-L14 complete - release gate blocked
**Date:** 2026-05-09
**Applies to:** hosted `@brandcode/mcp` Use MCP
**Release posture:** no public release, npm publish, package listing, MCP
directory submission, or public listing change until Jason explicitly approves.

## Executive Readout

The hosted Brandcode Use MCP is not blocked on the locked 8-tool surface. It is
blocked on hosted-service trust. Staging and two-client proof remain useful, but
they do not settle terms, privacy/retention, rate limits, abuse handling, or
the package/source posture for `@brandcode/mcp`.

This gate is **not satisfied**. Keep `not_reported_by_staging` as a truthful
rate-limit status and treat it as an explicit release blocker until either:

- `brand_status` reports active per-brand rate-limit enforcement with
  command-backed evidence; or
- Jason approves a named Brandcode operations owner and abuse-handling policy
  for launch.

## Gate Matrix

| Area | Current status | Required before public release |
| --- | --- | --- |
| Bearer-key access terms | Blocked | Jason-approved hosted service terms covering API-key access, account/brand authorization, key handling, availability, and acceptable use. |
| Client-owned brand data | Blocked | Public terms/privacy language stating client-owned runtime data, brand assets, feedback, and history boundaries. |
| `brand_feedback` retention | Blocked | Retention/visibility policy for explicit append-only feedback written to UCS history. |
| `brand_history` visibility | Blocked | Retention/visibility policy for compact scoped run/receipt summaries, including who can view history through each key posture. |
| Private custody | Pass for current implementation, gated for launch language | Keep package-safe delivery only. Do not expose raw private provider URLs, private blob URLs, service-token data, or raw custody paths. |
| Abuse handling | Blocked | Named Brandcode operations owner and public policy for key revocation, traffic abuse, and support/security escalation. |
| Rate limits | Blocked | Active enforcement reported by `brand_status`, or Jason-approved operational owner/blocker language before any launch claim. |
| "Free in v1" copy | Jason decision | Decide whether this is public pricing copy, private beta posture, or launch-deferred language. |
| `@brandcode/mcp` package/source | Jason decision | Decide MIT, proprietary, dual-positioned, or service-only posture before npm/package/listing work. |
| Directory metadata | Deferred | Author separate Brandcode Use metadata only after this gate is satisfied or explicitly approved with blocker language. |

## Current Implementation Truth

- `brand_status.rate_limits.status` remains `not_reported_by_staging`.
- `brand_status.rate_limits.release_gate` is `blocked`.
- `brand_status.rate_limits.blocker_owner` is
  `Jason decision / Brandcode operations owner`.
- General hosted AgentRun telemetry remains deferred.
- `brand_feedback` is the only active write path and is append-only review
  input, not canonical governance mutation.
- `brand_history` is read-only and returns compact scoped summaries with URL
  redaction.
- Hosted asset responses must remain package-safe. Private-provider-only
  delivery must stay blocked, not substituted.

## Jason Decisions

Jason must decide:

- what terms cover hosted Brandcode MCP bearer-key access;
- what privacy and retention commitments apply to client brand data,
  `brand_feedback`, and `brand_history`;
- who owns abuse handling and rate-limit operations for public launch;
- whether rate-limit enforcement is required before launch, or whether a named
  operational owner/blocker is acceptable for an explicitly limited release;
- whether public copy may say "free in v1 for active Brandcode Studio brands";
- whether `@brandcode/mcp` source/package posture is MIT, proprietary,
  dual-positioned, or service-only.

## Release Rule

Do not claim release-candidate readiness, publish, submit to directories, alter
public listing metadata, or change package posture until this gate is settled
and Jason explicitly approves the release path.

The next Ready lane should be **CI And Push Proof For M001 Stack** if Jason
authorizes push/PR proof. If Jason does not authorize push yet, automation
should pause on that named decision rather than inventing release or directory
work.
