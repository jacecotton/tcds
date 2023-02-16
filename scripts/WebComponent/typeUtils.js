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

function typeChecker(value, type) {
  return {
    [Array]: Array.isArray(value),
    [Boolean]: typeof value === "boolean",
    [Number]: typeof value === "number",
    [String]: typeof value === "string",
  }[type];
}

export {typeChecker, typeConverter};
