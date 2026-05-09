# Build Lane Prompt - M001-L10 UCS Package Asset Delivery Ref Repair

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L10-ucs-package-asset-delivery-ref.md`
- `.claudex/packets/M001-L09-package-safe-asset-fixture.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-pre-release-hardening.md`
- `scripts/hosted-mcp-smoke.mjs`
- `src/hosted/tools/assets.ts`
- hosted asset tests in `test/hosted/tools.test.ts`

Task:

Repair the upstream UCS/Brandcode package fixture blocker without relaxing MCP
custody.

Starting truth:

- M001-L09 traced the missing package-safe fixture to UCS, not the MCP.
- Hosted MCP reads UCS package data through
  `GET /api/brand/hosted/{slug}/pull`.
- For slug `brandcode`, UCS uses the compiled payload from
  `/Users/jasonlankow/Desktop/UCS/app/tools/lib/brand-adapter-runtime.ts`,
  `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-runtime.ts`, and
  `/Users/jasonlankow/Desktop/UCS/app/tools/lib/compiled-brand-asset-manifests.ts`.
- Existing asset `brandcode:logo:c5-logomark-red.svg` has public URL refs but no
  `deliveryRef.packagePath`, top-level `packagePath`, or equivalent
  package-safe delivery ref.

Required proof path:

1. Coordinate or implement the UCS/Studio runtime packaging data change that
   materializes one stable Production-approved/runtime Brandcode asset into the
   package and emits a real package-safe delivery ref.
2. Keep private/provider URLs private. Do not make private Blob/provider URLs
   public and do not copy an ordinary public URL into a package field unless it
   is truly the governed package delivery contract.
3. Deploy or confirm staging freshness for
   `https://mcp.staging.brandcode.studio/brandcode`.
4. Rerun hosted smoke from this repo with
   `BRANDCODE_MCP_SMOKE_ASSET_ID` set to the package-safe asset id.
5. Confirm `get_brand_asset` passes and exposes no raw private/provider URLs.

If the fixture cannot be created, do not fake success. Name the exact
UCS/Studio owner, data change, or Jason decision needed, and leave that blocker
durable in sprint docs.

Verification:

- `git diff --check`
- relevant focused tests if code changes
- hosted smoke command with `BRANDCODE_MCP_SMOKE_ASSET_ID` when the package-safe
  fixture exists

Closeout:

- Update `.claudex/sprints/current.md`
- Update `.claudex/packets/M001-L10-ucs-package-asset-delivery-ref.md`
- Update `.claudex/messages/M001-messages.md`
- Update `HANDOFF.md`
- Leave exactly one next Ready lane
- Commit directly to `main` with an imperative commit message
- Do not push unless Jason explicitly asks
