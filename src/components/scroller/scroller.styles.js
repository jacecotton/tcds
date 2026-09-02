import {css, unsafeCSS} from "lit";
import {SizeBreakpointMd} from "@/components/_shared/_gen/tokens.js"

export default css`
  :host {
    --tcds-scroller-gap: 1.5rem;
    --tcds-scroller-control-color: var(--tcds-color-palette-gray-400);
    --tcds-scroller-control-color-hover: var(--tcds-color-palette-gray-500);
    --tcds-scroller-control-color-active: var(--tcds-color-palette-black);

    flex-direction: column;
    position: relative;
  }

  :host(:not([hidden])) {
    display: flex;
  }

  [part=scroller] {
    display: flex;
    gap: var(--tcds-scroller-gap);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }
  }

  /**
   * The slot generates no box of its own, so these are the flex items and the
   * snap targets, despite sitting a level deeper in the markup.
   */
  ::slotted(*) {
    /**
     * Children keep their own width. Without this they'd shrink to fit the
     * container and it would never overflow, so nothing would ever scroll.
     */
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  [part=controls] {
    --tcds-scroller-controls-gap: var(--tcds-space-8);

    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--tcds-scroller-controls-gap);
    padding-right: var(--tcds-site-inner-gutter);
    margin-top: var(--tcds-space-layout-md);
    z-index: 2;
  }

  [part~=control] {
    appearance: none;
    border: 0;
    background-color: transparent;
    color: var(--tcds-scroller-control-color);
    cursor: pointer;
    position: relative;

    &:hover {
      color: var(--tcds-scroller-control-color-hover);
    }

    &:active {
      color: var(--tcds-scroller-control-color-active);
    }

    &[aria-disabled=true] {
      color: var(--tcds-scroller-control-color);
      opacity: .4;
      cursor: default;
    }

    &::after {
      content: "";
      position: absolute;
      inset: calc(var(--tcds-scroller-controls-gap) / -2);
    }
  }

  [part~=previous] {
    margin-left: auto;
  }

  [part~=next] {
  }
`;
