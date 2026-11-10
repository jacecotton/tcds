import {css} from "lit";

export default css`
  :host {
  }

  [part=controls] {
    display: flex;
  }

  [part~=control] {
    appearance: none;
  }

  [part~=control]:hover:not(:disabled) {
  }

  [part~=control]:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
