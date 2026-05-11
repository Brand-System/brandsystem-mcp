# Brandcode MCP Limited Client Support Intake Ledger

**Status:** Reusable operator ledger for approved-client pre-release
**Date:** 2026-05-11
**Applies to:** hosted Brandcode MCP limited-client support, incident, and
offboarding intake
**Package/source posture:** Option 4 - no public `@brandcode/mcp`
package/source distribution for v0.1 limited-client work
**Release posture:** no public release, npm publish, package metadata,
directory submission, public listing copy, production client key issuance, or
public support SLA without explicit Jason approval.

## Operator Summary

Use this ledger to record limited-client Brandcode MCP support intake without
turning pre-release operations into a public support promise. Every entry must
identify the approved brand route, the non-secret key posture, the owner, the
current status, the next action, and the evidence location.

This ledger is for approved-client support and operations only. It does not
authorize public release, npm publish, MCP directory submission, production
keys, self-serve deletion/export, new hosted tools, custody relaxation, or
public service availability claims.

Deletion/export requests remain manual pre-release operations review through
Brandcode Studio Ops until Jason/legal/ops approve public launch language.

## How To Use This Ledger

Create one ledger copy per approved client/brand, or keep one internal tracker
with one row per request. Replace placeholders with client-specific values and
link to redacted evidence. Do not paste raw bearer keys, service tokens,
private/provider URLs, raw custody paths, or large support blobs into the
ledger.

Required setup for every client ledger:

| Field | Value |
| --- | --- |
| Client / organization | `[approved client name]` |
| Brand slug | `[slug]` |
| Endpoint posture | `[staging proof / production access]` |
| Endpoint | `https://mcp.staging.brandcode.studio/[slug]` or `https://mcp.brandcode.studio/[slug]` |
| Key posture | `[read-only / check-enabled / feedback-enabled / full controlled proof]` |
| Non-secret key id / label | `[prefix-safe label, hash, or operator label only]` |
| Support owner | `[name / email / team]` |
| Escalation owner | `Jason Lankow / Brandcode Studio Ops <jlankow@columnfive.com>` |
| Support intake channel | `[email / channel / tracker link]` |
| Deletion/export intake | `Manual pre-release ops review through Brandcode Studio Ops` |
| Evidence folder / tracker | `[redacted link]` |
| Offboard/review date | `[date / trigger / not set]` |

## Intake Categories

| Category | Use for | Default owner |
| --- | --- | --- |
| Access setup | Endpoint confusion, MCP client config, missing setup snippet, wrong slug | Support owner |
| Auth/scope | Invalid token, wrong key prefix, insufficient scope, unexpected 403 | Support owner with key owner |
| Custody | Asset blocked for private-provider-only delivery, package-safe fixture missing | Support owner with runtime/package owner |
| Quality | Runtime/search/check result does not match approved brand expectation | Support owner with brand/runtime owner |
| Feedback/history | Feedback append concern, missing receipt, confusing history summary | Support owner with UCS history owner |
| Deletion/export | Request to delete, export, or inspect retained feedback/history | Brandcode Studio Ops manual review |
| Abuse/security | Leaked key, suspicious traffic, excessive traffic, unauthorized slug attempt | Brandcode Studio Ops |
| Incident | Service outage, rate-limit unavailable, service-token or hosted dependency failure | Brandcode Studio Ops with engineering owner |
| Offboarding | Client access removal, key revocation, endpoint handoff end, ownership change | Support owner with key owner |

## Status Vocabulary

Use a small status set so support posture stays readable:

| Status | Meaning |
| --- | --- |
| `new` | Request received but not triaged. |
| `triaging` | Owner is identifying category, scope, and evidence. |
| `waiting_on_client` | Client needs to provide non-secret context or confirm impact. |
| `waiting_on_ops` | Brandcode Studio Ops needs to review, rotate, revoke, or approve a path. |
| `blocked_decision` | A named Jason/legal/ops decision is required before action. |
| `blocked_custody` | The request needs package-safe asset repair or custody review. |
| `blocked_secret` | Evidence may contain a secret and needs containment/redaction before review. |
| `in_progress` | Accepted work is underway. |
| `resolved` | Support action is complete and evidence is linked. |
| `closed_no_action` | No action taken; reason is recorded. |

Do not use status text that implies public SLA timing, guaranteed uptime,
public support entitlement, or self-serve deletion/export.

## Request Ledger Template

