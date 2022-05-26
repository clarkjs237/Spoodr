import React, { useState } from 'react';
import styled from 'styled-components';
import ThumbnailImage from './ImageGalleryDefaultComponents/ThumbnailImage';
import ExpandedImageNav from './ImageGalleryExpandedComponents/ExpandedImageNav';

const ImageGalleryExpandedWrapper = styled.div`
  heigth: 100%;
  width: 100%;
  background-color: #EAC9C1;
  position: relative;
`;

const ExpandedImage = styled.img`
  display: block;
  height: 92vh;
  width: auto;
  border: solid;
  object-fit: cover;
  border-width: .1rem;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    cursor: crosshair;
  }
`;

const ZoomedImage = styled.img`
&:hover {
  cursor: crosshair;
`;

const ExpandedThumbnailImages = styled.div`
  width: fit-content;
  margin: auto;

`;

const LeaveExpandedView = styled.div`
  position: absolute;
  top: 0;
  left: 95%;
  font-size: 1.75rem;
  color: #D3AB9E;
  &:hover {
    cursor: pointer;
    color: #90D7FF;
`;

export default function ImageGalleryExpanded({
  curDisplayPhotos,
  curDisplayIndex,
  setCurDisplayIndex,
  setExpandedView
}) {
  const [zoomedView, setZoomedView] = useState(false);

  function onClickHandler (e) {
    if(e.target.id === 'ExpandedImage') {
      setZoomedView(true)
    }
    if(e.target.id === 'ZoomedImage') {
      setZoomedView(false)
    }
    if(e.target.id === 'LeaveExpanded') {
      setExpandedView(false)
    }
  }

  if (zoomedView) {
    return (
      <ZoomedImage
        id='ZoomedImage'
        src={curDisplayPhotos[curDisplayIndex].url}
        onClick={onClickHandler}
      />
    )
  }

  return(
    <ImageGalleryExpandedWrapper>
      <ExpandedImage
        id='ExpandedImage'
        src={curDisplayPhotos[curDisplayIndex].url}
        onClick={onClickHandler}
      />
      <ExpandedImageNav
        curDisplayIndex={curDisplayIndex}
        setCurDisplayIndex={setCurDisplayIndex}
        maxDisplayIndex={curDisplayPhotos.length - 1}
      />
      <ExpandedThumbnailImages>
        {curDisplayPhotos.map(({ id, thumbnail_url }) => (
            <ThumbnailImage
              id={id}
              thumbnail={thumbnail_url}
              curDisplayIndex={curDisplayIndex}
              setCurDisplayIndex={setCurDisplayIndex}
            />
        ))}
      </ExpandedThumbnailImages>
      <LeaveExpandedView id='LeaveExpanded' onClick={onClickHandler}>
        &#9447;
      </LeaveExpandedView>
    </ImageGalleryExpandedWrapper>
  )
}
