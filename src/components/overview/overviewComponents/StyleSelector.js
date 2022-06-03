import React from 'react';
import styled from 'styled-components';
import StyleSelectorImage from './StyleSelectorComponents/StyleSelectorImage';

const StyleName = styled.div`
margin-bottom: 1rem;
`;

const Style = styled.span`
  font-weight: bold;
`;

const ThumbnailDisplay = styled.div`
  position: relative;
  margin-right: 1rem;
  margin-top: 1rem;
`;

const ThumbnailFourBlock = styled.div`
  position: relative;
`;

const StyleWrap = styled.div`
  margin-bottom: 2.25rem;
`;

export default function StyleSelector({
  curStyleId,
  setCurStyleId,
  curStyleName,
  styleThumbnails,
  missingImg
}) {
  const setsOfFour = Math.ceil(styleThumbnails.length / 4);
  const styleThumbnailsByFour = [...Array(setsOfFour)].map((und, i) => styleThumbnails.slice(i * 4, (i + 1) * 4));

  return (
    <StyleWrap>
      <StyleName>
        <Style>{'STYLE  >  '}</Style>
        {curStyleName.toUpperCase()}
      </StyleName>
      <ThumbnailFourBlock>
        {styleThumbnailsByFour.map((fourStyleThumbnails) => (
          <ThumbnailDisplay>
            {fourStyleThumbnails.map(({ id, thumbnail }) => <StyleSelectorImage curStyleId={curStyleId} setCurStyleId={setCurStyleId} thumbnailId={id} thumbnail={thumbnail} missingImg={missingImg} />)}
          </ThumbnailDisplay>
        ))}
      </ThumbnailFourBlock>
    </StyleWrap>
  );
}
