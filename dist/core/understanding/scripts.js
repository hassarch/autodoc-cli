"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractScripts = extractScripts;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function extractScripts(rootDir) {
    const pkgPath = path_1.default.join(rootDir, "package.json");
    if (!fs_1.default.existsSync(pkgPath))
        return {};
    const pkg = JSON.parse(fs_1.default.readFileSync(pkgPath, "utf-8"));
    return pkg.scripts || {};
}
