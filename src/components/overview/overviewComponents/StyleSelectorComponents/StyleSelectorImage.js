import React from 'react';
import styled from 'styled-components';

const StyleImage = styled.img`
  object-fit: cover;
  color: white;
  border: solid;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  &:hover {
    color: #90D7FF;
  }
`;

const StyleSpan = styled.span`
  position: relative;
`;

const Check = styled.label`
  position: absolute;
  border-radius: 50%;
  border: solid;
  border-width: .1rem;
  color: #32292F;
  background-color: #90D7FF;
  top: -2.75rem;
  left: 2.75rem;
  font-size: .5rem;
  font-weight: bold;
  width: .5rem;
  height: auto;
  `;

export default function StyleSelectorImage({
  curStyleId,
  setCurStyleId,
  thumbnail,
  thumbnailId,
}) {
  function onClickHandler(e) {
    setCurStyleId(parseInt(e.target.name));
  }

  if (curStyleId === thumbnailId) {
    return (
      <StyleSpan>
        <StyleImage name={thumbnailId} src={thumbnail} />
        <Check>&#10003;</Check>
      </StyleSpan>
    );
  }
  return (
    <StyleImage name={thumbnailId} src={thumbnail} onClick={onClickHandler} />
  );
}
