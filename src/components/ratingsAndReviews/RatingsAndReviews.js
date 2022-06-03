/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import Ratings from './components/ratings/Ratings';
import Reviews from './components/reviews/Reviews';
import styled from 'styled-components';
import './ratings-and-reviews-styles.css';

const StyledRatingsAndReviews = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  width: 100%;
`;

function RatingsAndReviews(props) {
  return (
    <div>
      <h3>Ratings & Reviews</h3>
      <StyledRatingsAndReviews>
        <div>
          <Ratings
            totalReviews={props.totalReviews}
            averageRating={props.averageRating}
            averageStarRating={props.averageStarRating}
            reviewsMeta={props.reviewsMeta}
          />
        </div>
        <div>
          <Reviews
            totalReviews={props.totalReviews}
            reviewsMeta={props.reviewsMeta}
          />
        </div>
      </StyledRatingsAndReviews>
    </div>
  );
}

export default RatingsAndReviews;
