import fs from "fs";
import path from "path";
import { FileNode } from "../scanner/types";
import { TechStack } from "./types";

const EXTENSION_LANGUAGE_MAP: Record<string, string> = {
  ".js": "JavaScript",
  ".ts": "TypeScript",
  ".py": "Python",
  ".java": "Java",
  ".c": "C",
  ".cpp": "C++",
  ".go": "Go"
};

export function detectTechStack(
  tree: FileNode,
  rootDir: string
): TechStack {
  const languages = new Set<string>();
  const frameworks = new Set<string>();
  const dependencies = new Set<string>();
  let packageManager: string | undefined;

  function walk(node: FileNode) {
    if (node.type === "file" && node.extension) {
      const lang = EXTENSION_LANGUAGE_MAP[node.extension];
      if (lang) languages.add(lang);
    }

    if (node.children) {
      node.children.forEach(walk);
    }
  }

  walk(tree);

  // Detect package manager + deps
  const pkgJsonPath = path.join(rootDir, "package.json");
  if (fs.existsSync(pkgJsonPath)) {
    packageManager = "npm";

    const pkg = JSON.parse(
      fs.readFileSync(pkgJsonPath, "utf-8")
    );

    frameworks.add("Node.js");

    Object.keys(pkg.dependencies || {}).forEach(dep =>
      dependencies.add(dep)
    );

    Object.keys(pkg.devDependencies || {}).forEach(dep =>
      dependencies.add(dep)
    );

    if (dependencies.has("react")) frameworks.add("React");
    if (dependencies.has("next")) frameworks.add("Next.js");
    if (dependencies.has("express")) frameworks.add("Express");
  }

  return {
    languages: Array.from(languages),
    frameworks: Array.from(frameworks),
    packageManager,
    dependencies: Array.from(dependencies)
  };
}
