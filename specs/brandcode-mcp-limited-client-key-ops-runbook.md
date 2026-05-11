# Brandcode MCP Limited Client Key Ops Runbook

**Status:** Operator runbook for approved-client pre-release
**Date:** 2026-05-11
**Applies to:** hosted Brandcode MCP limited-client key operations
**Package/source posture:** Option 4 - no public `@brandcode/mcp`
package/source distribution for v0.1 limited-client work
**Release posture:** no public release, npm publish, package metadata,
directory submission, public listing copy, or production client key issuance
without explicit Jason approval.

## Operator Summary

Brandcode MCP limited-client access is hosted, brand-scoped, bearer-key gated,
and pre-release. This runbook covers how operators generate, install, prove,
handoff, rotate, revoke, and respond to suspected leaks for limited-client
keys without printing or committing secrets.

Use staging-only `bck_test_` keys for rehearsal, client setup proof, and
internal acceptance. Use production `bck_live_` keys only after Jason approves
the exact client, brand slug, endpoint posture, and production handoff.

This runbook does not authorize production access, public release, npm publish,
MCP directory submission, package/source posture changes, custody relaxation,
or new hosted tools.

## Key Owner And Authority

Pre-release abuse/key owner:

`Jason Lankow / Brandcode Studio Ops <jlankow@columnfive.com>`

The owner may revoke, rotate, suspend, or throttle hosted Brandcode MCP API
keys for abuse, leaked keys, excessive traffic, security risk, client offboard,
wrong-scope access, unknown ownership, or service-stability risk.

Every key record must include:

- environment: `staging` or `production`;
- brand slug binding;
- key label or non-secret key id;
- owner and support intake;
- scopes: `read`, `check`, and/or `feedback`;
- rotation/review date or offboard condition;
- last proof status and proof artifact link;
- revocation path.

Never store the raw bearer key in the key record.

## Scope Model

Grant the least privilege needed for the approved workflow.

| Scope | Tools enabled | Typical use |
| --- | --- | --- |
| `read` | `brand_runtime`, `brand_search`, `brand_status`, `list_brand_assets`, `get_brand_asset`, `brand_history` | Runtime reads, search, status, custody-safe asset access, redacted history |
| `check` | `brand_check` | Draft validation and compliance checks |
| `feedback` | `brand_feedback` | Append-only review input |

Recommended postures:

| Key posture | Scopes | Use |
| --- | --- | --- |
| Read-only | `read` | Default client setup and read-path proof |
| Check-enabled | `read,check` | Client drafts need `brand_check` |
| Feedback-enabled | `read,feedback` or `read,check,feedback` | Client is approved to leave append-only review feedback |
| Full proof | `read,check,feedback` | Operator smoke and controlled acceptance only |

Do not issue a broader key just to avoid a client setup question. Treat scope
friction as product evidence for a future connector/client artifact.

## Environment Gates

| Environment | Endpoint | Key prefix | Approval gate |
| --- | --- | --- | --- |
| Staging | `https://mcp.staging.brandcode.studio/{slug}` | `bck_test_` | Client/brand staging proof approval |
| Production | `https://mcp.brandcode.studio/{slug}` | `bck_live_` | Explicit Jason approval for that client, brand slug, and production handoff |

Staging proof does not authorize production access. Production key issuance
requires a fresh approval note and production smoke proof before handoff.

Wrong-environment prefixes are rejected by the hosted auth boundary. A staging
key must not be accepted on the production route, and a production key must not
be accepted on the staging route.

## Safe Shell Rules

Before handling keys:

```bash
set +x
umask 077
export KEY_DIR="$(mktemp -d)"
```

Rules:

- keep raw keys in `0600` temp files or a secret manager, not in docs;
- do not use `echo` for raw keys;
- do not paste keys into chat, issue trackers, screenshots, or runbooks;
- do not commit `.env`, temp config files, smoke output containing env, or MCP
  client configs with inline bearer values;
- do not rely on `vercel env pull` to recover sensitive Preview keys, because
  sensitive values are redacted locally;
- remove temporary files after proof and unset shell variables.

Cleanup shape:

```bash
unset BRANDCODE_MCP_SMOKE_FULL_KEY
unset BRANDCODE_MCP_SMOKE_READ_KEY
unset BRANDCODE_MCP_BEARER_KEY
rm -rf "$KEY_DIR"
```

## Staging Key Generation

Use staging-only keys for rehearsal and client setup proof. Generate separate
full/check/feedback and read-only keys unless the approved workflow only needs
one posture.

Safe local generation shape:

```bash
set +x
umask 077
export KEY_DIR="$(mktemp -d)"
node -e '
  const crypto = require("node:crypto");
  const fs = require("node:fs");
  const dir = process.env.KEY_DIR;
  for (const label of ["full", "read"]) {
    const key = "bck_test_" + crypto.randomBytes(24).toString("base64url");
    fs.writeFileSync(`${dir}/${label}.key`, `${key}\n`, { mode: 0o600 });
  }
'
```

Build the staging env bundle without printing it:

