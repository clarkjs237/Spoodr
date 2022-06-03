import React from 'react';
import styled from 'styled-components';

const Thumbnail = styled.img`
  border: solid;
  border-width: ${(props) => (props.selected ? '1.5px' : '0')};
  object-fit: cover;
  color: ${(props) => (props.selected ? '#90D7FF' : '#32292F')};
  height: 3.5rem;
  width: 3.5rem;
  cursor: pointer;
  margin: ${(props) => (props.selected ? '0' : '1.5px')};
  &:hover {
    margin: 0;
    border-width: 1.5px;
    border-color: #90D7FF;
  }
`;

export default function ThumbnailImage({
  id,
  thumbnail,
  curDisplayIndex,
  setCurDisplayIndex,
  missingImg,
}) {
  function onClickHandler(e) {
    setCurDisplayIndex(parseInt(e.target.name));
  }

  if (id === curDisplayIndex) {
    return <Thumbnail selected src={thumbnail || missingImg} name={id} onClick={onClickHandler} />;
  }
  return (
    <Thumbnail src={thumbnail || missingImg} name={id} onClick={onClickHandler} />
  );
}
