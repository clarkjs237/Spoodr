import React from 'react';
import styled from 'styled-components';

const StyleImage = styled.img`
  border-radius: 50%;
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
      <StyleImage src={thumbnail}
    )
  } else {
    return (

    )
  }

}