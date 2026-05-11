# Build Lane Prompt - M001-L26 Limited Client Key Ops Runbook

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L26-limited-client-key-ops-runbook.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-limited-client-readiness-plan.md`
- `specs/brandcode-mcp-limited-client-onboarding-template.md`
- `specs/brandcode-mcp-column-five-client-config-dry-run.md`
- `specs/brandcode-mcp-hosted-data-policy.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`

Task:

Create the limited-client Brandcode MCP key operations runbook.

Starting truth:

- Jason chose Option 4 for v0.1: no public `@brandcode/mcp` package/source
  distribution, no npm publish, and no directory submission.
- Approved clients may use the hosted Brandcode MCP through brand-scoped bearer
  keys.
- M001-L25 proved the internal Column Five Brandcode staging endpoint through
  Claude Code using a temporary HTTP MCP config.
- The product is not blocked on tool capability; the remaining friction is
  safe, repeatable key operations and client handoff.

Required work:

1. Add a durable `specs/` runbook for limited-client key operations.
2. Separate staging-only test keys from production `bck_live_` keys.
3. Make production-key issuance a Jason-approved gate.
4. Document scopes, brand slug binding, key owner, rotation, revocation,
   suspected leak handling, deploy/alias proof, smoke proof, real-client config
   proof, and redacted evidence capture.
5. Include safe command shapes that do not print bearer keys.
6. Update sprint current, M001 messages, HANDOFF, and any top-level docs that
   need a pointer.

Do not:

- publish or release;
- submit to directories;
- alter package/listing metadata;
- add tools;
- relax custody;
- issue production keys;
- write secrets to docs, commits, or examples.

Verification:

- `git diff --check`
- `git diff --cached --check`
- Lint/build/tests may be skipped if the lane remains docs-only.

Closeout:

- Update `.claudex/sprints/current.md`
- Update `.claudex/packets/M001-L26-limited-client-key-ops-runbook.md`
- Update `.claudex/messages/M001-messages.md`
- Update `HANDOFF.md`
- Leave exactly one next Ready lane, unless a named Jason decision blocker is
  surfaced
- Commit directly to `main` with an imperative commit message
- Do not push unless Jason explicitly asks
