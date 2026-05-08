# HANDOFF

## Current State

Active sprint: M001 - Brandcode MCP stabilization and v0.1 proof.

The hosted Brandcode Use MCP implementation has all 8 locked v0.1 tools wired in code. M001-L01 added a repeatable smoke harness at `npm run smoke:hosted-mcp`; M001-L02 refreshed the Use MCP roadmap so it no longer describes implemented tools as stubs. The sprint is still not about adding tools. It is about making the v0.1 proof story repeatable and truthful.

## Latest PO Work

Seeded repo-native sprint coordination and shaped the next Ready lane:

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

## Next Ready Lane

No lane is Ready for automation.

M001-L03 remains blocked until DNS/alias/cert and Vercel deployment-protection/client access posture are resolved. M001-L04 remains blocked until a real UCS service token exists for feedback append proof.

## Known Blockers

- DNS/alias/cert must be configured before exact `https://mcp.staging.brandcode.studio/{slug}` proof can close.
- A real UCS service token is required before `brand_feedback` append proof can close.
- Vercel deployment protection or bypass posture must be resolved before direct external MCP client proof can close.
- Live harness proof needs `BRANDCODE_MCP_SMOKE_URL`, `BRANDCODE_MCP_SMOKE_FULL_KEY`, and preferably `BRANDCODE_MCP_SMOKE_READ_KEY`.

## Local Hygiene

Untracked `.claude/` and `prompt` existed before M001 coordination work and should remain untouched unless Jason explicitly asks.
