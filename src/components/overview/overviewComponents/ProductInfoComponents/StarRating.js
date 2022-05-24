export default function StarRating({ totalReviews, averageRatings, averageRoundRating }) {
  const function makeStarArray(averageRoundRating) {
    return [...Array(5)].map((star) => {
      if(averageRoundRating > 1) {
        averageRoundRatings--;
        return <span className="star">&#9733;</span>;//1
      } else if(averageRoundRating === 0) {
        return <span className="star">&#9734;</span>;//0
      } else {
        let returnRating = averageRating;
        averageRating = 0;
        ;
      }
    })
  }
  return (
    <div>
      <h1>{makeStarArray(averageRoundRating)}</h1>
      <span>
      </span>
      <span>{`Read all ${totalReviews} reviews`}</span>
    </div>
  )
}