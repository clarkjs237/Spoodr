import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThumbnailImage from './ThumbnailImage';

const NavArrow = styled.div`
  transform: ${(props) => (props.id === 'top' ? 'rotate(270deg)' : 'rotate(90deg)')};
  font-size: 2.75rem;
  height: 3.6875rem;
  color: #32292F;
  visibility: ${(props) => (props.clear ? 'hidden' : 'visible')};
  &:hover {
    color: #90D7FF;
    cursor: pointer;
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
      navArrowTop = <NavArrow id="top" clear>&#8250;</NavArrow>;
      navArrowBottom = <NavArrow id="bottom" onClick={onClickHandler}>&#8250;</NavArrow>;
    } else if (thumbnailIndex >= (curDisplayMaxIndex - 3)) {
      curDisplayPhotosSeven = curDisplayPhotos.slice(curDisplayMaxIndex - 6, curDisplayMaxIndex + 1);
      navArrowBottom = <NavArrow id="bottom" clear>&#8250;</NavArrow>;
      navArrowTop = <NavArrow id="top" onClick={onClickHandler}>&#8250;</NavArrow>;
    } else {
      curDisplayPhotosSeven = curDisplayPhotos.slice(thumbnailIndex - 3, thumbnailIndex + 4);
      navArrowBottom = <NavArrow id="bottom" onClick={onClickHandler}>&#8250;</NavArrow>;
      navArrowTop = <NavArrow id="top" onClick={onClickHandler}>&#8250;</NavArrow>;
    }
  } else {
    navArrowTop = <NavArrow id="top" clear={true}>&#8250;</NavArrow>;
    navArrowBottom = <NavArrow id="bottom" clear={true}>&#8250;</NavArrow>;
  }

  return (
    <div>
      {navArrowTop}
      {curDisplayPhotosSeven.map(({ id, thumbnail_url }) => (
        <div key={id}>
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
