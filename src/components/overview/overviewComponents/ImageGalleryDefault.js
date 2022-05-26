import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ThumbnailImage from './ImageGalleryDefaultComponents/ThumbnailImage';
import DisplayImageNav from './ImageGalleryDefaultComponents/DisplayImageNav';

const DisplayImage = styled.img`
  object-fit: cover;
  cursor: zoom-in;
  width: 60%;
  height: 100%;
  object-position: 40% 20%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  &:hover: {
    cursor: zoom-in;
  }
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
  setExpandedView
}) {
  if (!curDisplayPhotos[curDisplayIndex]) {
    setCurDisplayIndex(curDisplayPhotos.length - 1);
  }

  function onClickHandler(e) {
    setExpandedView(true);
  }

  return (
    <DisplayWrapper>
      <DisplayImage
        src={curDisplayPhotos[curDisplayIndex].url}
        onClick={onClickHandler}
      />
      <ThumbnailImageWrapper>
        {curDisplayPhotos.map(({ id, thumbnail_url }) => (
          <div>
            <ThumbnailImage
              id={id}
              thumbnail={thumbnail_url}
              curDisplayIndex={curDisplayIndex}
              setCurDisplayIndex={setCurDisplayIndex}
            />
          </div>
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
