# Brandcode MCP Hosted Service Terms Decision Brief

**Status:** Approved posture; M001-L21 data policy drafted; release still blocked
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

M001-L21 records the current pre-release data-policy draft in
`specs/brandcode-mcp-hosted-data-policy.md`. That draft clarifies the approved
limited/review-oriented retention posture and names the remaining
Jason/legal/ops deletion/export decisions. It does not authorize public
release.

## Current Truth

The hosted implementation has strong pre-release proof:

- all 8 locked hosted Use tools are implemented;
- staging smoke passes;
- package-safe `get_brand_asset` proof passes for
  `brandcode:logo:c5-logomark-red.svg`;
- MCP Inspector and Claude Code both exercised the hosted endpoint;
- read-only insufficient-scope behavior is proven for `brand_check` and
  `brand_feedback`;
- after M001-L20 hosted proof, `brand_status.rate_limits.status` reports
  `active_durable_shared` on the staging route when Redis/KV env is configured,
  and `release_gate: "blocked"` remains true.

## Remaining Launch Blockers

The terms posture is approved, and later M001 lanes resolved the full-suite,
CI, abuse-owner, and durable rate-limit proof gaps. Release-candidate readiness
remains blocked by:

- final deletion/export request handling and public launch language for
  feedback/history;
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

The next decision lane should settle the `@brandcode/mcp` package/source
posture before any package, directory, or public listing work.
