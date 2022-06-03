import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewsList from './reviewList/ReviewsList';
import AddReviewForm from './addReview/AddReviewForm';
import { StyledModal, StyledModalBG } from "../styled-components/Modal"
import Sort from './sort/Sort';
import { PRODUCT_ID } from '../../../App';

const StyledReviews = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 500px;
  padding: 10px;
`;

function Reviews(props) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const [toggleModal, setToggleModal] = useState(false);

  function getReviews() {
    // fetch(
    //   `${URL}/reviews?product_id=${PRODUCT_ID}&page=${page}&count=${count}&sort=${sort}`,
    //   {
    //     headers: {
    //       Authorization: process.env.GITTOKEN,
    //     },
    //   },
    // )
    fetch(`/review/${PRODUCT_ID}/${page}/${count}/${sort}/`)
      .then((response) => response.json())
      .then((result) => setReviews(result.results));
  }

  function handleMoreReviews() {
    setCount(count + 2);
    getReviews();
  }

  function handleSortChange(option) {
    if (option === 'helpful') {
      setSort('helpful');
    }
    if (option === 'newest') {
      setSort('newest');
    }
    if (option === 'relevant') {
      setSort('relevant');
    }
  }

  function handleToggleModalChange() {
    setToggleModal(!toggleModal);
  }

  useEffect(() => {
    getReviews();
  }, [count, sort]);

  return (
    <StyledReviews id="reviews">
      <Sort
        totalReviews={props.totalReviews}
        sort={sort}
        handleSortChange={handleSortChange}
      />
      <div>
        <ReviewsList
          reviews={reviews}
        />
      </div>
      <div style={{display: 'flex', gap: '10px'}}>
        <button type="button" onClick={handleToggleModalChange}>Add a Review</button>
        { reviews.length === count && reviews.length > 0
        && <button type="submit" onClick={handleMoreReviews}>More Reviews</button> }
      </div>
      { toggleModal
      && (
        <div>
          <StyledModalBG/>
          <StyledModal>
            <AddReviewForm
              handleToggleModalChange={handleToggleModalChange}
              reviewsMeta={props.reviewsMeta}
            />
          </StyledModal>
        </div>
      )}
    </StyledReviews>
  );
}

export default Reviews;
