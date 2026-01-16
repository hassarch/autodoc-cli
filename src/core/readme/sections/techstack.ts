export function renderTechStack(
  languages: string[],
  frameworks: string[],
  dependencies?: string[]
): string {
  let output = `## 🛠️ Tech Stack\n\n`;
  
  if (languages.length) {
    output += `**Languages**\n`;
    output += languages.map(l => `- ${l}`).join("\n") + "\n\n";
  }
  
  if (frameworks.length) {
    output += `**Frameworks & Libraries**\n`;
    output += frameworks.map(f => `- ${f}`).join("\n") + "\n\n";
  }
  
  if (dependencies && dependencies.length > 0) {
    const keyDeps = dependencies.slice(0, 8);
    output += `**Key Dependencies**\n`;
    output += keyDeps.map(d => `- \`${d}\``).join("\n") + "\n\n";
  }

  return output;
}
