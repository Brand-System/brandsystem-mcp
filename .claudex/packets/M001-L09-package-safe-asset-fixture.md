# M001-L09 - Package-Safe Asset Fixture Coordination

**Status:** Blocked
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Cross-repo fixture coordination / hosted proof
**Recommended commit:** `Coordinate Brandcode MCP package asset fixture`

## Why

M001-L08 proved the MCP custody behavior against staging: `get_brand_asset`
truthfully blocks private-provider-only assets and does not expose raw private
URLs. That is good security posture, but it is not enough for release-grade
asset delivery proof.

The current Brandcode staging package has no package-safe asset fixture. All six
assets returned by `list_brand_assets` report
`delivery_ref.posture: "blocked_private_provider_url"`, so the smoke harness can
only report `get_brand_asset` as `blocked`.

Before multi-client battle testing, Brandcode staging needs at least one stable
Production-approved/package asset whose hosted MCP response can pass:

- `custody.safe_for_mcp: true`
- `custody.blocked_private_provider_url: false`
- a package delivery ref that is not a raw private/provider URL
- no raw private/provider URL exposure anywhere in the response

## Scope

Coordinate the smallest path to one stable package-safe Brandcode asset fixture.

Expected work may be in UCS, Brandcode runtime packaging, or Studio data. This
repo should only change if the proof command, docs, or smoke fixture notes need
to reflect the result.

Inspect and update narrowly:

- `.claudex/sprints/current.md`
- `.claudex/messages/M001-messages.md`
- `HANDOFF.md`
- this packet
- `.claudex/prompts/M001-L09-package-safe-asset-fixture.md`
- `specs/brandcode-mcp-pre-release-hardening.md` only if the blocker posture changes
- `scripts/hosted-mcp-smoke.mjs` only if a true package-safe fixture reveals a custody assertion bug

## Out Of Scope

- No release, publish, or MCP directory submission.
- No new hosted tools.
- No package rename.
- No canonical governance mutation from the MCP.
- No selected Brand Kit hosted default behavior.
- No public/private Blob custody relaxation.
- No making private provider URLs public just to satisfy the smoke test.

## Acceptance

- A stable package-safe Brandcode asset id is identified or created upstream.
- Hosted smoke is rerun with `BRANDCODE_MCP_SMOKE_ASSET_ID` set to that id.
- `get_brand_asset` passes package delivery proof.
- The response exposes no raw private/provider URLs.
- If upstream fixture creation is blocked, this lane names the exact UCS/Studio
  owner or Jason decision needed and keeps the blocker durable in sprint docs.
- Existing locked 8-tool order remains unchanged.
- `git diff --check` passes for any docs/code changes.
- Relevant focused tests pass if code changes.
- Sprint board, messages, and `HANDOFF.md` are updated at closeout.
- Exactly one next Ready lane remains after closeout.

## Closeout Result

M001-L09 identified the upstream fixture location and stopped without faking
package custody.

Hosted `get_brand_asset` reads package data through:

- MCP fetcher: `src/hosted/brand-fetcher.ts`
- UCS route: `/Users/jasonlankow/Desktop/UCS/app/api/brand/hosted/[slug]/pull/route.ts`
- UCS compiled Brandcode payload source:
  `/Users/jasonlankow/Desktop/UCS/app/tools/lib/brand-adapter-runtime.ts`
- UCS generated compiled data:
  `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-runtime.ts`
  and `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-asset-manifests.ts`

The selected asset `brandcode:logo:c5-logomark-red.svg` exists in the UCS
compiled Brandcode payload with:

- root-relative runtime URL: `/logo/c5-logomark-red.svg`
- public URL refs on `refs.publicUrl`, `refs.chatUrl`, and `refs.figmaUrl`
- no `deliveryRef.packagePath`
- no top-level `packagePath` or `package_path`
- no package-safe `packageUrl`

That is not enough for release-grade package delivery proof. The MCP custody
contract intentionally treats a raw `url` without a package-safe delivery ref as
blocked rather than guessing that the asset has been materialized into a
portable/runtime package.

Exact upstream owner/data change needed:

- Owner: UCS/Brandcode Studio runtime packaging.
- Data change: materialize one stable Production-approved/runtime Brandcode
  asset, preferably `brandcode:logo:c5-logomark-red.svg`, into the hosted
  runtime package and emit a package-safe delivery field accepted by the MCP,
  such as `deliveryRef: { posture: "package_safe", packagePath:
  "brandcode/runtime/assets/logo/c5-logomark-red.svg" }` or an equivalent
  top-level `packagePath`.
- Constraint: do not satisfy this by exposing raw provider/private URLs or by
  copying the existing public URL into a package field unless UCS/Studio has
  actually made that URL the governed package delivery contract.
- Follow-up proof: deploy UCS staging freshness, then rerun
  `npm run smoke:hosted-mcp -- --json` from this repo with
  `BRANDCODE_MCP_SMOKE_ASSET_ID` set to the package-safe asset id.

No MCP code changed in L09.

## Known Starting Evidence

Latest proof target from M001-L08:

- Endpoint: `https://mcp.staging.brandcode.studio/brandcode`
- Deployment: `https://brandsystem-qhfz5p7o6-column-five.vercel.app`
- Blocked asset id: `brandcode:logo:c5-logomark-red.svg`

L08 hosted result:

- `list_brand_assets` returned six assets and `custody_safe: true`.
- All six current assets report `delivery_ref.posture:
  "blocked_private_provider_url"`.
- `get_brand_asset` for `brandcode:logo:c5-logomark-red.svg` was classified as
  `blocked` because the MCP correctly withheld private-provider-only delivery.

## Next Suggested Lane

M001-L10 should repair the upstream UCS/Studio package asset delivery ref, then
return to hosted smoke proof. Multi-client battle testing should wait until
`get_brand_asset` passes package delivery proof.
