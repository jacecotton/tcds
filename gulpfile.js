import gulp from "gulp";
const {task, watch, src, dest, series} = gulp;

import webpack from "webpack-stream";

import postcss from "gulp-postcss";
import custommedia from "postcss-custom-media";
import autoprefixer from "autoprefixer";
import * as dartsass from "sass";
import gulpsass from "gulp-sass";
import jsonsass from "node-sass-json-importer";
const sass = gulpsass(dartsass);

import imagemin from "gulp-imagemin";

import rename from "gulp-rename";

const tasks = {
  "styles": () => {
    return src("./index.scss")
      .pipe(sass({
        outputStyle: "compressed",
        importer: jsonsass(),
      }))
      .pipe(postcss([
        autoprefixer(),
        custommedia({
          importFrom: "./styles/layout/layout",
        }),
      ]))
      .pipe(rename("tcds.css"))
      .pipe(dest("./dist/"));
  },

  "javascript": () => {
    return src("./index.js")
      .pipe(webpack({
        entry: "./index.js",
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
          filename: "tcds.js",
        },
      }))
      .pipe(dest("./dist/"));
  },

  "images": () => {
    return src("./static/images/**/*")
      .pipe(imagemin())
      .pipe(dest("./dist/images/"));
  },

  "fonts": () => {
    return src("./static/fonts/**/*")
      .pipe(dest("./dist/fonts/"));
  },
};

task("styles", tasks["styles"]);
task("javascript", tasks["javascript"]);
task("images", tasks["images"]);
task("fonts", tasks["fonts"]);

task("watch", function watcher() {
  watch("./styles/", tasks["styles"]);
  watch("./utilities/", tasks["javascript"]);
  watch("./static/images/", tasks["images"]);
  watch("./static/fonts/", tasks["fonts"]);
});

task("build", series(["styles", "javascript", "images", "fonts"]));
task("default", series(["build", "watch"]));
