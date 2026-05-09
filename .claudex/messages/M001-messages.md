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
