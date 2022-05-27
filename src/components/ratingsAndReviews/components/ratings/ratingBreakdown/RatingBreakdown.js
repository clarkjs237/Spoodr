import React from 'react';
import RatingSummary from './components/RatingSummary';
import Recommendations from './components/Recommendations';
import StarBreakdown from './components/StarBreakdown';
import Factors from './components/Factors';

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
        reviewsMeta={props.reviewsMeta}
      />
      <Factors
        reviewsMeta={props.reviewsMeta}
      />
    </div>
  );
}

export default RatingBreakdown;
