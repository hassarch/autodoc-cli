export function renderTechStack(
  languages: string[],
  frameworks: string[]
): string {
  return `## 🧠 Tech Stack

**Languages**
${languages.map(l => `- ${l}`).join("\n")}

**Frameworks / Tools**
${frameworks.length ? frameworks.map(f => `- ${f}`).join("\n") : "- None"}

`;
}
