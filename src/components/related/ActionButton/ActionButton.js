import styled, { css } from 'styled-components';

export default styled.div`
  font-size: 1.6rem;
  left: 10.7rem;
  top: 0.1rem;
  position: absolute;
  &:hover {
    color: #90D7FF;
  }
  &:before {
    ${(props) => {
    if (props.outfit) {
      return css`
        content: "\\2716";
      `;
    }
    return css`
      content: "\\2606";
    `;
  }}
  }
  cursor: pointer;
  // pointer-events: none;
`;


// export default function ActionButton() {

// }