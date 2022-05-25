import React from 'react';
import styled from 'styled-components';

const StyleImage = styled.img`
  border-radius: 50%;
`;

const StyleImageWrapper = styled.span`
  position: relative;
`;

const SelectedStyle = styled.label`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  font-size: .5rem
  border-radius: 50%;
  border-width: .1rem
`;

export default function StyleSelectorImage({
  styleId,
  setStyleId,
  thumbnail,
  thumbnailId,
}) {

  function onClickHandler(e) {
    setStyleId(e.target.value);
  }

  if(styleId === thumbnailId) {
    return (
      <StyleImageWrapper>
        <StyleImage value={thumbnailId} src={thumbnail} />
        <SelectedStyle>&#10003;</SelectedStyle>
      </StyleImageWrapper>
    )
  } else {
    return (
      <StyleImage value={thumbnailId} src={thumbnail} onClick={onClickHandler} />
    )
  }

}