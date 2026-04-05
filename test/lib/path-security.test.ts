import { describe, expect, it } from "vitest";
import { assertPathWithinBase, isPathWithinBase } from "../../src/lib/path-security.js";

describe("path-security", () => {
  it("allows paths within the base directory", () => {
    expect(isPathWithinBase("/workspace/project/file.html", "/workspace/project")).toBe(true);
    expect(isPathWithinBase("/workspace/project/nested/file.html", "/workspace/project")).toBe(true);
  });

  it("rejects sibling paths that only share a prefix", () => {
    expect(isPathWithinBase("/workspace/project-evil/file.html", "/workspace/project")).toBe(false);
  });

  it("rejects parent-directory traversal escapes", () => {
    expect(isPathWithinBase("/workspace/secret.txt", "/workspace/project")).toBe(false);
  });

  it("throws on paths outside the base directory", () => {
    expect(() =>
      assertPathWithinBase("/workspace/project-evil/file.html", "/workspace/project", "../project-evil/file.html")
    ).toThrow(/Path traversal blocked/);
  });
});
