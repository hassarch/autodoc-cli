"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanProject = scanProject;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ignore_1 = require("./ignore");
function scanProject(rootDir) {
    const gitignoreRules = (0, ignore_1.loadGitIgnore)(rootDir);
    function walk(currentPath) {
        const stats = fs_1.default.statSync(currentPath);
        const name = path_1.default.basename(currentPath);
        if (stats.isDirectory()) {
            const children = [];
            const entries = fs_1.default.readdirSync(currentPath);
            for (const entry of entries) {
                const fullPath = path_1.default.join(currentPath, entry);
                if ((0, ignore_1.shouldIgnore)(fullPath, gitignoreRules))
                    continue;
                children.push(walk(fullPath));
            }
            return {
                path: currentPath,
                name,
                type: "directory",
                children
            };
        }
        return {
            path: currentPath,
            name,
            type: "file",
            extension: path_1.default.extname(name),
            size: stats.size
        };
    }
    return walk(rootDir);
}
