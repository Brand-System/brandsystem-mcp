# M001-L24 - Limited Client Onboarding Template

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Limited-client launch readiness / operations
**Recommended commit:** `Add Brandcode MCP limited client onboarding template`

## Why

M001-L23 records the limited-client readiness plan for Jason's approved Option
4 posture: no public `@brandcode/mcp` package/source distribution for v0.1,
with authorized clients using the hosted Brandcode MCP through brand-scoped
bearer keys.

The next useful work is to make the first approved-client handoff repeatable
without issuing real production keys or pretending public release is approved.

## Scope

Inspect first:

- `specs/brandcode-mcp-limited-client-readiness-plan.md`
- `specs/brandcode-mcp-hosted-data-policy.md`
- `specs/brandcode-mcp-package-source-posture-decision-brief.md`
- `scripts/hosted-mcp-smoke.mjs`
- `SECURITY.md`
- `README.md`
- `llms.txt`

Implement narrowly:

- Add a durable per-client onboarding template/checklist in `specs/` or
  `.claudex/` that operators can copy for an approved brand.
- Include fields for client/brand approval, endpoint posture, key scopes,
  key owner, smoke command shape, custody proof, support/abuse/deletion/export
  intake, and Option 4 no-public-package guardrails.
- Keep secrets out of the template.
- Update sprint/HANDOFF/messages as needed.

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
- No real client naming unless Jason approves the client/brand in-thread.

## Acceptance

- Done: the repo has a reusable limited-client onboarding checklist/template.
- Done: the template is concrete enough to run one approved client through staging
  proof and, if approved later, production proof.
- Done: it records no secrets and makes production key issuance explicitly gated.
- Done: `git diff --check` passes.
- Done: no code changes were made, so lint/build/tests were skipped with a clear
  docs-only note.
- Done: exactly one next Ready lane remains.

## Closeout

- Added `specs/brandcode-mcp-limited-client-onboarding-template.md`.
- Added a concrete internal staging proof:
  `specs/brandcode-mcp-column-five-brandcode-staging-onboarding-proof.md`.
- Ran the template proof against the Column Five Brandcode `brandcode` staging
  instance at `https://mcp.staging.brandcode.studio/brandcode`.
- Hosted smoke passed with `ok: true`, `status: "pass"`, `fail: 0`,
  `blocked: 0`, and `skipped: 0`.
- Package-safe asset proof passed for
  `brandcode:logo:c5-logomark-red.svg`.
- Read-only insufficient-scope checks passed for `brand_check` and
  `brand_feedback`.
- No secrets were recorded.
- No release, package, directory, listing, production key, hosted tool, or
  custody change happened.
- Next Ready lane:
  `.claudex/packets/M001-L25-column-five-brandcode-client-config-dry-run.md`.
