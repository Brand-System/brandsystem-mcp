# Build Lane Prompt - M001-L01 Hosted Proof Harness And Truth Spine

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L01-hosted-proof-harness.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-phase-0-lock.md`
- `specs/brandcode-mcp-use-roadmap-alignment.md`

Task:

Implement M001-L01 narrowly. Add a repo-native hosted Brandcode MCP smoke harness and the minimum docs updates needed so hosted proof becomes repeatable. Do not add tools, do not provision secrets, do not change DNS/Vercel settings, and do not publish.

The harness should use env-provided endpoint and bearer keys, verify the locked 8-tool surface, exercise the core hosted tools, and prove insufficient-scope behavior. It must not hardcode secrets. If optional proof inputs are absent, report `blocked` or `skipped` with the exact missing dependency.

Before edits, declare write scope. Preserve untracked `.claude/` and `prompt`.

Verify with:

- `npm run lint`
- `npm run build`
- a relevant test command, or explain why the lane is docs/script-only
- the smoke harness help/env-missing path

Closeout:

- Update `.claudex/sprints/current.md`
- Update `.claudex/packets/M001-L01-hosted-proof-harness.md`
- Update `.claudex/messages/M001-messages.md`
- Update `HANDOFF.md`
- Commit directly to `main` with an imperative commit message
- Do not push unless Jason explicitly asks
