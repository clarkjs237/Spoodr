import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ThumbnailImage from './ImageGalleryDefaultComponents/ThumbnailImage';
import DisplayImageNav from './ImageGalleryDefaultComponents/DisplayImageNav';

const DisplayImage = styled.img`
  object-fit: contain;
  width: 60%;
  height: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const StyledDisplayImageNav = styled(DisplayImageNav)`

`;

const DisplayWrapper = styled.div`
  height: 25rem;
  border: solid;
  border-width: .1rem;
  border-color: #32292F;
  background-color: #D3AB9E;
  width: 50%;
  position: relative;
`;
const ThumbnailImageWrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: .5rem;
`;

export default function ImageGalleryDefault({
  curDisplayPhotos,
  curDisplayIndex,
  setCurDisplayIndex,
}) { // [{id: 0, url: url, thumbnail_url: url}...]
  if (!curDisplayPhotos[curDisplayIndex]) {
    setCurDisplayIndex(curDisplayPhotos.length - 1);
  }

  return (
    <DisplayWrapper>
      <DisplayImage src={curDisplayPhotos[curDisplayIndex].url} />
      <ThumbnailImageWrapper>
        {curDisplayPhotos.map(({ id, thumbnail_url }) => (
          <ThumbnailImage
            id={id}
            thumbnail={thumbnail_url}
            curDisplayIndex={curDisplayIndex}
            setCurDisplayIndex={setCurDisplayIndex}
          />
        ))}
      </ThumbnailImageWrapper>
      <StyledDisplayImageNav
        curDisplayIndex={curDisplayIndex}
        setCurDisplayIndex={setCurDisplayIndex}
        maxDisplayIndex={curDisplayPhotos.length - 1}
      />
    </DisplayWrapper>
  );
}
