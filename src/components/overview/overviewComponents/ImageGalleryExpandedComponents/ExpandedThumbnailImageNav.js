import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThumbnailImage from '../ImageGalleryDefaultComponents/ThumbnailImage';

const NavArrow = styled.span`
  color: #32292F;
  opacity: ${props => props.clear ? '0' : '1'};
  font-size: 2.25rem;
  &:hover {
    color: #90D7FF;
    cursor: ${props => props.clear ? 'inherit' : 'pointer'};
  }
`;

export default function ExpandedThumbnailImageNav({
  curDisplayPhotos,
  curDisplayIndex,
  setCurDisplayIndex,
}) {
  const maxThumbnailIndex = 6;
  const curDisplayMaxIndex = curDisplayPhotos.length - 1;
  const [expandedThumbnailIndex, setExpandedThumbnailIndex] = useState(curDisplayIndex);
  let navArrowLeft;
  let navArrowRight;
  let curDisplayPhotosSeven = curDisplayPhotos;

  useEffect(() => {
    setExpandedThumbnailIndex(curDisplayIndex);
  }, [curDisplayIndex]);

  function onClickHandler(e) {
    if (e.target.id === 'left') {
      if(expandedThumbnailIndex > curDisplayMaxIndex - 4) {
        setExpandedThumbnailIndex(curDisplayMaxIndex - 4);
      } else {
        setExpandedThumbnailIndex(expandedThumbnailIndex - 1);
      }
    } else {
      if(expandedThumbnailIndex < 4) {
        setExpandedThumbnailIndex(4);
      } else {
        setExpandedThumbnailIndex(expandedThumbnailIndex + 1);
      }
    }
  }

  if (curDisplayMaxIndex > maxThumbnailIndex) {
    if (expandedThumbnailIndex <= 3) {
      curDisplayPhotosSeven = curDisplayPhotos.slice(0, 7);
      navArrowLeft = <NavArrow id='left' clear={true}>&#8249;</NavArrow>;
      navArrowRight = <NavArrow id='right' onClick={onClickHandler}>&#8250;</NavArrow>;
    } else if (expandedThumbnailIndex >= (curDisplayMaxIndex- 3)) {
      curDisplayPhotosSeven = curDisplayPhotos.slice(curDisplayMaxIndex - 6, curDisplayMaxIndex + 1);
      navArrowRight = <NavArrow id='right' clear={true}>&#8250;</NavArrow>;
      navArrowLeft = <NavArrow id='left' onClick={onClickHandler}>&#8249;</NavArrow>;
    } else {
      curDisplayPhotosSeven = curDisplayPhotos.slice(expandedThumbnailIndex - 3, expandedThumbnailIndex + 4);
      navArrowRight = <NavArrow id='right' onClick={onClickHandler}>&#8250;</NavArrow>;
      navArrowLeft = <NavArrow id='left' onClick={onClickHandler}>&#8249;</NavArrow>;
    }
  }

  return (
    <>
      {navArrowLeft}
      {curDisplayPhotosSeven.map(({ id, thumbnail_url }) => (
          <ThumbnailImage
            id={id}
            thumbnail={thumbnail_url}
            curDisplayIndex={curDisplayIndex}
            setCurDisplayIndex={setCurDisplayIndex}
          />
      ))}
      {navArrowRight}
    </>
  );
}
