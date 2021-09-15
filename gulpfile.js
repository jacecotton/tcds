/**
 * Dependencies.
 */

const gulp = require("gulp");
const { src, dest, series } = require("gulp");

// Content utilities
const markdown = require("gulp-markdown");
const map = require("map-stream");

// Script utilities
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const concat = require("gulp-concat");

// Style utilities
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleancss = require("gulp-clean-css");

// Image utilities
const imagemin = require("gulp-imagemin");
const svgmin = require("gulp-svgmin");

// Meta utilities
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
 
/**
 * Configuration.
 */
 
const path = "./public";

const config = {
  pages: {
    src: `./pages/**/*.md`,
    dest: `./views/pages/`,
  },

  export: {
    scripts: {
      src: [
        "./src/tcds/scripts/lib/*.js",
        "./src/tcds/scripts/components/*.js",
        "./src/tcds/scripts/**/*.js",
      ],
      dest: "./public/dist/tcds/",
    },

    styles: {
      src: "./src/tcds/styles/**/*.scss",
      dest: "./public/dist/tcds/",
    },

    icons: {
      src: "./src/tcds/icons/**/*",
      dest: {
        images: "./public/dist/tcds/images/icons/",
        templates: "./views/templates/icons/",
      },
    },
  },

  local: {
    scripts: {
      src: "./src/local/scripts/**/*.js",
      dest: "./public/scripts/",
    },

    styles: {
      src: "./src/local/styles/**/*.scss",
      dest: "./public/styles/",
    },

    images: {
      src: "./src/local/images/**/*",
      dest: "./public/images/",
    },

    icons: {
      // src not included here since it's part of the same task and
      // configuration as the export equivalent.
      dest: "./public/images/icons/",
    },
  },
};
 
/**
 * Tasks.
 */

