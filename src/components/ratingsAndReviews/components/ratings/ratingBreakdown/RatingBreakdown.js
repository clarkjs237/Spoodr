/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import RatingSummary from './RatingSummary';
import Recommendations from './Recommendations';
import StarBreakdown from './StarBreakdown';

function RatingBreakdown(props) {
  return (
    <div>
      <RatingSummary
        averageRating={props.averageRating}
        averageStarRating={props.averageStarRating}
        reviewsMeta={props.reviewsMeta}
      />
      <Recommendations
        reviewsMeta={props.reviewsMeta}
      />
      <StarBreakdown
        totalReviews={props.totalReviews}
        reviewsMeta={props.reviewsMeta}/>
    </div>
  );
}

export default RatingBreakdown;
