/**
 * A template literal tag for writing HTML. This is mainly just for syntax
 * highlighting in code editors. It's also handy because it `join`s all the
 * string fragments, allowing us to use `Array.map` in the string literals to
 * iterate over items without having to `join` them manually at the end.
 *
 * The main task of this specific tag is to flatten the values you get from a
 * tagged template literal (`TemplateStringsArray`) and then join them all back
 * into one string.
 */

export default (strings, ...values) => {
  // `strings` is an array of substrings split by `${}` interpolations. We'll
  // be making our own array, initialized with the first given substring.
  const fragments = [strings[0]];

  // `values` is an array of `${}`-interpolated values corresponding to each
  // substring in `strings`.
  values.forEach((value, index) => {
    // A value may contain additional template literals with interpolations, so
    // keep iterating down to create a flattened version (`fragments`).
    if(Array.isArray(value)) {
      value.forEach((fragment) => {
        fragments.push(String(fragment));
      });
    } else {
      fragments.push(String(value));
    }

    // Add the string that follows the current interpolated value to the
    // flattened array.
    fragments.push(strings[index + 1]);
  });

  // Join the flattened array into a string.
  return fragments.join("");
};
