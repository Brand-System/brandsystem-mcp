import { describe, it, expect, beforeEach } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createHostedServer } from "../../src/hosted/server.js";
import { HOSTED_TOOL_ORDER } from "../../src/hosted/registrations.js";
import type {
  HostedBrandContext,
  BrandcodeMcpAuthInfo,
} from "../../src/hosted/types.js";
import type { BrandPackagePayload } from "../../src/connectors/brandcode/types.js";

function buildAuth(
  overrides: Partial<BrandcodeMcpAuthInfo> = {},
): BrandcodeMcpAuthInfo {
  return {
    token: "bck_test_acme",
    keyId: "bck_test_acme",
    scopes: ["read"],
    allowedSlugs: ["acme"],
    environment: "staging",
    ...overrides,
  };
}

function buildContext(
  pkg: BrandPackagePayload | null,
  overrides: Partial<HostedBrandContext> = {},
): HostedBrandContext {
  const auth = overrides.auth ?? buildAuth();
  return {
    slug: "acme",
    auth,
    loadBrandPackage: async () => pkg,
    ucsBaseUrl: "https://www.brandcode.studio",
    ucsServiceToken: "test-token",
    ...overrides,
  };
}

async function connectClient(context: HostedBrandContext) {
  const server = createHostedServer(context);
  const [clientT, serverT] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "hosted-tool-test", version: "1.0.0" });
  await server.connect(serverT);
  await client.connect(clientT);
  return { server, client };
}

async function call(
  client: Client,
  name: string,
  args: Record<string, unknown> = {},
) {
  const result = await client.callTool({ name, arguments: args });
  const content = result.content as Array<{ type: string; text: string }>;
  return JSON.parse(content[0].text) as Record<string, unknown>;
}

describe("hosted server registers all 8 tools in locked order", () => {
  it("listTools returns the Phase 0 locked surface", async () => {
    const { client } = await connectClient(buildContext(null));
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name);
    expect(names).toEqual([...HOSTED_TOOL_ORDER]);
  });
});

describe("hosted tool scope enforcement", () => {
  const PACKAGE: BrandPackagePayload = {
    runtime: {
      version: "1.0.0",
      client_name: "Acme Hosted",
      identity: { colors: { primary: "#000000" } },
    },
  };

  it("brand_runtime passes with read scope", async () => {
    const { client } = await connectClient(buildContext(PACKAGE));
    const json = await call(client, "brand_runtime", { slice: "minimal" });
    expect(json.runtime_origin).toBe("hosted");
  });

  it("brand_runtime returns a structured 403-equivalent without read scope", async () => {
    const auth = buildAuth({ scopes: ["check"] });
    const { client } = await connectClient(buildContext(PACKAGE, { auth }));
    const json = await call(client, "brand_runtime", { slice: "minimal" });
    expect(json.error).toBe("insufficient_scope");
    expect(json.status).toBe(403);
    expect(json.required_scope).toBe("read");
    expect(json.granted_scopes).toEqual(["check"]);
  });

  it("brand_search returns a structured 403-equivalent without read scope", async () => {
    const auth = buildAuth({ scopes: ["check"] });
    const { client } = await connectClient(buildContext(null, { auth }));
    const json = await call(client, "brand_search", { query: "proof" });
    expect(json.error).toBe("insufficient_scope");
    expect(json.status).toBe(403);
    expect(json.required_scope).toBe("read");
  });

  it("asset tools return structured 403-equivalent responses without read scope", async () => {
    const auth = buildAuth({ scopes: ["check"] });
    const { client } = await connectClient(buildContext(null, { auth }));
    const list = await call(client, "list_brand_assets", {});
    expect(list.error).toBe("insufficient_scope");
    expect(list.status).toBe(403);
    expect(list.required_scope).toBe("read");

    const get = await call(client, "get_brand_asset", { asset_id: "logo" });
    expect(get.error).toBe("insufficient_scope");
    expect(get.status).toBe(403);
    expect(get.required_scope).toBe("read");
  });

  it("brand_check requires explicit check scope; read alone 403s", async () => {
    const readOnly = await connectClient(buildContext(null));
    const denied = await call(readOnly.client, "brand_check", { text: "hi" });
    expect(denied.error).toBe("insufficient_scope");
    expect(denied.status).toBe(403);
    expect(denied.required_scope).toBe("check");

    const auth = buildAuth({ scopes: ["check"] });
    const allowed = await connectClient(buildContext(null, { auth }));
    const json = await call(allowed.client, "brand_check", { text: "hi" });
    expect(json.error).toBe("not_implemented_in_staging");
  });

  it("brand_feedback requires explicit feedback scope", async () => {
    const readOnly = await connectClient(buildContext(null));
    const denied = await call(readOnly.client, "brand_feedback", {
      summary: "test",
    });
    expect(denied.error).toBe("insufficient_scope");
    expect(denied.status).toBe(403);
    expect(denied.required_scope).toBe("feedback");

    const auth = buildAuth({ scopes: ["feedback"] });
    const allowed = await connectClient(buildContext(null, { auth }));
    const json = await call(allowed.client, "brand_feedback", {
      summary: "test",
    });
    expect(json.error).toBe("not_implemented_in_staging");
  });
});

