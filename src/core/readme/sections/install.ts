export function renderInstallation(
  packageManager?: string
): string {
  if (!packageManager) return "";

  const cmd =
    packageManager === "npm"
      ? "npm install"
      : "yarn install";

  return `## 📦 Installation

\`\`\`bash
${cmd}
\`\`\`

`;
}
