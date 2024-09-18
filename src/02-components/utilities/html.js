export default (strings, ...values) => {
  const fragments = [strings[0]];

  values.forEach((value, index) => {
    if(Array.isArray(value)) {
      value.forEach((fragment) => {
        fragments.push(String(fragment));
      });
    } else {
      fragments.push(String(value));
    }

    fragments.push(strings[index + 1]);
  });

  return fragments.join("");
};
