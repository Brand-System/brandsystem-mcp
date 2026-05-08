# Current Sprint

**Active sprint:** M001 - Brandcode MCP stabilization and v0.1 proof
**Status:** Active
**Started:** 2026-05-08
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`

## Sprint Objective

Turn the implemented Brandcode hosted MCP surface into a clean v0.1 release candidate with truthful CI posture, repeatable hosted proof, and explicit alignment with UCS portable runtime / Runtime Admin semantics.

## Current Truth

- `main` is synced with `origin/main` at `61218ac`.
- Latest GitHub CI for `61218ac` is green.
- The seven hosted implementation commits from `9cd1c77` through `40e94a0` landed as one push batch; only the tip got CI.
- The `40e94a0` CI failure was `npm audit`; build, lint, and tests passed at the cumulative hosted MCP state.
- The audit issue was repaired by `61218ac`.
- Hosted code now reports all 8 locked Use MCP tools as real.
- Prior hosted proof reached a Vercel preview through `vercel curl`, but exact staging-domain and real-client proof are still blocked.
- Exact staging URL proof is blocked until `mcp.staging.brandcode.studio` DNS/alias/certificate is configured.
- `brand_feedback` append proof is blocked until a real UCS service token is provisioned.
- Direct external MCP client proof is blocked while Vercel deployment protection prevents normal unauthenticated HTTP access to the preview.
- Untracked local files `.claude/` and `prompt` are not sprint artifacts and should remain untouched unless Jason explicitly asks.

## Lanes

| Lane | Status | Packet | Goal |
| --- | --- | --- | --- |
| M001-L01 | Ready | `.claudex/packets/M001-L01-hosted-proof-harness.md` | Add a repeatable hosted MCP smoke harness and refresh docs so the next hosted proof cannot drift into chat-only claims. |
| M001-L02 | Queued | TBD | Refresh `specs/brandcode-mcp-use-roadmap-alignment.md` against the now-real 8-tool implementation and latest UCS portable runtime semantics. |
| M001-L03 | Queued | TBD | Resolve staging-domain/deployment-protection proof once DNS or Vercel access is available. |
| M001-L04 | Queued | TBD | Prove `brand_feedback` append against UCS history once a real service token exists. |
| M001-L05 | Queued | TBD | Cut v0.1 release/readiness posture only after CI, staged route, real MCP client, scope, and feedback proof are all complete. |

## Blockers And Decisions

- Jason decision / infra action: configure DNS for `mcp.staging.brandcode.studio` as required by Vercel.
- Jason decision / secret action: provision a real UCS service token usable by the hosted MCP for history append.
- Jason decision / Vercel action: choose whether staging MCP should be public, bypass-token protected, or otherwise reachable by real MCP clients during proof.

## Ready Lane Rule

Automation should pick up exactly one Ready lane: **M001-L01**. Do not start queued lanes until L01 is committed and the sprint docs are updated.
