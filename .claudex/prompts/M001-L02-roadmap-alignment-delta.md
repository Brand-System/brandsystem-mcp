# Build Lane Prompt - M001-L02 Roadmap Alignment Delta

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L02-roadmap-alignment-delta.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-phase-0-lock.md`
- `specs/brandcode-mcp-use-roadmap-alignment.md`
- `README.md`

Task:

Implement M001-L02 narrowly. Refresh the Brandcode Use MCP roadmap/product-spine docs so they match the current repo state after M001-L01 and the hosted 8-tool implementation run.

Do not change hosted implementation code, smoke harness behavior, secrets, DNS/Vercel settings, package publishing, or tool surface. The output should be truthful roadmap/docs alignment only.

Required posture:

- `@brandsystem/mcp` remains Build.
- `@brandcode/mcp` remains hosted Use.
- v0.1 remains locked at exactly 8 tools.
- Full Brand Runtime is the default hosted object.
- selected Brand Kits and campaign/exploratory kits stay out of default v0.1 unless UCS has durable hosted selected-kit publish/share truth.
- `DESIGN.md` is an adapter/readable brief, not runtime authority.
- `brand_feedback` is append-only review/hosted patch-request input, not canonical mutation.
- Current proof blockers stay explicit: staging DNS/alias/cert, Vercel client access/deployment protection, UCS service token for feedback append.

Before edits, declare write scope. Preserve untracked `.claude/` and `prompt`.

Verify with:

- `git diff --check`
- `npm run lint` if the lane touches code/package references; otherwise explain why docs-only verification is enough

Closeout:

- Update `.claudex/sprints/current.md`
- Update `.claudex/packets/M001-L02-roadmap-alignment-delta.md`
- Update `.claudex/messages/M001-messages.md`
- Update `HANDOFF.md`
- Commit directly to `main` with an imperative commit message
- Do not push unless Jason explicitly asks
