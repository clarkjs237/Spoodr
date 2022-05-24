// This will be a functional stateless component that just maps the ids that are passed into
// it from Related.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import RelatedListItem from './RelatedListItem';

// Experimenting with the carousel
function RelatedList({ related_ids }) {
  // related_ids is an OBJECT with the product_id as the key
  // and the default style for that product as the value
  const [activeIndex, setActiveIndex] = useState(0);
  const length = Object.keys(related_ids).length;

  const StyledSlider = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20rem;
    border: 1px red solid;
    white-space: nowrap;
    transition: transform 0.3s;
  `;

  const Tester = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  width: 15rem;
  background-color: green;
  color: white;
  border: 1px red solid;
  margin: 5px;
  `;

  const nextCard = () => {
    // if the activeIndex is the last in the array, stay at end
    // else, increase by 1 (move right)
    setActiveIndex(activeIndex === length - 1 ? activeIndex : activeIndex + 1);
  };

  const prevCard = () => {
    // if the index is 0, stay at 0
    // else, decrease the index by 1
    setActiveIndex(activeIndex === 0 ? 0 : activeIndex - 1);
  };



  return (
    <StyledSlider
      style={{ transform: `transform: translateX(-${activeIndex * 50}%)` }}
      className="carousel"
    >
      <div className="inner">
        <FaChevronLeft
          className="left-arrow"
          onClick={prevCard}
        />
        <FaChevronRight
          className="right-arrow"
          onClick={nextCard}
        />
        {/* {Object.values(related_ids).map((style, index) => (
          <div key={index}>
            <Tester></Tester>
          </div>
        ))} */}
        <Tester>
          1
        </Tester>
        <Tester>
          2
        </Tester>
        <Tester>
          3
        </Tester>
        <Tester>
          4
        </Tester>
      </div>

    </StyledSlider>
  )
}

export default RelatedList;
