# M001-L09 - Package-Safe Asset Fixture Coordination

**Status:** Ready
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

After package-safe asset proof passes, the next lane should be multi-client
battle testing across real MCP clients and at least the Brandcode staging brand.
