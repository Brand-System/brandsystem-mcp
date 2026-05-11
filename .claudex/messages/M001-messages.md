# M001 Messages

## 2026-05-08 - Sprint Opened

M001 opened to stabilize the Brandcode hosted Use MCP after the rapid 8-tool implementation run.

Current repo truth:

- `main` is green at `61218ac`.
- `40e94a0` carried the cumulative seven hosted implementation commits but failed CI on `npm audit`.
- `61218ac` fixed the audit failure.
- Intermediate hosted commits did not get isolated GitHub CI runs.
- The hosted code now reports all 8 locked tools as real.
- Hosted proof remains incomplete until staging DNS, deployment protection/client access, and UCS service-token feedback append are resolved.

Next Ready lane:

- M001-L01 - Hosted Proof Harness And Truth Spine.

## 2026-05-08 - M001-L01 Closed

M001-L01 added a repo-native hosted MCP smoke harness:

- Command: `npm run smoke:hosted-mcp`
- Script: `scripts/hosted-mcp-smoke.mjs`
- Local tests: `test/scripts/hosted-mcp-smoke.test.ts`

What it proves when endpoint and keys are provided:

- MCP `initialize`
- `tools/list`
- locked 8-tool order
- `brand_status`
- `brand_runtime`
- `brand_search`
- `list_brand_assets`
- optional `get_brand_asset`
- `brand_check`
- `brand_history`
- `brand_feedback`
- read-only insufficient-scope behavior for `brand_check` and `brand_feedback`

This lane proved the harness help/env-missing path locally without secrets. It did not claim staging-domain proof, Vercel route proof, external MCP client proof, or feedback append proof because live endpoint/key/service-token dependencies were not provided in the local run.

## 2026-05-08 - M001-L02 Shaped

M001-L02 is now the single Ready lane.

Purpose:

- Refresh the Brandcode Use MCP roadmap/product-spine docs after the hosted 8-tool implementation run and M001-L01 proof harness.
- Remove stale stub language from `specs/brandcode-mcp-use-roadmap-alignment.md`.
- Re-lock the product semantics around Full Brand Runtime, selected Brand Kits, campaign/exploratory kits, Production-Approved Assets, hosted review/patch input, and `DESIGN.md` non-authority.

Still blocked after L02:

- Exact staging-domain proof waits on DNS/alias/cert.
- Direct external MCP client proof waits on Vercel access/deployment-protection posture.
- `brand_feedback` append proof waits on a real UCS service token.

## 2026-05-08 - M001-L02 Closed

M001-L02 refreshed the Use MCP roadmap/product spine as a docs-only lane.

Updated docs:

- `specs/brandcode-mcp-use-roadmap-alignment.md`
- `specs/brandcode-mcp-phase-0-lock.md`
- `README.md`
- M001 sprint closeout docs

Current product truth:

- `@brandsystem/mcp` remains Build.
- `@brandcode/mcp` remains hosted Use.
- v0.1 remains locked at exactly 8 tools.
- The roadmap no longer calls implemented hosted tools `not_implemented_in_staging` stubs.
- Full Brand Runtime is the default hosted object.
- selected Brand Kits and campaign/exploratory kits stay out of default v0.1 until UCS has durable hosted selected-kit publish/share truth.
- `DESIGN.md` is an adapter/readable brief, not runtime authority.
- `brand_feedback` is append-only review/hosted patch-request input, not canonical mutation.

Next lane posture:

- No lane is Ready for automation.
- M001-L03 remains blocked by DNS/alias/cert and Vercel access/deployment-protection posture.
- M001-L04 remains blocked by real UCS service-token provisioning.

## 2026-05-08 - M001-L03/L04 Proof Completed

Jason configured DNS for `mcp.staging.brandcode.studio`, disabled Vercel Authentication for the hosted MCP route, and configured shared service-token posture.

The hosted MCP service-token env name was normalized to `BRANDCODE_MCP_SERVICE_TOKEN` so the hosted MCP and UCS use the same variable name. `UCS_SERVICE_TOKEN` is no longer accepted by repo code.

Staging proof:

- Alias: `https://mcp.staging.brandcode.studio/brandcode`
- Deployment: `https://brandsystem-oj1iwfm13-column-five.vercel.app`
- Command: `npm run smoke:hosted-mcp -- --json`

Passed:

