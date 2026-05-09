# M001-L06 - License And Directory Trust Audit

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Audit / docs hardening
**Recommended commit:** `Audit Brandcode MCP license and directory trust`

## Why

Brandcode MCP should not publish just because staging proof passes. Before any public npm release or MCP directory submission, the repo needs a trust audit that compares the package/license/security metadata against the standards reviewers and scoring models will apply.

This lane produces the first hardening gap list. It should not fix everything. It should make the remaining work visible, prioritized, and durable.

## Scope

Audit the repo's license, package, directory, and trust-facing docs.

Read and assess:

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
- relevant MCP directory/listing conventions already present in the repo

Audit questions:

- Does `@brandcode/mcp` inherit MIT, or does hosted service access require separate terms?
- Does package metadata clearly distinguish `@brandsystem/mcp` Build from hosted `@brandcode/mcp` Use?
- Do public docs imply release, publish, free public access, unauthenticated reads, or canonical mutation?
- Do security docs explain bearer auth, scopes, hosted service-token posture, private custody, feedback/history privacy, and vulnerability reporting well enough for directory review?
- Do `glama.json`, `server.json`, `smithery.yaml`, and `llms.txt` need pre-release changes for the Use MCP sibling, or should those stay Build-only until publish is authorized?
- What would likely lower scores on Glama, LobeHub, Smithery, MCP Registry, or similar review surfaces?

Out of scope:

- No release or publish.
- No public directory submission.
- No new tools.
- No hosted behavior changes unless a critical false claim is found and can be fixed as docs-only.
- No package rename or package metadata mutation unless the audit identifies it as a proposed follow-up, not an implementation.

## Deliverable

Create a durable audit doc, preferably:

```text
specs/brandcode-mcp-license-directory-trust-audit.md
```

The audit should include:

- current findings, ordered by severity;
- license/terms open questions for Jason;
- security/trust gaps;
- directory/scoring risks;
- package/listing metadata risks;
- recommended follow-up lanes;
- exactly one next Ready lane.

## Acceptance

- The audit explicitly says **no publish/release/directory submission**.
- Findings are grounded in actual repo files.
- At least one finding addresses license/terms posture.
- At least one finding addresses security/privacy posture.
- At least one finding addresses directory/scoring metadata posture.
- `.claudex/sprints/current.md`, `.claudex/messages/M001-messages.md`, and `HANDOFF.md` are updated at closeout.
- `git diff --check` passes.
- Docs-only verification is acceptable unless package/code files change.
