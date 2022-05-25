import React from 'react';

function ReviewListItem(props) {
  return (
    <div>

      <br/>
      {/* <Stars /> */}
      <date>{props.review.date}</date>
      <div id="summary">Summary: {props.review.summary}</div>
      <div id="body">Body: {props.review.body}</div>
      <div id="recommend">Recommend: {props.review.recommend}</div>
      <div id="reviewer">Reviewer: {props.review.reviewer_name}</div>
      <div id="response">Response: {props.review.response}</div>
      <div id="helpfulness">Helpfulness: {props.review.helpfulness}</div> <br/>
    </div>
  );
}

export default ReviewListItem;
