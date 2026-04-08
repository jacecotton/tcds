import {css, unsafeCSS} from "lit";
import {SizeBreakpointMd} from "@/js/_gen/tokens.js";

export default css`
  :host(:not([inactive])) {
    --tcds-accordion-section-content-border-bottom: 1px solid var(--tcds-color-theme-edge);
  }

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
    border-bottom: 1px solid var(--tcds-color-theme-edge);
    display: flex;
    align-items: center;
    gap: var(--tcds-space-component-md);
    padding: var(--tcds-space-component-md) 0;
    text-align: left;
    font-size: var(--tcds-accordion-heading-font-size, var(--tcds-font-size-ml));
    line-height: var(--tcds-accordion-heading-line-height, var(--tcds-line-height-compact));
    font-family: var(--tcds-font-family-ui);
    font-weight: var(--tcds-accordion-heading-font-weight, var(--tcds-font-weight-semibold));
    width: 100%;
    color: var(--tcds-color-theme-foreground);

    &:is(button) {
      cursor: pointer;
    }
  }

  [part="icon"] {
    flex-shrink: 0;
    pointer-events: none;
    margin-left: auto;
    color: var(--tcds-color-theme-muted);
  }

  [part="panel"] {
    overflow: hidden;
  }

  [part="content"] {
    padding: 1.5rem 0;
    border-bottom: var(--tcds-accordion-section-content-border-bottom, none);
  }
`;
