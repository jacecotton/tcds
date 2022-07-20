function handler(name, data) {
  const type = "store" + (name ? `-${name}` : "");

  return {
    get(object, prop) {
      if(prop === "_isProxy") {
        return true;
      }

      if(["object", "array"].includes(Object.prototype.toString.call(object[prop]).slice(8, -1).toLowerCase()) && !object[prop]._isProxy) {
        object[prop] = new Proxy(object[prop], handler(name, data));
      }

      return object[prop];
    },

    set(object, prop, value) {
      if(object[prop] === value) {
        return true;
      }

      object[prop] = value;

      document.dispatchEvent(new CustomEvent(`component:${type}`, {
        bubbles: true,
        cancelable: true,
        details: data,
      }));

      return true;
    },

    deleteProperty(object, prop) {
      delete object[prop];

      document.dispatchEvent(new CustomEvent(`component:${type}`, {
        bubbles: true,
        cancelable: true,
        details: data,
      }));

      return true;
    },
  };
}

export default function store(data = {}, name = "") {
  return new Proxy(data, handler(name, data));
}
