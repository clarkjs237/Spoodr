import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThumbnailImage from './ThumbnailImage';

const NavArrow = styled.div`
  transform: ${(props) => (props.id === 'top' ? 'rotate(90deg)' : 'rotate(270deg)')};
  font-size: 1.75rem;
  color: #32292F;
  opacity: ${(props) => (props.clear ? '0' : '1')};
  height: auto;
  width: .1rem;
  margin-left: ${(props) => (props.id === 'top' ? '1.9rem' : '1.55rem')};
  border-width: 0;
  &:hover {
    color: #90D7FF;
    cursor: ${(props) => (props.clear ? 'zoom' : 'pointer')};
  }
`;

export default function ThumbnailImageNav({
  curDisplayPhotos,
  curDisplayIndex,
  setCurDisplayIndex,
  missingImg
}) {
  const maxThumbnailIndex = 6;
  const curDisplayMaxIndex = curDisplayPhotos.length - 1;
  const [thumbnailIndex, setThumbnailIndex] = useState(curDisplayIndex);
  let navArrowTop;
  let navArrowBottom;
  let curDisplayPhotosSeven = curDisplayPhotos;

  useEffect(() => {
    setThumbnailIndex(curDisplayIndex);
  }, [curDisplayIndex]);

  function onClickHandler(e) {
    if (e.target.id === 'top') {
      if (thumbnailIndex > curDisplayMaxIndex - 4) {
        setThumbnailIndex(curDisplayMaxIndex - 4);
      } else {
        setThumbnailIndex(thumbnailIndex - 1);
      }
    } else if (thumbnailIndex < 4) {
      setThumbnailIndex(4);
    } else {
      setThumbnailIndex(thumbnailIndex + 1);
    }
  }

  if (curDisplayMaxIndex > maxThumbnailIndex) {
    if (thumbnailIndex <= 3) {
      curDisplayPhotosSeven = curDisplayPhotos.slice(0, 7);
      navArrowTop = <NavArrow id="top" clear>&#8249;</NavArrow>;
      navArrowBottom = <NavArrow id="bottom" onClick={onClickHandler}>&#8249;</NavArrow>;
    } else if (thumbnailIndex >= (curDisplayMaxIndex - 3)) {
      curDisplayPhotosSeven = curDisplayPhotos.slice(curDisplayMaxIndex - 6, curDisplayMaxIndex + 1);
      navArrowBottom = <NavArrow id="bottom" clear>&#8249;</NavArrow>;
      navArrowTop = <NavArrow id="top" onClick={onClickHandler}>&#8249;</NavArrow>;
    } else {
      curDisplayPhotosSeven = curDisplayPhotos.slice(thumbnailIndex - 3, thumbnailIndex + 4);
      navArrowBottom = <NavArrow id="bottom" onClick={onClickHandler}>&#8249;</NavArrow>;
      navArrowTop = <NavArrow id="top" onClick={onClickHandler}>&#8249;</NavArrow>;
    }
  } else {
    navArrowTop = <NavArrow id="top" clear={true}>&#8249;</NavArrow>;
    navArrowBottom = <NavArrow id="bottom" clear={true}>&#8249;</NavArrow>;
  }

  return (
    <div>
      {navArrowTop}
      {curDisplayPhotosSeven.map(({ id, thumbnail_url }) => (
        <div>
          <ThumbnailImage
            id={id}
            thumbnail={thumbnail_url}
            curDisplayIndex={curDisplayIndex}
            setCurDisplayIndex={setCurDisplayIndex}
            missingImg={missingImg}
          />
        </div>
      ))}
      {navArrowBottom}
    </div>
  );
}
