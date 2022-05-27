import React from 'react';
import styled from 'styled-components';

const StyledDisplayImageNav = styled.div`
  position: absolute;
  top: 12rem;
  left: ${(props) => (props.next ? '35rem' : '3.5rem')};
  font-size: 2.25rem;
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
  // additionally functionality left in place for a quick refactor to looping scroll but has no effect due to render
  function onClickHandler(e) {
    if (e.target.id === 'back') {
      if (curDisplayIndex === 0) {
        setCurDisplayIndex(maxDisplayIndex);
      } else {
        setCurDisplayIndex(curDisplayIndex - 1);
      }
    } else if (curDisplayIndex === maxDisplayIndex) {
      setCurDisplayIndex(0);
    } else {
      setCurDisplayIndex(curDisplayIndex + 1);
    }
  }

  if (curDisplayIndex === 0) {
    return (
      <div>
        <StyledDisplayImageNav next onClick={onClickHandler}>&#8250;</StyledDisplayImageNav>
      </div>
    );
  }
  if (curDisplayIndex === maxDisplayIndex) {
    return (
      <div>
        <StyledDisplayImageNav id="back" onClick={onClickHandler}>&#8249;</StyledDisplayImageNav>
      </div>
    );
  }
  return (
    <div>
      <StyledDisplayImageNav id="back" onClick={onClickHandler}>&#8249;</StyledDisplayImageNav>
      <StyledDisplayImageNav next onClick={onClickHandler}>&#8250;</StyledDisplayImageNav>
    </div>
  );
}
