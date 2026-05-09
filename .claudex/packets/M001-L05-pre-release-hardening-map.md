# M001-L05 - Pre-Release Hardening Map

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And v0.1 Proof
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** PO/build-lane planning
**Recommended commit:** `Map Brandcode MCP pre-release hardening`

## Why

Do not publish or release Brandcode MCP yet.

The hosted Use MCP is now real enough to be judged by MCP directories, scoring models, security crawlers, and early users. That means the next step is not a release checklist. It is a deliberate pre-release hardening map that pushes the repo toward A-grade production trust before any public package or directory launch.

Once MCP directories ingest a first release, weak security/trust reviews can linger for weeks or months. We should treat the first public impression as expensive and make the private/staging phase do more work.

## Scope

Create a repo-native hardening plan for Brandcode MCP before release.

In scope:

- License posture:
  - confirm whether `@brandcode/mcp` should inherit MIT, use a different license, or ship with hosted-service terms alongside OSS package code;
  - identify package/license metadata changes needed before publish;
  - identify whether hosted bearer-key access, feedback history, and brand asset responses need terms/privacy language.
- Security hardening:
  - auth and scope enforcement;
  - slug authorization;
  - secret/env naming and rotation posture;
  - rate-limit and abuse posture;
  - private custody redaction;
  - raw provider URL blocking;
  - telemetry/history privacy;
  - CORS/OPTIONS posture;
  - deployment protection/public route posture;
  - dependency/audit/CI gates.
- Test hardening:
  - unit/integration coverage for all 8 tools;
  - hosted smoke proof with full/read-only keys;
  - negative auth/scope cases;
  - malformed upstream package cases;
  - `get_brand_asset` explicit asset-id proof;
  - multiple real MCP clients where practical.
- Directory/review scoring prep:
  - Glama;
  - LobeHub;
  - Smithery;
  - MCP Registry / server metadata;
  - README, `llms.txt`, `server.json`, `glama.json`, `smithery.yaml`, `SECURITY.md`, `LICENSE`, package metadata.
- Battle testing:
  - staging proof across Brandcode and at least one non-Brandcode brand if available;
  - run all 8 tools repeatedly with realistic agent prompts;
  - verify append-only feedback history and no canonical mutation;
  - verify asset custody posture with actual assets;
  - capture observed failure modes as packets, not chat notes.

Out of scope:

- Publishing `@brandcode/mcp`.
- Public MCP directory submission.
- New hosted tools.
- Canonical governance mutation.
- Selected-kit default behavior.

## Acceptance

- A durable hardening plan exists in `specs/` or `.claudex/` with clear phases and gates.
- The plan explicitly says no publish/release until Jason authorizes it after hardening.
- The plan names license/security/test/directory-scoring/battle-test workstreams.
- The plan identifies exactly one next Ready implementation/audit lane.
- Current sprint docs and HANDOFF reflect the new no-release posture.
- `git diff --check` passes.
- Docs-only verification is acceptable unless code/package metadata changes.
