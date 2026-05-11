# Brandcode MCP Deletion Export Launch Decision Brief

**Status:** Decision brief; launch language not approved
**Date:** 2026-05-11
**Applies to:** hosted `@brandcode/mcp` Use MCP deletion/export posture
**Package/source posture:** Option 4 - no public `@brandcode/mcp`
package/source distribution for v0.1 limited-client work
**Release posture:** no public release, npm publish, package listing, MCP
directory submission, public listing copy, production launch claim, public
deletion/export SLA, or self-serve deletion/export tool until Jason explicitly
approves after legal/ops review.

## Executive Readout

Hosted Brandcode MCP has a truthful pre-release data posture: approved-brand
bearer-key access, client-owned or client-controlled brand data,
append-only feedback, compact redacted history, package-safe asset custody, and
manual deletion/export review through Brandcode Studio Ops.

That is enough for limited-client pre-release operations. It is not enough for
public launch copy. Before Brandcode MCP can claim public availability,
directory readiness, customer-facing deletion/export support, or release
candidate status, Jason/legal/ops must decide who can request deletion/export,
how authorization is verified, what systems are in scope, what is excluded,
what export package may be delivered, what response windows can be promised,
where escalation lives, and what legal/subprocessor language is required.

This brief frames those decisions. It does not approve them.

## Current Pre-Release Posture

- Hosted Brandcode MCP is approved only for authorized pre-release access.
- Access is brand-scoped and bearer-key gated.
- Public `@brandcode/mcp` package/source distribution is deferred for v0.1
  limited-client work.
- `brand_feedback` is append-only review input stored in UCS history. It does
  not approve, apply, or mutate canonical governance.
- `brand_history` is read-only and returns compact scoped summaries with URL
  redaction.
- Hosted asset delivery remains package-safe only. Private/provider URLs,
  private Blob URLs, service tokens, raw custody paths, and raw private
  delivery refs must not be exposed.
- The MCP does not expose public self-serve deletion or export tools.
- During pre-release, deletion/export requests route to Jason Lankow /
  Brandcode Studio Ops `<jlankow@columnfive.com>` for manual review through
  Brandcode/UCS operations.

## Launch Decisions Required

| Area | Current pre-release posture | Launch decision options | Decision needed before public copy |
| --- | --- | --- | --- |
| Requester authorization | Manual ops review; requester authority may be unknown at intake. | Account owner only; account admin plus authorized client contacts; client-authorized agency/vendor; case-by-case legal/ops review. | Who is allowed to request deletion, export, inspection, or correction for each data category. |
| Authorization verification | Support/ops confirms manually before action. | Brandcode account role; signed client contact list; email-domain plus out-of-band confirmation; contract/legal contact; support ticket approval chain. | Which verification path is sufficient, and what evidence must be retained without storing secrets. |
| Data scope | Runtime, feedback, history, package-safe assets, support evidence, and hosted/package systems may be implicated. | Feedback/history only; full hosted MCP data; runtime package plus feedback/history; support evidence included; brand assets included only when package-safe and client-owned. | Which systems and records are in scope for deletion/export and which owner executes each one. |
| Exclusions | Security, audit, abuse, accounting, and legal records are not defined for public terms. | Exclude abuse/security logs; exclude rate-limit counters; exclude billing/accounting records; retain minimal legal/audit evidence; exclude private provider data not controlled by Brandcode. | What Brandcode may retain, why, and how to describe that retention without overpromising deletion. |
| Export package format | No approved public export format. | Compact JSON summaries; JSON plus Markdown receipt index; zipped structured package; client-facing CSV for feedback rows; human-readable support summary only. | The allowed export format, delivery channel, redaction rules, and whether package-safe assets are included as refs or files. |
| Response windows | No public SLA or timeline is promised. | No public timeline during limited-client beta; target acknowledgement only; business-day target; contract-specific response window. | Whether any customer-facing response window can be promised and who owns misses/escalations. |
| Escalation path | Brandcode Studio Ops manual review. | Ops owner only; ops plus legal reviewer; support owner triage then Jason/legal/ops; incident/security path for abuse or leaked-key related requests. | The named escalation owner, backup owner, and decision authority for contested or ambiguous requests. |
| Legal/subprocessor language | Hosted data-policy draft records current truth but is not launch terms. | Public privacy/terms addendum; limited-client service terms exhibit; support-process note; no public terms until legal approves. | Whether customer-facing terms, privacy, DPA, subprocessor, or retention language is required before launch. |

