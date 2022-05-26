// This will behave very similarly to RelatedList
// This will be a functional stateless component that just maps the ids that are passed into
// it from Related.js
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import OutfitListItem from './OutfitListItem';
import RelatedList, { Container, Carousel, Inner, Blur, Chevron } from '../RelatedList/RelatedList';
import RelatedListItem from '../RelatedList/RelatedListItem';

function OutfitList({ product }) {
  return (
    <Container>
      <Carousel>
        <Inner>
          <RelatedListItem addIcon={true} product={product} />
          {/* This is where my mapping over the My Outfit array will go */}
        </Inner>
      </Carousel>
    </Container>
  )
}

export default OutfitList;
