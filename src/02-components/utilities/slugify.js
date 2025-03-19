/**
 * Generates a slug from a given string. Makes it usable as an ident, class,
 * path name, file name, etc.
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
    // Remove leading and trailing spaces.
    .trim()
    // Replace spaces with separator.
    .replace(/\s+/g, separator);
};
