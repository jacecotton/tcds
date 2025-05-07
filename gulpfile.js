import gulp from "gulp";
const {task, watch, src, dest, series} = gulp;

// JavaScript utilities
import webpack from "webpack-stream";

// CSS utilities
import postcss from "gulp-postcss";
import custommedia from "postcss-custom-media";
import autoprefixer from "autoprefixer";
import * as dartsass from "sass";
import gulpsass from "gulp-sass";
import jsonsass from "node-sass-json-importer";
const sass = gulpsass(dartsass);

// Image utilities
import imagemin from "gulp-imagemin";
import iconfont from "gulp-iconfont";

// File utilities
import fs from "fs";
import map from "map-stream";
import rename from "gulp-rename";
import zip from "gulp-zip";
import {deleteAsync} from "del";

const tasks = {
  // Delete any gulp artifacts before recreating them.
  cleanup: () => deleteAsync(["./dist", "./src/00-brand/icons/icons.json"]),

  styles: () => {
    return src("./index.scss")
      .pipe(
        sass({
          outputStyle: "compressed",
          // Allow Sass files to import data from JSON files.
          importer: jsonsass(),
        }),
      )
      .on("error", sass.logError)
      // Transpile custom media queries due to lack of browser support.
      .pipe(postcss([autoprefixer(), custommedia()]))
      .pipe(rename("tcds.css"))
      .pipe(dest("./dist/"));
  },

  javascript: () => {
    return src("./index.js")
      .pipe(webpack({
        entry: {
          "index": "./index.js",
          "accordion": {import: "./src/02-components/accordion/index.js", dependOn: ["utilities", "lit"]},
          "accordion-section": {import: "./src/02-components/accordion/section/index.js", dependOn: ["utilities", "lit"]},
          "alert-bar": {import: "./src/02-components/alert-bar/index.js", dependOn: ["utilities", "lit"]},
          "card": {import: "./src/02-components/card/index.js", dependOn: ["utilities", "lit"]},
          "carousel": {import: "./src/02-components/carousel/index.js", dependOn: ["utilities", "lit"]},
          "slide": {import: "./src/02-components/carousel/slide/index.js", dependOn: ["utilities", "lit"]},
          "dialog": {import: "./src/02-components/dialog/index.js", dependOn: ["utilities", "lit"]},
          "fn-ref": {import: "./src/02-components/footnote/fn-ref/index.js", dependOn: ["utilities", "lit"]},
          "fn-list": {import: "./src/02-components/footnote/fn-list/index.js", dependOn: ["utilities", "lit"]},
          "tabs": {import: "./src/02-components/tabs/index.js", dependOn: ["utilities", "lit"]},
          "tab": {import: "./src/02-components/tabs/tab/index.js", dependOn: ["utilities", "lit"]},
          "icon": {import: "./src/02-components/icon/index.js", dependOn: ["utilities", "lit"]},
          "section": {import: "./src/02-components/section/index.js", dependOn: ["utilities", "lit"]},
          "site-header": {import: "./src/02-components/site-header/index.js", dependOn: ["utilities", "lit"]},
          "side-menu": {import: "./src/02-components/submenu/side-menu.js", dependOn: ["utilities", "lit"]},

          "utilities": [
            "./src/02-components/utilities/declarative.js",
            "./src/02-components/utilities/baseStyles.js",
            "./src/02-components/utilities/refreshProperties.js",
            "./src/02-components/utilities/registerParts.js",
            "./src/02-components/utilities/slugify.js",
          ],

          "lit": "./node_modules/lit",
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: [
                {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env"],
                  },
                },
              ],
            },
            {
              test: /\.css$/i,
              use: [
                "constructable-style-loader",
                {
                  loader: "postcss-loader",
                  options: {
                    postcssOptions: {
                      plugins: [
                        "postcss-preset-env",
                        "postcss-nesting",
                      ],
                    },
                  },
                },
              ],
            },
          ],
        },
        output: {
          filename: "[name].js",
        },
        optimization: {
          runtimeChunk: "single",
        },
      }))
      .pipe(dest("./dist/"));
  },

  fonts: () => {
    return src("./src/00-brand/typography/fonts/static/**/*", {encoding: false})
      .pipe(dest("./dist/fonts/"));
  },

  logos: () => {
    return src("./src/00-brand/logos/**/*.svg")
      .pipe(imagemin())
      .pipe(dest("./dist/logos/"));
  },
};

task("cleanup", tasks.cleanup);
task("styles", tasks.styles);
task("javascript", tasks.javascript);
// task("icons", tasks.icons);
task("fonts", tasks.fonts);
task("logos", tasks.logos);

task("icon-cleanup", () => {
  return src("./src/00-brand/icons/static/primary/*.svg")
    .pipe(map((svg, callback) => {
      let contents = svg.contents.toString();

      console.log("Stripping xml meta...");
      contents = contents.replace(`<?xml version="1.0" encoding="UTF-8"?>\n`, "");

      console.log("Stripping [data-name] attributes...");
      contents = contents.replace(/ data-name=\"(.*?)\"/g, "");

      console.log("Stripping [id] attributes...");
      contents = contents.replace(/ id=\"(.*?)\"/g, "");

      console.log("Stripping [version] attributes...");
      contents = contents.replace(/ version=\"(.*?)\"/g, "");

      console.log("Stripping <defs>...");
      contents = contents.replace(/<defs>((.|\n)*?)<\/defs>/g, "");

      console.log("Stripping [class] attributes...");
      contents = contents.replace(/ class=\"(.*?)\"/g, "");

      console.log("Adding [fill=currentcolor] attribute...");
      contents = contents.replace(/1024">/g, `1024" fill="currentcolor">`);

      console.log("Removing empty newlines...");
      contents = contents.replace(/(^[ \t]*\n)/gm, "");

      svg.contents = new Buffer(contents);
      console.log("Replaced file buffer contents.");

      callback(null, svg);
    }))
    .pipe(dest("./src/00-brand/icons/static/primary/"));
});

task("watch", function watcher(done) {
  watch("./src/**/*.scss", tasks.styles);
  watch(["./index.js", "./src/02-components/**/*.js"], tasks.javascript);
  watch("./src/00-brand/typography/fonts/static/", tasks.fonts);
  watch("./src/00-brand/logos/**/*.svg", tasks.logos);
  done();
});

task("build", series(["styles", "fonts", "javascript", "logos"]));
task("default", series(["build", "watch"]));