- MCP `initialize`
- `tools/list` exact locked 8-tool order
- `brand_status`
- `brand_runtime`
- `brand_search`
- `list_brand_assets`
- `brand_check`
- `brand_history`
- `brand_feedback` with `append_status: recorded`
- read-only insufficient-scope behavior for `brand_check`
- read-only insufficient-scope behavior for `brand_feedback`

Skipped:

- `get_brand_asset`, because no `BRANDCODE_MCP_SMOKE_ASSET_ID` was provided.

## 2026-05-08 - Release Posture Reframed

Jason explicitly does not want to release yet.

Reason:

- MCP directories and review/scoring sites can ingest first releases quickly and then take weeks or months to update negative initial reviews.
- Brandcode MCP should reach a much stronger production-trust bar before publish: license clarity, security hardening, test depth, multi-client battle testing, and high-quality directory metadata.

M001-L05 was reframed from release readiness to pre-release hardening map.

Next Ready lane:

- M001-L05 - Pre-Release Hardening Map.

## 2026-05-08 - M001-L06 Shaped

M001-L05 is complete as a hardening map. M001-L06 is now the single Ready lane.

Purpose:

- Audit license, package, directory, and trust-facing docs before any public release.
- Identify license/hosted-service terms questions for Jason.
- Identify security/privacy and directory/scoring risks grounded in repo files.
- Produce a durable gap list and exactly one next Ready lane.

Still prohibited:

- No npm publish.
- No public MCP directory submission.
- No new tools.
- No hosted behavior changes unless a critical false claim can be fixed docs-only.

## 2026-05-08 - M001-L06 Closed

M001-L06 completed the license, package, directory, and trust audit as a docs-only lane.

Audit doc:

- `specs/brandcode-mcp-license-directory-trust-audit.md`

Core findings:

- `@brandcode/mcp` can likely inherit MIT for package/source-code distribution if the package ships from this repo or sibling code under the same copyright posture, but MIT does not cover hosted-service access.
- Hosted Brandcode MCP needs explicit service terms before public release for bearer-key access, rate limits, feedback/history retention, private asset custody, client-owned brand data, and abuse handling.
- Current `package.json`, `server.json`, `smithery.yaml`, `glama.json`, and `llms.txt` are mostly Build-oriented for `@brandsystem/mcp`; that is acceptable now, but Brandcode MCP needs separate Use listing metadata before any directory submission.
- `SECURITY.md` is not yet strong enough for hosted Use MCP review because it omits bearer auth, scopes, service-token posture, private custody, feedback/history privacy, and rate-limit/abuse posture.
- Public docs mostly preserve the locked 8-tool/read-append posture, no canonical mutation, no selected-kit default, and no unauthenticated public read; a few "any MCP client" / "agents anywhere" phrases need auth qualifiers before release copy is submitted.

Next Ready lane:

- M001-L07 - Security Matrix And Rate-Limit Posture.

Still prohibited:

- No npm publish.
- No public MCP directory submission.
- No new tools.
- No hosted behavior changes outside narrow security proof/documentation.

## 2026-05-08 - M001-L07 Closed

M001-L07 expanded hosted security proof and documentation without changing the
locked hosted tool surface.

Implementation and tests:

- `test/hosted/auth.test.ts` now covers malformed bearer headers, the full
  8-tool scope matrix for read/check/feedback/full key postures, and staging vs
  production key-prefix rejection/acceptance.
- `test/hosted/router.test.ts` now proves malformed Authorization headers are
  rejected at the hosted HTTP boundary.
- Existing `test/hosted/env.test.ts` continues to prove
  `BRANDCODE_MCP_SERVICE_TOKEN` is the only accepted hosted service-token env
  name and `UCS_SERVICE_TOKEN` is not accepted.
- Existing asset, feedback, and history tests already prove private provider URL
  redaction and compact history/receipt privacy for the relevant surfaces.

Docs:

- `SECURITY.md` now documents hosted bearer auth, slug-scoped keys, scopes,
  service-token posture, private custody, feedback/history privacy, and the
  current rate-limit posture.
- Rate limits remain documented as `not_reported_by_staging`, which is an
  explicit pre-release posture, not a production claim.

Next Ready lane:

- M001-L08 - Asset Fetch And Custody Proof.

Still prohibited:

