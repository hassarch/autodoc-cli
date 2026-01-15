export function renderUsage(
  projectType: string,
  entryPoints: string[]
): string {
  let usage = "## ▶️ Usage\n\n";

  if (projectType === "CLI") {
    usage += "```bash\n";
    usage += "your-command --help\n";
    usage += "```\n\n";
  } else if (entryPoints.length) {
    usage += "Main entry point:\n";
    entryPoints.forEach(e => {
      usage += `- \`${e}\`\n`;
    });
    usage += "\n";
  }

  return usage;
}
