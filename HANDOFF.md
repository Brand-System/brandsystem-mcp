# HANDOFF

## Current State

Active sprint: M001 - Brandcode MCP stabilization and pre-release hardening.

The hosted Brandcode Use MCP implementation has all 8 locked v0.1 tools wired in code. M001-L01 added a repeatable smoke harness at `npm run smoke:hosted-mcp`; M001-L02 refreshed the Use MCP roadmap so it no longer describes implemented tools as stubs. M001-L03/L04 staging route and feedback append proof now pass. M001-L06 completed the license/package/directory/security trust audit. M001-L07 expanded hosted auth/scope/security proof and documented rate-limit posture. M001-L08 proved hosted asset custody blocking and surfaced the package-safe asset fixture blocker. M001-L09 traced that blocker upstream to UCS/Brandcode Studio package data. M001-L10 repaired the UCS package delivery ref, M001-L11 proved the package-safe asset through hosted MCP smoke, M001-L12 completed multi-client proof with MCP Inspector and Claude Code, M001-L13 completed release-candidate trust review, M001-L14 completed the hosted terms/rate-limit gate, M001-L15 captured Jason's approval of the recommended hosted-service posture, M001-L16 restored full local test-suite proof, M001-L17 pushed the M001 stack with green GitHub CI, M001-L18 restored GitHub Actions Node runtime trust, M001-L19 added active hosted in-process pre-release rate limiting, and M001-L20 added optional durable shared Redis REST rate limiting. Jason does not want to release yet. The sprint is blocked on Jason approving/provisioning hosted Redis REST rate-limit env and authorizing hosted durable proof, not release.

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
- At L13 closeout time, local `main` was 20 commits ahead of `origin/main`.
  That push/CI gap was later resolved by M001-L17.
- The pre-M001 remote `main` CI green baseline was `61218ac`; GitHub Actions
  run `25571869563` passed on 2026-05-08.
- The hosted surface is strong on staging smoke, package-safe Brandcode asset
  proof, and two-client proof, but it is not release-candidate ready.
- Release remains blocked by rate-limit/abuse posture, unresolved
  `@brandcode/mcp` package/source posture, final public retention/export
  language, and no separate Brandcode Use directory metadata.
- Release/publish remains blocked on Jason approval.

M001-L14 completed the hosted terms and rate-limit gate:

- Durable gate: `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`.
- The gate is blocked, not satisfied.
- At L14 time, `brand_status.rate_limits` preserved
  `status: "not_reported_by_staging"` and reported `release_gate: "blocked"`.
  After L19 and the named-owner decision, hosted-route status reports
  `active_pre_release_in_process` with blocker owner
  `Jason Lankow / Brandcode Studio Ops <jlankow@columnfive.com>`.
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

M001-L17 completed push/CI proof:

- Jason explicitly authorized push in-thread.
- Pushed `main` from `61218ac` to `2cf291c`.
- GitHub CI run `25641439073` passed:
  `https://github.com/Brandcode-Studio/brandsystem-mcp/actions/runs/25641439073`.
- Node 20 and Node 22 matrix jobs both passed `npm ci`, `npm run build`,
  `npm run lint`, `npm test`, and `npm audit --audit-level=high`.
- CI emitted a Node.js 20 Actions deprecation annotation for
  `actions/checkout@v4` and `actions/setup-node@v4`.
- M001-L18 is the next Ready lane to repair or explicitly harden the GitHub
  Actions Node runtime posture.

M001-L18 completed GitHub Actions Node 24 compatibility:

- Pushed commit `60aa66f Add Node 24 GitHub Actions compatibility`.
- GitHub CI run `25678340682` passed:
  `https://github.com/Brandcode-Studio/brandsystem-mcp/actions/runs/25678340682`.
- Node 20, Node 22, and Node 24 matrix jobs all passed `npm ci`,
  `npm run build`, `npm run lint`, `npm test`, and
  `npm audit --audit-level=high`.
