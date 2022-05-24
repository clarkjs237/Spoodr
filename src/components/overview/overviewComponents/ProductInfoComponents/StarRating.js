import styled from 'styled-components';

const ReviewLink = styled.span`
font-size: .75em;
color: #32292F;
  text-decoration: underline;
  &:hover {
    background-color: #90D7FF;
    cursor: pointer;
`;

const Star = styled.span`
background: ${props => {
  if(props.full) {
    return "#0B2027";
  } else if(props.half) {
    return "-webkit-linear-gradient(0deg, #0B2027 50%, #D3AB9E 50%)";
  } else if (props.quarter) {
    return "-webkit-linear-gradient(0deg, #0B2027 40%, #D3AB9E 40%)";
  } else if (props.threequarter) {
    return "-webkit-linear-gradient(0deg, #0B2027 60%, #D3AB9E 60%)";
  } else {
    return "#D3AB9E";
  }}};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function StarRating({ totalReviews, averageRating, averageStarRating }) {

  function makeStarArray(averageStarRating) {
    return [...Array(5)].map((star) => {
      if(averageStarRating >= 1) {
        averageStarRating--;
        return <Star full>&#9733;</Star>;//1
      } else if(averageStarRating === 0) {
        return <Star empty>&#9733;</Star>;//0
      } else {
        let returnRating = averageRating;
        averageStarRating = 0;
        if(returnRating === .25) {
          return <Star quarter>&#9733;</Star>
        } else if(returnRating === .5) {
          return <Star half>&#9733;</Star>
        } else {
          return <Star threequarter>&#9733;</Star>
        }
      }
    })
  }

  return (
    <div>
      <span>{makeStarArray(averageStarRating)}</span>
      <ReviewLink onClick={() => window.location.replace('/#reviews')}> {`Read all ${totalReviews} reviews`}</ReviewLink>
    </div>
  )
}

//window.location.replace('/#reviews')