- No npm publish.
- No public MCP directory submission.
- No new tools.
- No selected-kit hosted publish/share behavior.

## 2026-05-08 - M001-L08 Partial Custody Hardening

M001-L08 local hardening landed, but the required hosted asset proof is blocked
on unavailable staging smoke credentials.

Completed locally:

- `scripts/hosted-mcp-smoke.mjs` now treats `get_brand_asset` as pass only when
  the returned asset is package-safe, has `custody.safe_for_mcp: true`, has a
  package delivery ref, does not report `blocked_private_provider_url`, and does
  not expose raw private/provider URLs.
- `src/hosted/tools/assets.ts` now blocks private-looking `packageUrl` values
  rather than treating them as package-safe.
- `test/hosted/tools.test.ts` covers private-looking package URL custody.

Hosted proof attempted:

- Checked local shell env: the required `BRANDCODE_MCP_SMOKE_*` values are not
  set.
- Checked Vercel Preview env safely: it lists `BRANDCODE_MCP_TEST_KEYS`, but
  `vercel env pull --environment=preview --yes` and `vercel env run -e preview`
  expose empty sensitive values to the local process.
- Result: no staging bearer key was available locally, so
  `list_brand_assets` could not be run against
  `https://mcp.staging.brandcode.studio/brandcode`, no stable asset id could be
  selected, and hosted smoke with `BRANDCODE_MCP_SMOKE_ASSET_ID` could not be
  completed.

Lane posture:

- M001-L08 remains the single Ready lane.
- Exact blocker: Jason needs to provide/expose the hosted smoke URL, full key,
  read-only key, and either a stable asset id or enough credential access to
  list assets without exposing secrets in chat.

## 2026-05-08 - M001-L08 Closed With Package Fixture Blocker

M001-L08 deployed the custody hardening to staging and completed hosted asset
proof against a stable Brandcode asset id.

Proof target:

- Endpoint: `https://mcp.staging.brandcode.studio/brandcode`
- Deployment: `https://brandsystem-qhfz5p7o6-column-five.vercel.app`
- Asset id: `brandcode:logo:c5-logomark-red.svg`

Result:

- `list_brand_assets` returned six assets and `custody_safe: true`.
- All six currently available staging assets report
  `delivery_ref.posture: "blocked_private_provider_url"`.
- `get_brand_asset` correctly returned the selected asset as blocked for
  private-provider-only delivery, with `custody.safe_for_mcp: false`.
- No raw private/provider URL was exposed.
- The smoke harness now classifies this truthful custody block as `blocked`
  rather than `fail`, while package-safe assets must still satisfy the strict
  pass criteria.

New blocker:

- Brandcode staging needs at least one stable package-safe asset fixture before
  `get_brand_asset` can pass package delivery proof.

Next Ready lane:

- M001-L09 - Package-Safe Asset Fixture Coordination.

## 2026-05-09 - M001-L09 Blocked Upstream

M001-L09 traced the package-safe asset fixture gap to UCS/Brandcode Studio
package data, not to the MCP custody layer.

Upstream path:

- Hosted MCP fetcher: `src/hosted/brand-fetcher.ts`
- UCS pull route:
  `/Users/jasonlankow/Desktop/UCS/app/api/brand/hosted/[slug]/pull/route.ts`
- UCS compiled Brandcode payload source:
  `/Users/jasonlankow/Desktop/UCS/app/tools/lib/brand-adapter-runtime.ts`
- UCS generated data:
  `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-runtime.ts`
  and
  `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-asset-manifests.ts`

Current asset truth:

- `brandcode:logo:c5-logomark-red.svg` exists in the UCS compiled Brandcode
  payload.
- It has `/logo/c5-logomark-red.svg` plus public URL refs.
- It does not have `deliveryRef.packagePath`, top-level `packagePath`, or a
  package-safe `packageUrl`.
- Existing public URL refs are not package materialization proof by themselves.

Lane result:

- No MCP code changed.
- No custody rule was relaxed.
- Hosted smoke with `BRANDCODE_MCP_SMOKE_ASSET_ID` was not rerun because no
  package-safe fixture exists and local smoke env keys are not present.
- Required upstream data change: UCS/Brandcode Studio runtime packaging must
  materialize one stable Production-approved/runtime Brandcode asset into the
  runtime package and emit a package-safe delivery ref, preferably for
  `brandcode:logo:c5-logomark-red.svg`, such as `deliveryRef.packagePath` or an
  equivalent top-level `packagePath`.

