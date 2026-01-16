"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCLI = runCLI;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const scanner_1 = require("./core/scanner/scanner");
const techDectector_1 = require("./core/analyzer/techDectector");
const understanding_1 = require("./core/understanding");
const readme_1 = require("./core/readme");
const ai_1 = require("./core/ai");
function runCLI() {
    const program = new commander_1.Command();
    program
        .name("autodoc")
        .description("Automatically generate professional README.md for your project")
        .version("1.0.3")
        .option("--ai", "Enable AI-powered summarization")
        .option("--verbose", "Verbose logs")
        .option("-o, --output <path>", "Output path for README.md", "README.md");
    program.action(async () => {
        const options = program.opts();
        const useAI = Boolean(options.ai);
        const verbose = Boolean(options.verbose);
        const projectRoot = process.cwd();
        try {
            console.log(chalk_1.default.blue.bold("\n🚀 AutoDoc CLI\n"));
            console.log(chalk_1.default.green("✔ Scanning project..."));
            const tree = (0, scanner_1.scanProject)(projectRoot);
            console.log(chalk_1.default.green("✔ Detecting tech stack..."));
            const tech = (0, techDectector_1.detectTechStack)(tree, projectRoot);
            console.log(chalk_1.default.green("✔ Understanding project structure..."));
            const understanding = (0, understanding_1.understandProject)(projectRoot, tech);
            // Read package.json for additional metadata
            let pkgData = {};
            const pkgPath = path_1.default.join(projectRoot, "package.json");
            if (fs_1.default.existsSync(pkgPath)) {
                pkgData = JSON.parse(fs_1.default.readFileSync(pkgPath, "utf-8"));
            }
            let finalDescription = understanding.descriptionHint;
            let aiFeatures;
            if (useAI) {
                console.log(chalk_1.default.cyan("🤖 Enhancing with AI..."));
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
            console.log(chalk_1.default.green("✔ Generating professional README.md..."));
            // Detect if project has tests
            const hasTests = Object.keys(understanding.scripts).some(s => s.includes("test") || s.includes("spec"));
            // Detect TypeScript
            const hasTypeScript = tech.languages.includes("TypeScript");
            await (0, readme_1.generateREADME)(projectRoot, {
                projectName: pkgData.name || path_1.default.basename(projectRoot),
                description: pkgData.description || finalDescription,
                projectType: understanding.projectType,
                entryPoints: understanding.entryPoints,
                scripts: understanding.scripts,
                languages: tech.languages,
                frameworks: tech.frameworks,
                dependencies: tech.dependencies,
                packageManager: tech.packageManager,
                version: pkgData.version,
                license: pkgData.license,
                binCommands: pkgData.bin,
                hasTests,
                hasTypeScript,
                aiFeatures
            });
            console.log(chalk_1.default.green.bold("\n✅ README.md generated successfully!\n"));
            if (verbose) {
                console.log(chalk_1.default.gray("Project Type:"), understanding.projectType);
                console.log(chalk_1.default.gray("Languages:"), tech.languages.join(", "));
                console.log(chalk_1.default.gray("Frameworks:"), tech.frameworks.join(", ") || "None");
            }
        }
        catch (error) {
            console.error(chalk_1.default.red("\n❌ Error generating README:"), error);
            process.exit(1);
        }
    });
    program
        .command("init")
        .description("Initialize AutoDoc configuration file")
        .action(() => {
        console.log(chalk_1.default.yellow("Config support is optional. README generation works without it."));
    });
    program.parse(process.argv);
}
