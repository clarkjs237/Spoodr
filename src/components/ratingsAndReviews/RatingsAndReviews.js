/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import Ratings from './components/ratings/Ratings';
import Reviews from './components/reviews/Reviews';

function RatingsAndReviews(props) {
  return (
    <div>
      <h3>Ratings & Reviews</h3>
      <div>
        <Ratings
          totalReviews={props.totalReviews}
          averageRating={props.averageRating}
          averageStarRating={props.averageStarRating}
          reviewsMeta={props.reviewsMeta}
        />
      </div>
      <div>
        <Reviews totalReviews={props.totalReviews}/>
      </div>
    </div>
  );
}

export default RatingsAndReviews;
