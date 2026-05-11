# Build Prompt - M001-L25 Column Five Brandcode Client Config Dry Run

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp` on `main`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `HANDOFF.md`
- `.claudex/packets/M001-L25-column-five-brandcode-client-config-dry-run.md`
- `specs/brandcode-mcp-limited-client-onboarding-template.md`
- `specs/brandcode-mcp-column-five-brandcode-staging-onboarding-proof.md`

Task:

Run a real MCP client configuration dry run against the Column Five Brandcode
`brandcode` staging endpoint. Prove useful calls, or record a precise blocker,
without exposing bearer keys.

Hard constraints:

- Do not publish, release, npm publish, submit to directories, alter public
  listing metadata, change package metadata, add hosted tools, or relax custody.
- Do not generate or expose production client keys.
- Do not print or commit bearer keys.
- Do not run production endpoint proof unless Jason explicitly authorizes it.
- Option 3 is future direction only; capture friction but do not implement or
  publish a connector package.
- Preserve untracked `.claude/` and `prompt`.

Closeout:

- Update the packet, `.claudex/sprints/current.md`,
  `.claudex/messages/M001-messages.md`, and `HANDOFF.md`.
- Run `git diff --check`; run code checks only if code changes.
- Commit directly to `main` with an imperative commit message.
