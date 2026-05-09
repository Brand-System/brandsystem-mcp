# Brandcode MCP Release Candidate Trust Review

**Status:** M001-L13 review complete - release blocked
**Date:** 2026-05-09
**Applies to:** hosted `@brandcode/mcp` Use MCP
**Release posture:** no public release, npm publish, package listing, MCP
directory submission, or public listing change until Jason explicitly approves.

## Executive Readout

The hosted Brandcode Use MCP is stronger than the earlier hardening map: the
locked 8-tool surface is implemented, staging smoke passes, package-safe
`get_brand_asset` proof passes for `brandcode:logo:c5-logomark-red.svg`, and
M001-L12 passed two-client proof through MCP Inspector and Claude Code.

It is still not a release candidate. The blocking gap is no longer "does the
staging route basically work"; it is production trust. M001-L14 converted the
hosted-service terms and rate-limit gap into an explicit blocked gate. Public
release remains blocked by unresolved hosted-service terms, unresolved
package/source posture for `@brandcode/mcp`, rate-limit/abuse posture still
reported as `not_reported_by_staging`, no CI run on the local M001 stack
because the M001 stack remains unpushed, and no separate Brandcode Use
directory metadata package.

## Evidence Reviewed

- Local branch: `main`
- Remote state after `git fetch origin`: before the L13 closeout commit, `main`
  was ahead of `origin/main` by 20 commits.
- Latest remote CI on `main`: GitHub Actions run `25571869563`, commit
  `61218ac Fix npm audit: basic-ftp DoS, fast-uri path traversal,
  hono/ip-address/postcss XSS`, completed successfully on 2026-05-08.
- The local M001 stack from `c4dc704` through `931aedb` has not been pushed, so
  GitHub CI has not run on the current pre-release hardening docs/proof stack.
- Latest hosted proof from M001-L12:
  - staging deployment `https://brandsystem-eipxqt3go-column-five.vercel.app`
  - alias `https://mcp.staging.brandcode.studio`
  - hosted smoke passed with `fail: 0`, `blocked: 0`, `skipped: 0`
  - MCP Inspector returned the locked 8-tool order
  - MCP Inspector proved package-safe `get_brand_asset` and read-only
    `brand_check` insufficient scope
  - Claude Code called `brand_status` and `get_brand_asset`

## Trust Matrix

| Area | Status | Review |
| --- | --- | --- |
| Locked hosted surface | Pass for staging | All 8 locked tools are implemented and command-backed in staging proof. No tool expansion is needed or allowed for release trust. |
| Package-safe asset custody | Pass for Brandcode staging fixture | `brandcode:logo:c5-logomark-red.svg` now returns package-path delivery without raw private/provider URL exposure. |
| Multi-client proof | Pass for two clients | MCP Inspector and Claude Code proof are enough for the current battle-test lane. A third client is useful before launch but not the top release blocker. |
| Local-vs-remote source truth | Blocked | The local M001 stack remains unpushed; CI has not run on the M001 stack. This prevents a release-candidate claim. |
| Package/source license | Jason decision | The repo package is MIT for `@brandsystem/mcp`; `@brandcode/mcp` source/package posture still needs Jason's decision before npm or directory launch. |
| Hosted-service terms | Blocked | Bearer-key access, privacy, feedback/history retention, custody, abuse handling, service availability, and rate limits need explicit terms before release. |
| Rate limits / abuse | Blocked | `SECURITY.md` and `brand_status.rate_limits` report staging as `not_reported_by_staging` with `release_gate: "blocked"`. Public release needs active enforcement or Jason-approved Brandcode operations owner/blocker language. |
| Directory metadata | Deferred | `server.json`, `smithery.yaml`, `glama.json`, `llms.txt`, and README remain Build-oriented for `@brandsystem/mcp`. Brandcode Use needs separate listing metadata after terms/rate-limit posture is settled. |
| Production-key proof | Deferred | Staging `bck_test_` proof is good. Production `bck_live_` proof should happen after production env and terms/rate-limit posture exist, not in this review lane. |
| Another brand proof | Deferred | Brandcode fixture proof is adequate for the current gate. A non-Brandcode Studio brand should be proven before public launch if one is available with package-safe assets. |

## Blocker Conversion

Every remaining blocker is converted below. None is left as chat-only work.

### Repair Gate - M001-L14 Hosted Terms And Rate-Limit Gate

M001-L14 produced the terms/rate-limit release gate for hosted Brandcode MCP
access, covering bearer-key access, privacy, feedback/history retention,
custody guarantees, abuse handling, and rate-limit reporting/enforcement. The
gate is blocked, not satisfied. Directory metadata, production-key proof, and
public launch copy all remain downstream of that service posture.

### Named Jason Decision - Package/Source Posture

Jason must decide whether `@brandcode/mcp` package/source is MIT, proprietary,
dual-positioned, or service-only. The current repo MIT license is clean for
`@brandsystem/mcp` Build code, but it does not settle hosted service access or
future `@brandcode/mcp` package distribution.

### Named Jason Decision - Release Approval

Jason approval is required before any Brandcode MCP package publish, npm
publish, public release, production release, MCP directory submission,
Glama/Smithery/LobeHub submission, MCP Registry submission, or public listing
change. No release/publish action should be prepared as an irreversible step
inside hardening lanes.

### Product-Spine Deferral - Directory Metadata

Separate Brandcode Use directory metadata is required before launch, but it
should not be written from today's incomplete terms/rate-limit posture. Keep
Build metadata as `@brandsystem/mcp` for now; create a later directory-metadata
packet after M001-L14 closes.

### Product-Spine Deferral - Additional Proof

Before a public release-candidate claim, rerun proof after the M001 stack is
pushed and CI is green, then add production-key proof and a non-Brandcode brand
proof if real launch inputs exist. These are release-readiness proof gates, not
reasons to weaken the current hosted terms/rate-limit gate.

## Release Candidate Decision

Do not claim release-candidate readiness yet. The correct next step is one
Ready lane: M001-L15 Hosted Service Terms Decision Brief.

Release/publish remains blocked on Jason approval.
