import React, { useState, useEffect } from 'react';
import RelatedList from './RelatedList/RelatedList';
import { URL } from '../App';
import styled from 'styled-components';

const Titles = styled.h1`
  font-size: 1em;
  font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
`;

function Related({ product, handleRelatedItemClick }) {
  const [relatedIDs, setRelatedIDs] = useState({});
  const [nameAndCat, setNameAndCat] = useState({});
  const [reviews, setReviews] = useState({});

  // Will be used to find the default style based on a given productID
  function updateDefaultStyle(productID) {
    fetch(`${URL}/products/${productID}/styles`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // Result is an individual request from this styles api
        // So an object containing all the styles
        let bool = false;
        let defaultStyle;
        result.results.forEach((style) => {
          if (!bool && style['default?']) {
            // this is default style
            defaultStyle = { [result.product_id]: style };
            bool = true;
          }
        });
        // If there wasn't a default style, choose first one from list
        if (!bool) {
          defaultStyle = { [result.product_id]: result.results[0] };
        }
        // Create an object with the key = product_id and the value
        // equal to the default style object
        setRelatedIDs((oldObject) => ({
          ...oldObject,
          ...defaultStyle,
        }));
      });
  }

  function updateProductInfo(productID) {
    fetch(`${URL}/products/${productID}`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // Getting the product name and the category
        let newId = {
          [result.id]: {
            product_name: result.name,
            product_category: result.category,
          },
        };
        // Saving it to object with the product id as the key
        setNameAndCat((oldObject) => ({
          ...oldObject,
          ...newId,
        }));
      });
  }

  function updateReviewsInfo(productID) {
    // this will fetch the metadata from each related id,
    // look at the ratings and calculate the average (rounded down to the nearest quarter),
    // and save it as an integer value to each product id
    fetch(`${URL}/reviews/meta?product_id=${productID}`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // result.ratings is the object i want to look at
        let stars = Object.keys(result.ratings).map((num) => Number(num));
        let total_reviews = Object.values(result.ratings).reduce((a, b) => a + Number(b), 0);
        let total_stars = stars.reduce((a, b) => a + b * Number(result.ratings[b]), 0);
        let res = Math.floor((total_stars / total_reviews) * 4) / 4;

        let newReview = { [result.product_id]: res };
        setReviews((oldObject) => ({
          ...oldObject,
          ...newReview,
        }));
      });
  }

  // Making a function to update the related IDs. This will be an array of ids
  function updateRelatedIDs(id) {
    fetch(`${URL}/products/${id}/related`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((results) => {
        results.forEach((product_id) => {
          // I believe I want to get the product_id info before this
          // These are both async so it's really important that the
          // second one happens after the first. I might need to look
          // into async await for this
          updateProductInfo(product_id);
          updateDefaultStyle(product_id);
          updateReviewsInfo(product_id);
        });
      });
  }

  useEffect(() => {
    // I want to get the related IDs firstly
    // console.log('EXECUTING API CALLS'); // This is only executing once, good
    // setRelatedIDs({});
    // setNameAndCat({});
    updateRelatedIDs(product.id);
  }, [product]);

  // This is where we will make use of RelatedList
  // Carousel = RelatedList
  // CarouselItems = RelatedListItem
  if (Object.keys(relatedIDs).length === 0 || Object.keys(nameAndCat).length === 0) {
    return <div>Empty</div>;
  }
  return (
    <div>
      <Titles>Related Items:</Titles>
      <RelatedList
        styles={relatedIDs}
        infos={nameAndCat}
        reviews={reviews}
        handleRelatedItemClick={handleRelatedItemClick}
      />
      <Titles>Your Outfit:</Titles>
    </div>
  );
}
export default Related;
