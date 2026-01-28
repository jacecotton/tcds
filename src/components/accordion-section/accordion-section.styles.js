import {css, unsafeCSS} from "@/js/lit";
import {SizeBreakpointMd} from "@/js/_gen/tokens.js";

export default css`
  ::slotted([slot=title]) {
    display: none !important;
  }

  [part="heading"] {
    margin: 0;

    /**
     * On smaller screens, the main heading of each open, non-nested accordion
     * section is sticky, so we need to make them opaque and bump the z-index.
     */
    @media (max-width: ${unsafeCSS(SizeBreakpointMd)}) {
      background: var(--tcds-color-theme-background, var(--tcds-color-palette-white));
      position: var(--tcds-accordion-section-heading-position, sticky);
      top: 0;
      z-index: 2;
    }
  }

  [part="button"] {
    background: none;
    border: none;
    border-bottom: 1px solid var(--tcds-color-theme-border);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--tcds-space-component-md);
    padding: var(--tcds-space-component-md) 0;
    text-align: left;
    font-size: var(--tcds-accordion-heading-font-size, var(--tcds-font-size-ml));
    font-family: var(--tcds-font-family-ui);
    font-weight: var(--tcds-accordion-heading-font-weight, var(--tcds-font-weight-semibold));
    width: 100%;
    color: var(--tcds-color-theme-foreground);
  }

  [part="icon"] {
    flex-shrink: 0;
    pointer-events: none;
    margin-left: auto;
  }

  [part="panel"] {
    overflow: hidden;
  }

  [part="content"] {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--tcds-color-theme-border);
  }
`;
