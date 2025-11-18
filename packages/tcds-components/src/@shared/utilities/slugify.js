/**
 * A more opinionated slugify solution.
 *
 * Intended to generate CSS-friendly identifiers, but is not a validator and
 * will not correct starting strings with numbers. It also doesn't exclusively
 * abide by CSS validity criteria, as we're still opting to drop things like
 * emojis which, while valid, are typically purely decorative.
 *
 * Does not expose robust configuration, as this is intended to enforce internal
 * consistency. `separator` is only configurable for cases where hyphens are not
 * allowed, like in JavaScript identifiers (e.g. HTML attribute names → class
 * property names, for which there is also a camelCasing option).
 *
 * Does not ensure uniqueness, so not suitable alone for IDs.
 *
 * Test strings:
 * - ` Café—№ ① full-width：ＡＢＣ ` → `café-no-1-full-width-abc`
 * - `我要一杯咖啡` → `我要一杯咖啡`
 * - `Hello_world--x y` → `hello-world-x-y`
 * - `emoji 😅 & symbols ©™ → drop` → `emoji-symbols-drop`
 * - `some-custom-attr` → `someCustomAttr` (with `{casing: "camel"}`).
 */

/**
 * @param {string} [separator="-"] The separator/delimiter to use between words.
 * @param {string} [casing="lower"] Which casing strategy to use (either "lower"
 * or "camel").
 */
export const slugify = (string, {separator = "-", casing = "lower"} = {}) => {
  let result = string;

  result = result
    // Replace any dash-like character (including U+2212) with a whitespace.
    .replace(/[\p{Pd}\u2212]+/gu, " ")
    // Fold compatibility (e.g. ① → 1).
    .normalize("NFKC")
    // Replace disallowed characters (punctuation, symbols, emoji, etc.) with
    // single whitespace. Only allows: letters, marks, numbers, whitespace,
    // underscores, and hyphens.
    .replace(/[^\p{L}\p{M}\p{N}\s_-]/gu, " ")
    // Collapse whitespace, underscore, and hyphen runs to a single space.
    .replace(/[\s_-]+/g, " ")
    .trim()
    .toLowerCase();

  if (casing.toLowerCase() === "camel") {
    // camelCase if specified.
    result = result.replace(/ ([\p{L}\p{N}])/gu, (_, c) => c.toUpperCase());
  } else {
    // Replace spaces with separator otherwise.
    result = result.replace(/\s+/g, separator);
  }

  return result;
};