Next Ready lane:

- M001-L10 - UCS Package Asset Delivery Ref Repair.

## 2026-05-09 - M001-L10 Local UCS Fixture Repaired

M001-L10 repaired the upstream UCS package-data fixture locally without changing
MCP custody rules.

UCS result:

- `brandcode:logo:c5-logomark-red.svg` now has `lifecycle:
  "production-approved"`, `inRuntimePackage: true`, and
  `deliveryRef.packagePath:
  "brandcode-brand-runtime/visual/assets/logo/c5-logomark-red.svg"`.
- `app/tools/lib/generate-compiled-brand-runtime.mjs` now preserves package
  delivery fields from manifest assets into the compiled payload.
- The regenerated UCS compiled outputs include the package-safe delivery ref in
  `compiled-brand-runtime.ts`, `compiled-brand-asset-manifests.ts`, and
  `clients/brandcode/.brand/compiled/asset-runtime.json`.
- No private/provider URLs were made public.

Verification:

- Local compiled adapter payload inspection confirmed the asset exposes the
  package-safe delivery ref and no private Blob/provider URL.
- Focused UCS tests passed for the package-safe logomark and adapter payload.
- UCS TypeScript passed.
- UCS `git diff --check` passed.
- Hosted smoke from this repo was attempted with
  `BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg`, but it
  remained blocked because `BRANDCODE_MCP_SMOKE_URL` and
  `BRANDCODE_MCP_SMOKE_FULL_KEY` are not present in the current shell.

Remaining blocker:

- The UCS repair has not been pushed/deployed because Jason's prompt explicitly
  said not to push unless asked. Staging freshness and hosted smoke still need
  to be proven before `get_brand_asset` can be called release-grade.

Next Ready lane:

- M001-L11 - Hosted Package Asset Smoke Proof.

## 2026-05-09 - M001-L11 Blocked On Hosted Inputs

M001-L11 attempted the hosted package asset proof for the already-repaired UCS
fixture without changing MCP custody behavior.

Freshness result:

- Required UCS delivery-ref commit: `37585f98 Add Brandcode package asset delivery ref`
- `/Users/jasonlankow/Desktop/UCS` is still ahead of `origin/main`.
- `37585f98` is not an ancestor of `origin/main`, and no remote branch contains
  it.
- Result: staging freshness cannot be confirmed for the UCS package-data change
  read by `https://mcp.staging.brandcode.studio/brandcode`.

Hosted smoke result:

- Command:
  `BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg npm run smoke:hosted-mcp -- --json`
- Status: `blocked`
- Missing required env:
  - `BRANDCODE_MCP_SMOKE_URL`
  - `BRANDCODE_MCP_SMOKE_FULL_KEY`
- `BRANDCODE_MCP_SMOKE_READ_KEY` is also needed for a fully unblocked
  insufficient-scope proof.

No hosted `get_brand_asset` package delivery claim was made. The missing input
is Jason authorization/push/deploy for UCS commit `37585f98` plus hosted smoke
credentials in the local shell.

Next Ready lane:

- M001-L11 remains the single Ready target until staging freshness and smoke
  credentials exist. Do not advance to battle testing, publish, submit to MCP
  directories, add tools, or relax custody.

## 2026-05-09 - M001-L11 Hosted Package Asset Proof Passed

M001-L11 completed the hosted package asset smoke proof.

Freshness:

- UCS `origin/main` contains `37585f98 Add Brandcode package asset delivery ref`.
- `git -C /Users/jasonlankow/Desktop/UCS merge-base --is-ancestor 37585f98 origin/main`
  exited `0`.
- `git -C /Users/jasonlankow/Desktop/UCS branch -r --contains 37585f98`
  returned `origin/main`.

Hosted smoke:

- Endpoint: `https://mcp.staging.brandcode.studio/brandcode`
- Asset id: `brandcode:logo:c5-logomark-red.svg`
- Overall status: `pass`
- `tools/list` returned the locked 8-tool Phase 0 order.
- `get_brand_asset` returned package-safe custody:
  - `custody_safe: true`
  - `safe_for_mcp: true`
  - `blocked_private_provider_url: false`
  - `delivery_posture: "package_safe"`
  - `delivery_ref_kind: "package_path"`
  - `raw_private_provider_url_exposed: false`
