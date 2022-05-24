import React from 'react';
import StyleSelectorImage from './StyleSelectorComponents/StyleSelectorImage';
import styled from 'styled-components';

const StyleTitle = styled.p`
`;

const Style = styled.span`
  font-weight: bold;
`;

const ThumbnailDisplay = styled.p`
`;

export default function StyleSelector({
  curStyleId,
  setStyleId,
  styleTitle,
  styleThumbnails//[{id: 0, thumbnail: someurl},...]
}) {

  let setsOfFour = Math.ceil(styleThumbnails.length / 4);
  let styleThumbnailsByFour = [...Array(setsOfFour)].map((und, i) =>
    styleThumbnails.slice((i * setsOfFour, (i + 1) * setsOfFour)));

  return (
    <>
      <StyleTitle><Style>{'STYLE >'}</Style>{styleTitle}</StyleTitle>
      <ThumbnailDisplay>
        {styleThumbnailsByFour.map((fourStyleThumbnails) => {
          return <ThumbnailDisplay>
            {fourStyleThumbnails.map(({ id, thumbnail }) => {
              return <StyleSelectorImage curStyleId={curStyleId} setStyleId={setStyleId} thumbnailId={id} thumbnail={thumbnail} />
            })}
          </ThumbnailDisplay>
        })}
      </ThumbnailDisplay>
    </>
  )
}
