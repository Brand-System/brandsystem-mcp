# Brandcode MCP Package Source Posture Decision Brief

**Status:** Option 4 approved for v0.1 limited-client release; release still blocked
**Date:** 2026-05-11
**Applies to:** future `@brandcode/mcp` source/package distribution and public
directory/listing metadata
**Release posture:** no npm publish, public package metadata, public source
posture change, public directory submission, or Brandcode MCP release for v0.1
limited-client work. Jason has approved deferring public package/source
distribution; any later package/source or release action still requires
explicit approval.

## Jason Decision

Jason approved **Option 4 - Defer public package/source distribution** for the
v0.1 limited-client posture on 2026-05-11.

Interpretation:

- Brandcode MCP remains an approved-brand hosted pre-release service.
- Do not publish `@brandcode/mcp` to npm for v0.1 limited-client work.
- Do not submit Brandcode MCP directory metadata for v0.1 limited-client work.
- Do not make a public `@brandcode/mcp` source/license posture claim yet.
- Authorized clients connect to the hosted Streamable HTTP endpoint with
  brand-scoped bearer keys.
- Option 3 remains the likely future public direction: a narrow public
  connector/client artifact plus service-controlled hosted implementation and
  bearer-key-gated brand data access.

## Executive Readout

Hosted Brandcode MCP has strong pre-release proof, and v0.1 package/source
posture is now settled as deferred public distribution. The Build MCP,
`@brandsystem/mcp`, is already the public MIT authoring package. The hosted Use
MCP serves authorized brand-scoped access to the live Full Brand Runtime over
HTTP.

Those are separate decisions:

- `@brandsystem/mcp` Build package: current public MIT package and stdio MCP.
- Hosted Brandcode MCP service access: authorized, bearer-key, pre-release
  access only.
- Future public `@brandcode/mcp` source/package distribution: deferred for
  v0.1 limited-client work.
- Public directory/listing metadata: deferred until Brandcode is ready to move
  from limited-client pre-release toward public distribution.

Installing source or package code must not imply entitlement to
`mcp.brandcode.studio`, bearer keys, Brandcode Studio brands, hosted runtime
data, feedback/history records, or package-safe assets.

## Decision Jason Needs To Make

Jason chose one package/source posture for v0.1 limited-client work:

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

4. **Defer public package/source distribution.** **Approved for v0.1
   limited-client work.**
   Keep the hosted Use MCP in approved-brand pre-release only. Do not publish
   `@brandcode/mcp`, do not submit directory metadata, and do not make a public
   source/license claim yet.

If Jason later chooses another posture, record it explicitly before changing
package metadata, source/license posture, or public listing copy.

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
  directory metadata, any future public package/source decision, and explicit
  Jason release approval.

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

Approved for v0.1 limited-client work. Best when the right answer is to keep
pre-release moving without freezing a public posture too early.

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
- "No public package/source distribution has been approved for v0.1."
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

The following public-distribution work remains blocked under the approved
Option 4 v0.1 posture:

- publishing or preparing npm metadata for `@brandcode/mcp`;
- changing package license/source claims;
- submitting or drafting public MCP directory listing metadata as final copy;
- changing `server.json`, `smithery.yaml`, `glama.json`, or package metadata for
  hosted Brandcode MCP;
- claiming Brandcode MCP is release-candidate ready, publicly launched, or
  directory-ready;
- using package/source posture to weaken hosted custody, auth, scope,
  rate-limit, feedback/history, deletion/export, or support requirements.

## Current Blocker

No public package/source posture blocker remains for v0.1 limited-client work:
Jason chose Option 4.

Current blocker:

Limited-client readiness now needs a separate operational lane for approved
client onboarding, key issuance/revocation, endpoint posture, smoke proof per
client brand, support/deletion/export intake, and no-public-listing guardrails.
Public npm, package metadata, directory submission, public listing, public
source/license posture change, and release-candidate claims remain blocked.
