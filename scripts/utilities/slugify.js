/**
 * Generates a slug from a given string. Makes it usable as an ident, class,
 * path name, file name, etc.
 *
 * Takes a string, trims white space, removes diacritics from the base letter,
 * lowercases all letters, replaces non-alphanumeric characters with a space,
 * removes double spaces, then replaces all single spaces with a separator (a
 * hyphen unless otherwise specified).
 *
 * Note that this does not generate unique IDs because it doesn't track reuse.
 *
 * @param {string} [separator="-"] A character to insert between words (i.e.
 * replace spaces) within the slug.
 *
 * @returns {string} A slug.
 */

export default (string, separator = "-") => {
  return string
    // Remove diacritics from base letter.
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    // Convert to lowercase.
    .toLowerCase()
    // Replace remaining non-alphanumeric characters with space.
    .replace(/[^\w\s]/gi, " ")
    // Replace multiple spaces with single space (avoids double separators).
    .replace(/\s\s+/g, " ")
    // Trim leading and trailing white space.
    .trim()
    // Replace white space with separator.
    .replace(/\s+/g, separator);
};
