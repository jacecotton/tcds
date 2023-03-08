/**
 * Converts a given value to a given type. This is specifically for handling
 * HTML values and is not a general purpose type converter. It has more specific
 * handling than basic type coercion or more technically "correct" conversion.
 *
 * - Strings are converted to arrays by splitting at each empty space.
 * - Boolean `false` is returned from any of "false", "0", `0`, `null`, and
 *   `undefined`.
 * - Arrays are converted to strings by joining and delimiting with empty space.
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
 * Checks whether the type of a given value matches a given type. This function
 * wouldn't be necessary (as most type checking can be done with `typeof`)
 * except that arrays must be checked with `isArray`. So, this abstraction was
 * created so we can avoid the extra manual check for arrays each time we need
 * to type check.
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
