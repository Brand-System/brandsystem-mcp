# Current Sprint

**Active sprint:** M001 - Brandcode MCP stabilization and pre-release hardening
**Status:** Active
**Started:** 2026-05-08
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`

## Sprint Objective

Turn the implemented Brandcode hosted MCP surface into an A-grade pre-release candidate with truthful CI posture, repeatable hosted proof, explicit UCS portable-runtime alignment, license clarity, security hardening, directory-score readiness, and battle-tested functionality.

## Current Truth

- Local `main` includes M001 coordination through the M001-L12 multi-client battle test and has not been pushed.
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
- M001-L06 completed the license/package/directory/security trust audit and found the release blocker is hosted-service terms plus hosted security/privacy/rate-limit posture, not the MIT license for Build package code.
- M001-L07 expanded local hosted auth/security coverage for malformed bearer headers, wrong-environment key prefixes, all 8 tool scope requirements, and the canonical service-token env name; `SECURITY.md` now documents hosted auth, scopes, service-token, custody/privacy, and rate-limit posture.
- M001-L08 deployed the local custody hardening to staging and proved `get_brand_asset` against `https://mcp.staging.brandcode.studio/brandcode` with `brandcode:logo:c5-logomark-red.svg`.
- L08 proof result: the current Brandcode hosted package has no package-safe asset delivery refs; all six listed staging assets report `blocked_private_provider_url`.
- The hosted smoke harness now treats that posture as `blocked`, not `fail`, when the MCP returns the asset metadata, marks it unsafe for MCP delivery, and exposes no raw private/provider URLs.
- M001-L09 traced the package-safe asset fixture upstream to UCS, not the MCP: hosted `get_brand_asset` reads `GET /api/brand/hosted/{slug}/pull`, which uses the UCS compiled Brandcode payload from `app/tools/lib/brand-adapter-runtime.ts`, `app/tools/lib/compiled-brand-runtime.ts`, and `app/tools/lib/compiled-brand-asset-manifests.ts`.
- The current Brandcode compiled asset `brandcode:logo:c5-logomark-red.svg` has `refs.publicUrl` and root-relative runtime URLs, but no package materialization field accepted by the MCP custody contract: no `deliveryRef.packagePath`, no `packagePath`, no `package_url`, and no equivalent package-safe delivery ref.
- M001-L10 repaired the upstream UCS compiled package data locally without relaxing MCP custody: `brandcode:logo:c5-logomark-red.svg` now carries `deliveryRef: { posture: "package_safe", packagePath: "brandcode-brand-runtime/visual/assets/logo/c5-logomark-red.svg" }`, `inRuntimePackage: true`, and `lifecycle: "production-approved"` through the UCS compiled Brandcode payload.
- M001-L10 local proof passed against the UCS compiled adapter payload, but hosted smoke was blocked because the current shell has no `BRANDCODE_MCP_SMOKE_URL` or `BRANDCODE_MCP_SMOKE_FULL_KEY`, and the UCS change has not been pushed/deployed because Jason did not authorize push in the prompt.
- M001-L11 verified UCS `origin/main` contains `37585f98 Add Brandcode package asset delivery ref`, and hosted smoke passed against `https://mcp.staging.brandcode.studio/brandcode` with `BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg`.
- L11 hosted proof result: `get_brand_asset` returned `custody.safe_for_mcp: true`, `custody.blocked_private_provider_url: false`, `delivery_posture: "package_safe"`, `delivery_ref_kind: "package_path"`, and no raw private/provider URL exposure.
- M001-L12 first exposed a proof-infra gap: Vercel CLI non-interactive `env add/update` could not replace the empty sensitive Preview test-key value, and `vercel env pull --environment=preview --yes` redacts sensitive values locally.
- M001-L12 then resolved the proof-input blocker through the interactive Vercel env flow: `BRANDCODE_MCP_TEST_KEYS` is populated for Preview/all branches, staging was redeployed, and `mcp.staging.brandcode.studio` now aliases `https://brandsystem-eipxqt3go-column-five.vercel.app`.
- M001-L12 hosted smoke passed with full/read key postures and package-safe asset id `brandcode:logo:c5-logomark-red.svg`.
- M001-L12 MCP Inspector proof passed: `tools/list` returned the locked 8-tool order, `get_brand_asset` returned package-safe delivery without raw private/provider URLs, and read-only `brand_check` returned structured `insufficient_scope`.
- M001-L12 Claude Code proof passed through a temporary HTTP MCP config: Claude called `brand_status` and `get_brand_asset`, reported 8 implemented tools, package-safe asset posture, and no raw private/provider URL exposure.