```bash
BRAND_SLUG="brandcode"
{
  printf '%s:%s:read,check,feedback|' "$(tr -d '\n' < "$KEY_DIR/full.key")" "$BRAND_SLUG"
  printf '%s:%s:read' "$(tr -d '\n' < "$KEY_DIR/read.key")" "$BRAND_SLUG"
} > "$KEY_DIR/BRANDCODE_MCP_TEST_KEYS.env"
chmod 600 "$KEY_DIR/BRANDCODE_MCP_TEST_KEYS.env"
```

Install the value as sensitive Vercel Preview env for
`BRANDCODE_MCP_TEST_KEYS` using the approved operator path. Prefer the Vercel
dashboard or a reviewed API helper that reads from the temp file and never logs
the body. Do not paste the value into a command that will be retained in shell
history.

Required staging env:

- `BRANDCODE_MCP_TEST_KEYS` with `token:slug:scopes` entries separated by `|`;
- `BRANDCODE_MCP_SERVICE_TOKEN` for hosted-to-UCS calls;
- durable shared rate-limit env:
  `BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_URL` /
  `BRANDCODE_MCP_RATE_LIMIT_REDIS_REST_TOKEN`, or accepted Vercel/Upstash
  aliases.

After env installation, deploy Preview and alias the staging domain only if the
change requires a fresh deployment:

```bash
vercel deploy --yes
vercel alias set "https://[fresh-preview-deployment].vercel.app" mcp.staging.brandcode.studio
```

Record the deployment id, alias target, and timestamp. Do not record bearer
values.

## Production Key Issuance

Production `bck_live_` keys are blocked until Jason explicitly approves:

- client or organization;
- brand slug;
- production endpoint;
- key scopes;
- key owner and support intake;
- deletion/export intake posture;
- per-client production smoke requirement;
- handoff date and offboard/review date.

Production approval must be recorded before key generation. The approval must
not be inferred from staging proof, internal Column Five proof, or public
interest.

Production key generation follows the same safe-shell rules as staging, but
with the `bck_live_` prefix and production env/key store path:

```bash
set +x
umask 077
export KEY_DIR="$(mktemp -d)"
node -e '
  const crypto = require("node:crypto");
  const fs = require("node:fs");
  const dir = process.env.KEY_DIR;
  for (const label of ["full", "read"]) {
    const key = "bck_live_" + crypto.randomBytes(24).toString("base64url");
    fs.writeFileSync(`${dir}/${label}.key`, `${key}\n`, { mode: 0o600 });
  }
'
```

Do not run production smoke or handoff until the production route has the
approved key store, service-token env, and durable shared rate-limit env.

## Smoke Proof

Run smoke before any handoff. Use shell variables loaded from temp files so the
command and docs contain no raw secrets.

```bash
set +x
export BRANDCODE_MCP_SMOKE_URL="https://mcp.staging.brandcode.studio/{slug}"
export BRANDCODE_MCP_SMOKE_FULL_KEY="$(tr -d '\n' < "$KEY_DIR/full.key")"
export BRANDCODE_MCP_SMOKE_READ_KEY="$(tr -d '\n' < "$KEY_DIR/read.key")"
export BRANDCODE_MCP_SMOKE_ASSET_ID="{package-safe asset id}"
npm run smoke:hosted-mcp -- --json > "$KEY_DIR/smoke-result.json"
```

For production, change the URL to `https://mcp.brandcode.studio/{slug}` and
use `bck_live_` keys only after Jason approval.

Minimum pass bar:

- `ok: true`;
- `status: "pass"`;
- `fail: 0`;
- locked 8-tool order passes;
- expected brand slug is reported;
- `brand_status.rate_limits.status` is `active_durable_shared` on hosted
  handoff routes;
- read-only key receives structured `insufficient_scope` for `brand_check` and
  `brand_feedback`;
- approved full/check key can call `brand_check`;
- feedback append is recorded or intentionally skipped with a named reason;
- package-safe asset proof passes, or a custody blocker is named before
  handoff;
- raw private/provider URL exposure is false.

Preserve the redacted summary. Do not preserve the raw key-bearing environment.

## Real Client Config Proof

At least one real MCP client path should be proven before a limited-client
handoff when possible. The M001-L25 internal proof used Claude Code with a
temporary HTTP MCP config, called `brand_status` and `get_brand_asset`, and
removed the temporary config afterward.

Generic client config shape:

```json
{
  "url": "https://mcp.staging.brandcode.studio/{slug}",
  "headers": {
    "Authorization": "Bearer ${BRANDCODE_MCP_BEARER_KEY}"
  }
}
```

Client proof rules:

- use the client secret mechanism or a local temp env var, not inline JSON
  with a raw key;
- keep temporary config files out of git;
- remove temporary config files after proof;
- prove `brand_status` and one custody-sensitive path such as
  `get_brand_asset`;
- record the client name, endpoint, non-secret key posture, result, and setup
  friction.

## Redacted Evidence Templates

### Key Record