const tasks = {
  pages: () => {
    return src(config.pages.src)
      // Transform markdown to HTML.
      .pipe(markdown())
      // Change file extension to .twig so it can be rendered.
      .pipe(rename((path) => {
        path.extname = ".twig";
      }))
      // Add compatibility for Twig syntax and template setup.
      .pipe(map(function(page, cb) {
        // Get contents of file as-is.
        let contents = page.contents.toString();

        // Set up special tokens.
        const tokens = {
          // For adding content to the base Twig template's lead block.
          lead: {
            open: "<lead>",
            close: "</lead>",
          },

          // For inserting arbitrary, non-escaped Twig code.
          twig: {
            open: "<twig>",
            close: "</twig>",
          },
        };

        // Set up Twig syntax delimiters for encoding.
        const twigSyntax = [
          {
            delimiter: "{%",
            escapePlaceholder: "__OPEN_STATEMENT__",
            encode: "&lcub;&percnt;",
          },
          {
            delimiter: "%}",
            escapePlaceholder: "__CLOSE_STATEMENT__",
            encode: "&percnt;&rcub;",
          },
          {
            delimiter: "{{",
            escapePlaceholder: "__OPEN_EXPRESSION__",
            encode: "&lcub;&lcub;",
          },
          {
            delimiter: "}}",
            escapePlaceholder: "__CLOSE_EXPRESSION__",
            encode: "&rcub;&rcub;",
          },
        ];

        function matchBetween(start, end, pattern = "(.*?)", modifier = "gs") {
          return new RegExp(start + pattern + end, modifier);
        }

        // If a lead exists...
        if(contents.includes(tokens.lead.open)) {
          // Get the content between the <lead> tags.
          var lead = contents.substring(contents.lastIndexOf(tokens.lead.open) + tokens.lead.open.length, contents.lastIndexOf(tokens.lead.close));

          // Remove it and the tags from the content (to be reinserted without
          // the tags later, now that we have `lead` as a variable).
          contents = contents.replace(matchBetween(tokens.lead.open, tokens.lead.close), "");
        }

        // If a <twig> tag exists...
        if(contents.includes(tokens.twig.open)) {
          // Get the content between <twig> tags (to be treated as arbitrary
          // Twig code). Returns an array of each <twig> block.
          const twigBlocks = contents.match(matchBetween(tokens.twig.open, tokens.twig.close)).map((result) => {
            // Remove the opening and closing <twig> tags from the result.
            result = result.replace(new RegExp(tokens.twig.open, "gs"), "");
            result = result.replace(new RegExp(tokens.twig.close, "gs"), "");
            return result;
          });

          // For <twig> code only, protect from escaping by substituting
          // delimiters with placeholders.
          twigBlocks.forEach((twigBlock) => {
            // Create a copy of the current Twig block.
            let twigBlockNoEscape = twigBlock;

            // For each token in the twig syntax store...
            twigSyntax.forEach((token) => {
              // Replace in the Twig code with its corresponding placeholder to
              // protect it from escaping (to happen later).
              twigBlockNoEscape = twigBlockNoEscape.replace(new RegExp(token.delimiter, "g"), token.escapePlaceholder);
            });

            // Replace the twig code with substituted code.
            contents = contents.replace(twigBlock, twigBlockNoEscape);
          });
        }

        // Now, escape all remaining Twig code (any Twig code not placed between
        // <twig> tags).
        twigSyntax.forEach((token) => {
          // Replace the token with its encoded counterpart.
          contents = contents.replace(new RegExp(token.delimiter, "g"), token.encode);
        });

        // If content contains protected Twig code, re-substitute the
        // placeholders now that unprotected Twig code has been encoded.
        contents.includes(tokens.twig.open) && twigSyntax.forEach((token) => {
          // Reversal of the above.
          contents = contents.replace(new RegExp(token.escapePlaceholder, "g"), token.delimiter);
        });

        // Content within any block-level HTML tags is ignored by the markdown
        // parser (even if not a real HTML tag), so we get content verbatim if
        // we place it between, for example, <twig></twig> tags. This allows us
        // to insert arbitrary Twig code from within the Markdown file. At this
        // point in the process, the Markdown has been transformed into HTML and
        // the file renamed with a .twig extension, so we can simply remove the
        // tags, leaving the inserted Twig code in-tact.
        contents = contents.replace(new RegExp(tokens.twig.open, "g"), "");
        contents = contents.replace(new RegExp(tokens.twig.close, "g"), "");

        // Here's where we set up what we want the final .twig file to look
        // like. First we'll extend the base template, then insert the lead
        // content into the lead block, and the body content into the body
        // block. We'll also leave a post-compile comment to ensure the .twig
        // files aren't edited directly.
        contents = `{# DO NOT EDIT. This file was compiled from Markdown; please edit the source .md
file and run the gulp process to compile (either \`gulp\` or \`npm run dev\` from
the terminal). #}
{% extends "templates/base.twig" %}
${lead ? `{% block lead %}${lead}{% endblock %}` : ""}
{% block body %}${contents}{% endblock %}`;

        // Replace old contents with new transformed contents.
        page.contents = new Buffer(contents);
        // Finish.
        cb(null, page);
      }))
      // Output to configured destination.
      .pipe(dest(config.pages.dest));
  },

  scripts: {
    export: () => {
      return src(config.export.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat("tcds.js"))
        .pipe(babel({
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  "chrome": "70",
                  "ie": "11",
                  "safari": "13",
                },
              },
            ],
          ],
        }))
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(dest(config.export.scripts.dest));
    },

    local: () => {
      return src(config.local.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat("main.js"))
        .pipe(babel({
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  "chrome": "70",
                  "ie": "11",
                  "safari": "13",
                },
              },
            ],
          ],
        }))
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(dest(config.local.scripts.dest));
    },
  },

  styles: {
    export: () => {
      return src(config.export.styles.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([
          autoprefixer({
            grid: "autoplace",
          }),
        ]))
        .pipe(cleancss({ level: 2 }, (details) => {
          console.log("clean-css stats:", details.stats);
        }))
        .pipe(sourcemaps.write("."))
        .pipe(dest(config.export.styles.dest));
    },

    local: () => {
      return src(config.local.styles.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([
          autoprefixer({
            grid: "autoplace",
          }),
        ]))
        .pipe(cleancss({ level: 2 }, (details) => {
          console.log("clean-css stats:", details.stats);
        }))
        .pipe(sourcemaps.write("."))
        .pipe(dest(config.local.styles.dest));
    },
  },

  images: {
    local: () => {
      return src(config.local.images.src)
        // Optimize images.
        .pipe(imagemin([
          imagemin.svgo({
            plugins: [
              {removeViewBox: false},
              {removeTitle: false},
              {inlineStyles: false},
            ],
          }),
        ]))
        // Output to configured destination.
        .pipe(dest(config.local.images.dest));
    },
  },

  icons: {
    export: () => {
      return src(config.export.icons.src)
        // Optimize icons.
        .pipe(imagemin([
          imagemin.svgo({
            plugins: [
              {removeViewBox: false},
              {removeTitle: false},
              {inlineStyles: false},
            ],
          }),
        ]))
        // Output to images directory as-is.
        .pipe(dest(config.export.icons.dest.images))
        .pipe(dest(config.local.icons.dest))
        // Convert to .twig file for icons to be includeable.
        .pipe(rename((path) => {
          path.extname = ".svg.twig";
        }))
        // Output to templates directory.
        .pipe(dest(config.export.icons.dest.templates));
    },
  },
};

gulp.task("pages", tasks.pages);
gulp.task("local:scripts", tasks.scripts.local);
gulp.task("export:scripts", tasks.scripts.export);
gulp.task("local:styles", tasks.styles.local);
gulp.task("export:styles", tasks.styles.export);
gulp.task("local:images", tasks.images.local);
gulp.task("export:icons", tasks.icons.export);

gulp.task("watch", function watch() {
  gulp.watch("./pages", tasks.pages);
  gulp.watch("./src/tcds/scripts/", tasks.scripts.export);
  gulp.watch("./src/tcds/styles/", tasks.styles.export);
  gulp.watch("./src/tcds/icons/", tasks.icons.export);
  gulp.watch("./src/local/scripts/", tasks.scripts.local);
  gulp.watch("./src/local/styles/", tasks.styles.local);
  gulp.watch("./src/local/images/", tasks.images.local);
});

gulp.task("default", series([
  "pages",
  "export:scripts",
  "export:styles",
  "export:icons",
  "local:scripts",
  "local:styles",
  "local:images",
  "watch"
]));