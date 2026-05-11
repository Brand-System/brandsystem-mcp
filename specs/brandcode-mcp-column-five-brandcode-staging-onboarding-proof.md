# Column Five Brandcode MCP Staging Onboarding Proof

**Status:** Internal approved-brand staging proof
**Date:** 2026-05-11
**Brand / slug:** Column Five Brandcode internal instance, `brandcode`
**Endpoint:** `https://mcp.staging.brandcode.studio/brandcode`
**Production posture:** not approved, not tested in this proof
**Secrets:** no bearer keys are recorded in this document
**Package/source posture:** Option 4 - no public `@brandcode/mcp` package/source
distribution for v0.1 limited-client work

## Purpose

This proof uses the reusable limited-client onboarding template against a real
hosted `.brand`/Full Brand Runtime instance: the Column Five Brandcode
`brandcode` staging brand. It is an internal staging dry run, not a client
handoff and not production access approval.

## Smoke Command Shape

Executed with local redacted staging keys:

```bash
BRANDCODE_MCP_SMOKE_URL="https://mcp.staging.brandcode.studio/brandcode" \
BRANDCODE_MCP_SMOKE_FULL_KEY="[redacted bck_test key]" \
BRANDCODE_MCP_SMOKE_READ_KEY="[redacted bck_test read key]" \
BRANDCODE_MCP_SMOKE_ASSET_ID="brandcode:logo:c5-logomark-red.svg" \
npm run smoke:hosted-mcp -- --json
```

## Result

| Field | Value |
| --- | --- |
| Checked at | `2026-05-11T21:25:46.691Z` |
| Endpoint | `https://mcp.staging.brandcode.studio/brandcode` |
| Overall result | `pass` |
| `ok` | `true` |
| Fail count | `0` |
| Blocked count | `0` |
| Skipped count | `0` |
| Package-safe asset id | `brandcode:logo:c5-logomark-red.svg` |

## Tool And Scope Proof

| Check | Result |
| --- | --- |
| MCP initialize with full key | Pass |
| `tools/list` locked 8-tool order | Pass |
| `brand_status` capability status | Pass |
| `brand_runtime` | Hosted runtime data returned |
| `brand_search` | 3 governed hits for `brand` |
| `list_brand_assets` | 3 custody-safe assets returned |
| `get_brand_asset` | Package-safe asset returned |
| `brand_check` | Governed verdict `pass` |
| `brand_history` | Scoped UCS history shape returned |
| `brand_feedback` | Append-only observation recorded |
| MCP initialize with read-only key | Pass |
| Read-only `brand_check` | Structured `insufficient_scope`, required `check` |
| Read-only `brand_feedback` | Structured `insufficient_scope`, required `feedback` |

Locked tool order observed:

1. `brand_runtime`
2. `brand_search`
3. `brand_check`
4. `brand_status`
5. `list_brand_assets`
6. `get_brand_asset`
7. `brand_feedback`
8. `brand_history`

## Custody Proof

`get_brand_asset` for `brandcode:logo:c5-logomark-red.svg` returned:

- `custody_safe: true`
- `safe_for_mcp: true`
- `blocked_private_provider_url: false`
- `delivery_posture: "package_safe"`
- `delivery_ref_kind: "package_path"`
- `raw_private_provider_url_exposed: false`

This satisfies the L24 onboarding template's package-safe asset proof for the
internal Brandcode staging instance.

## Handoff Posture

This proof supports internal limited-client readiness for the `brandcode`
staging route only. It does not authorize:

- production endpoint access;
- production/live `bck_live_` key issuance;
- public release;
- npm publish;
- public `@brandcode/mcp` package/source distribution;
- MCP directory submission;
- public listing metadata;
- custody relaxation.

## Follow-Up Signal

The template is now concrete enough for one approved-brand staging handoff. The
next useful proof should exercise a real MCP client configuration path against
this same `brandcode` staging endpoint and record setup friction without
exposing bearer keys.
