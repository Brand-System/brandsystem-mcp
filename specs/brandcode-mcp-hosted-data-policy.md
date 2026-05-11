# Brandcode MCP Hosted Data Policy

**Status:** Draft public policy; release still blocked
**Date:** 2026-05-11
**Applies to:** hosted `@brandcode/mcp` Use MCP
**Release posture:** no public release, npm publish, package listing, MCP
directory submission, or public listing change until Jason explicitly approves.

## Executive Readout

The hosted Brandcode Use MCP is approved for authorized pre-release access
only. It is bearer-key gated, brand-scoped, and limited to the locked v0.1
read/check/feedback surface.

This policy records the current data-handling truth for pre-release review. It
does not finalize public launch terms. Final deletion/export language, support
SLA, package/source posture, directory metadata, and explicit Jason release
approval remain blockers before any public launch claim.

## Data Ownership

Brand/runtime data, brand assets, feedback, and history remain client-owned or
client-controlled. Brandcode uses hosted runtime data only to serve MCP tools,
governance workflows, review context, and operational safety controls for the
authorized brand.

Installing or publishing source/package code must not imply public entitlement
to hosted Brandcode MCP service access. Hosted service access, bearer-key
authorization, account/brand eligibility, and service terms stay separate from
the source/package license posture.

## Access And Scope

- Hosted clients use `Authorization: Bearer ...` on a brand-scoped route.
- Staging keys use `bck_test_`; production keys use `bck_live_`.
- Keys are scoped to allowed brand slugs and to `read`, `check`, and/or
  `feedback` capability groups.
- The locked hosted tool surface remains exactly 8 tools:
  `brand_runtime`, `brand_search`, `brand_check`, `brand_status`,
  `list_brand_assets`, `get_brand_asset`, `brand_feedback`, and
  `brand_history`.
- General hosted AgentRun telemetry POST remains deferred. `brand_feedback` is
  the only active hosted write path.

## Feedback Policy

`brand_feedback` records explicit operator-submitted observations or proposals
to UCS AgentRun history for review. It is append-only review input. It does not
approve, apply, or mutate canonical governance.

Pre-release retention posture:

- feedback is retained as review-oriented UCS history so Brandcode operators
  can inspect product friction, proposed governance changes, and support
  evidence;
- feedback responses expose a feedback id, receipt id, append status, and
  review posture;
- URL-like evidence strings are redacted before storage or response projection;
- feedback remains scoped to the authorized brand and key posture.

Public launch blocker:

- final retention duration, deletion request handling, export package format,
  support SLA, and any legal/subprocessor wording for feedback are not approved
  for launch copy yet.

## History Policy

`brand_history` is read-only. It returns compact UCS AgentRun summaries scoped
to the authorized brand and key posture. It summarizes receipt-chain metadata
instead of returning large nested blobs, redacts URL-like strings, and avoids
returning raw private/provider URLs, raw custody paths, service tokens, or large
support/verification payloads.

Pre-release retention posture:

- history is retained as review-oriented UCS AgentRun history;
- hosted MCP returns compact summaries only;
- cursor support is not reported by UCS yet, so `next_cursor` remains null;
- hosted telemetry writes remain deferred.

Public launch blocker:

- final history retention duration, deletion request handling, export package
  format, support SLA, and any legal/subprocessor wording for history are not
  approved for launch copy yet.

## Asset Custody Policy

Hosted asset tools may return package-safe metadata and package-safe delivery
references. Raw private provider URLs, private Blob URLs, service-token data,
and raw custody paths must not be returned through hosted MCP responses, logs,
receipts, or directory metadata.

If an asset only has private-provider delivery, `get_brand_asset` must block
delivery and report the blocker. It must not substitute a different asset, infer
custody from ordinary URL fields, or expose the private URL.

## Rate-Limit And Abuse Policy

The hosted router supports durable shared Redis REST fixed-window enforcement
when the hosted environment provides the Redis/KV env contract. It falls back
to in-process memory enforcement only for local tests and pre-release
development when no shared store env is present.

Rate-limit buckets are scoped by environment, brand slug, and API key id. They
store request counts and expiry within the active window, not brand content,
feedback text, history bodies, assets, or bearer tokens.

Pre-release abuse response owner: Jason Lankow / Brandcode Studio Ops
`<jlankow@columnfive.com>`. The owner may revoke, rotate, suspend, or throttle
hosted Brandcode MCP API keys for abuse, leaked keys, excessive traffic,
security risk, or service-stability risk.

## Deletion And Export Requests

The MCP does not expose public self-serve deletion or export tools for hosted
feedback/history. During pre-release, deletion/export requests must route to
Jason Lankow / Brandcode Studio Ops for manual review through Brandcode/UCS
operations.

Before public release, Jason/legal/ops must decide and approve:

- who may request export or deletion for brand runtime data, feedback, history,
  and package-safe assets;
- how requester identity and brand authorization are verified;
- which systems are in scope for deletion or export;
- what is excluded for security, audit, abuse, accounting, or legal reasons;
- export package format and delivery channel;
- target response windows and support escalation path;
- whether any customer-facing privacy, terms, or subprocessor language is
  required.

Until those decisions are approved, public release, directory submission,
public listing metadata, and release-candidate claims remain blocked.

## Release Gate

| Area | Current posture | Release status |
| --- | --- | --- |
| Authorized hosted access | Approved-brand, bearer-key, pre-release only | Approved for pre-release |
| Client-owned data boundary | Client-owned or client-controlled | Draft policy recorded |
| Feedback retention | Limited and review-oriented UCS history | Final public language blocked |
| History visibility | Scoped, compact, redacted summaries | Final public language blocked |
| Deletion/export | Manual pre-release ops review only | Jason/legal/ops decision blocked |
| Asset custody | Package-safe only; private delivery blocked | Implementation proof complete |
| Rate limits | Durable/shared proof on staging when Redis/KV env is configured | Release still needs Jason approval |
| Source/package posture | Separate from hosted service access | Jason decision blocked |
| Directory metadata | Deferred | Downstream of policy/source decisions |

## Operator Rule

Do not claim Brandcode MCP is publicly launched, directory-ready, or
release-candidate ready from this policy alone. This policy narrows the data
handling gap for pre-release review; it does not grant release approval.
