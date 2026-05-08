# M001-L02 - Roadmap Alignment Delta

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And v0.1 Proof
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Build lane
**Recommended commit:** `Refresh Brandcode MCP roadmap alignment`

## Why

`specs/brandcode-mcp-use-roadmap-alignment.md` still carries Phase 1 scaffold language from before the hosted 8-tool implementation run. It now says several tools are stubs even though `brand_search`, asset reads, `brand_check`, `brand_history`, and `brand_feedback` have been implemented.

Before more hosted proof or release work, the roadmap should match the current implementation and the UCS portable runtime product spine.

## Scope

Refresh the repo's roadmap/product-spine docs so the Brandcode hosted Use MCP story is current and truthful.

In scope:

- Update `specs/brandcode-mcp-use-roadmap-alignment.md` to reflect the current implemented 8-tool surface.
- Preserve the Phase 0 lock: exactly 8 tools, hosted Use only, no canonical governance mutation.
- Explicitly distinguish:
  - Official Brand
  - Production-Approved Asset
  - selected Brand Kit
  - campaign/exploratory kit
  - Full Brand Runtime
  - hosted patch/review request
- Keep `DESIGN.md` framed as an adapter/readable brief, not runtime authority.
- Keep `brand_feedback` framed as append-only review input or hosted patch request posture, not canonical governance mutation.
- Keep selected/campaign kits out of default v0.1 Use MCP unless UCS has hosted selected-kit publish/share truth.
- Update README or Phase 0 references only if they currently contradict the refreshed roadmap.
- Update M001 sprint docs/messages/HANDOFF at closeout.

Out of scope:

- Implementing or changing hosted tools.
- Changing smoke harness behavior.
- DNS, Vercel, deployment protection, or secret work.
- Publishing `@brandcode/mcp`.
- Adding selected-kit hosted behavior.

## Acceptance

- The roadmap no longer says implemented hosted tools are `not_implemented_in_staging` stubs.
- The roadmap clearly separates current implemented state, remaining hosted proof blockers, and v0.1 release gates.
- Object semantics match UCS/Runtime Admin language and do not collapse every object into generic "brand asset" or "patch/export" language.
- Build MCP and Use MCP remain positioned as separate packages sharing the same portable runtime contract.
- No new tool surface is introduced.
- `git diff --check` passes.
- Run `npm run lint` if TypeScript or package/docs references that affect typed imports are changed; otherwise document why the lane is docs-only.

## Closeout Notes To Capture

- Which docs changed.
- Any remaining product-spine questions that need Jason.
- Whether M001-L03 is unblocked or still waiting on DNS/Vercel access.
