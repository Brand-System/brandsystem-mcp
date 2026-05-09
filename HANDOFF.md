# HANDOFF

## Current State

Active sprint: M001 - Brandcode MCP stabilization and pre-release hardening.

The hosted Brandcode Use MCP implementation has all 8 locked v0.1 tools wired in code. M001-L01 added a repeatable smoke harness at `npm run smoke:hosted-mcp`; M001-L02 refreshed the Use MCP roadmap so it no longer describes implemented tools as stubs. M001-L03/L04 staging route and feedback append proof now pass. M001-L06 completed the license/package/directory/security trust audit. M001-L07 expanded hosted auth/scope/security proof and documented rate-limit posture. M001-L08 proved hosted asset custody blocking and surfaced the package-safe asset fixture blocker. M001-L09 traced that blocker upstream to UCS/Brandcode Studio package data and did not relax MCP custody. Jason does not want to release yet. The sprint is now about pre-release hardening: hosted-service terms, package-safe asset delivery proof, directory-score readiness, and battle testing before any public package or directory launch.

## Latest Build Work

M001-L10 repaired the upstream UCS package-data fixture locally:

- UCS source now gives `brandcode:logo:c5-logomark-red.svg` a governed package-safe `deliveryRef.packagePath` of `brandcode-brand-runtime/visual/assets/logo/c5-logomark-red.svg`, plus `inRuntimePackage: true` and `lifecycle: "production-approved"`.
- The UCS compiler now preserves package delivery fields from manifest assets into `brandInstance.assets`, `compiled-brand-runtime.ts`, `compiled-brand-asset-manifests.ts`, and `clients/brandcode/.brand/compiled/asset-runtime.json`.
- No MCP custody code changed and no private/provider URLs were made public.
- Local UCS proof passed for the compiled adapter payload, TypeScript, and `git diff --check`.
- Hosted smoke from this repo remains blocked because the current shell lacks `BRANDCODE_MCP_SMOKE_URL` and `BRANDCODE_MCP_SMOKE_FULL_KEY`.
- The UCS repair has not been pushed/deployed because Jason's prompt explicitly said not to push unless asked.

M001-L11 is now Ready: confirm the UCS package-data repair is fresh in staging and rerun hosted smoke with `BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg`.

## Latest PO Work

Seeded repo-native sprint coordination and carried M001 through M001-L09:

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
- `.claudex/prompts/M001-L09-package-safe-asset-fixture.md`
- `.claudex/prompts/M001-L10-ucs-package-asset-delivery-ref.md`
- `.claudex/messages/M001-messages.md`

## Previous Build Work

M001-L09 closed as blocked upstream with docs-only coordination:

- Hosted `get_brand_asset` reads UCS package data through `src/hosted/brand-fetcher.ts`, which calls `GET /api/brand/hosted/{slug}/pull`.
- The UCS route at `/Users/jasonlankow/Desktop/UCS/app/api/brand/hosted/[slug]/pull/route.ts` serves compiled Brandcode packages from `/Users/jasonlankow/Desktop/UCS/app/tools/lib/brand-adapter-runtime.ts`.
- The concrete generated sources are `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-runtime.ts` and `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-asset-manifests.ts`.
- `brandcode:logo:c5-logomark-red.svg` exists there with root-relative runtime URL and public URL refs, but no `deliveryRef.packagePath`, top-level `packagePath`, or package-safe `packageUrl`.
- The MCP correctly refuses to infer package custody from ordinary URL fields; no MCP code changed and no custody rule was relaxed.
- Hosted smoke with `BRANDCODE_MCP_SMOKE_ASSET_ID` was not rerun because no package-safe fixture exists and local smoke env keys are not present.
- M001-L10 is now Ready to repair the upstream UCS/Studio package asset delivery ref, deploy staging freshness, and rerun hosted smoke.

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
- Latest asset-custody deployment: `https://brandsystem-qhfz5p7o6-column-five.vercel.app`
- Earlier feedback-proof deployment: `https://brandsystem-oj1iwfm13-column-five.vercel.app`
- Service-token env: `BRANDCODE_MCP_SERVICE_TOKEN`
- `brand_feedback` append proof: `append_status: recorded`
- Remaining blocked proof: `get_brand_asset` cannot pass package delivery until staging includes a package-safe asset fixture.

## Next Ready Lane

M001-L10 is Ready: UCS Package Asset Delivery Ref Repair.

Do not publish, release, submit to MCP directories, add tools, or relax custody. Repair the upstream UCS/Studio Brandcode package data so one stable asset, preferably `brandcode:logo:c5-logomark-red.svg`, has a real package-safe delivery ref; then rerun hosted smoke until `get_brand_asset` passes package delivery proof.

## Known Blockers

- Current exact package-fixture blocker: the Brandcode staging package has no asset with a package-safe delivery ref; all six current assets are private-provider-only blocked.
- Exact upstream data change needed: UCS/Brandcode Studio runtime packaging must materialize one stable Production-approved/runtime Brandcode asset into the runtime package and emit `deliveryRef.packagePath`, top-level `packagePath`, or an equivalent real package-safe delivery ref.
- `get_brand_asset` has stable asset-id proof but still needs package-safe delivery proof before release-grade battle testing.
- Local M001 commits are not pushed yet, so GitHub CI has not run for this sprint work.
- License for `@brandcode/mcp` package/source and hosted-service terms are Jason decisions before release.
- Rate limits remain documented as `not_reported_by_staging`; production release needs active enforcement or an explicit Jason-approved blocker owner.

## Local Hygiene

Untracked `.claude/` and `prompt` existed before M001 coordination work and should remain untouched unless Jason explicitly asks.
