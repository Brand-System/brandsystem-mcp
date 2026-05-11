# Column Five Brandcode MCP Client Config Dry Run

**Status:** Passed with staging-only generate-and-run key flow
**Date:** 2026-05-11
**Brand / slug:** Column Five Brandcode internal instance, `brandcode`
**Endpoint:** `https://mcp.staging.brandcode.studio/brandcode`
**Production posture:** not approved, not tested
**Secrets:** no bearer keys were printed, committed, or written to docs
**Package/source posture:** Option 4 - no public `@brandcode/mcp`
package/source distribution for v0.1 limited-client work

## Purpose

M001-L25 was intended to exercise the already-proven Column Five Brandcode
staging endpoint through a real MCP client configuration path, not just the
repo smoke harness. The dry run was allowed to prove `brand_status` and
`get_brand_asset`, or to record a precise blocker without weakening the
release/package/listing posture.

## Local Client Availability

Available local MCP client paths:

- Claude Code CLI is installed at `/Users/jasonlankow/.local/bin/claude`.
- Codex CLI is installed at `/Users/jasonlankow/.local/bin/codex`.
- `npx` is available for MCP Inspector-style client runs.

The most direct client-config path is Claude Code with a temporary
`--mcp-config` file that references a staging-only bearer key. M001-L25 proved
that path after Jason authorized the staging-only generate-and-run flow.

## Secret Availability Check

Checked at `2026-05-11T21:36:39Z`.

Local shell:

| Variable | Result |
| --- | --- |
| `BRANDCODE_MCP_SMOKE_URL` | unset |
| `BRANDCODE_MCP_SMOKE_FULL_KEY` | unset |
| `BRANDCODE_MCP_SMOKE_READ_KEY` | unset |
| `BRANDCODE_MCP_SMOKE_ASSET_ID` | unset |
| `BRANDCODE_MCP_BEARER_KEY` | unset |

Local `.env.local` contains only `VERCEL_OIDC_TOKEN`; it does not contain
staging Brandcode MCP bearer keys.

Vercel Preview env inspection:

- `BRANDCODE_MCP_TEST_KEYS` exists as an encrypted Preview variable.
- `vercel env pull` into a temporary file returned zero-length local values for
  encrypted sensitive variables, matching the prior L12/L24 warning that
  sensitive Preview values are not usable as a local proof input.
- The temporary env file was removed after checking value presence/length only.

## Generate-And-Run Repair

Jason authorized option 2: a staging-only generate-and-run flow.

Executed at `2026-05-11T21:45:13Z`:

- Generated fresh `bck_test_` full/read keys for the `brandcode` staging slug.
- Installed the generated key bundle into Vercel Preview
  `BRANDCODE_MCP_TEST_KEYS` through the Vercel API for all Preview branches.
- Kept generated keys in local `0600` temp files only.
- Did not print, commit, or write bearer-key values to docs.
- Deployed fresh Preview `dpl_E45BFFLXS2H2BJWz9TvBuZv8Cgtb` at
  `https://brandsystem-umyitawby-column-five.vercel.app`.
- Re-aliased `https://mcp.staging.brandcode.studio` to that deployment.

## Smoke Proof

Command shape:

```bash
BRANDCODE_MCP_SMOKE_URL=https://mcp.staging.brandcode.studio/brandcode \
BRANDCODE_MCP_SMOKE_FULL_KEY=<redacted> \
BRANDCODE_MCP_SMOKE_READ_KEY=<redacted> \
BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg \
npm run smoke:hosted-mcp -- --json
```

Result:

- `ok: true`
- `status: "pass"`
- `fail: 0`
- `blocked: 0`
- `skipped: 0`
- Locked 8-tool order passed.
- `get_brand_asset` passed for
  `brandcode:logo:c5-logomark-red.svg`.
- Asset delivery stayed `package_safe` with `delivery_ref_kind:
  "package_path"`.
- `safe_for_mcp: true`.
- `raw_private_provider_url_exposed: false`.
- Read-only insufficient-scope checks passed for `brand_check` and
  `brand_feedback`.

## Client Config Proof

Client path: Claude Code CLI using a temporary `--mcp-config` file with an HTTP
MCP server entry for `https://mcp.staging.brandcode.studio/brandcode`.

The temporary config was removed after the run.

Redacted result:

```json
{
  "brand_status_called": true,
  "get_brand_asset_called": true,
  "implemented_tool_count": 8,
  "rate_limit_status": "active_durable_shared",
  "asset_delivery_posture": "package_safe",
  "safe_for_mcp": true,
  "raw_private_provider_url_exposed": false,
  "setup_friction": "low"
}
```

No hosted code, package metadata, listing metadata, public release posture,
custody behavior, production key posture, or production endpoint posture was
changed.

## Future Option 3 Friction

This dry run surfaced one clear connector/client design signal:

- Client configuration shape is easy; secret handoff is the operational hard
  part.
- Encrypted Vercel Preview env is good custody but poor for repeatable later
  client dry runs because the proof runner cannot rehydrate sensitive values.
- A future public connector/client artifact should separate install/config
  instructions from hosted-service entitlement and should give operators a
  clear secure-key handoff path.

## Remaining Operational Signal

The client config itself is straightforward. The remaining limited-client
friction is key operations:

- repeatable secure staging key handoff;
- production key issuance gating;
- key rotation/revocation runbook;
- client-facing config examples that do not imply public package/source
  distribution;
- operator proof steps that avoid printing or committing secrets.

Production `bck_live_` key issuance, production endpoint proof, public
`@brandcode/mcp` package/source distribution, npm publish, directory
submission, and release remain out of scope unless Jason explicitly authorizes
them.
