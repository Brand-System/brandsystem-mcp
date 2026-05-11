# M001-L26 - Limited Client Key Ops Runbook

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Limited-client operations / security hardening
**Recommended commit:** `Document Brandcode MCP limited client key ops`

## Why

M001-L25 proved the Column Five Brandcode staging endpoint through a real Claude
Code MCP client config, but it also confirmed that secret handoff and key
operations are the real limited-client friction.

Before any approved client receives production access, operators need a compact
runbook for staging keys, production-key approval, rotation, revocation,
leak-response, client config handoff, proof capture, and redaction.

## Scope

Inspect first:

- `specs/brandcode-mcp-limited-client-readiness-plan.md`
- `specs/brandcode-mcp-limited-client-onboarding-template.md`
- `specs/brandcode-mcp-column-five-client-config-dry-run.md`
- `specs/brandcode-mcp-hosted-data-policy.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`

Implement narrowly:

- Add a durable limited-client key operations runbook under `specs/`.
- Cover staging-only test key generation, Vercel Preview env installation,
  deploy/alias proof, real-client config proof, and redacted evidence capture.
- Cover production-key issuance as a Jason-approved gate, not an automated
  default.
- Cover scopes (`read`, `check`, `feedback`), key owner, brand slug binding,
  rotation, revocation, suspected leak handling, and support/abuse owner.
- Include safe command shapes that do not print bearer keys.
- Update `SECURITY.md`, `README.md`, `llms.txt`, sprint current,
  M001 messages, and `HANDOFF.md` only where useful.

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
- No secret values in docs, commits, logs, or examples.

## Acceptance

- Ready lane documents a usable operator runbook for limited-client Brandcode
  MCP key ops.
- Runbook has separate staging and production paths.
- Runbook names Jason Lankow / Brandcode Studio Ops
  `<jlankow@columnfive.com>` as the pre-release abuse/key owner.
- Runbook includes redacted proof templates for smoke and real-client config
  runs.
- Runbook preserves Option 4 posture and does not imply public package/source
  distribution.
- `git diff --check` passes.
- No code changes are expected; lint/build/tests may be skipped with a clear
  docs-only note.
- Exactly one next Ready lane remains, unless a named Jason decision blocker is
  surfaced.
