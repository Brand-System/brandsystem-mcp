import { describe, expect, it } from "vitest";
import {
  BRANDCODE_MCP_SERVICE_TOKEN_ENV,
  readBrandcodeMcpServiceToken,
} from "../../src/hosted/env.js";

describe("hosted env", () => {
  it("reads the canonical Brandcode MCP service-token env var", () => {
    expect(
      readBrandcodeMcpServiceToken({
        [BRANDCODE_MCP_SERVICE_TOKEN_ENV]: " shared-secret ",
      }),
    ).toBe("shared-secret");
  });

  it("does not accept the legacy UCS_SERVICE_TOKEN name", () => {
    expect(
      readBrandcodeMcpServiceToken({
        UCS_SERVICE_TOKEN: "legacy-secret",
      }),
    ).toBeNull();
  });
});
