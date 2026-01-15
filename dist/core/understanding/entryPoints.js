"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectEntryPoints = detectEntryPoints;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function detectEntryPoints(rootDir) {
    const entryPoints = [];
    const pkgPath = path_1.default.join(rootDir, "package.json");
    if (fs_1.default.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs_1.default.readFileSync(pkgPath, "utf-8"));
        if (pkg.main && typeof pkg.main === "string") {
            entryPoints.push(pkg.main);
        }
        if (pkg.bin) {
            if (typeof pkg.bin === "string") {
                entryPoints.push(pkg.bin);
            }
            else if (typeof pkg.bin === "object") {
                Object.values(pkg.bin).forEach(v => entryPoints.push(v));
            }
        }
    }
    ["index.js", "src/index.ts", "src/main.ts"].forEach(file => {
        const full = path_1.default.join(rootDir, file);
        if (fs_1.default.existsSync(full))
            entryPoints.push(file);
    });
    return Array.from(new Set(entryPoints));
}
