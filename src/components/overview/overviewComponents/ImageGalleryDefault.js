import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ThumbnailImage from './ImageGalleryDefaultCompents/ThumbnailImage';
import DisplayImageNav from './ImageGalleryDefaultCompents/DisplayImageNav';

const DisplayImage = styled.img`

`;
const StyledThumbnailImage = styled(ThumbnailImage)`

`;

const StyledDisplayImageNave = styled(DisplayImageNav)`

`;

const DisplayWrapper = styled.div`

`;

export default function ImageGalleryDefault({ curDisplayPhotos }) { //[{id: 0, photo: url, thumbnail: url}...]
  const [curDisplayIndex, setCurDisplayIndex] = useState(0);
  if(!curDisplayPhotos[curDisplayIndex]) {
    setCurDisplayIndex(curDisplayPhotos.length - 1);
  }
  return(
    <DisplayWrapper>
      <DisplayImage src={curDisplayPhotos[curDisplayIndex].photo} />
      {curDisplayIndex.map(({ id, thumbnail }) =>
        <StyledThumbnailImage
          id={id}
          thumbnail={thumbnail}
          curDisplayIndex={curDisplayIndex}
          setCurDisplayIndex={setCurDisplayIndex}
        />)}
      <StyledDisplayImageNav
        curDisplayIndex={curDisplayIndex}
        setCurDisplayIndex={setCurDisplayIndex}
        maxDisplayIndex={curDisplayPhotos.length - 1}
      />
    </DisplayWrapper>
  )
}