# Security Policy

## Reporting a Vulnerability

Email security@brandcode.studio (or open a GitHub security advisory) with:
- Description of the vulnerability
- Steps to reproduce
- Impact assessment

We will acknowledge within 48 hours and provide a fix timeline within 7 days.

## Security Posture
- All tool inputs validated with Zod schemas
- SVG sanitization via Cheerio DOM whitelist
- SSRF protection with DNS resolution and private IP blocking
- 0 known npm vulnerabilities (audited in CI)
- Signed npm publishes with provenance attestation

## Hosted Brandcode MCP Trust Posture

The hosted `@brandcode/mcp` Use MCP is pre-release. Do not publish,
release, or submit it to MCP directories until Jason explicitly authorizes
release after hardening. The current hosted data-policy draft is
[`specs/brandcode-mcp-hosted-data-policy.md`](specs/brandcode-mcp-hosted-data-policy.md),
and the limited-client rollout guardrails live in
[`specs/brandcode-mcp-limited-client-readiness-plan.md`](specs/brandcode-mcp-limited-client-readiness-plan.md).
The limited-client onboarding template is
[`specs/brandcode-mcp-limited-client-onboarding-template.md`](specs/brandcode-mcp-limited-client-onboarding-template.md),
the limited-client key operations runbook is
[`specs/brandcode-mcp-limited-client-key-ops-runbook.md`](specs/brandcode-mcp-limited-client-key-ops-runbook.md),
the limited-client support intake ledger is
[`specs/brandcode-mcp-limited-client-support-intake-ledger.md`](specs/brandcode-mcp-limited-client-support-intake-ledger.md),
the deletion/export launch decision brief is
[`specs/brandcode-mcp-deletion-export-launch-decision-brief.md`](specs/brandcode-mcp-deletion-export-launch-decision-brief.md),
and the internal Column Five Brandcode staging proof is
[`specs/brandcode-mcp-column-five-brandcode-staging-onboarding-proof.md`](specs/brandcode-mcp-column-five-brandcode-staging-onboarding-proof.md).

### Hosted Service Release Gate

The hosted-service terms posture is approved, but the release gate remains
**blocked**. Staging proof is strong enough to review the locked 8-tool
surface, but it is not production service approval.

Jason approved this hosted-service posture:

- approved-brand, bearer-key-only, pre-release hosted access;
- client-owned or client-controlled brand data;
- append-only `brand_feedback`, not canonical mutation;
- scoped, compact, redacted `brand_history`;
- package-safe asset delivery only;
- no public "free in v1" launch copy until pricing/limits are settled;
- hosted service access stays separate from source/package license.

Jason chose to defer public `@brandcode/mcp` package/source distribution for
v0.1 limited-client work. Approved limited clients may use the hosted service
with brand-scoped bearer keys only after client/brand approval, scoped key
issuance, per-client hosted smoke proof, support/abuse/deletion/export intake,
package-safe custody checks, the key operations runbook, and the support intake
ledger. Public Brandcode MCP release still requires explicit Jason approval
plus final deletion/export request handling, support/legal launch language, any
future public package/source posture, directory metadata, and QC/CI gates.
Brandcode MCP directory metadata, public listing copy, npm publish, production
release, and launch claims remain deferred.

### Auth And Scopes

- Hosted clients connect with `Authorization: Bearer ...` on a brand-scoped
  path such as `https://mcp.brandcode.studio/{slug}`.
- Staging keys must use the `bck_test_` prefix. Production keys must use the
  `bck_live_` prefix. Wrong-environment prefixes are rejected.
- Keys are scoped to allowed brand slugs. A valid key for one slug must not read
  another slug.
- The locked v0.1 tool surface is exactly 8 tools:
  - `read`: `brand_runtime`, `brand_search`, `brand_status`,
    `list_brand_assets`, `get_brand_asset`, `brand_history`
  - `check`: `brand_check`
  - `feedback`: `brand_feedback`
- `brand_feedback` is append-only review input. It does not approve, apply, or
  mutate canonical governance.

### Service Token

