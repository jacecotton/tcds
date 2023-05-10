/**
 * As a strictly temporary measure, this component leverages the glightbox
 * library. Ultimately, the idea is to leverage `tcds-dialog[variant=lightbox]`
 * when feature parity is achieved.
 */

export default class Gallery extends HTMLElement {
  connectedCallback() {
    if(!this.id) {
      const galleries = Array.from(this.getRootNode().querySelectorAll("tcds-gallery"));
      this.id = `gallery${galleries.length > 1 ? `-${galleries.indexOf(this) + 1}` : ""}`;
    }

    if(!this.getRootNode().getElementById("glightbox-styles")) {
      const link = this.getRootNode().createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css";
      link.id = "glightbox-styles";
      this.getRootNode().head.appendChild(link);
    }

    if(!this.getRootNode().getElementById("glightbox-script")) {
      const script = this.getRootNode().createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js";
      script.id = "glightbox-script";
      this.getRootNode().head.appendChild(script);
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
