export function renderFeatures(
  projectType: string,
  aiFeatures?: string[]
): string {
  const base = aiFeatures?.length
    ? aiFeatures
    : [
        "Automatic project analysis",
        "Zero-configuration usage",
        "GitHub-ready documentation"
      ];

  return `## ✨ Features

${base.map(f => `- ${f}`).join("\n")}

`;
}
