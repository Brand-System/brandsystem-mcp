# Brandcode MCP Pre-Release Hardening Plan

**Status:** Draft hardening map
**Date:** 2026-05-08
**Applies to:** hosted `@brandcode/mcp` Use MCP
**Release posture:** no public release, npm publish, or MCP directory submission until Jason explicitly authorizes it after hardening.

## Position

Brandcode MCP should not ship as soon as the first staging proof passes. The first public release will be evaluated by MCP directories, security/trust scoring models, and review sites, and poor initial ratings can linger. The pre-release target is A-grade production trust: clear license posture, strong security posture, broad tests, repeated hosted proof, and high-quality directory metadata before any public launch.

## Current Proven Surface

- Staging URL: `https://mcp.staging.brandcode.studio/brandcode`
- Hosted service-token env: `BRANDCODE_MCP_SERVICE_TOKEN`
- Locked tool surface: exactly 8 tools.
- Staging smoke has passed for:
  - MCP `initialize`
  - `tools/list` exact locked order
  - `brand_status`
  - `brand_runtime`
  - `brand_search`
  - `list_brand_assets`
  - `brand_check`
  - `brand_history`
  - `brand_feedback` with `append_status: recorded`
  - read-only insufficient-scope behavior for `brand_check`
  - read-only insufficient-scope behavior for `brand_feedback`
- Remaining known smoke gap: `get_brand_asset` needs a stable `BRANDCODE_MCP_SMOKE_ASSET_ID`.

## Hardening Workstreams

### 1. License And Terms

Decisions needed before release:

- Whether `@brandcode/mcp` inherits the repo MIT license or needs separate package/service terms.
- Whether hosted MCP use requires terms that cover bearer-key access, rate limits, feedback history, brand asset metadata, and abuse handling.
- Whether README/package metadata must distinguish OSS package code from hosted Brandcode service access.

Acceptance:

- `LICENSE`, `package.json`, README, and directory metadata tell one consistent story.
- Hosted-service behavior is not accidentally implied to be public/open/free beyond the Phase 0 lock.

### 2. Security And Privacy

Hardening checks:

- Bearer-token parsing rejects malformed auth.
- Staging accepts only `bck_test_` keys; production accepts only `bck_live_` keys.
- Per-tool scopes are enforced for all 8 tools.
- Slug authorization is enforced.
- `BRANDCODE_MCP_SERVICE_TOKEN` is the only hosted service-token env name.
- Raw private provider URLs are never returned.
- Asset responses keep custody-safe delivery posture.
- Feedback/history responses avoid leaking secrets, raw provider URLs, private blobs, or excessive telemetry.
- CORS/OPTIONS behavior is deliberate for MCP clients.
- Rate-limit posture is either implemented or explicitly reported as not yet active.
- CI includes build, lint, tests, and high-severity audit.

Acceptance:

- Security checklist exists with evidence links or commands.
- Any missing rate-limit/abuse control is a named blocker or deferral, not silent.

### 3. Tests And Fixtures

Required coverage expansion:

- Hosted auth matrix: missing bearer, invalid token, wrong environment prefix, wrong slug, read-only key, check-only key, feedback-only key, full key.
- Tool behavior for malformed or partial hosted packages.
- `get_brand_asset` with a real stable asset id.
- Asset redaction tests for private provider URLs.
- `brand_feedback` append contract and upstream error mapping.
- `brand_history` receipt-chain shape.
- Smoke harness strict mode.

Acceptance:

- Full local suite passes.
- Hosted smoke passes in staging with full/read-only keys and, ideally, a real asset id.
- CI runs on the M001 state before any release claim.

### 4. Directory And Scoring Model Prep

Surfaces to review before public launch:

- Glama listing/scoring.
- LobeHub listing/scoring.
- Smithery metadata.
- MCP Registry/server metadata.
- `README.md`
- `llms.txt`
- `server.json`
- `glama.json`
- `smithery.yaml`
- `SECURITY.md`

Acceptance:

- Metadata is explicit that this is the hosted Use MCP sibling of `@brandsystem/mcp`.
- Tool count is exactly 8.
- Auth and scopes are clear.
- No build/extract/compile capability is implied.
- Security and privacy posture is easy for reviewers to understand.

### 5. Battle Testing

Before release, run realistic hosted use across:

- Brandcode brand.
- At least one non-Brandcode Studio brand if available.
- Full key and read-only key.
- At least two MCP clients where practical.
- All 8 tools, including append-only feedback and asset fetch.

Acceptance:

- Failures become packets, not chat-only notes.
- No product claim is made from only local proof when hosted or human-visible proof is needed.

## Suggested Lane Sequence

1. **M001-L06 License And Directory Trust Audit**
   Complete. Audited license/package/directory/security docs and produced a gap list with no code behavior changes.

2. **M001-L07 Security Matrix And Rate-Limit Posture**
   Expand hosted auth/scope/security tests and document or implement rate-limit posture.

3. **M001-L08 Asset Fetch And Custody Proof**
   Select a stable staging asset id, prove `get_brand_asset`, and harden private custody redaction proof.

4. **M001-L09 Multi-Client Battle Test**
   Run staging smoke and manual client proof across real MCP clients and brands.

5. **M001-L10 Release Candidate Review**
   Only after the above, decide whether the repo is ready for a release candidate. This is still not publish unless Jason explicitly says publish.

## Current Next Ready Lane

M001-L07 should be the next Ready lane: **Security Matrix And Rate-Limit Posture**.
