# M001-L26 - Limited Client Key Ops Runbook

**Status:** Done
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

- Done: added a usable operator runbook for limited-client Brandcode MCP key
  ops.
- Done: runbook has separate staging and production paths.
- Done: runbook names Jason Lankow / Brandcode Studio Ops
  `<jlankow@columnfive.com>` as the pre-release abuse/key owner.
- Done: runbook includes redacted proof templates for smoke and real-client
  config runs.
- Done: runbook preserves Option 4 posture and does not imply public
  package/source distribution.
- Done: `git diff --check` passes.
- Done: no code changes were made, so lint/build/tests were skipped with a
  docs-only note.
- Done: exactly one next Ready lane remains.

## Closeout

Added:

- `specs/brandcode-mcp-limited-client-key-ops-runbook.md`

Updated pointers and coordination:

- `SECURITY.md`
- `README.md`
- `llms.txt`
- `.claudex/sprints/current.md`
- `.claudex/messages/M001-messages.md`
- `HANDOFF.md`

The runbook covers staging-only `bck_test_` key generation, Vercel Preview env
installation posture, deploy/alias proof, production `bck_live_` key approval
gating, smoke proof, real-client config proof, scopes, slug binding, key owner,
rotation, revocation, suspected leak response, and redacted evidence capture.

No production client keys were generated. No production endpoint proof,
release, npm publish, public MCP directory submission, public listing metadata
change, hosted tool addition, selected-kit default behavior, package/source
posture change, or custody relaxation happened.

Next Ready lane:

- `.claudex/packets/M001-L27-limited-client-support-intake-ledger.md`
