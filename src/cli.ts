import { Command } from "commander";
import chalk from "chalk";
import path from "path";

import { scanProject } from "./core/scanner/scanner";
import { detectTechStack } from "./core/analyzer/techDectector";
import { understandProject } from "./core/understanding";
import { generateREADME } from "./core/readme";
import { enhanceWithAI } from "./core/ai";

export function runCLI() {
  const program = new Command();

  program
    .name("autodoc")
    .description("Automatically generate README.md for your project")
    .version("1.0.2")
    .option("--ai", "Enable AI-powered summarization")
    .option("--verbose", "Verbose logs");

  // ✅ DEFAULT ACTION (autodoc)
  program.action(async () => {
    const options = program.opts();
    const useAI = Boolean(options.ai);
    const verbose = Boolean(options.verbose);

    const projectRoot = process.cwd();

    console.log(chalk.green("✔ Scanning project..."));
    const tree = scanProject(projectRoot);

    console.log(chalk.green("✔ Detecting tech stack..."));
    const tech = detectTechStack(tree, projectRoot);

    console.log(chalk.green("✔ Understanding project..."));
    const understanding = understandProject(projectRoot, tech);

    let finalDescription = understanding.descriptionHint;
    let aiFeatures: string[] | undefined;

    if (useAI) {
      if (verbose) console.log("🤖 AI enabled");

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

    console.log(chalk.green("✔ Generating README.md..."));

    await generateREADME(projectRoot, {
      projectName: path.basename(projectRoot),
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

  // ✅ OPTIONAL INIT COMMAND (does NOT affect generation)
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
