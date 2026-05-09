# HANDOFF

## Current State

Active sprint: M001 - Brandcode MCP stabilization and pre-release hardening.

The hosted Brandcode Use MCP implementation has all 8 locked v0.1 tools wired in code. M001-L01 added a repeatable smoke harness at `npm run smoke:hosted-mcp`; M001-L02 refreshed the Use MCP roadmap so it no longer describes implemented tools as stubs. M001-L03/L04 staging route and feedback append proof now pass. M001-L06 completed the license/package/directory/security trust audit. M001-L07 expanded hosted auth/scope/security proof and documented rate-limit posture. Jason does not want to release yet. The sprint is now about pre-release hardening: hosted-service terms, asset custody proof, directory-score readiness, and battle testing before any public package or directory launch.

## Latest PO Work

Seeded repo-native sprint coordination and carried M001 through M001-L07:

- `.claudex/sprints/current.md`
- `.claudex/sprints/m001-brandcode-mcp-stabilization.md`
- `.claudex/packets/M001-L01-hosted-proof-harness.md`
- `.claudex/prompts/M001-L01-hosted-proof-harness.md`
- `.claudex/packets/M001-L02-roadmap-alignment-delta.md`
- `.claudex/prompts/M001-L02-roadmap-alignment-delta.md`
- `.claudex/packets/M001-L05-pre-release-hardening-map.md`
- `.claudex/prompts/M001-L05-pre-release-hardening-map.md`
- `.claudex/packets/M001-L06-license-directory-trust-audit.md`
- `.claudex/prompts/M001-L06-license-directory-trust-audit.md`
- `.claudex/packets/M001-L07-security-matrix-rate-limit-posture.md`
- `.claudex/packets/M001-L08-asset-fetch-custody-proof.md`
- `.claudex/messages/M001-messages.md`

## Latest Build Work

M001-L07 closed as a focused hosted security hardening lane:

- `test/hosted/auth.test.ts` covers malformed bearer parsing, wrong-environment key prefixes, and the full 8-tool scope matrix for read/check/feedback/full key postures.
- `test/hosted/router.test.ts` proves malformed Authorization headers are rejected at the hosted HTTP boundary.
- Existing env tests keep `BRANDCODE_MCP_SERVICE_TOKEN` as the only accepted service-token env name.
- Existing hosted asset, feedback, and history tests cover private provider URL redaction and compact history/receipt privacy.
- `SECURITY.md` now documents hosted bearer auth, scopes, service-token posture, custody/privacy, feedback/history posture, and rate limits as `not_reported_by_staging`.

M001-L06 closed as a docs-only license and directory trust audit:

- `specs/brandcode-mcp-license-directory-trust-audit.md` records the current release blockers.
- MIT remains clean for the existing `@brandsystem/mcp` Build package code, and `@brandcode/mcp` package/source can likely inherit MIT if Jason chooses that posture.
- Hosted Brandcode MCP still needs explicit service terms for bearer-key access, rate limits, feedback/history retention, private custody, client-owned brand data, and abuse handling.
- Existing listing metadata is Build-oriented and should remain Build-only until a separate Brandcode MCP Use listing is intentionally authored.
- `SECURITY.md` is too thin for hosted Use MCP review; it needs bearer auth, scopes, service-token posture, private custody, feedback/history privacy, and rate-limit/abuse language.

M001-L02 closed as a docs-only roadmap/product-spine update:

- `specs/brandcode-mcp-use-roadmap-alignment.md` now reflects the now-real 8-tool hosted implementation.
- Full Brand Runtime is framed as the default hosted Use MCP object.
- selected Brand Kits and campaign/exploratory kits remain outside default v0.1 until UCS has durable hosted selected-kit publish/share truth.
- `DESIGN.md` is framed as an adapter/readable brief, not runtime authority.
- `brand_feedback` is append-only review/hosted patch-request input, not canonical governance mutation.

M001-L01 closed with a repo-native hosted proof harness:

- `scripts/hosted-mcp-smoke.mjs`
- `npm run smoke:hosted-mcp`
- `test/scripts/hosted-mcp-smoke.test.ts`

The harness uses env-provided endpoint and bearer keys. It verifies MCP initialize/list/tools/core hosted calls and insufficient-scope behavior for `brand_check` and `brand_feedback`. It reports missing live dependencies as `blocked` or `skipped` instead of turning them into chat-only proof.

Latest hosted proof:

- Endpoint: `https://mcp.staging.brandcode.studio/brandcode`
- Deployment: `https://brandsystem-oj1iwfm13-column-five.vercel.app`
- Service-token env: `BRANDCODE_MCP_SERVICE_TOKEN`
- `brand_feedback` append proof: `append_status: recorded`
- Remaining skipped proof: `get_brand_asset` without `BRANDCODE_MCP_SMOKE_ASSET_ID`

## Next Ready Lane

M001-L08 is Ready: Asset Fetch And Custody Proof.

Do not publish, release, submit to MCP directories, or add tools. Prove `get_brand_asset` with a stable staging asset id and keep custody proof explicit, then leave exactly one next Ready lane.

## Known Blockers

- `get_brand_asset` still needs an explicit stable `BRANDCODE_MCP_SMOKE_ASSET_ID` if v0.1 requires asset fetch proof beyond catalog/list tests.
- Local M001 commits are not pushed yet, so GitHub CI has not run for this sprint work.
- License for `@brandcode/mcp` package/source and hosted-service terms are Jason decisions before release.
- Rate limits remain documented as `not_reported_by_staging`; production release needs active enforcement or an explicit Jason-approved blocker owner.

## Local Hygiene

Untracked `.claude/` and `prompt` existed before M001 coordination work and should remain untouched unless Jason explicitly asks.
