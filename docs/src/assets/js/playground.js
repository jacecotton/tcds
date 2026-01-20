(function() {
  document.querySelectorAll(".playground").forEach((playground) => {
    const target = playground.querySelector(`.playground__stage > ${playground.getAttribute("data-target")}`);

    playground.addEventListener("input", (event) => {
      if (!event.target.closest(".playground__controls")) return;

      const input = event.target;
      const value = input.type === "checkbox" ? input.checked : input.value;
      const selector = input.getAttribute("data-selector");
      const attribute = input.getAttribute("data-attribute");
      const mode = input.getAttribute("data-value-mode");

      let _target = target;

      if (selector) {
        _target = target.querySelector(selector);
        if (!_target) return;
      }

      if (mode === "text") {
        _target.textContent = value;
        return;
      }

      if (!attribute) return;

      if (input.type === "checkbox") {
        _target.toggleAttribute(attribute, value);
      } else {
        _target.setAttribute(attribute, value);
      }
    });
  });
})();