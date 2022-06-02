import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledStarBreakdown = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

function StarBreakdown(props) {
  const [ratings, setRatings] = useState({});

  function calculateStarPercent() {
    const TOTAL_RATINGS = props.totalReviews;
    Object.keys(props.reviewsMeta.ratings).forEach((key) => {
      setRatings((prevState) => ({
        ...prevState,
        [key]: props.reviewsMeta.ratings[key],
      }))
    })
  }

  useEffect(() => {
    calculateStarPercent();
  }, [props.reviewsMeta.ratings]);

  return (
    <div>
      <StyledStarBreakdown>
        <underline-button>5 stars</underline-button>
        <meter value={ratings['5']} min={0} max={100}/>
      </StyledStarBreakdown>
      <StyledStarBreakdown>
        <underline-button>4 stars</underline-button>
        <meter value={ratings['4']} min={0} max={100}/>
      </StyledStarBreakdown>
      <StyledStarBreakdown>
        <underline-button>3 stars</underline-button>
        <meter value={ratings['3']} min={0} max={100}/>
      </StyledStarBreakdown>
      <StyledStarBreakdown>
        <underline-button>2 stars</underline-button>
        <meter value={ratings['2']} min={0} max={100}/>
      </StyledStarBreakdown>
      <StyledStarBreakdown>
        <underline-button>1 stars</underline-button>
        <meter value={ratings['1']} min={0} max={100}/>
      </StyledStarBreakdown>
    </div>
  );
}

export default StarBreakdown;
