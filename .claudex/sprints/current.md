# Current Sprint

**Active sprint:** M001 - Brandcode MCP stabilization and pre-release hardening
**Status:** Active
**Started:** 2026-05-08
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`

## Sprint Objective

Turn the implemented Brandcode hosted MCP surface into an A-grade pre-release candidate with truthful CI posture, repeatable hosted proof, explicit UCS portable-runtime alignment, license clarity, security hardening, directory-score readiness, and battle-tested functionality.

## Current Truth

- `main` includes M001 coordination through M001-L18. The accumulated M001
  stack and Node 24 workflow hardening were pushed to `origin/main`.
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
- M001-L13 completed the release-candidate trust review and did not release, publish, submit to directories, alter package/listing metadata, add tools, relax custody, or introduce selected Brand Kit default behavior.
- L13 decision: do not claim release-candidate readiness yet; the next release gate is hosted-service terms plus rate-limit/abuse posture.
- M001-L14 completed the hosted terms and rate-limit gate without release, publish, directory submission, package/listing metadata changes, hosted tool additions, selected Brand Kit default behavior, or custody relaxation.
- The L14 durable gate is `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`.
- After L19, `brand_status.rate_limits` reports
  `status: "active_pre_release_in_process"` on the hosted HTTP route and still
  reports `release_gate: "blocked"` with blocker owner
  `Jason decision / Brandcode operations owner`.
- The hosted terms/rate-limit gate is still not release-satisfied. L15 approved
  the recommended service-terms posture, while final public
  retention/deletion/export language, abuse/rate-limit operations, public
  "free in v1" copy, and `@brandcode/mcp` package/source posture remain launch
  blockers.
- M001-L15 captured Jason approval for the recommended hosted-service posture in `specs/brandcode-mcp-hosted-service-terms-decision-brief.md`.
- L15 approval settles the pre-release service-terms direction, but does not authorize release, npm publish, directory submission, public listing changes, or release-candidate readiness claims.
- M001-L16 repaired the invalid MCP image content returned by visual extraction tools by normalizing Puppeteer screenshot bytes through valid base64 encoding before emitting image content.
- L16 restored local full-suite proof: `npm test -- --run test/tools/smoke.test.ts`, `npm run lint`, `npm run build`, and full `npm test` all passed. Full `npm test` passed 39 files and 526 tests.
- M001-L17 pushed `main` from `61218ac` to `2cf291c` after Jason authorized
  push.
- GitHub CI run `25641439073` passed on pushed tip `2cf291c` across Node 20
  and Node 22 matrix jobs. Both jobs passed `npm ci`, `npm run build`,
  `npm run lint`, `npm test`, and `npm audit --audit-level=high`.
- The CI run emitted a Node.js 20 Actions deprecation annotation for
  `actions/checkout@v4` and `actions/setup-node@v4`; this is the next release
  trust hygiene lane.
- M001-L18 updated CI to test Node 20, 22, and 24; updated first-party actions
  to `actions/checkout@v6` and `actions/setup-node@v6`; and pushed commit
  `60aa66f`.
- GitHub CI run `25678340682` passed on pushed tip `60aa66f` across Node 20,
  Node 22, and Node 24. All three jobs passed `npm ci`, `npm run build`,
  `npm run lint`, `npm test`, and `npm audit --audit-level=high`.
- The prior Node.js 20 Actions deprecation annotation did not recur in the
  watched L18 run output or `gh run view` job summary.
- M001-L19 added hosted in-process fixed-window rate limiting keyed by
  environment, brand slug, and API key id. The hosted route now returns
  `x-ratelimit-*` headers, emits structured `429 rate_limited` responses, and
  reports `brand_status.rate_limits.status` as
  `active_pre_release_in_process` when called through the hosted HTTP router.
- L19 did not satisfy the public release gate: the limiter is process-local
  pre-release enforcement, not durable shared production enforcement. Public
  release still needs Jason to choose durable shared rate-limit infrastructure
  or approve a named Brandcode operations owner plus abuse-handling runbook.
- M001-L19 was pushed after Jason authorized push. GitHub CI run `25684546273`
  passed on pushed tip `74d72f5` across Node 20, Node 22, and Node 24. All
  three jobs passed `npm ci`, `npm run build`, `npm run lint`, `npm test`, and
  `npm audit --audit-level=high`.

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
| M001-L13 | Done | `.claudex/packets/M001-L13-release-candidate-trust-review.md` | Review the pre-release trust posture and decide the next repair lane before any release candidate claim. |
| M001-L14 | Done | `.claudex/packets/M001-L14-hosted-terms-rate-limit-gate.md` | Turn hosted-service terms, privacy/retention, custody, abuse handling, and rate-limit posture into an explicit release gate. |
| M001-L15 | Done | `.claudex/packets/M001-L15-hosted-service-terms-decision-brief.md` | Prepare the compact Jason decision brief for hosted-service terms, retention, rate-limit/abuse ownership, pricing copy, and package/source posture. |
| M001-L16 | Done | `.claudex/packets/M001-L16-full-suite-visual-extraction-smoke-repair.md` | Repair the two failing visual extraction smoke tests so full local suite proof can precede push/CI or any release-candidate claim. |
| M001-L17 | Done | `.claudex/packets/M001-L17-push-ci-proof-authorization.md` | Resolve the push/CI proof gap after full-suite green, without pushing unless Jason explicitly authorizes it. |
| M001-L18 | Done | `.claudex/packets/M001-L18-github-actions-node24-compatibility.md` | Repair or explicitly harden the GitHub Actions Node runtime posture surfaced by the passing M001-L17 CI run. |
| M001-L19 | Done | `.claudex/packets/M001-L19-hosted-rate-limit-abuse-posture.md` | Add active pre-release hosted rate-limit enforcement and preserve the durable production release blocker truthfully. |

## Blockers And Decisions

- Jason decision: no publish, public release, or MCP directory submission until hardening is much stronger and Jason explicitly authorizes release.
- Jason approved the recommended hosted-service posture for pre-release authorized access, client-owned data, feedback/history posture, custody, launch-copy restraint, and source/service separation.
- L11 resolved the hosted package asset proof blocker for `brandcode:logo:c5-logomark-red.svg`.
- L12 resolved the hosted client credential blocker for Preview through Vercel env provisioning and did not commit secrets to the repo.
- Rate-limit/abuse posture now has active in-process pre-release enforcement
  with `release_gate: "blocked"`; production release still needs durable
  shared enforcement or an explicit Jason-approved Brandcode operations owner
  and abuse-handling policy.
- Push/CI proof for the M001 stack is complete: GitHub CI run `25641439073`
  passed on pushed tip `2cf291c`.
- Push/CI proof for L19 is complete: GitHub CI run `25684546273` passed on
  pushed tip `74d72f5`.
- L13 converted directory metadata and production-key/non-Brandcode proof into product-spine deferrals until hosted terms/rate-limit posture is settled.
- L14 converted hosted-service terms, retention/privacy, custody, abuse handling, rate-limit posture, pricing copy, and package/source posture into a blocked release gate.
- Full-suite local test deferral is resolved by M001-L16.
- CI hardening deferral is resolved by M001-L18.
- Hosted rate-limit/abuse posture is no longer vague, but release remains
  blocked: `brand_status.rate_limits.status` is
  `active_pre_release_in_process` on the hosted HTTP route, and
  `release_gate` is still `blocked` until Jason chooses durable shared
  enforcement or approves a named operations owner and abuse runbook.

## Ready Lane Rule

No next Ready lane is open. Automation should pause on the named Jason decision:
choose durable shared hosted rate-limit enforcement, or approve a named
Brandcode operations owner plus abuse-handling runbook for any public launch
claim. Do not publish, release, submit to directories, add tools, alter public
listing metadata, or relax private custody.
