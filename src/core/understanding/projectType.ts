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

    // CLI detection
    if (pkg.bin) return "CLI";
    
    // Library detection
    if (pkg.main && !pkg.scripts?.start && !dependencies.some(d => 
      ["express", "fastify", "koa", "react", "vue", "angular", "next", "nuxt"].includes(d)
    )) {
      return "Library";
    }
    
    // API detection
    if (dependencies.some(d => ["express", "fastify", "koa", "hapi", "nestjs"].includes(d))) {
      return "API";
    }
    
    // Web App detection
    if (dependencies.some(d => ["react", "vue", "angular", "svelte", "next", "nuxt", "gatsby"].includes(d))) {
      return "Web App";
    }
  }

  return "Application";
}
