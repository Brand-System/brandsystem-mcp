# Build Prompt - M001-L22 Package Source Posture Decision Brief

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp` on `main`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `HANDOFF.md`
- `.claudex/packets/M001-L22-package-source-posture-decision-brief.md`
- `specs/brandcode-mcp-license-directory-trust-audit.md`
- `specs/brandcode-mcp-hosted-service-terms-decision-brief.md`
- `specs/brandcode-mcp-hosted-data-policy.md`

Task:

Prepare the durable package/source posture decision brief for hosted
`@brandcode/mcp`. Separate the current `@brandsystem/mcp` Build package MIT
posture from hosted Use service access and any future `@brandcode/mcp`
source/package distribution. Name the exact Jason decision required before npm,
directory, package metadata, public listing, or release work.

Hard constraints:

- Do not publish, release, npm publish, submit to directories, alter public
  listing metadata, add hosted tools, relax custody, or claim
  release-candidate readiness.
- Do not pick a package/source posture unless Jason supplies that decision
  in-thread.
- Preserve untracked `.claude/` and `prompt`.

Closeout:

- Update the packet, `.claudex/sprints/current.md`,
  `.claudex/messages/M001-messages.md`, and `HANDOFF.md`.
- Run `git diff --check`; run code checks only if code/package metadata
  changes.
- Commit directly to `main` with an imperative commit message.
