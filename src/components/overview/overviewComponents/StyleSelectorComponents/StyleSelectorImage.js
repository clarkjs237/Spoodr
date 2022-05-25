import React from 'react';
import styled from 'styled-components';

const StyleImage = styled.img`
  border-radius: 50%;
  border: solid;
  border-width: .1rem;
  border-color: #0B2027;
  cursor: pointer;
  width: 3.5rem;
  height: 3.5rem;
  padding: 0;
  margin: .01rem;
`;

const Check = styled.label`
  position: absolute;
  border-radius: 40%;
  border: solid;
  border-width: .1rem;
  color: #32292F;
  background-color: #90D7FF;
  font-size: .5rem;
  font-weight: bold;
  margin: 0 -.5rem;
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
      <>
        <StyleImage name={thumbnailId} src={thumbnail} />
        <Check>&#10003;</Check>
      </>
    );
  }
  return (
    <StyleImage name={thumbnailId} src={thumbnail} onClick={onClickHandler} />
  );
}
