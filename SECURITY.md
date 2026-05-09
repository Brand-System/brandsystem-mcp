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

The hosted-service terms and rate-limit gate is **blocked**. Staging proof is
strong enough to review the locked 8-tool surface, but it is not production
service approval.

Public Brandcode MCP release requires Jason approval for:

- hosted bearer-key access terms;
- client-owned brand data and privacy commitments;
- `brand_feedback` and `brand_history` retention/visibility;
- private custody guarantees and package-safe delivery limits;
- abuse handling, service availability, and operational ownership;
- rate-limit enforcement or a named Brandcode operations owner;
- public copy for "free in v1 for active Brandcode Studio brands";
- `@brandcode/mcp` source/package posture: MIT, proprietary, dual-positioned,
  or service-only.

Until those decisions are made, Brandcode MCP directory metadata, public
listing copy, npm publish, production release, and launch claims remain
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
- Retention policy for feedback/history is not approved for public release
  yet. Public launch requires an explicit retention/visibility policy or a
  named Jason-approved blocker owner before directory submission.
- General hosted AgentRun telemetry POST remains deferred; only explicit
  `brand_feedback` append is active.

### Rate Limits And Abuse

- Phase 0 expects hosted Brandcode MCP to be protected by per-brand limits and
  abuse controls before public release.
- Current staging status reports rate limits as `not_reported_by_staging`.
  This is an explicit pre-release posture, not a production claim.
- `brand_status.rate_limits` reports this as `release_gate: "blocked"` with
  blocker owner `Jason decision / Brandcode operations owner`.
- Public release requires command-backed rate-limit reporting/enforcement or a
  Jason-approved operational owner and abuse-handling policy. A directory
  listing must not claim production rate-limit protection from staging's
  `not_reported_by_staging` response.
