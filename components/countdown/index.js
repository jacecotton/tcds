import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Countdown extends WebComponent(HTMLElement) {
  static observedAttributes = ["date"];

  get date() {
    return this.getAttribute("date") || this.textContent;
  }

  set date(value) {
    this.setAttribute("date", value);
  }

  #count = "";

  get count() {
    return this.#count;
  }

  set count(value) {
    const oldValue = this.#count;
    this.#count = value;
    this.update({count: oldValue});
  }

  get template() {
    return /* html */`
      <p>
        <small aria-hidden="true">Countdown timer</small>
        <span class="visually-hidden">Time until ${this.date}</span>
        <b>${this.count}</b>
      </p>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.update();
  }

  mountedCallback() {
    const updateCount = () => {
      const distance = new Date(this.date).getTime() - new Date().getTime();

      const daysUntil = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
      const hoursUntil = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
      const minutesUntil = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
      const secondsUntil = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0");

      this.count = `${daysUntil} : ${hoursUntil} : ${minutesUntil} : ${secondsUntil}`;

      setTimeout(() => {
        updateCount();
      }, 1000);
    };

    updateCount();
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: oldValue});
  }
}

customElements.define("tcds-countdown", Countdown);
