/**
 * Dependencies.
 */

const gulp = require("gulp");
const { src, dest, series } = require("gulp");

// Script utilities
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const concat = require("gulp-concat");

// Style utilities
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");

// Image utilities
const imagemin = require("gulp-imagemin");

// Miscellaneous
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");

/**
 * Configuration.
 */

const path = "./public";

const config = {
  scripts: {
    src: [
      `${path}/src/scripts/*.js`,
      `${path}/src/scripts/**/*.js`,
    ],
    dest: `${path}/dist/scripts/`,
  },

  styles: {
    src: `${path}/src/styles/**/*.scss`,
    dest: `${path}/dist/styles/`,
  },

  images: {
    src: `${path}/src/images/**/*`,
    dest: `${path}/dist/images/`,
  },

  icons: {
    src: `${path}/src/icons/**/*.svg`,
    dest: `./views/icons/`,
  },
};

/**
 * Tasks.
 */

const tasks = {
  scripts: () => {
    return src(config.scripts.src)
      .pipe(sourcemaps.init())
      .pipe(concat("tcds.js"))
      .pipe(babel())
      .pipe(terser())
      .pipe(sourcemaps.write("."))
      .pipe(dest(config.scripts.dest));
  },

  styles: () => {
    return src(config.styles.src)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: "compressed",
      }))
      .pipe(postcss([
        autoprefixer({
          grid: "autoplace",
        }),
      ]))
      .pipe(cleancss({ level: 2 }, (details) => {
        console.log("clean-css stats:", details.stats);
      }))
      .pipe(sourcemaps.write("."))
      .pipe(dest(config.styles.dest));
  },

  images: () => {
    return src(config.images.src)
      .pipe(imagemin())
      .pipe(dest(config.images.dest));
  },

  icons: () => {
    return src(config.icons.src)
      .pipe(imagemin([
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
            },
          ],
        }),
      ]))
      .pipe(rename((path) => {
        path.extname = ".svg.twig";
      }))
      .pipe(dest(config.icons.dest));
  },
};

gulp.task("scripts", tasks.scripts);
gulp.task("styles", tasks.styles);
gulp.task("images", tasks.images);
gulp.task("icons", tasks.icons);

gulp.task("watch", function watch() {
  gulp.watch(`${path}/src/scripts/`, tasks.scripts);
  gulp.watch(`${path}/src/styles/`, tasks.styles);
  gulp.watch(`${path}/src/images/`, tasks.images);
  gulp.watch(`${path}/src/icons/`, tasks.icons);
});

gulp.task("default", series(["scripts", "styles", "images", "icons", "watch"]));