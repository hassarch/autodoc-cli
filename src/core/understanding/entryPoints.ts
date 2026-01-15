import fs from "fs";
import path from "path";

export function detectEntryPoints(rootDir: string): string[] {
  const entryPoints: string[] = [];
  const pkgPath = path.join(rootDir, "package.json");

  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    if (pkg.main && typeof pkg.main === "string") {
      entryPoints.push(pkg.main);
    }

    if (pkg.bin) {
      if (typeof pkg.bin === "string") {
        entryPoints.push(pkg.bin);
      } else if (typeof pkg.bin === "object") {
        Object.values(pkg.bin as Record<string, string>).forEach(v =>
          entryPoints.push(v)
        );
      }
    }
  }

  ["index.js", "src/index.ts", "src/main.ts"].forEach(file => {
    const full = path.join(rootDir, file);
    if (fs.existsSync(full)) entryPoints.push(file);
  });

  return Array.from(new Set(entryPoints));
}
