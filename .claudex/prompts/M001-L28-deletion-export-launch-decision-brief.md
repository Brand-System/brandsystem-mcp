# Build Lane Prompt - M001-L28 Deletion Export Launch Decision Brief

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L28-deletion-export-launch-decision-brief.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-hosted-data-policy.md`
- `specs/brandcode-mcp-limited-client-support-intake-ledger.md`
- `specs/brandcode-mcp-limited-client-readiness-plan.md`
- `specs/brandcode-mcp-hosted-terms-rate-limit-gate.md`
- `specs/brandcode-mcp-hosted-service-terms-decision-brief.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`

Task:

Prepare the Brandcode MCP deletion/export launch decision brief.

Starting truth:

- Hosted Brandcode MCP is approved only for authorized pre-release access.
- Jason chose Option 4 for v0.1: no public `@brandcode/mcp` package/source
  distribution, no npm publish, and no directory submission.
- The hosted data policy and support ledger both preserve deletion/export as
  manual pre-release ops review.
- Public launch remains blocked until Jason/legal/ops approve deletion/export
  requester authorization, scope, export format, response windows, escalation,
  and legal/subprocessor language.

Required work:

1. Add a compact Jason/legal/ops decision brief under `specs/`.
2. Separate current manual pre-release review from any future public launch
   promise.
3. Frame clear options or decision rows for requester authorization,
   deletion/export scope, export package format, excluded systems, response
   windows, escalation owner, and required legal/subprocessor language.
4. Preserve hosted-service/source-package separation and Option 4 guardrails.
5. Update `.claudex/sprints/current.md`, the L28 packet,
   `.claudex/messages/M001-messages.md`, `HANDOFF.md`, and top-level docs only
   where useful.

Do not:

- publish or release;
- submit to directories;
- alter package/listing metadata;
- add tools;
- relax custody;
- issue production keys;
- implement self-serve deletion/export tools;
- promise public SLA, legal terms, deletion/export timelines, or launch copy
  without Jason/legal/ops approval;
- write secrets to docs, commits, logs, or examples.

Verification:

- `git diff --check`
- `git diff --cached --check`
- Lint/build/tests may be skipped if the lane remains docs-only.

Closeout:

- Update `.claudex/sprints/current.md`
- Update `.claudex/packets/M001-L28-deletion-export-launch-decision-brief.md`
- Update `.claudex/messages/M001-messages.md`
- Update `HANDOFF.md`
- Leave exactly one next Ready lane, unless a named Jason decision blocker is
  surfaced
- Commit directly to `main` with an imperative commit message
- Do not push unless Jason explicitly asks
