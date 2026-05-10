# M001-L15 - Hosted Service Terms Decision Brief

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Trust / decision brief / release gate
**Recommended commit:** `Prepare Brandcode MCP hosted terms decision brief`

## Why

M001-L14 made the hosted terms and rate-limit gate explicit, but the gate is
blocked. Jason still needs a compact decision brief before any release,
directory metadata, production-key proof, or public pricing copy can move.

This lane should turn the blocked gate into a Jason-facing decision artifact.
It is not a release, publish, package, directory, implementation, or listing
lane.

## Scope

Review and update narrowly:

- `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`
- `.claudex/sprints/current.md`
- `.claudex/messages/M001-messages.md`
- `HANDOFF.md`

Produce a compact decision brief covering:

- bearer-key access terms;
- client-owned brand data posture;
- `brand_feedback` and `brand_history` retention/visibility;
- abuse handling owner;
- rate-limit enforcement versus approved blocker owner;
- public "free in v1" copy;
- `@brandcode/mcp` package/source posture.

## Out Of Scope

- No npm publish.
- No package rename.
- No public release.
- No production release.
- No directory submission or public listing change.
- No new hosted tools.
- No selected Brand Kit default behavior.
- No custody relaxation.
- No canonical governance mutation from the MCP.
- No push unless Jason explicitly authorizes CI/push proof.

## Acceptance

- Jason can answer the remaining decisions from one short artifact.
- The brief distinguishes decisions, current truth, and launch blockers.
- `not_reported_by_staging` remains truthful unless implementation evidence
  changes.
- Release/publish remains blocked on Jason approval.
- Directory metadata remains deferred.
- `git diff --check` passes.
- Sprint board, messages, and `HANDOFF.md` are updated at closeout.

## Closeout - 2026-05-10

Jason approved all recommended hosted-service posture items.

Durable decision brief:

- `specs/brandcode-mcp-hosted-service-terms-decision-brief.md`

Approved posture:

- hosted Use access is approved-brand, bearer-key-only, and pre-release;
- brand/runtime/content/assets remain client-owned or client-controlled;
- hosted runtime data is used only to serve MCP tools and governance workflows;
- no raw private/provider URLs, private blob URLs, service tokens, or raw
  custody paths are exposed through hosted MCP responses;
- `brand_feedback` is append-only review input, not canonical governance
  mutation;
- `brand_history` is scoped to brand/key posture and returns compact redacted
  summaries;
- feedback/history retention remains limited and review-oriented, with final
  deletion/export language still needed before public launch copy;
- active rate-limit enforcement is preferred, and any limited launch without
  command-backed enforcement requires a named Brandcode operations owner and
  abuse policy;
- public "free in v1" copy is not approved as launch copy yet;
- `@brandcode/mcp` package/source can likely inherit the repo MIT posture if
  Jason approves that package posture, but hosted service access remains
  separate from source/license access.

Release status:

- No release, npm publish, public listing, directory submission, production
  release, package posture change, or release-candidate claim is approved.
- Next Ready lane is M001-L16 to repair the known full-suite smoke failures
  before push/CI or any release-candidate claim.