- `brand_feedback` append proof still returned `append_status: recorded`.
- Read-only insufficient-scope proof still passed for `brand_check` and
  `brand_feedback`.

Next Ready lane:

- M001-L12 - Multi-Client Battle Test.

## 2026-05-09 - M001-L12 Blocked On Hosted Client Credentials

M001-L12 attempted the multi-client battle-test lane, but could not complete
hosted smoke or real-client proof in the current environment.

Smoke result:

- Command: `npm run smoke:hosted-mcp -- --json`
- Status: `blocked`
- Missing required env:
  - `BRANDCODE_MCP_SMOKE_URL`
  - `BRANDCODE_MCP_SMOKE_FULL_KEY`

Preview env check:

- `vercel env pull --environment=preview --yes` succeeded into a temporary file.
- The pulled preview env lists `BRANDCODE_MCP_TEST_KEYS` and
  `BRANDCODE_MCP_SERVICE_TOKEN`.
- `BRANDCODE_MCP_TEST_KEYS` is an empty quoted value, so no `brandcode`
  full/read key entries can be derived for local proof.
- A second smoke attempt with endpoint
  `https://mcp.staging.brandcode.studio/brandcode` and asset id
  `brandcode:logo:c5-logomark-red.svg` stayed blocked because
  `BRANDCODE_MCP_SMOKE_FULL_KEY` was unavailable.

Client paths checked:

- Claude Code is installed and supports HTTP MCP servers with Authorization
  headers.
- Codex CLI is installed and supports Streamable HTTP MCP servers with a
  bearer-token env var.
- MCP Inspector is reachable through `npx -y @modelcontextprotocol/inspector`
  and supports CLI HTTP mode plus headers.

No client proof was claimed because none of those clients can truthfully
exercise the target endpoint without usable full/read bearer keys for the
`brandcode` slug. Treating unauthenticated rejection as multi-client proof would
be false.

Required next input:

- Expose `BRANDCODE_MCP_SMOKE_URL=https://mcp.staging.brandcode.studio/brandcode`.
- Expose `BRANDCODE_MCP_SMOKE_FULL_KEY` for `brandcode` with
  `read,check,feedback`.
- Expose `BRANDCODE_MCP_SMOKE_READ_KEY` for `brandcode` with `read` only.
- Expose `BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg`.
- Or populate non-empty `BRANDCODE_MCP_TEST_KEYS` preview entries for the
  `brandcode` slug so local proof can derive those keys.

No hosted code changed, no custody rule was relaxed, and no release, publish, or
directory action was taken.

Next lane posture:

- No lane is Ready while M001-L12 is blocked on hosted client credentials.
- Once the keys are available, M001-L12 should resume as the single Ready lane.

## 2026-05-09 - M001-L12 Multi-Client Battle Test Passed

M001-L12 completed hosted smoke and real-client proof without changing hosted
MCP code, adding tools, relaxing custody, publishing, or submitting to
directories.

Credential/proof-input repair:

- Removed the empty sensitive Preview `BRANDCODE_MCP_TEST_KEYS` value.
- Generated fresh staging-only full/read entries for the `brandcode` slug.
- Added the entries back to Vercel Preview for all Preview branches through the
  interactive Vercel env flow.
- `vercel env pull --environment=preview --yes` still redacts the sensitive
  value locally, so future proof sessions need either an intentional local
  secret handoff or the same generate-and-run shell posture.
- No bearer key was committed to the repo or recorded in docs.

Deployment/proof target:

- Latest staging deployment:
  `https://brandsystem-eipxqt3go-column-five.vercel.app`
- Alias: `https://mcp.staging.brandcode.studio`
- Endpoint: `https://mcp.staging.brandcode.studio/brandcode`
- Package-safe asset id: `brandcode:logo:c5-logomark-red.svg`

Hosted smoke:

- Overall status: `pass`
- `fail: 0`, `blocked: 0`, `skipped: 0`
- `get_brand_asset`: `pass`
- `safe_for_mcp: true`
- `delivery_ref_kind: "package_path"`
- `raw_private_provider_url_exposed: false`

MCP Inspector:

- `tools/list` returned the locked 8-tool Phase 0 order.
- `get_brand_asset` returned package-safe custody with
  `blocked_private_provider_url: false` and package-path delivery.
