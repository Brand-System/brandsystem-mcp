# M001-L27 - Limited Client Support Intake Ledger

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Limited-client operations / support hardening
**Recommended commit:** `Add Brandcode MCP limited client support ledger`
**Prompt:** `.claudex/prompts/M001-L27-limited-client-support-intake-ledger.md`

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

- Done: added a reusable limited-client support/intake ledger.
- Done: ledger separates support categories and has clear owner/status/next-action
  fields.
- Done: ledger preserves manual pre-release deletion/export review posture.
- Done: ledger includes redaction rules and does not store raw secrets or private
  provider URLs.
- Done: `git diff --check` passes.
- Done: no code changes were made, so lint/build/tests were skipped with a
  docs-only note.
- Done: exactly one next Ready lane remains.

## Closeout

Added:

- `specs/brandcode-mcp-limited-client-support-intake-ledger.md`

Updated pointers and coordination:

- `SECURITY.md`
- `README.md`
- `llms.txt`
- `.claudex/sprints/current.md`
- `.claudex/messages/M001-messages.md`
- `HANDOFF.md`

The ledger covers access setup, auth/scope, custody, quality,
feedback/history, deletion/export, abuse/security, incident, and offboarding
intake. It includes endpoint, brand slug, key posture, non-secret key id/label,
owner, status, evidence, next-action, escalation-owner, and redaction fields.

Deletion/export remains manual pre-release operations review through Brandcode
Studio Ops. No self-serve deletion/export operation, public response window,
public support SLA, legal term, or launch promise was added.

No release, npm publish, public MCP directory submission, public listing
metadata change, hosted tool addition, selected-kit default behavior, custody
relaxation, package/source posture change, production client key generation, or
production endpoint proof happened.

Next Ready lane:

- `.claudex/packets/M001-L28-deletion-export-launch-decision-brief.md`
