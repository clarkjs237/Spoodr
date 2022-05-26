import React from 'react';
import styled from 'styled-components';

const Thumbnail = styled.img`
  border: solid;
  object-fit: cover;
  border-width: .1rem;
  border-color: ${(props) => (props.selected ? '#90D7FF' : '#32292F')};
  height: 2.5rem;
  width: 2.5rem;
  margin: .01rem;
  cursor: pointer;
  &:hover {
    border-color: #90D7FF;
  }
`;

export default function ThumbnailImage({
  id,
  thumbnail,
  curDisplayIndex,
  setCurDisplayIndex,
}) {
  function onClickHandler(e) {
    setCurDisplayIndex(parseInt(e.target.name));
  }

  if (id === curDisplayIndex) {
    return <Thumbnail selected src={thumbnail} name={id} onClick={onClickHandler} />;
  }
  return (
    <Thumbnail src={thumbnail} name={id} onClick={onClickHandler} />
  );
}