describe("brand_search (hosted)", () => {
  const SEARCH_PACKAGE: BrandPackagePayload = {
    slug: "acme",
    brandInstance: {
      narratives: [
        {
          id: "nl-001",
          name: "Flagship narrative",
          type: "Key Message",
          status: "Active",
          canonical_text: "Acme helps teams ship governed AI work.",
          usage_notes: "Lead with governed AI when trust is the topic.",
          source_label: "Narrative Library",
        },
      ],
      proofPoints: [
        {
          id: "claim-001",
          title: "91% of teams need governed AI proof",
          status: "Active",
          confidence: 0.95,
          salience: "Lead With",
          source: "Proof register",
        },
        {
          id: "claim-002",
          title: "Experimental signal",
          status: "Watch",
          confidence: 0.68,
          evidence: "Watch before using as a headline.",
          source: "https://private-provider.example/raw",
        },
      ],
      applicationRules: {
        rules: [
          {
            id: "ar-001",
            name: "Launch page",
            framework: "Problem Guide Proof",
            required_elements: ["governed AI proof", "clear next step"],
            status: "Active",
          },
        ],
      },
      brandPhrases: [
        {
          id: "bp-001",
          phrase: "Governed AI, ready to ship",
          status: "Active",
          usage_notes: "Use for product-led CTAs.",
        },
      ],
      readiness: {
        stage: "usable",
        primaryConcern: "Needs more governed proof",
      },
      capabilities: {
        enabled: ["runtime", "content"],
      },
    },
  };

  it("returns ranked hits from narratives, proof points, application rules, and brand phrases", async () => {
    const { client } = await connectClient(buildContext(SEARCH_PACKAGE));
    const json = await call(client, "brand_search", {
      query: "governed AI proof",
      limit: 10,
    });

    expect(json.total_hits).toBeGreaterThanOrEqual(4);
    const hits = json.hits as Array<Record<string, unknown>>;
    expect(hits.map((hit) => hit.source_type)).toEqual(
      expect.arrayContaining([
        "proof_point",
        "application_rule",
        "narrative",
        "brand_phrase",
      ]),
    );
    expect(hits[0]).toMatchObject({
      id: "claim-001",
      title: "91% of teams need governed AI proof",
      source_type: "proof_point",
      status: "Active",
      confidence: 0.95,
    });
    expect(hits[0].provenance).toEqual({
      source: "Proof register",
    });
  });

  it("keeps ranking deterministic for repeated queries", async () => {
    const { client } = await connectClient(buildContext(SEARCH_PACKAGE));
    const first = await call(client, "brand_search", {
      query: "governed AI proof",
      limit: 10,
    });
    const second = await call(client, "brand_search", {
      query: "governed AI proof",
      limit: 10,
    });
    expect(first.hits).toEqual(second.hits);
  });

  it("redacts URL-like provenance and stays custody-safe", async () => {
    const { client } = await connectClient(buildContext(SEARCH_PACKAGE));
    const json = await call(client, "brand_search", {
      query: "experimental signal",
    });
    const hits = json.hits as Array<Record<string, unknown>>;
    expect(hits[0].id).toBe("claim-002");
    expect(JSON.stringify(hits[0])).not.toContain("private-provider.example");
    expect(json.custody_safe).toBe(true);
    expect(json.selected_kit_artifact_support).toBe("not_implemented_in_v1");
  });

  it("returns a truthful empty result for empty or no-match queries", async () => {
    const { client } = await connectClient(buildContext(SEARCH_PACKAGE));
    const empty = await call(client, "brand_search", { query: "   " });
    expect(empty.hits).toEqual([]);
    expect(empty.total_hits).toBe(0);
    const emptyMetadata = empty._metadata as Record<string, unknown>;
    expect(emptyMetadata.what_happened).toContain(
      "No hosted brand search query",
    );
    expect(emptyMetadata.next_steps).toContain(
      "Try a more specific query about narratives, proof points, application rules, or brand phrases",
    );

    const noMatch = await call(client, "brand_search", {
      query: "nonexistent zebra",
    });
    expect(noMatch.hits).toEqual([]);
    expect(noMatch.total_hits).toBe(0);
    const noMatchMetadata = noMatch._metadata as Record<string, unknown>;
    expect(noMatchMetadata.what_happened).toContain(
      "No hosted brand knowledge matched",
    );
  });

  it("tolerates missing hosted knowledge arrays gracefully", async () => {
    const { client } = await connectClient(buildContext({ brandInstance: {} }));
    const json = await call(client, "brand_search", { query: "anything" });
    expect(json.hits).toEqual([]);
    expect(json.searched_documents).toBe(0);
  });
});

