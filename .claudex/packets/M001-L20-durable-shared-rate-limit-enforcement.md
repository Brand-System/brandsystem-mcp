# M001-L20 - Durable Shared Rate Limit Enforcement

**Status:** Done - implementation and hosted proof complete
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

Starting blocker:

- Process-local fixed-window limiting is not durable across Vercel instances.
- Public release still requires durable shared enforcement evidence and
  explicit Jason release approval.

## Closeout

Implemented:

- Added optional durable shared Redis REST rate-limit enforcement using
  `@upstash/redis`.
- Durable env contract:
  `BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_URL` and
  `BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_TOKEN`, with support for standard
  `UPSTASH_REDIS_REST_*` and `KV_REST_API_*` names.
- Preserved in-process memory enforcement as the local/test and pre-release
  fallback when no shared store env is configured.
- Kept limiter keys scoped to environment, brand slug, and API key id.
- Preserved `429 rate_limited`, `retry-after`, and `x-ratelimit-*` headers.
- Added fail-closed `503 rate_limit_unavailable` before MCP dispatch when a
  configured durable shared store is unavailable.
- Updated `brand_status.rate_limits` to distinguish
  `active_durable_shared`, `active_pre_release_in_process`, `unavailable`, and
  `disabled`.

Hosted proof:

- Jason provisioned Vercel/Upstash KV/Redis Preview env for `brandsystem-mcp`.
- Rotated `BRANDCODE_MCP_TEST_KEYS` after an unsafe terminal echo and restored
  it through the Vercel API for all Preview branches (`gitBranch: null`).
- Deployed fresh Preview:
  `https://brandsystem-kqrdhx4pe-column-five.vercel.app`.
- Re-aliased staging:
  `https://mcp.staging.brandcode.studio`.
- `brand_status` through the MCP Streamable HTTP client reported
  `rate_limits.status: "active_durable_shared"`,
  `enforcement: "durable_shared_redis_fixed_window"`,
  `scope: "per_key_per_brand"`, `limit: 60`, and Redis source
  `KV_REST_API_URL/KV_REST_API_TOKEN`.
- Hosted smoke passed against
  `https://mcp.staging.brandcode.studio/brandcode` with the package-safe asset
  id `brandcode:logo:c5-logomark-red.svg`: `fail: 0`, `blocked: 0`,
  `skipped: 0`.
- Public release remains blocked until Jason explicitly approves release.

Verification:

- `git diff --check` passed.
- `npm test -- --run test/hosted/router.test.ts test/hosted/tools.test.ts`
  passed: 60 tests.
- `npm run lint` passed.
- `npm run build` passed.
- Full `npm test` passed: 39 files, 530 tests.

Remote CI proof:

- Jason authorized push.
- Pushed commit: `cc94bee Add durable hosted rate limit enforcement`.
- GitHub CI run: `25687209671`.
- URL:
  `https://github.com/Brandcode-Studio/brandsystem-mcp/actions/runs/25687209671`.
- Result: success.
- Matrix jobs: Node 20, Node 22, and Node 24 all passed.
- Steps passed in all three jobs: `npm ci`, `npm run build`, `npm run lint`,
  `npm test`, and `npm audit --audit-level=high`.

Hosted proof verification:

- `vercel env ls preview` showed `BRANDCODE_MCP_TEST_KEYS`,
  `KV_REST_API_URL`, and `KV_REST_API_TOKEN` configured for Preview.
- `vercel deploy --yes` produced deployment
  `dpl_JBkvaUum93YAzP52jAUmkw7kgu2C`, ready at
  `https://brandsystem-kqrdhx4pe-column-five.vercel.app`.
- `vercel alias set https://brandsystem-kqrdhx4pe-column-five.vercel.app
  mcp.staging.brandcode.studio` succeeded.
- Streamable HTTP MCP `brand_status` proof passed with
  `rate_limits.status: "active_durable_shared"`.
- `npm run smoke:hosted-mcp -- --json` passed against the staging alias with
  full/read key postures and package-safe asset proof.

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
