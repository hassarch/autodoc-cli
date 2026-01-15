import fs from "fs";
import path from "path";

export function extractScripts(rootDir: string): Record<string, string> {
  const pkgPath = path.join(rootDir, "package.json");

  if (!fs.existsSync(pkgPath)) return {};

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  return pkg.scripts || {};
}