describe("hosted asset tools", () => {
  const ASSET_PACKAGE: BrandPackagePayload = {
    slug: "acme",
    brandInstance: {
      assets: [
        {
          id: "logo-primary",
          title: "Primary logo",
          category: "logo",
          lifecycle: "official",
          format: "svg",
          width: 512,
          height: 128,
          packagePath: "acme/runtime/assets/logo-primary.svg",
          url: "https://private-provider.example/raw-logo.svg",
          tags: ["identity", "runtime"],
          official: true,
        },
        {
          id: "hero-runtime",
          title: "Runtime hero",
          category: "illustration",
          lifecycle: "runtime",
          format: "png",
          deliveryRef: {
            packagePath: "acme/runtime/assets/hero-runtime.png",
            posture: "package_safe",
          },
          inRuntimePackage: true,
        },
        {
          id: "campaign-private",
          title: "Campaign concept",
          category: "campaign",
          lifecycle: "exploratory",
          providerUrl: "https://private-provider.example/campaign.png",
          custody: "private_provider",
        },
      ],
    },
    brandData: {
      assets: [
        {
          id: "approved-badge",
          name: "Approved badge",
          kind: "badge",
          lifecycle: "production-approved",
          productionApproved: true,
          package_path: "acme/runtime/assets/approved-badge.svg",
        },
      ],
    },
  };

  it("list_brand_assets returns package-safe asset summaries with posture", async () => {
    const { client } = await connectClient(buildContext(ASSET_PACKAGE));
    const json = await call(client, "list_brand_assets", { limit: 10 });
    expect(json.total_assets).toBe(4);
    expect(json.next_cursor).toBeNull();
    expect(json.custody_safe).toBe(true);
    expect(json.selected_kit_artifact_support).toBe("not_implemented_in_v1");

    const assets = json.assets as Array<Record<string, unknown>>;
    expect(assets.map((asset) => asset.id)).toEqual([
      "logo-primary",
      "hero-runtime",
      "campaign-private",
      "approved-badge",
    ]);
    expect(assets[0]).toMatchObject({
      id: "logo-primary",
      category: "logo",
      lifecycle: "official",
      governance_posture: "official",
      delivery_ref: {
        posture: "package_safe",
        package_path: "acme/runtime/assets/logo-primary.svg",
      },
    });
    expect(JSON.stringify(json)).not.toContain("private-provider.example");
  });

  it("list_brand_assets filters and paginates deterministically", async () => {
    const { client } = await connectClient(buildContext(ASSET_PACKAGE));
    const first = await call(client, "list_brand_assets", { limit: 2 });
    expect((first.assets as unknown[])).toHaveLength(2);
    expect(first.next_cursor).toBe("2");

    const second = await call(client, "list_brand_assets", {
      limit: 2,
      cursor: String(first.next_cursor),
    });
    expect(
      (second.assets as Array<Record<string, unknown>>).map((asset) => asset.id),
    ).toEqual(["campaign-private", "approved-badge"]);

    const filtered = await call(client, "list_brand_assets", {
      lifecycle: "production",
    });
    expect(
      (filtered.assets as Array<Record<string, unknown>>).map((asset) => asset.id),
    ).toEqual(["approved-badge"]);
  });

  it("get_brand_asset returns full safe metadata for a package asset", async () => {
    const { client } = await connectClient(buildContext(ASSET_PACKAGE));
    const json = await call(client, "get_brand_asset", {
      asset_id: "hero-runtime",
    });
    const asset = json.asset as Record<string, unknown>;
    expect(asset).toMatchObject({
      id: "hero-runtime",
      governance_posture: "runtime",
      delivery_ref: {
        posture: "package_safe",
        package_path: "acme/runtime/assets/hero-runtime.png",
      },
      package_posture: {
        in_runtime_package: true,
        selected_kit_artifact_support: "not_implemented_in_v1",
      },
    });
    expect(JSON.stringify(json)).not.toContain("private-provider.example");
  });

  it("get_brand_asset blocks private provider URLs instead of returning them", async () => {
    const { client } = await connectClient(buildContext(ASSET_PACKAGE));
    const json = await call(client, "get_brand_asset", {
      asset_id: "campaign-private",
    });
    const asset = json.asset as Record<string, unknown>;
    expect(asset.delivery_ref).toEqual({
      posture: "blocked_private_provider_url",
      reason: "No package-safe delivery reference is available for this asset",
    });
    expect(asset.custody).toMatchObject({
      safe_for_mcp: false,
      blocked_private_provider_url: true,
    });
    expect(JSON.stringify(json)).not.toContain("private-provider.example");
  });

  it("get_brand_asset returns asset_not_found for unknown ids", async () => {
    const { client } = await connectClient(buildContext(ASSET_PACKAGE));
    const json = await call(client, "get_brand_asset", { asset_id: "missing" });
    expect(json.error).toBe("asset_not_found");
    expect(json.asset_id).toBe("missing");
  });

  it("asset tools tolerate missing arrays", async () => {
    const { client } = await connectClient(buildContext({ brandInstance: {} }));
    const json = await call(client, "list_brand_assets", {});
    expect(json.assets).toEqual([]);
    expect(json.total_assets).toBe(0);
  });
});

