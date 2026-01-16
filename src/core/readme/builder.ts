import { renderHeader } from "./sections/header";
import { renderFeatures } from "./sections/features";
import { renderInstallation } from "./sections/install";
import { renderUsage } from "./sections/usage";
import { renderTechStack } from "./sections/techstack";
import { renderScripts } from "./sections/scripts";
import { renderFooter } from "./sections/footer";

export function buildREADME(data: {
  projectName: string;
  description: string;
  projectType: string;
  entryPoints: string[];
  scripts: Record<string, string>;
  languages: string[];
  frameworks: string[];
  dependencies?: string[];
  packageManager?: string;
  aiFeatures?: string[];
  version?: string;
  license?: string;
  binCommands?: Record<string, string>;
  hasTests?: boolean;
  hasTypeScript?: boolean;
}): string {
  return (
    renderHeader(data.projectName, data.description, data.version, data.license) +
    renderFeatures(data.projectType, data.aiFeatures, data.hasTests, data.hasTypeScript) +
    renderInstallation(data.packageManager) +
    renderUsage(data.projectType, data.entryPoints, data.projectName, data.binCommands) +
    renderTechStack(data.languages, data.frameworks, data.dependencies) +
    renderScripts(data.scripts) +
    renderFooter()
  );
}
