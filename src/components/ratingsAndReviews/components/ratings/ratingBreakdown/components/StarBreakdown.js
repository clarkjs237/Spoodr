import React, { useState, useEffect } from 'react';

function StarBreakdown(props) {
  const [five, setFive] = useState(0);
  const [four, setFour] = useState(0);
  const [three, setThree] = useState(0);
  const [two, setTwo] = useState(0);
  const [one, setOne] = useState(0);

  function calculateStarPercent() {
    const TOTAL_RATINGS = props.totalReviews;
    setFive((props.reviewsMeta.ratings[5] / TOTAL_RATINGS) * 100);
    setFour((props.reviewsMeta.ratings[4] / TOTAL_RATINGS) * 100);
    setThree((props.reviewsMeta.ratings[3] / TOTAL_RATINGS) * 100);
    setTwo((props.reviewsMeta.ratings[2] / TOTAL_RATINGS) * 100);
    setOne((props.reviewsMeta.ratings[1] / TOTAL_RATINGS) * 100);
  }

  useEffect(() => {
    calculateStarPercent();
  }, [props.reviewsMeta.ratings]);

  return (
    <div>
      <div>
        <button>5 stars</button>
        <meter value={five} min={0} max={100}></meter>
      </div>
      <div>
      <button>4 stars</button>
        <meter value={four} min={0} max={100}></meter>
      </div>
      <div>
      <button>3 stars</button>
        <meter value={three} min={0} max={100}></meter>
      </div>
      <div>
      <button>2 stars</button>
        <meter value={two} min={0} max={100}></meter>
      </div>
      <div>
      <button>1 stars</button>
        <meter value={one} min={0} max={100}></meter>
      </div>
    </div>
  );
}

export default StarBreakdown;
