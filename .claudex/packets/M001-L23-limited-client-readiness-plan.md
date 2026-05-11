# M001-L23 - Limited Client Readiness Plan

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Limited-client launch readiness / operations
**Recommended commit:** `Plan Brandcode MCP limited client readiness`

## Why

Jason chose Option 4 for v0.1: defer public `@brandcode/mcp` package/source
distribution and keep Brandcode MCP as an approved-brand hosted pre-release
service while the actual Brandcode product improves for limited client use.

The next useful work is not package publishing or directory metadata. It is a
limited-client readiness plan that makes the private/approved rollout safe,
repeatable, and honest.

## Scope

Inspect first:

- `specs/brandcode-mcp-package-source-posture-decision-brief.md`
- `specs/brandcode-mcp-hosted-data-policy.md`
- `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`
- `scripts/hosted-mcp-smoke.mjs`
- hosted auth/scope/rate-limit docs and tests as needed for accuracy

Implement narrowly:

- Add a durable limited-client readiness plan in `specs/`.
- Cover:
  - approved client/brand eligibility;
  - staging vs production endpoint posture;
  - API key issuance, scope selection, rotation, revocation, and leak response;
  - per-client smoke proof requirements;
  - support, abuse, deletion/export, and incident intake;
  - package-safe asset/custody expectations;
  - rate-limit and service-token env checks;
  - no-public-package/no-directory/no-listing guardrails for Option 4;
  - future Option 3 signals to capture during limited release.
- Update `SECURITY.md`, `README.md`, `llms.txt`, sprint current, messages, and
  `HANDOFF.md` only as needed to point at the plan and preserve release
  blockers truthfully.

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

## Acceptance

- Done: the repo records Option 4 as the v0.1 limited-client package/source
  posture.
- Done: a limited-client readiness plan exists and is concrete enough to guide the
  first approved client rollout.
- Done: the plan names any remaining Jason/legal/ops blockers instead of implying
  public release readiness.
- Done: no public package/source/listing/release action was taken.
- Done: `git diff --check` passes.
- Done: no code changes were made, so lint/build/tests were skipped with a clear
  docs-only note.
- Done: exactly one next Ready lane remains:
  `.claudex/packets/M001-L24-limited-client-onboarding-template.md`.

## Starting Evidence

- Jason chose Option 4 for v0.1 limited-client work: defer public
  `@brandcode/mcp` package/source distribution.
- Hosted staging proof has passed for the locked 8-tool surface, package-safe
  asset custody, multi-client access, and durable shared rate limiting.
- Public release remains blocked on final deletion/export launch language,
  future public package/source approval, directory metadata, and explicit Jason
  release approval.

## Closeout

- Added `specs/brandcode-mcp-limited-client-readiness-plan.md`.
- Covered approved client/brand eligibility, staging vs production endpoint
  posture, API key issuance/rotation/revocation/leak response, per-client smoke
  proof, support/abuse/deletion/export/incident intake, package-safe custody,
  rate-limit/service-token checks, Option 4 guardrails, and future Option 3
  signals to capture.
- Updated `SECURITY.md`, `README.md`, `llms.txt`, sprint current, messages, and
  `HANDOFF.md` to point at the plan while preserving release blockers.
- Added the next Ready lane:
  `.claudex/packets/M001-L24-limited-client-onboarding-template.md`.
