# Build Lane Prompt - M001-L07 Security Matrix And Rate-Limit Posture

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L07-security-matrix-rate-limit-posture.md`
- `HANDOFF.md`
- `SECURITY.md`
- `specs/brandcode-mcp-license-directory-trust-audit.md`
- `specs/brandcode-mcp-pre-release-hardening.md`
- `specs/brandcode-mcp-phase-0-lock.md`
- `specs/brandcode-mcp-use-roadmap-alignment.md`
- hosted auth/scope/router/tool tests under `test/hosted/`
- hosted implementation under `src/hosted/`

Task:

Implement M001-L07 narrowly. Expand hosted auth/scope/security verification and document or implement rate-limit posture for Brandcode MCP pre-release hardening. Do not publish, release, submit to directories, add tools, rename packages, mutate canonical governance, or introduce selected-kit hosted behavior.

Security matrix to cover or explicitly defer:

- missing bearer
- malformed bearer
- invalid token
- staging key on production / production key on staging, where locally testable
- wrong slug for key
- read-only key
- check-only key
- feedback-only key
- full key
- per-tool scope behavior across all 8 locked tools
- `BRANDCODE_MCP_SERVICE_TOKEN` as the only hosted service-token env name
- private provider URL redaction in asset, feedback, and history surfaces
- rate-limit and abuse posture

Expected outputs:

- focused tests and/or smoke-harness assertions where useful;
- `SECURITY.md` hosted MCP security/trust language;
- any small docs updates needed to keep security claims truthful;
- `.claudex/sprints/current.md`, `.claudex/messages/M001-messages.md`, and `HANDOFF.md` closeout;
- exactly one next Ready lane.

Before edits, declare write scope. Preserve untracked `.claude/` and `prompt`.

Verify with:

- `git diff --check`
- relevant focused tests
- `npm run lint`
- `npm run build`

Closeout:

- Commit directly to `main` with an imperative commit message.
- Do not push unless Jason explicitly asks.
