/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import StarRating from '../overview/overviewComponents/ProductInfoComponents/StarRating';
import { PRODUCT_ID } from '../App';

function Ratings(props) {
  function calculatePercentRecommended() {
    const TRUE = props.reviewsMeta.recommended.true;
    const FALSE = props.reviewsMeta.recommended.false;
    const TOTAL = TRUE + FALSE;
    return Math.round(TOTAL / FALSE);
  }

  return (
    <>
      <div>
        {props.averageRating}
        <StarRating averageStarRating={props.averageStarRating}/>
      </div>
      {/* { props.reviewsMeta !== undefined &&
        (
          <div>
            {calculatePercentRecommended()}
            % of reviewers reccoment this product
          </div>
        )
      } */}
      <div>
        5 stars
        <meter value={40} min={0} max={100}></meter>
      </div>
      <div>
        4 stars
        <meter value={30} min={0} max={100}></meter>
      </div>
      <div>
        3 stars
        <meter value={10} min={0} max={100}></meter>
      </div>
      <div>
        2 stars
        <meter value={15} min={0} max={100}></meter>
      </div>
      <div>
        1 stars
        <meter value={5} min={0} max={100}></meter>
      </div>
    </>
  )

}

export default Ratings;
