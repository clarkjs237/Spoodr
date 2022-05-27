import React, { useState, useEffect } from 'react';
import StarRating from '../../../../../overview/overviewComponents/ProductInfoComponents/StarRating';

function RatingSummary(props) {
  return (
    <div className='rating-summary'>
      <div className='average-rating'>
        {props.averageRating}
      </div>
      <div>
        <StarRating averageStarRating={props.averageStarRating}/>
      </div>
    </div>
  );
}

export default RatingSummary;
