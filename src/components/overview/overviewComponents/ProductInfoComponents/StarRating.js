import styled from 'styled-components';

const Star = styled.span`
  background: ${(props) => {
    if (props.full) {
      return '#0B2027';
    } if (props.half) {
      return '-webkit-linear-gradient(0deg, #0B2027 50%, #D3AB9E 50%)';
    } if (props.quarter) {
      return '-webkit-linear-gradient(0deg, #0B2027 40%, #D3AB9E 40%)';
    } if (props.threequarter) {
      return '-webkit-linear-gradient(0deg, #0B2027 60%, #D3AB9E 60%)';
    }
    return '#D3AB9E';
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function StarRating({ averageStarRating }) {
  return [...Array(5)].map(() => {
    if (averageStarRating >= 1) {
      averageStarRating--;
      return <Star full>&#9733;</Star>;// 1
    } if (averageStarRating === 0) {
      return <Star empty>&#9733;</Star>;// 0
    }
    const returnRating = averageStarRating;
    averageStarRating = 0;
    if (returnRating === 0.25) {
      return <Star quarter>&#9733;</Star>;
    } if (returnRating === 0.5) {
      return <Star half>&#9733;</Star>;
    }
    return <Star threequarter>&#9733;</Star>;
  });
}
