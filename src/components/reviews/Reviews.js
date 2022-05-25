/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
import Ratings from "./Ratings";
import ReviewList from "./ReviewList";
import { PRODUCT_ID, URL } from "../App";

function Reviews(props) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState("relevant");

  function getReviews(id) {
    fetch(
      `${URL}/reviews?product_id=${id}&page=${page}&count=${count}&sort=${sort}`,
      {
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => setReviews(result.results));
  }

  function postReview(data) {
    fetch("https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews", {
      method: 'POST',
      headers: {
        Authorization: process.env.GITTOKEN,
      },
      data: {
        product_id: data.product_id,
        rating: data.rating,
        summary: data.summary,
        body: data.body,
        recommend: data.recommend,
        name: data.name,
        email: data.email,
        photos: data.photos,
        characteristics: data.characteristics,
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(`created review:: ${result}`));
  }

  function markReviewAsHelpful(reviewId) {
    fetch(
      `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/${reviewId}/helpful`,
      {
        method: 'PUT',
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      }
    )
      .then((response) => response.json())
      .then((result) =>
        console.log(`incremented helpful count of ${reviewId} to ${result}`)
      );
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
      .then((response) => response.json())
      .then((result) => console.log(`reported review:: ${result}`));
  }

  function getMoreReviews() {
    setCount(count + 2);
    getReviews(PRODUCT_ID);
  }

  useEffect(() => {
    getReviews(PRODUCT_ID);
  }, []);

  return (
    <>
      <h3>Ratings & Reviews</h3>
      <Ratings props={props} />
      <ReviewList
        reviews={reviews}
        markReviewAsHelpful={markReviewAsHelpful}
        reportReview={reportReview}
      />
      <button type="submit" onClick={getMoreReviews}>More Reviews</button>
      <button type="submit">Add Review</button>
    </>
  );
}

export default Reviews;
