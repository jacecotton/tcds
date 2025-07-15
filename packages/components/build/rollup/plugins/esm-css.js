/**
 * This rollup plugin is a polyfill for ESM imports with CSS type assertions,
 * allowing JS modules to import CSS modules as `CSSStyleSheet` objects that can
 * be adopted as constructed stylesheets.
 *
 * Of course, this doesn't extend network functionality, but rather inlines the
 * CSS text of the imported file as a constructed stylesheet.
 *
 * It starts by changing `import ... with {type: "css"}` to `import ...`, so
 * that rollup will bring the text on disk into the importer file. Then, we're
 * instantiating a `new CSSStyleSheet`, and inserting the CSS text with
 * `replaceSync`, then assigning the module reference to that `CSSStyleSheet`.
 *
 * As of July 2025, this feature is not natively widely available across
 * browsers. Chromium has shipped it, but still only as of very recent versions.
 * Firefox has marked it "worth prototyping" with no set priority since 4 years
 * ago (see https://bugzilla.mozilla.org/show_bug.cgi?id=1720570). Same for
 * Safari (see https://bugs.webkit.org/show_bug.cgi?id=227967).
 */

import fs from "fs";
import path from "path";
import {createHash} from "crypto";

export default () => {
  return {
    name: "rollup-plugin-esm-css",

    // Step 1: Transform CSS import assertions into regular imports, so that
    // rollup will handle the importing.
    transform(code, id) {
      if(!id.endsWith(".js")) {
        return null;
      }

      const rewritten = code.replace(
        /import\s+(.+?)\s+from\s+(['"].+?\.css['"])\s+with\s+\{\s*type\s*:\s*['"]css['"]\s*\}/g,
        `import $1 from $2;`
      );

      return rewritten === code ? null : {code: rewritten, map: null};
    },

    // Step 2: Resolve the import's absolute path.
    async resolveId(importee, importer) {
      if(!importee.endsWith(".css") || !importer) {
        return null;
      }

      const resolved = await this.resolve(importee, importer, {skipSelf: true});

      return resolved ? resolved.id : path.resolve(path.dirname(importer), importee);
    },

    // Step 3: Load the CSS text from disk.
    load(id) {
      if(!id.endsWith(".css")) {
        return null;
      }

      return fs.readFileSync(id, "utf8");
    },

    // Step 4: Turn that CSS text into a constructable stylesheet.
    transform(code, id) {
      if(!id.endsWith(".css")) {
        return null;
      }

      code = JSON.stringify(code);
      const sheet = `sheet_${createHash("md5").update(id).digest("hex").slice(0, 7)}`;

      return {
        code: `
          const ${sheet} = new CSSStyleSheet();
          ${sheet}.replaceSync(${JSON.stringify(code)});
          export default ${sheet};
        `.trim(),

        map: {mappings: ""},
      };
    },
  };
};
