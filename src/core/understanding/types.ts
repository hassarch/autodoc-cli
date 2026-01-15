export type ProjectUnderstanding = {
  projectType: "CLI" | "Web App" | "API" | "Library" | "Unknown";
  entryPoints: string[];
  scripts: Record<string, string>;
  descriptionHint: string;
};
