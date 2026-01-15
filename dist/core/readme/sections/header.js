"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHeader = renderHeader;
function renderHeader(projectName, description) {
    return `# ${projectName}

${description}

`;
}
