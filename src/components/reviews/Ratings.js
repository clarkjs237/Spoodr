/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import StarRating from '../overview/overviewComponents/ProductInfoComponents/StarRating';
import { PRODUCT_ID } from '../App';

function Ratings(props) {
  const [reviewsMeta, setReviewsMeta] = useState(props.reviewsMeta);
  const [percentRecommended, setPercentRecommended] = useState(0);

  function calculatePercentRecommended() {
    const TRUE = Number(reviewsMeta.recommended.true)
    const FALSE = Number(reviewsMeta.recommended.false)
    const TOTAL = TRUE + FALSE;
    setPercentRecommended(Math.round((TRUE / TOTAL) * 100));
  }

  function calculateStarPercent(ratings) {
    const TOTAL_RATINGS = props.totalReviews;
    return (Math.round((ratings / TOTAL_RATINGS) * 100));
  }

  function getReviewsMeta(id) {
    fetch(`${URL}/reviews/meta?product_id=${id}`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setReviewsMeta(result);
      });
  }

  useEffect(() => {
    // calculatePercentRecommended();
  }, [reviewsMeta.recommended]);

  return (
    <div>
      <div>
        {props.averageRating}
        <StarRating averageStarRating={props.averageStarRating}/>
      </div>
      <div>
        {percentRecommended}
        % of reviewers reccoment this product
      </div>
      {/* <div>
        5 stars
        <meter value={calculateStarPercent(reviewsMeta.ratings["5"])} min={0} max={100}></meter>
      </div>
      <div>
        4 stars
        <meter value={calculateStarPercent(reviewsMeta.ratings["4"])} min={0} max={100}></meter>
      </div>
      <div>
        3 stars
        <meter value={calculateStarPercent(reviewsMeta.ratings["3"])} min={0} max={100}></meter>
      </div>
      <div>
        2 stars
        <meter value={calculateStarPercent(reviewsMeta.ratings["2"])} min={0} max={100}></meter>
      </div>
      <div>
        1 stars
        <meter value={calculateStarPercent(reviewsMeta.ratings["1"])} min={0} max={100}></meter>
      </div> */}
    </div>
  );
}

export default Ratings;
