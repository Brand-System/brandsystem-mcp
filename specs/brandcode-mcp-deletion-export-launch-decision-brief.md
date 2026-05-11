# Brandcode MCP Deletion Export Launch Decision Brief

**Status:** Pre-release decision posture recorded; launch language still
requires legal review
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

That is enough for limited-client pre-release operations. Jason has now
approved the pre-release requester and verification posture: brand owners or
admins for the brand instance, and Jason Lankow as Brandcode Studio Ops. The
remaining launch-sensitive work is legal review of public language and any
future self-serve or SLA-shaped commitment.

This brief records the pre-release operating posture. It does not approve
public release, public directory copy, self-serve deletion/export, or legal
terms.

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
- Authorized pre-release requesters are brand owners/admins for the brand
  instance and Jason Lankow as Brandcode Studio Ops.
- Authority proof is brand instance admin access, or verified email matching
  `columnfivemedia.com` or `columnfive.com` for the internal Column Five
  Brandcode instance.

## Recorded Pre-Release Decisions

| Area | Recorded pre-release posture | Public launch decision still needed |
| --- | --- | --- |
| Requester authorization | Brand owner/admin for the brand instance, or Jason Lankow as Brandcode Studio Ops. | Whether public terms need additional requester classes such as contract owner, legal contact, or authorized agency/vendor. |
| Authorization verification | Brand instance admin access, or verified email matching `columnfivemedia.com` or `columnfive.com` for the internal Column Five Brandcode instance. | How non-internal brands prove authority, and what evidence may be retained without storing secrets. |
| Data scope | Hosted MCP service data: `brand_feedback`, scoped `brand_history` summaries/receipts, limited-client support/intake records, non-secret key metadata, and MCP-visible package/runtime references. | Whether public deletion/export also covers canonical Brandcode Studio records, official Full Brand Runtime packages, client assets, or other UCS records. |
| Exclusions | Security/abuse logs, rate-limit counters, audit receipts/tombstones, billing/legal records, legal holds, backups until normal expiry, secrets, raw private/provider URLs, private custody paths, and third-party/provider data outside Brandcode custody are excluded from ordinary deletion/export. | Exact legal wording for retained records, backup expiry, and data outside Brandcode custody. |
| Export package format | Curated support packet: Markdown index plus JSON summaries/receipts and package-safe refs. No raw nested UCS blobs by default, no secrets, no private/provider URLs, no public delivery links. | Whether a public export format, delivery channel, archive format, or asset-file inclusion rule is approved. |
| Response windows | No public SLA or customer-facing timeline. Manual pre-release review only. | Whether any acknowledgement or completion target can be promised publicly or contractually. |
| Escalation path | Jason Lankow / Brandcode Studio Ops. Legal review required before public launch language. | Backup owner and legal/privacy reviewer for public operation. |
| Legal/subprocessor language | Draft language below may be used for review only. | Final terms, privacy, DPA, and subprocessor language must be approved before public launch copy. |

## Recommended Operating Shape

For v0.1 limited-client launch language, use the conservative approved-client
posture above:

1. Requesters must be a brand owner/admin for the brand instance, or Jason
   Lankow as Brandcode Studio Ops.
2. Authorization must be verified through brand instance admin status or, for
   the internal Column Five Brandcode instance, verified email matching
   `columnfivemedia.com` or `columnfive.com`.
3. Export should start with curated feedback/history summaries, relevant
   receipt metadata, support/intake records, and package-safe refs, not raw
   nested UCS history blobs.
4. Deletion should route through manual Brandcode/UCS operations review until
   system-specific deletion semantics and audit retention rules are approved.
5. Canonical Brandcode Studio records and official Full Brand Runtime packages
   should be handled through Brandcode/UCS admin paths, not implicitly by hosted
   MCP support intake.
6. Package-safe assets may be referenced only through package-safe delivery
   posture. Private-provider-only assets remain excluded or blocked.
7. Public response windows should remain unpromised unless legal/ops approves a
   support commitment.
8. Security, abuse, audit, accounting, legal hold, backup, and out-of-custody
   provider records should remain excluded or specially reviewed.

This recommendation records the pre-release posture. It is not public launch
copy.

## Systems To Classify

