# M001-L16 - Full Suite Visual Extraction Smoke Repair

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** QC / test repair
**Recommended commit:** `Repair visual extraction smoke responses`

## Why

M001-L14 verification found that focused hosted tests, lint, and build passed,
but full `npm test` still fails two Build MCP smoke cases:

- `brand_extract_visual returns gracefully without .brand/`
- `brand_extract_site returns gracefully without .brand/ when merge is false`

Both failures are invalid MCP content responses when tools are exercised without
`.brand/`. Full-suite green should precede push/CI proof or any
release-candidate claim.

## Scope

Repair the two smoke failures without changing hosted Brandcode MCP behavior.

Inspect:

- `test/tools/smoke.test.ts`
- `src/tools/brand-extract-visual.ts`
- `src/tools/brand-extract-site.ts`
- shared response helpers only if the invalid content shape is produced there

## Out Of Scope

- No hosted Use MCP tool changes unless a shared response helper is truly
  responsible.
- No release, publish, npm publish, directory submission, listing changes,
  selected-kit work, custody relaxation, or push unless Jason asks.

## Acceptance

- `npm test -- --run test/tools/smoke.test.ts` passes.
- `npm run lint` and `npm run build` pass if TypeScript/tool code changes.
- Full `npm test` is attempted and recorded.
- Sprint board, messages, and `HANDOFF.md` are updated.
- Exactly one next Ready lane remains.

## Starting Evidence

M001-L14 full-suite verification ran 526 tests: 524 passed and 2 failed. The
failure shape was an MCP SDK rejection of an invalid tool result because the
first content item had no valid text, image, audio, or resource payload.

## Closeout

The smoke failures were caused by Puppeteer screenshot bytes being handled with
`.toString("base64")` directly. In the current runtime, screenshots can be
Uint8Array values; direct `toString("base64")` produced comma-separated byte
text instead of valid base64, so the MCP SDK rejected the image content block.

Repair:

- Added `screenshotToBase64()` in `src/lib/visual-extractor.ts`.
- Updated `brand_extract_visual`, `brand_extract_site`, and `brand_start` to
  encode screenshots through the shared helper before returning MCP image
  content.

Verification:

- `npm test -- --run test/tools/smoke.test.ts` passed: 50 tests.
- `npm run lint` passed.
- `npm run build` passed.
- Full `npm test` passed: 39 files, 526 tests.

## Next Suggested Lane

After full-suite green, the next lane should be push/CI proof for the local
M001 stack if Jason authorizes push or PR proof. If Jason does not authorize
push, pause on that named decision.
