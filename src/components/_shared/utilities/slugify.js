/**
 * Generate a consistent Unicode-preserving slug or camelCase name.
 *
 * Keeps letters, numbers, and combining marks attached to them. Unicode
 * compatibility normalization folds literal equivalents into text (e.g. Ａ → a,
 * ① → 1, ™ → tm, № → no). Symbols without such a mapping, including © and ®,
 * become word boundaries.
 *
 * Strips straight and curly quotes/apostrophes, along with other Unicode
 * quotation marks, without inserting a word boundary. Other punctuation,
 * symbols, pictographic emoji, whitespace, underscores, and dashes separate
 * words. Emoji presentation selectors and keycap marks are removed. Numeric
 * keycaps retain their digits. Unattached combining marks are removed.
 *
 * Intended for CSS-friendly names, but does not validate CSS or JavaScript
 * identifiers, prevent a leading number, ensure uniqueness, or provide a
 * fallback for inputs containing no usable text.
 *
 * @param {string} string The text to convert.
 * @param {object} [options={}] Conversion options.
 * @param {string} [options.separator="-"] Literal separator between words;
 * ignored when casing is "camel".
 * @param {"lower"|"camel"} [options.casing="lower"] Casing strategy. Existing
 * capitalization is normalized to lowercase before applying camelCase.
 * @returns {string} The converted text, or an empty string if no words remain.
 *
 * @example
 * slugify(" Café—№ ① full-width：ＡＢＣ ");
 * // "café-no-1-full-width-abc"
 *
 * @example
 * slugify("我要一杯咖啡");
 * // "我要一杯咖啡"
 *
 * @example
 * slugify("Hello_world--x y");
 * // "hello-world-x-y"
 *
 * @example
 * slugify("emoji 😅 & symbols ©™ drop");
 * // "emoji-symbols-tm-drop"
 *
 * @example
 * slugify("Texas Children’s Hospital");
 * // "texas-childrens-hospital"
 *
 * @example
 * slugify("some-custom-attr", {casing: "camel"});
 * // "someCustomAttr"
 */
export default (string, {separator = "-", casing = "lower"} = {}) => {
  const words = string
    // Remove quotes before normalization so newly adjacent text can compose.
    .replace(/\p{Quotation_Mark}/gu, "")
    .normalize("NFKC")
    // Remove emoji-specific marks without stripping linguistic diacritics or
    // other variation selectors used by scripts such as Mongolian and CJK.
    .replace(/[\uFE0E\uFE0F\u20E3]/gu, "")
    .toLowerCase()
    // A word must start with a letter or number; combining marks may follow.
    .match(/[\p{L}\p{N}][\p{L}\p{M}\p{N}]*/gu) ?? [];

  if (casing.toLowerCase() === "camel") {
    return words.map((word, index) => index === 0
      ? word
      // Match a complete Unicode code point, including supplementary letters.
      : word.replace(/^./u, character => character.toUpperCase())
    ).join("");
  }

  // Joining words inserts separators literally, including "$" sequences.
  return words.join(separator);
};
