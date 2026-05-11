# Brandcode MCP Package Source Posture Decision Brief

**Status:** Jason decision required; release still blocked
**Date:** 2026-05-11
**Applies to:** future `@brandcode/mcp` source/package distribution and public
directory/listing metadata
**Release posture:** no npm publish, public package metadata, public source
posture change, public directory submission, or Brandcode MCP release until
Jason explicitly approves the package/source posture and the release action.

## Executive Readout

Hosted Brandcode MCP has strong pre-release proof, but package/source posture is
not settled. The Build MCP, `@brandsystem/mcp`, is already the public MIT
authoring package. The hosted Use MCP, `@brandcode/mcp`, serves authorized
brand-scoped access to the live Full Brand Runtime over HTTP.

Those are separate decisions:

- `@brandsystem/mcp` Build package: current public MIT package and stdio MCP.
- Hosted Brandcode MCP service access: authorized, bearer-key, pre-release
  access only.
- Future `@brandcode/mcp` source/package distribution: undecided.
- Public directory/listing metadata: deferred until package/source and service
  launch posture are approved.

Installing source or package code must not imply entitlement to
`mcp.brandcode.studio`, bearer keys, Brandcode Studio brands, hosted runtime
data, feedback/history records, or package-safe assets.

## Decision Jason Needs To Make

Before any npm, package metadata, directory listing, public source posture, or
release work, Jason must choose one package/source posture for `@brandcode/mcp`:

1. **Open package/source with separate hosted service terms.**
   `@brandcode/mcp` source/package code may inherit the repo's MIT posture, but
   hosted access remains controlled by Brandcode bearer keys, scopes, rate
   limits, service terms, and brand eligibility.

2. **Proprietary or service-only package/source.**
   `@brandcode/mcp` source and package distribution do not inherit the Build
   package MIT posture. Public docs may describe the hosted endpoint and
   authorized connection shape, but source/package access is controlled by
   Brandcode.

3. **Dual posture.**
   A small public package, connector, or metadata layer may be open, while the
   hosted service implementation, operational access, and Brandcode-managed
   runtime service remain proprietary/service-controlled.

4. **Defer public package/source distribution.**
   Keep the hosted Use MCP in approved-brand pre-release only. Do not publish
   `@brandcode/mcp`, do not submit directory metadata, and do not make a public
   source/license claim yet.

If Jason chooses another posture, record it explicitly before changing package
metadata or public listing copy.

## Current Evidence

- `@brandsystem/mcp` is the current public package in `package.json`,
  `server.json`, and `smithery.yaml`.
- `package.json` declares MIT for the Build package code.
- Existing Build directory metadata is stdio/local authoring metadata, not
  hosted Use metadata.
- The Phase 0 Brandcode MCP surface is a locked hosted Streamable HTTP Use MCP
  with exactly 8 tools: `brand_runtime`, `brand_search`, `brand_check`,
  `brand_status`, `list_brand_assets`, `get_brand_asset`, `brand_feedback`, and
  `brand_history`.
- M001 proof has covered staging route access, package-safe asset custody,
  append-only feedback, multi-client calls, full-suite/CI, and durable shared
  rate limiting on staging.
- Hosted data-policy truth is drafted: client-owned/client-controlled brand
  data, scoped/redacted history, append-only feedback, package-safe custody, and
  no raw private/provider URL exposure.
- Public release remains blocked by final deletion/export launch approval,
  package/source posture, directory metadata, and explicit Jason release
  approval.

## Option Tradeoffs

### Option 1 - Open package/source, hosted service gated

Best when transparency, directory trust, and continuity with the Build MCP's
MIT posture matter most.

Benefits:

- Consistent with the current public repo/license posture.
- Easier for directory reviewers and agent clients to inspect.
- Clear "open code, controlled service" story if docs are precise.

Risks:

- Public package users may assume hosted access is included unless every public
  surface says bearer-key Brandcode access is separate.
- Package metadata must avoid implying open access to private brand data,
  runtime packages, feedback/history, or hosted service availability.
- Service terms still need to cover accounts, eligibility, rate limits,
  feedback/history, deletion/export, custody, abuse, and support.

Required wording:

- "MIT covers package/source code only."
- "Hosted access requires an authorized Brandcode bearer key for the brand."
- "Installing the package does not grant access to hosted Brandcode MCP."

### Option 2 - Proprietary or service-only

Best when Brandcode wants tighter commercial/control posture before public
ecosystem distribution.

