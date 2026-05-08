# M001-L01 - Hosted Proof Harness And Truth Spine

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And v0.1 Proof
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Build lane
**Recommended commit:** `Add hosted MCP proof harness`

## Why

The hosted Brandcode MCP implementation moved quickly from scaffold to all 8 locked tools. Local tests and current `main` CI are green, but the proof story is too chat-shaped:

- the seven hosted implementation commits did not each receive isolated CI runs;
- hosted proof exists from Vercel preview route calls, not from a durable repo command;
- exact staging-domain proof is blocked by DNS/alias/cert;
- direct external MCP client proof is blocked by deployment protection;
- `brand_feedback` append proof is blocked by missing UCS service-token configuration.

This lane makes proof repeatable and keeps blockers explicit.

## Scope

Add a repo-native hosted MCP smoke harness and update the sprint/docs surface around it.

In scope:

- Add a script, preferably under `scripts/`, that can smoke-test a hosted Streamable HTTP MCP endpoint using environment-provided URL/slug/keys.
- Add an npm script for that smoke command.
- Exercise the locked v0.1 claims:
  - `initialize`
  - `tools/list`
  - locked 8-tool order
  - `brand_status`
  - `brand_runtime`
  - `brand_search`
  - `brand_check`
  - `brand_history`
  - `brand_feedback`
  - insufficient-scope behavior for at least `brand_check` and `brand_feedback`
- Do not hardcode API keys, service tokens, or private URLs.
- Make blocked checks report `blocked` or `skipped` with an exact reason instead of failing ambiguously when optional env vars are absent.
- Update README/spec/sprint docs only where needed so future hosted proof points to the command.

Out of scope:

- DNS changes.
- Vercel project setting changes.
- Secret provisioning.
- Publishing `@brandcode/mcp`.
- Adding hosted tools.
- Reworking UCS endpoints.

## Suggested Environment Contract

Use names like these unless the repo already has a better convention:

```bash
BRANDCODE_MCP_SMOKE_URL="https://mcp.staging.brandcode.studio/brandcode"
BRANDCODE_MCP_SMOKE_FULL_KEY="bck_test_..."
BRANDCODE_MCP_SMOKE_READ_KEY="bck_test_..."
BRANDCODE_MCP_SMOKE_SKIP_FEEDBACK="1"
```

The full key should have `read,check,feedback`. The read key should have `read` only.

## Acceptance

- `npm run lint` passes.
- `npm run build` passes.
- Existing tests pass or a narrow relevant test set is justified.
- The smoke harness has a `--help` or env-missing path that can run locally without secrets.
- The harness exits nonzero when a required proof assertion fails.
- Missing optional proof dependencies are reported as blocked/skipped with exact env or infra dependency names.
- The docs identify the current hosted proof blockers without claiming the staging gate is closed.
- `.claudex/sprints/current.md`, this packet, `.claudex/messages/M001-messages.md`, and `HANDOFF.md` are updated at closeout.

## Closeout Notes To Capture

- Which endpoint was tested, if any.
- Which key posture was tested: full, read-only, or none.
- Whether `brand_feedback` append was proved or still blocked.
- Whether proof was local command only, Vercel route proof, or real external MCP client proof.
- Exact commands run.

## Closeout - 2026-05-08

Implemented:

- Added `scripts/hosted-mcp-smoke.mjs` and `npm run smoke:hosted-mcp`.
- The harness uses `@modelcontextprotocol/sdk` Streamable HTTP client transport against `BRANDCODE_MCP_SMOKE_URL`.
- Required live inputs are `BRANDCODE_MCP_SMOKE_URL` and `BRANDCODE_MCP_SMOKE_FULL_KEY`; optional inputs are `BRANDCODE_MCP_SMOKE_READ_KEY`, `BRANDCODE_MCP_SMOKE_ASSET_ID`, and `BRANDCODE_MCP_SMOKE_SKIP_FEEDBACK`.
- It verifies MCP `initialize`, `tools/list`, the locked 8-tool order, `brand_status`, `brand_runtime`, `brand_search`, `list_brand_assets`, optional `get_brand_asset`, `brand_check`, `brand_history`, `brand_feedback`, and insufficient-scope behavior for `brand_check` and `brand_feedback`.
- It does not hardcode secrets. Missing required live proof env reports `blocked`; optional asset/read-key/feedback conditions report `skipped` or `blocked` with the exact dependency.

Proof posture:

- Endpoint tested: none; no live `BRANDCODE_MCP_SMOKE_URL` was provided in this local lane run.
- Key posture tested: none for live endpoint; local help/env-missing command paths were proved without secrets.
- `brand_feedback` append proof: still blocked for live hosted proof until a reachable endpoint and UCS service-token posture are available; the harness can skip append with `BRANDCODE_MCP_SMOKE_SKIP_FEEDBACK=1`.
- Proof type completed: local command/harness behavior only. No Vercel route proof, staging-domain proof, or external MCP client proof was claimed.

Commands run:

- `npm run smoke:hosted-mcp -- --help`
- `env -u BRANDCODE_MCP_SMOKE_URL -u BRANDCODE_MCP_SMOKE_FULL_KEY -u BRANDCODE_MCP_SMOKE_READ_KEY -u BRANDCODE_MCP_SMOKE_ASSET_ID -u BRANDCODE_MCP_SMOKE_SKIP_FEEDBACK npm run smoke:hosted-mcp -- --json`
- `npm test -- test/scripts/hosted-mcp-smoke.test.ts`
- `npm run lint`
- `npm run build`
