import React from 'react';
import styled from 'styled-components';

const Thumbnail = styled.img`
  border: solid;
  border-width: ${(props) => (props.selected ? '.15rem' : '0')};
  object-fit: cover;
  color: ${(props) => (props.selected ? '#90D7FF' : '#32292F')};
  height: 3.2rem;
  width: 3.2rem;
  cursor: pointer;
  margin: ${(props) => (props.selected ? '0' : '.15rem')};
  &:hover {
    margin: 0;
    border-width: .15rem;
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
