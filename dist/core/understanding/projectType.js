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
        if (pkg.bin)
            return "CLI";
        if (dependencies.includes("express"))
            return "API";
        if (dependencies.includes("react") ||
            dependencies.includes("next"))
            return "Web App";
    }
    return "Unknown";
}
