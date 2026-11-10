import {css} from "lit";

export default css`
  :host {
  }

  [part=tablist] {
    display: flex;
    overflow-x: auto;
    border-bottom: 1px solid var(--tcds-color-theme-edge);
  }

  [part~=tab] {
    appearance: none;
    background-color: transparent;
    border: 0;
    padding-block: var(--tcds-space-component-sm);
    padding-inline: var(--tcds-tabs-tab-padding-inline);
    font-family: var(--tcds-font-family-ui);
    font-weight: var(--tcds-font-weight-ui);
    font-size: var(--tcds-font-size-2xl);
    color: var(--tcds-color-theme-text-muted);
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    transition: color var(--tcds-motion-duration-productive) var(--tcds-motion-easing-enter);

    &:not(:first-child) {
      --tcds-tabs-tab-padding-inline: var(--tcds-space-component-lg);
    }

    &:first-child {
      --tcds-tabs-tab-padding-inline: 0 var(--tcds-space-component-lg);
    }

    &:hover {
      color: var(--tcds-color-theme-text-primary);
    }

    &[aria-selected=true] {
      --tcds-tabs-tab-button-box-shadow: inset 0 -4px 0 var(--tcds-color-theme-accent);

      color: var(--tcds-color-theme-text-primary);
    }

    &::before {
      content: "";
      position: absolute;
      inset-block: 0;
      inset-inline: var(--tcds-tabs-tab-padding-inline, 0);
      box-shadow: var(--tcds-tabs-tab-button-box-shadow, none);
      transition: box-shadow var(--tcds-motion-duration-productive) var(--tcds-motion-easing-enter);
    }
  }
`;
