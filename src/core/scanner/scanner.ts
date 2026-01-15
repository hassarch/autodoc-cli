import fs from "fs";
import path from "path";
import { FileNode } from "./types";
import { shouldIgnore, loadGitIgnore } from "./ignore";

export function scanProject(rootDir: string): FileNode {
  const gitignoreRules = loadGitIgnore(rootDir);

  function walk(currentPath: string): FileNode {
    const stats = fs.statSync(currentPath);
    const name = path.basename(currentPath);

    if (stats.isDirectory()) {
      const children: FileNode[] = [];

      const entries = fs.readdirSync(currentPath);

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry);

        if (shouldIgnore(fullPath, gitignoreRules)) continue;

        children.push(walk(fullPath));
      }

      return {
        path: currentPath,
        name,
        type: "directory",
        children
      };
    }

    return {
      path: currentPath,
      name,
      type: "file",
      extension: path.extname(name),
      size: stats.size
    };
  }

  return walk(rootDir);
}
