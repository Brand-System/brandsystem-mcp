# Build Lane Prompt - M001-L17 Push CI Proof Authorization

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L17-push-ci-proof-authorization.md`
- `HANDOFF.md`

Task:

M001-L16 restored full local suite proof. The next proof gap is that the local
M001 stack has not been pushed, so GitHub CI has not run on it.

Do not push unless Jason explicitly authorizes push or PR proof in the prompt
or current thread. If authorization is absent, stop with the named Jason
decision blocker and update coordination docs only if useful.

If push is authorized:

- confirm local status and the commit stack to be pushed;
- push the authorized branch/stack;
- verify GitHub CI status;
- record proof in `.claudex/sprints/current.md`, `.claudex/messages/M001-messages.md`,
  and `HANDOFF.md`.

Still prohibited:

- no release, npm publish, public MCP directory submission, public listing
  changes, hosted tool additions, selected-kit default behavior, or custody
  relaxation.