Benefits:

- Reduces accidental inference that hosted access is public or broadly
  self-serve.
- Leaves more room to settle pricing, account eligibility, support, and service
  commitments before package distribution.
- Keeps hosted operational implementation clearly under Brandcode control.

Risks:

- Lower transparency for MCP directory trust review.
- More friction for agent/client setup if clients expect package-installable
  servers.
- Requires explicit language explaining why `@brandsystem/mcp` is MIT while
  `@brandcode/mcp` is not.

Required wording:

- "Brandcode MCP is a hosted service for authorized Brandcode brands."
- "`@brandsystem/mcp` remains the open Build package."
- "Source/package distribution for `@brandcode/mcp` is controlled separately."

### Option 3 - Dual posture

Best when Brandcode wants public install/listing convenience without making the
hosted service implementation or service access broadly open.

Benefits:

- Allows a narrow public connector, config helper, or directory package while
  preserving service-controlled hosted access.
- Can keep the public artifact free of secrets, custody paths, and private
  runtime data.
- Gives directory reviewers something concrete without collapsing code license
  and service entitlement.

Risks:

- More moving parts and more copy precision required.
- Public users may still conflate the connector with service access.
- Requires deciding which code/files are open and which are service-controlled.

Required wording:

- "The public package is a connector/client surface."
- "The Brandcode-hosted service and brand data access remain bearer-key gated."
- "The public package does not include or expose private runtime data."

### Option 4 - Defer public package/source distribution

Best when the right answer is to keep pre-release moving without freezing a
public posture too early.

Benefits:

- Avoids premature source/license commitments.
- Keeps directory/listing copy out of public channels until service terms and
  launch approvals are fully settled.
- Lowest risk of false public entitlement claims.

Risks:

- Leaves Brandcode MCP out of public package/directory discovery.
- Slows broader client adoption.
- Keeps package/source posture as a named release blocker.

Required wording:

- "Brandcode MCP remains approved-brand pre-release only."
- "No public package/source posture has been approved."
- "No directory or npm listing work should proceed."

## Non-Negotiable Boundaries

Any option must preserve these boundaries:

- Build and Use stay separate: `@brandsystem/mcp` authors `.brand`; hosted
  `@brandcode/mcp` serves the live Full Brand Runtime to authorized clients.
- Source/package license does not grant hosted service access.
- Hosted service access requires bearer-key authorization and brand scope.
- The locked v0.1 hosted surface remains exactly 8 tools.
- `brand_feedback` remains append-only review input, not canonical mutation.
- Asset tools may expose package-safe delivery references only; raw
  private/provider URLs, private Blob URLs, service tokens, and raw custody
  paths remain blocked.
- selected Brand Kits and campaign/exploratory kits do not become the default
  hosted MCP object for v0.1.
- Directory/listing metadata must be authored separately from existing
  `@brandsystem/mcp` Build metadata.

## Downstream Work Blocked Until Decision

The following work must not start until Jason chooses a package/source posture:

- publishing or preparing npm metadata for `@brandcode/mcp`;
- changing package license/source claims;
- submitting or drafting public MCP directory listing metadata as final copy;
- changing `server.json`, `smithery.yaml`, `glama.json`, or package metadata for
  hosted Brandcode MCP;
- claiming Brandcode MCP is release-candidate ready, publicly launched, or
  directory-ready;
- using package/source posture to weaken hosted custody, auth, scope,
  rate-limit, feedback/history, deletion/export, or support requirements.

## Recommended Decision Prompt For Jason

Choose the `@brandcode/mcp` package/source posture before release work:

> Should Brandcode MCP ship as open MIT package/source with separate hosted
> service terms, as proprietary/service-only, as a dual public connector plus
> service-controlled hosted implementation, or remain unpublished/deferred for
> v0.1?

Also decide:

- whether public package/source distribution is allowed before final hosted
  deletion/export launch language is approved;
- whether package/listing copy may say "free in v1" or must stay limited to
  approved-brand pre-release wording;
- which public artifact, if any, should be named `@brandcode/mcp`;
- whether directory metadata should describe only remote hosted HTTP access or
  also a package-installable component.

## Current Blocker

Named Jason decision blocker:

`@brandcode/mcp` package/source posture is undecided. No npm, package metadata,
directory submission, public listing, public source/license posture change, or
release-candidate claim should proceed until Jason chooses and approves the
posture.
