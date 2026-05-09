# Build Lane Prompt - M001-L12 Multi-Client Battle Test

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L12-multi-client-battle-test.md`
- `.claudex/packets/M001-L11-hosted-package-asset-smoke-proof.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-pre-release-hardening.md`
- `scripts/hosted-mcp-smoke.mjs`
- `SECURITY.md`

Task:

Battle test the hosted Brandcode MCP endpoint across real MCP clients before
release-candidate review. This is a proof and failure-capture lane, not a
release lane.

Starting truth:

- Endpoint: `https://mcp.staging.brandcode.studio/brandcode`
- Package-safe asset id: `brandcode:logo:c5-logomark-red.svg`
- M001-L11 hosted smoke passed for the locked 8-tool surface.
- `get_brand_asset` now passes package-safe delivery proof with no raw
  private/provider URL exposure.

Do not publish, release, submit to directories, add tools, rename packages,
mutate canonical governance from the MCP, relax custody, or introduce selected
Brand Kit default behavior.

Required proof path:

1. Run the repo smoke harness with full/read keys and
   `BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg`.
2. Exercise the hosted endpoint from at least two real MCP clients where
   practical.
3. Cover full-key and read-only-key postures.
4. Confirm the locked 8-tool surface, package-safe asset delivery,
   append-only feedback, scoped history, and insufficient-scope behavior.
5. Turn any failure into a repair packet, product-spine deferral, or named Jason
   decision.

If a client, credential, or access path is unavailable, do not fake client proof.
Name the exact blocker and keep it durable in sprint docs.

Verification:

- `git diff --check`
- hosted smoke command with `BRANDCODE_MCP_SMOKE_ASSET_ID`
- client proof notes with enough detail to reproduce
- relevant focused tests only if code changes

Closeout:

- Update `.claudex/sprints/current.md`
- Update `.claudex/packets/M001-L12-multi-client-battle-test.md`
- Update `.claudex/messages/M001-messages.md`
- Update `HANDOFF.md`
- Leave exactly one next Ready lane
- Commit directly to `main` with an imperative commit message
- Do not push unless Jason explicitly asks
