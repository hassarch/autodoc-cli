"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderScripts = renderScripts;
function renderScripts(scripts) {
    if (!Object.keys(scripts).length)
        return "";
    return `## ⚙️ Scripts

${Object.entries(scripts)
        .map(([k, v]) => `- \`${k}\`: \`${v}\``)
        .join("\n")}

`;
}
