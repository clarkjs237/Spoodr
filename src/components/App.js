import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Overview from './overview/Overview';
import Questions from './questions/Questions';
import Related from './related/Related';
import Reviews from './reviews/Reviews';

function App() {
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `;
  const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
  `;

  const [product, setProduct] = useState(65631);
  const [productStyle, setProductStyle] = useState({});
  const [reviewsMeta, setReviewsMeta] = useState({});
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  function updateProductByID(id) {
    fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => setProduct(result));

    fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/styles`, {
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
    setAverageRating(roundedAveRate);
  }

  function getTotalRatings(result) {
    const ratings = Object.values(result.ratings).map((value) => Number(value));
    const sumValues = ratings.reduce((a, b) => a + b);
    averageRatings(result, sumValues);
    setTotalReviews(sumValues);
  }

  function getReviewsMeta(id) {
    fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta?product_id=${id}`, {
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

  useEffect(() => {
    updateProductByID(product);
    getReviewsMeta(product);
  }, []);

  if (typeof product === 'Number') {
    return <div>empty div</div>;
  } else if(typeof product === 'object') {
    return (
      <Wrapper>
        <Title>Hello World Title</Title>
        <Overview
          product={product}
          productStyle={productStyle}
          totalReviews={totalReviews}
          averageRating={averageRating}
        />
        <Questions product={product} />
        <Related product={product} />
        <Reviews
          product={product}
          totalReviews={totalReviews}
          averageRating={averageRating}
          reviewsMeta={reviewsMeta}
        />
      </Wrapper>
    );
  }
}

export default App;
