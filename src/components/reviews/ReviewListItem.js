/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import StarRating from '../overview/overviewComponents/ProductInfoComponents/StarRating';

function ReviewListItem(props) {
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

  return (
    <div>
      <br />
      <div>
        {StarRating(props.review.rating)}
      </div>
      <div id="date">
        {props.review.reviewer_name} {parseDate(props.review.date)}
      </div>
      <div id="summary">Summary: {props.review.summary}</div>
      <div id="body">Body: {props.review.body}</div>
      { props.review.recommend === true &&
        <div> ✔ I recommend this product. </div>
      }
      {/* <div id="response">Response: {props.review.response}</div> */}
      <div id="helpfulness">
        Helpful?
        <button id="text-only-button">yes</button>
        {props.review.helpfulness}
      </div>
      <div id="report">
        <button id="text-only-button">report</button>
      </div>
      ---------------------
      <br />
    </div>
  );
}

export default ReviewListItem;
