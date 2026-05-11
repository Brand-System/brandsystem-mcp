# M001-L25 - Column Five Brandcode Client Config Dry Run

**Status:** Done
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

- Done: Jason authorized the staging-only generate-and-run flow for this
  internal `brandcode` staging proof.
- Done: fresh staging-only full/read test keys were generated and installed in
  Vercel Preview `BRANDCODE_MCP_TEST_KEYS` for all Preview branches without
  printing or committing key values.
- Done: fresh Preview deployment `dpl_E45BFFLXS2H2BJWz9TvBuZv8Cgtb` was
  created and `https://mcp.staging.brandcode.studio` was re-aliased to
  `https://brandsystem-umyitawby-column-five.vercel.app`.
- Done: `npm run smoke:hosted-mcp -- --json` passed against
  `https://mcp.staging.brandcode.studio/brandcode` with the package-safe
  asset id `brandcode:logo:c5-logomark-red.svg`.
- Done: Claude Code used a temporary HTTP MCP config to call `brand_status` and
  `get_brand_asset`.
- Done: Claude Code reported 8 implemented tools, durable shared rate limiting,
  package-safe asset delivery, `safe_for_mcp: true`, and no raw private/provider
  URL exposure.
- Done: temporary MCP config was removed after the run.
- Done: no bearer keys were printed, committed, or written to docs.
- Done: client setup friction is captured for future Option 3 connector/client
  design.
- Done: `git diff --check` passes.
- Done: no code changes were made, so lint/build/tests may be skipped with a
  clear docs/proof-only note.
- Done: exactly one next Ready lane remains.

## Closeout

M001-L25 first found the local process had no usable staging bearer key.
Jason then authorized option 2: a staging-only generate-and-run key flow.

Executed:

- Generated fresh `bck_test_` full/read keys for the `brandcode` staging slug.
- Installed the generated key bundle into Vercel Preview
  `BRANDCODE_MCP_TEST_KEYS` for all Preview branches.
- Deployed fresh Preview `dpl_E45BFFLXS2H2BJWz9TvBuZv8Cgtb` at
  `https://brandsystem-umyitawby-column-five.vercel.app`.
- Re-aliased `https://mcp.staging.brandcode.studio` to that deployment.
- Ran hosted smoke against
  `https://mcp.staging.brandcode.studio/brandcode` with asset id
  `brandcode:logo:c5-logomark-red.svg`; result was `ok: true`,
  `status: "pass"`, `fail: 0`, `blocked: 0`, `skipped: 0`.
- Ran Claude Code with a temporary HTTP MCP config; Claude called
  `brand_status` and `get_brand_asset`, reported 8 implemented tools,
  `rate_limit_status: "active_durable_shared"`, package-safe asset delivery,
  `safe_for_mcp: true`, and no raw private/provider URL exposure.

Durable proof record:

- `specs/brandcode-mcp-column-five-client-config-dry-run.md`

Next Ready lane:

- `.claudex/packets/M001-L26-limited-client-key-ops-runbook.md`

No production endpoint proof, production key issuance, release, npm publish,
public MCP directory submission, public listing metadata change, hosted tool
addition, selected-kit default behavior, package/source posture change, or
custody relaxation happened. The only hosted mutation was the authorized
Preview-only staging test-key rotation/deploy/alias needed for this proof.
