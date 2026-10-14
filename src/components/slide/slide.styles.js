import {css} from "lit";

export default css`
  :host {
    grid-area: 1 / 1;
    opacity: 0;
    z-index: 1;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  :host(:state(ready)) {
    transition:
      opacity var(--tcds-carousel-transition-duration, 500ms) ease,
      content-visibility var(--tcds-carousel-transition-duration, 500ms) allow-discrete;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  :host(:not([hidden])), :host([hidden="until-found"]) {
    display: block;
  }

  :host([selected]) {
    opacity: 1;
    z-index: 0;
    transition: none;
    pointer-events: auto;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
`;
