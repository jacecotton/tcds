const debounce = (callback, wait) => {
  let timeout = null;

  return (...args) => {
    window.clearTimeout(timeout);

    timeout = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export default debounce;
