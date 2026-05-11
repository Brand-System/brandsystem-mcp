# M001-L27 - Limited Client Support Intake Ledger

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Limited-client operations / support hardening
**Recommended commit:** `Add Brandcode MCP limited client support ledger`

## Why

M001-L26 gives operators a key operations runbook for staging handoff,
production gating, rotation, revocation, suspected leak response, and redacted
proof capture.

The next limited-client gap is support intake durability: approved-client
access needs a compact ledger template for setup issues, auth/scope blockers,
custody blockers, quality reports, feedback/history questions,
deletion/export requests, incidents, and evidence links without promising a
public SLA or self-serve deletion/export.

## Scope

Inspect first:

- `specs/brandcode-mcp-limited-client-key-ops-runbook.md`
- `specs/brandcode-mcp-limited-client-onboarding-template.md`
- `specs/brandcode-mcp-limited-client-readiness-plan.md`
- `specs/brandcode-mcp-hosted-data-policy.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`

Implement narrowly:

- Add a reusable limited-client support/intake ledger template under `specs/`.
- Cover access setup, auth/scope, custody, quality, feedback/history,
  deletion/export, abuse/security, incident, and offboarding categories.
- Keep deletion/export as manual pre-release ops review, not public self-serve.
- Include fields for endpoint, brand slug, key posture, non-secret key id,
  owner, status, evidence link, and next action.
- Include redaction rules for bearer keys, private/provider URLs, service
  tokens, raw custody paths, and large support blobs.
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
- No public support SLA, legal terms, deletion/export promise, or production
  endpoint proof unless Jason explicitly authorizes it.
- No secret values in docs, commits, logs, or examples.

## Acceptance

- Ready lane documents a reusable limited-client support/intake ledger.
- Ledger separates support categories and has clear owner/status/next-action
  fields.
- Ledger preserves manual pre-release deletion/export review posture.
- Ledger includes redaction rules and does not store raw secrets or private
  provider URLs.
- `git diff --check` passes.
- No code changes are expected; lint/build/tests may be skipped with a clear
  docs-only note.
- Exactly one next Ready lane remains, unless a named Jason decision blocker is
  surfaced.
