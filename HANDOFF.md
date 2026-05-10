# HANDOFF

## Current State

Active sprint: M001 - Brandcode MCP stabilization and pre-release hardening.

The hosted Brandcode Use MCP implementation has all 8 locked v0.1 tools wired in code. M001-L01 added a repeatable smoke harness at `npm run smoke:hosted-mcp`; M001-L02 refreshed the Use MCP roadmap so it no longer describes implemented tools as stubs. M001-L03/L04 staging route and feedback append proof now pass. M001-L06 completed the license/package/directory/security trust audit. M001-L07 expanded hosted auth/scope/security proof and documented rate-limit posture. M001-L08 proved hosted asset custody blocking and surfaced the package-safe asset fixture blocker. M001-L09 traced that blocker upstream to UCS/Brandcode Studio package data. M001-L10 repaired the UCS package delivery ref, M001-L11 proved the package-safe asset through hosted MCP smoke, M001-L12 completed multi-client proof with MCP Inspector and Claude Code, M001-L13 completed release-candidate trust review, M001-L14 completed the hosted terms/rate-limit gate, M001-L15 captured Jason's approval of the recommended hosted-service posture, and M001-L16 restored full local test-suite proof. Jason does not want to release yet. The sprint is ready for push/CI proof only if Jason authorizes push, not release.

## Latest Build Work

M001-L11 completed hosted package asset proof for the UCS package-data fixture:

- The repaired UCS asset is still `brandcode:logo:c5-logomark-red.svg`, with governed package-safe `deliveryRef.packagePath: "brandcode-brand-runtime/visual/assets/logo/c5-logomark-red.svg"`, `inRuntimePackage: true`, and `lifecycle: "production-approved"`.
- UCS `origin/main` contains `37585f98 Add Brandcode package asset delivery ref`.
- No MCP custody code changed and no private/provider URLs were made public.
- Hosted smoke from this repo passed against `https://mcp.staging.brandcode.studio/brandcode` with `BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg`.
- `get_brand_asset` returned `custody_safe: true`, `safe_for_mcp: true`, `blocked_private_provider_url: false`, `delivery_posture: "package_safe"`, `delivery_ref_kind: "package_path"`, and `raw_private_provider_url_exposed: false`.
- The full smoke also passed locked tool order, package-safe catalog shape, feedback append, and read-only insufficient-scope checks for `brand_check` and `brand_feedback`.

M001-L12 completed multi-client battle testing:

- The empty Preview `BRANDCODE_MCP_TEST_KEYS` value was removed and replaced with fresh staging-only full/read entries for the `brandcode` slug through Vercel's interactive env flow.
- Staging was redeployed and aliased to `https://mcp.staging.brandcode.studio`; latest deployment is `https://brandsystem-eipxqt3go-column-five.vercel.app`.
- Hosted smoke passed with full/read key postures and package-safe asset id `brandcode:logo:c5-logomark-red.svg`.
- MCP Inspector `tools/list` returned the locked 8-tool Phase 0 order.
- MCP Inspector `get_brand_asset` returned package-safe custody, package-path delivery, and no raw private/provider URL.
- MCP Inspector read-only `brand_check` returned structured `insufficient_scope` with `status: 403`.
- Claude Code used a temporary HTTP MCP config, called `brand_status` and `get_brand_asset`, and reported 8 implemented tools, package-safe asset posture, package-path delivery, and no raw private/provider URL exposure.
- Codex CLI remains available but was not used after MCP Inspector and Claude Code satisfied the two-client acceptance bar.

M001-L13 completed release-candidate trust review:

- Durable review: `specs/brandcode-mcp-release-candidate-trust-review.md`.
- Before the L13 closeout commit, local `main` was 20 commits ahead of
  `origin/main`; the M001 stack remains unpushed.
- Latest remote `main` CI green baseline is `61218ac`; GitHub Actions run
  `25571869563` passed on 2026-05-08.
- GitHub CI has not run on the local M001 stack.
- The hosted surface is strong on staging smoke, package-safe Brandcode asset
  proof, and two-client proof, but it is not release-candidate ready.
- Release remains blocked by hosted-service terms, rate-limit/abuse posture,
  unresolved `@brandcode/mcp` package/source posture, no CI run on the local
  M001 stack, and no separate Brandcode Use directory metadata.
