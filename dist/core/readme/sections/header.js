"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHeader = renderHeader;
function renderHeader(projectName, description, version, license) {
    let badges = "";
    if (version) {
        badges += `![Version](https://img.shields.io/badge/version-${version}-blue.svg) `;
    }
    if (license) {
        badges += `![License](https://img.shields.io/badge/license-${license}-green.svg)`;
    }
    return `# ${projectName}

${badges ? badges + "\n\n" : ""}${description}

`;
}