- Read-only `brand_check` returned structured `insufficient_scope` with
  `status: 403` and `required_scope: "check"`.

Claude Code:

- Used a temporary HTTP MCP config.
- Called `brand_status` and `get_brand_asset`.
- Reported 8 implemented tools, 0 stubs, package-safe asset posture,
  `blocked_private_provider_url: false`, package-path delivery, and no raw
  private/provider URL exposure.

Next Ready lane:

- M001-L13 - Release Candidate Trust Review.

## 2026-05-09 - M001-L13 Release Candidate Trust Review Closed

M001-L13 completed a docs-only release-candidate trust review without
publishing, releasing, submitting to MCP directories, changing public listings,
adding tools, relaxing custody, or introducing selected Brand Kit default
behavior.

Durable review:

- `specs/brandcode-mcp-release-candidate-trust-review.md`

Evidence checked:

- `git fetch origin` completed.
- Before the L13 closeout commit, local `main` was ahead of `origin/main` by 20
  commits.
- Latest remote `main` CI is GitHub Actions run `25571869563`, which passed on
  `61218ac Fix npm audit: basic-ftp DoS, fast-uri path traversal,
  hono/ip-address/postcss XSS`.
- No GitHub CI has run on the local M001 stack from `c4dc704` through the L13
  closeout commit.
- M001-L12 hosted smoke, MCP Inspector proof, and Claude Code proof remain the
  current hosted/client evidence.

Review decision:

- Do not claim release-candidate readiness yet.
- Release/publish remains blocked on Jason approval.
- Strong proof now exists for the locked 8-tool staging surface,
  package-safe Brandcode asset delivery, and two real clients.
- The release-candidate gate remains blocked by hosted-service terms,
  rate-limit/abuse posture reported as `not_reported_by_staging`, unresolved
  `@brandcode/mcp` package/source posture, no CI run on the local M001 stack,
  and no separate Brandcode Use directory metadata.

Blocker conversion:

- Repair packet: M001-L14 Hosted Terms And Rate-Limit Gate.
- Named Jason decision: `@brandcode/mcp` package/source posture.
- Named Jason decision: explicit approval before any release, publish,
  production release, directory submission, or public listing change.
- Product-spine deferral: Brandcode Use directory metadata after terms and
  rate-limit posture settle.
- Product-spine deferral: production-key, non-Brandcode brand, and post-push CI
  proof before any release-candidate claim.

Next Ready lane:

- M001-L14 - Hosted Terms And Rate-Limit Gate.

## 2026-05-09 - M001-L14 Hosted Terms And Rate-Limit Gate Closed

M001-L14 completed a narrowly scoped hosted trust gate without publishing,
releasing, submitting to directories, changing public listing metadata, adding
hosted tools, introducing selected Brand Kit default behavior, pushing, or
relaxing custody.

Durable gate:

- `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`

Code/docs updated:

- `src/hosted/tools/status.ts`
- `test/hosted/tools.test.ts`
- `SECURITY.md`
- `README.md`
- `llms.txt`
- `specs/brandcode-mcp-phase-0-lock.md`
- `specs/brandcode-mcp-pre-release-hardening.md`
- `specs/brandcode-mcp-license-directory-trust-audit.md`
- `specs/brandcode-mcp-release-candidate-trust-review.md`
- `.claudex/packets/M001-L14-hosted-terms-rate-limit-gate.md`
- `.claudex/packets/M001-L15-hosted-service-terms-decision-brief.md`
- `.claudex/prompts/M001-L15-hosted-service-terms-decision-brief.md`

Gate decision:

- The hosted terms/rate-limit gate is blocked, not satisfied.
- `brand_status.rate_limits.status` remains `not_reported_by_staging`.
- `brand_status.rate_limits.release_gate` is now `blocked`.
- The named blocker owner is `Jason decision / Brandcode operations owner`.
- Public release requires command-backed rate-limit enforcement or a
  Jason-approved operations owner and abuse-handling policy.

Remaining Jason decisions:

- Hosted bearer-key access terms.
- Client-owned brand data, feedback, and history privacy/retention.
- Rate-limit/abuse operations owner and launch policy.
- Whether "free in v1 for active Brandcode Studio brands" is approved public
  copy.
- Whether `@brandcode/mcp` package/source posture is MIT, proprietary,
  dual-positioned, or service-only.
