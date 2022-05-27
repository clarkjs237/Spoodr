import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThumbnailImage from './ThumbnailImage';

export default function ThumbnailImageNav({
  curDisplayPhotos,
  curDisplayIndex,
  setCurDisplayIndex,
}) {
  const maxThumbnailIndex = 6;
  const curDisplayMaxIndex = curDisplayPhotos.length - 1;
  const [thumbnailIndex, setThumbnailIndex] = useState(curDisplayIndex);
  let navArrows = { top: false, bottom: false };
  let curDisplayPhotosSeven = curDisplayPhotos;

  useEffect(() => {
    setThumbnailIndex(curDisplayIndex);
  }, [curDisplayIndex]);

  function onClickHandler(e) {
    if (e.target.id === 'top') {
      setThumbnailIndex(thumbnailIndex - 1);
    } else {
      setThumbnailIndex(thumbnailIndex + 1);
    }
  }

  if (curDisplayMaxIndex > maxThumbnailIndex) {
    if (thumbnailIndex <= 3) {
      curDisplayPhotosSeven = curDisplayPhotos.slice(0, 7);
      navArrows = { top: false, bottom: true };
    } else if (thumbnailIndex >= (curDisplayMaxIndex- 3)) {
      curDisplayPhotosSeven = curDisplayPhotos.slice(curDisplayMaxIndex - 6, curDisplayMaxIndex + 1);
      navArrows = { top: true, bottom: false };
    } else {
      curDisplayPhotosSeven = curDisplayPhotos.slice(thumbnailIndex - 3, thumbnailIndex + 4);
      navArrows = { top: true, bottom: true };
    }
  }

  return (
    <div>
      {curDisplayPhotosSeven.map(({ id, thumbnail_url }) => (
        <div>
          <ThumbnailImage
            id={id}
            thumbnail={thumbnail_url}
            curDisplayIndex={curDisplayIndex}
            setCurDisplayIndex={setCurDisplayIndex}
          />
        </div>
      ))}
    </div>
  );
}
