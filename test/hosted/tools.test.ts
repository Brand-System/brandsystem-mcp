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
    ["brand_search", { query: "logo" }],
    ["list_brand_assets", {}],
    ["get_brand_asset", { asset_id: "x" }],
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
