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
  packageManager?: string;
  aiFeatures?:string[];
}): string {
  return (
    renderHeader(data.projectName, data.description) +
    renderFeatures(data.projectType,data.aiFeatures) +
    renderInstallation(data.packageManager) +
    renderUsage(data.projectType, data.entryPoints) +
    renderTechStack(data.languages, data.frameworks) +
    renderScripts(data.scripts) +
    renderFooter()
  );
}
