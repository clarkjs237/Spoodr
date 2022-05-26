// This will be a functional stateless component that just maps the ids that are passed into
// it from Related.js
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import RelatedListItem from './RelatedListItem';


// Experimenting with the carousel
// -----------------------------------------
// CSS STYLING FROM CAROUSEL ITEM

const Inner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s ease-out;

  ${(props) => css`
      transform: translateX(-${props.activeIndex * 14 + 0.5}rem);
  `};
`;

const Carousel = styled.div`
  overflow: hidden;
  max-width: 48.5rem;
  min-width: 48.5rem;
  min-height: 19rem;
  max-height: 19rem;

  // Attempting to overlay button
  position: relative;
`;

const Blur = styled.div`
  position: absolute;
  width: 4rem;
  height: 18rem;
  top: 0.5rem;

  ${(props) => {
    if (props.left && props.activeIndex > 0) {
      return css`
        left: 0rem;
        backdrop-filter: blur(0.1rem);
        width: 4.5rem;
      `;
    }
    if (!props.left) {
      return css`
        left: 44.5rem;
        backdrop-filter: blur(0.1rem);
    `;
    }
    return css`
      visibility: hidden;
    `;
  }};
`;

// I want to retry my Chevron Tags real quick using styled components
const Chevron = styled.span`
  font-size: 4rem;
  position: absolute;
  top: 7rem;
  left: ${(props) => (props.left ? '0.5rem' : '46.5rem')};
  visibility ${(props) => {
    if (props.left && props.activeIndex === 0) {
      return 'hidden';
    }
    if (!props.left && props.activeIndex === props.length) {
      return 'hidden';
    }
    return 'visible';
  }};
  &:hover {
    color: #90D7FF;
  }
  cursor: pointer;
`;

const Related = styled.div`
  display: flex;
  flex-direction: row;
`;

function RelatedList({ styles, infos, reviews, handleRelatedItemClick }) {
// function RelatedList({ children, style, id }) {
  // related_ids is an OBJECT with the product_id as the key
  // and the default style for that product as the value
  const [activeIndex, setActiveIndex] = useState(0);
  // Length here is determined by the number of children RelatedList has
  const length = Object.keys(styles).length <= 3 ? 0 : Object.keys(styles).length - 3;

  const nextCard = () => {
    // if the activeIndex is the last in the array, stay at end
    // else, increase by 1 (move right)
    // console.log('right');
    setActiveIndex(activeIndex === length ? activeIndex : activeIndex + 1);
    // console.log(activeIndex);
  };

  const prevCard = () => {
    // if the index is 0, stay at 0
    // else, decrease the index by 1
    // console.log('left');
    setActiveIndex(activeIndex === 0 ? 0 : activeIndex - 1);
  };



  if (!styles || !infos || !reviews) {
    return <div>Empty</div>;
  }
  return (

    <Related>
      <Carousel>
        <Inner activeIndex={activeIndex}>
          {Object.values(styles).map((style, index) => (
            <RelatedListItem
              key={index}
              style={style}
              info={Object.values(infos)[index]}
              review={Object.values(reviews)[index]}
              id={Object.keys(styles)[index]}
              handleRelatedItemClick={handleRelatedItemClick}
            />
          ))}
        </Inner>
        <Blur
          left={true}
          activeIndex={activeIndex}
          length={length}
        />
        <Blur
          left={false}
          activeIndex={activeIndex}
          length={length}
        />
        <Chevron
          left={true}
          activeIndex={activeIndex}
          length={length}
          onClick={prevCard}
        >&#10216;</Chevron>
        <Chevron
          left={false}
          activeIndex={activeIndex}
          length={length}
          onClick={nextCard}
        >&#10217;</Chevron>
      </Carousel>
    </Related>

  );
}

export default RelatedList;