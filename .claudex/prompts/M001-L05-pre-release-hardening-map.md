# Build Lane Prompt - M001-L05 Pre-Release Hardening Map

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L05-pre-release-hardening-map.md`
- `HANDOFF.md`
- `README.md`
- `SECURITY.md`
- `LICENSE`
- `package.json`
- `glama.json`
- `server.json`
- `smithery.yaml`
- `llms.txt`
- `specs/brandcode-mcp-phase-0-lock.md`
- `specs/brandcode-mcp-use-roadmap-alignment.md`

Task:

Implement M001-L05 narrowly. Create a durable pre-release hardening plan for Brandcode MCP. Do not publish, release, submit to directories, add tools, mutate canonical governance, or introduce selected-kit default behavior.

Required posture:

- The next phase is hardening, not release.
- `@brandsystem/mcp` remains Build.
- `@brandcode/mcp` remains hosted Use.
- v0.1 remains locked at exactly 8 tools.
- Hosted service-token env is `BRANDCODE_MCP_SERVICE_TOKEN`.
- Staging proof exists at `https://mcp.staging.brandcode.studio/brandcode`.
- `brand_feedback` append proof has passed with `append_status: recorded`.
- Before public release, license, security hardening, test depth, directory scoring posture, and multi-client battle testing must be stronger.

Produce:

- A hardening plan/checklist in `specs/` or `.claudex/`.
- One next Ready lane only.
- Updated `.claudex/sprints/current.md`, `.claudex/messages/M001-messages.md`, and `HANDOFF.md`.

Before edits, declare write scope. Preserve untracked `.claude/` and `prompt`.

Verify with:

- `git diff --check`
- docs-only verification is acceptable unless code/package metadata changes

Closeout:

- Commit directly to `main` with an imperative commit message.
- Do not push unless Jason explicitly asks.