- CI used `actions/checkout@v6` and `actions/setup-node@v6`.
- The prior Node.js 20 Actions deprecation annotation did not recur in the
  watched run output or `gh run view` job summary.
- M001-L19 became the next lane and is now closed.

M001-L19 completed hosted rate-limit and abuse posture hardening:

- Added `src/hosted/rate-limit.ts`, an in-process fixed-window limiter keyed by
  environment, brand slug, and API key id.
- Wired the hosted HTTP router to enforce the limiter after bearer auth and
  before MCP transport dispatch.
- Default policy is 60 authenticated requests per 60 seconds.
- Config knobs are `BRANDCODE_MCP_RATE_LIMIT_REQUESTS_PER_WINDOW`,
  `BRANDCODE_MCP_RATE_LIMIT_WINDOW_SECONDS`, and emergency disable
  `BRANDCODE_MCP_RATE_LIMIT_DISABLED=1`.
- Over-limit requests return JSON `429 rate_limited` with structured
  `rate_limits`, `retry-after`, and `x-ratelimit-*` headers.
- Successful hosted responses include `x-ratelimit-limit`,
  `x-ratelimit-remaining`, and `x-ratelimit-reset`.
- `brand_status.rate_limits.status` now reports
  `active_pre_release_in_process` when called through the hosted HTTP route.
- The release gate remains blocked because the limiter is process-local
  pre-release enforcement, not durable shared production enforcement.
- Verification passed for
  `npm test -- --run test/hosted/router.test.ts test/hosted/tools.test.ts`
  and `npm run lint`; `git diff --check`, `npm run build`, and full
  `npm test` also passed. Full `npm test` passed 39 files and 527 tests.
- Jason authorized push, and GitHub CI run `25684546273` passed on pushed tip
  `74d72f5`: `https://github.com/Brandcode-Studio/brandsystem-mcp/actions/runs/25684546273`.
- Node 20, Node 22, and Node 24 matrix jobs all passed `npm ci`,
  `npm run build`, `npm run lint`, `npm test`, and
  `npm audit --audit-level=high`.
- No release, npm publish, public MCP directory submission, public listing
  change, hosted tool addition, selected-kit default behavior, UCS change, or
  custody relaxation happened.
- Jason named the pre-release abuse response owner as Jason Lankow /
  Brandcode Studio Ops `<jlankow@columnfive.com>`, with authority to revoke,
  rotate, suspend, or throttle hosted Brandcode MCP API keys for abuse, leaked
  keys, excessive traffic, security risk, or service-stability risk.
- Jason chose durable shared hosted rate limiting as the next lane before broad
  public release.

M001-L20 completed durable shared rate-limit implementation locally:

- Added optional durable shared Redis REST fixed-window enforcement using
  `@upstash/redis`.
- Hosted env contract is `BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_URL` /
  `BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_TOKEN`, with standard
  `UPSTASH_REDIS_REST_*` and `KV_REST_API_*` env names also accepted.
- Preserved in-process memory enforcement as the local/test and pre-release
  fallback when no shared store env exists.
- `brand_status.rate_limits.status` now distinguishes
  `active_durable_shared`, `active_pre_release_in_process`, `unavailable`, and
  `disabled`.
- If a configured durable shared store is unavailable, hosted requests fail
  closed with `503 rate_limit_unavailable` before MCP tool dispatch.
- Over-limit behavior still returns structured `429 rate_limited`,
  `retry-after`, and `x-ratelimit-*` headers.
- Verification passed for `git diff --check`, focused hosted router/status
  tests, lint, build, and full `npm test` (39 files, 530 tests).
- Jason authorized push, and GitHub CI run `25687209671` passed on pushed tip
  `cc94bee`: `https://github.com/Brandcode-Studio/brandsystem-mcp/actions/runs/25687209671`.
- Node 20, Node 22, and Node 24 matrix jobs all passed `npm ci`,
  `npm run build`, `npm run lint`, `npm test`, and
  `npm audit --audit-level=high`.
