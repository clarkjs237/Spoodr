import React from 'react';
import ReviewListItem from './ReviewListItem';

function ReviewList(props) {
  console.log(props)
  return (
    <div>
      {/* <Sort /> */}
      {props.reviews.map((review, index) => (
        <ReviewListItem review={review} postReview={props.postReview} index={index} />
      ))}
    </div>
  );
}

export default ReviewList;
