# Prompt - M001-L31 Limited Client Handoff Packet

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp` as a Sprint PO/build
session for M001.

Read first:

- `AGENTS.md`
- `.claudex/packets/M001-L31-limited-client-handoff-packet.md`
- `.claudex/sprints/current.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-limited-client-go-no-go-checklist.md`
- `specs/brandcode-mcp-column-five-brandcode-staging-onboarding-proof.md`
- `specs/brandcode-mcp-production-proof-preflight.md`
- `specs/brandcode-mcp-limited-client-key-ops-runbook.md`
- `specs/brandcode-mcp-limited-client-support-intake-ledger.md`

Goal:

Draft the limited-client handoff packet an approved staging client could
receive.

Keep this narrow and non-release:

- include generic MCP client setup shape without secrets;
- include approved staging/limited-client claims;
- include explicit non-claims for public release, package/source access,
  production proof, public SLA, and public deletion/export;
- include support route, key/scope posture, custody expectations,
  smoke/proof expectations, and offboarding/rotation language;
- include the Column Five Brandcode internal staging example using redacted L30
  proof only;
- reference that production proof is authorized but currently blocked by
  production DNS/env provisioning.

Do not:

- publish, release, submit to directories, change package metadata, add hosted
  tools, relax custody, issue production keys, run production proof, or promise
  public deletion/export;
- print, commit, or document bearer keys, service tokens, private URLs, or
  sensitive env values.

Closeout:

- update the new handoff packet spec, L31 packet, `.claudex/sprints/current.md`,
  `.claudex/messages/M001-messages.md`, and `HANDOFF.md`;
- update README/SECURITY/llms only where useful;
- run `git diff --check`;
- run additional tests only if code changed;
- commit directly to `main` with
  `Draft Brandcode MCP limited client handoff packet`;
- do not push unless Jason explicitly asks.
