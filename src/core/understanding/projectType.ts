import fs from "fs";
import path from "path";
import { ProjectUnderstanding } from "./types";

export function detectProjectType(
  rootDir: string,
  dependencies: string[]
): ProjectUnderstanding["projectType"] {
  const pkgPath = path.join(rootDir, "package.json");

  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    if (pkg.bin) return "CLI";
    if (dependencies.includes("express")) return "API";
    if (
      dependencies.includes("react") ||
      dependencies.includes("next")
    )
      return "Web App";
  }

  return "Unknown";
}