| System or record type | Pre-release treatment | Public launch decision |
| --- | --- | --- |
| Hosted brand runtime package | Export as MCP-visible references and existing package-safe metadata only. | Whether runtime package export is included or handled through existing Brandcode/UCS export paths. |
| `brand_feedback` UCS history | In scope for curated summary export; deletion requires manual review and may use deletion, redaction, tombstone, or annotation. | Final system-specific deletion semantics. |
| `brand_history` summaries | In scope for curated summary export and receipt metadata. | Whether public export includes summaries only or underlying receipt-chain records. |
| Package-safe assets | May be listed by id and package-safe delivery ref. | Whether public export includes asset files, package paths, or metadata-only references. |
| Private-provider-only assets | Excluded from MCP export; route to upstream provider/client custody path if needed. | Whether any provider-specific export process is needed outside Brandcode MCP. |
| Support ledger/evidence | In scope after redaction of secrets, private/provider URLs, sensitive env values, and internal-only notes. | How internal notes are filtered for public export. |
| Rate-limit counters | Excluded as ephemeral security/operations data. | Retention wording and whether aggregate posture may be disclosed. |
| Auth/key records | Only non-secret key id/label, scope posture, brand slug, and key owner may be exported. | Whether public export includes key metadata at all. |
| Abuse/security records | Excluded from ordinary export/deletion and retained as needed for safety, investigation, legal, or audit reasons. | Legal wording for security and abuse retention. |
| Billing/legal records | Excluded from hosted MCP export/deletion path. | Public terms for legal, accounting, billing, and contractual retention. |
| Backups | Not separately searched or removed during pre-release; data ages out through normal backup retention. | Backup retention language for public terms. |

## Draft Legal And Subprocessor Language

The language below is draft operating language for legal review. It is not
approved public terms.

> Brandcode MCP is available during pre-release only to approved brand
> instances and authorized users. Deletion or export requests may be submitted
> by a brand owner or administrator for the applicable brand instance, or by
> Brandcode Studio Ops. Brandcode may require verification of account role,
> verified email domain, or other reasonable authority before processing a
> request.

> During pre-release, deletion and export requests are handled manually by
> Brandcode Studio Ops. Brandcode does not currently provide self-serve
> deletion or export tools for hosted MCP data, and no public response-time
> commitment is made unless separately agreed in writing.

> Hosted MCP export packages may include curated summaries of MCP feedback,
> scoped MCP run history, relevant receipt metadata, support/intake records,
> non-secret key metadata, and package-safe runtime or asset references.
> Exports do not include bearer keys, service tokens, raw private/provider
> URLs, raw private custody paths, or data outside Brandcode custody.

> Deletion requests may be fulfilled by deletion, redaction, tombstoning, or
> other reasonable operational treatment depending on the system and record
> type. Brandcode may retain records where necessary for security, abuse
> prevention, audit integrity, legal compliance, billing/accounting, backup
> retention, dispute resolution, or legal hold.

> Some Brandcode services rely on subprocessors and infrastructure providers to
> host, store, process, secure, or transmit service data. Brandcode will not use
> hosted MCP deletion/export requests to expose or transfer raw provider
> secrets, private provider URLs, or third-party data that Brandcode does not
> control. Subprocessor, data processing, and retention commitments require
> separate legal approval before public launch language is published.

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

## Approval Record

| Field | Recorded value |
| --- | --- |
| Decision date | `2026-05-11` |
| Decision owner | `Jason Lankow / Brandcode Studio Ops` |
| Approved requester classes | Brand owner/admin for the brand instance; Jason Lankow as Brandcode Studio Ops |
| Verification method | Brand instance admin status; for internal Column Five Brandcode, verified email matching `columnfivemedia.com` or `columnfive.com` |
| Deletion scope | Pre-release hosted MCP service data only: feedback/history, support/intake, non-secret key metadata, and MCP-visible package/runtime references; canonical Brandcode/UCS records handled through separate admin paths |
| Export scope and format | Curated support packet: Markdown index, JSON summaries/receipts, support/intake records, non-secret key metadata, and package-safe refs |
| Response window | No public SLA or customer-facing timeline during pre-release |
| Escalation path | Jason Lankow / Brandcode Studio Ops; legal review required before public launch language |
| Legal/subprocessor requirement | Draft language prepared for review; final terms/privacy/DPA/subprocessor language not approved |
| Launch copy allowed | None yet |

Until legal/subprocessor language is approved, deletion/export launch language
remains a named Jason/legal/ops decision blocker.

## Closeout Rule

Do not claim Brandcode MCP is publicly launched, directory-ready, or
release-candidate ready from this brief. The current operational path remains
manual pre-release deletion/export review through Brandcode Studio Ops until
Jason/legal/ops approve public launch language.
