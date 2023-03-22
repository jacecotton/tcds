import WebComponent from "./utilities/WebComponent/WebComponent.js";
import AnimateElement from "./utilities/AnimateElement/AnimateElement.js";
import slugify from "./utilities/string-utils/slugify.js";

import "construct-style-sheets-polyfill/dist/adoptedStyleSheets.js";

import "./components/button/index.js";
import "./components/focus-boundary/index.js";
import "./components/dialog/index.js";
import "./components/icon/index.js";
import "./components/tabs/index.js";
import "./components/section/index.js";

import "./components/DEPRECATED/button/index.js";

import "./templates/site-header/site-header.js";

export {WebComponent, AnimateElement, slugify};
