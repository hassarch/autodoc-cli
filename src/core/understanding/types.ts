export type ProjectUnderstanding = {
  projectType: "CLI" | "Web App" | "API" | "Library" | "Application";
  entryPoints: string[];
  scripts: Record<string, string>;
  descriptionHint: string;
};
