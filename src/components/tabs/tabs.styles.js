import {css} from "lit";

export default css`
  :host {
  }

  [part=tablist] {
    display: flex;
    gap: 2rem;
    border-bottom: 1px solid var(--tcds-color-theme-edge);
  }

  [part~=tab] {
    appearance: none;
    background-color: transparent;
    border: 0;
    padding: var(--tcds-space-component-sm) 0;
    font-family: var(--tcds-font-family-ui);
    font-weight: var(--tcds-font-weight-ui);
    font-size: var(--tcds-font-size-2xl);
    color: var(--tcds-color-theme-text-muted);
    cursor: pointer;
    box-shadow: none;
    transition:
      box-shadow var(--tcds-motion-duration-productive) var(--tcds-motion-easing-enter),
      color var(--tcds-motion-duration-productive) var(--tcds-motion-easing-enter);

    &:hover {
      color: var(--tcds-color-theme-text-primary);
    }

    &[aria-selected=true] {
      color: var(--tcds-color-theme-text-primary);
      box-shadow: inset 0 -3px 0 var(--tcds-color-theme-accent);
    }
  }
`;
