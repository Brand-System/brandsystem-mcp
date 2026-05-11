# M001-L21 - Hosted Retention Export Deletion Policy

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Hosted trust / policy hardening
**Recommended commit:** `Clarify Brandcode MCP hosted data policy`

## Why

M001-L20 proved durable shared hosted rate limiting on the staging MCP route.
The next release blocker is no longer vague rate-limit posture; it is the
public trust language around hosted Brandcode MCP data handling.

Jason has approved the recommended pre-release posture, but release is still
blocked until the repo clearly documents retention, deletion, export, feedback,
history, custody, and service/source-package boundaries for hosted Use MCP.

## Scope

Inspect first:

- `specs/brandcode-mcp-hosted-service-terms-decision-brief.md`
- `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`
- `specs/brandcode-mcp-release-candidate-trust-review.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`
- hosted feedback/history implementation and tests only as needed to avoid
  false claims

Implement narrowly:

- Add or update a durable hosted data-policy/spec doc that states, in plain
  product/operator language:
  - hosted Use MCP is authorized, bearer-key, pre-release access only;
  - brand/runtime data remains client-owned or client-controlled;
  - `brand_feedback` is append-only review input and does not mutate canonical
    governance;
  - `brand_history` is scoped and redacted;
  - package-safe assets may be served, raw private/provider URLs must not be
    exposed;
  - retention/deletion/export posture is either explicitly defined or named as
    a Jason/legal/ops decision blocker;
  - source/package license posture is separate from hosted service access.
- Update `SECURITY.md`, `README.md`, `llms.txt`, the sprint board, messages,
  and `HANDOFF.md` so they point to the same truth.
- Keep `brand_status.rate_limits.release_gate: "blocked"` unless Jason
  explicitly approves release.

## Out Of Scope

- No public release.
- No npm publish.
- No public MCP directory submission.
- No public listing metadata changes.
- No hosted tool additions.
- No selected-kit default behavior.
- No custody relaxation.
- No legal finalization beyond repo-native draft/decision language unless Jason
  supplies final language.

## Acceptance

- Done: the hosted data policy is documented without implying release approval.
- Done: unsettled deletion/export decisions are named as Jason/legal/ops
  blockers before public launch.
- Done: Security/README/llms/sprint/HANDOFF language is aligned.
- Done: `git diff --check` passes.
- Done: no code changes were made, so focused tests/lint/build were not
  required for this docs-only lane.
- Done: exactly one next Ready lane remains:
  `.claudex/packets/M001-L22-package-source-posture-decision-brief.md`.

## Starting Evidence

- M001-L20 hosted proof passed on 2026-05-11:
  `brand_status.rate_limits.status: "active_durable_shared"` on
  `https://mcp.staging.brandcode.studio/brandcode`.
- Hosted smoke passed with `fail: 0`, `blocked: 0`, `skipped: 0` and
  package-safe asset id `brandcode:logo:c5-logomark-red.svg`.
- Release/publish/directory submission remain blocked on explicit Jason
  approval.

## Closeout

- Added `specs/brandcode-mcp-hosted-data-policy.md`.
- Clarified that feedback/history retention is limited and review-oriented for
  pre-release, while final deletion/export launch language remains a
  Jason/legal/ops blocker.
- Kept source/package license posture separate from hosted service access.
- Kept `brand_status.rate_limits.release_gate` blocked; no hosted tools,
  custody code, listing metadata, release, publish, or directory submission
  changed.
- Next Ready lane: M001-L22 Package Source Posture Decision Brief.
