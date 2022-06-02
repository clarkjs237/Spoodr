import React from 'react';
import styled from 'styled-components';

const starColor = '#32292F';
const starBlank = '#90D7FF';

const Star = styled.span`
  background: ${(props) => {
    if (props.full) {
      return starColor;
    } if (props.half) {
      return `-webkit-linear-gradient(0deg, ${starColor} 50%, ${starBlank} 50%)`;
    } if (props.quarter) {
      return `-webkit-linear-gradient(0deg, ${starColor} 40%, ${starBlank} 40%)`;
    } if (props.threequarter) {
      return `-webkit-linear-gradient(0deg, ${starColor} 60%, ${starBlank} 60%)`;
    }
    return starBlank;
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function StarRating({ averageStarRating, className }) {
  let returnRating = averageStarRating;
  return [...Array(5)].map(() => {
    if (returnRating >= 1) {
      returnRating--;
      return <Star full className={className}>&#9733;</Star>;// 1
    } if (returnRating === 0) {
      return <Star className={className} empty>&#9733;</Star>;// 0
    }
    const partialReturnRating = returnRating;
    returnRating = 0;
    if (partialReturnRating === 0.25) {
      return <Star className={className} quarter>&#9733;</Star>;
    } if (partialReturnRating === 0.5) {
      return <Star className={className} half>&#9733;</Star>;
    }
    return <Star className={className} threequarter>&#9733;</Star>;
  });
}
