# Brandcode MCP License And Directory Trust Audit

**Status:** M001-L06 audit complete
**Date:** 2026-05-08
**Applies to:** hosted `@brandcode/mcp` Use MCP
**Release posture:** no public release, npm publish, or MCP directory submission until Jason explicitly authorizes it after the hardening lanes close.

## Executive Readout

Brandcode MCP is not ready for public release or directory submission. The repo has a solid product lock for the hosted Use MCP, and the current Build package metadata mostly stays scoped to `@brandsystem/mcp`. The trust gap is that the hosted service has security, privacy, rate-limit, terms, and directory-listing obligations that are not covered by the existing MIT license or the current `SECURITY.md`.

M001-L14 has now converted the hosted-service terms and rate-limit gap into an
explicit blocked release gate. The next Ready lane is **M001-L15 Hosted Service
Terms Decision Brief**. Do not publish, release, submit to directories, add
tools, or change hosted behavior as part of this audit family.

## Source Surfaces Audited

- `LICENSE`
- `package.json`
- `README.md`
- `SECURITY.md`
- `llms.txt`
- `server.json`
- `glama.json`
- `smithery.yaml`
- `specs/brandcode-mcp-phase-0-lock.md`
- `specs/brandcode-mcp-use-roadmap-alignment.md`
- `specs/brandcode-mcp-pre-release-hardening.md`

## Findings

### P0 - Hosted-service terms are unresolved

Current evidence:

- `LICENSE` is MIT and grants broad rights to use, copy, modify, publish, distribute, sublicense, and sell the software (`LICENSE:1`, `LICENSE:5`-`LICENSE:10`).
- `package.json` is the published Build package, `@brandsystem/mcp`, with `license: "MIT"` (`package.json:2`, `package.json:64`).
- Phase 0 defines `@brandcode/mcp` as a hosted Use MCP with per-brand bearer keys, scopes, hosted URLs, and free v1 access for active Brandcode Studio brands protected by rate limits and per-brand caps (`specs/brandcode-mcp-phase-0-lock.md:16`-`specs/brandcode-mcp-phase-0-lock.md:20`, `specs/brandcode-mcp-phase-0-lock.md:46`-`specs/brandcode-mcp-phase-0-lock.md:66`).
- The hardening map already names the decision: whether `@brandcode/mcp` inherits MIT or needs terms covering bearer-key access, rate limits, feedback history, brand asset metadata, and abuse handling (`specs/brandcode-mcp-pre-release-hardening.md:33`-`specs/brandcode-mcp-pre-release-hardening.md:44`).

Audit answer:

`@brandcode/mcp` can likely inherit MIT for package/source-code distribution if it ships from this repo or sibling code under the same copyright posture. MIT does not answer hosted-service use. Public hosted access should have separate Brandcode service terms before release because it involves accounts/brands, bearer credentials, rate limits, service availability, feedback/history retention, private asset custody, abuse controls, and possible client-owned brand data.

Jason decision needed before release:

- Decide whether `@brandcode/mcp` package/source is MIT, proprietary, or dual-positioned.
- Add or link hosted service terms for Brandcode MCP access.
- Decide whether "Free in v1 for active Brandcode Studio brands" is a public pricing promise or pre-release/internal launch posture.

### P1 - Security documentation is too thin for hosted Use MCP review

Current evidence:

- `SECURITY.md` has a clear vulnerability-reporting channel and response SLA (`SECURITY.md:3`-`SECURITY.md:10`).
- Its posture list covers Zod input validation, SVG sanitization, SSRF protection, npm audit, and signed npm publishes (`SECURITY.md:12`-`SECURITY.md:17`).
- The hosted Use MCP lock depends on bearer auth, per-brand scopes, hashed keys, slug routing, read/check/feedback scope splits, and a service-token pull path (`specs/brandcode-mcp-phase-0-lock.md:44`-`specs/brandcode-mcp-phase-0-lock.md:76`; `specs/brandcode-mcp-use-roadmap-alignment.md:40`-`specs/brandcode-mcp-use-roadmap-alignment.md:48`).
- The hardening map lists missing hosted checks: malformed bearer rejection, `bck_test_`/`bck_live_` prefix rules, slug authorization, `BRANDCODE_MCP_SERVICE_TOKEN`, private URL redaction, feedback/history privacy, CORS/OPTIONS, rate limits, and CI posture (`specs/brandcode-mcp-pre-release-hardening.md:46`-`specs/brandcode-mcp-pre-release-hardening.md:65`).

