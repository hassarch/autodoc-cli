import { Command } from "commander";
import chalk from "chalk";
import path from "path";
import fs from "fs";

import { scanProject } from "./core/scanner/scanner";
import { detectTechStack } from "./core/analyzer/techDectector";
import { understandProject } from "./core/understanding";
import { generateREADME } from "./core/readme";
import { enhanceWithAI } from "./core/ai";

export function runCLI() {
  const program = new Command();

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
      console.log(chalk.blue.bold("\n🚀 AutoDoc CLI\n"));
      
      console.log(chalk.green("✔ Scanning project..."));
      const tree = scanProject(projectRoot);

      console.log(chalk.green("✔ Detecting tech stack..."));
      const tech = detectTechStack(tree, projectRoot);

      console.log(chalk.green("✔ Understanding project structure..."));
      const understanding = understandProject(projectRoot, tech);

      // Read package.json for additional metadata
      let pkgData: any = {};
      const pkgPath = path.join(projectRoot, "package.json");
      if (fs.existsSync(pkgPath)) {
        pkgData = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      }

      let finalDescription = understanding.descriptionHint;
      let aiFeatures: string[] | undefined;

      if (useAI) {
        console.log(chalk.cyan("🤖 Enhancing with AI..."));
        
        const ai = await enhanceWithAI({
          projectName: path.basename(projectRoot),
          projectType: understanding.projectType,
          languages: tech.languages,
          frameworks: tech.frameworks,
          dependencies: tech.dependencies,
          scripts: understanding.scripts
        });

        if (ai?.description) finalDescription = ai.description;
        if (ai?.features) aiFeatures = ai.features;
      }

      console.log(chalk.green("✔ Generating professional README.md..."));

      // Detect if project has tests
      const hasTests = Object.keys(understanding.scripts).some(s => 
        s.includes("test") || s.includes("spec")
      );

      // Detect TypeScript
      const hasTypeScript = tech.languages.includes("TypeScript");

      await generateREADME(projectRoot, {
        projectName: pkgData.name || path.basename(projectRoot),
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

      console.log(chalk.green.bold("\n✅ README.md generated successfully!\n"));
      
      if (verbose) {
        console.log(chalk.gray("Project Type:"), understanding.projectType);
        console.log(chalk.gray("Languages:"), tech.languages.join(", "));
        console.log(chalk.gray("Frameworks:"), tech.frameworks.join(", ") || "None");
      }
    } catch (error) {
      console.error(chalk.red("\n❌ Error generating README:"), error);
      process.exit(1);
    }
  });

  program
    .command("init")
    .description("Initialize AutoDoc configuration file")
    .action(() => {
      console.log(
        chalk.yellow(
          "Config support is optional. README generation works without it."
        )
      );
    });

  program.parse(process.argv);
}
