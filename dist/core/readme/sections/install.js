"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderInstallation = renderInstallation;
function renderInstallation(packageManager) {
    if (!packageManager)
        return "";
    const cmd = packageManager === "npm"
        ? "npm install"
        : "yarn install";
    return `## 📦 Installation

\`\`\`bash
${cmd}
\`\`\`

`;
}
