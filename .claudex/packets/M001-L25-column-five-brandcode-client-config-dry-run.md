# M001-L25 - Column Five Brandcode Client Config Dry Run

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Limited-client proof / MCP client configuration
**Recommended commit:** `Prove Brandcode MCP client config dry run`

## Why

M001-L24 creates a reusable limited-client onboarding template and proves it
against the Column Five Brandcode `brandcode` staging instance through the smoke
harness. The next useful limited-client step is to exercise the same approved
internal staging brand through an actual MCP client configuration path and
record setup friction.

## Scope

Inspect first:

- `specs/brandcode-mcp-limited-client-onboarding-template.md`
- `specs/brandcode-mcp-column-five-brandcode-staging-onboarding-proof.md`
- `scripts/hosted-mcp-smoke.mjs`
- existing M001-L12 multi-client proof notes

Implement narrowly:

- Use the Column Five Brandcode `brandcode` staging endpoint:
  `https://mcp.staging.brandcode.studio/brandcode`.
- Configure one real MCP client path available in the local environment
  without committing or printing bearer keys.
- Prove at least `brand_status` and `get_brand_asset` through that client path,
  or record the exact blocker.
- Capture setup friction as future Option 3 evidence.
- Update sprint/HANDOFF/messages and leave release/package/listing posture
  blocked.

## Out Of Scope

- No npm publish.
- No public release.
- No public MCP directory submission.
- No public listing metadata changes.
- No package rename or package metadata changes.
- No hosted tool additions.
- No selected-kit default behavior.
- No custody relaxation.
- No production-client key generation.
- No production endpoint proof unless Jason explicitly authorizes it.

## Acceptance

- A real MCP client config dry run is recorded for the `brandcode` staging
  endpoint, or a precise blocker is recorded.
- The dry run proves useful hosted calls without exposing bearer keys.
- Any client setup friction is captured for future Option 3 connector/client
  design.
- `git diff --check` passes.
- If no code changes are made, lint/build/tests may be skipped with a clear
  docs-only note.
- Exactly one next Ready lane remains, or a named Jason decision blocker is
  recorded.
