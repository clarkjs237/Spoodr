import React from 'react';
import ReviewListItem from './ReviewListItem';

function ReviewList(props) {
  return (
    <ReviewListItem product_id={props.product_id} postReview={props.postReview}/>
  );
}

export default ReviewList;
