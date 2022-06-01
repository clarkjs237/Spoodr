import React from 'react';
import styled from 'styled-components';
import StyleSelectorImage from './StyleSelectorComponents/StyleSelectorImage';

const StyleName = styled.div`
margin-bottom: .25rem;
`;

const Style = styled.span`
  font-weight: bold;
`;

const ThumbnailDisplay = styled.div`
  position: relative;
`;

const StyleWrap = styled.div`
  margin-bottom: .4rem;
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
    <StyleWrap>
      <StyleName>
        <Style>{'STYLE > '}</Style>
        {curStyleName.toUpperCase()}
      </StyleName>
      <ThumbnailDisplay>
        {styleThumbnailsByFour.map((fourStyleThumbnails) => (
          <ThumbnailDisplay>
            {fourStyleThumbnails.map(({ id, thumbnail }) => <StyleSelectorImage curStyleId={curStyleId} setCurStyleId={setCurStyleId} thumbnailId={id} thumbnail={thumbnail} />)}
          </ThumbnailDisplay>
        ))}
      </ThumbnailDisplay>
    </StyleWrap>
  );
}
