import React, { useState, useEffect } from 'react';
import StarRating from '../../../../overview/overviewComponents/ProductInfoComponents/StarRating';
import styled from 'styled-components';

const AverageRating = styled.div`
font-size: 3rem;
font-family: 'Arial Narrow Bold', sans-serif;
font-weight: 600;
`;

function RatingSummary(props) {
  return (
    <div style={{display: "flex", gap: "10px"}}>
      <AverageRating>
        {props.averageRating}
      </AverageRating>
      <div>
        <StarRating averageStarRating={props.averageStarRating}/>
      </div>
    </div>
  );
}

export default RatingSummary;
