import {css} from "lit";

export default css`
  :host {
    display: flex;
    flex-direction: column;
  }

  [part="controls"] {
    display: flex;
    justify-content: end;
    border-bottom: 1px solid var(--tcds-color-theme-edge);
    padding: 0 0 var(--tcds-space-component-sm);
  }
`;