- Release/publish remains blocked on Jason approval.

M001-L14 completed the hosted terms and rate-limit gate:

- Durable gate: `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`.
- The gate is blocked, not satisfied.
- `brand_status.rate_limits` preserves `status: "not_reported_by_staging"`
  and now reports `release_gate: "blocked"`, blocker owner
  `Jason decision / Brandcode operations owner`, and the required public
  release condition.
- `SECURITY.md` now names the hosted-service release gate, feedback/history
  retention gap, custody limits, and rate-limit/abuse owner requirement.
- README and `llms.txt` now qualify hosted Use MCP access as authorized and
  pre-release-gated.
- `specs/brandcode-mcp-phase-0-lock.md` keeps "free in v1" as product intent,
  not approved public pricing copy.
- Verification passed for `git diff --check`, hosted tool tests, lint, and
  build. Full `npm test` exposed two unrelated visual extraction smoke cases
  that were repaired in M001-L16.
M001-L15 completed the hosted service terms decision brief:

- Durable decision brief:
  `specs/brandcode-mcp-hosted-service-terms-decision-brief.md`.
- Jason approved the recommended hosted-service posture for approved-brand,
  bearer-key-only, pre-release access; client-owned or client-controlled data;
  runtime use limited to MCP/governance workflows; append-only feedback; scoped
  redacted history; package-safe asset delivery; no raw private/provider URLs;
  no public "free in v1" copy until pricing/limits are settled; and separate
  hosted-service access posture from source/package license posture.
- This approval does not authorize release, npm publish, directory submission,
  public listing changes, or release-candidate claims.
- Remaining release blockers are no GitHub CI on the M001 stack, no active
  rate-limit enforcement or named abuse runbook, no final public
  retention/deletion/export language, final package/source posture for
  `@brandcode/mcp`, deferred directory metadata, and explicit Jason release
  approval.

M001-L16 completed the full suite visual extraction smoke repair:

- Added shared screenshot base64 normalization in `src/lib/visual-extractor.ts`.
- Updated `brand_extract_visual`, `brand_extract_site`, and `brand_start` to
  return valid MCP image content when screenshots are Uint8Array-backed.
- `npm test -- --run test/tools/smoke.test.ts` passed: 50 tests.
- `npm run lint` passed.
- `npm run build` passed.
- Full `npm test` passed: 39 files, 526 tests.
- M001-L17 is the next Ready lane to resolve push/CI proof, but pushing remains
  blocked until Jason explicitly authorizes push or PR proof.

## Latest PO Work

Seeded repo-native sprint coordination and carried M001 through M001-L17:

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
- `.claudex/packets/M001-L09-package-safe-asset-fixture.md`
- `.claudex/packets/M001-L10-ucs-package-asset-delivery-ref.md`
- `.claudex/packets/M001-L11-hosted-package-asset-smoke-proof.md`
- `.claudex/packets/M001-L12-multi-client-battle-test.md`
- `.claudex/packets/M001-L13-release-candidate-trust-review.md`
- `.claudex/packets/M001-L14-hosted-terms-rate-limit-gate.md`
- `.claudex/packets/M001-L15-hosted-service-terms-decision-brief.md`
- `.claudex/packets/M001-L16-full-suite-visual-extraction-smoke-repair.md`
- `.claudex/packets/M001-L17-push-ci-proof-authorization.md`
- `.claudex/prompts/M001-L09-package-safe-asset-fixture.md`
- `.claudex/prompts/M001-L10-ucs-package-asset-delivery-ref.md`
- `.claudex/prompts/M001-L12-multi-client-battle-test.md`
- `.claudex/prompts/M001-L13-release-candidate-trust-review.md`
- `.claudex/prompts/M001-L15-hosted-service-terms-decision-brief.md`
- `.claudex/prompts/M001-L16-full-suite-visual-extraction-smoke-repair.md`
- `.claudex/prompts/M001-L17-push-ci-proof-authorization.md`
- `.claudex/messages/M001-messages.md`

## Previous Build Work

M001-L09 closed as blocked upstream with docs-only coordination:

