import React from 'react';
import RatingSummary from './components/RatingSummary';
import Recommendations from './components/Recommendations';
import StarBreakdown from './components/StarBreakdown';
import Characteristics from './components/Characteristics';
import styled from 'styled-components';

const StyledRatings = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  min-width: 200px;
`;

function Ratings(props) {
  return (
    <StyledRatings>
      <RatingSummary
        averageRating={props.averageRating}
        averageStarRating={props.averageStarRating}
        reviewsMeta={props.reviewsMeta}
      />
      <Recommendations
        reviewsMeta={props.reviewsMeta}
      />
      <StarBreakdown
        totalReviews={props.totalReviews}
        reviewsMeta={props.reviewsMeta}
      />
      <Characteristics
        reviewsMeta={props.reviewsMeta}
      />
    </StyledRatings>
  );
}

export default Ratings;
