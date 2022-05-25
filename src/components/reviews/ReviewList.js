/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReviewListItem from './ReviewListItem';

function ReviewList(props) {
  return (
    <div>
      {/* <Sort /> */}
      <br />
      {props.reviews.map((review, index) => (
        <ReviewListItem
          review={review}
          markReviewAsHelpful={props.markReviewAsHelpful}
          reportReview={props.reportReview}
          key={index}
        />
      ))}
    </div>
  );
}

export default ReviewList;
