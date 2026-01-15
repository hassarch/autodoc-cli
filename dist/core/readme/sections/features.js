"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderFeatures = renderFeatures;
function renderFeatures(projectType, aiFeatures) {
    const base = aiFeatures?.length
        ? aiFeatures
        : [
            "Automatic project analysis",
            "Zero-configuration usage",
            "GitHub-ready documentation"
        ];
    return `## ✨ Features

${base.map(f => `- ${f}`).join("\n")}

`;
}
