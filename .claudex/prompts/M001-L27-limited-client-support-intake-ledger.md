# Build Lane Prompt - M001-L27 Limited Client Support Intake Ledger

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L27-limited-client-support-intake-ledger.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-limited-client-key-ops-runbook.md`
- `specs/brandcode-mcp-limited-client-onboarding-template.md`
- `specs/brandcode-mcp-limited-client-readiness-plan.md`
- `specs/brandcode-mcp-hosted-data-policy.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`

Task:

Create the limited-client Brandcode MCP support/intake ledger.

Starting truth:

- Jason chose Option 4 for v0.1: no public `@brandcode/mcp` package/source
  distribution, no npm publish, and no directory submission.
- Approved clients may use the hosted Brandcode MCP through brand-scoped bearer
  keys.
- The locked hosted 8-tool surface is implemented and staging-proven.
- L23-L26 now cover limited-client readiness, onboarding, client config proof,
  and key operations.
- The next gap is durable support intake: setup issues, auth/scope blockers,
  custody blockers, quality reports, feedback/history questions,
  deletion/export requests, abuse/security, incidents, and offboarding.

Required work:

1. Add a reusable limited-client support/intake ledger template under `specs/`.
2. Include categories for access setup, auth/scope, custody, quality,
   feedback/history, deletion/export, abuse/security, incident, and offboarding.
3. Include fields for endpoint, brand slug, key posture, non-secret key id,
   owner, status, evidence link, next action, and escalation owner.
4. Keep deletion/export as manual pre-release operations review, not public
   self-serve or public SLA.
5. Include redaction rules for bearer keys, private/provider URLs, service
   tokens, raw custody paths, and large support blobs.
6. Update `.claudex/sprints/current.md`, the L27 packet,
   `.claudex/messages/M001-messages.md`, `HANDOFF.md`, and top-level docs only
   where useful.

Do not:

- publish or release;
- submit to directories;
- alter package/listing metadata;
- add tools;
- relax custody;
- issue production keys;
- promise public SLA, legal terms, deletion/export timelines, or self-serve
  operations;
- write secrets to docs, commits, logs, or examples.

Verification:

- `git diff --check`
- `git diff --cached --check`
- Lint/build/tests may be skipped if the lane remains docs-only.

Closeout:

- Update `.claudex/sprints/current.md`
- Update `.claudex/packets/M001-L27-limited-client-support-intake-ledger.md`
- Update `.claudex/messages/M001-messages.md`
- Update `HANDOFF.md`
- Leave exactly one next Ready lane, unless a named Jason decision blocker is
  surfaced
- Commit directly to `main` with an imperative commit message
- Do not push unless Jason explicitly asks
