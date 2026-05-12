# Column Five Brandcode MCP Staging Onboarding Proof

**Status:** Internal approved-brand staging proof; 2026-05-12 freshness proof passed after staging-only key rotation
**Date:** 2026-05-11; refreshed 2026-05-12
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

## 2026-05-12 Freshness Read

M001-L30 applied the limited-client go/no-go checklist to the current Column
Five Brandcode staging route. The first read found the route reachable and
bearer-gated but blocked on missing local staging full/read keys. Jason then
asked to generate the needed keys, so fresh staging-only `bck_test_` full/read
keys were generated into `0600` temp files, installed as a sensitive
all-Preview `BRANDCODE_MCP_TEST_KEYS` value through the Vercel API, deployed,
and removed locally after proof.

| Field | Value |
| --- | --- |
| Checked at | `2026-05-12T02:25:44.680Z` |
| Endpoint | `https://mcp.staging.brandcode.studio/brandcode` |
| Staging route reachability | Reachable; unauthenticated request returned `401 missing_bearer` for slug `brandcode` |
| Vercel deployment inspected | `dpl_4aQ9vVdsXC6SD5u7TMqXZKs4eCQC` |
| Alias target inspected | `https://brandsystem-pwnz9m3oy-column-five.vercel.app` |
| Deployment target/status | Preview, Ready |
| Latest pushed CI checked | GitHub Actions run `25705113500`, success on `201ee36d8c140e811950eb4e7d9d69a64a5a08db` |
| Key posture | Fresh staging-only `bck_test_` full/read keys generated, installed in Vercel Preview, used for proof, and removed locally |
| Smoke command result | `pass` |
| `ok` | `true` |
| Fail count | `0` |
| Blocked count | `0` |
| Skipped count | `0` |
| Fresh staging verdict | Go for internal Column Five Brandcode staging rehearsal only |

Fresh smoke summary:

```json
{
  "ok": true,
  "status": "pass",
  "endpoint": "https://mcp.staging.brandcode.studio/brandcode",
  "checked_at": "2026-05-12T02:25:44.680Z",
  "counts": {
    "pass": 7,
    "fail": 0,
    "blocked": 0,
    "skipped": 0
  }
}
```

M001-L30 refreshed the locked 8-tool order, durable shared rate-limit posture,
package-safe asset custody, feedback append, and read-only insufficient-scope
proof. A direct `brand_status` read returned:

- `rate_limits.status: "active_durable_shared"`
- `rate_limits.enforcement: "durable_shared_redis_fixed_window"`

Read-only scope proof returned structured `insufficient_scope` payloads with
status `403`, required scope `check` for `brand_check`, and required scope
`feedback` for `brand_feedback`.

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

The 2026-05-11 proof and 2026-05-12 freshness proof support internal
limited-client readiness for the `brandcode` staging route only. Neither proof
authorizes:

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
