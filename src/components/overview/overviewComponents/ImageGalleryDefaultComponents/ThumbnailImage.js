import React from 'react';
import styled from 'styled-components';

const Thumbnail = styled.img`
  border: solid;
  object-fit: cover;
  border-width: ${(props) => (props.selected ? '.1rem' : '0')};
  border-color: ${(props) => (props.selected ? '#90D7FF' : '#32292F')};
  height: 3.17rem;
  width: 3.17rem;
  margin: 0rem;
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
