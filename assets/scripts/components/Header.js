import Toggleable from "@tcds/components/Toggleable.js";

class Header {
  constructor(element) {
    this.element = element;

    const header = document.querySelector(".site-header");
    const headerHeight = header.getBoundingClientRect().height;

    window.addEventListener("scroll", () => {
      if(window.scrollY >= headerHeight) {
        header.classList.add("scrolled");
      } else if(window.scrollY === 0) {
        header.classList.remove("scrolled");
      }
    }, { passive: true });

    this.toggleableMenu = new Toggleable(this.element, {
      animation: {
        open: "slide-in-left",
        close: "slide-out-right",
      },
    });

    const breakpoint = window.matchMedia("(max-width: 1024px)");

    this.handleHeaderMenu(breakpoint);
    breakpoint.addListener(this.handleHeaderMenu.bind(this));
  }

  handleHeaderMenu(breakpoint) {
    if(breakpoint.matches) {
      this.element.hidden = true;
      this.toggleableMenu.close();
      this.moveSearchTo("utility-menu");
    } else {
      this.toggleableMenu.destroy();
      this.moveSearchTo("main-menu");
    }
  }

  moveSearchTo(whichNav) {
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
}

(function() {
  const instance = document.getElementById("header-menu");
  instance && new Header(instance);
}());
