import React from 'react';

function Reviews(props) {
  function getAllReviews(id) {
    fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?product_id=${id}`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => console.log('review:: ', result.results))
      .catch((error) => console.log(error));
  }

  function getReviewMeta(id) {
    fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta?product_id=${id}`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => console.log('review/meta:: ', result))
      .catch((error) => console.log(error));
  }

  function postReview(id) {
    fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?product_id=${id}`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => console.log('review/meta:: ', result))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div>Hello World!</div>
      <div>Here live the reviews!</div>
      <div>{getAllReviews(props.product)}</div>
      <div>{getReviewMeta(props.product)}</div>
    </>
  )
}

export default Reviews;
