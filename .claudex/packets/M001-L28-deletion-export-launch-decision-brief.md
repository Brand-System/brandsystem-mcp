# M001-L28 - Deletion Export Launch Decision Brief

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Limited-client policy / launch blocker decision prep
**Recommended commit:** `Prepare Brandcode MCP deletion export decision brief`
**Prompt:** `.claudex/prompts/M001-L28-deletion-export-launch-decision-brief.md`

## Why

M001-L21 documented hosted data-policy truth and M001-L27 added a support
intake ledger that routes deletion/export requests to manual pre-release ops
review.

The remaining launch blocker is not another support template. Jason/legal/ops
still need a compact decision brief for public launch language: who can request
deletion/export, how authorization is verified, which systems are in scope,
what export format is allowed, what response windows can be promised, what
support escalation exists, and what legal/subprocessor language is required.

## Scope

Inspect first:

- `specs/brandcode-mcp-hosted-data-policy.md`
- `specs/brandcode-mcp-limited-client-support-intake-ledger.md`
- `specs/brandcode-mcp-limited-client-readiness-plan.md`
- `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`
- `specs/brandcode-mcp-hosted-service-terms-decision-brief.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`

Implement narrowly:

- Add a compact Jason/legal/ops decision brief under `specs/`.
- Separate current pre-release manual review from any future public launch
  promise.
- Frame options for requester authorization, deletion/export scope, export
  package format, excluded systems, response windows, escalation path, and
  required legal/subprocessor language.
- Preserve Option 4 package/source posture and hosted-service access
  boundaries.
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
- No self-serve deletion/export tool implementation.
- No public SLA, legal terms, deletion/export timelines, or launch copy unless
  Jason/legal/ops approve it.
- No secret values in docs, commits, logs, or examples.

## Acceptance

- Done lane prepared a decision brief, not an implied approval.
- Brief names the exact Jason/legal/ops decisions needed before public launch
  language.
- Brief preserves manual pre-release deletion/export review posture until those
  decisions are made.
- `git diff --check` passes.
- No code changes are expected; lint/build/tests may be skipped with a clear
  docs-only note.
- Exactly one next Ready lane remains, unless a named Jason decision blocker is
  surfaced.

## Closeout

Added:

- `specs/brandcode-mcp-deletion-export-launch-decision-brief.md`

Updated:

- `README.md`
- `SECURITY.md`
- `llms.txt`
- `.claudex/sprints/current.md`
- `.claudex/messages/M001-messages.md`
- `HANDOFF.md`

Result:

- Current pre-release deletion/export remains manual Brandcode Studio Ops
  review.
- Jason approved the pre-release operating posture after this lane closed:
  requester authorization is brand owner/admin or Jason as Brandcode Studio
  Ops; authority proof is brand instance admin status or, for the internal
  Column Five Brandcode instance, verified `columnfivemedia.com` /
  `columnfive.com` email; scope is hosted MCP service data; exports are curated
  support packets; security/legal/backups/out-of-custody data remain excluded.
- Public launch language remains blocked on final legal/subprocessor review.
- No next Ready lane is left because the named Jason/legal/ops launch decision
  is now the blocker.
