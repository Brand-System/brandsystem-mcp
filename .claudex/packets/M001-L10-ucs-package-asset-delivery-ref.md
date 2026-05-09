# M001-L10 - UCS Package Asset Delivery Ref Repair

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Cross-repo upstream fixture repair / hosted proof
**Recommended commit:** `Repair Brandcode package asset delivery ref`

## Why

M001-L09 proved the missing package-safe asset fixture is upstream of the MCP.
The hosted MCP is correctly blocking private-provider-only delivery and should
not infer package custody from ordinary `url` or provider/public refs.

`get_brand_asset` can pass release-grade package delivery proof only after UCS
or Brandcode Studio emits one stable package-safe delivery ref in the hosted
Brandcode package payload.

## Starting Evidence

- Hosted MCP endpoint: `https://mcp.staging.brandcode.studio/brandcode`
- Existing blocked asset id: `brandcode:logo:c5-logomark-red.svg`
- MCP package fetch path: `src/hosted/brand-fetcher.ts`
- UCS pull route:
  `/Users/jasonlankow/Desktop/UCS/app/api/brand/hosted/[slug]/pull/route.ts`
- UCS compiled package source:
  `/Users/jasonlankow/Desktop/UCS/app/tools/lib/brand-adapter-runtime.ts`
- UCS generated compiled data:
  `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-runtime.ts`
  and `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-asset-manifests.ts`

Current Brandcode compiled asset facts:

- `brandcode:logo:c5-logomark-red.svg` has `/logo/c5-logomark-red.svg` and
  public URL refs.
- It does not have `deliveryRef.packagePath`, top-level `packagePath`, or a
  package-safe `packageUrl`.
- Existing `refs.publicUrl` is not a package materialization proof by itself.

## Scope

Coordinate or implement the smallest upstream repair that creates one true
package-safe Brandcode staging asset fixture, then return to hosted MCP proof.

Expected implementation owner is UCS/Brandcode Studio runtime packaging. This
repo should change only for coordination docs or smoke harness assertions if a
true fixture exposes a custody assertion bug.

## Required Upstream Data Change

Materialize one stable Production-approved/runtime Brandcode asset into the
runtime package and emit a package-safe delivery field accepted by the MCP, for
example:

```json
{
  "id": "brandcode:logo:c5-logomark-red.svg",
  "deliveryRef": {
    "posture": "package_safe",
    "packagePath": "brandcode/runtime/assets/logo/c5-logomark-red.svg"
  }
}
```

An equivalent top-level `packagePath` is also acceptable if it points to a real
runtime/package artifact path.

Do not satisfy this by exposing raw private/provider URLs, making private Blob
assets public, or copying a public URL into a package field unless UCS/Studio
has made that URL the governed package delivery contract.

## Acceptance

- The upstream fixture exists in staging and is stable enough to use in smoke.
- `BRANDCODE_MCP_SMOKE_ASSET_ID` is set to the package-safe asset id.
- `npm run smoke:hosted-mcp -- --json` passes `get_brand_asset`.
- `get_brand_asset` returns `custody.safe_for_mcp: true`.
- `get_brand_asset` returns `custody.blocked_private_provider_url: false`.
- `delivery_ref.posture` is not `blocked_private_provider_url`.
- The response exposes no raw private/provider URLs.
- Existing locked 8-tool order remains unchanged.
- Sprint board, messages, and `HANDOFF.md` are updated at closeout.
- Exactly one next Ready lane remains after closeout.

## Out Of Scope

- No public release, npm publish, or MCP directory submission.
- No new hosted tools.
- No package rename.
- No selected Brand Kit default behavior.
- No canonical governance mutation from the MCP.
- No custody relaxation.

## Next Suggested Lane

After package-safe asset proof passes, the next Ready lane should be multi-client
battle testing across real MCP clients and at least the Brandcode staging brand.
