import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ThumbnailImage from './ImageGalleryDefaultComponents/ThumbnailImage';
import DisplayImageNav from './ImageGalleryDefaultComponents/DisplayImageNav';

const DisplayImage = styled.img`
  object-fit: cover;
  width: 60%;
  height: 100%;
  object-position: 40% 20%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const DisplayWrapper = styled.div`
  height: 25rem;
  border: solid;
  border-width: .1rem;
  border-color: #32292F;
  background-color: #D3AB9E;
  width: 37.5rem;
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
}) {
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
      <DisplayImageNav
        curDisplayIndex={curDisplayIndex}
        setCurDisplayIndex={setCurDisplayIndex}
        maxDisplayIndex={curDisplayPhotos.length - 1}
      />
    </DisplayWrapper>
  );
}