describe("brand_runtime (hosted)", () => {
  const PACKAGE: BrandPackagePayload = {
    runtime: {
      version: "1.0.0",
      client_name: "Acme Hosted",
      compiled_at: "2026-04-19T00:00:00.000Z",
      sessions_completed: 1,
      identity: {
        colors: { primary: "#ff3b30" },
        typography: { heading: "Inter" },
        logo: null,
      },
      visual: null,
      voice: null,
      strategy: null,
    },
  };

  it("returns the hosted runtime tagged runtime_origin=hosted", async () => {
    const { client } = await connectClient(buildContext(PACKAGE));
    const json = await call(client, "brand_runtime", { slice: "full" });
    expect(json.runtime_origin).toBe("hosted");
    const runtime = json.runtime as Record<string, unknown>;
    expect(runtime.client_name).toBe("Acme Hosted");
  });

  it("supports minimal slice", async () => {
    const { client } = await connectClient(buildContext(PACKAGE));
    const json = await call(client, "brand_runtime", { slice: "minimal" });
    const runtime = json.runtime as Record<string, unknown>;
    expect((runtime.identity as Record<string, unknown>).colors).toEqual({
      primary: "#ff3b30",
    });
  });

  it("returns NOT_COMPILED when hosted package has no runtime shape", async () => {
    const { client } = await connectClient(buildContext({ unexpected: true }));
    const json = await call(client, "brand_runtime", { slice: "full" });
    expect(json.error).toBe("not_compiled");
  });

  it("returns FETCH_FAILED when upstream throws", async () => {
    const ctx = buildContext(null, {
      loadBrandPackage: async () => {
        throw new Error("upstream down");
      },
    });
    const { client } = await connectClient(ctx);
    const json = await call(client, "brand_runtime", { slice: "full" });
    expect(json.error).toBe("fetch_failed");
  });

  describe("brandInstance flat-shape normalization (G-5h)", () => {
    const FLAT_PACKAGE: BrandPackagePayload = {
      slug: "brandcode",
      runtimeVersion: "2026-04-16",
      brandInstance: {
        manifest: { name: "Brandcode", slug: "brandcode", version: "0.0" },
        tokens: {
          brandName: "Brandcode",
          colors: {
            primary: "#2563eb",
            dark: "#18181b",
            white: "#ffffff",
            lightGrey: "#f4f4f5",
          },
          typography: {
            fontFamily: "Inter, system-ui, sans-serif",
            displayWeight: 600,
            bodyWeight: 400,
          },
          action: { primary: "#2563eb" },
        },
        fonts: {
          strategy: "system_only",
          fontFamily: "Inter, system-ui, sans-serif",
          roles: {
            body: {
              fontFamily: "Inter, system-ui, sans-serif",
              fallbackStack: ["system-ui", "sans-serif"],
            },
            display: {
              fontFamily: "Merriweather, Georgia, serif",
              fallbackStack: ["Georgia", "serif"],
            },
          },
        },
        assets: [],
        verbalIdentity: "Direct, clear, generous.",
        perspective: "Tool-as-partner.",
        narratives: [],
      },
    };

    it("normalizes colors from tokens.colors into identity.colors", async () => {
      const { client } = await connectClient(buildContext(FLAT_PACKAGE));
      const json = await call(client, "brand_runtime", { slice: "full" });
      const runtime = json.runtime as Record<string, unknown>;
      const identity = runtime.identity as Record<string, unknown>;
      expect(identity.colors).toEqual({
        primary: "#2563eb",
        dark: "#18181b",
        white: "#ffffff",
        lightGrey: "#f4f4f5",
      });
    });

    it("normalizes fonts.roles with display first (minimal slice picks heading)", async () => {
      const { client } = await connectClient(buildContext(FLAT_PACKAGE));
      const full = await call(client, "brand_runtime", { slice: "full" });
      const runtime = full.runtime as Record<string, unknown>;
      const identity = runtime.identity as Record<string, unknown>;
      const typography = identity.typography as Record<string, string>;
      // display must be the first entry so minimal slice grabs it
      expect(Object.keys(typography)[0]).toBe("display");
      expect(typography.display).toContain("Merriweather");
      expect(typography.body).toContain("Inter");
    });

    it("minimal slice returns primary color + display font (not null)", async () => {
      const { client } = await connectClient(buildContext(FLAT_PACKAGE));
      const json = await call(client, "brand_runtime", { slice: "minimal" });
      const runtime = json.runtime as Record<string, unknown>;
      const identity = runtime.identity as Record<string, unknown>;
      expect((identity.colors as Record<string, string>).primary).toBe(
        "#2563eb",
      );
      const typo = identity.typography as Record<string, string>;
      expect(Object.keys(typo)).toHaveLength(1);
      expect(typo.display).toContain("Merriweather");
      expect(identity.logo).toBeNull();
    });

    it("client_name prefers manifest.name, falls back to slug", async () => {
      const { client } = await connectClient(buildContext(FLAT_PACKAGE));
      const json = await call(client, "brand_runtime", { slice: "full" });
      const runtime = json.runtime as Record<string, unknown>;
      expect(runtime.client_name).toBe("Brandcode");
    });

    it("version picks runtimeVersion from package top level", async () => {
      const { client } = await connectClient(buildContext(FLAT_PACKAGE));
      const json = await call(client, "brand_runtime", { slice: "full" });
      const runtime = json.runtime as Record<string, unknown>;
      expect(runtime.version).toBe("2026-04-16");
    });

    it("logo is detected from assets with kind=logo and svg format", async () => {
      const pkgWithLogo = {
        ...FLAT_PACKAGE,
        brandInstance: {
          ...(FLAT_PACKAGE.brandInstance as Record<string, unknown>),
          assets: [
            { kind: "logo", format: "svg", url: "https://cdn/logo.svg" },
            { kind: "headshot", format: "png" },
          ],
        },
      };
      const { client } = await connectClient(buildContext(pkgWithLogo));
      const json = await call(client, "brand_runtime", { slice: "full" });
      const runtime = json.runtime as Record<string, unknown>;
      const identity = runtime.identity as Record<string, unknown>;
      expect(identity.logo).toEqual({ type: "logo", has_svg: true });
    });

    it("falls back to tokens.typography when fonts.roles is absent", async () => {
      const pkgNoRoles = {
        ...FLAT_PACKAGE,
        brandInstance: {
          ...(FLAT_PACKAGE.brandInstance as Record<string, unknown>),
          fonts: { strategy: "system_only" },
        },
      };
      const { client } = await connectClient(buildContext(pkgNoRoles));
      const json = await call(client, "brand_runtime", { slice: "full" });
      const runtime = json.runtime as Record<string, unknown>;
      const identity = runtime.identity as Record<string, unknown>;
      const typo = identity.typography as Record<string, string>;
      expect(typo.default).toContain("Inter");
    });
  });
});

