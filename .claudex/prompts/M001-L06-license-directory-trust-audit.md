# Build Lane Prompt - M001-L06 License And Directory Trust Audit

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L06-license-directory-trust-audit.md`
- `HANDOFF.md`
- `LICENSE`
- `package.json`
- `README.md`
- `SECURITY.md`
- `llms.txt`
- `server.json`
- `glama.json`
- `smithery.yaml`
- `specs/brandcode-mcp-phase-0-lock.md`
- `specs/brandcode-mcp-use-roadmap-alignment.md`
- `specs/brandcode-mcp-pre-release-hardening.md`

Task:

Implement M001-L06 narrowly. Produce a repo-grounded license, package, directory, and security/trust audit for Brandcode MCP before any public release. Do not publish, release, submit to directories, add tools, or change hosted behavior.

The audit should answer:

- Whether `@brandcode/mcp` can inherit MIT cleanly or needs hosted-service terms.
- Whether current package/listing metadata clearly separates `@brandsystem/mcp` Build from hosted `@brandcode/mcp` Use.
- Whether docs imply unauthenticated reads, public release, canonical mutation, selected-kit default behavior, or capabilities outside the locked 8 tools.
- Whether security docs are strong enough for bearer auth, scopes, service-token posture, private custody, feedback/history privacy, and vulnerability reporting.
- What gaps would likely hurt Glama, LobeHub, Smithery, MCP Registry, or similar trust/scoring reviews.

Produce:

- `specs/brandcode-mcp-license-directory-trust-audit.md`
- one next Ready lane only
- updated `.claudex/sprints/current.md`
- updated `.claudex/messages/M001-messages.md`
- updated `HANDOFF.md`

Before edits, declare write scope. Preserve untracked `.claude/` and `prompt`.

Verify with:

- `git diff --check`
- docs-only verification is acceptable unless package/code files change

Closeout:

- Commit directly to `main` with an imperative commit message.
- Do not push unless Jason explicitly asks.
