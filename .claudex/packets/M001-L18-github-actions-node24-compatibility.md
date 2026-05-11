# M001-L18 - GitHub Actions Node 24 Compatibility

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** CI hardening / release-trust hygiene
**Recommended commit:** `Harden GitHub Actions Node runtime posture`

## Why

M001-L17 pushed the M001 stack and GitHub CI passed on run `25641439073`, but
the run emitted a deprecation annotation:

- `actions/checkout@v4` and `actions/setup-node@v4` are running on Node.js 20.
- GitHub will force JavaScript actions to Node.js 24 by default starting
  2026-06-02.
- Node.js 20 will be removed from the runner on 2026-09-16.

This is not a current CI failure, but it is a release-trust hygiene issue. Fix
or explicitly document the workflow posture before any release-candidate claim.

## Scope

Inspect and update narrowly:

- `.github/workflows/*`
- package manager setup only if the workflow requires it
- M001 closeout docs

Preferred repair:

- update GitHub Actions versions if newer Node 24-compatible versions exist;
  otherwise
- add the documented temporary opt-in env for Node 24 and verify CI still
  passes.

## Out Of Scope

- No release, npm publish, public MCP directory submission, public listing
  changes, hosted tool additions, selected-kit default behavior, or custody
  relaxation.
- No unrelated CI redesign.
- No package manager migration.

## Acceptance

- Local workflow diff is minimal and reviewable.
- `git diff --check` passes.
- Relevant local checks are run if workflow/package scripts change.
- Push is allowed for this lane only if needed to prove GitHub Actions behavior.
- GitHub CI result after the workflow change is recorded.
- Sprint board, messages, and `HANDOFF.md` are updated.
- Exactly one next Ready lane remains, or a named Jason decision blocker is
  recorded.

## Starting Evidence

M001-L17 CI run:

- `https://github.com/Brandcode-Studio/brandsystem-mcp/actions/runs/25641439073`
- Result: success
- Annotation: Node.js 20 actions deprecation for `actions/checkout@v4` and
  `actions/setup-node@v4`.

## Closeout - 2026-05-11

L18 updated workflow runtime posture and Jason authorized push.

GitHub CI proof:

- Commit: `60aa66f Add Node 24 GitHub Actions compatibility`
- Run: `25678340682`
- URL: `https://github.com/Brandcode-Studio/brandsystem-mcp/actions/runs/25678340682`
- Result: success
- Matrix jobs: Node 20, Node 22, and Node 24 all passed.
- Steps passed in all three jobs: `npm ci`, `npm run build`, `npm run lint`,
  `npm test`, and `npm audit --audit-level=high`.
- First-party actions used in CI: `actions/checkout@v6` and
  `actions/setup-node@v6`.
- The prior Node.js 20 Actions deprecation annotation did not recur in the
  watched run output or `gh run view` job summary.

No release, npm publish, public MCP directory submission, public listing
change, hosted tool addition, selected-kit default behavior, or custody
relaxation happened.

Next Ready lane: M001-L19 Hosted Rate Limit And Abuse Posture.
