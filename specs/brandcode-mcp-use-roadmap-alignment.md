# Brandcode MCP Use Roadmap Alignment

**Status:** Draft alignment note for Phase 1 planning  
**Date:** 2026-05-06  
**Depends on:** `specs/brandcode-mcp-phase-0-lock.md`, UCS portable runtime package artifact work through S037

## Purpose

Align the hosted **Use** MCP roadmap with the portable runtime work now landing in UCS. The Phase 0 lock remains valid: `@brandsystem/mcp` authors the runtime, while `@brandcode/mcp` serves a governed hosted brand over Streamable HTTP through the locked 8-tool surface.

The adjustment is not a new MCP surface. It is a sequencing and contract update so Brandcode MCP consumes the runtime substrate UCS actually has now: live Brand package JSON, Full Brand Runtime package artifacts, selected kit receipts, private-custody redaction, and AgentRun history.

## Current State

### In This Repo

- `src/hosted/`, `api/[slug].ts`, and `bin/brandcode-mcp.mjs` provide the Phase 1 staging scaffold.
- The hosted server registers the locked 8-tool surface in the Phase 0 order.
- `brand_runtime` and `brand_status` are implemented against `/api/brand/hosted/{slug}/pull`.
- `brand_runtime` recognizes the flat UCS `brandInstance` package shape and normalizes a minimal runtime-like object when no top-level compiled runtime exists.
- `brand_search`, `brand_check`, `list_brand_assets`, `get_brand_asset`, `brand_feedback`, and `brand_history` are honest `not_implemented_in_staging` stubs.
- AgentRun telemetry is explicitly deferred in the hosted scaffold; no UCS history POST is emitted until Milestone D wires the `{ entry: AgentRunHistoryEntry }` contract.

### In UCS

UCS has moved beyond the original April scaffold assumptions:

- The service-token pull route can return a compiled Brand package with `runtime` derived from `brandInstance`.
- Full Brand Runtime package artifacts now have a brand-scoped namespace:
  - `{brand}/runtime/packages/{brand}-brand-runtime-{hash}.zip`
  - `{brand}/runtime/packages/{brand}-brand-runtime-{hash}.receipt.json`
  - `{brand}/runtime/packages/latest.json`
- Brandcode and C5 have current downloadable Full Brand Runtime artifacts with private-custody redaction and external-consumer proof.
- Runtime Admin now distinguishes product objects that Brandcode MCP must not blur: Official Brand, Production-Approved Asset, selected Brand Kit, campaign/exploratory kit, and Full Brand Runtime.
- Selected Brand Kit work is progressing as a local artifact / CLI / target-path contract first. Hosted share URL and configured publish are downstream, not v1 assumptions.
- AgentRun history exists at `/api/brand/hosted/{slug}/agent/history`, but its POST contract expects an `AgentRunHistoryEntry` under `entry`.

## Alignment Principles

1. **Use MCP serves the live Brand package, not the ZIP.** `brand_runtime`, `brand_search`, `brand_check`, and asset catalog reads should start from the service-token Brand package JSON. The hosted ZIP is the external-consumer delivery artifact, not the primary MCP read path.
2. **Full Brand Runtime is the v1 default.** Do not make selected Brand Kits appear as the default hosted brand until UCS ships hosted selected-kit publish/share URL truth.
3. **Package artifact truth belongs in status and assets.** `brand_status` should report whether a current Full Brand Runtime package artifact exists. Asset tools may expose package-safe URLs/receipt posture when available, but must not surface raw private provider URLs.
4. **Search and check should reuse UCS runtime helpers.** Prefer UCS endpoints or shared logic equivalent to `queryBrandKnowledgeCorpus` and `checkDraftAgainstRuntime` rather than inventing a second governance evaluator in this repo.
5. **Feedback is append-only review input.** `brand_feedback` should create or route to a governance review queue/proposal without mutating canonical governance.
6. **History must be scoped and receipt-aware.** `brand_history` should read AgentRun history scoped by API key/brand permissions and preserve portable receipt chains where UCS provides them.
7. **Scopes need executable enforcement.** The v1 claim is not complete until tool calls return a stable 403-equivalent response when a granted key lacks the required scope.

