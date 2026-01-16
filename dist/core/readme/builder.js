"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildREADME = buildREADME;
const header_1 = require("./sections/header");
const features_1 = require("./sections/features");
const install_1 = require("./sections/install");
const usage_1 = require("./sections/usage");
const techstack_1 = require("./sections/techstack");
const scripts_1 = require("./sections/scripts");
const footer_1 = require("./sections/footer");
function buildREADME(data) {
    return ((0, header_1.renderHeader)(data.projectName, data.description, data.version, data.license) +
        (0, features_1.renderFeatures)(data.projectType, data.aiFeatures, data.hasTests, data.hasTypeScript) +
        (0, install_1.renderInstallation)(data.packageManager) +
        (0, usage_1.renderUsage)(data.projectType, data.entryPoints, data.projectName, data.binCommands) +
        (0, techstack_1.renderTechStack)(data.languages, data.frameworks, data.dependencies) +
        (0, scripts_1.renderScripts)(data.scripts) +
        (0, footer_1.renderFooter)());
}
