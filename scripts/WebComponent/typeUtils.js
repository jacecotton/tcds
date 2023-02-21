/**
 * Converts a given value to a given type.
 *
 * @param {*} value The value to convert.
 * @param {function} type The constructor for the type to convert the value to.
 * @returns The converted value.
 */
function typeConverter(value, type) {
  return typeChecker(value, type) ? value : {
    [Array]: typeof value === "string"
      ? value.trim().replace(/\s\s+/g, " ").split(" ")
      : [value].flat(),
    [Boolean]: !["false", "0", 0, null, undefined].includes(value),
    [Number]: Number(value),
    [String]: Array.isArray(value)
      ? value.join(" ")
      : String(value),
  }[type];
}

/**
 * Checks whether the type of a given value matches the given type.
 *
 * @param {*} value The value to check for a given type.
 * @param {function} type The constructor for the type to check a value against.
 * @returns {boolean} Whether the value type matches the given type.
 */
function typeChecker(value, type) {
  return {
    [Array]: Array.isArray(value),
    [Boolean]: typeof value === "boolean",
    [Number]: typeof value === "number",
    [String]: typeof value === "string",
  }[type];
}

export {typeChecker, typeConverter};
