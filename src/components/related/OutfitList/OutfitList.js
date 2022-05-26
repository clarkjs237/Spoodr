// This will behave very similarly to RelatedList
// This will be a functional stateless component that just maps the ids that are passed into
// it from Related.js
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import OutfitListItem from './OutfitListItem';
import { Container, Carousel, Inner, Blur, Chevron } from '../RelatedList/RelatedList';

function OutfitList() {
  return (
    <div>
      Outfit List
      <Carousel></Carousel>
    </div>
  )
}

export default OutfitList;
