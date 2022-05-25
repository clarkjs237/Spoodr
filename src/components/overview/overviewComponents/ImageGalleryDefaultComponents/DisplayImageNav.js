import React from 'react';
import styled from 'styled-components';

const ImageNav = styled.span`
`;

export default function DisplayImageNav({
  curDisplayIndex,
  setCurDisplayIndex,
  maxDisplayIndex,
}) {
  function onClickHandler(e) {
    if (e.target.name) {
      setCurDisplayIndex(curDisplayIndex + 1);
    } else {
      setCurDisplayIndex(curDisplayIndex - 1);
    }
  }

  if (curDisplayIndex === 0) {
    return (
      <ImageNav />
    );
  }
  if (curDisplayIndex === maxDisplayIndex) {
    return (
      <ImageNav />
    );
  }
  return (
    <ImageNav />
  );
}
