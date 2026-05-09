# M001-L13 - Release Candidate Trust Review

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** PO review / release-candidate gate
**Recommended commit:** `Review Brandcode MCP release candidate trust`

## Why

The hosted Brandcode Use MCP has now passed staging smoke, package-safe asset
delivery proof, and two-client hosted proof. That does not mean publish. Jason
explicitly wants to avoid a weak first release because MCP directories and
review/scoring sites can hold onto early negative impressions for weeks or
months.

This lane should decide whether the repo is ready for a release-candidate
repair sequence, and it should convert every remaining blocker into a durable
packet or named Jason decision.

## Scope

Review the pre-release trust posture across:

- local-vs-remote/CI status for the M001 commit stack;
- package/source license posture for `@brandcode/mcp`;
- hosted-service terms for bearer-key access, privacy, feedback/history
  retention, custody, abuse handling, and rate limits;
- rate-limit/abuse posture currently reported as `not_reported_by_staging`;
- directory metadata readiness for Glama, LobeHub, Smithery, MCP Registry, and
  server metadata;
- README, `SECURITY.md`, `llms.txt`, `server.json`, `glama.json`, and
  `smithery.yaml`;
- proof summary from M001-L11 and M001-L12;
- whether a third client, non-Brandcode brand, or production-key proof is needed
  before any release-candidate claim.

## Out Of Scope

- No npm publish.
- No public MCP directory submission.
- No production release.
- No new hosted tools.
- No selected Brand Kit default behavior.
- No custody relaxation.
- No canonical governance mutation from the MCP.

## Acceptance

- Produce a concise release-candidate trust review in `specs/` or update the
  existing hardening/trust docs with explicit pass/blocker status.
- Name every remaining blocker as one of:
  - repair packet;
  - product-spine deferral;
  - named Jason decision.
- Decide the next single Ready lane.
- Keep release posture explicit: this is not publish/release.
- Update `.claudex/sprints/current.md`, `.claudex/messages/M001-messages.md`,
  and `HANDOFF.md`.
- `git diff --check` passes.
- Commit directly to `main`.

## Starting Evidence

M001-L12 proof passed on 2026-05-09:

- Latest staging deployment:
  `https://brandsystem-eipxqt3go-column-five.vercel.app`
- Alias: `https://mcp.staging.brandcode.studio`
- Hosted smoke passed with `fail: 0`, `blocked: 0`, `skipped: 0`.
- MCP Inspector returned the locked 8-tool order.
- MCP Inspector proved package-safe `get_brand_asset` and read-only
  `brand_check` insufficient scope.
- Claude Code called `brand_status` and `get_brand_asset` through a temporary
  HTTP MCP config.

## Next Suggested Lane

The next lane should be whichever blocker the trust review ranks highest. Likely
candidates are hosted-service terms/rate-limit posture, directory metadata, or
CI/push/PR hardening.
