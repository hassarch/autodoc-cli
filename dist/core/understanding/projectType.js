"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectProjectType = detectProjectType;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function detectProjectType(rootDir, dependencies) {
    const pkgPath = path_1.default.join(rootDir, "package.json");
    if (fs_1.default.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs_1.default.readFileSync(pkgPath, "utf-8"));
        // CLI detection
        if (pkg.bin)
            return "CLI";
        // Library detection
        if (pkg.main && !pkg.scripts?.start && !dependencies.some(d => ["express", "fastify", "koa", "react", "vue", "angular", "next", "nuxt"].includes(d))) {
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
