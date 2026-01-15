export type AISummaryInput = {
  projectName: string;
  projectType: string;
  languages: string[];
  frameworks: string[];
  dependencies: string[];
  scripts: Record<string, string>;
};

export type AISummaryOutput = {
  description?: string;
  features?: string[];
  usageNotes?: string[];
};