- Explicit approval before any release, publish, production release, directory
  submission, public listing change, or push for CI proof.

Verification:

- `git diff --check` passed.
- `npm test -- --run test/hosted/tools.test.ts` passed: 45 tests.
- `npm run lint` passed.
- `npm run build` passed.
- Full `npm test` ran 526 tests: 524 passed and 2 failed in
  `test/tools/smoke.test.ts`.
- Deterministic failing cases:
  - `brand_extract_visual returns gracefully without .brand/`
  - `brand_extract_site returns gracefully without .brand/ when merge is false`
- Failure shape: MCP SDK rejected an invalid tool result because the first
  content item had no valid text/image/audio/resource payload. This is outside
  the hosted terms/rate-limit gate and should become a separate smoke repair if
  Jason wants full-suite green before push.

Next Ready lane:

- M001-L15 - Hosted Service Terms Decision Brief.

## 2026-05-10 - M001-L15 Hosted Service Terms Posture Approved

Jason approved all recommended hosted-service posture items.

Durable decision brief:

- `specs/brandcode-mcp-hosted-service-terms-decision-brief.md`

Approved posture:

- hosted Use access is approved-brand, bearer-key-only, and pre-release;
- brand/runtime/content/assets remain client-owned or client-controlled;
- hosted runtime data is used only to serve MCP tools and governance workflows;
- no raw private/provider URLs, private blob URLs, service tokens, or raw
  custody paths are exposed through hosted MCP responses;
- `brand_feedback` is append-only review input, not canonical governance
  mutation;
- `brand_history` is scoped to brand/key posture and returns compact redacted
  summaries;
- feedback/history retention remains limited and review-oriented, with final
  deletion/export language still needed before public launch copy;
- active rate-limit enforcement is preferred, and any limited launch without
  command-backed enforcement requires a named Brandcode operations owner and
  abuse policy;
- public "free in v1" copy is not approved as launch copy yet;
- `@brandcode/mcp` package/source can likely inherit the repo MIT posture if
  Jason approves that package posture, but hosted service access remains
  separate from source/license access.

Release status:

- No release, npm publish, public listing, directory submission, production
  release, package posture change, or release-candidate claim is approved.
- Full-suite local tests still need repair before push/CI or any
  release-candidate claim.

Next Ready lane:

- M001-L16 - Full Suite Visual Extraction Smoke Repair.

## 2026-05-10 - M001-L16 Full Suite Visual Extraction Smoke Repair Closed

M001-L16 repaired the two deterministic full-suite smoke failures without
changing hosted Brandcode MCP behavior, publishing, releasing, pushing,
submitting to directories, changing listing metadata, adding hosted tools, or
relaxing custody.

Cause:

- Puppeteer screenshots can arrive as Uint8Array values in the current runtime.
- Calling `.toString("base64")` directly on those values produced
  comma-separated byte text rather than valid base64.
- The MCP SDK rejected the first image content block from `brand_extract_visual`
  and `brand_extract_site` as invalid.

Repair:

- Added shared `screenshotToBase64()` encoding in
  `src/lib/visual-extractor.ts`.
- Updated `brand_extract_visual`, `brand_extract_site`, and `brand_start` to
  use the shared encoder before returning screenshot image content.

Verification:

- `npm test -- --run test/tools/smoke.test.ts` passed: 50 tests.
- `npm run lint` passed.
- `npm run build` passed.
- Full `npm test` passed: 39 files, 526 tests.

Next Ready lane:

- M001-L17 - Push CI Proof Authorization.

Named decision:

- Do not push the local M001 stack or seek CI proof until Jason explicitly
  authorizes push or PR proof.

## 2026-05-10 - M001-L17 Push CI Proof Closed

Jason explicitly authorized push in-thread.

Push proof:

- Branch: `main`
- Pushed range: `61218ac..2cf291c`
- Pushed tip: `2cf291c Repair visual extraction smoke responses`

GitHub CI proof:

- Workflow: CI
- Run id: `25641439073`
- URL:
  `https://github.com/Brandcode-Studio/brandsystem-mcp/actions/runs/25641439073`
- Result: success
- Matrix jobs: Node 20 and Node 22 both passed.
- Steps passed in both jobs: `npm ci`, `npm run build`, `npm run lint`,
  `npm test`, and `npm audit --audit-level=high`.

