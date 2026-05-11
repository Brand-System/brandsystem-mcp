# M001-L22 - Package Source Posture Decision Brief

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Hosted trust / package posture decision
**Recommended commit:** `Prepare Brandcode MCP package source posture brief`

## Why

M001-L21 clarified hosted data-policy truth without approving public release.
The next release blocker is the unresolved source/package posture for
`@brandcode/mcp`: whether it inherits MIT, stays proprietary/service-only, uses
a dual posture, or follows another Jason-approved path.

The repo must keep hosted service access separate from source/package license
and must not let package metadata imply public entitlement to
`mcp.brandcode.studio`.

## Scope

Inspect first:

- `specs/brandcode-mcp-license-directory-trust-audit.md`
- `specs/brandcode-mcp-hosted-service-terms-decision-brief.md`
- `specs/brandcode-mcp-hosted-data-policy.md`
- `README.md`
- `llms.txt`
- `package.json`, `server.json`, `smithery.yaml`, `glama.json`

Implement narrowly:

- Add or update a durable decision brief that frames the package/source posture
  options for Jason.
- Clearly separate:
  - `@brandsystem/mcp` Build package and its current MIT/public posture;
  - hosted `@brandcode/mcp` Use service access;
  - any future `@brandcode/mcp` package/source distribution;
  - public listing/directory metadata.
- Name the Jason decision required before npm, package metadata, directory
  submission, or public listing work.
- Update sprint/HANDOFF/messages so exactly one next Ready lane or named
  Jason decision blocker remains.

## Out Of Scope

- No npm publish.
- No public release.
- No public MCP directory submission.
- No public listing metadata changes.
- No package rename or package metadata changes unless Jason supplies the final
  package/source decision in-thread.
- No hosted tool additions.
- No custody relaxation.

## Acceptance

- Done: the package/source options and tradeoffs are documented without picking a
  posture Jason has not approved.
- Done: hosted service access remains separate from source/package license.
- Done: any downstream package/listing/directory work is blocked or deferred until
  Jason decides the posture.
- Done: `git diff --check` passes.
- Done: no code or package metadata changed, so focused checks, lint, and build
  were not required for this docs-only lane.
- Done: no next Ready lane remains because the exact Jason decision blocker is
  now named.

## Starting Evidence

- M001-L21 drafted hosted data-policy truth and left package/source posture as
  the next release blocker.
- `@brandsystem/mcp` remains the existing public MIT Build package.
- Hosted `@brandcode/mcp` remains authorized pre-release bearer-key service
  access only.

## Closeout

- Added
  `specs/brandcode-mcp-package-source-posture-decision-brief.md`.
- Framed four Jason decision options: open MIT package/source with separate
  hosted service terms, proprietary/service-only, dual posture, or deferral.
- Preserved the boundary that package/source license does not grant hosted
  service access.
- Blocked npm, package metadata, directory submission, public listing, source
  posture changes, and release-candidate claims until Jason chooses the
  posture.
