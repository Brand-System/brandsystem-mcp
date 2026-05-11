# Build Lane Prompt - M001-L20 Durable Shared Rate Limit Enforcement

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L20-durable-shared-rate-limit-enforcement.md`
- `HANDOFF.md`
- `SECURITY.md`
- `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`
- `src/hosted/rate-limit.ts`
- `src/hosted/router.ts`
- `src/hosted/tools/status.ts`
- hosted env/router/status tests

Task:

Implement durable shared hosted rate-limit enforcement for the Brandcode Use
MCP, or record the exact missing substrate blocker if this repo cannot do it
truthfully.

Current truth:

- M001-L19 added process-local fixed-window pre-release enforcement.
- Pre-release abuse response owner is Jason Lankow / Brandcode Studio Ops
  `<jlankow@columnfive.com>`.
- Owner authority covers revoke, rotate, suspend, or throttle hosted Brandcode
  MCP API keys for abuse, leaked keys, excessive traffic, security risk, or
  service-stability risk.
- Jason chose durable shared rate limiting as the next lane before broad public
  release.

Preferred implementation:

- Use an approved shared substrate already available to this project, or add
  the smallest truthful env/dependency contract needed.
- Keep limits keyed by environment, brand slug, and API key id.
- Preserve structured `429 rate_limited`, `retry-after`, and `x-ratelimit-*`
  headers.
- Preserve process-local fallback only when the durable substrate is absent and
  clearly report that posture.
- Update `brand_status.rate_limits` to distinguish durable/shared enforcement
  from process-local fallback.

Do not publish, release, submit to directories, change public listing metadata,
add hosted tools, relax custody, add public pricing copy, or imply release-gate
satisfaction without command-backed hosted proof and explicit Jason release
approval.

Verification:

- `git diff --check`
- focused hosted rate-limit/router/status tests
- `npm run lint`
- `npm run build`
- full `npm test` if shared hosted behavior changes

Closeout:

- update `.claudex/sprints/current.md`, the L20 packet,
  `.claudex/messages/M001-messages.md`, and `HANDOFF.md`
- leave exactly one next Ready lane or a named Jason decision blocker
- commit to `main`
- do not push unless Jason asks or hosted verification requires current remote
