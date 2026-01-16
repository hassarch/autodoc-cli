"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderScripts = renderScripts;
function renderScripts(scripts) {
    if (!Object.keys(scripts).length)
        return "";
    // Categorize scripts
    const categories = {
        build: [],
        dev: [],
        test: [],
        other: []
    };
    Object.entries(scripts).forEach(([key, value]) => {
        if (key.includes("build") || key.includes("compile")) {
            categories.build.push([key, value]);
        }
        else if (key.includes("dev") || key.includes("start") || key.includes("serve")) {
            categories.dev.push([key, value]);
        }
        else if (key.includes("test") || key.includes("spec")) {
            categories.test.push([key, value]);
        }
        else {
            categories.other.push([key, value]);
        }
    });
    let output = `## ⚙️ Available Scripts\n\n`;
    if (categories.dev.length) {
        output += `**Development**\n`;
        categories.dev.forEach(([k, v]) => {
            output += `- \`npm run ${k}\` - ${getScriptDescription(k, v)}\n`;
        });
        output += "\n";
    }
    if (categories.build.length) {
        output += `**Build**\n`;
        categories.build.forEach(([k, v]) => {
            output += `- \`npm run ${k}\` - ${getScriptDescription(k, v)}\n`;
        });
        output += "\n";
    }
    if (categories.test.length) {
        output += `**Testing**\n`;
        categories.test.forEach(([k, v]) => {
            output += `- \`npm run ${k}\` - ${getScriptDescription(k, v)}\n`;
        });
        output += "\n";
    }
    if (categories.other.length) {
        categories.other.forEach(([k, v]) => {
            output += `- \`npm run ${k}\` - ${getScriptDescription(k, v)}\n`;
        });
        output += "\n";
    }
    return output;
}
function getScriptDescription(key, value) {
    // Generate helpful descriptions based on script name and command
    if (key === "dev" || key === "start")
        return "Start development server";
    if (key === "build")
        return "Build for production";
    if (key === "test")
        return "Run test suite";
    if (key.includes("lint"))
        return "Lint code";
    if (key.includes("format"))
        return "Format code";
    if (key.includes("type"))
        return "Type check";
    return value;
}
