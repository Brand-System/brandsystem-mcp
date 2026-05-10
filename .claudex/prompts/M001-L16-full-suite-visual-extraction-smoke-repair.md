# Build Lane Prompt - M001-L16 Full Suite Visual Extraction Smoke Repair

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp`.

Read first:

- `AGENTS.md`
- `.claudex/sprints/current.md`
- `.claudex/packets/M001-L16-full-suite-visual-extraction-smoke-repair.md`
- `HANDOFF.md`
- `test/tools/smoke.test.ts`
- `src/tools/brand-extract-visual.ts`
- `src/tools/brand-extract-site.ts`
- shared response helpers only if needed

Task:

Repair two full-suite smoke failures from M001-L14:

- `brand_extract_visual returns gracefully without .brand/`
- `brand_extract_site returns gracefully without .brand/ when merge is false`

Failure shape: invalid MCP content when tools are called without `.brand/`.
Fix the response shape so both tools return graceful valid MCP content.

Do not publish, release, submit to directories, add hosted tools, alter listing
metadata, push, relax custody, or change hosted Use behavior unless a shared
response helper is truly responsible.

Verification:

- `git diff --check`
- `npm test -- --run test/tools/smoke.test.ts`
- `npm run lint` and `npm run build` if TypeScript code changes
- full `npm test` attempted and recorded

Closeout:

- update `.claudex/sprints/current.md`, the L16 packet,
  `.claudex/messages/M001-messages.md`, and `HANDOFF.md`
- leave exactly one next Ready lane
- commit to `main`
- do not push unless Jason asks