Audit answer:

The current security docs are not strong enough for a hosted MCP directory review. They read like local package security notes, not a hosted bearer-auth service policy. Reviewers will want to see auth/scopes, service-token posture, private custody, feedback/history retention, vulnerability reporting, rate-limit/abuse handling, and what data is never returned.

Required before release:

- Add a hosted MCP security section to `SECURITY.md` or a linked trust doc.
- Document bearer-key requirements, scope meanings, slug authorization, staging vs production key prefixes, and service-token posture.
- Document private custody guarantees: no raw private provider URLs, package-safe asset delivery refs only, feedback/history redaction, and no secrets in receipts.
- Document rate-limit and abuse posture, even if some limits remain explicit deferrals.

### P1 - Directory metadata is Build-only and should stay that way until a Use listing is intentionally authored

Current evidence:

- `server.json` clearly points at the Build package: title `@brandsystem/mcp · Build`, npm identifier `@brandsystem/mcp`, stdio transport, and Build description (`server.json:3`-`server.json:18`).
- `smithery.yaml` starts `@brandsystem/mcp` over stdio and has no hosted Use config (`smithery.yaml:1`-`smithery.yaml:7`).
- `glama.json` only names maintainers and does not describe Brandcode MCP Use (`glama.json:1`-`glama.json:6`).
- `llms.txt` is also Build-first and only cross-references `@brandcode/mcp` as the hosted Use sibling (`llms.txt:1`-`llms.txt:14`, `llms.txt:40`-`llms.txt:41`).

Audit answer:

Current package/listing metadata mostly separates `@brandsystem/mcp` Build from hosted `@brandcode/mcp` Use because the only registry/listing files in-repo are Build-oriented. That is good for now. The risk is future submission reuse: if these files are copied or auto-ingested for Brandcode MCP, they would advertise stdio Build tooling rather than Streamable HTTP Use, and they would not show the locked eight hosted tools, auth requirements, scopes, privacy posture, or service terms.

Required before release:

- Create separate Brandcode MCP listing metadata rather than mutating Build metadata in place.
- Include the Phase 0 tagline and cross-reference lines from the lock (`specs/brandcode-mcp-phase-0-lock.md:113`-`specs/brandcode-mcp-phase-0-lock.md:136`).
- Make transport/auth obvious: hosted Streamable HTTP, `Authorization: Bearer bck_live_...`, path-scoped brand slug, per-brand scopes.
- Keep Build listings as `@brandsystem/mcp`; do not imply the Build package is the hosted Use endpoint.

### P1 - Public docs mostly preserve the 8-tool/read-append lock, but some phrasing can be misread as open public access

Current evidence:

- Phase 0 rejects build/extract/compile/local filesystem tools, canonical governance mutation, extra tools, and public unauthenticated share-token read mode (`specs/brandcode-mcp-phase-0-lock.md:37`-`specs/brandcode-mcp-phase-0-lock.md:42`).
- The roadmap repeats that the eight-tool lock stays closed, selected/campaign kits are not the v0.1 default, checks are read-only, feedback is append-only, and history is scoped (`specs/brandcode-mcp-use-roadmap-alignment.md:67`-`specs/brandcode-mcp-use-roadmap-alignment.md:74`, `specs/brandcode-mcp-use-roadmap-alignment.md:145`-`specs/brandcode-mcp-use-roadmap-alignment.md:153`).
- README explains the hosted Use MCP as live Full Brand Runtime access, package-safe asset reads, append-only review feedback, and no canonical mutation (`README.md:111`-`README.md:121`).
- README now qualifies the hosted Use path as authorized bearer-key access and
  points to the blocked L14 service gate before production launch.

