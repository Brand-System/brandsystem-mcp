# M001-L19 - Hosted Rate Limit And Abuse Posture

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Hosted security / release-trust hardening
**Recommended commit:** `Harden hosted rate limit abuse posture`

## Why

M001-L18 restored CI trust hygiene. The loudest remaining hosted release blocker
is now the Brandcode Use MCP rate-limit and abuse posture.

Current truth:

- `brand_status.rate_limits.status` remains `not_reported_by_staging`.
- `brand_status.rate_limits.release_gate` remains `blocked`.
- The release gate allows either command-backed active enforcement or a named
  Brandcode operations owner and abuse-handling policy for a limited launch.

This lane should move that blocker from vague policy risk to either real
enforcement evidence or a precise named operational blocker.

## Scope

Inspect first:

- `src/hosted/router.ts`
- `src/hosted/server.ts`
- `src/hosted/auth.ts`
- `src/hosted/scope.ts`
- `src/hosted/tools/status.ts`
- hosted env/config tests
- `SECURITY.md`
- `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`

Preferred outcome:

- implement narrow hosted request/tool-call rate limiting if the repo already
  has a durable or acceptable pre-release substrate; and
- make `brand_status.rate_limits` report truthful configured limits,
  enforcement state, reset/window fields, and release-gate posture.

If no acceptable substrate exists:

- do not fake active enforcement;
- produce a durable blocker that names the missing infra/owner decision;
- keep `brand_status.rate_limits.status` truthful.

## Out Of Scope

- No release, npm publish, public MCP directory submission, public listing
  changes, hosted tool additions, selected-kit default behavior, or custody
  relaxation.
- No public pricing/plan copy.
- No broad telemetry redesign.
- No UCS changes unless the blocker clearly lives in UCS and Jason authorizes
  that repo scope.

## Acceptance

- Hosted rate-limit/abuse posture is no longer vague.
- Either active enforcement is implemented and covered by tests, or the exact
  missing infra/owner decision is recorded as a launch blocker.
- `brand_status.rate_limits` remains truthful and test-covered.
- `SECURITY.md`, the hosted terms/rate-limit gate, sprint board, messages, and
  `HANDOFF.md` are updated.
- Relevant tests, lint, build, and `git diff --check` are run.
- Exactly one next Ready lane remains, or a named Jason decision blocker is
  recorded.

## Starting Evidence

- L14 added the explicit hosted rate-limit release gate.
- L15 approved hosted-service terms posture but left rate-limit/abuse
  operations as a launch blocker.
- L18 CI is green on current `origin/main`.
