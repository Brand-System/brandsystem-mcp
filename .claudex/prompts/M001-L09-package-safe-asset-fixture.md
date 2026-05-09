# Build Lane Prompt - M001-L09 Package-Safe Asset Fixture Coordination

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L09-package-safe-asset-fixture.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-pre-release-hardening.md`
- `scripts/hosted-mcp-smoke.mjs`
- `src/hosted/tools/assets.ts`
- hosted asset tests in `test/hosted/tools.test.ts`

Task:

Implement M001-L09 narrowly. The goal is not to relax MCP custody. The goal is
to coordinate or create one stable package-safe Brandcode staging asset fixture
so hosted `get_brand_asset` can pass release-grade package delivery proof.

Starting truth:

- M001-L08 proved `get_brand_asset` against
  `https://mcp.staging.brandcode.studio/brandcode`.
- Selected blocked asset id: `brandcode:logo:c5-logomark-red.svg`.
- All six current staging assets report
  `delivery_ref.posture: "blocked_private_provider_url"`.
- The MCP is behaving correctly by blocking private-provider-only delivery and
  exposing no raw private/provider URLs.

Do not publish, release, submit to directories, add tools, rename packages,
mutate canonical governance from the MCP, relax custody, or make private
provider URLs public.

Required proof path:

1. Identify the upstream place where Brandcode staging package assets should
   gain a package-safe delivery ref.
2. Coordinate or create one stable package-safe asset fixture upstream.
3. Rerun hosted smoke with `BRANDCODE_MCP_SMOKE_ASSET_ID` set to the package-safe
   asset id.
4. Confirm `get_brand_asset` passes and exposes no raw private/provider URLs.

If the fixture cannot be created in this repo, do not fake success. Name the
exact UCS/Studio owner, data change, or Jason decision needed, and leave that as
a durable blocker in sprint docs.

Before edits, declare write scope. Preserve untracked `.claude/` and `prompt`.

Verification:

- `git diff --check`
- relevant focused tests if code changes
- hosted smoke command with `BRANDCODE_MCP_SMOKE_ASSET_ID` when the package-safe
  fixture exists

Closeout:

- Update `.claudex/sprints/current.md`
- Update `.claudex/packets/M001-L09-package-safe-asset-fixture.md`
- Update `.claudex/messages/M001-messages.md`
- Update `HANDOFF.md`
- Leave exactly one next Ready lane
- Commit directly to `main` with an imperative commit message
- Do not push unless Jason explicitly asks