- Hosted MCP to UCS calls use `BRANDCODE_MCP_SERVICE_TOKEN`.
- The legacy `UCS_SERVICE_TOKEN` name is intentionally not accepted by this
  repo.
- The service token is only for server-to-server hosted package, feedback, and
  history calls. It must not be returned in MCP responses, logs, receipts, or
  directory metadata.

### Custody And Privacy

- Hosted asset tools return package-safe metadata and delivery references.
  Raw private provider URLs, private blob URLs, and raw custody paths must not
  be returned.
- `get_brand_asset` blocks private-provider-only delivery instead of
  substituting or exposing the raw private URL.
- `brand_feedback` writes explicit operator feedback to UCS history for
  review. It is append-only review input, not general telemetry, approval,
  or canonical governance mutation.
- `brand_history` is read-only and returns compact run/receipt summaries scoped
  by brand and key permissions. It redacts URL-like strings and avoids
  returning large nested support or verification blobs.
- Retention posture is approved as limited and review-oriented and is now
  captured in the hosted data-policy draft. The MCP does not expose public
  self-serve deletion or export tools for hosted feedback/history. During
  pre-release, deletion/export requests route to Jason Lankow / Brandcode
  Studio Ops for manual review. Public launch still requires Jason/legal/ops
  approval of requester authorization, deletion/export scope, export package
  format, response windows, support escalation, and any required legal or
  subprocessor language. Those launch decisions are framed in
  [`specs/brandcode-mcp-deletion-export-launch-decision-brief.md`](specs/brandcode-mcp-deletion-export-launch-decision-brief.md);
  the brief does not approve launch copy, public timelines, or self-serve
  deletion/export operations.
- General hosted AgentRun telemetry POST remains deferred; only explicit
  `brand_feedback` append is active.

### Rate Limits And Abuse

- Phase 0 expects hosted Brandcode MCP to be protected by per-brand limits and
  abuse controls before public release.
- Current hosted router enforcement supports a durable shared Redis REST
  fixed-window limiter, keyed by environment, brand slug, and API key id. The
  limiter becomes durable/shared when the hosted environment provides
  `BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_URL` and
  `BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_TOKEN`; standard
  `UPSTASH_REDIS_REST_*` or `KV_REST_API_*` Vercel/Upstash env names are also
  accepted. Without those env vars, the router falls back to in-process memory
  enforcement for local tests and pre-release development only.
- Defaults are 60 authenticated requests per 60 seconds. Operators may adjust
  limits with `BRANDCODE_MCP_RATE_LIMIT_REQUESTS_PER_WINDOW` and
  `BRANDCODE_MCP_RATE_LIMIT_WINDOW_SECONDS`, or temporarily disable with
  `BRANDCODE_MCP_RATE_LIMIT_DISABLED=1`.
- `brand_status.rate_limits.status` reports
  `active_durable_shared` when Redis REST enforcement is active, or
  `active_pre_release_in_process` for the local/test fallback. It includes
  configured limit, remaining count, window, reset, enforcement, and
  release-gate fields. HTTP responses include `x-ratelimit-*` headers and
  return JSON `429 rate_limited` with `retry-after` when exceeded.
- If the durable shared store is configured but unavailable, hosted requests
  fail closed with JSON `503 rate_limit_unavailable` before MCP tool dispatch.
- Broad public release remains blocked until durable/shared hosted proof is
  command-backed and Jason explicitly approves release.
- Pre-release abuse response owner: Jason Lankow / Brandcode Studio Ops
  `<jlankow@columnfive.com>`.
- Pre-release authority: the owner may revoke, rotate, suspend, or throttle
  hosted Brandcode MCP API keys for abuse, leaked keys, excessive traffic,
  security risk, or service-stability risk.
- Limited-client key operations, including staging key generation, production
  gating, rotation, revocation, suspected leak response, safe command shapes,
  and redacted proof capture, are documented in
  [`specs/brandcode-mcp-limited-client-key-ops-runbook.md`](specs/brandcode-mcp-limited-client-key-ops-runbook.md).
