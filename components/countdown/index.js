import WebComponent from "../../scripts/WebComponent/WebComponent.js";

export default class Countdown extends WebComponent(HTMLElement) {
  static state = {
    count: {
      type: String,
      default: "00 : 00 : 00",
    },
  };

  connectedCallback() {
    this.countdownDate = new Date(this.props.date || this.textContent).getTime();
  }

  render() {
    return /* html */`
      <p class="font-ui font-weight-semibold">
        <span aria-hidden="true" class="font-size-large">Countdown timer</span><br>
        <span class="visually-hidden">Time until ${this.props.date || this.textContent}</span>
        <span style="font-size: 4rem">${this.state.count}</span>
      </p>
    `;
  }

  mountedCallback() {
    this.updateCount();

    setInterval(() => {
      this.updateCount();
    }, 1000);
  }

  updateCount() {
    const now = new Date().getTime();
    const distance = this.countdownDate - now;

    const daysUntil = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
    const hoursUntil = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
    const minutesUntil = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");

    this.state.count = `${daysUntil} : ${hoursUntil} : ${minutesUntil}`;
  }
}

customElements.define("tcds-countdown", Countdown);
