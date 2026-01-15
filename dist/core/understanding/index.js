"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.understandProject = understandProject;
const projectType_1 = require("./projectType");
const entryPoints_1 = require("./entryPoints");
const scripts_1 = require("./scripts");
const description_1 = require("./description");
function understandProject(rootDir, tech) {
    const projectType = (0, projectType_1.detectProjectType)(rootDir, tech.dependencies);
    return {
        projectType,
        entryPoints: (0, entryPoints_1.detectEntryPoints)(rootDir),
        scripts: (0, scripts_1.extractScripts)(rootDir),
        descriptionHint: (0, description_1.generateDescriptionHint)(projectType, tech.languages, tech.frameworks)
    };
}
