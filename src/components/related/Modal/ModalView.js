import React from 'react';
import styled, { css } from 'styled-components';

const Modal = styled.div`
  height: 16rem;
  width: 16rem;
  position: absolute;
  background-color: red;
  border: 2px black solid;
  transition: transform 0.5s ease-out;
  top: -62rem;
  // left: ${(props) => (props.index * 8.5) + 8.5}rem;
  left: 24rem;
`;

export default function ModalView({}) {
  return <Modal>I'm a div!</Modal>;
}
