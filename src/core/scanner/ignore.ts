import path from "path";
import fs from "fs";

const DEFAULT_IGNORES = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next"
];

export function shouldIgnore(
  filePath: string,
  gitignoreRules: string[]
): boolean {
  const baseName = path.basename(filePath);

  if (DEFAULT_IGNORES.includes(baseName)) {
    return true;
  }

  return gitignoreRules.some(rule =>
    filePath.includes(rule)
  );
}

export function loadGitIgnore(root: string): string[] {
  const gitignorePath = path.join(root, ".gitignore");

  if (!fs.existsSync(gitignorePath)) {
    return [];
  }

  const content = fs.readFileSync(gitignorePath, "utf-8");

  return content
    .split("\n")
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"));
}
