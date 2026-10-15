import {css} from "lit";

export default css`
  :host {
    position: relative;
    border-radius: var(--tcds-border-radius-lg);
    overflow: hidden;
  }

  :host(:not([hidden])) {
    display: inline-block;
  }

  ::slotted(video) {
    aspect-ratio: var(--tcds-aspect-ratio-square);
    object-fit: cover;
    width: 100%;
  }

  [part=toggle] {
    position: absolute;
    right: var(--tcds-space-component-lg);
    bottom: var(--tcds-space-component-lg);
  }
`;
