import React from 'react';

function ReviewListItem(props) {
  const MONTH = props.review.date.getMonth()
  const DAY = props.review.date.getMonth()
  const YEAR = props.review.date.getMonth()

  return (
    <div>
      <br />
      {/* <Stars /> */}
      <div id="date">
        {MONTH},
        {DAY},
        {YEAR}
      </div>
      <div id="summary">Summary: {props.review.summary}</div>
      <div id="body">Body: {props.review.body}</div>
      <div id="recommend">Recommend: {props.review.recommend}</div>
      <div id="reviewer">Reviewer: {props.review.reviewer_name}</div>
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
