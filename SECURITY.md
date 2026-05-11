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
release after hardening.

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

Public Brandcode MCP release still requires explicit Jason approval plus final
retention/deletion/export language, abuse handling, rate-limit operations,
package/source posture, and QC/CI gates. Brandcode MCP directory metadata,
public listing copy, npm publish, production release, and launch claims remain
deferred.

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
- Retention posture is approved as limited and review-oriented, but final
  public retention/deletion/export language is not approved for launch yet.
  Public launch requires that language or a named Jason-approved blocker owner
  before directory submission.
- General hosted AgentRun telemetry POST remains deferred; only explicit
  `brand_feedback` append is active.

### Rate Limits And Abuse

- Phase 0 expects hosted Brandcode MCP to be protected by per-brand limits and
  abuse controls before public release.
- Current hosted router enforcement is an in-process fixed-window limiter,
  keyed by environment, brand slug, and API key id. Defaults are 60
  authenticated requests per 60 seconds. Operators may adjust staging with
  `BRANDCODE_MCP_RATE_LIMIT_REQUESTS_PER_WINDOW` and
  `BRANDCODE_MCP_RATE_LIMIT_WINDOW_SECONDS`, or temporarily disable with
  `BRANDCODE_MCP_RATE_LIMIT_DISABLED=1`.
- `brand_status.rate_limits.status` reports
  `active_pre_release_in_process` when called through the hosted HTTP route and
  includes configured limit, remaining count, window, reset, enforcement, and
  release-gate fields. HTTP responses include `x-ratelimit-*` headers and
  return JSON `429 rate_limited` with `retry-after` when exceeded.
- This is active pre-release enforcement, not a production launch claim.
  Because it is process-local, public release remains blocked until Brandcode
  uses durable shared enforcement across hosted instances or Jason approves a
  named operations owner and abuse-handling policy.
