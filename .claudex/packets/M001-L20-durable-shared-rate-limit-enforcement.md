# M001-L20 - Durable Shared Rate Limit Enforcement

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Hosted security / durable enforcement
**Recommended commit:** `Add durable hosted rate limit enforcement`

## Why

M001-L19 added active process-local pre-release rate limiting. Jason then named
the pre-release abuse response owner and chose durable shared hosted rate
limiting as the next lane before broad public release.

Pre-release owner:

- Owner: Jason Lankow / Brandcode Studio Ops
- Contact: `jlankow@columnfive.com`
- Authority: revoke, rotate, suspend, or throttle hosted Brandcode MCP API keys
  for abuse, leaked keys, excessive traffic, security risk, or
  service-stability risk.

Remaining blocker:

- Process-local fixed-window limiting is not durable across Vercel instances.
- Public release still requires durable shared enforcement evidence and
  explicit Jason release approval.

## Scope

Inspect first:

- `src/hosted/rate-limit.ts`
- `src/hosted/router.ts`
- `src/hosted/env.ts`
- hosted env/router/status tests
- `vercel.json`
- package dependencies
- current Vercel/storage env posture if locally available

Preferred implementation:

- Add a durable shared rate-limit store for hosted HTTP traffic using an
  approved shared substrate already available to this project, or a narrow new
  dependency/env contract if that is the smallest truthful route.
- Preserve the current in-process limiter as a local/test fallback only if
  needed.
- Keep limits keyed by environment, brand slug, and API key id.
- Preserve structured `429 rate_limited`, `retry-after`, and `x-ratelimit-*`
  headers.
- Update `brand_status.rate_limits` so it truthfully reports durable/shared
  enforcement when active, and keeps `release_gate` blocked unless the lane has
  command-backed hosted proof and Jason release approval.

If no acceptable shared substrate exists:

- Do not fake durable enforcement.
- Record the exact missing substrate/env/owner decision as the next blocker.
- Keep process-local pre-release enforcement truthful.

## Out Of Scope

- No public release.
- No npm publish.
- No public MCP directory submission.
- No public listing metadata changes.
- No hosted tool additions.
- No selected-kit default behavior.
- No custody relaxation.
- No public pricing copy.

## Acceptance

- Durable/shared rate-limit behavior is implemented and covered by focused
  tests, or the exact missing substrate blocker is recorded.
- `brand_status.rate_limits` distinguishes durable/shared enforcement from
  process-local fallback.
- Security docs, hosted gate spec, sprint board, messages, and `HANDOFF.md`
  are updated.
- `git diff --check` passes.
- Focused hosted rate-limit/router/status tests pass.
- `npm run lint` and `npm run build` pass.
- Full `npm test` is attempted if shared hosted behavior changes.
- Exactly one next Ready lane remains, or a named Jason decision blocker is
  recorded.

## Starting Evidence

- M001-L19 process-local enforcement passed local full test suite and GitHub
  CI.
- Jason approved pre-release operations owner:
  Jason Lankow / Brandcode Studio Ops `<jlankow@columnfive.com>`.
- Jason chose durable shared rate limiting as the next lane.
