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
  cleanup: () => deleteAsync(["./dist", "./src/00-branding/icons/icons.json"]),

  styles: () => {
    return src("./index.scss")
      .pipe(
        sass({
          outputStyle: "compressed",
          // Allow Sass files to import data from JSON files.
          importer: jsonsass(),
        }),
      )
      // Transpile custom media queries due to lack of browser support.
      .pipe(postcss([autoprefixer(), custommedia()]))
      .pipe(rename("tcds.css"))
      .pipe(dest("./dist/"));
  },

  javascript: () => {
    return src("./index.js")
      .pipe(webpack({
        entry: {
          index: "./index.js",
          accordion: {import: "./src/03-components/accordion/index.js", dependOn: ["declarative", "importSharedStyles", "refreshProperties"]},
          "accordion-section": {import: "./src/03-components/accordion/section/index.js", dependOn: ["declarative", "importSharedStyles", "refreshProperties"]},
          button: {import: "./src/03-components/button/index.js"},
          card: {import: "./src/03-components/card/index.js", dependOn: ["declarative", "importSharedStyles", "refreshProperties"]},
          icon: {import: "./src/03-components/icon/index.js", dependOn: ["slugify"]},

          declarative: "./src/03-components/utilities/declarative.js",
          importSharedStyles: "./src/03-components/utilities/importSharedStyles.js",
          refreshProperties: "./src/03-components/utilities/refreshProperties.js",
          slugify: "./src/03-components/utilities/slugify.js",
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

  // images: () => {
  //   return src("./src/static/images/**/*")
  //     .pipe(imagemin())
  //     .pipe(dest("./dist/images/"));
  // },

  icons: () => {
    const fileignore = [".DS_Store"];

    // Get parent directory for all icons.
    const iconCategories = fs.readdirSync("./src/00-branding/icons/static/")
      .filter(name => !fileignore.includes(name));

    // Set up a JSON-ready object to store the icon names and corresponding
    // inlined SVG code.
    let icons = {
      library: {},
    };

    // Populate the object from the filesystem.
    iconCategories.forEach((category) => {
      const filenames = fs.readdirSync(`./src/00-branding/icons/static/${category}/`)
        .filter(name => !fileignore.includes(name));
      
      icons.library[category] = {};

      filenames.forEach((filename) => {
        const svg = fs.readFileSync(`./src/00-branding/icons/static/${category}/${filename}`, "utf8")
          .replace(/\n|  /g, "");

        icons.library[category][filename.replace(".svg", "")] = `'${svg}'`;
      });
    });

    // Output the JSON file.
    fs.writeFileSync("./src/00-branding/icons/icons.json", JSON.stringify(icons, null, 2));

    // Generate an icon font. Exclude utility and media icons.
    const fontFormats = ["eot", "svg", "ttf", "woff", "woff2"];
    const iconFontDest = "./dist/fonts/icons";

    return src([
      "./src/00-branding/icons/static/**/*.svg",
      "!./src/00-branding/icons/static/utility/*.svg",
      "!./src/00-branding/icons/static/media/*.svg",
    ])
      .pipe(imagemin())
      .pipe(iconfont({
        prependUnicode: false,
        fontName: "tcds-icons",
        formats: fontFormats,
        normalize: true,
        fontHeight: 1024,
      })).on("glyphs", (glyphs) => {
        // Create a Site Studio-compatible JSON config file so the icon font can
        // be used in the icon picker UI.
        fs.writeFileSync(`${iconFontDest}/tcds-icons.json`, JSON.stringify({
          name: "tcds-icons",
          icons: glyphs.map((glyph) => ({
            name: glyph.name,
            code: glyph.unicode[0].charCodeAt(0),
          })),
        }, null, 2));
      }).pipe(dest("./dist/fonts/icons/")).on("finish", () => {
        // Site Studio needs the above-created JSON config file plus a zip file
        // of all the icon fonts.
        const fonts = fontFormats.map(format => `./dist/fonts/icons/*.${format}`);
  
        return src(fonts)
          .pipe(zip("tcds-icons.zip"))
          // Place zip file in same directory as JSON config.
          .pipe(dest(iconFontDest))
          // We don't want the icon font being used for any other purpose than
          // the Site Studio icon picker UI, so we'll delete the font files.
          .on("finish", () => deleteAsync(fonts));
      });
  },

  fonts: () => {
    return src("./src/00-branding/typography/fonts/static/**/*")
      .pipe(dest("./dist/fonts/"));
  },
};

task("cleanup", tasks.cleanup);
task("styles", tasks.styles);
task("javascript", tasks.javascript);
// task("images", tasks.images);
task("icons", tasks.icons);
task("fonts", tasks.fonts);

task("icon-cleanup", () => {
  return src("./src/00-branding/icons/static/primary/*.svg")
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
    .pipe(dest("./src/00-branding/icons/static/primary/"));
});

task("watch", function watcher() {
  watch("./src/**/*.scss", tasks.styles);
  watch(["./index.js", "./src/03-components/**/*.js"], tasks.javascript);
  // watch("./src/static/images/", tasks.images);
  watch("./src/00-branding/icons/static/", tasks.icons);
  watch("./src/static/fonts/", tasks.fonts);
});

task("build", series(["cleanup", "icons", "styles", "fonts", "javascript"]));
task("default", series(["build", "watch"]));
