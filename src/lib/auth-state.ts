/**
 * Read/write local auth credentials inside .brand/.
 *
 * File managed:
 *   .brand/brandcode-auth.json — session token + email (gitignored)
 *
 * This file contains secrets and MUST be gitignored.
 * brand_init auto-adds it to .gitignore.
 */

import { readFile, writeFile, unlink, mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { AuthCredentials } from "../connectors/brandcode/types.js";

const AUTH_FILE = "brandcode-auth.json";

function authPath(cwd: string): string {
  return join(cwd, ".brand", AUTH_FILE);
}

/**
 * Read stored auth credentials. Returns null if not authenticated.
 */
export async function readAuthCredentials(
  cwd: string,
): Promise<AuthCredentials | null> {
  try {
    const raw = await readFile(authPath(cwd), "utf-8");
    const creds = JSON.parse(raw) as AuthCredentials;

    // Check expiry
    if (new Date(creds.expiresAt) < new Date()) {
      // Token expired — clean up silently
      await clearAuthCredentials(cwd);
      return null;
    }

    return creds;
  } catch {
    return null;
  }
}

/**
 * Store auth credentials after successful magic link verification.
 */
export async function writeAuthCredentials(
  cwd: string,
  creds: AuthCredentials,
): Promise<void> {
  const dir = join(cwd, ".brand");
  await mkdir(dir, { recursive: true });
  await writeFile(authPath(cwd), JSON.stringify(creds, null, 2) + "\n", "utf-8");
}

/**
 * Remove stored auth credentials (logout).
 */
export async function clearAuthCredentials(cwd: string): Promise<void> {
  try {
    await unlink(authPath(cwd));
  } catch {
    // File doesn't exist — that's fine
  }
}
