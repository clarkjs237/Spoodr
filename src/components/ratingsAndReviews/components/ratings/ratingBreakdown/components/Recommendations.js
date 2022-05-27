import React, { useState, useEffect } from 'react';

function Recommendations(props) {
  const [percentRecommended, setPercentRecommended] = useState(0);

  function calculatePercentRecommended() {
    const TRUE = Number(props.reviewsMeta.recommended.true)
    const FALSE = Number(props.reviewsMeta.recommended.false)
    const TOTAL = TRUE + FALSE;
    setPercentRecommended(Math.floor((TRUE / TOTAL) * 100));
  }

  useEffect(() => {
    calculatePercentRecommended();
  }, [props.reviewsMeta.recommended.true, props.reviewsMeta.ratings]);

  return (
    <div>
      {percentRecommended}
      % of reviewers recommend this product
    </div>
  );
}

export default Recommendations;
