import {css} from "lit";

export default css`
  :host {
    --tcds-tabs-tab-indicator-size: 4px;
    --tcds-tabs-tab-font-size: var(--tcds-font-size-ml);
    --tcds-tabs-tab-padding-block: var(--tcds-space-component-xs);

    display: block;
    position: relative;
    z-index: 2;
  }

  :host([variant=raised]) {
    --tcds-tabs-tablist-gap: calc(5px * 2);
    --tcds-tabs-tab-border-bottom-radius: 0;
    --tcds-tabs-tab-selected-outline: 5px solid var(--tcds-color-theme-background);
    --tcds-tabs-tab-selected-background: var(--tcds-color-theme-background);
    --tcds-tabs-tab-selected-box-shadow:
      3px -3px 5px var(--tcds-color-theme-edge),
      -3px 0px 5px var(--tcds-color-theme-edge);

    margin-top: calc((
      var(--tcds-tabs-tab-font-size)
      + (var(--tcds-button-padding-block) * 3)
    ) * -1) !important;
  }

  [role=tablist] {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0 var(--tcds-tabs-tablist-gap, var(--tcds-space-component-md));
  }

  [role=tab] {
    --tcds-button-font-size: var(--tcds-tabs-tab-font-size);
    --tcds-button-padding-block: var(--tcds-tabs-tab-padding-block);

    position: relative;
    outline: var(--tcds-tabs-tab-outline, none);
    border-bottom-right-radius: var(--tcds-tabs-tab-border-bottom-radius, var(--tcds-button-border-radius)) !important;
    border-bottom-left-radius: var(--tcds-tabs-tab-border-bottom-radius, var(--tcds-button-border-radius)) !important;
    box-shadow: var(--tcds-tabs-tab-box-shadow);

    &:hover,
    &[aria-selected=true] {
      --tcds-button-background: var(--tcds-tabs-tab-selected-background, transparent);
      --tcds-tabs-tab-outline: var(--tcds-tabs-tab-selected-outline, none);
    }

    &:active,
    &[aria-selected=true] {
      --tcds-button-foreground: var(--tcds-color-theme-accent);

      font-weight: var(--tcds-font-weight-bold);
    }

    &[aria-selected=true] {
      --tcds-tabs-tab-indicator-color: var(--tcds-color-theme-accent);
      --tcds-tabs-tab-box-shadow: var(--tcds-tabs-tab-selected-box-shadow, none);
    }

    &::after {
      content: "";
      position: absolute;
      width: calc(100% - var(--tcds-button-padding-inline) * 2);
      left: var(--tcds-button-padding-inline);
      bottom: 0;
      border-bottom: 4px solid var(--tcds-tabs-tab-indicator-color, transparent);
    }
  }
`;
