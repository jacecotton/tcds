export default class Gallery extends HTMLElement {
  connectedCallback() {
    if(!this.id) {
      const galleries = Array.from(document.querySelectorAll("tcds-gallery"));
      this.id = `gallery${galleries.length > 1 ? `-${galleries.indexOf(this) + 1}` : ""}`;
    }

    if(!document.getElementById("glightbox-styles")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css";
      link.id = "glightbox-styles";
      document.head.appendChild(link);
    }

    if(!document.getElementById("glightbox-script")) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js";
      script.id = "glightbox-script";
      document.head.appendChild(script);
    }

    setTimeout(() => {
      const selector = `#${this.id} > a`;

      window.GLightbox({
        selector: selector,
        loop: true,
      });
    }, 500);
  }
}

customElements.define("tcds-gallery", Gallery);
