import { ProjectUnderstanding } from "./types";
import { detectProjectType } from "./projectType";
import { detectEntryPoints } from "./entryPoints";
import { extractScripts } from "./scripts";
import { generateDescriptionHint } from "./description";

export function understandProject(
  rootDir: string,
  tech: {
    languages: string[];
    frameworks: string[];
    dependencies: string[];
  }
): ProjectUnderstanding {
  const projectType = detectProjectType(
    rootDir,
    tech.dependencies
  );

  return {
    projectType,
    entryPoints: detectEntryPoints(rootDir),
    scripts: extractScripts(rootDir),
    descriptionHint: generateDescriptionHint(
      projectType,
      tech.languages,
      tech.frameworks
    )
  };
}
