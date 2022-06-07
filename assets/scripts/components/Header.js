import Toggleable from "@tcds/components/Toggleable.js";

(function() {
  const menu = document.getElementById("header-menu");

  const toggleableMenu = new Toggleable(menu, {
    animation: {
      open: "slide-in-left",
      close: "slide-out-right",
    },
  });

  const breakpoint = window.matchMedia("(max-width: 1024px)");

  handleHeaderMenu(breakpoint);
  breakpoint.addListener(handleHeaderMenu);

  function handleHeaderMenu(breakpoint) {
    if(breakpoint.matches) {
      menu.hidden = true;
      toggleableMenu.close();
      moveSearchTo("utility-menu");
    } else {
      toggleableMenu.open();
      moveSearchTo("main-menu");
    }
  }

  function moveSearchTo(whichNav) {
    const nav = document.querySelector(`.site-header__nav--${whichNav} ul`);
    const navItems = document.querySelectorAll(".site-header__nav ul li");

    if(navItems) {
      navItems.forEach((item) => {
        if(nav && item.contains(document.querySelector(".site-menu__toggle"))) {
          nav.appendChild(item);
        }
      });
    }
  }
}());
