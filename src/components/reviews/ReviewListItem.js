/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import StarRating from '../overview/overviewComponents/ProductInfoComponents/StarRating';
import { URL } from "../App";

function ReviewListItem(props) {
  const [helpfulness, setHelpfulness] = useState(props.review.helpfulness);

  function parseDate(dateString) {
    const DATE = dateString.split('-');
    const YEAR = DATE[0];
    let MONTH = DATE[1];
    switch (MONTH) {
      case '01':
        MONTH = 'January';
        break;
      case '02':
        MONTH = 'February';
        break;
      case '03':
        MONTH = 'March';
        break;
      case '04':
        MONTH = 'April';
        break;
      case '05':
        MONTH = 'May';
        break;
      case '06':
        MONTH = 'June';
        break;
      case '07':
        MONTH = 'July';
        break;
      case '08':
        MONTH = 'August';
        break;
      case '09':
        MONTH = 'September';
        break;
      case '10':
        MONTH = 'October';
        break;
      case '11':
        MONTH = 'November';
        break;
      case '12':
        MONTH = 'December';
        break;
      default:
    }
    let DAY = DATE[2];
    DAY = DAY.split('T');
    DAY = DAY[0];
    return `${MONTH}, ${DAY}, ${YEAR}`;
  }

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
      `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/${reviewId}/report`,
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
        {/* {StarRating(props.review.rating)} */}
        <StarRating averageStarRating={props.review.rating}/>
      </div>
      <div id="date">
        {props.review.reviewer_name} {parseDate(props.review.date)}
      </div>
      <div id="summary">Summary: {props.review.summary}</div>
      <div id="body">Body: {props.review.body}</div>
      { props.review.recommend === true &&
        <div> ✔ I recommend this product. </div>
      }
      { props.review.response &&
        <div id="response">Response from seller: {props.review.response}</div>
      }
      <div id="helpfulness">
        Helpful?
        <button id="text-only-button" onClick={handleHelfulnessClick}>yes</button>
        {helpfulness}
      </div>
      <button id="text-only-button" onClick={handleReportClick}>report</button>
      ---------------------
      <br />
      <br />
    </div>
  );
}

export default ReviewListItem;
