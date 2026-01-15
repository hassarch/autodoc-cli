"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceWithAI = enhanceWithAI;
const client_1 = require("./client");
async function enhanceWithAI(input) {
    return await (0, client_1.getAISummary)(input);
}
