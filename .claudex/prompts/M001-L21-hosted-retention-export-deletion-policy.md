# Build Prompt - M001-L21 Hosted Retention Export Deletion Policy

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp` on `main`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `HANDOFF.md`
- `.claudex/packets/M001-L21-hosted-retention-export-deletion-policy.md`
- `specs/brandcode-mcp-hosted-service-terms-decision-brief.md`
- `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`
- `specs/brandcode-mcp-release-candidate-trust-review.md`

Task:

Implement M001-L21 narrowly. Document hosted Brandcode MCP data-policy truth:
authorized pre-release bearer-key access, client-owned/client-controlled brand
data, append-only feedback, scoped/redacted history, package-safe asset custody,
retention/deletion/export posture, and separation between hosted service access
and package/source license.

Hard constraints:

- Do not publish, release, npm publish, submit to directories, alter public
  listing metadata, add hosted tools, relax custody, or claim release-candidate
  readiness.
- Jason approval is a hard blocker for any release or publish action.
- If retention/deletion/export cannot be finalized from existing approved
  posture, name the exact Jason/legal/ops decision blocker instead of smoothing
  it over.
- Preserve untracked `.claude/` and `prompt`.

Closeout:

- Update the packet, `.claudex/sprints/current.md`,
  `.claudex/messages/M001-messages.md`, and `HANDOFF.md`.
- Run `git diff --check`; run code checks only if code changes.
- Commit directly to `main` with an imperative commit message.
