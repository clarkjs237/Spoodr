import React from 'react';
import RatingBreakdown from './ratingBreakdown/RatingBreakdown';

function Ratings(props) {
  return (
    <div>
      <RatingBreakdown
        averageRating={props.averageRating}
        averageStarRating={props.averageStarRating}
        totalReviews={props.totalReviews}
        reviewsMeta={props.reviewsMeta}
      />
    </div>
  );
}

export default Ratings;
