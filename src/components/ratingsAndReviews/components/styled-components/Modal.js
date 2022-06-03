import styled from 'styled-components';

export const StyledModal = styled.div`
  background-color: white;
  position: fixed;
  float: left;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  padding: 50px;
`;

export const StyledModalBG = styled.div`
  background-color: rgb(0, 0, 0);
  position: fixed;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  z-index: 50;
  opacity: 50%;
`;