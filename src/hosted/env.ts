export const BRANDCODE_MCP_SERVICE_TOKEN_ENV = "BRANDCODE_MCP_SERVICE_TOKEN";

export function readBrandcodeMcpServiceToken(
  env: Record<string, string | undefined> = process.env,
): string | null {
  const token = env[BRANDCODE_MCP_SERVICE_TOKEN_ENV]?.trim();
  return token ? token : null;
}
