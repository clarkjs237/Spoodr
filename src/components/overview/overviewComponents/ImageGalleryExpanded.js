import React, { useState } from 'react';
import styled from 'styled-components';
import ThumbnailImage from './ImageGalleryDefaultComponents/ThumbnailImage';
import DisplayImageNav from './ImageGalleryDefaultComponents/DisplayImageNav';

const ImageGalleryExpandedWrapper = styled.div`

`;

const ExpandedImage = styled.img`

`;

const ZoomedImage = styled.img`

`;

const ExpandedThumbnailImages = styled.div`

`;

const LeaveExpandedView = styled.div`

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
    <ZoomedImage
      id='ZoomedImage'
      src={curDisplayPhotos[curDisplayIndex].url}
      onClick={onClickHandler}
    />
  }

  return(
    <ImageGalleryExpandedWrapper>
      <ExpandedImage
        id='ExpandedImage'
        src={curDisplayPhotos[curDisplayIndex].url}
        onClick={onClickHandler}
      />
      <DisplayImageNav
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