| Field | Value |
| --- | --- |
| Request id | `[CLIENT-SLUG-YYYYMMDD-N]` |
| Received at | `[ISO timestamp]` |
| Category | `[access setup / auth-scope / custody / quality / feedback-history / deletion-export / abuse-security / incident / offboarding]` |
| Client / organization | `[approved client name]` |
| Brand slug | `[slug]` |
| Environment | `[staging / production]` |
| Endpoint | `[brand-scoped MCP URL]` |
| Key posture | `[read-only / check-enabled / feedback-enabled / full controlled proof]` |
| Non-secret key id / label | `[no raw bearer key]` |
| MCP client | `[Claude Code / MCP Inspector / Cursor / other / unknown]` |
| Owner | `[support owner]` |
| Escalation owner | `[ops / engineering / Jason/legal/ops decision]` |
| Status | `[status vocabulary]` |
| Evidence link | `[redacted link]` |
| Redaction check | `[passed / needs redaction / blocked_secret]` |
| Client-visible impact | `[short factual summary]` |
| Next action | `[specific next action and owner]` |
| Follow-up date | `[date / not set]` |
| Resolution | `[summary when closed]` |

## Category Playbooks

### Access Setup

Record endpoint, slug, MCP client, expected key posture, and the exact setup
step that failed. Confirm whether the client used the staging or production
route and whether production access was explicitly approved.

Good evidence:

- redacted MCP client config shape;
- `brand_status` result summary;
- setup screenshot with bearer values removed;
- client setup friction note for future Option 3 connector/client work.

Do not solve setup friction by issuing broader keys, publishing package/source
material, or implying public directory availability.

### Auth/Scope

Record the non-secret key id/label, key posture, scopes, endpoint, slug, and
structured error. Use the limited-client key operations runbook for rotation,
revocation, and suspected leak handling.

Expected auth/scope evidence:

- `invalid_token`, wrong-environment prefix, or `insufficient_scope` summary;
- requested tool name;
- expected scope group: `read`, `check`, or `feedback`;
- confirmation that raw bearer keys are not present in evidence.

Do not paste raw keys into the ledger. If a key appears in support evidence,
change status to `blocked_secret`, contain first, and route through the leak
response path.

### Custody

Record the asset id, delivery posture, client expectation, and whether the
asset is required for handoff. Package-safe delivery may proceed. Private
provider delivery remains blocked.

Custody statuses:

- `package_safe`;
- `blocked_private_provider_url`;
- `missing_package_safe_fixture`;
- `not_required_for_current_workflow`.

If the workflow requires the asset and no package-safe fixture exists, create
an upstream package-data repair lane before handoff. Do not relax MCP custody,
substitute an unrelated asset, or expose private/provider URLs.

### Quality

Use for runtime, search, or check results that appear wrong for the approved
brand. Capture the tool name, input summary, response summary, expected brand
truth, and evidence link.

Quality requests may become:

- a brand runtime/package correction;
- a prompt or check-rule refinement;
- append-only `brand_feedback` review input;
- a future product-spine deferral.

Do not present a quality fix as canonical governance mutation unless the
official Brandcode/UCS governance path actually changed the runtime.

### Feedback/History

Use for `brand_feedback` append concerns, missing receipt questions,
`brand_history` confusion, or redaction concerns. Record feedback id, receipt
id, append posture, history summary shape, and whether URLs or large support
blobs were redacted.

Current posture:

- `brand_feedback` is append-only review input;
- `brand_history` is read-only compact history;
- neither tool approves, applies, or mutates canonical governance;
- general hosted AgentRun telemetry POST remains deferred.

### Deletion/Export

Deletion/export remains manual pre-release operations review. Record the
request, requester context, brand slug, data category, evidence location, and
Jason/legal/ops decision need. Do not promise response windows, public SLA,
export package format, legal outcome, or self-serve tooling.

Required fields:

| Field | Value |
| --- | --- |
| Requester | `[person / organization / authorization unknown]` |
| Brand slug | `[slug]` |
| Data category | `[runtime / feedback / history / asset / support evidence / unknown]` |
| Requested action | `[delete / export / inspect / correct / unknown]` |
| Authorization posture | `[approved / needs verification / blocked_decision]` |
| Systems possibly in scope | `[Brandcode / UCS history / hosted package / support tracker / unknown]` |
| Decision owner | `Jason/legal/ops` |
| Current status | `Manual pre-release ops review` |

Public launch still requires approval of requester authorization,
deletion/export scope, export package format, response windows, support
escalation, and any required legal or subprocessor language.

### Abuse/Security

Use for leaked keys, suspicious traffic, excessive traffic, unauthorized slug
attempts, security risk, or service-stability risk. Brandcode Studio Ops may
revoke, rotate, suspend, or throttle hosted Brandcode MCP API keys.

Containment comes before analysis:

1. Revoke, rotate, suspend, or throttle as needed.
2. Confirm affected endpoint, slug, scope, and non-secret key id.
3. Preserve redacted evidence.
4. Run replacement smoke when credentials or env changed.
5. Record client notification need and follow-up.

Never store raw leaked keys in the ledger.

### Incident

Use for hosted dependency failures, service-token failures, rate-limit store
unavailability, route outage, smoke failure with `fail > 0`, or repeated
client-impacting errors.

