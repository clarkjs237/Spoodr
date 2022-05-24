// This will be a functional stateless component that just maps the ids that are passed into
// it from Related.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import RelatedListItem from './RelatedListItem';

// Experimenting with the carousel
function RelatedList({ related_ids }) {
  // related_ids is an array of ids [65632, 65633, 65638, 65637]
  const [activeIndex, setActiveIndex] = useState(0);
  const length = related_ids.length;

  const StyledSlider = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
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
      style={{transform: `transform: translateX(-${activeIndex * 50}%)`}}
      className="carousel"
    >
    {activeIndex}
    <div className="inner">
      <FaChevronLeft
          className="left-arrow"
          onClick={prevCard}
      />
      <FaChevronRight
        className="right-arrow"
        onClick={nextCard}
      />
      {related_ids.map((id, index) => (
        <div key={index}>
          {index === activeIndex && (
            <RelatedListItem id={id} width={'10%' } />
          )}
        </div>
      ))}
    </div>

    </StyledSlider>
  )


  // function updateIndex(newIndex) {
  //   if (newIndex < 0) {
  //     newIndex = 0;
  //   } else if (newIndex >= React.Children.count(children)) {
  //     newIndex = React.Children.count(children) - 1;
  //   }

  //   setActiveIndex(newIndex);
  // }

  // return (
  //   <div className="carousel">
  //     <div className="inner" style={{ transform: `translateX(-${activeIndex * 50}%)` }}>
  //       {React.Children.map(children, (child) => (
  //         React.cloneElement(child, { width: '10%' })
  //       ))}
  //     </div>
  //     <div className="indicators">
  //       <button
  //         onClick={() => {
  //           updateIndex(activeIndex - 1);
  //         }}
  //       >
  //         Prev
  //       </button>
  //       <button
  //         onClick={() => {
  //           updateIndex(activeIndex + 1);
  //         }}
  //       >
  //         Next
  //       </button>
  //     </div>
  //   </div>
  // )





}

export default RelatedList;