| Field | Value |
| --- | --- |
| Client / brand | `[approved client and brand slug]` |
| Environment | `[staging / production]` |
| Endpoint | `[brand-scoped MCP URL]` |
| Key label / key id | `[non-secret label or prefix only]` |
| Raw key stored where | `[secret manager / operator temp only / not recorded]` |
| Scopes | `[read / check / feedback]` |
| Owner | `[operator / team]` |
| Abuse/key owner | `Jason Lankow / Brandcode Studio Ops <jlankow@columnfive.com>` |
| Rotation/review date | `[date / event]` |
| Revocation path | `[Vercel env rotation / key store delete / validator update]` |

### Smoke Proof Summary

```json
{
  "checked_at": "2026-05-11T00:00:00Z",
  "endpoint": "https://mcp.staging.brandcode.studio/{slug}",
  "environment": "staging",
  "key_postures": ["full", "read-only"],
  "result": "pass",
  "ok": true,
  "fail": 0,
  "blocked": 0,
  "skipped": 0,
  "tool_order": "pass",
  "rate_limit_status": "active_durable_shared",
  "asset_id": "{package-safe asset id}",
  "asset_delivery_posture": "package_safe",
  "safe_for_mcp": true,
  "raw_private_provider_url_exposed": false,
  "feedback_append": "recorded",
  "read_only_scope_checks": "pass"
}
```

### Real Client Proof Summary

```json
{
  "checked_at": "2026-05-11T00:00:00Z",
  "client": "Claude Code",
  "endpoint": "https://mcp.staging.brandcode.studio/{slug}",
  "brand_status_called": true,
  "get_brand_asset_called": true,
  "implemented_tool_count": 8,
  "rate_limit_status": "active_durable_shared",
  "asset_delivery_posture": "package_safe",
  "safe_for_mcp": true,
  "raw_private_provider_url_exposed": false,
  "setup_friction": "[low / medium / high plus note]"
}
```

## Rotation

Rotate keys when:

- a key reaches its review/offboard date;
- the client changes owner, agency, vendor, or MCP client;
- a broader scope than needed was granted;
- a key was used in staging proof but should not survive handoff;
- a support artifact might have exposed a key;
- suspicious traffic, rate-limit pressure, or abuse evidence appears.

Rotation steps:

1. Generate replacement key(s) using safe-shell rules.
2. Install the replacement value in the appropriate hosted key store/env.
3. Deploy/alias if the environment requires a fresh deployment.
4. Run smoke proof with replacement credentials.
5. Update the client config through the approved secret handoff path.
6. Revoke the old key after replacement proof unless a short overlap was
   explicitly approved.
7. Record only non-secret key id/label, proof summary, and old-key
   disposition.

## Revocation

Revoke immediately when:

- a key is leaked or suspected leaked;
- the client no longer has approval;
- the key owner is unknown;
- a client attempts an unauthorized brand slug;
- abuse/security/service-stability risk is present;
- Jason or Brandcode Studio Ops directs revocation.

Revocation steps:

1. Remove the key from the validator source or hosted key store.
2. Deploy/alias if required for the removal to take effect.
3. Confirm the revoked key receives `invalid_token` without printing the key.
4. Confirm unaffected approved keys still pass smoke.
5. Notify the client through support intake if access changed.
6. Record the reason, timestamp, endpoint, non-secret key id, and proof summary.

## Suspected Leak Response

If a key appears in chat, docs, logs, terminal output, screenshots, support
tickets, or an MCP client config:

1. Treat it as burned.
2. Revoke or rotate first; do not debate impact before containment.
3. Identify environment, slug, scope, and non-secret key id if possible.
4. Search the repo and coordination docs for accidental persistence.
5. Run smoke with replacement credentials.
6. Confirm the burned key fails with `invalid_token`.
7. Record a redacted incident note with owner, containment time, affected
   scope, client notification need, and follow-up.

Never store the raw leaked key in the incident note.

## Handoff Checklist

Before limited-client handoff:

- [ ] Jason approved the client and brand slug.
- [ ] Endpoint posture is staging-only or production-approved.
- [ ] Production access, if any, has explicit Jason approval.
- [ ] Key scopes are least-privilege.
- [ ] Key owner, support intake, rotation date, and revocation path are
      recorded.
- [ ] Hosted service-token env is configured.
- [ ] Hosted durable shared rate-limit env is configured for the handoff route.
- [ ] Smoke proof passes with `fail: 0`.
- [ ] Real client config proof passes or the precise blocker is recorded.
- [ ] Package-safe asset proof passes or the asset blocker is named.
- [ ] Redacted proof summary is attached to the onboarding record.
- [ ] Raw keys are removed from temp files and local env after proof.
- [ ] No package/source, npm, directory, listing, release, tool-surface, or
      custody posture changed.

## Option 4 Guardrails

Allowed:

- staging key generation and smoke proof;
- production key planning;
- production key generation only after explicit Jason approval;
- redacted proof capture;
- support/key-operation records;
- future Option 3 friction notes.

Not allowed from this runbook alone:

- npm publish;
- public release or release-candidate claim;
- MCP directory submission;
- package/listing metadata changes;
- public source/license posture change for `@brandcode/mcp`;
- hosted tool additions;
- selected Brand Kit or campaign kit default behavior;
- raw private/provider URL exposure;
- custody relaxation;
- production endpoint proof without explicit approval.
