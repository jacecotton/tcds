import {stringToHTML, diff} from "./utilities.js";

export default class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    this.handler = this.createHandler(this);
    this.debounce = null;

    document.addEventListener("component:store", this.handler);

    this.update();

    requestAnimationFrame(() => {
      this.mounted();
    });
  }

  update() {
    const _this = this;

    if(_this.debounce) {
      cancelAnimationFrame(_this.debounce);
    }

    _this.debounce = requestAnimationFrame(() => {
      const html = stringToHTML(_this.render());
      diff(html, _this.shadowRoot);
      this.updated();
    });
  }

  createHandler(instance) {
    // eslint-disable-next-line no-unused-vars
    return function handler(event) {
      instance.update();
    };
  }

  render() {
    return ``;
  }

  mounted() {
    return;
  }

  updated() {
    return;
  }
}
