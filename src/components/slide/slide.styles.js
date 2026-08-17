import {css} from "lit";

export default css`
  :host {
    grid-area: 1 / 1;
    opacity: 0;
    visibility: hidden;
    z-index: 1;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  :host(:state(ready)) {
    transition:
      opacity var(--tcds-carousel-transition-duration, 500ms) ease,
      visibility 0s linear var(--tcds-carousel-transition-duration, 500ms);
  }

  :host(:not([hidden])) {
    display: block;
  }

  :host([selected]) {
    opacity: 1;
    visibility: visible;
    z-index: 0;
    transition: none;
    pointer-events: auto;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
`;
