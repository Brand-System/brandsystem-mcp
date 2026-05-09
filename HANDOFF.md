# HANDOFF

## Current State

Active sprint: M001 - Brandcode MCP stabilization and v0.1 proof.

The hosted Brandcode Use MCP implementation has all 8 locked v0.1 tools wired in code. M001-L01 added a repeatable smoke harness at `npm run smoke:hosted-mcp`; M001-L02 refreshed the Use MCP roadmap so it no longer describes implemented tools as stubs. M001-L03/L04 staging route and feedback append proof now pass. The sprint is still not about adding tools. It is about making the v0.1 proof story repeatable and truthful.

## Latest PO Work

Seeded repo-native sprint coordination and carried M001 through the first two lanes:

- `.claudex/sprints/current.md`
- `.claudex/sprints/m001-brandcode-mcp-stabilization.md`
- `.claudex/packets/M001-L01-hosted-proof-harness.md`
- `.claudex/prompts/M001-L01-hosted-proof-harness.md`
- `.claudex/packets/M001-L02-roadmap-alignment-delta.md`
- `.claudex/prompts/M001-L02-roadmap-alignment-delta.md`
- `.claudex/messages/M001-messages.md`

## Latest Build Work

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

M001-L05 is Ready: v0.1 Release Readiness.

Do not add tools. Prepare the release/readiness posture from the now-proved staging route and call out any remaining CI, GitHub, package/listing, or asset-id proof gaps.

## Known Blockers

- `get_brand_asset` still needs an explicit stable `BRANDCODE_MCP_SMOKE_ASSET_ID` if v0.1 requires asset fetch proof beyond catalog/list tests.
- Local M001 commits are not pushed yet, so GitHub CI has not run for this sprint work.

## Local Hygiene

Untracked `.claude/` and `prompt` existed before M001 coordination work and should remain untouched unless Jason explicitly asks.
