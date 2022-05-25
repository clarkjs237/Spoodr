// This will be a functional stateless component that just maps the ids that are passed into
// it from Related.js
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import RelatedListItem from './RelatedListItem';
import '/Users/sullyclark/Desktop/HackReactor/fec/src/styles.css';

// Experimenting with the carousel
// -----------------------------------------
// CSS STYLING FROM CAROUSEL ITEM

const Inner = styled.div`
  width: 160rem;
  // height: 13rem;
  white-space: nowrap;
  border: 2px green solid;
  transition: transform 0.3s ease-out;
  padding: 0.5rem;
  // margin-left: 0.5rem;

  ${(props) =>
  css`
      transform: translateX(-${props.activeIndex * 12}rem);
  `};
`;

const Carousel = styled.div`
  // display: inline-flex;
  overflow: hidden;
  border: 2px blue solid;
  // max-width: 45rem;
  max-width: 33rem;
  min-width: 30rem;
`;

// I want to retry my Chevron Tags real quick using styled components
// const LeftChevron = styled.span`
//   content: \02C3;
// `;


function RelatedList({ styles, infos }) {
// function RelatedList({ children, style, id }) {
  // related_ids is an OBJECT with the product_id as the key
  // and the default style for that product as the value
  const [activeIndex, setActiveIndex] = useState(0);
  // Length here is determined by the number of children RelatedList has
  // which is determined by the map functionality
  // const length = children.length - 1;
  const length = Object.keys(styles).length - 1;
  // const length = children.length >= 2 ? children.length - 2 : 0;
  // console.log('CHILDREN')
  // console.log(children)

  const nextCard = () => {
    // if the activeIndex is the last in the array, stay at end
    // else, increase by 1 (move right)
    // console.log('right');
    setActiveIndex(activeIndex === length - 1 ? activeIndex : activeIndex + 1);
    // console.log(activeIndex);
  };

  const prevCard = () => {
    // if the index is 0, stay at 0
    // else, decrease the index by 1
    // console.log('left');
    setActiveIndex(activeIndex === 0 ? 0 : activeIndex - 1);
  };

  if (!styles || !infos) {
    return <div>Empty</div>;
  }
  return (

    <Carousel>
      <FaChevronLeft className="left-arrrow" onClick={prevCard} />
      <FaChevronRight className="right-arrrow" onClick={nextCard} />
      <Inner activeIndex={activeIndex}>
        {Object.values(styles).map((style, index) => (
          <RelatedListItem
            key={index}
            style={style}
            info={Object.values(infos)[index]}
            id={Object.keys(styles)[index]}
          />
        ))}
      </Inner>
    </Carousel>
  );
}

export default RelatedList;


// This is experimental. I'm really struggling with the Related
// <div className="carousel">
//   <FaChevronLeft className="left-arrrow" onClick={prevCard} />
//   <FaChevronRight className="right-arrrow" onClick={nextCard} />
//   {/* <LeftChevron /> */}
//   <Inner style={{transform: `translateX(-${activeIndex * 25}%)`}}>
//     {React.Children.map(children, (child, index) => (
//       React.cloneElement(child, { width: '25%' })
//       // React.cloneElement(child, { width: '10rem' })
//     ))}
//   </Inner>
// </div>