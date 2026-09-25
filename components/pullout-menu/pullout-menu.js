document.querySelectorAll(".tcds-pullout-menu").forEach(function (pulloutMenu) {
  calculateToggleWidth();
  pulloutMenu.addEventListener("toggle", function () {
    pulloutMenu.querySelector("ul").offsetHeight;
  });
  pulloutMenu.addEventListener("toggle", function () {
    setTimeout(calculateTotalHeight, 300);
  }, {
    once: true
  });
  function calculateToggleWidth() {
    var width = pulloutMenu.querySelector(":scope > summary").offsetWidth;
    pulloutMenu.style.setProperty("--tcds-pullout-menu-toggle-width", "".concat(width, "px"));
    setTimeout(function () {
      pulloutMenu.toggleAttribute("data-tcds-pullout-menu", true);
    }, 300);
  }
  function calculateTotalHeight() {
    var height = pulloutMenu.offsetHeight;
    pulloutMenu.style.setProperty("--tcds-pullout-menu-total-height", "".concat(height, "px"));
    pulloutMenu.removeEventListener("transitionend", calculateTotalHeight);
  }
});
