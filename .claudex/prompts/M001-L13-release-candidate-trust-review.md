# Build Lane Prompt - M001-L13 Release Candidate Trust Review

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L13-release-candidate-trust-review.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-pre-release-hardening.md`
- `specs/brandcode-mcp-license-directory-trust-audit.md`
- `SECURITY.md`
- `README.md`
- `llms.txt`
- `server.json`
- `glama.json`
- `smithery.yaml`
- `.claudex/messages/M001-messages.md`

Task:

Run a release-candidate trust review for the hosted Brandcode Use MCP. This is
not a release, publish, or directory-submission lane.

Starting truth:

- The locked 8-tool hosted surface is implemented.
- Hosted smoke passes on staging.
- Package-safe `get_brand_asset` proof passes for
  `brandcode:logo:c5-logomark-red.svg`.
- M001-L12 passed real-client proof with MCP Inspector and Claude Code.
- Jason still does not want release until license, terms, security, scoring, and
  quality posture are A-grade.

Do not publish, release, submit to MCP directories, add tools, relax custody, or
introduce selected Brand Kit default behavior.

Review:

1. Local-vs-remote and CI status for the M001 stack.
2. Package/source license posture for `@brandcode/mcp`.
3. Hosted-service terms needs for bearer-key access, privacy, feedback/history
   retention, custody, abuse handling, and rate limits.
4. Rate-limit/abuse posture currently reported as `not_reported_by_staging`.
5. Directory metadata readiness for Glama, LobeHub, Smithery, MCP Registry,
   `server.json`, `glama.json`, `smithery.yaml`, `llms.txt`, README, and
   `SECURITY.md`.
6. Whether another client, another brand, production-key proof, or CI push/PR
   proof is needed before a release-candidate claim.

Expected output:

- A concise durable trust review or updated hardening doc.
- Every remaining blocker converted into a repair packet, product-spine
  deferral, or named Jason decision.
- Exactly one next Ready lane.

Verification:

- `git diff --check`
- docs-only verification unless code changes

Closeout:

- Update `.claudex/sprints/current.md`
- Update `.claudex/packets/M001-L13-release-candidate-trust-review.md`
- Update `.claudex/messages/M001-messages.md`
- Update `HANDOFF.md`
- Commit directly to `main`
- Do not push unless Jason explicitly asks
