import React, { useState, useEffect } from 'react';

function StarBreakdown(props) {
  // const [five, setFive] = useState(0);
  // const [four, setFour] = useState(0);
  // const [three, setThree] = useState(0);
  // const [two, setTwo] = useState(0);
  // const [one, setOne] = useState(0);
  const [ratings, setRatings] = useState({})

  function calculateStarPercent() {
    const TOTAL_RATINGS = props.totalReviews;
    // setFive((Number(props.reviewsMeta?.ratings['5']) / TOTAL_RATINGS) * 100);
    // setFour((Number(props.reviewsMeta?.ratings['4']) / TOTAL_RATINGS) * 100);
    // setThree((Number(props.reviewsMeta?.ratings['3']) / TOTAL_RATINGS) * 100);
    // setTwo((Number(props.reviewsMeta?.ratings['2']) / TOTAL_RATINGS) * 100);
    // setOne((Number(props.reviewsMeta?.ratings['1']) / TOTAL_RATINGS) * 100);
    Object.keys(props.reviewsMeta.ratings).forEach((key) => {
      setRatings((prevState) => ({
        ...prevState,
        [key]: props.reviewsMeta.ratings[key],
      }))
    })
  }

  useEffect(() => {
    calculateStarPercent();
  }, [props.reviewsMeta.ratings]);

  return (
    <div className='star-breakdown'>
      <div>
        <button className='underline-button' >5 stars</button>
        <meter value={ratings['5']} min={0} max={100}></meter>
      </div>
      <div>
        <button className='underline-button'>4 stars</button>
        <meter value={ratings['4']} min={0} max={100}></meter>
      </div>
      <div>
        <button className='underline-button'>3 stars</button>
        <meter value={ratings['3']} min={0} max={100}></meter>
      </div>
      <div>
        <button className='underline-button'>2 stars</button>
        <meter value={ratings['2']} min={0} max={100}></meter>
      </div>
      <div>
        <button className='underline-button'>1 stars</button>
        <meter value={ratings['1']} min={0} max={100}></meter>
      </div>
    </div>
  );
}

export default StarBreakdown;
