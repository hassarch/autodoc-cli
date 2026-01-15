"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateREADME = generateREADME;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
const builder_1 = require("./builder");
async function generateREADME(rootDir, data) {
    const readmePath = path_1.default.join(rootDir, "README.md");
    if (fs_1.default.existsSync(readmePath)) {
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const answer = await new Promise(res => rl.question("README.md already exists. Overwrite? (y/N): ", res));
        rl.close();
        if (answer.toLowerCase() !== "y") {
            console.log("Aborted.");
            return;
        }
    }
    const content = (0, builder_1.buildREADME)(data);
    fs_1.default.writeFileSync(readmePath, content);
    console.log("✅ README.md generated successfully");
}
