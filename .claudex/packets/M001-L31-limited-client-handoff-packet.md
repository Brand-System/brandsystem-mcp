# M001-L31 - Limited Client Handoff Packet

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Non-release limited-client enablement / client-facing packet
**Recommended commit:** `Draft Brandcode MCP limited client handoff packet`
**Prompt:** `.claudex/prompts/M001-L31-limited-client-handoff-packet.md`

## Why

M001-L30 proved the current Column Five Brandcode staging route after fresh
staging-only key rotation, and CI is green on the pushed proof commit. The next
useful non-release step is to produce the packet an approved limited client
could actually receive: setup instructions, approved claims, support route,
scope/key posture, smoke expectations, custody notes, and clear boundaries.

Jason has also authorized production proof/live-key testing for the `brandcode`
slug, but the production preflight is blocked on route and env provisioning.
The handoff packet should preserve that truth: staging handoff is ready for
approved internal/client rehearsal, production proof is authorized but not yet
proven, and public release remains blocked.

## Scope

Inspect first:

- `specs/brandcode-mcp-limited-client-go-no-go-checklist.md`
- `specs/brandcode-mcp-column-five-brandcode-staging-onboarding-proof.md`
- `specs/brandcode-mcp-production-proof-preflight.md`
- `specs/brandcode-mcp-limited-client-onboarding-template.md`
- `specs/brandcode-mcp-limited-client-key-ops-runbook.md`
- `specs/brandcode-mcp-limited-client-support-intake-ledger.md`
- `.claudex/sprints/current.md`
- `HANDOFF.md`

Implement narrowly:

- Add a reusable limited-client handoff packet under `specs/`.
- Include client-facing setup steps for a generic MCP client without exposing
  secrets.
- Include approved claims for staging/limited-client use and explicit
  non-claims for public release, package/source access, production proof, SLA,
  and deletion/export.
- Include support/intake route, key/scope explanation, custody expectations,
  smoke/proof expectations, and offboarding/rotation language.
- Include a Column Five Brandcode internal example using redacted staging
  proof from L30.
- Reference the production preflight blocker without generating live keys or
  running production proof.
- Update sprint current, M001 messages, HANDOFF, README/SECURITY/llms only
  where useful.

## Out Of Scope

- No npm publish.
- No public release.
- No MCP directory submission.
- No public listing metadata changes.
- No package rename or package metadata changes.
- No hosted tool additions.
- No selected-kit default behavior.
- No custody relaxation.
- No production-client handoff.
- No production endpoint proof until the production domain/env blockers are
  resolved.
- No public deletion/export SLA, legal terms, or self-serve deletion/export
  operations.
- No secret values in docs, commits, logs, or examples.

## Acceptance

- Handoff packet is usable for an approved limited-client staging handoff.
- Packet distinguishes client-facing approved claims from internal operator
  proof and public-release blockers.
- Packet includes the current production proof blocker truthfully.
- `git diff --check` passes.
- No code changes are expected; lint/build/tests may be skipped with a clear
  docs-only note.
- Exactly one next Ready lane remains, unless a named Jason decision or
  external production-infra blocker is surfaced.
