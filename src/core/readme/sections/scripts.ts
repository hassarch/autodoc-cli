export function renderScripts(
  scripts: Record<string, string>
): string {
  if (!Object.keys(scripts).length) return "";

  return `## ⚙️ Scripts

${Object.entries(scripts)
  .map(([k, v]) => `- \`${k}\`: \`${v}\``)
  .join("\n")}

`;
}
