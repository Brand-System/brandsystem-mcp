# Build Prompt - M001-L23 Limited Client Readiness Plan

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp` on `main`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `HANDOFF.md`
- `.claudex/packets/M001-L23-limited-client-readiness-plan.md`
- `specs/brandcode-mcp-package-source-posture-decision-brief.md`
- `specs/brandcode-mcp-hosted-data-policy.md`
- `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`

Task:

Implement M001-L23 narrowly. Jason chose Option 4 for v0.1 limited-client
posture: public `@brandcode/mcp` package/source distribution is deferred, while
approved clients may use the hosted Brandcode MCP with brand-scoped bearer
keys. Create the durable limited-client readiness plan and align sprint docs.

Hard constraints:

- Do not publish, release, npm publish, submit to directories, alter public
  listing metadata, change package metadata, add hosted tools, or relax custody.
- Do not generate or expose production client keys unless Jason explicitly asks.
- Option 3 is future direction only; do not implement or publish a connector
  package in this lane.
- Jason approval remains a hard blocker for any release/publish action.
- Preserve untracked `.claude/` and `prompt`.

Closeout:

- Update the packet, `.claudex/sprints/current.md`,
  `.claudex/messages/M001-messages.md`, and `HANDOFF.md`.
- Run `git diff --check`; run code checks only if code changes.
- Commit directly to `main` with an imperative commit message.