Incident records must separate:

- local component/API proof;
- hosted route proof;
- human-visible client proof.

If durable shared rate limiting is configured but unavailable, hosted requests
should fail closed with `503 rate_limit_unavailable` before MCP tool dispatch.
Do not treat local fallback proof as production client readiness.

### Offboarding

Use for client access removal, ownership change, endpoint handoff end,
vendor/agency change, unknown key owner, or rotation/review date expiry.

Offboarding checklist:

- [ ] confirm client/brand and endpoint posture;
- [ ] identify non-secret key id/label and scopes;
- [ ] revoke or rotate affected keys;
- [ ] deploy/alias if required for key removal;
- [ ] confirm revoked key fails without printing the key;
- [ ] confirm unaffected approved keys still pass smoke if needed;
- [ ] record final access state and evidence link;
- [ ] remove or archive temporary client config proof artifacts;
- [ ] preserve redacted support and proof records.

## Redaction Rules

Never store these in the ledger:

- raw bearer keys, including `bck_test_...` and `bck_live_...`;
- `BRANDCODE_MCP_SERVICE_TOKEN` or any service-token value;
- private/provider URLs, private Blob URLs, or signed URLs;
- raw custody paths that could reveal provider/private storage internals;
- raw Vercel sensitive env values;
- inline MCP client configs containing bearer values;
- screenshots or logs that expose tokens, private URLs, or customer secrets;
- large nested support blobs, raw runtime packages, or full history bodies.

Allowed evidence:

- endpoint without a key;
- brand slug;
- non-secret key id, label, hash, or prefix-safe posture;
- tool name and structured error code;
- redacted smoke summary;
- package-safe asset id and package-safe delivery posture;
- compact support summary with a link to a controlled evidence store.

If evidence contains a secret, set status to `blocked_secret`, contain and
rotate if needed, then replace the evidence with a redacted summary.

## Redacted Evidence Examples

### Support Entry

```json
{
  "request_id": "BRANDCODE-20260511-1",
  "category": "auth-scope",
  "endpoint": "https://mcp.staging.brandcode.studio/brandcode",
  "brand_slug": "brandcode",
  "key_posture": "read-only",
  "key_id": "read-staging-20260511",
  "mcp_client": "Claude Code",
  "status": "resolved",
  "error_code": "insufficient_scope",
  "requested_tool": "brand_check",
  "next_action": "Client needs check-enabled key approval before using brand_check",
  "raw_secret_present": false
}
```

### Incident Entry

```json
{
  "request_id": "BRANDCODE-20260511-2",
  "category": "incident",
  "endpoint": "https://mcp.staging.brandcode.studio/brandcode",
  "brand_slug": "brandcode",
  "status": "waiting_on_ops",
  "impact": "Hosted route returned rate_limit_unavailable before tool dispatch",
  "hosted_route_proof": "redacted smoke summary link",
  "human_visible_client_proof": "client setup blocked before brand_status",
  "next_action": "Ops checks durable shared Redis env and reruns hosted smoke",
  "raw_secret_present": false
}
```

### Deletion/Export Entry

```json
{
  "request_id": "BRANDCODE-20260511-3",
  "category": "deletion-export",
  "brand_slug": "brandcode",
  "requested_action": "export",
  "data_category": "feedback/history",
  "authorization_posture": "needs verification",
  "status": "blocked_decision",
  "decision_owner": "Jason/legal/ops",
  "next_action": "Manual pre-release ops review; no public response window promised",
  "raw_secret_present": false
}
```

## Option 4 Guardrails

Allowed:

- support intake and redacted evidence capture;
- setup guidance for approved clients;
- scope/key posture diagnosis;
- custody blocker recording and repair-lane routing;
- manual deletion/export review intake;
- incident and offboarding records;
- future Option 3 friction notes.

Not allowed from this ledger:

- public release or release-candidate claims;
- npm publish or public `@brandcode/mcp` package/source distribution;
- MCP directory submission or public listing metadata;
- production key issuance without explicit Jason approval;
- public support SLA, uptime promise, response window, legal terms, or
  deletion/export promise;
- hosted tool additions;
- selected Brand Kit or campaign kit default behavior;
- private custody relaxation or raw private/provider URL exposure.

## Closeout Checklist

Before closing a support request:

- [ ] category is set;
- [ ] endpoint and brand slug are recorded;
- [ ] key posture and non-secret key id/label are recorded if relevant;
- [ ] owner, escalation owner, status, evidence link, and next action are set;
- [ ] redaction check passed;
- [ ] deletion/export requests are marked manual pre-release ops review;
- [ ] custody blockers do not expose private/provider URLs;
- [ ] incidents separate local, hosted route, and human-visible proof;
- [ ] offboarding records confirm final access state;
- [ ] any product friction is linked to a future Option 3 note or repair lane.
