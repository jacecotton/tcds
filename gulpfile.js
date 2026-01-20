import gulp from "gulp";
const { task, watch, src, dest, series } = gulp;

import webpack from "webpack-stream";

import postcss from "gulp-postcss";
import custommedia from "postcss-custom-media";
import autoprefixer from "autoprefixer";
import * as dartsass from "sass";
import gulpsass from "gulp-sass";
import fs from "fs";
import path from "path";

const sass = gulpsass(dartsass);

import imagemin from "gulp-imagemin";

import rename from "gulp-rename";

function jsonToScssValue(value) {
  if (Array.isArray(value)) {
    return `(${value.map(jsonToScssValue).join(", ")})`;
  }
  if (typeof value === "object" && value !== null) {
    const props = Object.keys(value).map((k) => {
      return `"${k}": ${jsonToScssValue(value[k])}`;
    });
    return `(${props.join(", ")})`;
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  return value;
}

function jsonImporter(url, prev) {
  if (url.endsWith(".json")) {
    let filePath = url;
    if (prev && prev !== "stdin") {
      filePath = path.resolve(path.dirname(prev), url);
    }
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      const json = JSON.parse(content);
      const scss = Object.keys(json)
        .map((key) => {
          return `$${key}: ${jsonToScssValue(json[key])};`;
        })
        .join("\n");
      return { contents: scss };
    }
  }
  return null;
}

const tasks = {
  styles: () => {
    return src("./index.scss")
      .pipe(
        sass({
          outputStyle: "compressed",
          importer: jsonImporter,
        })
      )
      .pipe(postcss([autoprefixer(), custommedia()]))
      .pipe(rename("tcds.css"))
      .pipe(dest("./dist/"));
  },

  javascript: () => {
    return src("./index.js")
      .pipe(
        webpack({
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
                        plugins: ["postcss-preset-env", "postcss-nesting"],
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
        })
      )
      .pipe(dest("./dist/"));
  },

  images: () => {
    return src("./static/images/**/*")
      .pipe(imagemin())
      .pipe(dest("./dist/images/"));
  },

  fonts: () => {
    return src("./static/fonts/**/*").pipe(dest("./dist/fonts/"));
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
