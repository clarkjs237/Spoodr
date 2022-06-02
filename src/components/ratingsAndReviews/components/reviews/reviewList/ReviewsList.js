/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReviewListItem from './ReviewListItem';

function ReviewsList(props) {
  return (
    <div>
      {props.reviews.map((review, index) => (
        <ReviewListItem
          review={review}
          key={index}
        />
      ))}
    </div>
  );
}

export default ReviewsList;
