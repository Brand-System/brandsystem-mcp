# Build Lane Prompt - M001-L08 Asset Fetch And Custody Proof

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L08-asset-fetch-custody-proof.md`
- `HANDOFF.md`
- `SECURITY.md`
- `specs/brandcode-mcp-license-directory-trust-audit.md`
- `specs/brandcode-mcp-pre-release-hardening.md`
- `specs/brandcode-mcp-phase-0-lock.md`
- `specs/brandcode-mcp-use-roadmap-alignment.md`
- `scripts/hosted-mcp-smoke.mjs`
- `src/hosted/tools/assets.ts`
- hosted asset tests in `test/hosted/tools.test.ts`

Task:

Implement M001-L08 narrowly. Prove `get_brand_asset` against staging with a stable Brandcode asset id and harden asset custody proof if the current harness/tests do not fully prove package-safe delivery without raw private provider URLs.

Do not publish, release, submit to directories, add tools, rename packages, mutate canonical governance, relax custody, or introduce selected-kit hosted behavior.

Required proof path:

1. Use `list_brand_assets` against `https://mcp.staging.brandcode.studio/brandcode` to select a stable asset id.
2. Run hosted smoke with `BRANDCODE_MCP_SMOKE_ASSET_ID` set.
3. Confirm `get_brand_asset` passes and the returned asset is package-safe.
4. Confirm the proof does not expose raw private provider URLs.

Expected outputs:

- If needed, stricter smoke-harness asset custody assertions.
- If needed, focused hosted asset tests for any discovered custody gap.
- Sprint closeout docs updated with the selected asset id and proof result.
- Exactly one next Ready lane after closeout.

Before edits, declare write scope. Preserve untracked `.claude/` and `prompt`.

Verification:

- `git diff --check`
- relevant focused tests, especially hosted asset/smoke tests if touched
- `npm run lint`
- `npm run build`
- hosted smoke command with `BRANDCODE_MCP_SMOKE_ASSET_ID`

Closeout:

- Update `.claudex/sprints/current.md`
- Update `.claudex/packets/M001-L08-asset-fetch-custody-proof.md`
- Update `.claudex/messages/M001-messages.md`
- Update `HANDOFF.md`
- Commit directly to `main` with an imperative commit message
- Do not push unless Jason explicitly asks
