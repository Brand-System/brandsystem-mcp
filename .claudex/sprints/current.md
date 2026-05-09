# Current Sprint

**Active sprint:** M001 - Brandcode MCP stabilization and v0.1 proof
**Status:** Active
**Started:** 2026-05-08
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`

## Sprint Objective

Turn the implemented Brandcode hosted MCP surface into a clean v0.1 release candidate with truthful CI posture, repeatable hosted proof, and explicit alignment with UCS portable runtime / Runtime Admin semantics.

## Current Truth

- Local `main` includes M001 coordination through M001-L02 plus hosted env-name normalization and has not been pushed.
- Latest GitHub CI baseline before M001-L01 was `61218ac`, and that CI is green.
- The seven hosted implementation commits from `9cd1c77` through `40e94a0` landed as one push batch; only the tip got CI.
- The `40e94a0` CI failure was `npm audit`; build, lint, and tests passed at the cumulative hosted MCP state.
- The audit issue was repaired by `61218ac`.
- Hosted code now reports all 8 locked Use MCP tools as real.
- Staging route proof now passes at `https://mcp.staging.brandcode.studio/brandcode`.
- Vercel Authentication is off for the hosted MCP route; app-level bearer auth remains enforced.
- `brand_feedback` append proof now passes with `append_status: recorded`.
- Hosted MCP service-token config now uses `BRANDCODE_MCP_SERVICE_TOKEN`, matching the UCS env var name.
- Untracked local files `.claude/` and `prompt` are not sprint artifacts and should remain untouched unless Jason explicitly asks.
- M001-L01 added repo-native hosted proof via `npm run smoke:hosted-mcp`.
- The smoke harness help and env-missing paths run locally without secrets; live hosted proof still requires `BRANDCODE_MCP_SMOKE_URL`, `BRANDCODE_MCP_SMOKE_FULL_KEY`, and optional read/asset/feedback inputs.
- M001-L02 refreshed the Use MCP roadmap/product spine so it no longer describes implemented hosted tools as stubs.
- The roadmap now frames Full Brand Runtime as the default hosted object, keeps selected/campaign kits out of v0.1 default, and treats `brand_feedback` as append-only review input.

## Lanes

| Lane | Status | Packet | Goal |
| --- | --- | --- | --- |
| M001-L01 | Done | `.claudex/packets/M001-L01-hosted-proof-harness.md` | Add a repeatable hosted MCP smoke harness and refresh docs so the next hosted proof cannot drift into chat-only claims. |
| M001-L02 | Done | `.claudex/packets/M001-L02-roadmap-alignment-delta.md` | Refresh `specs/brandcode-mcp-use-roadmap-alignment.md` against the now-real 8-tool implementation and latest UCS portable runtime semantics. |
| M001-L03 | Done | Manual proof captured in `.claudex/messages/M001-messages.md` | Resolve staging-domain/deployment-protection proof once DNS or Vercel access is available. |
| M001-L04 | Done | Manual proof captured in `.claudex/messages/M001-messages.md` | Prove `brand_feedback` append against UCS history once a real service token exists. |
| M001-L05 | Ready | `.claudex/packets/M001-L05-v0.1-release-readiness.md` | Cut v0.1 release/readiness posture after CI, staged route, real MCP client, scope, and feedback proof are complete. |

## Blockers And Decisions

- Remaining release-readiness decision: whether `get_brand_asset` needs explicit asset-id proof before v0.1 or can remain covered by list/catalog tests until a stable staging asset id is selected.
- Remaining process decision: whether to push the local M001 commits plus env-name normalization before opening a release-readiness PR/checkpoint.

## Ready Lane Rule

Automation should pick up exactly one Ready lane: **M001-L05**. Do not add tools; prepare v0.1 release/readiness posture from the now-proved staging surface.
