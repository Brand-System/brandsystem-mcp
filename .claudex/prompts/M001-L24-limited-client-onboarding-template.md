# Build Prompt - M001-L24 Limited Client Onboarding Template

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp` on `main`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `HANDOFF.md`
- `.claudex/packets/M001-L24-limited-client-onboarding-template.md`
- `specs/brandcode-mcp-limited-client-readiness-plan.md`
- `specs/brandcode-mcp-hosted-data-policy.md`
- `specs/brandcode-mcp-package-source-posture-decision-brief.md`

Task:

Implement M001-L24 narrowly. Turn the L23 limited-client readiness plan into a
reusable per-client onboarding template/checklist for approved Brandcode MCP
limited-client rollouts.

Hard constraints:

- Do not publish, release, npm publish, submit to directories, alter public
  listing metadata, change package metadata, add hosted tools, or relax custody.
- Do not generate or expose production client keys unless Jason explicitly asks.
- Do not name a real client or brand unless Jason explicitly approves it
  in-thread.
- Option 3 is future direction only; do not implement or publish a connector
  package in this lane.
- Jason approval remains a hard blocker for any release/publish action.
- Preserve untracked `.claude/` and `prompt`.

Closeout:

- Update the packet, `.claudex/sprints/current.md`,
  `.claudex/messages/M001-messages.md`, and `HANDOFF.md`.
- Run `git diff --check`; run code checks only if code changes.
- Commit directly to `main` with an imperative commit message.
