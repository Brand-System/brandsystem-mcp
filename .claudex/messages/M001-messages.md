# M001 Messages

## 2026-05-08 - Sprint Opened

M001 opened to stabilize the Brandcode hosted Use MCP after the rapid 8-tool implementation run.

Current repo truth:

- `main` is green at `61218ac`.
- `40e94a0` carried the cumulative seven hosted implementation commits but failed CI on `npm audit`.
- `61218ac` fixed the audit failure.
- Intermediate hosted commits did not get isolated GitHub CI runs.
- The hosted code now reports all 8 locked tools as real.
- Hosted proof remains incomplete until staging DNS, deployment protection/client access, and UCS service-token feedback append are resolved.

Next Ready lane:

- M001-L01 - Hosted Proof Harness And Truth Spine.

## 2026-05-08 - M001-L01 Closed

M001-L01 added a repo-native hosted MCP smoke harness:

- Command: `npm run smoke:hosted-mcp`
- Script: `scripts/hosted-mcp-smoke.mjs`
- Local tests: `test/scripts/hosted-mcp-smoke.test.ts`

What it proves when endpoint and keys are provided:

- MCP `initialize`
- `tools/list`
- locked 8-tool order
- `brand_status`
- `brand_runtime`
- `brand_search`
- `list_brand_assets`
- optional `get_brand_asset`
- `brand_check`
- `brand_history`
- `brand_feedback`
- read-only insufficient-scope behavior for `brand_check` and `brand_feedback`

This lane proved the harness help/env-missing path locally without secrets. It did not claim staging-domain proof, Vercel route proof, external MCP client proof, or feedback append proof because live endpoint/key/service-token dependencies were not provided in the local run.
