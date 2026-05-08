import { describe, expect, it } from "vitest";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const scriptPath = join(repoRoot, "scripts", "hosted-mcp-smoke.mjs");

function smokeEnv() {
  const env = { ...process.env };
  for (const key of [
    "BRANDCODE_MCP_SMOKE_URL",
    "BRANDCODE_MCP_SMOKE_FULL_KEY",
    "BRANDCODE_MCP_SMOKE_READ_KEY",
    "BRANDCODE_MCP_SMOKE_ASSET_ID",
    "BRANDCODE_MCP_SMOKE_SKIP_FEEDBACK",
    "BRANDCODE_MCP_SMOKE_TIMEOUT_MS",
  ]) {
    delete env[key];
  }
  return env;
}

describe("hosted MCP smoke harness", () => {
  it("prints help without hosted secrets", async () => {
    const { stdout } = await execFileAsync(
      process.execPath,
      [scriptPath, "--help"],
      { cwd: repoRoot, env: smokeEnv() },
    );

    expect(stdout).toContain("BRANDCODE_MCP_SMOKE_URL");
    expect(stdout).toContain("BRANDCODE_MCP_SMOKE_FULL_KEY");
    expect(stdout).toContain("BRANDCODE_MCP_SMOKE_READ_KEY");
  });

  it("reports a blocked env-missing path without failing", async () => {
    const { stdout } = await execFileAsync(
      process.execPath,
      [scriptPath, "--json"],
      { cwd: repoRoot, env: smokeEnv() },
    );
    const result = JSON.parse(stdout) as {
      status: string;
      checks: Array<{ name: string; status: string; missing_env?: string[] }>;
    };

    expect(result.status).toBe("blocked");
    expect(result.checks).toHaveLength(1);
    expect(result.checks[0]).toMatchObject({
      name: "environment",
      status: "blocked",
      missing_env: [
        "BRANDCODE_MCP_SMOKE_URL",
        "BRANDCODE_MCP_SMOKE_FULL_KEY",
      ],
    });
  });
});
