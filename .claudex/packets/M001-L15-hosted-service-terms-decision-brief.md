# M001-L15 - Hosted Service Terms Decision Brief

**Status:** Ready
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