## Lanes

| Lane | Status | Packet | Goal |
| --- | --- | --- | --- |
| M001-L01 | Done | `.claudex/packets/M001-L01-hosted-proof-harness.md` | Add a repeatable hosted MCP smoke harness and refresh docs so the next hosted proof cannot drift into chat-only claims. |
| M001-L02 | Done | `.claudex/packets/M001-L02-roadmap-alignment-delta.md` | Refresh `specs/brandcode-mcp-use-roadmap-alignment.md` against the now-real 8-tool implementation and latest UCS portable runtime semantics. |
| M001-L03 | Done | Manual proof captured in `.claudex/messages/M001-messages.md` | Resolve staging-domain/deployment-protection proof once DNS or Vercel access is available. |
| M001-L04 | Done | Manual proof captured in `.claudex/messages/M001-messages.md` | Prove `brand_feedback` append against UCS history once a real service token exists. |
| M001-L05 | Done | `.claudex/packets/M001-L05-pre-release-hardening-map.md` | Map license, security, tests, directory scoring, and battle-test work before any release. |
| M001-L06 | Done | `.claudex/packets/M001-L06-license-directory-trust-audit.md` | Audit license/package/directory/security trust posture and produce a pre-release gap list. |
| M001-L07 | Done | `.claudex/packets/M001-L07-security-matrix-rate-limit-posture.md` | Expand hosted auth/scope/security verification and document or implement rate-limit posture. |
| M001-L08 | Done | `.claudex/packets/M001-L08-asset-fetch-custody-proof.md` | Prove `get_brand_asset` with a stable staging asset id and harden custody proof. |
| M001-L09 | Done - upstreamed | `.claudex/packets/M001-L09-package-safe-asset-fixture.md` | Coordinate a stable package-safe Brandcode asset fixture so hosted `get_brand_asset` can pass package delivery proof before battle testing. |
| M001-L10 | Done | `.claudex/packets/M001-L10-ucs-package-asset-delivery-ref.md` | Repair the upstream UCS Brandcode compiled/runtime package data so one stable asset has a real package-safe delivery ref, then rerun hosted smoke. |
| M001-L11 | Done | `.claudex/packets/M001-L11-hosted-package-asset-smoke-proof.md` | Confirm UCS staging freshness for the local package-safe asset repair and rerun hosted smoke with the package-safe asset id. |
| M001-L12 | Done | `.claudex/packets/M001-L12-multi-client-battle-test.md` | Battle test the locked hosted 8-tool surface across real MCP clients before any release candidate review. |
| M001-L13 | Ready | `.claudex/packets/M001-L13-release-candidate-trust-review.md` | Review the pre-release trust posture and decide the next repair lane before any release candidate claim. |

## Blockers And Decisions

- Jason decision: no publish, public release, or MCP directory submission until hardening is much stronger and Jason explicitly authorizes release.
- Jason decision: hosted Brandcode MCP needs explicit service terms before public release; decide package/source license posture for `@brandcode/mcp` and terms for bearer-key access, rate limits, feedback/history privacy, custody, and abuse handling.
- L11 resolved the hosted package asset proof blocker for `brandcode:logo:c5-logomark-red.svg`.
- L12 resolved the hosted client credential blocker for Preview through Vercel env provisioning and did not commit secrets to the repo.
- Rate-limit/abuse posture is documented as `not_reported_by_staging`; production release still needs active enforcement or an explicit Jason-approved blocker owner.
- Remaining process decision: whether to push the local M001 commits plus env-name normalization before opening hardening/audit lanes.

## Ready Lane Rule

Automation should pick up exactly one Ready lane: **M001-L13**. Do not publish, release, submit to directories, add tools, or relax private custody. Review the full pre-release trust posture, including CI/push status, hosted-service terms, rate-limit/abuse posture, directory metadata, and remaining scoring risks; turn any blocker into a durable repair packet or named Jason decision.
