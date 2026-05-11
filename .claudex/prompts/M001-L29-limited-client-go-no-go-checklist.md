# Build Lane Prompt - M001-L29 Limited Client Go No-Go Checklist

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L29-limited-client-go-no-go-checklist.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-limited-client-readiness-plan.md`
- `specs/brandcode-mcp-limited-client-onboarding-template.md`
- `specs/brandcode-mcp-column-five-brandcode-staging-onboarding-proof.md`
- `specs/brandcode-mcp-column-five-client-config-dry-run.md`
- `specs/brandcode-mcp-limited-client-key-ops-runbook.md`
- `specs/brandcode-mcp-limited-client-support-intake-ledger.md`
- `specs/brandcode-mcp-deletion-export-launch-decision-brief.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`

Task:

Create a limited-client Brandcode MCP go/no-go checklist.

Starting truth:

- Jason chose Option 4 for v0.1: no public `@brandcode/mcp` package/source
  distribution, no npm publish, and no MCP directory submission.
- Hosted Brandcode MCP is allowed only for approved limited-client / approved
  brand use.
- The locked hosted 8-tool surface is implemented and staging-proven.
- L23-L28 now cover limited-client readiness, onboarding, staging proof,
  client-config proof, key ops, support intake, and deletion/export decision
  prep.
- Deletion/export launch language remains blocked on Jason/legal/ops decisions
  from L28.

Required work:

1. Add a durable `specs/` checklist for approved limited-client go/no-go review.
2. Separate staging readiness, production proof readiness, and public release
   readiness.
3. Keep public release and deletion/export launch language blocked unless
   Jason/legal/ops decisions are already recorded in repo docs.
4. Include evidence fields for smoke proof, real-client config proof,
   package-safe asset proof, durable rate-limit proof, key ops, support intake,
   custody posture, CI freshness, and deletion/export decision status.
5. Include fail-closed criteria for missing keys, missing hosted proof,
   raw private/provider URL exposure, insufficient custody evidence, absent
   support owner, failing CI, or unresolved deletion/export launch language.
6. Update `.claudex/sprints/current.md`, the L29 packet,
   `.claudex/messages/M001-messages.md`, `HANDOFF.md`, and top-level docs only
   where useful.

Do not:

- publish or release;
- submit to directories;
- alter package/listing metadata;
- add tools;
- relax custody;
- issue production keys;
- prove production endpoints unless Jason explicitly authorizes it;
- promise public SLA, legal terms, deletion/export timelines, or self-serve
  deletion/export operations;
- claim Brandcode MCP is release-candidate ready;
- write secrets to docs, commits, logs, or examples.

Verification:

- `git diff --check`
- `git diff --cached --check`
- Lint/build/tests may be skipped if the lane remains docs-only.

Closeout:

- Update `.claudex/sprints/current.md`
- Update `.claudex/packets/M001-L29-limited-client-go-no-go-checklist.md`
- Update `.claudex/messages/M001-messages.md`
- Update `HANDOFF.md`
- Leave exactly one next Ready lane, unless a named Jason decision blocker is
  surfaced
- Commit directly to `main` with an imperative commit message
- Do not push unless Jason explicitly asks
