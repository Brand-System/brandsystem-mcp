# Brandcode MCP Limited Client Onboarding Template

**Status:** Reusable operator template for approved-client pre-release
**Date:** 2026-05-11
**Applies to:** hosted Brandcode MCP limited-client onboarding
**Package/source posture:** Option 4 - no public `@brandcode/mcp`
package/source distribution for v0.1 limited-client work
**Release posture:** no public release, npm publish, package metadata,
directory submission, public listing copy, or production client key issuance
without explicit Jason approval.

## How To Use This Template

Copy this template for each approved brand. Replace placeholders with the
client/brand-specific values, keep secrets out of the file, and attach the
redacted smoke proof summary before handoff.

Do not paste bearer keys into this document. Record key posture, owner, scope,
and rotation path only.

## Onboarding Record

| Field | Value |
| --- | --- |
| Client / organization | `[approved client name]` |
| Brand slug | `[slug]` |
| Brand runtime source | `[Brandcode Studio brand / Full Brand Runtime package]` |
| Client approval | `[Jason approval date / link / blocker]` |
| Endpoint posture | `[staging proof / production access]` |
| Endpoint | `https://mcp.staging.brandcode.studio/[slug]` or `https://mcp.brandcode.studio/[slug]` |
| MCP client(s) | `[Claude Code / MCP Inspector / Cursor / other]` |
| Operator owner | `[name / email]` |
| Support intake | `[email / channel / issue tracker]` |
| Abuse/key owner | `Jason Lankow / Brandcode Studio Ops <jlankow@columnfive.com>` |
| Deletion/export intake | `Manual pre-release ops review through Brandcode Studio Ops` |
| Public package/listing posture | `Deferred; no public package, directory, or listing work` |

## Scope Plan

Choose the least-privilege key posture for the client workflow.

| Key posture | Scopes | Use |
| --- | --- | --- |
| Read-only | `read` | Runtime, search, status, assets, and history |
| Check-enabled | `read,check` | Adds draft validation through `brand_check` |
| Feedback-enabled | `read,feedback` | Adds append-only review input |
| Full controlled proof | `read,check,feedback` | Operator smoke and controlled acceptance only |

Planned keys:

| Key label | Environment | Scopes | Owner | Rotation/review date | Notes |
| --- | --- | --- | --- | --- | --- |
| `[redacted label]` | `[staging/production]` | `[read/check/feedback]` | `[owner]` | `[date]` | `[notes]` |

## Client Setup Snippet

Use the hosted endpoint and a bearer key supplied through the target MCP
client's secret handling path. Do not store the raw key in shared docs.

Endpoint:

```text
https://mcp.staging.brandcode.studio/[slug]
```

Production endpoint, only after explicit approval:

```text
https://mcp.brandcode.studio/[slug]
```

Generic HTTP MCP configuration shape:

```json
{
  "url": "https://mcp.staging.brandcode.studio/[slug]",
  "headers": {
    "Authorization": "Bearer ${BRANDCODE_MCP_BEARER_KEY}"
  }
}
```

## Smoke Command

Run before handoff. Use staging keys for staging proof and production keys only
after Jason explicitly approves production access.

```bash
BRANDCODE_MCP_SMOKE_URL="https://mcp.staging.brandcode.studio/[slug]" \
BRANDCODE_MCP_SMOKE_FULL_KEY="[redacted full/check/feedback key]" \
BRANDCODE_MCP_SMOKE_READ_KEY="[redacted read-only key]" \
BRANDCODE_MCP_SMOKE_ASSET_ID="[package-safe asset id]" \
npm run smoke:hosted-mcp -- --json
```

Minimum pass bar:

- `ok: true`
- `status: "pass"`
- `fail: 0`
- `tools/list` returns the locked 8-tool order
- `brand_runtime` returns hosted runtime data
- `brand_search` returns governed search shape
- `brand_check` passes with check scope
- `list_brand_assets` returns custody-safe summaries
- `get_brand_asset` returns package-safe delivery, or the asset blocker is
  named before handoff
- `brand_feedback` records append-only feedback, or is intentionally skipped
  with a named reason
- read-only key receives structured `insufficient_scope` for `brand_check` and
  `brand_feedback`

## Smoke Proof Summary

| Field | Value |
| --- | --- |
| Checked at | `[ISO timestamp]` |
| Endpoint | `[endpoint]` |
| Result | `[pass / blocked / fail]` |
| Fail count | `[number]` |
| Blocked count | `[number]` |
| Skipped count | `[number]` |
| Tool order | `[pass / fail]` |
| Runtime origin | `[hosted / blocker]` |
| Search hits | `[number / blocker]` |
| Asset id | `[asset id / not required]` |
| Asset custody | `[package_safe / blocked_private_provider_url / not required]` |
| Raw private URL exposure | `[false / blocker]` |
| Feedback append | `[recorded / skipped with reason / blocked]` |
| Read-only scope checks | `[pass / blocker]` |
| Rate-limit posture | `[active_durable_shared / blocker]` |

## Handoff Copy

Use this concise client-facing posture for approved pre-release handoffs:

> Brandcode MCP access is approved-brand, bearer-key pre-release access. Use the
> endpoint and key only for the approved brand and workflow. Do not share the
> key, publish the endpoint/key pair, submit it to directories, or treat this as
> public `@brandcode/mcp` package access. Feedback is append-only review input
> and does not mutate canonical governance.

## Support And Incident Intake

Route these to Brandcode Studio Ops:

- setup/access issue;
- invalid token, wrong slug, or insufficient scope;
- asset blocked for private-provider-only delivery;
- runtime/search/check result concern;
- feedback/history concern;
- deletion/export request;
- leaked key, suspicious traffic, or service stability issue.

Deletion/export remains manual pre-release ops review. Do not promise
self-serve deletion/export or public support SLA until Jason/legal/ops approve
the public launch language.

## Option 4 Guardrails

Confirm before handoff:

- [ ] No npm publish.
- [ ] No public package metadata.
- [ ] No public source/license posture change for `@brandcode/mcp`.
- [ ] No MCP directory submission.
- [ ] No public listing copy.
- [ ] No selected Brand Kit or campaign kit default behavior.
- [ ] No custody relaxation.
- [ ] No production key issuance without explicit Jason approval.
- [ ] No release-candidate or public launch claim.

## Future Option 3 Notes

Capture client friction that could shape a later public connector/client
artifact:

- client configuration confusion;
- repeated key/endpoint handling questions;
- desired MCP client recipes;
- scope granularity needs;
- asset custody expectations;
- support questions that repeat;
- public wording needed to separate connector install from hosted service
  entitlement.
