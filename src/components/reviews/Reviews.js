/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import Ratings from './Ratings';
import ReviewList from './ReviewList';
import AddReviewForm from './AddReviewForm';
import { PRODUCT_ID, URL } from '../App';

function Reviews(props) {
  console.log(props.reviewsMeta)
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState('relevant');

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
      <Ratings
        totalReviews={props.totalReviews}
        averageRating={props.averageRating}
        averageStarRating={props.averageStarRating}
        reviewsMeta={props.reviewsMeta}
      />
      <ReviewList
        reviews={reviews}
      />
      <button type="submit" onClick={getMoreReviews}>More Reviews</button>
      <AddReviewForm />
    </>
  );
}

export default Reviews;
