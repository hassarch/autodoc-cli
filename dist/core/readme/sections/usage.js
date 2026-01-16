"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderUsage = renderUsage;
function renderUsage(projectType, entryPoints, packageName, binCommands) {
    let usage = "## 📖 Usage\n\n";
    if (projectType === "CLI" && binCommands) {
        const commands = Object.keys(binCommands);
        if (commands.length > 0) {
            usage += "```bash\n";
            usage += `# Run the CLI\n`;
            usage += `${commands[0]}\n\n`;
            usage += `# Show help\n`;
            usage += `${commands[0]} --help\n`;
            usage += "```\n\n";
        }
    }
    else if (projectType === "API") {
        usage += "```bash\n";
        usage += "# Start the server\n";
        usage += "npm start\n\n";
        usage += "# Development mode\n";
        usage += "npm run dev\n";
        usage += "```\n\n";
    }
    else if (projectType === "Web App") {
        usage += "```bash\n";
        usage += "# Start development server\n";
        usage += "npm run dev\n\n";
        usage += "# Build for production\n";
        usage += "npm run build\n";
        usage += "```\n\n";
    }
    else if (projectType === "Library") {
        usage += "```javascript\n";
        if (packageName) {
            usage += `import { } from '${packageName}';\n\n`;
            usage += `// Use the library\n`;
        }
        usage += "```\n\n";
    }
    else if (entryPoints.length) {
        usage += "**Entry Points:**\n";
        entryPoints.forEach(e => {
            usage += `- \`${e}\`\n`;
        });
        usage += "\n";
    }
    return usage;
}
