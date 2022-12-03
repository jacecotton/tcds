/**
 * A utility function for coercing a value to a given type, specifically for
 * HTML attributes. Note that because this operates at runtime, it should not be
 * used for general typing. Generic type coercion cannot be used because there
 * are special considerations when working with attribute values as compared to
 * other property values.
 *
 * @param {string} currentValue The current attribute value.
 * @param {string} desiredType The desired type to coerce the currentValue to.
 *   One of "boolean", "string", "number", or "array".
 *
 * @returns {*} The coerced value.
 */

export default function getAttributeValueOfType(currentValue, desiredType) {
  let value = currentValue;

  if(desiredType && typeof currentValue !== desiredType) {
    switch(desiredType) {
      case "number":
        value = Number(currentValue);
        break;
      case "string":
        value = String(currentValue);
        break;
      case "boolean":
        if(["false", "0"].includes(currentValue)) {
          value = false;
        } else if(currentValue === "") {
          value = true;
        } else {
          value = Boolean(currentValue);
        }
        break;
      case "array":
        if(typeof currentValue === "string") {
          value = currentValue.trim().replace(/\s\s+/g, " ").split(" ");
        }
        break;
    }
  }

  return value;
}
