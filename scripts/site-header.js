import AnimateElement from "./AnimateElement/AnimateElement.js";

window.addEventListener("load", function() {
  const header = document.querySelector(".site-header");

  if(header) {
    const navs = document.getElementById("site-header-navs");
    const togglers = document.querySelectorAll("[controls=site-header-navs]");
  
    const breakpoint = window.matchMedia("(max-width: 1200px)");
  
    handleHeaderMenu(breakpoint);
    breakpoint.addListener(handleHeaderMenu.bind(this));
  
    function handleHeaderMenu(breakpoint) {
      if(breakpoint.matches) {
        navs.hidden = true;
        togglers.forEach((toggler) => {
          toggler.setAttribute("expanded", "false");
        });
      } else {
        navs.hidden = false;
        togglers.forEach((toggler) => {
          toggler.setAttribute("expanded", "true");
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
     
      AnimateElement(navs, "slide-in-left", { lazyload: false }).then(() => {
        togglers.forEach((toggler) => {
          toggler.setAttribute("expanded", "true");
        });
      });
    }
  
    function closeNavs() {
      AnimateElement(navs, "slide-out-right", { lazyload: false }).then(() => {
        navs.hidden = true;
  
        togglers.forEach((toggler) => {
          toggler.setAttribute("expanded", "false");
        });
      });
    }
  }
});
