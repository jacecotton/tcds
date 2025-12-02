import {createRequire} from "module";
const require = createRequire(import.meta.url);
const twing = require("twing");
console.log(JSON.stringify(Object.keys(twing), null, 2));
console.log("TwingFunction type:", typeof twing.TwingFunction);
