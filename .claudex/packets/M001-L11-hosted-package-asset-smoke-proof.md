# M001-L11 - Hosted Package Asset Smoke Proof

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Hosted proof / staging freshness
**Recommended commit:** `Prove Brandcode package asset smoke`

## Why

M001-L10 repaired the upstream UCS compiled package data locally so
`brandcode:logo:c5-logomark-red.svg` now has a governed package-safe delivery
ref in the compiled Brandcode runtime payload.

Hosted `get_brand_asset` still cannot be claimed release-grade until staging is
fresh with that UCS change and the hosted MCP smoke passes against the package
asset id.

## Starting Evidence

- Package-safe asset id: `brandcode:logo:c5-logomark-red.svg`
- Local UCS source field:
  `clients/brandcode/.brand/brand.json` ->
  `deliveryRef.packagePath:
  "brandcode-brand-runtime/visual/assets/logo/c5-logomark-red.svg"`
- Local UCS compiled outputs now include the same delivery ref in:
  - `app/tools/lib/compiled-brand-runtime.ts`
  - `app/tools/lib/compiled-brand-asset-manifests.ts`
  - `clients/brandcode/.brand/compiled/asset-runtime.json`
- Local verification passed:
  - `node --loader ./tests/studio/ts-extension-loader.mjs --test --test-name-pattern "package-safe logomark delivery|compiled brand adapter payload exposes runtime" tests/studio/compiled-brand-asset-manifests.test.mjs tests/studio/brand-adapter-runtime.test.mjs`
  - `npx tsc --noEmit --pretty false`
  - `git diff --check`
- Hosted smoke from this repo was blocked because the current shell lacked
  `BRANDCODE_MCP_SMOKE_URL` and `BRANDCODE_MCP_SMOKE_FULL_KEY`.

## Scope

Prove the already-repaired package asset fixture in staging without changing MCP
custody rules.

Expected steps:

- Confirm the UCS change containing the package-safe delivery ref is deployed to
  the UCS source read by `https://mcp.staging.brandcode.studio/brandcode`.
- Run hosted smoke from this repo with:
  `BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg`.
- Confirm `get_brand_asset` passes package delivery proof.
- Confirm the response exposes no raw private/provider URLs.

If the current environment lacks smoke credentials or the UCS change has not
been pushed/deployed, stop and name the exact missing input. Do not fake success
and do not weaken MCP custody behavior.

## Acceptance

- Hosted staging freshness is confirmed for the UCS package-data change.
- `npm run smoke:hosted-mcp -- --json` passes with
  `BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg`.
- `get_brand_asset` returns `custody.safe_for_mcp: true`.
- `get_brand_asset` returns `custody.blocked_private_provider_url: false`.
- `delivery_ref.package_path` is present and no raw private/provider URL appears
  anywhere in the response.
- Sprint board, messages, and `HANDOFF.md` are updated at closeout.
- Exactly one next Ready lane remains after closeout.

## Out Of Scope

- No public release, npm publish, or MCP directory submission.
- No new hosted tools.
- No selected Brand Kit default behavior.
- No canonical governance mutation from the MCP.
- No custody relaxation.
- No push unless Jason explicitly authorizes it.

## Next Suggested Lane

After hosted package asset proof passes, the next Ready lane should be
multi-client battle testing across real MCP clients and at least the Brandcode
staging brand.
