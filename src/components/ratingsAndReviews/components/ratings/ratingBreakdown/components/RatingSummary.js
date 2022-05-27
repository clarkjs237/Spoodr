import React, { useState, useEffect } from 'react';
import StarRating from '../../../../../overview/overviewComponents/ProductInfoComponents/StarRating';

function RatingSummary(props) {
  return (
    <div>
      {props.averageRating}
      <StarRating averageStarRating={props.averageStarRating}/>
    </div>
  );
}

export default RatingSummary;
