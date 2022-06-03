/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReviewListItem from './ReviewListItem';
import styled from 'styled-components';

const StyledReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow-y: scroll;
  max-height: 500px;
  width: 100%;
  padding-right: 20px;
  &::-webkit-scrollbar{
    width: 12px;
  }
  &::-webkit-scrollbar-track{
    background: white;        /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb{
    background-color: #90D7FF;    /* color of the scroll thumb */
    /* border: 3px solid orange;  creates padding around scroll thumb */
  }
`;

function ReviewsList(props) {
  return (
    <StyledReviewList>
      {props.reviews.map((review, index) => (
        <ReviewListItem
          review={review}
          key={index}
        />
      ))}
    </StyledReviewList>
  );
}

export default ReviewsList;
