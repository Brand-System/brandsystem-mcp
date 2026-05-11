# Build Lane Prompt - M001-L19 Hosted Rate Limit And Abuse Posture

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L19-hosted-rate-limit-abuse-posture.md`
- `HANDOFF.md`
- `SECURITY.md`
- `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`
- `src/hosted/router.ts`
- `src/hosted/server.ts`
- `src/hosted/auth.ts`
- `src/hosted/scope.ts`
- `src/hosted/tools/status.ts`

Task:

Harden the hosted Brandcode Use MCP rate-limit and abuse posture. Current
`brand_status.rate_limits.status` is `not_reported_by_staging` with
`release_gate: "blocked"`.

Preferred outcome:

- implement narrow hosted request/tool-call rate limiting if this repo already
  has an acceptable pre-release or durable substrate;
- add focused tests;
- update `brand_status.rate_limits` with truthful configured limits,
  enforcement state, reset/window fields, and release-gate posture.

If no acceptable substrate exists:

- do not fake active enforcement;
- record the exact missing infra or named operations-owner decision as a launch
  blocker;
- keep `brand_status.rate_limits` truthful and test-covered.

Do not publish, release, submit to directories, change public listing metadata,
add hosted tools, relax custody, add public pricing copy, or change UCS unless
the blocker clearly lives there and Jason authorizes that repo scope.

Verification:

- `git diff --check`
- focused hosted tests for rate-limit/status behavior
- `npm run lint`
- `npm run build`
- full `npm test` if shared hosted/router/auth behavior changes

Closeout:

- update `.claudex/sprints/current.md`, the L19 packet,
  `.claudex/messages/M001-messages.md`, and `HANDOFF.md`
- leave exactly one next Ready lane or a named Jason decision blocker
- commit to `main`
- do not push unless Jason asks or hosted verification requires current remote
