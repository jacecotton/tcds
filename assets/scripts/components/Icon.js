import WebComponent from "./WebComponent/WebComponent.js";
// import store from "./WebComponent/store.js";

export default class Icon extends WebComponent {
  constructor() {
    super();

    this.props = {
      icon: this.hasAttribute("icon") && this.getAttribute("icon"),
    };

    const stylesheet = document.createElement("link");
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("href", "/styles/main.css");
    this.append(stylesheet);

    this.result = fetch(`https://unpkg.com/@txch/tcds/dist/icons/${this.props.icon}.svg`)
      .then(response => response.text())
      .then(data => data);
  }

  render() {
    console.log(this.result);

    return ``;
  }

  mounted() {
  }

  updated() {

  }
}

customElements.define("tcds-icon", Icon);
