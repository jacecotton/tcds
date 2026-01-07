import {
  createEnvironment,
  createFilesystemLoader,
  createArrayLoader,
  createChainLoader,
  createFunction,
  createSource,
} from "twing";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

export default function (eleventyConfig) {
  // Passthrough copy for components
  // Maps root/components to _site/components
  eleventyConfig.addPassthroughCopy({"../components": "tcds/components"});
  eleventyConfig.addPassthroughCopy({"../dist": "tcds/dist"});

  // Twing Setup
  const fsLoader = createFilesystemLoader(fs);
  fsLoader.addPath("./src");
  // Add root/components with @tcds namespace
  fsLoader.addPath(path.resolve(DIRNAME, "../components"), "@tcds");

  // Custom TcdsLoader to intercept tcds: namespace
  const tcdsLoader = {
    resolve: (name, from) => {
      if (!name.startsWith("tcds:")) return Promise.resolve(null);
      const componentName = name.split(":")[1];
      const componentPath = path.resolve(DIRNAME, "../components", componentName);
      const templatePath = path.join(componentPath, `${componentName}.twig`);
      return Promise.resolve(fs.existsSync(templatePath) ? templatePath : null);
    },
    exists: (name) => {
      if (!name.startsWith("tcds:")) return Promise.resolve(false);
      const componentName = name.split(":")[1];
      const componentPath = path.resolve(DIRNAME, "../components", componentName);
      return Promise.resolve(fs.existsSync(path.join(componentPath, `${componentName}.twig`)));
    },
    getSource: (name) => {
      if (!name.startsWith("tcds:")) return Promise.resolve(null);
      const componentName = name.split(":")[1];
      const componentPath = path.resolve(DIRNAME, "../components", componentName);
      const templatePath = path.join(componentPath, `${componentName}.twig`);
      const source = fs.readFileSync(templatePath, "utf-8");
      // Prepend asset registration
      return Promise.resolve(createSource(name, `{{ _tcds_assets('${componentName}') }}${source}`));
    },
    getSourceContext: (name) => {
      if (!name.startsWith("tcds:")) return Promise.resolve(null);
      const componentName = name.split(":")[1];
      const componentPath = path.resolve(DIRNAME, "../components", componentName);
      const templatePath = path.join(componentPath, `${componentName}.twig`);
      const source = fs.readFileSync(templatePath, "utf-8");
      // Prepend asset registration
      return Promise.resolve(createSource(name, `{{ _tcds_assets('${componentName}') }}${source}`));
    },
    getCacheKey: (name) => name,
    isFresh: (name, time) => {
      if (!name.startsWith("tcds:")) return Promise.resolve(false);
      const componentName = name.split(":")[1];
      const componentPath = path.resolve(DIRNAME, "../components", componentName);
      const templatePath = path.join(componentPath, `${componentName}.twig`);
      const stats = fs.statSync(templatePath);
      return Promise.resolve(stats.mtimeMs <= time);
    }
  };

  const arrayLoader = createArrayLoader({});
  // Add tcdsLoader to the chain
  const loader = createChainLoader([arrayLoader, tcdsLoader, fsLoader]);

  const twing = createEnvironment(loader, {cache: false, auto_reload: true});

  // Asset Store: Map<PageUrl, Set<AssetPath>>
  const pageAssets = new Map();

  // Helper to get page URL from context
  const getPageUrl = (context) => {
    // context might be a Map or an object
    let page;
    if (context instanceof Map) {
      page = context.get("page");
    } else {
      page = context["page"];
    }

    if (page) {
      return page.url || page.filePathStem;
    }
    return "global";
  };

  // Internal function to register assets
  const registerAssetsFunc = createFunction(
    "_tcds_assets",
    (executionContext, componentName) => {
      const context = executionContext.context;
      const name = componentName;
      const componentPath = path.resolve(DIRNAME, "../components", name);
      const componentYml = path.join(componentPath, `${name}.component.yml`);

      if (fs.existsSync(componentYml)) {
        const pageUrl = getPageUrl(context);
        if (!pageAssets.has(pageUrl)) {
          pageAssets.set(pageUrl, new Set());
        }
        const assets = pageAssets.get(pageUrl);

        // Check for CSS
        if (fs.existsSync(path.join(componentPath, `${name}.css`))) {
          assets.add(`/tcds/components/${name}/${name}.css`);
        }
        // Check for JS
        if (fs.existsSync(path.join(componentPath, `${name}.js`))) {
          assets.add(`/tcds/components/${name}/${name}.js`);
        }
      }
      return Promise.resolve("");
    },
    [{name: "componentName"}],
    {needs_context: true}
  );

  twing.addFunction(registerAssetsFunc);

  // Include Function (Wrapper for backward compatibility)
  const includeFunc = createFunction(
    "include",
    (executionContext, componentName, data = {}) => {
      // If it's a tcds: component, the loader will handle it
      return twing.render(componentName, data);
    },
    [{name: "componentName"}, {name: "data", defaultValue: {}}],
    {needs_context: false, is_safe: ["html"]},
  );

  twing.addFunction(includeFunc);

  // Get Assets Function (for layout)
  const getAssetsFunc = createFunction(
    "get_assets",
    executionContext => {
      const context = executionContext.context;
      const pageUrl = getPageUrl(context);
      const assets = pageAssets.get(pageUrl) || new Set();
      return Promise.resolve(Array.from(assets));
    },
    [],
    {needs_context: true},
  );

  twing.addFunction(getAssetsFunc);

  // Eleventy Extension for .twig
  eleventyConfig.addExtension("twig", {
    outputFileExtension: "html",
    compile: async (inputContent, inputPath) => {
      return async data => {
        // Register the template content in the array loader
        // Use inputPath as the key
        // Read file directly from disk to avoid stale content from Eleventy
        const diskContent = fs.readFileSync(inputPath, "utf-8");
        // Strip front matter
        const contentWithoutFrontMatter = diskContent.replace(/^---\n[\s\S]*?\n---\n/, "");
        arrayLoader.setTemplate(inputPath, contentWithoutFrontMatter);
        return twing.render(inputPath, data);
      };
    },
  });

  eleventyConfig.addWatchTarget("./src/**/*.md");

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    markdownTemplateEngine: "twig",
  };
};
