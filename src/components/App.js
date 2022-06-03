import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Overview from './overview/Overview';
import Questions from './questions/Questions';
import Related from './related/Related';
import RatingsAndReviews from './ratingsAndReviews/RatingsAndReviews';
import { createGlobalStyle } from 'styled-components';

export const PRODUCT_ID = 40351;
export const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: white;
    border-color: #32292F;
    color: #0B2027;
    border-width: 1.5px;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  button{
    background-color: white;
    border-width: 1px;
    border-color: black;
    padding: 1rem;
  }

  underline-button {
    border-style: none;
    background: none;
    text-decoration: underline;
  }

  light-text {
    font-size: small;
  }
`;

function App() {
  const [product, setProduct] = useState({ id: PRODUCT_ID });
  const [productStyle, setProductStyle] = useState({});
  const [reviewsMeta, setReviewsMeta] = useState({
    recommended: { true: '0', false: '0' },
    ratings: { 5: '0', 4: '0', 3: '0', 2: '0', 1: '0'},
    characteristics: {},
  });
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [averageStarRating, setAverageStarRating] = useState(0);

  const [curStyleId, setCurStyleId] = useState(0);

  // New state variable for the Product_id_number that is clicked on
  const [product_id_number, setProduct_id_number] = useState(PRODUCT_ID);

  function updateProductByID(id) {
    fetch(`${URL}/products/${id}`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => setProduct(result));

    fetch(`${URL}/products/${id}/styles`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => setProductStyle(result));
  }

  function averageRatings(result, totalRatings) {
    const ratings = Object.keys(result.ratings).map((value) => Number(value));
    const aveRate = ratings.reduce((a, b) => a + Number(result.ratings[b]) * b, 0) / totalRatings;
    const roundedAveRate = (Math.floor(aveRate * 4) / 4).toFixed(2);
    setAverageRating(aveRate.toFixed(1));
    setAverageStarRating(roundedAveRate);
  }

  function getTotalRatings(result) {
    const ratings = Object.values(result.ratings).map((value) => Number(value));
    const sumValues = ratings.reduce((a, b) => a + b);
    averageRatings(result, sumValues);
    setTotalReviews(sumValues);
  }

  function getReviewsMeta(id) {
    fetch(`${URL}/reviews/meta?product_id=${id}`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setReviewsMeta(result);
        getTotalRatings(result);
      });
  }

  // Sully's event handler function
  function handleItemClick(id) {
    // This will change the state of product by using setProduct
    console.log('Page Reload For Product ID : ' + id);
    setProduct_id_number(Number(id));
  }

  // THIS IS THE OLD USE EFFECT
  // useEffect(() => {
  //   updateProductByID(product.id);
  //   getReviewsMeta(product.id);
  // }, []);

  useEffect(() => {
    updateProductByID(product_id_number);
    getReviewsMeta(product_id_number);
    setCurStyleId(0);
  }, [product_id_number]);

  return (
    <>
      <GlobalStyle />
      <Overview
        product={product}
        productStyle={productStyle}
        totalReviews={totalReviews}
        averageRating={averageRating}
        averageStarRating={averageStarRating}
        curStyleId={curStyleId}
        setCurStyleId={setCurStyleId}
      />
      <Related
        product={product}
        handleItemClick={handleItemClick}
        productStyle={productStyle}
        curStyleId={curStyleId}
        averageStarRating={averageStarRating}
      />
      <Questions product={product} />
      <RatingsAndReviews
        product={product}
        totalReviews={totalReviews}
        averageRating={averageRating}
        averageStarRating={averageStarRating}
        reviewsMeta={reviewsMeta}
      />
    </>
  );
}

export default App;
