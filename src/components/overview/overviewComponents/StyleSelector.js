import React from 'react';
import styled from 'styled-components';
import StyleSelectorImage from './StyleSelectorComponents/StyleSelectorImage';

const StyleName = styled.p`
`;

const Style = styled.span`
  font-weight: bold;
`;

const ThumbnailDisplay = styled.div`
  position: relative;
`;

export default function StyleSelector({
  curStyleId,
  setCurStyleId,
  curStyleName,
  styleThumbnails,
}) {
  const setsOfFour = Math.ceil(styleThumbnails.length / 4);
  const styleThumbnailsByFour = [...Array(setsOfFour)].map((und, i) => styleThumbnails.slice(i * 4, (i + 1) * 4));

  return (
    <>
      <StyleName>
        <Style>{'STYLE > '}</Style>
        {curStyleName}
      </StyleName>
      <ThumbnailDisplay>
        {styleThumbnailsByFour.map((fourStyleThumbnails) => (
          <ThumbnailDisplay>
            {fourStyleThumbnails.map(({ id, thumbnail }) => <StyleSelectorImage curStyleId={curStyleId} setCurStyleId={setCurStyleId} thumbnailId={id} thumbnail={thumbnail} />)}
          </ThumbnailDisplay>
        ))}
      </ThumbnailDisplay>
    </>
  );
}
