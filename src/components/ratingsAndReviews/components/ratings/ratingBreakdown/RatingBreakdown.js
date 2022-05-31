import React from 'react';
import RatingSummary from './components/RatingSummary';
import Recommendations from './components/Recommendations';
import StarBreakdown from './components/StarBreakdown';
import Characteristics from './components/Characteristics';

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
      <Characteristics
        reviewsMeta={props.reviewsMeta}
      />
    </div>
  );
}

export default RatingBreakdown;
