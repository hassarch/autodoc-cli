import fs from "fs";
import path from "path";
import readline from "readline";
import { buildREADME } from "./builder";

export async function generateREADME(
  rootDir: string,
  data: Parameters<typeof buildREADME>[0]
) {
  const readmePath = path.join(rootDir, "README.md");

  if (fs.existsSync(readmePath)) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const answer = await new Promise<string>(res =>
      rl.question(
        "README.md already exists. Overwrite? (y/N): ",
        res
      )
    );

    rl.close();

    if (answer.toLowerCase() !== "y") {
      console.log("Aborted.");
      return;
    }
  }

  const content = buildREADME(data);
  fs.writeFileSync(readmePath, content);

  console.log("✅ README.md generated successfully");
}
