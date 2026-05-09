# M001-L14 - Hosted Terms And Rate-Limit Gate

**Status:** Ready
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Trust / policy / release gate
**Recommended commit:** `Gate Brandcode MCP hosted terms and rate limits`

## Why

M001-L13 found that the hosted Brandcode Use MCP has strong staging and
two-client proof, but it is still not release-candidate ready. The highest
remaining blocker is production trust for hosted service access: terms,
privacy/retention, custody language, abuse handling, and rate-limit posture.

This lane should turn the `not_reported_by_staging` rate-limit truth and
unresolved hosted-service terms into an explicit release gate. It is not a
publish, release, package, or directory-submission lane.

## Scope

Review and update narrowly:

- `SECURITY.md`
- `README.md`
- `llms.txt`
- `specs/brandcode-mcp-pre-release-hardening.md`
- `specs/brandcode-mcp-license-directory-trust-audit.md`
- `specs/brandcode-mcp-release-candidate-trust-review.md`
- any existing hosted MCP docs that make a terms, privacy, retention, custody,
  abuse, or rate-limit claim

Define the release gate for:

- bearer-key access terms;
- privacy and client-owned brand data posture;
- `brand_feedback` and `brand_history` retention/visibility;
- private custody guarantees and package-safe delivery limits;
- abuse handling and operational owner;
- rate-limit reporting/enforcement or a named blocker owner;
- whether public copy may say "free in v1 for active Brandcode Studio brands";
- whether `@brandcode/mcp` source/package posture is MIT, proprietary,
  dual-positioned, or still a Jason decision.

## Out Of Scope

- No npm publish.
- No package rename.
- No public release.
- No production release.
- No Glama, Smithery, LobeHub, MCP Registry, or other directory submission.
- No public listing change.
- No new hosted tools.
- No selected Brand Kit default behavior.
- No custody relaxation.
- No canonical governance mutation from the MCP.

## Acceptance

- The docs state whether the hosted-service terms/rate-limit gate is satisfied
  or still blocked.
- If still blocked, the exact Jason decision or operational owner is named.
- `not_reported_by_staging` is either replaced by command-backed enforcement
  evidence or preserved as an explicit release blocker.
- Feedback/history retention and visibility are not vague.
- Custody language remains strict: package-safe delivery only, no raw
  private/provider URL exposure.
- Any directory metadata work remains deferred until the service gate is
  settled.
- Release/publish remains blocked on Jason approval.
- `git diff --check` passes.
- Sprint board, messages, and `HANDOFF.md` are updated at closeout.
- Exactly one next Ready lane remains after closeout.

## Starting Evidence

M001-L13 release-candidate trust review found:

- before the L13 closeout commit, local `main` was 20 commits ahead of
  `origin/main`;
- latest remote CI green baseline is `61218ac`, before the local M001 stack;
- staging smoke and two-client proof passed in M001-L12;
- `SECURITY.md` still reports rate limits as `not_reported_by_staging`;
- hosted-service terms are unresolved;
- `@brandcode/mcp` package/source posture remains a Jason decision;
- directory metadata should remain deferred until terms and rate-limit posture
  are settled.

## Next Suggested Lane

After this gate closes, choose exactly one of:

- CI/push proof for the full M001 stack, if Jason authorizes push/PR proof;
- Brandcode Use directory metadata, if terms/rate-limit posture is settled;
- production-key/non-Brandcode proof, if launch inputs exist.

Do not advance to release, publish, or directory submission without Jason's
explicit approval.
