import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Countdown extends WebComponent(HTMLElement) {
  static state = {
    count: {
      type: String,
      default: "00 : 00 : 00 : 00",
    },
  };

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    super.connectedCallback();
    this.countdownDate = new Date(this.props.date || this.textContent).getTime();
  }

  render() {
    return /* html */`
      <p>
        <small aria-hidden="true">Countdown timer</small>
        <span class="visually-hidden">Time until ${this.props.date || this.textContent}</span>
        <b>${this.state.count}</b>
      </p>
    `;
  }

  mountedCallback() {
    this.updateCount();

    this.counter = setInterval(() => {
      this.updateCount();
    }, 1000);
  }

  disconnectedCallback() {
    clearInterval(this.counter);
  }

  updateCount() {
    const now = new Date().getTime();
    const distance = this.countdownDate - now;

    const daysUntil = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
    const hoursUntil = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
    const minutesUntil = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
    const secondsUntil = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0");

    this.state.count = `${daysUntil} : ${hoursUntil} : ${minutesUntil} : ${secondsUntil}`;
  }
}

customElements.define("tcds-countdown", Countdown);
