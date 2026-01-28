import fs from "fs";
import path from "path";
import {
  createEnvironment,
  createFilesystemLoader,
  createArrayLoader,
  createChainLoader,
  createFunction,
  createFilter,
  createSource,
} from "twing";
import {highlight} from "sugar-high";

/**
 * Configure Twing for Eleventy with custom asset loading and component resolution.
 *
 * @param {object} eleventyConfig - The Eleventy configuration object.
 * @param {string} projectRoot - The absolute path to the project root.
 * @returns {object} The Twing environment instance.
 */
export default function configureTwing(eleventyConfig, projectRoot) {
  const DIRNAME = path.dirname(projectRoot); // e.g. /path/to/docs/
  const fsLoader = createFilesystemLoader(fs);

  // Add the src directory to the filesystem loader for standard relative includes.
  fsLoader.addPath("./src");

  const COMPONENTS_NAMESPACE = "tcds:";
  const COMPONENTS_PATH = "../components";

  /**
   * Helper to resolve component paths from the `tcds:` namespace.
   *
   * @param {string} name - The component name (e.g. `tcds:button`).
   * @returns {object|null} Object containing component metadata or null if not in namespace.
   */
  const getComponentMeta = name => {
    if (!name.startsWith(COMPONENTS_NAMESPACE)) return null;

    const componentName = name.split(":")[1];
    const componentPath = path.resolve(DIRNAME, COMPONENTS_PATH, componentName);
    const templatePath = path.join(componentPath, `${componentName}.twig`);

    return {
      name: componentName,
      path: componentPath,
      template: templatePath,
    };
  };

  /**
   * Helper to safely extract the page object from the Twing context.
   * Twing context can be a Map (Twing 5+) or a plain object depending on internal state.
   *
   * @param {object} context - The Twing execution context.
   * @returns {object} The page object (or empty object if not found).
   */
  const getPageFromContext = context => {
    if (typeof context.get === "function") {
      return context.get("page") || {};
    }
    return context["page"] || {};
  };

  /**
   * Helper to get a unique key for the current page (URL or file path).
   *
   * @param {object} context - The Twing execution context.
   * @returns {string} The page URL or file path stem.
   */
  const getPageKey = context => {
    const page = getPageFromContext(context);
    return page.url || page.filePathStem || "global";
  };

  /**
   * Custom loader to intercept `tcds:` namespace references.
   *
   * Enables the usage of Drupal SDC-style components (e.g. `{% include 'tcds:card' %}`).
   * When a component is loaded via this namespace, we automatically inject an asset
   * registration call `{{ _tcds_assets(...) }}` at the beginning of the template.
   */
  const tcdsLoader = {
    /**
     * Resolve the template path.
     * @param {string} name - Template name.
     * @param {string} from - Source template path.
     * @returns {Promise<string|null>} Absolute path to the template or null.
     */
    resolve: (name, from) => {
      const meta = getComponentMeta(name);
      if (!meta || !fs.existsSync(meta.template)) return Promise.resolve(null);
      return Promise.resolve(meta.template);
    },

    /**
     * Check if a template exists.
     * @param {string} name - Template name.
     * @returns {Promise<boolean>} True if exists, false otherwise.
     */
    exists: name => {
      const meta = getComponentMeta(name);
      return Promise.resolve(!!meta && fs.existsSync(meta.template));
    },

    /**
     * Get the source of the template.
     * Injects the `_tcds_assets` function call to register component assets.
     *
     * @param {string} name - Template name.
     * @returns {Promise<object>} TwingSource object.
     */
    getSource: name => {
      const meta = getComponentMeta(name);
      if (!meta) return Promise.resolve(null);

      const source = fs.readFileSync(meta.template, "utf-8");
      // Prepend asset registration to the source
      return Promise.resolve(createSource(name, `{{ _tcds_assets('${meta.name}') }}${source}`));
    },

    /**
     * Context-aware source retrieval (required by Twing interface).
     * Delegates to getSource as logic is identical.
     */
    getSourceContext: name => {
      const meta = getComponentMeta(name);
      if (!meta) return Promise.resolve(null);

      const source = fs.readFileSync(meta.template, "utf-8");
      return Promise.resolve(createSource(name, `{{ _tcds_assets('${meta.name}') }}${source}`));
    },

    /**
     * Return the cache key.
     * We use the name as-is (e.g. `tcds:button`) because the content is modified
     * (assets injected) compared to the raw file, so it needs a unique cache entry.
     */
    getCacheKey: name => name,

    /**
     * Check if the cached template is fresh (not modified).
     * @param {string} name - Template name.
     * @param {number} time - Timestamp to check against.
     * @returns {Promise<boolean>} True if fresh.
     */
    isFresh: (name, time) => {
      const meta = getComponentMeta(name);
      if (!meta) return Promise.resolve(false);

      try {
        const stats = fs.statSync(meta.template);
        return Promise.resolve(stats.mtimeMs <= time);
      } catch (e) {
        return Promise.resolve(false);
      }
    },
  };

  // Chain loaders:
  // 1. ArrayLoader (for in-memory templates like the main page being rendered)
  // 2. TcdsLoader (for `tcds:` components)
  // 3. FilesystemLoader (for standard relative includes)
  const arrayLoader = createArrayLoader({});
  const loader = createChainLoader([arrayLoader, tcdsLoader, fsLoader]);
  const twing = createEnvironment(loader, {cache: false, auto_reload: true});

  /**
   * Asset Store: Map<PageKey, Set<AssetPath>>
   * Stores the list of CSS/JS assets required for each page.
   */
  const pageAssets = new Map();

  /**
   * Helper to register assets for a component.
   *
   * @param {object} context - Twing context.
   * @param {string} componentName - Name of the component (without namespace).
   */
  const registerComponentAssets = (context, componentName) => {
    const componentPath = path.resolve(DIRNAME, COMPONENTS_PATH, componentName);
    const componentYml = path.join(componentPath, `${componentName}.component.yml`);

    // Only register assets if the component seems valid
    if (fs.existsSync(componentYml)) {
      const pageKey = getPageKey(context);

      if (!pageAssets.has(pageKey)) {
        pageAssets.set(pageKey, new Set());
      }
      const assets = pageAssets.get(pageKey);

      // Check for and register CSS
      if (fs.existsSync(path.join(componentPath, `${componentName}.css`))) {
        assets.add(`/tcds/components/${componentName}/${componentName}.css`);
      }
      // Check for and register JS
      if (fs.existsSync(path.join(componentPath, `${componentName}.js`))) {
        assets.add(`/tcds/components/${componentName}/${componentName}.js`);
      }
    }
  };

  /**
   * Internal function to register assets for a component.
   * Called automatically by the injected `{{ _tcds_assets(...) }}` tag.
   */
  const registerAssetsFunc = createFunction(
    "_tcds_assets",
    (executionContext, componentName) => {
      registerComponentAssets(executionContext.context, componentName);
      return Promise.resolve("");
    },
    [{name: "componentName"}],
    {needs_context: true},
  );

  twing.addFunction(registerAssetsFunc);

  /**
   * Public function to attach a component's assets without rendering it.
   *
   * @example {{ attach_library('tcds:accordion') }}
   */
  const attachLibraryFunc = createFunction(
    "attach_library",
    (executionContext, componentName) => {
      // Strip namespace if present to match internal component name format
      if (componentName.startsWith(COMPONENTS_NAMESPACE)) {
        componentName = componentName.replace(COMPONENTS_NAMESPACE, "");
      }

      registerComponentAssets(executionContext.context, componentName);
      return Promise.resolve("");
    },
    [{name: "componentName"}],
    {needs_context: true},
  );

  twing.addFunction(attachLibraryFunc);

  /**
   * Custom `include` function.
   * Wraps Twing's native behavior to support relative paths from the current template,
   * falling back to standard resolution.
   *
   * @param {string} componentName - The path or name of the component to include.
   * @param {object} data - Data to pass to the included template.
   */
  const includeFunc = createFunction(
    "include",
    (executionContext, componentName, data = {}) => {
      // If it's a relative path, resolve it relative to the current page.
      if (componentName.startsWith("./") || componentName.startsWith("../")) {
        const context = executionContext.context;
        const page = getPageFromContext(context);

        if (page.inputPath) {
          const currentDir = path.dirname(page.inputPath);
          const absolutePath = path.resolve(currentDir, componentName);
          // Re-calculate path relative to 'src' so the FilesystemLoader can find it
          componentName = path.relative("src", absolutePath);
        }
      }

      return twing.render(componentName, data);
    },
    [{name: "componentName"}, {name: "data", defaultValue: {}}],
    {needs_context: true, is_safe: ["html"]},
  );

  twing.addFunction(includeFunc);

  /**
   * Function to retrieve all registered assets for the current page.
   * Used in the base layout to output <link> and <script> tags.
   */
  const getAssetsFunc = createFunction(
    "get_assets",
    executionContext => {
      const context = executionContext.context;
      const pageKey = getPageKey(context);
      // Combine assets for the specific page and any global assets (if we had them)
      const assets = new Set([...(pageAssets.get(pageKey) || []), ...(pageAssets.get("global") || [])]);
      return Promise.resolve(Array.from(assets));
    },
    [],
    {needs_context: true},
  );

  twing.addFunction(getAssetsFunc);

  /**
   * Filter to clean a string for use as a class name.
   * "Mimics" Drupal's clean_class:
   * - Lowercase
   * - Replace non-alphanumeric characters with hyphens
   * - Remove multiple hyphens (handled by the regex + replace)
   * - Trim leading/trailing hyphens
   */
  const cleanClassFilter = createFilter(
    "clean_class",
    (context, input) => {
      if (!input) return Promise.resolve("");
      const cleaned = input
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return Promise.resolve(cleaned);
    },
    [],
    {needs_context: true},
  );

  twing.addFilter(cleanClassFilter);

  /**
   * Filter to highlight code using Sugar High.
   */
  const highlightFilter = createFilter(
    "highlight",
    (_, input) => {
      if (!input) return Promise.resolve("");
      return Promise.resolve(highlight(input));
    },
    [],
    {is_safe: ["html"]},
  );

  twing.addFilter(highlightFilter);

  // ---------------------------------------------------------------------------
  // Eleventy Extension
  // ---------------------------------------------------------------------------

  eleventyConfig.addExtension("twig", {
    outputFileExtension: "html",
    compile: async (inputContent, inputPath) => {
      return async data => {
        // 1. Register the raw template content in the ArrayLoader.
        // We read from disk to ensure we have the fresh content (bypassing Eleventy's potential caching of the input string).
        const diskContent = fs.readFileSync(inputPath, "utf-8");
        // Strip front matter strings (Eleventy handles front matter separately, Twing just wants logic)
        const contentWithoutFrontMatter = diskContent.replace(/^---\n[\s\S]*?\n---\n/, "");
        arrayLoader.setTemplate(inputPath, contentWithoutFrontMatter);

        // 2. Clear previous assets for this page to prevent stale entries on re-renders.
        const pageKey = data.page.url || data.page.filePathStem;
        // Only clear if we are rendering the *main* template, not a layout wrapping it.
        // We identify the main template by checking if the inputPath matches the page's inputPath.
        const isMainTemplate =
          inputPath === data.page.inputPath || inputPath.endsWith(data.page.inputPath.replace(/^\.\//, ""));

        if (isMainTemplate) {
          if (pageAssets.has(pageKey)) {
            pageAssets.delete(pageKey);
          }
        }

        // 3. "Dry Run" Render
        // We render the template once primarily to execute the `_tcds_assets` hooks
        // and populate the `pageAssets` map. The output is discarded.
        // This ensures that when the layout (which wraps this content) calls `get_assets`,
        // the assets are already known.
        try {
          await twing.render(inputPath, data);
        } catch (e) {
          // Swallow errors during dry run; real errors will surface in the final render.
          console.error("Error during asset dry run:", e);
        }

        // 4. Final Render
        return twing.render(inputPath, data);
      };
    },
  });

  return twing;
}
