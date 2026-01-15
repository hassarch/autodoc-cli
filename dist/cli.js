"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCLI = runCLI;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const scanner_1 = require("./core/scanner/scanner");
const techDectector_1 = require("./core/analyzer/techDectector");
const understanding_1 = require("./core/understanding");
const readme_1 = require("./core/readme");
const ai_1 = require("./core/ai");
function runCLI() {
    const program = new commander_1.Command();
    program
        .name("autodoc")
        .description("Automatically generate README.md for your project")
        .version("1.0.0")
        .option("--ai", "Enable AI-powered summarization")
        .option("--no-ai", "Disable AI")
        .option("--verbose", "Verbose logs");
    program.action(async () => {
        // ─────────────────────────────────────
        // CLI options
        // ─────────────────────────────────────
        const options = program.opts();
        const useAI = Boolean(options.ai);
        const verbose = Boolean(options.verbose);
        const projectRoot = process.cwd();
        // ─────────────────────────────────────
        // PHASE 2 — Scan
        // ─────────────────────────────────────
        console.log(chalk_1.default.green("✔ Scanning project..."));
        const tree = (0, scanner_1.scanProject)(projectRoot);
        // ─────────────────────────────────────
        // PHASE 3 — Tech stack
        // ─────────────────────────────────────
        console.log(chalk_1.default.green("✔ Detecting tech stack..."));
        const tech = (0, techDectector_1.detectTechStack)(tree, projectRoot);
        // ─────────────────────────────────────
        // PHASE 4 — Understanding
        // ─────────────────────────────────────
        console.log(chalk_1.default.green("✔ Understanding project..."));
        const understanding = (0, understanding_1.understandProject)(projectRoot, tech);
        // ─────────────────────────────────────
        // PHASE 6 — AI (optional)
        // ─────────────────────────────────────
        let finalDescription = understanding.descriptionHint;
        let aiFeatures;
        if (useAI) {
            if (verbose)
                console.log("🤖 AI enabled");
            const ai = await (0, ai_1.enhanceWithAI)({
                projectName: path_1.default.basename(projectRoot),
                projectType: understanding.projectType,
                languages: tech.languages,
                frameworks: tech.frameworks,
                dependencies: tech.dependencies,
                scripts: understanding.scripts
            });
            if (ai?.description)
                finalDescription = ai.description;
            if (ai?.features)
                aiFeatures = ai.features;
        }
        // ─────────────────────────────────────
        // PHASE 5 — README
        // ─────────────────────────────────────
        console.log(chalk_1.default.green("✔ Generating README.md..."));
        await (0, readme_1.generateREADME)(projectRoot, {
            projectName: path_1.default.basename(projectRoot),
            description: finalDescription,
            projectType: understanding.projectType,
            entryPoints: understanding.entryPoints,
            scripts: understanding.scripts,
            languages: tech.languages,
            frameworks: tech.frameworks,
            packageManager: tech.packageManager,
            aiFeatures
        });
    });
    program.parse(process.argv);
}
