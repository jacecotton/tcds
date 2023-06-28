/* eslint-disable no-inner-declarations */
import animation from "../../animation/config.json";

window.addEventListener("load", function() {
  const header = document.querySelector(".site-header");

  if(header) {
    const navs = document.getElementById("site-header-navs");
    const togglers = document.querySelectorAll("[aria-controls=site-header-navs]");

    const breakpoint = window.matchMedia("(max-width: 1200px)");

    handleHeaderMenu(breakpoint);
    breakpoint.addListener(handleHeaderMenu.bind(this));

    function handleHeaderMenu(breakpoint) {
      if(breakpoint.matches) {
        navs.hidden = true;
        togglers.forEach((toggler) => {
          toggler.setAttribute("aria-expanded", "false");
        });
      } else {
        navs.hidden = false;
        togglers.forEach((toggler) => {
          toggler.setAttribute("aria-expanded", "true");
        });
      }
    }

    togglers.forEach((toggler) => {
      toggler.addEventListener("click", (event) => {
        event.stopPropagation();

        if(navs.hidden) {
          openNavs();
        } else {
          closeNavs();
        }
      });

      document.body.addEventListener("click", () => {
        if(breakpoint.matches && !navs.hidden) {
          closeNavs();
        }
      });

      navs.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });

    function openNavs() {
      navs.hidden = false;

      togglers.forEach((toggler) => {
        toggler.setAttribute("aria-expanded", "true");
      });

      navs.animate(animation.library["slide-in-left"], animation.timesets.productive.duration);
    }

    function closeNavs() {
      navs.animate(animation.library["slide-out-right"], animation.timesets.productive.duration)
        .onfinish = () => {
          navs.hidden = true;

          togglers.forEach((toggler) => {
            toggler.setAttribute("aria-expanded", "false");
          });
        };
    }
  }
});
