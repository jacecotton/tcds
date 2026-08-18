import {css, unsafeCSS} from "lit";
import {SizeBreakpointMd} from "@/js/_gen/tokens.js";

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
      --tcds-carousel-controls-position: absolute;
      --tcds-carousel-controls-bottom: 3rem;
      --tcds-carousel-controls-background: rgb(255 255 255 / 80%);
      --tcds-carousel-controls-backdrop-filter: blur(15px);
    }

    @media (max-width: ${unsafeCSS(SizeBreakpointMd)}) {
      --tcds-carousel-controls-margin-top: var(--tcds-space-layout-xs);
    }
  }

  :host(:not([controls="inset"])) {
    --tcds-carousel-controls-margin-top: var(--tcds-space-layout-xs);
  }

  [part=slides] {
    display: grid;
    position: relative;
  }

  [part=controls] {
    display: inline-grid;
    grid-template-areas: "previous dots next toggle";
    align-items: center;
    justify-content: center;
    gap: var(--tcds-space-component-md);
    position: var(--tcds-carousel-controls-position);
    bottom: var(--tcds-carousel-controls-bottom);
    left: 50%;
    transform: translateX(-50%);
    margin-top: var(--tcds-carousel-controls-margin-top);
    padding: var(--tcds-space-component-xs);
    width: fit-content;
    background-color: var(--tcds-carousel-controls-background, transparent);
    backdrop-filter: var(--tcds-carousel-controls-backdrop-filter, none);
    border-radius: 3rem;
    z-index: 2;
  }

  [part~=control] {
    appearance: none;
    border: 0;
    background-color: transparent;
    color: var(--tcds-carousel-control-color);
    cursor: pointer;

    &:hover {
      color: var(--tcds-carousel-control-color-hover);
    }

    &:active {
      color: var(--tcds-carousel-control-color-active);
    }
  }

  [part~=next] {
    grid-area: next;
  }

  [part~=previous] {
    grid-area: previous;
  }

  [part~=toggle] {
    --tcds-carousel-control-color: var(--tcds-color-theme-default-accent);
    --tcds-carousel-control-color-hover: color-mix(in oklab, var(--tcds-carousel-control-color), rgb(0 0 0) 20%);

    grid-area: toggle;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    border: 1.5px solid currentcolor;
    font-size: .7rem;
  }

  [part=dots] {
    grid-area: dots;
    display: flex;
    gap: var(--tcds-space-component-md);
  }

  [part~=dot] {
    position: relative;
    overflow: hidden;
    background-color: currentcolor;
    width: var(--tcds-carousel-dot-width);
    height: var(--tcds-carousel-dot-width);
    border-radius: var(--tcds-carousel-dot-width);
    padding: 0;
    transition:
      width var(--tcds-motion-duration-expressive) var(--tcds-motion-easing-translate);

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    &[aria-current=true] {
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