CI annotation:

- GitHub reported Node.js 20 Actions deprecation for `actions/checkout@v4`
  and `actions/setup-node@v4`.
- This is not a current failure, but it should be repaired or explicitly
  hardened before release-candidate claims.

No release, npm publish, public MCP directory submission, public listing
change, hosted tool addition, selected-kit default behavior, or custody
relaxation happened.

Next Ready lane:

- M001-L18 - GitHub Actions Node 24 Compatibility.

## 2026-05-11 - M001-L18 GitHub Actions Node 24 Compatibility Closed

Jason explicitly authorized push.

Push proof:

- Pushed commit: `60aa66f Add Node 24 GitHub Actions compatibility`

GitHub CI proof:

- Workflow: CI
- Run id: `25678340682`
- URL:
  `https://github.com/Brandcode-Studio/brandsystem-mcp/actions/runs/25678340682`
- Result: success
- Matrix jobs: Node 20, Node 22, and Node 24 all passed.
- Steps passed in all three jobs: `npm ci`, `npm run build`, `npm run lint`,
  `npm test`, and `npm audit --audit-level=high`.
- First-party actions used in CI: `actions/checkout@v6` and
  `actions/setup-node@v6`.
- The prior Node.js 20 Actions deprecation annotation did not recur in the
  watched run output or `gh run view` job summary.

No release, npm publish, public MCP directory submission, public listing
change, hosted tool addition, selected-kit default behavior, or custody
relaxation happened.

Next Ready lane:

- M001-L19 - Hosted Rate Limit And Abuse Posture.

## 2026-05-11 - M001-L19 Hosted Rate Limit And Abuse Posture Closed

M001-L19 added active hosted pre-release rate-limit enforcement without making a
production durability claim.

Changed:

- Added `src/hosted/rate-limit.ts` with an in-process fixed-window limiter.
- Wired the hosted HTTP router to check the limiter after bearer auth and
  before MCP transport dispatch.
- Limiter key: environment + brand slug + API key id.
- Default policy: 60 authenticated requests per 60 seconds.
- Operator knobs:
  `BRANDCODE_MCP_RATE_LIMIT_REQUESTS_PER_WINDOW`,
  `BRANDCODE_MCP_RATE_LIMIT_WINDOW_SECONDS`, and emergency disable
  `BRANDCODE_MCP_RATE_LIMIT_DISABLED=1`.
- Over-limit requests return JSON `429 rate_limited` with structured
  `rate_limits`, `retry-after`, and `x-ratelimit-*` headers.
- Successful hosted responses include `x-ratelimit-limit`,
  `x-ratelimit-remaining`, and `x-ratelimit-reset`.
- `brand_status.rate_limits.status` now reports
  `active_pre_release_in_process` when called through the hosted HTTP route,
  including configured limit, remaining count, window/reset fields,
  enforcement type, source, and release-gate posture.

Truthful blocker:

- The limiter is process-local pre-release enforcement, not durable shared
  production enforcement.
- `brand_status.rate_limits.release_gate` remains `blocked`.
- Public release still needs Jason to choose durable shared enforcement or
  approve a named Brandcode operations owner plus abuse-handling runbook.

Verification:

- `git diff --check` passed.
- `npm test -- --run test/hosted/router.test.ts test/hosted/tools.test.ts`
  passed: 57 tests.
- `npm run lint` passed.
- `npm run build` passed.
- Full `npm test` passed: 39 files, 527 tests.

Remote CI proof:

- Jason authorized push.
- Pushed commit: `74d72f5 Harden hosted rate limit abuse posture`.
- GitHub CI run id: `25684546273`.
- URL:
  `https://github.com/Brandcode-Studio/brandsystem-mcp/actions/runs/25684546273`
- Result: success.
- Matrix jobs: Node 20, Node 22, and Node 24 all passed.
- Steps passed in all three jobs: `npm ci`, `npm run build`, `npm run lint`,
  `npm test`, and `npm audit --audit-level=high`.

No release, npm publish, public MCP directory submission, public listing
change, hosted tool addition, selected-kit default behavior, UCS change, or
custody relaxation happened.

Next state:

- No next Ready lane is open.
- Named Jason decision blocker: choose durable shared hosted rate-limit
  enforcement, or approve a named Brandcode operations owner plus
  abuse-handling runbook before any public launch claim.
