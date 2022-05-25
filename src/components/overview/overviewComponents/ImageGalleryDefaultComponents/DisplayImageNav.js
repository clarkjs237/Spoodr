import React from 'react';
import styled from 'styled-components';

const ImageNav = styled.div`
  position: absolute;
  top: 12rem;
  left: ${(props) => (props.next ? '35rem' : '3rem')};
  font-size: 2rem;
  color: #32292F;
  &:hover {
    color: #90D7FF;
    cursor: pointer;
  }
`;

export default function DisplayImageNav({
  curDisplayIndex,
  setCurDisplayIndex,
  maxDisplayIndex,
}) {
  function onClickHandler(e) {
    debugger;
    if (e.target.id === 'back') {
      setCurDisplayIndex(curDisplayIndex - 1);
    } else {
      setCurDisplayIndex(curDisplayIndex + 1);
    }
  }

  if (curDisplayIndex === 0) {
    return (
      <ImageNav next onClick={onClickHandler}>&#8594;</ImageNav>
    );
  }
  if (curDisplayIndex === maxDisplayIndex) {
    return (
      <ImageNav id="back" onClick={onClickHandler}>&#8592;</ImageNav>
    );
  }
  return (
    <>
      <ImageNav id="back" onClick={onClickHandler}>&#8592;</ImageNav>
      <ImageNav next onClick={onClickHandler}>&#8594;</ImageNav>
    </>
  );
}