## Recommended Decision Shape

For v0.1 limited-client launch language, prefer a conservative approved-client
posture:

1. Requesters must be the approved brand owner, approved account admin, or
   explicitly authorized client contact recorded in the limited-client support
   ledger.
2. Authorization must be verified through a controlled support channel and
   linked to a redacted evidence record. Raw bearer keys, service tokens,
   private/provider URLs, or raw custody paths must never be stored as proof.
3. Export should start with feedback/history summaries and relevant receipt
   metadata, not raw nested UCS history blobs.
4. Deletion should route through manual Brandcode/UCS operations review until
   system-specific deletion semantics and audit retention rules are approved.
5. Package-safe assets may be referenced only through package-safe delivery
   posture. Private-provider-only assets remain excluded or blocked.
6. Public response windows should remain unpromised unless legal/ops approves a
   support commitment.
7. Legal/ops should define whether any security, abuse, audit, accounting, or
   legal hold records are excluded from deletion and export.

This recommendation still requires approval. It is not launch copy.

## Systems To Classify

| System or record type | Likely launch treatment | Open decision |
| --- | --- | --- |
| Hosted brand runtime package | Client-owned/client-controlled runtime data served by hosted MCP. | Whether runtime package export is included or handled through existing Brandcode/UCS export paths. |
| `brand_feedback` UCS history | Append-only review input with receipt metadata. | Whether deletion removes, redacts, tombstones, or annotates feedback rows. |
| `brand_history` summaries | Read-only projection of UCS AgentRun history. | Whether export includes summaries only or underlying receipt-chain records. |
| Package-safe assets | May be listed by id and package-safe delivery ref. | Whether export includes asset files, package paths, or metadata-only references. |
| Private-provider-only assets | Blocked from MCP delivery. | Whether excluded entirely or routed to the upstream provider/client custody path. |
| Support ledger/evidence | Redacted operational evidence. | Whether client-facing export includes support evidence and how internal notes are filtered. |
| Rate-limit counters | Operational safety metadata. | Whether excluded as ephemeral security/operations data. |
| Auth/key records | Security-sensitive credential metadata. | Whether only non-secret key id/label and scope posture may be exported. |
| Abuse/security records | Safety and incident evidence. | What minimum records are retained for security, legal, or audit reasons. |

## Not Approved By This Brief

This brief does not authorize:

- public release;
- npm publish;
- MCP directory submission;
- public listing metadata;
- public `@brandcode/mcp` package/source distribution;
- production client key issuance;
- hosted tool additions;
- self-serve deletion/export tools;
- public support SLA or deletion/export response windows;
- legal terms, privacy terms, DPA, or subprocessor claims;
- custody relaxation or private/provider URL exposure;
- selected Brand Kit or campaign/exploratory kit default behavior.

## Approval Record To Capture

When Jason/legal/ops decide the launch posture, record:

| Field | Required value |
| --- | --- |
| Decision date | `[YYYY-MM-DD]` |
| Decision owner | `[Jason / legal / ops names]` |
| Approved requester classes | `[owner / admin / authorized contact / other]` |
| Verification method | `[support channel / account role / legal contact / other]` |
| Deletion scope | `[systems and exclusions]` |
| Export scope and format | `[systems, format, redaction, delivery channel]` |
| Response window | `[none / acknowledgement target / business-day target / contract-specific]` |
| Escalation path | `[owner and backup]` |
| Legal/subprocessor requirement | `[not required / terms update / privacy update / DPA / subprocessor notice]` |
| Launch copy allowed | `[exact approved wording or link]` |

Until that record exists, deletion/export launch language remains a named
Jason/legal/ops decision blocker.

## Closeout Rule

Do not claim Brandcode MCP is publicly launched, directory-ready, or
release-candidate ready from this brief. The current operational path remains
manual pre-release deletion/export review through Brandcode Studio Ops until
Jason/legal/ops approve the launch decisions above.
