"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPrompt = buildPrompt;
function buildPrompt(input) {
    return `
You are an expert technical writer specializing in software documentation.

Analyze this project and generate a professional, precise README summary.

**Project Details:**
- Name: ${input.projectName}
- Type: ${input.projectType}
- Languages: ${input.languages.join(", ")}
- Frameworks: ${input.frameworks.join(", ")}
- Key Dependencies: ${input.dependencies.slice(0, 10).join(", ")}
- Available Scripts: ${Object.keys(input.scripts).join(", ")}

**Instructions:**
1. Write a compelling, professional description (1-2 sentences)
2. List 3-5 key features that are specific and meaningful
3. Avoid generic phrases like "easy to use" or "powerful"
4. Focus on what makes this project unique
5. Be precise and technical where appropriate

Return ONLY valid JSON in this exact format:
{
  "description": "A precise, professional description",
  "features": [
    "Specific feature 1",
    "Specific feature 2",
    "Specific feature 3"
  ]
}
`;
}
