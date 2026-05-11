# Column Five Brandcode MCP Client Config Dry Run

**Status:** Blocked on staging bearer-key handoff
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

The most direct client-config path remains Claude Code with a temporary
`--mcp-config` file that references an environment-provided bearer key. That
path was not executed against the hosted route because no usable staging bearer
key was available in the local environment.

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

## Result

The real client configuration proof is blocked before useful hosted tool calls.

The precise blocker is not endpoint reachability or MCP client availability. It
is the lack of an intentionally handed-off staging bearer key in the current
local process. Running Claude Code, Codex CLI, or MCP Inspector without that
key would only prove `missing_bearer` or `invalid_token`, not `brand_status` or
`get_brand_asset` through a useful approved-client configuration.

No hosted env, deployment, alias, package metadata, listing metadata, public
release posture, custody behavior, or production key posture was changed.

## Future Option 3 Friction

This dry run surfaced one clear connector/client design signal:

- Client configuration shape is easy; secret handoff is the operational hard
  part.
- Encrypted Vercel Preview env is good custody but poor for repeatable later
  client dry runs because the proof runner cannot rehydrate sensitive values.
- A future public connector/client artifact should separate install/config
  instructions from hosted-service entitlement and should give operators a
  clear secure-key handoff path.

## Required Decision

Jason needs to choose one of these before the client-config proof can continue:

1. Provide a staging `bck_test_` bearer key through a secure local secret
   handoff for the current proof run.
2. Explicitly authorize a staging-only generate-and-run flow that creates or
   rotates a temporary Preview test key, deploys/aliases the staging target if
   needed, runs the client proof, and records only redacted results.

Production `bck_live_` key issuance and production endpoint proof remain out of
scope unless Jason explicitly authorizes them.
