# Prompt - M001-L30 Limited Client Staging Freshness Proof

You are in `/Users/jasonlankow/Desktop/brandsystem-mcp` as a Sprint PO/build
session for M001.

Read first:

- `AGENTS.md`
- `.claudex/packets/M001-L30-limited-client-staging-freshness-proof.md`
- `.claudex/sprints/current.md`
- `HANDOFF.md`
- `specs/brandcode-mcp-limited-client-go-no-go-checklist.md`
- `specs/brandcode-mcp-column-five-brandcode-staging-onboarding-proof.md`
- `specs/brandcode-mcp-column-five-client-config-dry-run.md`

Goal:

Apply the M001-L29 limited-client go/no-go checklist to the current Column Five
Brandcode staging instance and refresh proof for
`https://mcp.staging.brandcode.studio/brandcode`.

Keep this narrow and non-release:

- prove staging only unless Jason explicitly authorizes production proof;
- do not publish, release, submit to directories, change package metadata,
  issue production keys, add hosted tools, relax custody, or promise public
  deletion/export;
- do not print, commit, or document bearer keys, service tokens, private URLs,
  or sensitive env values.

Preferred proof:

- run `npm run smoke:hosted-mcp -- --json` with staging URL, full/read key
  postures, and `BRANDCODE_MCP_SMOKE_ASSET_ID=brandcode:logo:c5-logomark-red.svg`;
- confirm locked 8-tool order;
- confirm `brand_status.rate_limits.status: "active_durable_shared"`;
- confirm package-safe asset custody with no raw private/provider URL exposure;
- confirm read-only insufficient-scope behavior for `brand_check` and
  `brand_feedback`;
- optionally prove one real MCP client path only if credentials are available
  safely.

If credentials are unavailable, do not fake proof. Record the blocker and the
next safe key-handoff or generate-and-run step.

Closeout:

- update the proof doc, L30 packet, `.claudex/sprints/current.md`,
  `.claudex/messages/M001-messages.md`, and `HANDOFF.md`;
- run `git diff --check`;
- run additional tests only if code changed;
- commit directly to `main` with
  `Refresh Brandcode MCP limited client staging proof`;
- do not push unless Jason explicitly asks.
