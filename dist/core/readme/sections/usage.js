"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderUsage = renderUsage;
function renderUsage(projectType, entryPoints) {
    let usage = "## ▶️ Usage\n\n";
    if (projectType === "CLI") {
        usage += "```bash\n";
        usage += "your-command --help\n";
        usage += "```\n\n";
    }
    else if (entryPoints.length) {
        usage += "Main entry point:\n";
        entryPoints.forEach(e => {
            usage += `- \`${e}\`\n`;
        });
        usage += "\n";
    }
    return usage;
}
