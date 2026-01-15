"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTechStack = renderTechStack;
function renderTechStack(languages, frameworks) {
    return `## 🧠 Tech Stack

**Languages**
${languages.map(l => `- ${l}`).join("\n")}

**Frameworks / Tools**
${frameworks.length ? frameworks.map(f => `- ${f}`).join("\n") : "- None"}

`;
}
