import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join } from "node:path";
import { stringify, parse } from "yaml";
import { readdir, stat } from "node:fs/promises";
import type { BrandConfigData, CoreIdentityData, NeedsClarificationData, VisualIdentityData } from "../schemas/index.js";

export class BrandDir {
  readonly root: string;
  readonly brandPath: string;

  constructor(cwd: string) {
    this.root = cwd;
    this.brandPath = join(cwd, ".brand");
  }

  private path(...segments: string[]): string {
    return join(this.brandPath, ...segments);
  }

  async exists(): Promise<boolean> {
    try {
      await access(this.brandPath);
      return true;
    } catch {
      return false;
    }
  }

  async scaffold(): Promise<void> {
    await mkdir(this.brandPath, { recursive: true });
    await mkdir(this.path("assets", "logo"), { recursive: true });
  }

  // --- YAML helpers ---

  private async readYaml<T>(filename: string): Promise<T> {
    const content = await readFile(this.path(filename), "utf-8");
    return parse(content) as T;
  }

  private async writeYaml(filename: string, data: unknown): Promise<void> {
    const content = stringify(data, { lineWidth: 120 });
    await writeFile(this.path(filename), content, "utf-8");
  }

  // --- JSON helpers ---

  private async readJson<T>(filename: string): Promise<T> {
    const content = await readFile(this.path(filename), "utf-8");
    return JSON.parse(content) as T;
  }

  private async writeJson(filename: string, data: unknown): Promise<void> {
    const content = JSON.stringify(data, null, 2);
    await writeFile(this.path(filename), content, "utf-8");
  }

  // --- Config ---

  async readConfig(): Promise<BrandConfigData> {
    return this.readYaml<BrandConfigData>("brand.config.yaml");
  }

  async writeConfig(data: BrandConfigData): Promise<void> {
    await this.writeYaml("brand.config.yaml", data);
  }

  // --- Core Identity ---

  async readCoreIdentity(): Promise<CoreIdentityData> {
    return this.readYaml<CoreIdentityData>("core-identity.yaml");
  }

  async writeCoreIdentity(data: CoreIdentityData): Promise<void> {
    await this.writeYaml("core-identity.yaml", data);
  }

  // --- Tokens ---

  async readTokens(): Promise<Record<string, unknown>> {
    return this.readJson<Record<string, unknown>>("tokens.json");
  }

  async writeTokens(data: Record<string, unknown>): Promise<void> {
    await this.writeJson("tokens.json", data);
  }

  // --- Needs Clarification ---

  async readClarifications(): Promise<NeedsClarificationData> {
    return this.readYaml<NeedsClarificationData>("needs-clarification.yaml");
  }

  async writeClarifications(data: NeedsClarificationData): Promise<void> {
    await this.writeYaml("needs-clarification.yaml", data);
  }

  // --- Visual Identity (Session 2) ---

  async readVisualIdentity(): Promise<VisualIdentityData> {
    return this.readYaml<VisualIdentityData>("visual-identity.yaml");
  }

  async writeVisualIdentity(data: VisualIdentityData): Promise<void> {
    await this.writeYaml("visual-identity.yaml", data);
  }

  async hasVisualIdentity(): Promise<boolean> {
    try {
      await access(this.path("visual-identity.yaml"));
      return true;
    } catch {
      return false;
    }
  }

  async writeMarkdown(filename: string, content: string): Promise<void> {
    await writeFile(this.path(filename), content, "utf-8");
  }

  async readMarkdown(filename: string): Promise<string> {
    return readFile(this.path(filename), "utf-8");
  }

  // --- Asset scanning ---

  async listAssets(subdir: string): Promise<string[]> {
    const dir = this.path("assets", subdir);
    try {
      const entries = await readdir(dir);
      return entries.filter((e) => !e.startsWith(".") && !e.endsWith(".md"));
    } catch {
      return [];
    }
  }

  async listAssetDirs(): Promise<string[]> {
    const assetsDir = this.path("assets");
    try {
      const entries = await readdir(assetsDir);
      const dirs: string[] = [];
      for (const entry of entries) {
        const s = await stat(join(assetsDir, entry));
        if (s.isDirectory()) dirs.push(entry);
      }
      return dirs;
    } catch {
      return [];
    }
  }

  // --- Assets ---

  async writeAsset(relativePath: string, content: string | Buffer): Promise<void> {
    const fullPath = this.path("assets", relativePath);
    const dir = fullPath.substring(0, fullPath.lastIndexOf("/"));
    await mkdir(dir, { recursive: true });
    await writeFile(fullPath, content, typeof content === "string" ? "utf-8" : undefined);
  }

  async readAsset(relativePath: string): Promise<string> {
    return readFile(this.path("assets", relativePath), "utf-8");
  }
}