- Hosted `get_brand_asset` reads UCS package data through `src/hosted/brand-fetcher.ts`, which calls `GET /api/brand/hosted/{slug}/pull`.
- The UCS route at `/Users/jasonlankow/Desktop/UCS/app/api/brand/hosted/[slug]/pull/route.ts` serves compiled Brandcode packages from `/Users/jasonlankow/Desktop/UCS/app/tools/lib/brand-adapter-runtime.ts`.
- The concrete generated sources are `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-runtime.ts` and `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-asset-manifests.ts`.
- `brandcode:logo:c5-logomark-red.svg` exists there with root-relative runtime URL and public URL refs, but no `deliveryRef.packagePath`, top-level `packagePath`, or package-safe `packageUrl`.
- The MCP correctly refuses to infer package custody from ordinary URL fields; no MCP code changed and no custody rule was relaxed.
- Hosted smoke with `BRANDCODE_MCP_SMOKE_ASSET_ID` was not rerun because no package-safe fixture exists and local smoke env keys are not present.
- M001-L10 became the repair lane for the upstream UCS/Studio package asset delivery ref.

M001-L08 closed with hosted custody proof and a package fixture blocker:

- `scripts/hosted-mcp-smoke.mjs` now requires `get_brand_asset` to return package-safe custody before passing.
- Private-provider-only asset responses are classified as `blocked` when the MCP truthfully marks the asset unsafe for MCP delivery and exposes no raw private/provider URL.
- `src/hosted/tools/assets.ts` now blocks private-looking `packageUrl` values instead of treating them as package-safe.
- `test/hosted/tools.test.ts` covers private-looking package URL custody.
- Hosted proof ran against `https://mcp.staging.brandcode.studio/brandcode` on deployment `https://brandsystem-qhfz5p7o6-column-five.vercel.app`.
- Selected asset id: `brandcode:logo:c5-logomark-red.svg`.
- `list_brand_assets` returned six assets and `custody_safe: true`.
- All six staging assets currently report `delivery_ref.posture: "blocked_private_provider_url"`.
- `get_brand_asset` returned the selected asset as blocked for private-provider-only delivery, exposed no raw private/provider URL, and the smoke harness reported that as `blocked`, not `fail`.
- No package-safe asset delivery ref exists in the current Brandcode staging package.

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
- Package-safe asset id: `brandcode:logo:c5-logomark-red.svg`
- Latest multi-client proof deployment: `https://brandsystem-eipxqt3go-column-five.vercel.app`
- Earlier asset-custody deployment: `https://brandsystem-qhfz5p7o6-column-five.vercel.app`
- Earlier feedback-proof deployment: `https://brandsystem-oj1iwfm13-column-five.vercel.app`
- Service-token env: `BRANDCODE_MCP_SERVICE_TOKEN`
- `brand_feedback` append proof: `append_status: recorded`
- `get_brand_asset` package delivery proof: passed with `delivery_ref_kind: "package_path"` and no raw private/provider URL exposure.

## Next Ready Lane

M001-L17 is Ready: Push CI Proof Authorization.

Do not publish, release, submit to MCP directories, add tools, alter public listing metadata, push without Jason authorization, or relax custody. Resolve the push/CI proof gap after full-suite green, and treat absent push authorization as the named Jason decision blocker.

## Known Blockers

- Local M001 commits are not pushed yet, so GitHub CI has not run for this sprint work.
- Jason approved the recommended hosted-service posture, but final public
  retention/deletion/export language and `@brandcode/mcp` package/source
  posture remain launch blockers.
- Rate limits remain documented as `not_reported_by_staging` with `release_gate: "blocked"`; production release needs active enforcement or an explicit Jason-approved Brandcode operations owner and abuse-handling policy.
- Directory metadata for Brandcode Use is deferred until hosted terms/rate-limit posture is settled.
- Full-suite local proof is green after M001-L16, but hosted/pushed CI proof is
  still unavailable until Jason authorizes push or PR proof.
- Local proof-key note: Vercel Preview now has a sensitive `BRANDCODE_MCP_TEST_KEYS` value, but `vercel env pull` redacts sensitive values locally. Future proof sessions need an intentional local secret handoff or a generate-and-run shell flow.

## Local Hygiene

Untracked `.claude/` and `prompt` existed before M001 coordination work and should remain untouched unless Jason explicitly asks.