## Roadmap

### Milestone A: Sprint Gate Truth

Goal: one live-governance tool answers from `mcp.staging.brandcode.studio/{slug}` against a real MCP client.

Required work:

- Deploy the current hosted scaffold to staging with `UCS_SERVICE_TOKEN`, `BRANDCODE_MCP_ENV=staging`, and test keys.
- Prove `initialize`, `listTools`, and `brand_runtime` against a real MCP client and a real Studio brand.
- Capture route proof separately from human-visible UI proof. MCP client success is enough for this gate; Runtime Admin UI proof is not a substitute.
- Fix repo truth gaps before claiming the gate closed:
  - README phase-gate wording must say the gate is current until staging proof exists.
  - Hosted per-tool scope enforcement must be wired, not just described.
  - Telemetry must either emit a valid UCS `AgentRunHistoryEntry` or stay explicitly deferred.

### Milestone B: Runtime-Backed Read Tools

Goal: replace the first read stubs without widening the 8-tool surface.

Order:

1. `brand_search`: query narratives, proof points, application rules, brand phrases, capabilities, and source/provenance labels from the hosted Brand package.
2. `list_brand_assets`: return paginated official/production-approved/runtime asset catalog entries with custody-safe URLs and package posture.
3. `get_brand_asset`: fetch one asset's metadata and package-safe delivery reference, blocking or redacting private custody instead of returning raw provider URLs.
4. `brand_status`: add Full Brand Runtime artifact posture: current/stale/missing, version hash, package path, freshness, rate-limit state, and implemented-tool matrix.

Acceptance:

- No selected-kit artifact is implied unless a hosted selected-kit URL actually exists.
- No raw private hosted URL appears in MCP responses.
- Stubs that remain continue to return explicit `not_implemented_in_staging`.

### Milestone C: Governance Actions

Goal: complete the two tools that affect work products without mutating canon.

Order:

1. `brand_check`: validate text/color/font/CSS against hosted governance and return verdict, findings, recommended fixes, and cited rule/proof/narrative matches.
2. `brand_feedback`: append an observation or proposal to the governance review queue with source tool, actor key id, brand slug, and optional evidence references.

Acceptance:

- `brand_check` mirrors the Build MCP signature where practical, but its source is hosted governance.
- `brand_feedback` is append-only and never claims official mutation.

### Milestone D: Observability And History

Goal: make MCP use visible in Studio without blocking tool responses.

Required work:

- Update telemetry to send the UCS history POST shape: `{ entry: AgentRunHistoryEntry }`.
- Emit history for ok, stub, auth error, upstream error, and tool error outcomes.
- Implement `brand_history` over the UCS history GET route with provider `mcp`, surface `mcp-hosted`, cursor/limit behavior, and receipt-chain passthrough.
- Keep telemetry fire-and-forget, but surface local logs when emit fails.

### v0.1 Ship Gate

`@brandcode/mcp` v0.1 is ready when:

- All 8 tools are implemented or intentionally blocked with a documented v0.1 deferral.
- Auth failures, slug authorization, per-tool scopes, rate limits, upstream errors, and not-found states are covered by tests.
- Staging proves a real MCP client can call the live hosted route.
- Hosted responses distinguish local component/API proof, hosted route proof, and human-visible UI proof.
- Package metadata and directory listings cross-link `@brandsystem/mcp` for Build and `@brandcode/mcp` for Use without migration pressure.

## Explicit Deferrals

- Build/extract/compile tools stay in `@brandsystem/mcp`.
- Canonical governance mutation stays in Brand Console / Runtime Admin.
- Selected Brand Kit hosted publish/share is not part of v1 unless UCS ships that durable artifact first.
- Public unauthenticated reads remain rejected for v1.
- Separate `brand_proof_check` and `brand_narrative_routing` remain folded into `brand_check` and `brand_search`.