Audit answer:

The docs do not currently imply canonical mutation, selected-kit default
behavior, capabilities outside the locked 8 tools, or unauthenticated public
availability when read together with the specs. Hosted Use copy now keeps
bearer-key authorization adjacent to the production-launch gate.

Required before release:

- Add authentication qualifiers near every public-facing Use MCP connection claim.
- Keep selected Brand Kit and campaign/exploratory kit language out of default Brandcode MCP release copy unless UCS ships hosted selected-kit publish/share truth.
- Keep all directory copy to exactly the locked 8 tools.
- Avoid suggesting `brand_feedback` mutates canon; keep it as append-only review input.

### P2 - Build-vs-Use separation is good, but package and README ownership language needs a final release pass

Current evidence:

- `package.json` is named `@brandsystem/mcp` and uses the `brandsystem-mcp` binary only (`package.json:2`, `package.json:8`-`package.json:10`).
- README labels the page as `@brandsystem/mcp — Build` and frames Brandcode MCP as the hosted Use sibling (`README.md:8`-`README.md:20`, `README.md:111`-`README.md:121`).
- README's portability table says `@brandsystem/mcp` is "Fully - open source, any brand" under MIT, while `@brandcode/mcp` is "Brandcode" owned (`README.md:559`-`README.md:567`).

Audit answer:

The metadata does separate Build from Use well enough for current pre-release docs. Before public Brandcode MCP release, the package/listing story still needs a terms-aware rewrite so users understand which parts are open source package code, which parts are hosted service access, which data is client-owned, and which service obligations belong to Brandcode.

## Directory And Trust-Scoring Risks

Likely Glama, LobeHub, Smithery, MCP Registry, or similar review risks:

- Missing hosted Use listing metadata for Streamable HTTP transport, bearer auth, scopes, and tool count.
- Existing `glama.json` is too sparse to help trust scoring beyond maintainer identity.
- `SECURITY.md` omits hosted auth, service-token, custody, feedback/history, and rate-limit posture.
- Service terms are unresolved for hosted access.
- Public-facing privacy/retention notes now exist in `SECURITY.md` and the L14
  gate spec, but the actual retention policy remains a Jason decision before
  release.
- `get_brand_asset` proof is still skipped without a stable staging asset id.
- CI has not run on all local M001 commits because `main` is ahead of origin.
- Current docs include staging proof and command-backed evidence, but public listing copy needs a clean separation between local proof, hosted route proof, and human-visible UI proof.

## Recommended Follow-Up Lanes

1. **M001-L14 Hosted Terms And Rate-Limit Gate** - Complete. Preserved
   `not_reported_by_staging` as a blocked release gate and named the missing
   Jason decisions.
2. **M001-L15 Hosted Service Terms Decision Brief** - Prepare the compact
   decision brief Jason needs to approve or revise service terms, retention,
   rate-limit/abuse ownership, pricing copy, and package/source posture.
3. **CI And Push Proof For M001 Stack** - Run only after Jason authorizes push
   or PR proof for the local M001 stack.
4. **Brandcode Use Directory Metadata** - Defer until the hosted service gate
   is settled.

## Jason Decisions Before Public Release

- What exact terms cover hosted Brandcode MCP access?
- Is `@brandcode/mcp` package/source MIT, proprietary, or dual-positioned?
- What public pricing/access language is allowed for "free in v1 for active Brandcode Studio brands"?
- What retention/privacy commitments apply to `brand_feedback` and `brand_history`?
- What rate-limit/abuse posture must be implemented before any public directory submission?

## Current Ready Lane

Exactly one lane should be Ready after the M001-L14 closeout:

**M001-L15 - Hosted Service Terms Decision Brief**

Goal: Turn the blocked hosted terms/rate-limit gate into a Jason-facing
decision brief without release, directory, package, or custody changes.
