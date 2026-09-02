import {css, unsafeCSS} from "lit";
import {SizeBreakpointMd} from "@/components/_shared/_gen/tokens.js";

const outsideControls = unsafeCSS`
  --tcds-carousel-controls-margin-top: var(--tcds-space-layout-xs);
`;

const insetControls = unsafeCSS`
  --tcds-carousel-controls-position: absolute;
  --tcds-carousel-controls-bottom: 3rem;
  --tcds-carousel-controls-background: rgb(255 255 255 / 80%);
  --tcds-carousel-controls-backdrop-filter: blur(15px);
`;

export default css`
  :host {
    --tcds-carousel-controls-position: relative;
    --tcds-carousel-control-color: var(--tcds-color-palette-gray-400);
    --tcds-carousel-control-color-hover: var(--tcds-color-palette-gray-500);
    --tcds-carousel-control-color-active: var(--tcds-color-palette-black);
    --tcds-carousel-dot-width: .625rem;
    --tcds-carousel-dot-width-current: var(--tcds-carousel-dot-width);

    flex-direction: column;
    position: relative;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  :host(:not([hidden])) {
    display: flex;
  }

  :host([playing]) {
    --tcds-carousel-control-color-active: var(--tcds-carousel-control-color);
    --tcds-carousel-dot-progress-opacity: 1;
    --tcds-carousel-dot-width-current: 2.625rem;
  }

  :host([controls="inset"]) {
    @media (min-width: ${unsafeCSS(SizeBreakpointMd)}) {
      ${insetControls}
    }

    @media (max-width: ${unsafeCSS(SizeBreakpointMd)}) {
      ${outsideControls}
    }
  }

  :host(:not([controls="inset"])) {
    ${outsideControls}
  }

  [part=slides] {
    display: grid;
    position: relative;
  }

  [part=controls] {
    --tcds-carousel-controls-padding: var(--tcds-space-component-sm);
    --tcds-carousel-controls-gap: calc(var(--tcds-carousel-controls-padding) * 2);

    display: inline-grid;
    grid-template-areas: "previous dots next toggle";
    align-items: center;
    justify-content: center;
    gap: var(--tcds-carousel-controls-gap);
    position: var(--tcds-carousel-controls-position);
    bottom: var(--tcds-carousel-controls-bottom);
    left: 50%;
    transform: translateX(-50%);
    margin-top: var(--tcds-carousel-controls-margin-top);
    height: var(--tcds-size-component-md);
    padding: 0 var(--tcds-space-component-sm);
    width: fit-content;
    background-color: var(--tcds-carousel-controls-background, transparent);
    backdrop-filter: var(--tcds-carousel-controls-backdrop-filter, none);
    border-radius: 3rem;
    z-index: 2;
  }

  [part~=control] {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    appearance: none;
    border: var(--tcds-button-border-width, 0) solid var(--tcds-button-border-color, transparent);
    background-color: var(--tcds-button-background-color, transparent);
    color: var(--tcds-button-text-color, var(--tcds-carousel-control-color));
    cursor: pointer;
    position: relative;
    transition:
      color var(--tcds-motion-duration-productive) var(--tcds-motion-easing-enter),
      background-color var(--tcds-motion-duration-productive) var(--tcds-motion-easing-enter);

    &:hover {
      background-color: var(--tcds-button-background-color-hover, transparent);
      border-color: var(--tcds-button-border-color-hover, transparent);
      color: var(--tcds-button-text-color-hover, var(--tcds-carousel-control-color-hover));
    }

    &:active {
      color: var(--tcds-button-text-color-active, var(--tcds-carousel-control-color-active));
    }

    &::before {
      content: "";
      position: absolute;
      inset: calc(var(--tcds-carousel-controls-gap) / -2);
    }
  }

  [part~=next] {
    grid-area: next;
  }

  [part~=previous] {
    grid-area: previous;
  }

  [part~=toggle] {
    grid-area: toggle;
  }

  [part=dots] {
    grid-area: dots;
    display: flex;
    gap: var(--tcds-carousel-controls-gap);
  }

  [part~=dot] {
    position: relative;
    background-color: var(--tcds-carousel-control-color);
    width: var(--tcds-carousel-dot-width);
    height: var(--tcds-carousel-dot-width);
    border-radius: var(--tcds-carousel-dot-width);
    padding: 0;
    transition:
      width var(--tcds-motion-duration-expressive) var(--tcds-motion-easing-enter);

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    &:hover {
      background-color: var(--tcds-carousel-control-color-hover);
    }

    &[aria-current=true] {
      overflow: hidden;
      width: var(--tcds-carousel-dot-width-current);
      background-color: var(--tcds-carousel-control-color-active);

      &::after {
        content: "";
        opacity: var(--tcds-carousel-dot-progress-opacity, 0);
        position: absolute;
        inset: 0;
        background-color: var(--tcds-color-palette-black);
        border-radius: var(--tcds-carousel-dot-width);
        width: 0%;
      }
    }
  }
`;
