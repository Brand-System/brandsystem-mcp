# M001-L30 - Limited Client Staging Freshness Proof

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Non-release hosted proof / limited-client QC
**Recommended commit:** `Refresh Brandcode MCP limited client staging proof`
**Prompt:** `.claudex/prompts/M001-L30-limited-client-staging-freshness-proof.md`

## Why

M001-L29 turns the limited-client posture into a go/no-go checklist. The next
useful non-release hardening step is to apply that checklist to the current
Column Five Brandcode staging instance and refresh the evidence with the
current pushed code, current staging alias, and current hosted env posture.

This lane should prove the limited-client staging handoff story again without
publishing, releasing, submitting to directories, changing package metadata,
issuing production keys, or running production endpoint proof.

## Scope

Inspect first:

- `specs/brandcode-mcp-limited-client-go-no-go-checklist.md`
- `specs/brandcode-mcp-column-five-brandcode-staging-onboarding-proof.md`
- `specs/brandcode-mcp-column-five-client-config-dry-run.md`
- `specs/brandcode-mcp-limited-client-key-ops-runbook.md`
- `specs/brandcode-mcp-limited-client-support-intake-ledger.md`
- `.claudex/sprints/current.md`
- `HANDOFF.md`

Implement narrowly:

- Run or refresh hosted staging proof for
  `https://mcp.staging.brandcode.studio/brandcode` when usable staging
  credentials are available.
- Apply the M001-L29 go/no-go checklist to the Column Five Brandcode staging
  instance.
- Record redacted evidence only: endpoint, deployment/alias if checked, tool
  order, rate-limit status, asset custody posture, scope behavior, smoke
  summary, and client path used.
- If keys are unavailable, do not fake proof. Record the exact blocker and the
  next safe key-handoff or generate-and-run step.
- Update sprint current, M001 messages, HANDOFF, and proof docs.

## Out Of Scope

- No npm publish.
- No public release.
- No MCP directory submission.
- No public listing metadata changes.
- No package rename or package metadata changes.
- No hosted tool additions.
- No selected-kit default behavior.
- No custody relaxation.
- No production-client key generation unless Jason explicitly asks in-thread.
- No production endpoint proof unless Jason explicitly authorizes it.
- No public deletion/export SLA, legal terms, or self-serve deletion/export
  operations.
- No secret values in docs, commits, logs, or examples.

## Acceptance

- The Column Five Brandcode staging instance has a current go/no-go read, or a
  truthful blocker is recorded.
- Evidence is redacted and linked from sprint docs.
- Hosted staging proof, if run, shows locked 8-tool order, durable shared
  rate-limit posture, package-safe asset custody for
  `brandcode:logo:c5-logomark-red.svg`, and read-only insufficient-scope
  behavior.
- `git diff --check` passes.
- No code changes are expected; lint/build/tests may be skipped with a clear
  docs-only/proof-only note.
- Exactly one next Ready lane remains, unless a named Jason decision blocker is
  surfaced.
