# M001-L07 - Security Matrix And Rate-Limit Posture

**Status:** Done
**Sprint:** M001 - Brandcode MCP Stabilization And Pre-Release Hardening
**Repo:** `/Users/jasonlankow/Desktop/brandsystem-mcp`
**Lane type:** Security / hosted verification
**Recommended commit:** `Harden Brandcode MCP security posture`

## Why

M001-L06 found that Brandcode MCP's biggest release blocker is not the MIT package license; it is the hosted-service trust posture. Directory reviewers and security-conscious teams need explicit proof for bearer auth, scopes, slug authorization, service-token boundaries, private custody, feedback/history privacy, and rate-limit or abuse posture before public release.

This lane should turn that audit finding into executable evidence and docs. It should not publish, release, submit to directories, add tools, or expand the locked hosted surface.

## Scope

Use the audit as the starting point:

- `specs/brandcode-mcp-license-directory-trust-audit.md`
- `specs/brandcode-mcp-pre-release-hardening.md`
- `specs/brandcode-mcp-phase-0-lock.md`
- `specs/brandcode-mcp-use-roadmap-alignment.md`

Inspect and, if needed, update narrowly:

- hosted auth/scope tests;
- hosted smoke harness strictness only where it directly proves security posture;
- `SECURITY.md` hosted MCP security/trust language;
- any existing docs that make a security claim invalidated by the implementation.

Security matrix to cover or explicitly defer:

- missing bearer;
- malformed bearer;
- invalid token;
- staging key on production / production key on staging, where locally testable;
- wrong slug for key;
- read-only key;
- check-only key;
- feedback-only key;
- full key;
- per-tool scope behavior across all 8 locked tools;
- `BRANDCODE_MCP_SERVICE_TOKEN` as the only hosted service-token env name;
- private provider URL redaction in asset, feedback, and history surfaces;
- rate-limit and abuse posture.

## Out Of Scope

- No release, publish, or directory submission.
- No new hosted tools.
- No package rename.
- No canonical governance mutation.
- No selected Brand Kit hosted publish/share work.
- No broad listing metadata rewrite unless required to correct a security false claim.

## Acceptance

- Hosted auth/scope/security posture is covered by tests, command-backed smoke proof, or explicit deferrals with owner/next lane.
- `SECURITY.md` explains hosted bearer auth, scopes, service-token posture, private custody, feedback/history privacy, rate-limit posture, and vulnerability reporting well enough for pre-release directory review.
- Locked 8-tool surface remains unchanged.
- `git diff --check` passes.
- Sprint board, messages, and `HANDOFF.md` are updated at closeout.
- Exactly one next Ready lane remains after closeout.
