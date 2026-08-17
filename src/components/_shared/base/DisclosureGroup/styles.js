import {css} from "lit";

export default css`
  :host(:not([hidden])) {
    display: block;
  }

  [part=items] {
    display: block;
  }
`;
