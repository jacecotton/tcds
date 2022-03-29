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

// General utilities
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";

/**
 * Configuration.
 */

const inputPath = "./src";
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

  components: {
    src: `${inputPath}/components/**/*.twig`,
    dest: `${outputPath}/components/`,
  },

  icons: {
    src: `${inputPath}/icons/**/*.svg`,
    dest: `${outputPath}/icons/`,
  },
};

/**
 * Define tasks.
 */

const tasks = {
  styles: () => {
    return src(config.styles.src)
      // Start sourcemap input.
      .pipe(sourcemaps.init())
      // Preprocessing (Sass).
      .pipe(sass({
        outputStyle: "compressed",
      }).on("error", sass.logError))
      // Post-processing (PostCSS).
      .pipe(postcss([
        autoprefixer({
          grid: "autoplace",
        }),
      ]))
      // Write sourcemaps.
      .pipe(sourcemaps.write("."))
      // Output to destination folder.
      .pipe(dest(config.styles.dest));
  },

  scripts: () => {
    return src(config.scripts.src)
      // Start sourcemap input.
      .pipe(sourcemaps.init())
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
      // Write sourcemaps.
      .pipe(sourcemaps.write("."))
      // Output to destination folder.
      .pipe(dest(config.scripts.dest));
  },

  components: () => {
    return src(config.components.src)
      // Simply output unmodified template files to destination folder.
      .pipe(dest(config.components.dest));
  },

  icons: () => {
    return src(config.icons.src)
      // File optimization.
      .pipe(imagemin())
      // Output to destination folder.
      .pipe(dest(config.icons.dest))
      // Create copies with `.twig` extension for use in templating.
      .pipe(rename((path) => {
        path.extname = ".svg.twig";
      }))
      // Output to destination folder.
      .pipe(dest(config.icons.dest));
  },
};

/**
 * Register tasks.
 */

task("styles", tasks.styles);
task("scripts", tasks.scripts);
task("components", tasks.components);
task("icons", tasks.icons);

task("watch", function watcher() {
  watch(`${inputPath}/styles/`, tasks.styles);
  watch(`${inputPath}/scripts/`, tasks.scripts);
  watch(`${inputPath}/components/`, tasks.components);
  watch(`${inputPath}/icons/`, tasks.icons);
});

task("default", series(["styles", "scripts", "components", "icons", "watch"]));
