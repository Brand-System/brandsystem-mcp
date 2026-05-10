# Build Lane Prompt - M001-L18 GitHub Actions Node 24 Compatibility

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L18-github-actions-node24-compatibility.md`
- `HANDOFF.md`
- `.github/workflows/*`

Task:

Repair or explicitly harden the GitHub Actions Node runtime posture surfaced by
M001-L17 CI run `25641439073`.

The CI run passed, but GitHub annotated that `actions/checkout@v4` and
`actions/setup-node@v4` are running on Node.js 20, with Node 24 becoming the
default for JavaScript actions on 2026-06-02 and Node 20 removal on
2026-09-16.

Preferred repair:

- update actions to Node 24-compatible versions if available; otherwise
- use the documented temporary Node 24 opt-in env and verify CI still passes.

Do not publish, release, submit to directories, change public listing metadata,
add hosted tools, relax custody, or redesign CI beyond this narrow runtime
posture.

Verification:

- `git diff --check`
- local checks if workflow/package scripts change
- push only if needed to prove GitHub Actions behavior
- record the resulting CI run id, URL, and status

Closeout:

- update `.claudex/sprints/current.md`, the L18 packet,
  `.claudex/messages/M001-messages.md`, and `HANDOFF.md`
- leave exactly one next Ready lane or a named Jason decision blocker
- commit to `main`