- Hosted durable-store proof was not completed because this local session has
  no configured Redis/Upstash/KV store or sensitive hosted rate-limit env.
- Release remains blocked until Jason approves/provisions the hosted shared
  store env, hosted proof shows `active_durable_shared`, and Jason explicitly
  approves release.

## Latest PO Work

Seeded repo-native sprint coordination and carried M001 through the M001-L20
Ready lane:

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
- `.claudex/packets/M001-L18-github-actions-node24-compatibility.md`
- `.claudex/packets/M001-L19-hosted-rate-limit-abuse-posture.md`
- `.claudex/packets/M001-L20-durable-shared-rate-limit-enforcement.md`
- `.claudex/prompts/M001-L09-package-safe-asset-fixture.md`
- `.claudex/prompts/M001-L10-ucs-package-asset-delivery-ref.md`
- `.claudex/prompts/M001-L12-multi-client-battle-test.md`
- `.claudex/prompts/M001-L13-release-candidate-trust-review.md`
- `.claudex/prompts/M001-L15-hosted-service-terms-decision-brief.md`
- `.claudex/prompts/M001-L16-full-suite-visual-extraction-smoke-repair.md`
- `.claudex/prompts/M001-L17-push-ci-proof-authorization.md`
- `.claudex/prompts/M001-L18-github-actions-node24-compatibility.md`
- `.claudex/prompts/M001-L19-hosted-rate-limit-abuse-posture.md`
- `.claudex/prompts/M001-L20-durable-shared-rate-limit-enforcement.md`
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

No lane is Ready for automation.

Named Jason decision/provisioning blocker: approve and provision hosted
Redis/Upstash/KV REST rate-limit env, then authorize hosted proof of
`brand_status.rate_limits.status: "active_durable_shared"`.

Do not publish, release, submit to MCP directories, add tools, alter public
listing metadata, or relax custody.


## Known Blockers

- M001 push/CI proof is complete: `origin/main` includes pushed tip `2cf291c`
  and GitHub CI run `25641439073` passed.
- L19 push/CI proof is complete: `origin/main` includes pushed tip `74d72f5`
  and GitHub CI run `25684546273` passed.
- L20 push/CI proof is complete: `origin/main` includes pushed tip `cc94bee`
  and GitHub CI run `25687209671` passed.
- Jason approved the recommended hosted-service posture, but final public
  retention/deletion/export language and `@brandcode/mcp` package/source
  posture remain launch blockers.
- Rate limits support durable shared Redis REST enforcement when hosted store env is configured; otherwise local/pre-release traffic uses the in-process fallback. Production release still needs command-backed hosted durable proof.
- Pre-release abuse response owner is Jason Lankow / Brandcode Studio Ops `<jlankow@columnfive.com>`, with authority to revoke, rotate, suspend, or throttle hosted Brandcode MCP API keys for abuse, leaked keys, excessive traffic, security risk, or service-stability risk.
- Directory metadata for Brandcode Use is deferred until hosted terms/rate-limit posture is settled.
- CI hardening is resolved by M001-L18.
- Hosted rate-limit/abuse posture is no longer vague, but release remains
  blocked: `brand_status.rate_limits.status` can report
  `active_durable_shared` only when the hosted Redis REST store is configured,
  and `release_gate` is `blocked` until hosted proof exists and Jason approves
  release.
- Jason decision/provisioning blocker: approve/provision hosted
  Redis/Upstash/KV REST rate-limit env and authorize hosted proof.
- Local proof-key note: Vercel Preview now has a sensitive `BRANDCODE_MCP_TEST_KEYS` value, but `vercel env pull` redacts sensitive values locally. Future proof sessions need an intentional local secret handoff or a generate-and-run shell flow.

## Local Hygiene

Untracked `.claude/` and `prompt` existed before M001 coordination work and should remain untouched unless Jason explicitly asks.
