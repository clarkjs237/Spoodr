// This will be a functional stateless component that just maps the ids that are passed into
// it from Related.js
import React, { useState } from 'react';

// Experimenting with the carousel
function RelatedList({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  function updateIndex(newIndex) {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = React.Children.count(children) - 1;
    }

    setActiveIndex(newIndex);
  }

  return (
    <div className="carousel">
      <div className="inner" style={{ transform: `translateX(-${activeIndex * 50}%)` }}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { width: "50%"});
        })}
      </div>
      <div className="indicators">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default RelatedList;
