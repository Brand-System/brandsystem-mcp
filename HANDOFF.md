# HANDOFF

## Current State

Active sprint: M001 - Brandcode MCP stabilization and v0.1 proof.

The hosted Brandcode Use MCP implementation has all 8 locked v0.1 tools wired in code, and current `main` is green at `61218ac`. The sprint is not about adding tools. It is about making the v0.1 proof story repeatable and truthful.

## Latest PO Work

Seeded repo-native sprint coordination:

- `.claudex/sprints/current.md`
- `.claudex/sprints/m001-brandcode-mcp-stabilization.md`
- `.claudex/packets/M001-L01-hosted-proof-harness.md`
- `.claudex/prompts/M001-L01-hosted-proof-harness.md`
- `.claudex/messages/M001-messages.md`

## Next Ready Lane

Pick up M001-L01: Hosted Proof Harness And Truth Spine.

The goal is to add a configurable smoke harness for hosted Streamable HTTP MCP proof and update docs so staging proof cannot remain only in chat.

## Known Blockers

- DNS/alias/cert must be configured before exact `https://mcp.staging.brandcode.studio/{slug}` proof can close.
- A real UCS service token is required before `brand_feedback` append proof can close.
- Vercel deployment protection or bypass posture must be resolved before direct external MCP client proof can close.

## Local Hygiene

Untracked `.claude/` and `prompt` existed before M001 coordination work and should remain untouched unless Jason explicitly asks.
