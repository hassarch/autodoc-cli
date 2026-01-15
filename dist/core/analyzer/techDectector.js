"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectTechStack = detectTechStack;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const EXTENSION_LANGUAGE_MAP = {
    ".js": "JavaScript",
    ".ts": "TypeScript",
    ".py": "Python",
    ".java": "Java",
    ".c": "C",
    ".cpp": "C++",
    ".go": "Go"
};
function detectTechStack(tree, rootDir) {
    const languages = new Set();
    const frameworks = new Set();
    const dependencies = new Set();
    let packageManager;
    function walk(node) {
        if (node.type === "file" && node.extension) {
            const lang = EXTENSION_LANGUAGE_MAP[node.extension];
            if (lang)
                languages.add(lang);
        }
        if (node.children) {
            node.children.forEach(walk);
        }
    }
    walk(tree);
    // Detect package manager + deps
    const pkgJsonPath = path_1.default.join(rootDir, "package.json");
    if (fs_1.default.existsSync(pkgJsonPath)) {
        packageManager = "npm";
        const pkg = JSON.parse(fs_1.default.readFileSync(pkgJsonPath, "utf-8"));
        frameworks.add("Node.js");
        Object.keys(pkg.dependencies || {}).forEach(dep => dependencies.add(dep));
        Object.keys(pkg.devDependencies || {}).forEach(dep => dependencies.add(dep));
        if (dependencies.has("react"))
            frameworks.add("React");
        if (dependencies.has("next"))
            frameworks.add("Next.js");
        if (dependencies.has("express"))
            frameworks.add("Express");
    }
    return {
        languages: Array.from(languages),
        frameworks: Array.from(frameworks),
        packageManager,
        dependencies: Array.from(dependencies)
    };
}
