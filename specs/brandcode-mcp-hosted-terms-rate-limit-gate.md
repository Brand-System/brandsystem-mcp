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
still **not release-satisfied**. Keep `not_reported_by_staging` as a truthful
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

## Remaining Decisions And Operational Gates

Jason approved the recommended terms posture. Remaining release blockers are:

- final feedback/history retention/deletion/export language;
- active rate-limit enforcement evidence, or a named Brandcode operations owner
  and abuse-handling runbook for a limited launch;
- final `@brandcode/mcp` npm package/source posture;
- full-suite green and CI proof for the local M001 stack;
- explicit Jason approval for any release/publish/listing action.

## Release Rule

Do not claim release-candidate readiness, publish, submit to directories, alter
public listing metadata, or change package posture until this gate is settled
and Jason explicitly approves the release path.

The next Ready lane is **M001-L16 Full Suite Visual Extraction Smoke Repair**.
After full-suite green, the next lane should be push/CI proof for the local
M001 stack if Jason authorizes push or PR proof. If Jason does not authorize
push, automation should pause on that named decision rather than inventing
release or directory work.
