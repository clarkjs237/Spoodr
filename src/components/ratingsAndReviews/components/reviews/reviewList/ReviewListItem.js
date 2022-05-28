/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import StarRating from '../../../../overview/overviewComponents/ProductInfoComponents/StarRating';
import ReviewPhoto from './ReviewPhoto';
import { URL } from "../../../../App";
import { format } from 'date-fns';

function ReviewListItem(props) {
  const [helpfulness, setHelpfulness] = useState(
    {
      value: props.review.helpfulness,
      clicked: false,
    },
  );

  function markReviewAsHelpful(reviewId) {
    fetch(
      `${URL}/reviews/${reviewId}/helpful`,
      {
        method: 'PUT',
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      }
    )
      // .then((response) => response.json())
      .then(() => setHelpfulness({ value: helpfulness.value + 1, clicked: true }));
  }

  function reportReview(reviewId) {
    fetch(
      `${URL}/reviews/${reviewId}/report`,
      {
        method: 'PUT',
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      }
    )
      // .then((response) => response.json())
      .then(() => console.log(`reported review:: ${reviewId}`));
  }

  function handleHelfulnessClick() {
    markReviewAsHelpful(props.review.review_id);
  }

  function handleReportClick() {
    reportReview(props.review.review_id);
  }

  return (
    <div className='review-list-item'>
      <div className='review-item-header'>
        <div>
          <StarRating averageStarRating={props.review.rating}/>
        </div>
        <div>
          {props.review.reviewer_name} {format(new Date(props.review.date), 'MMMM dd, yyyy')}
        </div>
      </div>
      <div className="review-item-summary">
        {props.review.summary}
      </div>
      <div className="review-item-body">
        {props.review.body}
        <div className="review-item-photos">
          {props.review.photos.map((photo, index) => (
            <ReviewPhoto
              url={photo.url}
              key={index}
            />
          ))}
        </div>
      </div>
      { props.review.recommend === true &&
        <div className="review-item-recommend"> ✔ I recommend this product. </div>
      }
      { props.review.response &&
        (
          <div className="review-item-response">
            Response from seller:
            <br />
            {props.review.response}
          </div>
        )
      }
      <div className="review-item-footer">
        <div className="review-item-helpful">
          Helpful?
          { !helpfulness.clicked
            ? <button className="underline-button" type="submit" onClick={handleHelfulnessClick}>Yes</button>
            : <button className="underline-button" type="submit">Yes</button>
          }
          (
          {helpfulness.value}
          )
        </div>
        |
        <button className="underline-button" type="submit" onClick={handleReportClick}>Report</button>
      </div>
    </div>
  );
}

export default ReviewListItem;
