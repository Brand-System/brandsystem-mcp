# M001-L25 - Column Five Brandcode Client Config Dry Run

**Status:** Done - blocked on staging bearer-key handoff
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

- Done: a client-config dry run blocker is recorded for the `brandcode` staging
  endpoint, or a precise blocker is recorded.
- Blocked: useful `brand_status` and `get_brand_asset` calls were not run
  because no staging bearer key was available in the local environment and
  Vercel Preview encrypted env values pull as zero-length locally.
- Done: no bearer keys were printed, committed, or written to docs.
- Done: client setup friction is captured for future Option 3 connector/client
  design.
- Done: `git diff --check` passes.
- Done: no code changes were made, so lint/build/tests may be skipped with a clear
  docs-only note.
- Done: a named Jason decision blocker is
  recorded.

## Closeout

M001-L25 did not prove useful hosted calls through a real MCP client because
the current local process has no usable staging bearer key:

- `BRANDCODE_MCP_SMOKE_URL`, `BRANDCODE_MCP_SMOKE_FULL_KEY`,
  `BRANDCODE_MCP_SMOKE_READ_KEY`, `BRANDCODE_MCP_SMOKE_ASSET_ID`, and
  `BRANDCODE_MCP_BEARER_KEY` were unset.
- `.env.local` contains only `VERCEL_OIDC_TOKEN`, not Brandcode MCP bearer
  keys.
- Vercel Preview lists encrypted `BRANDCODE_MCP_TEST_KEYS`, but `vercel env
  pull` into a temporary file returned zero-length local values for encrypted
  sensitive variables.
- Claude Code, Codex CLI, and `npx`/MCP Inspector paths are available locally,
  but running them without a bearer key would only prove auth failure rather
  than `brand_status` or `get_brand_asset`.

Durable blocker record:

- `specs/brandcode-mcp-column-five-client-config-dry-run.md`

Named Jason decision blocker:

- Provide a staging `bck_test_` bearer key through secure local secret handoff,
  or explicitly authorize a staging-only generate-and-run flow that creates or
  rotates a temporary Preview test key, deploys/aliases staging if needed, runs
  the client proof, and records only redacted results.

No production endpoint proof, production key issuance, hosted env mutation,
release, npm publish, public MCP directory submission, public listing metadata
change, hosted tool addition, selected-kit default behavior, package/source
posture change, or custody relaxation happened.
