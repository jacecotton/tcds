/**
 * Dependencies.
 */

import gulp from "gulp";
const { task, watch, src, dest, series } = gulp;

// Script utilities
import webpack from "webpack-stream";

// Style utilities
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

// Image utilities
import imagemin from "gulp-imagemin";

// Miscellaneous utilities
import rename from "gulp-rename";

/**
 * Configuration.
 */

const inputPath = "./assets";
const outputPath = "./dist";

const config = {
  styles: {
    src: `${inputPath}/styles/@tcds/**/*.scss`,
    dest: `${outputPath}/styles/`,
  },

  scripts: {
    src: `${inputPath}/scripts/index.js`,
    dest: `${outputPath}/scripts/`,
  },

  icons: {
    src: `${inputPath}/icons/**/*.svg`,
    dest: {
      images: `${outputPath}/icons/`,
      templates: `${inputPath}/templates/icons/`,
    },
  },
};

/**
 * Define tasks.
 */

const tasks = {
  styles: () => {
    return src(config.styles.src)
      // Preprocessing (Sass).
      .pipe(sass({
        outputStyle: "compressed",
        includePaths: [`${inputPath}/styles`],
      }).on("error", sass.logError))
      // Post-processing (PostCSS).
      .pipe(postcss([
        autoprefixer({
          grid: "autoplace",
        }),
      ]))
      // Output to destination folder.
      .pipe(dest(config.styles.dest));
  },

  scripts: () => {
    return src(config.scripts.src)
      // Module bundling.
      .pipe(webpack({
        entry: config.scripts.src,
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: [
                // Use Babel for transpiling to older syntax.
                {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env"],
                  },
                },
              ],
            },
          ],
        },
        output: {
          filename: "tcds.js",
        },
      }))
      // Output to destination folder.
      .pipe(dest(config.scripts.dest));
  },

  icons: () => {
    return src(config.icons.src)
      // File optimization.
      .pipe(imagemin())
      // Output to destination folder.
      .pipe(dest(config.icons.dest.images))
      // Convert to Twig template for transclusion.
      .pipe(rename((path) => {
        path.extname = ".svg.twig";
      }))
      // Output to source directory.
      .pipe(dest(config.icons.dest.templates));
  },
};

/**
 * Register tasks.
 */

task("styles", tasks.styles);
task("scripts", tasks.scripts);
task("icons", tasks.icons);

task("watch", function watcher() {
  watch(`${inputPath}/styles/`, tasks.styles);
  watch(`${inputPath}/scripts/`, tasks.scripts);
  watch(`${inputPath}/icons/`, tasks.icons);
});

task("build", series(["styles", "scripts", "icons"]));
task("default", series(["build", "watch"]));
