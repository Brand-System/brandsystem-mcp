# Brandcode MCP Hosted Service Terms Decision Brief

**Status:** Approved posture; release still blocked
**Date:** 2026-05-10
**Applies to:** hosted `@brandcode/mcp` Use MCP
**Release posture:** no npm publish, public release, production release,
directory submission, public listing change, or package posture change until
Jason explicitly approves that release action.

## Decision Summary

Jason approved the recommended hosted-service posture for Brandcode MCP on
2026-05-10. This approval settles the service-terms direction, but it does not
authorize release or publish.

The approved posture is:

- hosted Use access is approved-brand, bearer-key-only, and pre-release until
  the remaining release gates are closed;
- brand/runtime/content/assets remain client-owned or client-controlled;
- Brandcode uses hosted runtime data only to serve MCP tools and governance
  workflows;
- no raw private/provider URLs, private blob URLs, service tokens, or raw
  custody paths are exposed through hosted MCP responses;
- `brand_feedback` is append-only review input, not canonical governance
  mutation;
- `brand_history` is scoped to the brand/key posture and returns compact
  redacted summaries;
- feedback/history retention must remain limited and review-oriented, with
  deletion/export language settled before public launch copy;
- abuse and rate-limit posture must be explicit before launch: active
  enforcement is preferred, and any limited launch without command-backed
  enforcement requires a named Brandcode operations owner and abuse policy;
- public "free in v1" copy is not approved as launch copy;
- `@brandcode/mcp` package/source can likely inherit the repo MIT posture if
  Jason approves that package posture, but hosted service access is separate
  from source/license access;
- installing or publishing package code must not imply public entitlement to
  hosted Brandcode MCP.

## Current Truth

The hosted implementation has strong pre-release proof:

- all 8 locked hosted Use tools are implemented;
- staging smoke passes;
- package-safe `get_brand_asset` proof passes for
  `brandcode:logo:c5-logomark-red.svg`;
- MCP Inspector and Claude Code both exercised the hosted endpoint;
- read-only insufficient-scope behavior is proven for `brand_check` and
  `brand_feedback`;
- `brand_status.rate_limits.status` remains `not_reported_by_staging` and
  `release_gate: "blocked"`.

## Remaining Launch Blockers

The terms posture is approved, but release-candidate readiness remains blocked
by:

- full-suite local test failures in `test/tools/smoke.test.ts` for
  `brand_extract_visual` and `brand_extract_site` without `.brand/`;
- no GitHub CI run on the local M001 stack;
- no active rate-limit enforcement evidence yet;
- no named operational runbook for abuse handling/key revocation/support
  escalation;
- no final public retention/deletion/export language for feedback/history;
- unresolved final `@brandcode/mcp` package/source posture for npm;
- deferred Brandcode Use directory metadata;
- explicit Jason approval still required before any release/publish/listing
  action.

## Release Rule

Do not publish `@brandcode/mcp`, release Brandcode MCP publicly, submit to MCP
directories, alter public listing metadata, change package posture, or claim
release-candidate readiness until Jason explicitly approves that action after
the remaining security/QC gates are closed.

## Next Recommended Repair

Repair the known full-suite failures first. Full-suite green is the cleanest
next QC gate before push/CI proof or public package/directory metadata work.
