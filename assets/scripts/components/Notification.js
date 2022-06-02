import Component from "@tcds/utilities/Component.js";

export default class Notification extends Component {
  constructor(element, props) {
    super(element, props);

    this.message = this.element.querySelector("[data-component-part=message]");
    this.dismissButton = this.element.querySelector("[data-component-part=dismiss]");
    this.expandButton = this.element.querySelector("[data-component-part=expand]");
    this.localStorageState = `notification_${this.message.id}_state`;

    this.state.expanded = localStorage.getItem(this.localStorageState) === "dismissed" ? false : true;

    this.dismissButton.addEventListener("click", () => {
      this.state.expanded = false;
    });

    this.expandButton && this.expandButton.addEventListener("click", () => {
      this.state.expanded = true;
    });
  }

  sync() {
    return {
      expanded: () => {
        localStorage.setItem(this.localStorageState, this.state.expanded ? "expanded" : "dismissed");

        this.element.setAttribute("data-state", this.state.expanded ? "expanded" : "dismissed");
        this.message.hidden = !this.state.expanded;
        this.dismissButton.setAttribute("aria-expanded", this.state.expanded);
        this.expandButton && this.expandButton.setAttribute("aria-expanded", this.state.expanded);
      },
    };
  }
}

// Attach component.
document.querySelectorAll("[data-component=Notification]").forEach((instance) => {
  instance && new Notification(instance);
});
