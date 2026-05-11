# M001-L24 - Limited Client Onboarding Template

**Status:** Ready
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

- The repo has a reusable limited-client onboarding checklist/template.
- The template is concrete enough to run one approved client through staging
  proof and, if approved later, production proof.
- It records no secrets and makes production key issuance explicitly gated.
- `git diff --check` passes.
- If no code changes are made, lint/build/tests may be skipped with a clear
  docs-only note.
- Exactly one next Ready lane remains, or a named Jason decision blocker is
  recorded.
