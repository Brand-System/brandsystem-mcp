# M001-L29 - Limited Client Go No-Go Checklist

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Non-release hardening / limited-client readiness audit
**Recommended commit:** `Add Brandcode MCP limited client go no-go checklist`
**Prompt:** `.claudex/prompts/M001-L29-limited-client-go-no-go-checklist.md`

## Why

M001-L23 through M001-L28 turned the Brandcode MCP limited-client posture into
real operations artifacts: readiness plan, onboarding template, client-config
proof, key ops runbook, support ledger, and deletion/export decision brief.

The next useful non-release hardening step is to consolidate that work into a
single go/no-go checklist for approved limited-client pilots. This should help
operators decide whether a specific brand/client is ready for staging or
production proof without implying public release, npm publication, MCP
directory submission, public deletion/export launch language, or legal terms.

## Scope

Inspect first:

- `specs/brandcode-mcp-limited-client-readiness-plan.md`
- `specs/brandcode-mcp-limited-client-onboarding-template.md`
- `specs/brandcode-mcp-column-five-brandcode-staging-onboarding-proof.md`
- `specs/brandcode-mcp-column-five-client-config-dry-run.md`
- `specs/brandcode-mcp-limited-client-key-ops-runbook.md`
- `specs/brandcode-mcp-limited-client-support-intake-ledger.md`
- `specs/brandcode-mcp-deletion-export-launch-decision-brief.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`
- `.claudex/sprints/current.md`
- `HANDOFF.md`

Implement narrowly:

- Add a durable limited-client go/no-go checklist under `specs/`.
- Separate staging readiness, production proof readiness, and public release
  readiness.
- Mark the L28 pre-release deletion/export operating posture as recorded, while
  keeping public deletion/export launch language blocked on final
  legal/subprocessor review.
- Include required evidence links for smoke proof, client-config proof,
  package-safe asset proof, durable rate-limit proof, support intake, key ops,
  custody posture, and CI freshness.
- Include explicit fail-closed criteria for missing keys, missing hosted proof,
  raw private/provider URL exposure, insufficient custody evidence, absent
  support owner, failing CI, or unresolved deletion/export launch language.
- Update sprint current, M001 messages, HANDOFF, and top-level docs only where
  useful.

## Out Of Scope

- No npm publish.
- No public release.
- No public MCP directory submission.
- No public listing metadata changes.
- No package rename or package metadata changes.
- No hosted tool additions.
- No selected-kit default behavior.
- No custody relaxation.
- No production-client key generation unless Jason explicitly asks in-thread.
- No production endpoint proof unless Jason explicitly authorizes it.
- No public deletion/export SLA, legal terms, or self-serve deletion/export
  operations.
- No claim that Brandcode MCP is release-candidate ready.
- No secret values in docs, commits, logs, or examples.

## Acceptance

- Ready lane creates a go/no-go checklist usable for an approved limited-client
  pilot.
- Checklist distinguishes staging, production proof, and public release gates.
- Checklist makes public deletion/export launch language a blocker, not an
  assumed pass.
- Checklist includes evidence fields and fail-closed criteria.
- `git diff --check` passes.
- No code changes are expected; lint/build/tests may be skipped with a clear
  docs-only note.
- Exactly one next Ready lane remains, unless a named Jason decision blocker is
  surfaced.