describe("brand_status (hosted)", () => {
  it("reports slug, environment, scopes, and runtime availability", async () => {
    const pkg: BrandPackagePayload = {
      runtime: { version: "1.0.0", client_name: "Acme" },
      brandData: { narratives: [{}, {}], assets: [{}] },
    };
    const { client } = await connectClient(buildContext(pkg));
    const json = await call(client, "brand_status", {});
    expect(json.slug).toBe("acme");
    expect(json.environment).toBe("staging");
    expect(json.scopes).toEqual(["read"]);
    expect(json.runtime_available).toBe(true);
    const summary = json.brand_summary as Record<string, unknown>;
    expect(summary.narrative_count).toBe(2);
    expect(summary.asset_count).toBe(1);
  });
});

describe("stubs return structured not_implemented_in_staging errors", () => {
  const STUB_TOOLS = [
    ["brand_history", {}],
  ] as const;

  for (const [tool, args] of STUB_TOOLS) {
    it(`${tool} returns not_implemented_in_staging`, async () => {
      const { client } = await connectClient(buildContext(null));
      const json = await call(client, tool, args as Record<string, unknown>);
      expect(json.error).toBe("not_implemented_in_staging");
      expect(json.tool).toBe(tool);
      expect(json.phase).toBe("phase_1_staging_prototype");
    });
  }
});
