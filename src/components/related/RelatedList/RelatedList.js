// This will be a functional stateless component that just maps the ids that are passed into
// it from Related.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import RelatedListItem from './RelatedListItem';
import '/Users/sullyclark/Desktop/HackReactor/fec/src/styles.css';

// Experimenting with the carousel
// function RelatedList({ related_ids }) {
function RelatedList({ children, style, id }) {
  // related_ids is an OBJECT with the product_id as the key
  // and the default style for that product as the value
  const [activeIndex, setActiveIndex] = useState(0);
  // const length = Object.keys(related_ids).length;
  // const length = 3;
  const length = children.length - 1;
  console.log('CHILDREN')
  console.log(children)

  // const StyledSlider = styled.div`
  //   position: relative;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   height: 20rem;
  //   border: 1px red solid;
  //   white-space: nowrap;
  //   transition: transform 0.3s;
  // `;

  // const Tester = styled.div`
  //   display: inline-flex;
  //   align-items: center;
  //   justify-content: center;
  //   height: 10rem;
  //   width: 400%;
  //   background-color: green;
  //   color: white;
  //   border: 1px red solid;
  //   margin: 5px;
  // `;

  const nextCard = () => {
    // if the activeIndex is the last in the array, stay at end
    // else, increase by 1 (move right)
    console.log('right');
    setActiveIndex(activeIndex === length - 1 ? activeIndex : activeIndex + 1);
    console.log(activeIndex);
  };

  const prevCard = () => {
    // if the index is 0, stay at 0
    // else, decrease the index by 1
    console.log('left');
    setActiveIndex(activeIndex === 0 ? 0 : activeIndex - 1);
    console.log(activeIndex);
  };

  // -----------------------------------------
  // CSS STYLING FROM CAROUSEL ITEM


  return (
    <div className="carousel">
      <FaChevronLeft className="left-arrrow" onClick={prevCard} />
      <FaChevronRight className="right-arrrow" onClick={nextCard} />
      <div className="inner" style={{transform: `translateX(-${activeIndex * 50}%)` }}>
        {React.Children.map(children, (child, index) => (
          React.cloneElement(child, { width: '50%' })
        ))}
      </div>
    </div>
  );
}

export default RelatedList;
