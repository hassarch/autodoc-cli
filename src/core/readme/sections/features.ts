export function renderFeatures(
  projectType: string,
  aiFeatures?: string[],
  hasTests?: boolean,
  hasTypeScript?: boolean
): string {
  let features = aiFeatures?.length ? aiFeatures : [];
  
  // Add intelligent default features based on project analysis
  if (!aiFeatures?.length) {
    if (projectType === "CLI") {
      features.push("Command-line interface with intuitive commands");
      features.push("Built-in help and documentation");
    } else if (projectType === "API") {
      features.push("RESTful API endpoints");
      features.push("Robust error handling");
    } else if (projectType === "Web App") {
      features.push("Modern web application");
      features.push("Responsive design");
    } else if (projectType === "Library") {
      features.push("Reusable components and utilities");
      features.push("Well-documented API");
    }
    
    if (hasTypeScript) {
      features.push("Type-safe with TypeScript");
    }
    
    if (hasTests) {
      features.push("Comprehensive test coverage");
    }
  }

  if (features.length === 0) {
    return "";
  }

  return `## ✨ Features

${features.map(f => `- ${f}`).join("\n")}

`;
}
