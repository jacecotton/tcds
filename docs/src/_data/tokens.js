import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getFiles(dir) {
  const dirents = fs.readdirSync(dir, {withFileTypes: true});
  const files = dirents.map(dirent => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

export default function () {
  const tokensDir = path.resolve(__dirname, "../../../src/tokens");
  const tokenFiles = getFiles(tokensDir).filter(file => file.endsWith(".json"));

  const tokens = {};

  tokenFiles.forEach(file => {
    try {
      const content = JSON.parse(fs.readFileSync(file, "utf-8"));
      // Simple top-level merge
      Object.assign(tokens, content);
    } catch (e) {
      console.warn(`[tokens] Failed to parse ${file}:`, e.message);
    }
  });

  return tokens;
}
