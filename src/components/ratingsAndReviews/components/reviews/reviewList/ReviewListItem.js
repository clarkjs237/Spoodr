/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import StarRating from '../../../../overview/overviewComponents/ProductInfoComponents/StarRating';
import ReviewPhoto from './ReviewPhoto';
import { URL } from "../../../../App";
import { format } from 'date-fns';

function ReviewListItem(props) {
  const [helpfulness, setHelpfulness] = useState(props.review.helpfulness);

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
      .then(() => setHelpfulness(helpfulness + 1));
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
    <div>
      <div>
        <StarRating averageStarRating={props.review.rating}/>
      </div>
      <div id="date">
        {props.review.reviewer_name} {format(new Date(props.review.date), 'MMMM d, yyyy')}
      </div>
      <div id="summary">
        Summary
        <br />
        {props.review.summary}
      </div>
      <div id="body">
        Body
        <bt />
        {props.review.body}
        <div>
          Photos
          <br />
          {props.review.photos.map((photo, index) => (
            <ReviewPhoto
              url={photo.url}
              key={index}
            />
          ))}
        </div>
      </div>
      { props.review.recommend === true &&
        <div> ✔ I recommend this product. </div>
      }
      { props.review.response &&
        <div id="response">Response from seller: {props.review.response}</div>
      }
      <span id="helpfulness">
        Helpful?
        <button type="submit" onClick={handleHelfulnessClick}>yes</button>
        {helpfulness}
      </span>
      <button type="submit" onClick={handleReportClick}>report</button>
      <br />
      ---------------------
      <br />
      <br />
    </div>
  );
}



export default ReviewListItem;
