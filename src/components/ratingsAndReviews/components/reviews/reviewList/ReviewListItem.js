/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRating from '../../../../overview/overviewComponents/ProductInfoComponents/StarRating';
import ReviewPhoto from './ReviewPhoto';
import { URL } from "../../../../App";
import { format } from 'date-fns';

const StyledReviewListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledReviewBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  white-space: wrap;
  overflow: hidden;
`;

const StyledReviewBodyText = styled.div`
  overflow-wrap: break-word;
`;

const StyledReviewBodyTextScroll = styled.div`
  overflow-y: scroll;
  max-height: 100px;
  padding-right: 10px;
  &::-webkit-scrollbar{
    width: 12px;
  }
  &::-webkit-scrollbar-track{
    background: white;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #90D7FF;
  }
`;

const StyledReviewThumbnails = styled.div`
  padding-top: 5px;
  padding-right: 5px;
  max-height: 50px;
  max-width: 100%;
  display: flex;
  gap: 5px;
`;

const StyledReviewRecommend = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const StyledReviewResponse = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
`;

const StyledReviewFooter = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: small;
`;

function ReviewListItem(props) {
  const [helpfulness, setHelpfulness] = useState(
    {
      value: props.review.helpfulness,
      clicked: false,
    },
  );
  let reviewsPhotos = false;
  if( props.review.photos.length ) {
    reviewsPhotos = true;
  }

  function markReviewAsHelpful(reviewId) {
    fetch(
      `${URL}/reviews/${reviewId}/helpful`,
      {
        method: 'PUT',
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      }
    )
      // .then((response) => response.json())
      .then(() => setHelpfulness({ value: helpfulness.value + 1, clicked: true }));
  }

  function reportReview(reviewId) {
    fetch(
      `${URL}/reviews/${reviewId}/report`,
      {
        method: 'PUT',
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      }
    )
      // .then((response) => response.json())
      .then(() => console.log(`reported review:: ${reviewId}`));
  }

  function handleHelfulnessClick() {
    markReviewAsHelpful(props.review.review_id);
  }

  function handleReportClick() {
    reportReview(props.review.review_id);
  }

  return (
    <StyledReviewListItem>
      <StyledReviewHeader>
        <div>
          <StarRating averageStarRating={props.review.rating}/>
        </div>
        <div style={{fontSize: "small"}}>
          {props.review.reviewer_name} {format(new Date(props.review.date), "MMMM dd, yyyy")}
        </div>
      </StyledReviewHeader>
      <div style={{fontWeight: "bold"}}>
        {props.review.summary}
      </div>
      <StyledReviewBody>
        { props.review.body.length <= 250
          ? <StyledReviewBodyText>{props.review.body}</StyledReviewBodyText>
          : <StyledReviewBodyTextScroll>{props.review.body}</StyledReviewBodyTextScroll>}
          <StyledReviewThumbnails>
            {props.review.photos.map((photo, index) => (
              <ReviewPhoto
                url={photo.url}
                key={index}
              />
            ))}
          </StyledReviewThumbnails>
      </StyledReviewBody>
      { props.review.recommend === true &&
        <StyledReviewRecommend> ✔ I recommend this product. </StyledReviewRecommend>
      }
      { props.review.response &&
        (
          <StyledReviewResponse>
            Response from seller:
            <br />
            {props.review.response}
          </StyledReviewResponse>
        )
      }
      <StyledReviewFooter>
        <div>
          Helpful?&nbsp;
          { !helpfulness.clicked
            ? <underline-button type="submit" onClick={handleHelfulnessClick}>Yes</underline-button>
            : <underline-button type="submit">Yes</underline-button>
          }
          &nbsp;(
          {helpfulness.value}
          )&nbsp;
        </div>
        |&nbsp;
        <underline-button type="submit" onClick={handleReportClick}>Report</underline-button>
      </StyledReviewFooter>
    </StyledReviewListItem>
  );
}

export default ReviewListItem;
