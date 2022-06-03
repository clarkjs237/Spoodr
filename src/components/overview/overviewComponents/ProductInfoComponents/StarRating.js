import React from 'react';
import styled from 'styled-components';

// const starColor = '#32292F';
// const starBlank = '#90D7FF';

const Star = styled.span`
  background: ${(props) => {
    if (props.full) {
      return props.starColor;
    } if (props.half) {
      return `-webkit-linear-gradient(0deg, ${props.starColor} 50%, ${props.starBlank} 50%)`;
    } if (props.quarter) {
      return `-webkit-linear-gradient(0deg, ${props.starColor} 40%, ${props.starBlank} 40%)`;
    } if (props.threequarter) {
      return `-webkit-linear-gradient(0deg, ${props.starColor} 60%, ${props.starBlank} 60%)`;
    }
    return props.starBlank;
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function StarRating({ averageStarRating, className, starColor, starBlank }) {
  let returnRating = averageStarRating;
  starColor = starColor || '#32292F';
  starBlank = starBlank || '#90D7FF';
  return [...Array(5)].map(() => {
    if (returnRating >= 1) {
      returnRating--;
      return <Star full className={className} starColor={starColor} starBlank={starBlank}>&#9733;</Star>;// 1
    } if (returnRating === 0) {
      return <Star className={className} empty starColor={starColor} starBlank={starBlank}>&#9733;</Star>;// 0
    }
    const partialReturnRating = returnRating;
    returnRating = 0;
    if (partialReturnRating === 0.25) {
      return <Star className={className} quarte starColor={starColor} starBlank={starBlank}r>&#9733;</Star>;
    } if (partialReturnRating === 0.5) {
      return <Star className={className} half starColor={starColor} starBlank={starBlank}>&#9733;</Star>;
    }
    return <Star className={className} threequarter starColor={starColor} starBlank={starBlank}>&#9733;</Star>;
  });
}
