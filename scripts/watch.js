import chokidar from "chokidar";
import {execSync} from "child_process";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Debounce function to prevent multiple aggregations in rapid succession
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const runAggregation = debounce(() => {
  try {
    console.log("\n👀 Change detected in package dist. Running aggregation...");
    execSync("node scripts/aggregate-dist.js", {
      stdio: "inherit",
      cwd: ROOT,
    });
  } catch (error) {
    console.error("❌ Aggregation failed:", error.message);
  }
}, 200);

// Watch package roots instead of dist directly (since dist might not exist yet)
const watchPatterns = [
  path.join(ROOT, "packages/components"),
  path.join(ROOT, "packages/foundation"),
  path.join(ROOT, "packages/identity"),
];

console.log(`🔭 Starting watcher on package roots:`);
watchPatterns.forEach(p => console.log(`   - ${p}`));

const watcher = chokidar.watch(watchPatterns, {
  ignoreInitial: true,
  ignored: [
    "**/node_modules/**",
    "**/src/**", // Ignore src changes (handled by package tools)
    "**/*.map",
    "**/.DS_Store",
  ],
});

watcher.on("ready", () => {
  console.log("✅ Watcher is ready and scanning.");
  const watched = watcher.getWatched();
  console.log(`   Currently watching ${Object.keys(watched).length} directories.`);
});

watcher.on("all", (event, filePath) => {
  // Only react to changes in dist folders
  if (filePath.includes("/dist/")) {
    // console.log(`[${event}] ${path.relative(ROOT, filePath)}`);
    runAggregation();
  }
});
