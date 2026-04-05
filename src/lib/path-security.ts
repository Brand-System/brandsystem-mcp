import { isAbsolute, relative, resolve } from "node:path";

export function isPathWithinBase(targetPath: string, basePath: string): boolean {
  const resolvedTarget = resolve(targetPath);
  const resolvedBase = resolve(basePath);
  const relativeTarget = relative(resolvedBase, resolvedTarget);

  return relativeTarget === "" || (!relativeTarget.startsWith("..") && !isAbsolute(relativeTarget));
}

export function assertPathWithinBase(targetPath: string, basePath: string, label: string): string {
  const resolvedTarget = resolve(targetPath);
  if (!isPathWithinBase(resolvedTarget, basePath)) {
    throw new Error(`Path traversal blocked: ${label}`);
  }

  return resolvedTarget;
}
