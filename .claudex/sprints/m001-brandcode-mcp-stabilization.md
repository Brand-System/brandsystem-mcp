# M001 - Brandcode MCP Stabilization And v0.1 Proof

**Status:** Active
**Opened:** 2026-05-08
**Primary surface:** Hosted Brandcode Use MCP in `src/hosted/`
**Product frame:** Two MCPs, one brand

## Objective

Stabilize the Brandcode hosted Use MCP after the fast 8-tool implementation run. The goal is not more surface area. The goal is a boring, repeatable v0.1 proof story:

- CI-backed source truth
- locked 8-tool surface
- hosted staging route proof
- real MCP client proof
- append-only feedback proof
- UCS portable runtime / Runtime Admin semantic alignment

## Non-Goals

- No tool #9.
- No build/extract/compile tools in `@brandcode/mcp`.
- No canonical governance mutation through hosted MCP.
- No selected Brand Kit default until UCS has durable hosted selected-kit publish/share truth.
- No public unauthenticated reads for v0.1.
- No package publish until staging proof is clean.

## Sprint Map

### M001-L01 - Hosted Proof Harness And Truth Spine

Create a repeatable smoke harness and update docs so hosted proof is a command-backed artifact, not a chat transcript. This lane should be possible without DNS or secret changes by making the harness configurable and by documenting blocked proof explicitly.

### M001-L02 - Roadmap Alignment Delta

Refresh the Use MCP roadmap against the current implementation and UCS Runtime Admin / portable runtime language:

- Official Brand
- Production-Approved Asset
- selected Brand Kit
- campaign/exploratory kit
- Full Brand Runtime
- hosted patch/review request
- `DESIGN.md` as adapter brief, not runtime authority

### M001-L03 - Staging Route Proof

Once DNS/Vercel access is available, prove `https://mcp.staging.brandcode.studio/{slug}` directly, not only a Vercel preview URL. Capture route-level proof separately from UI proof.

### M001-L04 - Feedback Append Proof

Once a real UCS service token exists, prove `brand_feedback` writes an append-only UCS history entry with the expected receipt posture and without canonical governance mutation.

### M001-L05 - Pre-Release Hardening Map

Map license, security, test-depth, directory-scoring, and battle-test work before any public package release or MCP directory submission. The output should be a hardening plan and exactly one next Ready lane, not a publish plan.

## Acceptance For Sprint Close

- GitHub CI is green on the current hardening branch or main checkpoint before any release claim.
- Hosted smoke harness exists and is documented.
- `tools/list` proves exactly 8 tools in locked Phase 0 order.
- `brand_status` reports all tools truthfully.
- Scope failures are proved for at least `brand_check` and `brand_feedback`.
- `brand_runtime`, `brand_search`, `brand_check`, `brand_history`, and `brand_feedback` are each proved against staging or explicitly named as blocked with the exact missing dependency.
- The roadmap alignment doc no longer describes implemented tools as stubs.
- `@brandsystem/mcp` remains Build and `@brandcode/mcp` remains Use.
- No public release, npm publish, or MCP directory submission happens until Jason explicitly authorizes it after hardening.
