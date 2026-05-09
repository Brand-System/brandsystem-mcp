# M001-L12 - Multi-Client Battle Test

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Hosted proof / client compatibility
**Recommended commit:** `Battle test Brandcode MCP clients`

## Why

The hosted Brandcode Use MCP now has release-grade staging proof for the locked
8-tool surface against the Brandcode brand, including package-safe
`get_brand_asset` delivery. Before any release candidate review, the server
needs realistic client diversity proof and durable failure capture.

This lane should reveal MCP client interoperability issues, auth/scope confusion,
response-shape surprises, or directory-review risks before public launch.

## Scope

Battle test the hosted MCP endpoint across real clients without changing the
locked v0.1 surface.

Proof target:

- Endpoint: `https://mcp.staging.brandcode.studio/brandcode`
- Package-safe asset id: `brandcode:logo:c5-logomark-red.svg`
- Tool surface: exactly the locked 8 tools:
  - `brand_runtime`
  - `brand_search`
  - `brand_check`
  - `brand_status`
  - `list_brand_assets`
  - `get_brand_asset`
  - `brand_feedback`
  - `brand_history`

Recommended proof:

- Run the repo smoke harness first with full/read keys and the package-safe asset
  id.
- Exercise the endpoint from at least two real MCP clients where practical.
- Cover full-key and read-only-key postures.
- Confirm append-only `brand_feedback` does not mutate canonical governance.
- Confirm read-only insufficient-scope behavior for `brand_check` and
  `brand_feedback`.
- Capture any client-specific issue as either a repair packet, a product-spine
  deferral, or a named Jason decision.

## Out Of Scope

- No public release, npm publish, or MCP directory submission.
- No new hosted tools.
- No package rename.
- No canonical governance mutation from the MCP.
- No selected Brand Kit hosted default behavior.
- No custody relaxation.
- No directory metadata rewrite unless a client proof finding requires a narrow
  docs repair.

## Acceptance

- Hosted smoke passes before or during the lane.
- At least two real client paths are attempted, or the lane names the exact
  unavailable client/access blocker.
- All 8 tools are either exercised in a real client or covered by smoke with a
  clear explanation for any client limitation.
- Full-key and read-only-key behavior are both covered.
- Package-safe `get_brand_asset` proof remains green and exposes no raw
  private/provider URL.
- Any failure becomes a packet, deferral, or named Jason decision, not a
  chat-only note.
- Sprint board, messages, and `HANDOFF.md` are updated at closeout.
- Exactly one next Ready lane remains after closeout.

## Starting Evidence

M001-L11 hosted smoke passed on 2026-05-09:

- `tools/list` returned the locked 8-tool Phase 0 order.
- `list_brand_assets` returned package-safe catalog posture.
- `get_brand_asset` for `brandcode:logo:c5-logomark-red.svg` returned
  `safe_for_mcp: true`, `blocked_private_provider_url: false`,
  `delivery_posture: "package_safe"`, `delivery_ref_kind: "package_path"`, and
  no raw private/provider URL exposure.
- `brand_feedback` returned `append_status: recorded`.
- Read-only insufficient-scope checks passed for `brand_check` and
  `brand_feedback`.

## Next Suggested Lane

After multi-client battle testing, the next lane should repair any blocking
client findings or begin release-candidate trust review if no blockers remain.
