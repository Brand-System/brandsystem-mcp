# M001-L08 - Asset Fetch And Custody Proof

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Hosted proof / custody hardening
**Recommended commit:** `Prove Brandcode MCP asset custody`

## Why

M001-L07 covered the hosted auth/scope/security matrix and documented the
current rate-limit posture. The remaining hosted smoke gap is still
`get_brand_asset`: staging proof has not used a stable
`BRANDCODE_MCP_SMOKE_ASSET_ID`, and release trust still depends on proving that
asset fetches return package-safe delivery refs without raw private provider
URLs.

## Scope

Select or request one stable staging asset id for the Brandcode hosted package
and prove `get_brand_asset` through the existing hosted smoke harness.

Inspect and update narrowly:

- `scripts/hosted-mcp-smoke.mjs` only if the existing asset assertions need a
  stricter custody check;
- hosted asset tests only if they miss a custody case discovered during proof;
- `SECURITY.md` or hardening docs only if the proof changes a security claim;
- `.claudex/sprints/current.md`, `.claudex/messages/M001-messages.md`, and
  `HANDOFF.md` at closeout.

## Out Of Scope

- No release, publish, or directory submission.
- No new hosted tools.
- No package rename.
- No canonical governance mutation.
- No selected Brand Kit hosted publish/share work.
- No public/private Blob custody relaxation.

## Acceptance

- Hosted proof includes `BRANDCODE_MCP_SMOKE_ASSET_ID` and `get_brand_asset`.
- The returned asset is package-safe, or the blocker explains why no package-safe
  delivery ref exists for the selected id.
- Proof does not expose raw private provider URLs.
- Existing locked 8-tool order remains unchanged.
- `git diff --check` passes.
- Relevant focused tests pass.
- Sprint board, messages, and `HANDOFF.md` are updated at closeout.
- Exactly one next Ready lane remains after closeout.

## Current Attempt - 2026-05-08

Custody hardening landed locally, but hosted proof is still blocked.

Local changes completed:

- `scripts/hosted-mcp-smoke.mjs` now fails `get_brand_asset` unless the
  returned asset is package-safe, has `custody.safe_for_mcp: true`, does not
  report `blocked_private_provider_url`, has a package delivery ref, and does
  not expose raw private/provider URLs.
- `src/hosted/tools/assets.ts` now blocks private-looking `packageUrl` values
  instead of treating them as package-safe.
- `test/hosted/tools.test.ts` covers that private-looking package URL custody
  case.

Hosted proof blocker:

- Local shell env has no `BRANDCODE_MCP_SMOKE_URL`,
  `BRANDCODE_MCP_SMOKE_FULL_KEY`, `BRANDCODE_MCP_SMOKE_READ_KEY`, or
  `BRANDCODE_MCP_SMOKE_ASSET_ID`.
- Vercel Preview env lists `BRANDCODE_MCP_TEST_KEYS`, but both `vercel env pull
  --environment=preview --yes` and `vercel env run -e preview` expose empty
  sensitive values to this local process.
- Because no staging bearer key is available locally, `list_brand_assets` cannot
  be run against `https://mcp.staging.brandcode.studio/brandcode`, no stable
  asset id can be selected, and the required hosted smoke command with
  `BRANDCODE_MCP_SMOKE_ASSET_ID` cannot complete yet.

L08 remained the single Ready lane until Jason provided/exposed:

- `BRANDCODE_MCP_SMOKE_URL=https://mcp.staging.brandcode.studio/brandcode`
- `BRANDCODE_MCP_SMOKE_FULL_KEY`
- `BRANDCODE_MCP_SMOKE_READ_KEY`
- a stable `BRANDCODE_MCP_SMOKE_ASSET_ID`, or enough access to run
  `list_brand_assets` and select one without exposing secrets in chat.

## Closeout - 2026-05-08

L08 completed as custody proof with a real upstream package-fixture blocker.

Deployed proof target:

- Staging URL: `https://mcp.staging.brandcode.studio/brandcode`
- Deployment: `https://brandsystem-qhfz5p7o6-column-five.vercel.app`
- Selected asset id: `brandcode:logo:c5-logomark-red.svg`

Hosted findings:

- `list_brand_assets` returned six assets and `custody_safe: true`.
- All six staging assets currently report `delivery_ref.posture: "blocked_private_provider_url"`.
- No package-safe asset delivery ref exists in the current Brandcode staging package.
- `get_brand_asset` returned the selected asset as unsafe for MCP delivery with
  `blocked_private_provider_url: true`.
- The response exposed no raw private/provider URLs.

Harness behavior after this lane:

- Package-safe asset responses still pass only when `custody.safe_for_mcp: true`,
  a package delivery ref is present, no private/provider URL is exposed, and the
  asset is not blocked for private provider custody.
- Private-provider-only asset responses are now classified as `blocked` instead
  of `fail` when the MCP truthfully blocks delivery and exposes no raw URL.
- Any response that exposes a raw private/provider URL or falsely claims package
  safety still fails.

Verification:

- `git diff --check`
- `npm test -- --run test/scripts/hosted-mcp-smoke.test.ts test/hosted/tools.test.ts`
- `npm run lint`
- `npm run build`
- Hosted smoke with `BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg`

Next lane:

- M001-L09 should coordinate or create a stable package-safe Brandcode asset
  fixture before multi-client battle testing.
