/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import StarRating from '../../../overview/overviewComponents/ProductInfoComponents/StarRating';
import { PRODUCT_ID } from '../../../App';

function Ratings(props) {
  // const [reviewsMeta, setReviewsMeta] = useState(props.reviewsMeta);
  const [percentRecommended, setPercentRecommended] = useState(0);
  const [five, setFive] = useState(0);
  const [four, setFour] = useState(0);
  const [three, setThree] = useState(0);
  const [two, setTwo] = useState(0);
  const [one, setOne] = useState(0);

  function calculatePercentRecommended() {
    const TRUE = Number(props.reviewsMeta.recommended.true)
    const FALSE = Number(props.reviewsMeta.recommended.false)
    const TOTAL = TRUE + FALSE;
    setPercentRecommended(Math.floor((TRUE / TOTAL) * 100));
  }

  function calculateStarPercent() {
    const TOTAL_RATINGS = props.totalReviews;
    setFive(Math.floor((props.reviewsMeta.ratings[5] / TOTAL_RATINGS) * 100));
    setFour(Math.floor((props.reviewsMeta.ratings[4] / TOTAL_RATINGS) * 100));
    setThree(Math.floor((props.reviewsMeta.ratings[3] / TOTAL_RATINGS) * 100));
    setTwo(Math.floor((props.reviewsMeta.ratings[2] / TOTAL_RATINGS) * 100));
    setOne(Math.floor((props.reviewsMeta.ratings[1] / TOTAL_RATINGS) * 100));
  }

  useEffect(() => {
    calculatePercentRecommended();
    calculateStarPercent();
  }, [props.reviewsMeta.recommended.true, props.reviewsMeta.ratings]);

  return (
    <div>
      <div>
        {props.averageRating}
        <StarRating averageStarRating={props.averageStarRating}/>
      </div>
      <div>
        {percentRecommended}
        % of reviewers recommend this product
      </div>
      <div>
        5 stars
        <meter value={five} min={0} max={100}></meter>
      </div>
      <div>
        4 stars
        <meter value={four} min={0} max={100}></meter>
      </div>
      <div>
        3 stars
        <meter value={three} min={0} max={100}></meter>
      </div>
      <div>
        2 stars
        <meter value={two} min={0} max={100}></meter>
      </div>
      <div>
        1 stars
        <meter value={one} min={0} max={100}></meter>
      </div>
    </div>
  );
}

export default Ratings;
