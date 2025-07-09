export default function() {
  [...arguments].forEach((property) => {
    if(Object.prototype.hasOwnProperty.call(this, property)) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    }
  });
}
