"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldIgnore = shouldIgnore;
exports.loadGitIgnore = loadGitIgnore;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const DEFAULT_IGNORES = [
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next"
];
function shouldIgnore(filePath, gitignoreRules) {
    const baseName = path_1.default.basename(filePath);
    if (DEFAULT_IGNORES.includes(baseName)) {
        return true;
    }
    return gitignoreRules.some(rule => filePath.includes(rule));
}
function loadGitIgnore(root) {
    const gitignorePath = path_1.default.join(root, ".gitignore");
    if (!fs_1.default.existsSync(gitignorePath)) {
        return [];
    }
    const content = fs_1.default.readFileSync(gitignorePath, "utf-8");
    return content
        .split("\n")
        .map(line => line.trim())
        .filter(line => line && !line.startsWith("#"));
}
