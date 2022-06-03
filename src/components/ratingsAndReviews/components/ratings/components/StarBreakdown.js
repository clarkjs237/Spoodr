import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledStarsBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const StyledStarBreakdown = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Meter = styled.meter`
  width: 100%;
  &::-webkit-meter-bar {
    background: rgb(255, 255, 255);
    border-radius: 0px;
    height: 10px;
    width: 100%;
    -webkit-appearance: none;
    border: 1px solid lightgray;
    border-radius: 0px;
  }
  &::-webkit-meter-optimum-value {
    background:#454545;
  }
`

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
    <StyledStarsBreakdown>
      <StyledStarBreakdown>
        <underline-button>5&nbsp;stars</underline-button>
        <Meter value={ratings['5']} min={0} max={100}/>
      </StyledStarBreakdown>
      <StyledStarBreakdown>
        <underline-button>4&nbsp;stars</underline-button>
        <Meter value={ratings['4']} min={0} max={100}/>
      </StyledStarBreakdown>
      <StyledStarBreakdown>
        <underline-button>3&nbsp;stars</underline-button>
        <Meter value={ratings['3']} min={0} max={100}/>
      </StyledStarBreakdown>
      <StyledStarBreakdown>
        <underline-button>2&nbsp;stars</underline-button>
        <Meter value={ratings['2']} min={0} max={100}/>
      </StyledStarBreakdown>
      <StyledStarBreakdown>
        <underline-button>1&nbsp;stars</underline-button>
        <Meter value={ratings['1']} min={0} max={100}/>
      </StyledStarBreakdown>
    </StyledStarsBreakdown>
  );
}

export default StarBreakdown;
