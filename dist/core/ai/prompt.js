"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPrompt = buildPrompt;
function buildPrompt(input) {
    return `
You are an expert software technical writer.

Generate a concise, accurate README summary.

Project name: ${input.projectName}
Project type: ${input.projectType}
Languages: ${input.languages.join(", ")}
Frameworks: ${input.frameworks.join(", ")}
Key dependencies: ${input.dependencies.slice(0, 10).join(", ")}

Return JSON ONLY in this format:
{
  "description": "string",
  "features": ["string"],
  "usageNotes": ["string"]
}
`;
}
