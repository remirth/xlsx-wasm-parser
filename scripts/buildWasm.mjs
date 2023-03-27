// @ts-check

import { execSync } from "child_process";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const packageFileDir = join("wasm", "dist", "browser", "package.json");
const isRelease = process.argv.includes("--release");
const isNode = process.argv.includes("--node");

const command =
  "wasm-pack build" +
  (isNode ? " --target nodejs" : "") +
  (isRelease ? " --release" : "") +
  (isNode ? " --out-dir ./dist/node" : " --out-dir ./dist/browser") +
  " --out-name index ./wasm";

execSync(command, { stdio: "inherit" });

const npmPackage = await readFile(packageFileDir, "utf-8").then(JSON.parse);

npmPackage.main = "index.js";
npmPackage.module = "index.js";
npmPackage.name = isNode ? "xlsx-wasm-node" : "xlsx-wasm-browser";

await writeFile(packageFileDir, JSON.stringify(npmPackage, null, 2));
