import React from 'react';
import styled from 'styled-components';

const Thumbnail = styled.img`
  border: solid;
  border-width: .5rem;
  bordercolor: ${props => props.selected ? '#90D7FF' : '#32292F'}
`;

export default function ThumbnailImage({
  id,
  thumbnail,
  curDisplayIndex,
  setCurDisplayIndex
}) {

  function onClickHandler(e) {
    setCurDisplayIndex(e.target.name)
  }

  if(id === curDisplayIndex) {
    return <Thumbnail selected src={thumbnail}/>
  }
  return(
    <Thumbnail src={thumbnail}/>
  )
}