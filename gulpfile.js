/**
 * Dependencies.
 */

import gulp from "gulp";
const { task, watch, src, dest, series } = gulp;
import { join, resolve } from "path";

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

  fonts: {
    src: `${inputPath}/fonts/**/*`,
    dest: `${outputPath}/fonts/`,
  },

  images: {
    src: `${inputPath}/images/**/*`,
    dest: `${outputPath}/images/`,
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
      .pipe(postcss([autoprefixer()]))
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
        resolve: {
          alias: {
            // This will make JavaScript module imports that begin with "@tcds"
            // look inside the TCDS package.
            "@tcds": resolve(join(), "./assets/scripts/"),
          },
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

  fonts: () => {
    return src(config.fonts.src)
      .pipe(dest(config.fonts.dest));
  },

  images: () => {
    return src(config.images.src)
      .pipe(imagemin())
      .pipe(dest(config.images.dest));
  },
};

/**
 * Register tasks.
 */

task("styles", tasks.styles);
task("scripts", tasks.scripts);
task("icons", tasks.icons);
task("fonts", tasks.fonts);
task("images", tasks.images);

task("watch", function watcher() {
  watch(`${inputPath}/styles/`, tasks.styles);
  watch(`${inputPath}/scripts/`, tasks.scripts);
  watch(`${inputPath}/icons/`, tasks.icons);
  watch(`${inputPath}/fonts`, tasks.fonts);
  watch(`${inputPath}/images/`, tasks.images);
});

task("build", series(["styles", "scripts", "icons", "fonts", "images"]));
task("default", series(["build", "watch"]));
