/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import Ratings from './components/ratings/Ratings';
import Reviews from './components/reviews/Reviews';
import './ratings-and-reviews-styles.css';

function RatingsAndReviews(props) {
  return (
    <div>
      <h3>Ratings & Reviews</h3>
      <div className='ratings-and-reviews'>
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
    </div>
  );
}

export default RatingsAndReviews;
