/**
 * Coverts a given string to a slug.
 * 
 * Takes a string, trims it, lowercases it, normalizes the character (converting
 * to unicode), and replaces spaces with a hyphen or some other specified
 * character.
 * 
 * @param {string} [separator="-"] A character to insert between words (i.e.
 *   replace spaces) within the slug.
 * 
 * @return {string} Slugified result.
 */

String.prototype.slugify = function(separator = "-") {
  return this
    .toString()
    .trim()
    .toLowerCase()
    // Remove accent from base letter.
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    // Remove everything that's not a letter, number, or space.
    .replace(/[^a-z0-9 ]/g, "")
    // Replace space with separator.
    .replace(/\s+/g, separator);
}
