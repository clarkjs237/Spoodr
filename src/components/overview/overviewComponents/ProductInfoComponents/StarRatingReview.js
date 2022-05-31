import React from 'react';
import styled from 'styled-components';
import StarRating from './StarRating';

const ReviewLink = styled.span`
font-size: .5rem;
color: #32292F;
  text-decoration: underline;
  &:hover {
    background-color: #90D7FF;
    cursor: pointer;
  }
`;

export default function StarRatingReview({ totalReviews, averageRating, averageStarRating }) {
  return (
    <div>
      <StarRating averageStarRating={averageStarRating} />
      <ReviewLink onClick={() => window.location.replace('/#reviews')}>
        {`Read all ${totalReviews} reviews`}
      </ReviewLink>
    </div>
  );
}
