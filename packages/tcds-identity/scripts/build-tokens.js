import StyleDictionary from "style-dictionary";
import config from "../sd.config.js";

StyleDictionary.registerFilter({
  name: "excludeKeyframes",
  filter: token => token.$type !== "keyframes",
});

StyleDictionary.registerFilter({
  name: "includeKeyframes",
  filter: token => token.$type === "keyframes",
});

StyleDictionary.registerFormat({
  name: "css/keyframes/complex",
  format: ({dictionary}) =>
    dictionary.allTokens
      .map(token => {
        if (token.$type !== "keyframes") return "";

        const frames = token.$value
          .map(frame => {
            const percent = `${frame.offset * 100}%`;

            const styles = Object.entries(frame)
              .filter(([key]) => key !== "offset")
              .map(([prop, value]) => {
                // WAAPI uses "easing", CSS uses "animation-timing-function"
                if (prop === "easing") {
                  return `    animation-timing-function: ${value};`;
                }

                return `    ${prop}: ${value};`;
              })
              .join("\n");

            return `  ${percent} {\n${styles}\n  }`;
          })
          .join("\n");

        return `@keyframes ${token.name} {\n${frames}\n}`;
      })
      .join("\n\n"),
});

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

console.log("✔︎ [Style Dictionary] Tokens built for all platforms.");
